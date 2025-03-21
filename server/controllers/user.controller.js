import User from "../models/user.model.js";
import Expert from "../models/expert.model.js";
import AppError from "../utils/error.utils.js";
import OTP from "../models/otp.model.js";
import { v2 as cloudinary } from "cloudinary";
import sendEmail from "../utils/mailSender.utils.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import fs from "fs";

const cookiesOption = {
  maxAge: 1 * 24 * 60 * 60 * 1000,
  httpOnly: true,
  secure: false,
};
//REGISTER CONTROLLER
const register = async (req, res, next) => {
  try {
    const {
      name,
      username,
      email,
      password,
      role,
      qualification,
      description,
      // degree,
      // otp,
    } = req.body;

    //checking all fields
    if (!name || !email || !password || !username) {
      return next(new AppError("All fields are required", 400));
    }

    // if user/ expert already exist
    const userExist = await User.findOne({
      email,
    });
    if (userExist) {
      return next(new AppError("user already exist", 400));
    }

    //if username is already occupied
    const usernameOccupied = await User.findOne({
      username,
    });
    if (usernameOccupied) {
      return next(
        new AppError("User name is already occupied! Choose another username")
      );
    }

    let user;
    //Role based specification
    if (role == "DIET EXPERT") {
      if (!qualification || !description) {
        return next(new AppError("Please fill all the details", 400));
      }
      //Creating Diet expert
      user = new Expert({
        name,
        username,
        email,
        password,
        role,
        avatar: {
          public_id: email,
          secure_url:
            "https://res.cloudinary.com/du9jzqlpt/image/upload/v1674647316/avatar_drzgxv.jpg",
        },
        qualification,
        description,
        degree: {
          secure_url: "",
        },
      });

      //Expert will upload its degree
      if (req.files && req.files["degree"]) {
        try {
          const result = await cloudinary.uploader.upload(
            req.files["degree"][0].path,
            {
              folder: "Diet Dynamo",
              resource_type: "raw",
            }
          );
          if (result) {
            user.degree.secure_url = result.secure_url;
            await user.save();
          }
          // Remove file from local server
          await fs.promises.rm(req.files["degree"][0].path);
        } catch (error) {
          console.log(error);
          return next(new AppError("File not upload succesfully", 500));
        }
      }
    } else {
      // creating new user
      user = new User({
        name,
        username,
        email,
        password,
        role,
        avatar: {
          public_id: email,
          secure_url:
            "https://res.cloudinary.com/du9jzqlpt/image/upload/v1674647316/avatar_drzgxv.jpg",
        },
      });
    }

    if (!user) {
      return next(
        new AppError("User registration failed, Please try again", 400)
      );
    }

    // upload user/expert avatar
    if (req.files && req.files["avatar"]) {
      try {
        const result = await cloudinary.uploader.upload(
          req.files["avatar"][0].path,
          {
            folder: "Diet Dynamo",
            width: 250,
            height: 250,
            gravity: "faces",
            crop: "fill",
          }
        );
        if (result) {
          (user.avatar.public_id = result.public_id),
            (user.avatar.secure_url = result.secure_url);
        }

        // Remove file from local server
        await fs.promises.rm(req.files["avatar"][0].path);
      } catch (error) {
        console.log(error);
        return next(new AppError("File not upload succesfully", 500));
      }
    }

    //save user/expert in database
    await user.save();
    user.password = undefined;

    // if all ok then send response to the user
    res.status(201).json({
      success: true,
      message: "Register successfully",
      user,
    });
  } catch (error) {
    console.log(error);

    res.status(400).json({
      success: false,
      message: error,
    });
  }
};

//EMAIL VERIFICATION CONTROLLER
const verifyEmail = async (req, res,next) => {
  try {
    const { otp } = req.body;

    //find latest otp for email
    const recentOTP = await OTP.findOne().sort({ created: -1 });

    if (!recentOTP || !recentOTP.otp) {
      return next(new AppError('OTP not found OR expried'))
    }
    //Convert otp into string
    const otpString = String(otp);
    const recentOTPString = String(recentOTP.otp);

    const email = recentOTP.email;
    const user = await User.findOne({ email });
    if (!user) {
      return next(new AppError('User not found'))
    }
    // Match OTP
    const isMatch = await bcrypt.compare(otpString, recentOTPString);
    if (!isMatch) {
      return next(new AppError('Invalid OTP'))
    }
    //check if user is already verified
    if (user.isVerified) {
      // res
      //   .status(401)
      //   .json({ success: false, message: "Email is already verified" });
       return next(new AppError('Email is already verified'))
    }
    //verify user after OTP match
    user.isVerified = true;
    await user.save();

    //delete all emails and OTP's for this user from OTP Model
    // await OTP.deleteMany({ email });

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//LOGIN CONTROLLER
const login = async (req, res, next) => {
  const { email, password } = req.body;

  //Check user is registered or not
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({
      success: false,
      message: "Invalid email",
    });
  }
  //Function to match user and stored passowrd in DB
  const isMatch = await user.comparePassword(password, user.password);

  if (!isMatch) {
    return res.status(400).json({
      success: false,
      message: "Invalid password",
    });
  }
  //check user email is verified or not

  if (user.isVerified == false) {
    return next(
      new AppError("Your registered email is not verified, Please verify first")
    );
  }

  //Token Generation
  const token = await user.generateJWTToken();
  console.log("Token Genrated successfully", token);

  res.cookie("token", token, cookiesOption);
  //If all ok
  return res.status(200).json({
    success: true,
    message: "Login Successfully",
    token,
    user,
  });
};

//LOGOUT CONTROLLER
const logout = async (req, res, next) => {
  res.cookie("token", null, {
    maxAge: 0,
    httpOnly: true,
    secure: false,
  });

  return res.status(200).json({
    success: true,
    message: "User logout successfully",
  });
};

//FORGOT PASSWORD CONTROLLER
const forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return next(new AppError("User not found"), 400);
  }

  const resetToken = await user.generateResetPassowrdToken();
  await user.save();
  const resetURL = `${process.env.FRONTEND_URL}/resetPassword/${resetToken}`;

  const message = `we have recived reset password request please click below link to reset your password \n ${resetURL} \n This link is valid only for 15 minutes`;
  console.log("Message>>", message);
  try {
    await sendEmail({
      email: user.email,
      subject: "Password change request recived",
      message,
    });
    res.status(200).json({
      success: true,
      message: "Reset password link as been send",
    });
  } catch (error) {
    (user.forgotPasswordToken = undefined),
      (user.forgotPasswordExpiry = undefined),
      await user.save();
    console.log(error);
    return next(
      new AppError(
        "There was an error for sending reset password link! PLEASE TRY AGAIN",
        500
      )
    );
  }
};

//RESET PASSWORD CONTROLLER
const resetPassword = async (req, res, next) => {
  try {
    //extract token from params
    const { resetToken } = req.params;
    const { password } = req.body;

    //check password field is required
    if (!password) {
      return next(new AppError("Password is required", 400));
    }

    //Generate forgot password token
    const forgotPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    const user = await User.findOne({
      forgotPasswordToken,
      forgotPasswordExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return next(new AppError("Token is invalid, or expired"), 400);
    }

    user.password = await bcrypt.hash(password, 10);
    user.forgotPasswordToken = undefined;
    user.forgotPasswordExpiry = undefined;
    user.passwordChangeAt = Date.now();
    await user.save();
    console.log(user);
    res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some internall error occured",
    });
  }
};

//MY PROFILE PROFILE CONTROLLER
const myProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    console.log("MY PROFILE CONTROLLER HTI");

    res.status(200).json({
      success: true,
      messgae: "profile get",
      user,
    });
  } catch (error) {
    return next(new AppError("Failed to fetch detail", 500));
  }
};

export {
  register,
  verifyEmail,
  login,
  forgotPassword,
  resetPassword,
  myProfile,
  logout,
};

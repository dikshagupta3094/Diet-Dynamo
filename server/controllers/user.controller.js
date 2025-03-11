import User from "../models/user.model.js";
import Expert from "../models/expert.model.js";
import AppError from "../utils/error.utils.js";
import { v2 as cloudinary } from "cloudinary";
import fs from 'fs'

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
      degree,
    } = req.body;

    //checking all fields
    if (!name || !email || !password || !username) {
      return next(AppError("All fields are required", 400));
    }

    // if user already exist
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
      if (!qualification || !description || !degree) {
        return next(new AppError("Please fill all the details q,d,,d", 400));
      }
      //Creating Diet expert
      user = await Expert.create({
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
      });
      //Expert will upload its degree
      if (req.files && req.files['degree']) {
        try {
          const result = await cloudinary.uploader.upload(req.files['degree'][0].path,{
            folder: "Diet Dynamo/Degrees",
          });
          if (result) {
            user.degree = result.degree;
          }

          // Remove file from server
          fs.rm(`uploads/${req.file.filename}`);
        } catch (error) {
          console.log(error);
          return next(new AppError("File not upload succesfully", 500));
        }
      }
    } else {
      // creating new user
      user = await User.create({
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
      return next(AppError("User registration failed, Please try again", 400));
    }

    //TODO : upload user/expert avatar

    if (req.files && req.files['avatar']) {
      try {
        const result = await cloudinary.uploader.upload(req.files['avatar'][0].path, {
          folder: "Diet Dynamo",
          width: 250,
          height: 250,
          gravity: "faces",
          crop: "fill",
        });
        console.log("Result",result);
        
        if (result) {
          (user.avatar.public_id = result.public_id),
            (user.avatar.secure_url = result.secure_url);
        }

        // Remove file from local server
        // fs.rm(`uploads/${req.files['avatar'][0].path}`);
        await fs.promises.rm(req.files['avatar'][0].path);
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

export { register };

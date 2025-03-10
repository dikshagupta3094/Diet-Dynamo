import User from '../models/user.model.js';
import AppError from '../utilis/error.utilis.js';
import {v2 as cloudinary} from 'cloudinary';
const register = async (req, res, next) => {
    const { name,username, email, password,role} = req.body;
  
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
        username
    })
    if(usernameOccupied){
        return next(new AppError('User name is already occupied! Choose another username'))
    }

    // creating new user
    const user = await userModel.create({
      name,
      username,
      email,
      password,
      role
    });
  
    if (!user) {
      return next(AppError("User registration failed, Please try again", 400));
    }
    //TODO : upload file
    
    if (req.file) {
      try {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "Diet Dynamo",
          width: 250,
          height: 250,
          gravity: "faces",
          crop: "fill",
        });
        if (result) {
          (User.avatar.public_id = result.public_id),
            (User.avatar.secure_url = result.secure_url);
        }
  
        // Remove file from server
        fs.rm(`uploads/${req.file.filename}`);
      } catch (error) {
        console.log(error);
        return next(new AppError("File not upload succesfully", 500));
      }
    }
  
  
    await user.save();
  
    user.password = undefined;
    user.stripeCustomerId = undefined;
    const token =  user.generateJWTtoken();
  
    // set token in cookie with all cookie options with the name of token only
    res.cookie("token", token, cookieOptions);
    // if all ok then send response to the user
    res.status(201).json({
      success: true,
      message: "Register successfully",
      user,
    });
  };
  

export {register}
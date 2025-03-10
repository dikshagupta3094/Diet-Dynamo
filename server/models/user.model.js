import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum:["USER","DIET EXPERT"],
      default: "USER",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    avatar:{
     public_id:{
      type:String
     },
     secure_url:{
      type:String
     }
  },
    passwordChangeAt: Date,
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
  },
  { discriminatorKey: 'role',
    timestamps: true,
  }
);

const User = new mongoose.model("User",userSchema)


export default User;
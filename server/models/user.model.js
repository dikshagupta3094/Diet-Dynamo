import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from 'crypto';
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
      enum: ["USER", "DIET EXPERT","ADMIN"],
      default: "USER",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    otp:{
      type:Number
    },
    
    avatar: {
      public_id: {
        type: String,
      },
      secure_url: {
        type: String,
      },
    },
    passwordChangeAt: Date,
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
  },
  { discriminatorKey: "role", timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  } else {
    try {
      this.password = await bcrypt.hash(this.password, 10);
      return next();
    } catch (error) {
      console.log(error);
      return next(error);
    }
  }
});

userSchema.methods = {
  //Password comparison with hashed password
  comparePassword: async function (myPlainTextPassword) {
    const match = await bcrypt.compare(myPlainTextPassword, this.password);
    return match;
  },
  //Token Generation
  generateJWTToken: async function () {
    const token = jwt.sign(
      {
        id: this._id,
        email: this.email,
        role: this.role,
      },
      process.env.JSONSECRETKEY,
      { expiresIn: "24h" }
    );
    return token;
  },

  generateResetPassowrdToken: function(req,res,next){
    const resetToken = crypto.randomBytes(20).toString('hex')
    console.log("Model", resetToken);
    //Generate reset psaaword token and store it in database
    this.forgotPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')
  
    this.forgotPasswordExpiry = Date.now() + 15*60*1000 // 15 min from now 
    
    return resetToken
   
  }
};

const User = new mongoose.model("User", userSchema);
export default User;

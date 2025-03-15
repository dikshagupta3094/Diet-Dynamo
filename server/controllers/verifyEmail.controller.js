import OTP from "../models/otp.model.js"
import User from "../models/user.model.js"
import bcrypt from "bcrypt"

const verifyEmail = async(req, res) =>{
    try {
        const {email, otp} = req.body;
        //check if user does not exists
        const user = await User.findOne({email});
        if(!user){
            res.status(401).json({success: false, message: "User not found! Enter registered email."})
        }

        //else find latest otp for email
        const recentOTP = await OTP.findOne({email}).sort({created: -1});
        
        if(!recentOTP){
            res.status(401).json({success: false, message: "OTP not found or expired"})
        }

        //match otp
        const isMatch = bcrypt.compare(otp, recentOTP.otp);
        if(!isMatch){
            res.status(401).json({success: false, message: "Invalid OTP"})
        }

        //verify user after otp match
        user.isVerified = true;
        await user.save();

        //check if user is already verified
        if(isVerified){

        }

        //delete all emails for this user
        await OTP.deleteMany({email});

        res.status(200).json({
            success: true,
            message: "Email verified successfully",
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

export { verifyEmail };
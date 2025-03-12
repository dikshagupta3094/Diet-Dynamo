import otpGenerator from "otp-generator";
import OTP from "../models/otp.model";
import User from "../models/user.model";

export default sendOTP = async(req, res) =>{
    const {email} = req.body;

    //Check if user is already present
    const checkUserPresent = await User.findOne({email});
    if(checkUserPresent){
        return res.status(401).json({
            success: false,
            message: "User is already registered"
        })
    }

    let otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      })

    let result = OTP.findOne({otp: otp});
    while (result) {
        otp = otpGenerator.generate(6, {
          upperCaseAlphabets: false,
        });
        result = await OTP.findOne({ otp: otp });
      }

    let otpPayload = {email, otp};
    let otpBody = await OTP.create(otpPayload);
    res.status(201).json({
        success: true,
        message: "OTP sent Sucessfully",
        otp
    })
    catch
}

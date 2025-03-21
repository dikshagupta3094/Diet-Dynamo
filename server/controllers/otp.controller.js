    import otpGenerator from "otp-generator";
    import OTP from "../models/otp.model.js";
    import User from "../models/user.model.js";
    import bcrypt from "bcrypt";
    import sendVerificationEmail from "../utils/sendOTP.utils.js";


    const sendOTP = async (req, res) => {
        try {
            const { email, resend = false } = req.body;

            // Check if user is not registered
            const existingUser = await User.findOne({ email });
            if (!existingUser) {
                return res.status(401).json({ success: false, message: "Please register before verifying" });
            }

            //delete previous OTPs for this email
            // await OTP.deleteMany({email});

            // Generate OTP
            const otpValue = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });

            // Send OTP to user's email
        
            await sendVerificationEmail(email,otpValue);
            
            // Hash OTP
            const hashedOtp = await bcrypt.hash(otpValue, 10);

            // Save OTP to DB
            await OTP.create({ email, otp: hashedOtp });

            const message = resend ? "OTP resent successfully" : "OTP sent successfully";
            res.status(201).json({ success: true, message});
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    
    };


    export {sendOTP}

import { generateAndSendOTP } from "../service/otp.service.js";
import User from "../models/user.model.js";

const sendOTP = async (req, res) => {
  try {
    const { email, resend = false } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(401).json({ success: false, message: "Please register before verifying" });
    }

    await generateAndSendOTP(email);

    const message = resend ? "OTP resent successfully" : "OTP sent successfully";
    res.status(201).json({ success: true, message });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export {sendOTP}

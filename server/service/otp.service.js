import otpGenerator from "otp-generator";
import OTP from "../models/otp.model.js";
import bcrypt from "bcrypt";
import sendVerificationEmail from "../utils/sendOTP.utils.js";

export const generateAndSendOTP = async (email) => {
  // delete old OTPs
  await OTP.deleteMany({ email });

  // generate OTP
  const otpValue = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });

  // send email
  await sendVerificationEmail(email, otpValue);

  // hash & save
  const hashedOtp = await bcrypt.hash(otpValue, 10);
  await OTP.create({ email, otp: hashedOtp });

  return true;
};

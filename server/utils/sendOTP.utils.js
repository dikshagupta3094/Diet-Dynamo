
import sendEmail from "./mailSender.utils.js";
const sendVerificationEmail = async(email, otp) =>{
    try {
        const mailResponse = await sendEmail(
         {
          email: email,
          subject: "Verification Email",
          message: `<h1>Please confirm your OTP</h1><p>Here is your OTP code: ${otp}</p>`
         }
        );
      } catch (error) {
        console.log("Error occurred while sending email: ", error);
        throw error;
      }
}
export default sendVerificationEmail
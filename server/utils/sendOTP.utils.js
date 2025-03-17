
import sendEmail from "./mailSender.utils.js";
const sendVerificationEmail = async(email, otp) =>{
    try {
        const mailResponse = await sendEmail(
         {
          email: email,
          subject: "Verification Email",
          message: `Please confirm your OTP. Here is your OTP code: ${otp}`
         }
        );
       
      } catch (error) {
        console.log("Error occurred while sending email: ", error);
        throw error;
      }
}
export default sendVerificationEmail
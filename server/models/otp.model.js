import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    otp:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now,
        expires: 60*5
    }
})

//Function to send otp through email 
 
// otpSchema.pre("save", async function(next){
//     console.log("New document saved to the database");
//     if (this.isNew) {
//         await sendVerificationEmail(this.email, this.otp);
//       }
//       next();
// });

const OTP = new mongoose.model("OTP", otpSchema);
export default OTP;
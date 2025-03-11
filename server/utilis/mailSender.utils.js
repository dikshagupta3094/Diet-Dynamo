import nodemailer from "nodemailer";

const sendEmail = async(options)=>{
    // create a transporter
    const transpoter = nodemailer.createTransport({
       service:'gmail',
       host:process.env.EMAIL_HOST,
       port:process.env.EMAIL_PORT,
       secure:false,
       auth:{
           user:process.env.EMAIL_USER,
           pass:process.env.EMAIL_PASS
       }
    })



// mail options
const mailOptions = {
    from:process.env.EMAIL_USER,
    to:options.email,
    subject:options.subject,
    text:options.message
 }

 await transpoter.sendMail(mailOptions)
}


export default sendEmail;
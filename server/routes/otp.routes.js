import express from "express"
import {sendOTP} from "../controllers/otp.controller.js"
const router = express.Router();

// send otp
router.post('/send-otp', sendOTP);
router.post('/resend-otp', (req, res) =>{
    req.body.resend = true;
    sendOTP(req, res);
})

export default router;
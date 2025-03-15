import express from "express"
import {sendOTP} from "../controllers/otp.controller.js"
import { verifyEmail } from "../controllers/verifyEmail.controller.js";

const router = express.Router();

// send otp
router.post('/send-otp', sendOTP);

//verify otp
router.post('/verify-otp', verifyEmail);

export default router;
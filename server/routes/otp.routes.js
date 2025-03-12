import express from "express"
import {sendOTP} from "../controllers/otp.controller.js"

const router = express.Router();

router.post('/send-otp', sendOTP);
export default router;
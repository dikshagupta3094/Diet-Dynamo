import express from 'express'
const payment = express.Router()

import { createCheckoutSession, verifyCheckoutSession} from '../controllers/payment.controller.js'
import { isLoggedIn } from '../middleware/auth.middleware.js';

payment.post("/create-checkout-session", isLoggedIn, createCheckoutSession);
payment.get("/verify-session", isLoggedIn, verifyCheckoutSession);


export default payment;
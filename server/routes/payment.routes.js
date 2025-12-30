import express from 'express'
const payment = express.Router()

import { createCheckoutSession, verifyCheckoutSession} from '../controllers/payment.controller.js'
import { isLoggedIn } from '../middleware/auth.middleware.js';

payment.post("/createCheckoutSession", isLoggedIn, createCheckoutSession);
payment.get("/verifySession", isLoggedIn, verifyCheckoutSession);


export default payment;
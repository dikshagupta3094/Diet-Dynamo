import express from 'express'
const auth = express.Router()
import { register,login, verifyEmail, logout, forgotPassword, resetPassword, myProfile } from "../controllers/user.controller.js";
import upload from '../middleware/multer.middleware.js';
import { isLoggedIn } from '../middleware/auth.middleware.js';
auth.post('/register', upload.fields([{name: 'avatar',maxCount:1},{name:"degree",maxCount:1}]),register)
auth.post('/login',login)
auth.post('/verifyEmail',verifyEmail)
auth.get('/logout',logout)
auth.post('/forgot-password',forgotPassword)
auth.post('/reset-password/:resetToken',resetPassword)
auth.get('/myprofile',isLoggedIn,myProfile)

export default auth
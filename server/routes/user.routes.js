import express from 'express'
const auth = express.Router()
import { register,login } from "../controllers/user.controller.js";
import upload from '../middleware/multer.middleware.js';
auth.post('/register', upload.fields([{name: 'avatar',maxCount:1},{name:"degree",maxCount:1}]),register)
auth.post('/login',login)

export default auth
import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import auth from "./routes/user.routes.js";
import otp from "./routes/otp.routes.js"
import query from "./routes/query.routes.js"
import payment from "./routes/payment.routes.js"
import cookieParser from "cookie-parser";
import cors from 'cors'

const corsOption = {
  origin:process.env.FRONTEND_URL ||"http://localhost:5173",
  methods:["GET","POST","PUT","PATCH","DELETE"],
  credentials:true
}


console.log("origin: ",process.env.FRONTEND_URL)
app.use(cors(corsOption))
app.use(express.json());
app.use(express.urlencoded({ extended: true })) 
app.use(cookieParser())
//routes middleware
app.use('/api/v1/auth',auth)
app.use('/api/v1/otp', otp)
app.use('/api/v1/payments',payment)
app.use('/api/v1/query',query)
app.all("*", (req, res) => {
  return res.status(404).send("Oops! Page not found");
});

export default app;

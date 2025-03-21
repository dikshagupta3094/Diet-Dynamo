import express from "express";
const app = express();
import auth from "./routes/user.routes.js";
import otp from "./routes/otp.routes.js"
import cookieParser from "cookie-parser";
app.use(express.json());
app.use(express.urlencoded({ extended: true })) 
app.use(cookieParser())
//routes middleware
app.use('/api/v1/auth',auth)
app.use('/api/v1/otp', otp)


app.all("*", (req, res) => {
  return res.status(404).send("Oops! Page not found");
});

export default app;

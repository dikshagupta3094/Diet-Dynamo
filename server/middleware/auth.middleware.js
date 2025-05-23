import jwt from "jsonwebtoken";
import AppError from "../utils/error.utils.js";
const isLoggedIn = (req,res, next) => {
  try {
      const {token} = req.cookies;
      console.log("Token",token);
      
    if (!token) {
      return next(new AppError("Unauthenticate User! PLEASE LOGIN", 400));
    }
    const userDetails = jwt.verify(token, process.env.JSONSECRETKEY);
    req.user = userDetails;
    next();
  } catch (error) {
    console.log(error);
    return next(new AppError(error), 500);
  }
};

export { isLoggedIn };

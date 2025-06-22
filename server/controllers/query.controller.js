import Query from "../models/query.model";
import User from "../models/user.model"
import AppError from "../utils/error.utils";
import sendEmail from "../utils/mailSender.utils";
import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;


//user posts their query
export const postQuery = async (req, res, next) => {
    try {
      const expertId = req.params.expertId;
  
      // Validate expertId
      if (!ObjectId.isValid(expertId)) {
        return next(new AppError("Invalid expert ID", 400));
      }
  
      const find = await User.findById(expertId);
      
      if (!find) {
        return next(new AppError("Unauthenticated Expert selected", 400));
      }
  
      const expertEmail = find.email;
      const { age, title, description } = req.body;
      const userId = req.user._id;
  
      const user = await User.findById(userId);
      
      // Prevent duplicate queries with same content to the same expert
      const sameContentQuery = await Query.findOne({ userId, expertId, description});
  
      if (sameContentQuery) {
        return res.status(400).json({ message: "You have already posted the same content to this expert" });
      }
  
      // Creating and saving new query
      const query = await Query.create({ userId, expertId, age, title, description });
  
      const message = `Hello ${find.name},\nA new query has been posted by ${user.name}. Please log in to the system to view and respond.`;
  
      console.log("Message:", message);
  
      await sendEmail({
        email: expertEmail,
        subject: "New Query Posted",
        message
      });
  
      res.status(201).json({
        success: true,
        message: "Query posted successfully",
        query
      });
  
    } catch (error) {
      console.error(error);
      next(new AppError("Error while posting query", 500));
    }
  };
  

  //view query 
  export const viewQuery = async (req, res, next) => {
    try {
      const loggedInExpertId = new ObjectId(req.user._id);
  
      // Find all queries for this expert
      const expertQueries = await po.find({ expertId: loggedInExpertId });
  
      if (expertQueries.length === 0) {
        return next(new CustomError("No queries found for this expert", 404));
      }
  
      res.status(200).json({
        success: true,
        message: "Queries fetched successfully",
        expertQueries
      });
  
    } catch (error) {
      console.error(error);
      next(new CustomError("Some internal error occurred", 500));
    }
  };

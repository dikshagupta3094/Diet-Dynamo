const post_query = require('../models/postQuery.model.js')
const post_solution = require('../models/postSolution.model.js')
const CustomError = require('../utilis/customError.utilis.js')
const sendEmail = require('../utilis/sendEmail.utilis.js')
const user_model = require('../models/user.model.js')
const { Types: { ObjectId } } = require('mongoose');

exports.postSolution = async(req,res,next)=>{
  const queryId = req.params.queryId
  const {content} = req.body
  
  if(!queryId){
    return next(new CustomError('Please provide query ID'))
  }
  if(!content){
    return next(new CustomError('Please provide all fields'),400)
  }
  try {
    //Change the status of query from pending to answered
    const updatedQuery = await post_query.findByIdAndUpdate(
      queryId, 
      { status: 'answered' },
      { new: true } 
    );
    if (!updatedQuery) {
      // Handle case where query not found
      return res.status(404).json({
        success: false,
        message: 'Query not found',
      });
    }

    const querySolution = await post_solution.create({
      queryId,
      content
  })
    await post_query.findByIdAndUpdate(
      queryId,
      { solutionId: querySolution._id },
      { new: true }
    );

  
   await querySolution.save();
   
    // Send an email to the user
    const user = await user_model.findById(updatedQuery.userId);
    const userEmail = user.email; // Assuming the email is stored in the 'email' field
    const subject = 'Your query has been answered';
    const message = `Your query has been answered. Please log in to the system to view the solution.`;
    await sendEmail({
      email:userEmail,
      subject,
      message
    });
    console.log(message);

   return res.status(200).json({
    success:true,
    message:"Solution posted successfully",
    querySolution
   })
  } catch (error) {
     console.log(error);
     res.status(500).json({
        success:false,
        message:"Error while posting solution"
     })
  }
}





exports.viewSolution = async(req,res,next)=>{
  const queryId = req.params.queryId
  
   try {
    const solution = await post_solution.findOne({queryId})

    if(!solution){
      res.status(400).json({messgae:'Query id not found'})
    }
    res.status(200).json({
      success:true,
      message:"Solution fetched",
      solution
    })
   } catch (error) {
    res.status(500).json({
      success:true,
      message:"Solution fetched"
    })
     console.log(error)
   }
}
exports.fetchQueries = async(req,res,next)=>{
  try {
    const queries = await post_query.find()
    console.log("All queries",queries);
    const userQueries = queries.filter(query => query.userId.equals(req.user._id));

    console.log(userQueries);   
    res.status(200).json({userQueries})
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message:"Something went wrong"
    })
  }
}
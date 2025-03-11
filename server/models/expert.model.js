import mongoose from "mongoose";
import User from "./user.model.js";
const expertSchema = new mongoose.Schema({
    
    qualification:[
        {
            type: String,
        }
    ],
    description:{
        type: String,
        min: [50, "Minimum 50 words are required to describe"],
        max: [1000, "Maximum word limit for description is 1000"],
        trim: true
    },
    degree:{
        type: String
    }
})

const Expert = User.discriminator("DIET EXPERT", expertSchema)

export default Expert;

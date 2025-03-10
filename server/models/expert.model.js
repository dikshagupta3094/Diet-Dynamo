import mongoose from "mongoose";
import User from "./user.model";
const expertSchema = new mongoose.Schema({
    
    qualification:[
        {
            type: String,
            required: true
        }
    ],
    description:{
        type: String,
        required: true,
        min: [50, "Minimum 50 words are required to describe"],
        max: [1000, "Maximum word limit for description is 1000"],
        trim: true
    },
    degree:{
        type: String,
        required: true,
    }
})

const Expert = User.discriminator("DIET EXPERT", expertSchema)

export default Expert;

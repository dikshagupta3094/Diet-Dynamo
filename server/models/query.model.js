import mongoose from "mongoose";

const querySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    dietExpert: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title:{
        type:[String],
        required:true
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    age:{
        type: Number,
        required: true
    },
    status: {
      type: String,
      enum: ["Pending", "Answered"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const Query = mongoose.model("Query", querySchema);

export default Query;

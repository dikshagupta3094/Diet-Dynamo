import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

const DB_URL = process.env.MONGO_URL;


const DatabaseConnection = async () => {
  try {
    const connectionInstance = await mongoose.connect(DB_URL);
    console.log(
      `✅ Database connected Successfully:: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log(`❌ Database connection failed! Try again ${error}`);
  }
};

export default DatabaseConnection;

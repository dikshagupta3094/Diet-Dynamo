import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import {v2 as cloudinary} from 'cloudinary';
import DatabaseConnection from "../server/db/connect.js";

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET
});


const PORT = process.env.PORT;
app.listen(PORT, async() => {
   // Connect to Database
  await DatabaseConnection();
  console.log(`✅ Server is running on port ${PORT}`);
});

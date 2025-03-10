import dotenv from "dotenv";
dotenv.config();
import { server } from "./app.js";
import DatabaseConnection from "../server/db/connect.js";
 // Connect to Database
 DatabaseConnection();
const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});

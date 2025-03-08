import express from "express";
import http from "http";
import DatabaseConnection from "../server/db/connect.js";

// Connect to Database
DatabaseConnection();

// Create Server
const app = express();
const server = http.createServer(app);

app.use(express.json());
app.all("*", (req, res) => {
  return res.status(404).send("Oops! Page not found");
});

export { app, server };

import express from "express";
const app = express();
import auth from "./routes/user.routes.js";
app.use(express.json());

app.use('/api/v1/auth',auth)

app.all("*", (req, res) => {
  return res.status(404).send("Oops! Page not found");
});

export default app;

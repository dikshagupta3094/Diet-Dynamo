import express from "express";
const app = express();

app.use(express.json());
app.all("*", (req, res) => {
  return res.status(404).send("Oops! Page not found");
});

export default app;

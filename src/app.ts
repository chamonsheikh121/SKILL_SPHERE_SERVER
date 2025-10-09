import express from "express";
const app = express();
import cors from 'cors'


app.use(cors())


app.get("/", (req, res) => {
  res.send("Hello World! SERVER IS  working!");
});

app.use("", (req, res) => {
  res.send({
    message: "route not found",
  });
});

export default app;

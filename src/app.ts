import express from "express";
const app = express();
import cors from "cors";
import router from "./app/routes";
import { global_error_handler } from "./app/errors/global_error_handler";

app.use(cors());
app.use(express.json());
app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.send("Hello World! SERVER IS  working!");
});

app.use((req, res) => {
  res.send({
    message: "route not found",
  });
});
app.use(global_error_handler);

export default app;

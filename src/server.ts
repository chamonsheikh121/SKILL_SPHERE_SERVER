// src/server.ts
import { Server } from "http";
import app from "./app";
import mongoose from "mongoose";
import config from "./app/config";

const PORT = 5000;
let server: Server;

async function bootstrap() {
  server = app.listen(PORT, async () => {
    try {
      await mongoose.connect(config.MONGODB_URI!);
      console.log("MongoDB connected!");
    } catch (err) {
      console.error("MongoDB connection error:", err);
      process.exit(1);
    }

    console.log(`Server listening on PORT ${PORT}`);
  });
}

bootstrap();

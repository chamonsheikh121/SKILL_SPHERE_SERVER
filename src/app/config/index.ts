import env from "dotenv";
import path from "path";

env.config({ path: path.join(process.cwd(), ".env") });

export default {
  MONGODB_URI: process.env.MONGODB_URI,
};

import env from "dotenv";
import path from "path";

env.config({ path: path.join(process.cwd(), ".env") });

export default {
  MONGODB_URI: process.env.MONGODB_URI,
  SSLCOMMERZ_STORE_ID: process.env.SSLCOMMERZ_STORE_ID,
  SSLCOMMERZ_PASSWORD: process.env.SSLCOMMERZ_PASSWORD,
  BCRYPT_SALT_ROUND: process.env.BCRYPT_SALT_ROUND,
};

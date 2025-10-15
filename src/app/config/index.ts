import env from "dotenv";
import path from "path";

env.config({ path: path.join(process.cwd(), ".env") });

export default {
  MONGODB_URI: process.env.MONGODB_URI,
  SSLCOMMERZ_STORE_ID: process.env.SSLCOMMERZ_STORE_ID,
  SSLCOMMERZ_PASSWORD: process.env.SSLCOMMERZ_PASSWORD,
  BCRYPT_SALT_ROUND: process.env.BCRYPT_SALT_ROUND,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_TIME: process.env.ACCESS_TOKEN_TIME,
  REFRESH_TOKEN_TIME: process.env.REFRESH_TOKEN_TIME, 
  FRONTEND_UI_DOMAIN: process.env.FRONTEND_UI_DOMAIN, 
  NODE_DEV: process.env.NODE_DEV, 
  VERIFICATION_TOKEN_SECRET: process.env.VERIFICATION_TOKEN_SECRET, 
  EMAIL_HOST: process.env.EMAIL_HOST, 
  EMAIL_PORT: process.env.EMAIL_PORT, 
  EMAIL_USER: process.env.EMAIL_USER, 
  EMAIL_PASS: process.env.EMAIL_PASS, 
  
};

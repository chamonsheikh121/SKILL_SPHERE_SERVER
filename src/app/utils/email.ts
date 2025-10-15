
import nodemailer from "nodemailer";
import config from "../config";
 const transporter = nodemailer.createTransport({
  host: config.EMAIL_HOST,
  port: Number(config.EMAIL_PORT),
  secure: true, // always true for port 465
  auth: {
    user: config.EMAIL_USER,
    pass: config.EMAIL_PASS, // app password
  },
});

export default transporter;
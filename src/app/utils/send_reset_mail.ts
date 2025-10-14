import config from "../config";
import nodemailer from "nodemailer";

export const send_reset_password_mail = async (resetLink: string, to: string) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // always true for port 465
      auth: {
        user: "sheikhchamon9@gmail.com",
        pass: "qldm spja lueu yakm", // app password
      },
    });

    console.log(to, resetLink);

    const info = await transporter.sendMail({
      from: '"Skill Sphere" <sheikhchamon9@gmail.com>',
      to,
      subject: "Reset Your Password (Valid for 10 Minutes)",
      text: `Hello!
We received a request to reset your password. Click the link below within 10 minutes to reset it:
${resetLink}
If you didn’t request a password reset, you can safely ignore this email.
Thanks,
Skill Sphere Team`,
      html: `
        <div style="font-family: Arial, sans-serif; color:#333; line-height:1.5; max-width:600px; margin:auto; padding:20px; border:1px solid #ddd; border-radius:8px;">
          <h2 style="color:#0d6efd;">Reset Your Password</h2>
          <p>Hello!</p>
          <p>We received a request to reset your password. Click the button below within <strong>10 minutes</strong> to reset it:</p>
          <a href="${resetLink}" 
             style="
                display:inline-block;
                padding:12px 24px;
                margin:20px 0;
                background-color:#0d6efd;
                color:#ffffff !important;
                text-decoration:none;
                font-weight:bold;
                border-radius:5px;
             ">
             Reset Password
          </a>
          <p>If you didn’t request a password reset, you can safely ignore this email.</p>
          <p style="margin-top:20px;">Thanks,<br/><strong>Skill Sphere Team</strong></p>
        </div>
      `,
    });

    console.log("Message sent: %s", info.messageId);
    return info;
  } catch (error: any) {
    console.error("Email sending failed:", error.message);
    throw new Error("Failed to send reset password email. Please try again later.");
  }
};

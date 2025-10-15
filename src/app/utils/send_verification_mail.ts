import transporter from "./email";

export const send_verification_email = async (
  verifyLink: string,
  to: string
) => {
  try {

    console.log(verifyLink, to);
    const info = await transporter.sendMail({
      from: '"Skill Sphere" <sheikhchamon9@gmail.com>',
      to,
      subject: "Verify Your Email – Skill Sphere",
      text: `Welcome to Skill Sphere!

Please verify your email address by clicking the link below:
${verifyLink}

If you didn’t sign up for Skill Sphere, you can ignore this email.

Thanks,
Skill Sphere Team`,
      html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Email Verification – Skill Sphere</title>
      </head>
      <body style="margin:0; padding:0; background-color:#f4f6f8; font-family:'Segoe UI',Roboto,Arial,sans-serif;">
        <div style="width:100%; background-color:#f4f6f8; padding:40px 0;">
          <div style="max-width:600px; margin:auto; background-color:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 4px 20px rgba(0,0,0,0.1);">
            
            <!-- Header -->
            <div style="background:linear-gradient(135deg, #0d6efd, #6ea8fe); padding:25px 0; text-align:center;">
              <h1 style="color:#fff; margin:0; font-size:26px; letter-spacing:1px;">Skill Sphere</h1>
              <p style="color:#e9ecef; margin:5px 0 0;">Empowering Your Learning Journey</p>
            </div>

            <!-- Content -->
            <div style="padding:30px;">
              <h2 style="color:#0d6efd;">Verify Your Email</h2>
              <p style="font-size:15px; color:#333;">Hi there 👋,</p>
              <p style="font-size:15px; color:#333;">
                Welcome to <strong>Skill Sphere</strong>! Please verify your email address to activate your account.
              </p>

              <div style="text-align:center; margin:30px 0;">
                <a href="${verifyLink}"
                   style="
                     background-color:#0d6efd;
                     color:#fff !important;
                     text-decoration:none;
                     padding:14px 32px;
                     font-weight:bold;
                     border-radius:6px;
                     font-size:16px;
                     display:inline-block;
                   ">
                   Verify Email
                </a>
              </div>

              <p style="font-size:14px; color:#555;">
                This link will expire in <strong>15 minutes</strong> for your security.  
                If you didn’t create an account, you can safely ignore this email.
              </p>

              <p style="margin-top:30px; font-size:14px; color:#777;">
                Best regards,  
                <br/><strong>Skill Sphere Team</strong>
              </p>
            </div>

            <!-- Footer -->
            <div style="background-color:#f8f9fa; text-align:center; padding:15px;">
              <p style="font-size:12px; color:#888; margin:0;">
                © ${new Date().getFullYear()} Skill Sphere. All rights reserved.
              </p>
              <p style="font-size:12px; color:#aaa; margin:5px 0 0;">
                This is an automated email, please do not reply.
              </p>
            </div>
          </div>
        </div>
      </body>
      </html>
      `,
    });

    console.log("📧 Verification email sent:", info.messageId);
    return info;
  } catch (error: any) {
    console.error("❌ Email sending failed:", error.message);
    throw new Error(
      "Failed to send verification email. Please try again later."
    );
  }
};

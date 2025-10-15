import Batch_Model from "../modules/batch/batch.model";
import { CourseModel } from "../modules/course/course.model";
import { TEnrollment } from "../modules/enrollments/enrollment.interface";
import { TPayment } from "../modules/payment/payment.interface";
import Payment_model from "../modules/payment/payment.model";
import UserModel from "../modules/user/user.model";
import transporter from "./email";

export const send_payment_confirmation_email = async (
  enrollment_data: TEnrollment,
  payment_data:TPayment
) => {
  const course = await CourseModel.findById(enrollment_data?.courseId);
  const user = await UserModel.findById(enrollment_data?.userId);
  const batch = await Batch_Model.findById(enrollment_data?.batch_id);
  const payment = await Payment_model.findById(payment_data?._id )

console.log("course", course);
console.log("user", user);
console.log("batch", batch);
console.log("payment", payment);

  try {
    const info = await transporter.sendMail({
      from: '"Skill Sphere" <sheikhchamon9@gmail.com>',
      to: user?.email,
      subject: "Payment Confirmation – Skill Sphere",
      text: `Payment Confirmation – Skill Sphere

Hello ${user?.name?.mid_name} ${user?.name?.last_name},

Thank you for your purchase! 🎉  
Your payment has been successfully processed.

Thanks,
Skill Sphere Team`,
html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Payment Confirmation – Skill Sphere</title>
</head>
<body style="margin:0; padding:0; background-color:#f6f9fc; font-family:'Segoe UI',Roboto,Arial,sans-serif;">
  <div style="width:100%; background-color:#f6f9fc; padding:40px 0;">
    <div style="max-width:650px; margin:auto; background-color:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 4px 20px rgba(0,0,0,0.08);">

      <!-- Header -->
      <div style="background:linear-gradient(135deg, #0d6efd, #6ea8fe); padding:30px 0; text-align:center;">
        <h1 style="color:#fff; margin:0; font-size:28px;">Skill Sphere</h1>
        <p style="color:#e9ecef; margin:8px 0 0;">Payment Confirmation</p>
      </div>

      <!-- Body -->
      <div style="padding:30px 40px;">
        <h2 style="color:#0d6efd; margin-top:0;">Hello ${user?.name?.first_name} ${user?.name?.mid_name} ${user?.name?.last_name},</h2>
        <p style="color:#333; font-size:16px;">
          🎉 Congratulations! Your payment has been successfully processed for the course 
          <strong>${course?.title}</strong>.
        </p>

        <div style="margin:25px 0;">
          <table style="width:100%; border-collapse:collapse; font-size:15px;">
            <tr>
              <td style="padding:10px 0; color:#555;">💳 <strong>Transaction ID:</strong></td>
              <td style="padding:10px 0; color:#333;">${payment?.transactionId}</td>
            </tr>
            <tr>
              <td style="padding:10px 0; color:#555;">📅 <strong>Purchase Date:</strong></td>
              <td style="padding:10px 0; color:#333;">${enrollment_data?.purchaseDate}</td>
            </tr>
            <tr>
              <td style="padding:10px 0; color:#555;">💰 <strong>Amount Paid:</strong></td>
              <td style="padding:10px 0; color:#333;">$${course?.price}</td>
            </tr>
            <tr>
              <td style="padding:10px 0; color:#555;">🏷️ <strong>Payment Method:</strong></td>
              <td style="padding:10px 0; color:#333;">${payment?.paymentMethod}</td>
            </tr>
            <tr>
              <td style="padding:10px 0; color:#555;">📚 <strong>Batch:</strong></td>
              <td style="padding:10px 0; color:#333;">${batch?.title}</td>
            </tr>
            <tr>
              <td style="padding:10px 0; color:#555;">⏰ <strong>Batch Duration:</strong></td>
              <td style="padding:10px 0; color:#333;">${batch?.start_date} – ${batch?.end_date}</td>
            </tr>
          </table>
        </div>


        <p style="font-size:14px; color:#666; margin-top:30px;">
          If you didn’t make this payment or think this email was sent by mistake, please contact our support team immediately.
        </p>

        <hr style="border:none; border-top:1px solid #eee; margin:25px 0;" />

        <p style="color:#777; font-size:13px; text-align:center;">
          Thanks for choosing <strong>Skill Sphere</strong>!<br/>
          Empowering your learning journey 🌟
        </p>
      </div>

      <!-- Footer -->
      <div style="background-color:#f1f3f5; padding:15px; text-align:center; font-size:12px; color:#777;">
        &copy; ${new Date().getFullYear()} Skill Sphere. All rights reserved.<br/>
        <a href="https://skillsphere.com" style="color:#0d6efd; text-decoration:none;">Visit Website</a>
      </div>

    </div>
  </div>
</body>
</html>
`

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

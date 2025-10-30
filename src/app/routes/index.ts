import express from "express";
import { user_router } from "../modules/user/user.router";
import { course_router } from "../modules/course/course.router";
import { batch_router } from "../modules/batch/batch.router";
import { enrollment_router } from "../modules/enrollments/enrollment.router";
import { video_router } from "../modules/video/video.router";
import { blog_router } from "../modules/blog/blog.router";
import { certificate_router } from "../modules/certificate/certificate.router";
import { payment_router } from "../modules/payment/payment.router";
import { admin_router } from "../modules/admin/admin.router";
import { student_router } from "../modules/student/student.router";
import { progress_router } from "../modules/progress/progress.router";
import { lesson_router } from "../modules/lesson/lesson.router";
import { auth_router } from "../modules/auth/auth.router";
import { review_router } from './../modules/review/review.router';

const router = express.Router();

const routes = [
  {
    path: "/users",
    route: user_router,
  },
  {
    path: "/admins",
    route: admin_router,
  },
  {
    path: "/students",
    route: student_router,
  },
  {
    path: "/auth",
    route: auth_router,
  },
  {
    path: "/courses",
    route: course_router,
  },
  {
    path: "/batches",
    route: batch_router,
  },
  {
    path: "/enrollments",
    route: enrollment_router,
  },
  {
    path: "/videos",
    route: video_router,
  },
  {
    path: "/reviews",
    route: review_router,
  },
  {
    path: "/blogs",
    route: blog_router,
  },
  {
    path: "/certificates",
    route: certificate_router,
  },
  {
    path: "/payments",
    route: payment_router,
  },
  {
    path: "/progress",
    route: progress_router,
  },
  {
    path: "/lessons",
    route: lesson_router,
  },
];

routes.forEach((route) => router.use(route.path, route.route));

export default router;

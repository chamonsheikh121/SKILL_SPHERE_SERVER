import express from "express";
import { user_router } from "../modules/user/user.router";
import { course_router } from "../modules/course/course.router";
import { batch_router } from "../modules/batch/batch.router";
import { enrollment_router } from "../modules/enrollments/enrollment.router";
import { video_router } from "../modules/video/video.router";
import { review_router } from "../modules/review/review.router";
import { blog_router } from "../modules/blog/blog.router";
import { certificate_router } from "../modules/certificate/certificate.router";
import { payment_router } from "../modules/payment/payment.router";

const router = express.Router();

const routes = [
  {
    path: "/users",
    route: user_router,
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
];

routes.forEach((route) => router.use(route.path, route.route));

export default router;

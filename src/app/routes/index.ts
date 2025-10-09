import express from "express";
import { user_router } from "../modules/user/user.router";
import { course_router } from "../modules/course/course.router";
import { offered_course_router } from "../modules/offered_course/offered_course.router";
import { enrollment_router } from "../modules/enrollments/enrollment.router";

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
    path: "/offeredCourses",
    route: offered_course_router,
  },
  {
    path: "/enrollments",
    route: enrollment_router,
  },
];

routes.forEach((route) => router.use(route.path, route.route));

export default router;

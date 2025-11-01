import express from "express";
import { dashboard_controllers } from "./dashboard.controller";



const router = express.Router();

router.get("/dashboard-summary", dashboard_controllers.get_dashboard_summary);
router.get("/course-summary", dashboard_controllers.get_course_management_summary);
router.get("/review-summary", dashboard_controllers.get_review_management_summary);

export const dashboard_router= router;

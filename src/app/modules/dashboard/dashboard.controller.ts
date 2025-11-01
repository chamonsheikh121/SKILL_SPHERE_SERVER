import { catch_async } from "../../utils/catch_async";
import { dashboard_services } from "./dashboard.service";

const get_dashboard_summary = catch_async(async (req, res) => {
  const result = await dashboard_services.get_dashboard_summery_from_db();
  res.status(200).json({
    success: true,
    message: "Dashboard summary fetched successfully",
    data: result,
  });
});
const get_course_management_summary = catch_async(async (req, res) => {
  const result = await dashboard_services.get_course_management_summery_from_db();
  res.status(200).json({
    success: true,
    message: "Courses summary fetched successfully",
    data: result,
  });
});
const get_review_management_summary = catch_async(async (req, res) => {
  const result = await dashboard_services.get_reviews_management_summery_from_db();
  res.status(200).json({
    success: true,
    message: "Reviews summary fetched successfully",
    data: result,
  });
});

export const dashboard_controllers = {
  get_dashboard_summary,
  get_course_management_summary,
  get_review_management_summary
};

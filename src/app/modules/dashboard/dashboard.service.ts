import Batch_Model from "../batch/batch.model";
import Certificate_Model from "../certificate/certificate.model";
import { CourseModel } from "../course/course.model";
import Enrollment_Model from "../enrollments/enrollment.model";
import { Lesson_Model } from "../lesson/lesson.model";
import Review_Model from "../review/review.model";
import StudentModel from "../student/student.model";
import { Video_Model } from "../video/video.model";

const get_dashboard_summery_from_db = async () => {
  // 1. Courses and Students
  const courses = await CourseModel.find().sort({ total_students: -1 });
  const active_courses = courses?.length || 0;

  const students = await StudentModel.find();
  const total_students = students?.length || 0;

  // 2. Course completion rate
  const batches = await Enrollment_Model.find();
  const total_course_completed = batches.filter(
    (batch) => batch.status === "completed"
  );
  const course_completion =
    total_course_completed.length && batches.length
      ? (total_course_completed.length / batches.length) * 100
      : 0;

  // 3. Overall rating summary
  const result = await Review_Model.aggregate([
    {
      $group: {
        _id: null,
        averageRating: { $avg: "$rating" },
        totalReviews: { $sum: 1 },
      },
    },
  ]);

  const average_rating = result.length ? result[0].averageRating : 0;
  const total_reviews = result.length ? result[0].totalReviews : 0;

  // 4. Other data
  const total_videos = await Video_Model.countDocuments();
  const certificates_issued = await Certificate_Model.countDocuments();

  // 5. Top 3 courses
  const top_courses = courses.slice(0, 3);

  const top_performing_course_with_rating = await Promise.all(
    top_courses.map(async (course) => {
      const avg_course_ratingData = await Review_Model.aggregate([
        { $match: { courseId: course._id } },
        {
          $group: {
            _id: null,
            avgRating: { $avg: "$rating" },
          },
        },
      ]);

      const avgCourseRating =
        avg_course_ratingData.length > 0
          ? avg_course_ratingData[0].avgRating
          : 0;

      return {
        ...course.toObject(),
        average_rating: avgCourseRating,
      };
    })
  );

  // 6. Recent batches
  const recent_batches = batches.slice(0, 3);

  // 7. Final return
  return {
    total_students,
    active_courses,
    course_completion,
    average_rating,
    total_videos,
    total_reviews,
    certificates_issued,
    top_performing_course: top_performing_course_with_rating,
    recent_batches,
  };
};

const get_course_management_summery_from_db = async () => {
  const total_courses = await CourseModel.countDocuments();
  const total_lessons = await Lesson_Model.countDocuments();
  const active_students = await Enrollment_Model.countDocuments();

  // 3. Overall rating summary
  const result = await Review_Model.aggregate([
    {
      $group: {
        _id: null,
        averageRating: { $avg: "$rating" },
        totalReviews: { $sum: 1 },
      },
    },
  ]);

  const average_rating = result.length ? result[0].averageRating : 0;

  return {
    total_courses,
    total_lessons,
    active_students,
    average_rating,
  };
};
const get_reviews_management_summery_from_db = async () => {
  const total_reviews = await Review_Model.countDocuments();
  const pending = await Review_Model.find({ status: "pending" }).countDocuments();
  const approved = await Review_Model.find({ status: "approved" }).countDocuments();

  // 3. Overall rating summary
  const result = await Review_Model.aggregate([
    {
      $group: {
        _id: null,
        averageRating: { $avg: "$rating" },
        totalReviews: { $sum: 1 },
      },
    },
  ]);

  const average_rating = result.length ? result[0].averageRating : 0;

  return {
    total_reviews,
    average_rating,
    pending,
    approved,
  };
};

export const dashboard_services = {
  get_dashboard_summery_from_db,
  get_course_management_summery_from_db,
  get_reviews_management_summery_from_db,
};

import path from "path";
import { TCourse } from "./course.interface";
import { CourseModel } from "./course.model";
import  fs  from 'fs';

const create_course_into_db = async (payload: TCourse) => {
  const result = await CourseModel.create(payload);
  return result;
};

const update_course_into_db = async (id: string, payload: Partial<TCourse>) => {
  const course = await CourseModel.findById(id);
  if (!course) {
    throw new Error("no course found");
  }
  const result = await CourseModel.findByIdAndUpdate(id, payload, {
    new: true,
  });
  console.log(result);
  return result;
};

const get_single_course_from_db = async (id: string) => {
  const result = await CourseModel.findById(id);
  if (!result) {
    throw new Error("No course found");
  }

  return result;
};
const get_all_course_from_db = async () => {
  const result = await CourseModel.find();
  if (!result.length) {
    throw new Error("No courses found");
  }

  return result;
};

const delete_course_from_db = async (id: string) => {
  const is_course_exist = await CourseModel.findById(id);
  if (!is_course_exist) {
    throw new Error("no course found to delete");
  }

  const is_video_file_exist = path.join(process.cwd(), "course_videos", id)
  console.log(is_video_file_exist);

  // 3️⃣ Delete folder if exists
  if (fs.existsSync(is_video_file_exist)) {
    fs.rm(is_video_file_exist, { recursive: true, force: true }, (err) => {
      if (err) console.error("Failed to delete course folder:", err);
      else console.log("Course folder deleted successfully");
    });
  }
  const result = await CourseModel.findByIdAndDelete(id);
  return result

};

export const course_services = {
  create_course_into_db,
  update_course_into_db,
  get_single_course_from_db,
  get_all_course_from_db,
  delete_course_from_db
};

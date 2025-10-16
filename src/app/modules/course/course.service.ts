import path from "path";
import { TCourse } from "./course.interface";
import { CourseModel } from "./course.model";
import fs from "fs";
import { image_url_generator } from "../../utils/image_url_generator";
import { Lesson_Model } from "../lesson/lesson.model";
import { Video_Model } from "../video/video.model";

const create_course_into_db = async (
  payload: TCourse,
  file_name: string | undefined,
  file_full_name: string | undefined,
  base_url: string
) => {

   const course = await CourseModel.findOne({ title: payload?.title });
    if (course) {
      throw new Error(`${course?.title} Course already exist`);
    }


  const result = await CourseModel.create(payload);
  if (!result) {
    throw new Error("Failed to create Course");
  }

  const thumbnail = image_url_generator(
    result,
    file_name,
    file_full_name,
    base_url
  );

  if (thumbnail) {
    const result_with_image = await CourseModel.findByIdAndUpdate(
      result?._id,
      {
        thumbnail,
      },
      {
        new: true,
      }
    );
    return result_with_image;
  }

  return result;
};

const update_course_into_db = async (
  id: string,
  payload: Partial<TCourse>,
  file_name: string | undefined,
  file_full_name: string | undefined,
  base_url: string
) => {
  const course = await CourseModel.findById(id);
  if (!course) {
    throw new Error("no course found");
  }

  const thumbnail = image_url_generator(
    course,
    file_name,
    file_full_name,
    base_url
  );

  if (thumbnail) {
    payload.thumbnail = thumbnail;
    const result = await CourseModel.findByIdAndUpdate(id, payload, {
      new: true,
    });
    return result;
  }
  const result = await CourseModel.findByIdAndUpdate(id, payload, {
    new: true,
  });
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

 // 3️⃣ Delete folder and everything inside the file if exists
  const video_folder = path.join(process.cwd(), "course_videos");

  if(!fs.existsSync(video_folder)){
    fs.mkdirSync(video_folder)
  }

  const course_folders = fs.readdirSync(video_folder);
  const is_course_folder_exist = course_folders.find((course) => course == id);
  if (is_course_folder_exist) {
    const exist_folder_path = path.join(video_folder, id);
    fs.rm(exist_folder_path, { recursive: true, force: true }, (err) => {
      if (err) console.error("Failed to delete course folder:", err);
      else console.log("Course folder deleted successfully");
    });
  }
 // 3️⃣ Delete delete thumbnail if it exists
  const image_folder = path.join(process.cwd(), "image_files");
  const image_files = fs.readdirSync(image_folder);
  const is_image_exist = image_files.find((file) => file.startsWith(id));
  if (is_image_exist) {
    const existing_image_path = path.join(image_folder, is_image_exist);
    fs.rm(existing_image_path, {force: true }, (err) => {
      if (err) console.error("Failed to delete course thumbnail:", err);
      else console.log("Course folder deleted successfully");
    });
  }

  await Lesson_Model.deleteMany({ courseId: id });
  await Video_Model.deleteMany({ courseId: id });
  const result = await CourseModel.findByIdAndDelete(id);
  return result;
};

export const course_services = {
  create_course_into_db,
  update_course_into_db,
  get_single_course_from_db,
  get_all_course_from_db,
  delete_course_from_db,
};

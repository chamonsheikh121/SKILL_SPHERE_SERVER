import path from "path";
import { CourseModel } from "../course/course.model";
import { TLesson } from "./lesson.interface";
import { Lesson_Model } from "./lesson.model";
import fs from "fs";
import { Video_Model } from "../video/video.model";
import Batch_Model from "../batch/batch.model";

const create_lesson_into_db = async (payload: TLesson) => {
  const is_course_exist = await CourseModel.findById(payload?.courseId);
  if (!is_course_exist) {
    throw new Error("Course not found");
  }

  const is_lesson_exist = await Lesson_Model.findOne({ title: payload?.title });
  if (is_lesson_exist) {
    throw new Error(`${is_lesson_exist?.title} lesson already exists`);
  }

  // 1️⃣ Create the new lesson
  const newLesson = await Lesson_Model.create(payload);

  // 2️⃣ Find all batches related to this course
  const relatedBatches = await Batch_Model.find({ course_id: payload.courseId });

  // 3️⃣ Add this new lesson to all batches (with empty video)
  await Promise.all(
    relatedBatches.map(async (batch) => {
      batch.lessons.push({
        lesson_id: newLesson._id,
        video_url: "", // fresh video slot for the new lesson
      });
      await batch.save();
    })
  );

  return newLesson;
};

const update_lesson_into_db = async (id: string, payload: Partial<TLesson>) => {
  const result = await Lesson_Model.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const get_single_lesson_from_db = async (id: string) => {
  const result = await Lesson_Model.findById(id);
  if (!result) {
    throw new Error("No lesson found");
  }

  return result;
};
const get_all_lesson_from_db = async () => {
  const result = await Lesson_Model.find();
  if (!result.length) {
    throw new Error("No lesson found");
  }

  return result;
};

const delete_lesson_from_db = async (id: string) => {
  const is_lesson_exist = await Lesson_Model.findById(id);
  if (!is_lesson_exist) {
    throw new Error("No lesson found to delete");
  }

  // 3️⃣ Delete folder and everything inside the file if exists
  const course_videos = path.join(process.cwd(), "course_videos");
  const course_folder = path.join(
    course_videos,
    is_lesson_exist?.courseId.toString()
  );
  const lesson_folders = fs.readdirSync(course_folder);
  const is_lesson_folder_exist = lesson_folders.find((lesson) => lesson == id);
  if (is_lesson_folder_exist) {
    const exist_folder_path = path.join(course_folder, id);
    fs.rm(exist_folder_path, { recursive: true, force: true }, (err) => {
      if (err) console.error("Failed to delete lesson folder:", err);
      else console.log("Lesson folder deleted successfully");
    });
  }

  await Video_Model.deleteMany({ lessonId: id });
  const result = await Lesson_Model.findByIdAndDelete(id);
  return result;
};

export const lesson_services = {
  create_lesson_into_db,
  update_lesson_into_db,
  get_single_lesson_from_db,
  get_all_lesson_from_db,
  delete_lesson_from_db,
};

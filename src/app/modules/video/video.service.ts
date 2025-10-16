import mongoose from "mongoose";
import { TVideo } from "./video.interface";
import { Video_Model } from "./video.model";
import fs from "fs";
import path from "path";
import { CourseModel } from "../course/course.model";
import { Lesson_Model } from "../lesson/lesson.model";

const create_video_into_db = async (
  base_url: string,
  fileName: string,
  file_original_name: string,
  payload: TVideo
) => {
  // const video = await Video_Model.findOne({ title: payload?.title });
  // if (video) {
  //   throw new Error(`${video?.title} Video already exist`);
  // }
  const is_course_exist = await CourseModel.findById(payload?.courseId);
  if (!is_course_exist) {
    throw new Error("Course not found");
  }
  const is_lesson_exist = await Lesson_Model.findById(payload?.lessonId);
  if (!is_lesson_exist) {
    throw new Error("Lesson not found");
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // step 1: initialize video info info into db
    const result = await Video_Model.create([payload], { session });

    if (!result.length) {
      throw new Error("video not initialized  into db");
    }

    // step 2: rename uploaded video file name with video_id from db
    const course_folder_name = payload?.courseId.toString();
    const lesson_folder_name = payload?.lessonId.toString();
    const updated_file_name = result[0]?._id.toString() as string;

    const uploaded_folder = path.join(
      process.cwd(),
      "course_videos",
      course_folder_name,
      lesson_folder_name,
      fileName
    );

    const rename_folder = path.join(
      process.cwd(),
      "course_videos",
      course_folder_name,
      lesson_folder_name,
      updated_file_name
    );
    const ext = path.extname(file_original_name);
    fs.renameSync(uploaded_folder, rename_folder + ext);

    // step 3: create a brand new url and update video url into db
    const video_url = `${base_url}/course_videos/${course_folder_name}/${lesson_folder_name}/${
      updated_file_name + ext
    }}`;

    const update_url_to_db = await Video_Model.findByIdAndUpdate(
      result[0]?._id,
      {
        url: video_url,
      },
      {
        new: true,
        session,
      }
    );

    await session.commitTransaction();
    await session.endSession();

    return update_url_to_db;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    console.log(error);
  }
};

const update_video_into_db = async (id: string, payload: Partial<TVideo>) => {
  const video = await Video_Model.findById(id);
  if (!video) {
    throw new Error("no video found");
  }
  const result = await Video_Model.findByIdAndUpdate(id, payload, {
    new: true,
  });
  console.log(result);
  return result;
};

const get_single_video_from_db = async (id: string) => {
  const result = await Video_Model.findById(id);
  if (!result) {
    throw new Error("No video found");
  }

  return result;
};
const get_all_video_from_db = async () => {
  const result = await Video_Model.find();
  if (!result.length) {
    throw new Error("No videos found");
  }

  return result;
};

const delete_video_from_db = async (id: string) => {
  const result = await Video_Model.findById(id);
  if (!result) {
    throw new Error("No video found");
  }

  // step 1: find the course folder
  const course_folder_path = path.join(process.cwd(), "course_videos");
  const course_folders = fs.readdirSync(course_folder_path);
  const is_course_folder_exist = course_folders.find((course_folder) =>
    course_folder.startsWith(result?.courseId.toString())
  );
  if (!is_course_folder_exist) {
    throw new Error("Course folder not found");
  }

  // step 2: find the lesson folder
  const lesson_folder_path = path.join(
    course_folder_path,
    is_course_folder_exist
  );
  const lesson_folders = fs.readdirSync(lesson_folder_path);
  const is_lesson_folder_exist = lesson_folders.find((lesson_folder) =>
    lesson_folder.startsWith(result?.lessonId.toString())
  );
  if (!is_lesson_folder_exist) {
    throw new Error("Lesson folder not found");
  }

  // step 3: find the video file
  const video_file_path = path.join(
    course_folder_path,
    is_course_folder_exist,
    is_lesson_folder_exist
  );
  const video_files = fs.readdirSync(video_file_path);
  const is_video_file_exist = video_files.find((video_file) =>
    video_file.startsWith(result?._id.toString())
  );
  if (is_video_file_exist) {
    const existing_video_path = path.join(
      course_folder_path,
      is_course_folder_exist,
      is_lesson_folder_exist,
      is_video_file_exist
    );

    // step 4: delete video file
    fs.unlink(existing_video_path, (err) => {
      if (err) {
        throw new Error("Failed to delete video file from server");
      }
      console.log("Existing video deleted successfully.");
    });

    // step 5: delete video data from database
    const delete_video = await Video_Model.findByIdAndDelete(id);
    return delete_video;
  }
};
export const video_services = {
  create_video_into_db,
  update_video_into_db,
  get_single_video_from_db,
  get_all_video_from_db,
  delete_video_from_db,
};

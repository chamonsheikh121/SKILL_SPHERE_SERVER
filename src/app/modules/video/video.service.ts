import mongoose from "mongoose";
import Batch_Model from "../batch/batch.model";
import { CourseModel } from "../course/course.model";
import { Lesson_Model } from "../lesson/lesson.model";
import { TVideo } from "./video.interface";
import { Video_Model } from "./video.model";
import path from "path";
import fs from "fs";

const create_video_into_db = async (
  base_url: string,
  fileName: string,
  file_original_name: string,
  payload: TVideo & { batchId: string } // 👈 added batchId
) => {
  const { courseId, lessonId, batchId } = payload;

  const is_course_exist = await CourseModel.findById(courseId);
  if (!is_course_exist) throw new Error("Course not found");

  const is_lesson_exist = await Lesson_Model.findById(lessonId);
  if (!is_lesson_exist) throw new Error("Lesson not found");

  const is_batch_exist = await Batch_Model.findById(batchId);
  if (!is_batch_exist) throw new Error("Batch not found");

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // Step 1️⃣: Save video info to DB
    const [newVideo] = await Video_Model.create([payload], { session });
    if (!newVideo) throw new Error("Failed to create video entry in DB");

    // Step 2️⃣: Prepare proper folder and file path
    const course_folder = path.join(
      process.cwd(),
      "course_videos",
      courseId.toString()
    );
    const lesson_folder = path.join(course_folder, lessonId.toString());

    // Ensure directory exists
    fs.mkdirSync(lesson_folder, { recursive: true });

    const videoId = newVideo._id.toString();
    const ext = path.extname(file_original_name);
    const finalFileName = `batch_${batchId}__lesson_${lessonId}__video_${videoId}${ext}`;

    // Step 3️⃣: Rename file
    const uploadedPath = path.join(lesson_folder, fileName);
    const finalPath = path.join(lesson_folder, finalFileName);

    fs.renameSync(uploadedPath, finalPath);

    // Step 4️⃣: Create full URL
    const video_url = `${base_url}/course_videos/${courseId}/${lessonId}/${finalFileName}`;

    // Step 5️⃣: Update Video DB record with URL
    const updatedVideo = await Video_Model.findByIdAndUpdate(
      newVideo._id,
      { url: video_url },
      { new: true, session }
    );

    // Step 6️⃣: Push video URL into Batch lessons array
    await Batch_Model.updateOne(
      { _id: batchId, "lessons.lesson_id": lessonId },
      {
        $set: {
          "lessons.$.video_id": videoId, // The uploaded video's ObjectId
          "lessons.$.video_url": video_url, // The uploaded video's URL
        },
      },
      { session }
    );

    await session.commitTransaction();
    session.endSession();
    return updatedVideo;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Error creating video:", error);
    throw error;
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

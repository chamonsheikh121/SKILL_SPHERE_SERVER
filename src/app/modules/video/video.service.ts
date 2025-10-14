import mongoose from "mongoose";
import { TVideo } from "./video.interface";
import { Video_Model } from "./video.model";
import fs from "fs";
import path from "path";

const create_video_into_db = async (
  base_url: string,
  fileName: string,
  file_original_name: string,
  payload: TVideo
) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // step 1: initialize video info info into db
    const result = await Video_Model.create([payload], { session });

    if (!result.length) {
      throw new Error("video not initialized  into db");
    }

    // step 2: rename uploaded video file name with video_id from db
    const folder_name = payload?.courseId.toString();
    const updated_file_name = result[0]?._id.toString() as string;

    const uploaded_folder = path.join(
      process.cwd(),
      "course_videos",
      folder_name,
      fileName
    );

    const rename_folder = path.join(
      process.cwd(),
      "course_videos",
      folder_name,
      updated_file_name
    );
    const ext = path.extname(file_original_name);
    fs.renameSync(uploaded_folder, rename_folder + ext);

    // step 3: create a brand new url and update video url into db
    const video_url = `${base_url}/course_videos/${folder_name}/${
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

const delete_video_from_db = async (id: string, payload: Partial<TVideo>) => {
  const result = await Video_Model.findById(id);
  if (!result) {
    throw new Error("No video found");
  }

  const course_id = payload?.courseId?.toString();

  const file_path = path.join(
    process.cwd(),
    "course_videos",
    course_id as string,
    id + ".mp4"
  );

  fs.unlink(file_path, (err) => {
    if (err) {
      throw new Error("Failed to delete video file from server");
    }
  });

  const delete_video = await Video_Model.findByIdAndDelete(id);

  return delete_video;
};
export const video_services = {
  create_video_into_db,
  update_video_into_db,
  get_single_video_from_db,
  get_all_video_from_db,
  delete_video_from_db,
};

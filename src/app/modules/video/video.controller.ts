import { Request, RequestHandler, Response } from "express";
import { catch_async } from "../../utils/catch_async";
import { video_services } from "./video.service";

const create_video = catch_async(async (req, res, next) => {

  const file = req.file;
  const fileName = file?.filename;
  const file_original_name = file?.originalname;

  if (!file) {
    throw new Error("no video file uploaded");
  }

  // mongodb base url
  const base_url = `${req.protocol}://${req.get("host")}`;
  const result = await video_services.create_video_into_db(
    base_url as string,
    fileName as string,
    file_original_name as string,
    req.body
  );
  res.status(200).send({
    success: true,
    message: "video created successfully",
    data: result,
  });
});

const update_video = catch_async(async (req, res, next) => {
  const video_id = req?.params?.video_id;

  const result = await video_services.update_video_into_db(
    video_id as string,
    req.body
  );
  res.status(200).send({
    success: true,
    message: "video updated successfully",
    data: result,
  });
});

const get_single_video = catch_async(async (req, res, next) => {
  const video_id = req?.params?.video_id;

  const result = await video_services.get_single_video_from_db(
    video_id as string
  );
  res.status(200).send({
    success: true,
    message: "video retrieved successfully",
    data: result,
  });
});
const get_all_video = catch_async(async (req, res, next) => {
  const result = await video_services.get_all_video_from_db();
  res.status(200).send({
    success: true,
    message: "videos retrieved successfully",
    data: result,
  });
});

const delete_video = catch_async(async (req, res, next) => {
  const video_id = req?.params?.video_id;

  const result = await video_services.delete_video_from_db(
    video_id as string,
    req.body
  );
  res.status(200).send({
    success: true,
    message: "videos deleted successfully",
    data: result,
  });
});

export const video_controllers = {
  create_video,
  update_video,
  get_single_video,
  get_all_video,
  delete_video,
};

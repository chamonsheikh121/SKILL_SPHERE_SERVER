import { Request, RequestHandler, Response } from "express";
import { catch_async } from "../../utils/catch_async";
import { video_services } from "./video.service";

const create_video = catch_async(async (req, res, next) => {
  const data = JSON.parse(req.body.data)
  console.log(data);
  const file = req.file?.path;

  if (!file) {
    throw new Error("no video file uploaded");
  }
  const base_url = `${req.protocol}://${req.get("host")}`;
  const result = await video_services.create_video_into_db(base_url,req.file?.filename, data);
  res.status(200).send({
    success: true,
    message: "video created successfully",
    data: result,
  });
});

export const user_controllers = {
  create_video,
};

import { TVideo } from "./video.interface";
import { Video_Model } from "./video.model";

const create_video_into_db = async (
  base_url: string | null,
  fileName: string | undefined,
  payload: TVideo
) => {

    
  console.log(fileName);
  payload.url = `${base_url}/course_videos/${payload.courseId}/${  payload.url = `${base_url}/course_videos/${fileName}`}`;

  const result = await Video_Model.create(payload);
  return result;
};

export const video_services = {
  create_video_into_db,
};

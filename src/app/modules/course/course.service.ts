import path from "path";
import { TCourse } from "./course.interface";
import { CourseModel } from "./course.model";
import fs from "fs";
import { image_url_generator } from "../../utils/image_url_generator";

const create_course_into_db = async (
  payload: TCourse,
  file_name: string | undefined,
  file_full_name: string | undefined,
  base_url: string
) => {
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

  const is_video_file_exist = path.join(process.cwd(), "course_videos", id);
  console.log(is_video_file_exist);

  // 3️⃣ Delete folder if exists
  if (fs.existsSync(is_video_file_exist)) {
    fs.rm(is_video_file_exist, { recursive: true, force: true }, (err) => {
      if (err) console.error("Failed to delete course folder:", err);
      else console.log("Course folder deleted successfully");
    });
  }
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

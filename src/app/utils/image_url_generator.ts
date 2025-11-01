import path from "path";
import fs from "fs";

export const image_url_generator = (
  file_prefix: string,
  result: Record<string, any>,
  file_name: string | undefined,
  file_full_name: string | undefined,
  base_url: string,
  multiple_image?: boolean
) => {
  if (file_name && file_full_name) {
    // step 1: check is image exist with the initialized or existing blog _id
    const image_folder = path.join(process.cwd(), "image_files");
    const images = fs.readdirSync(image_folder);

    if (!multiple_image) {
      const is_exist_image = images?.find((image) => {
        const file_id = image.split("-")[1] as string;

        return file_id.startsWith(result?._id);
      });
      // console.log("is exist image", is_exist_image);

      // Delete old image if exists
      if (is_exist_image) {
        const existing_image_path = path.join(image_folder, is_exist_image);
        fs.rmSync(existing_image_path, { force: true });
      }
    }

    // recently uploaded image
    const uploaded_image = path.join(image_folder, file_name);
    // what will be the image file name

    const rename_image = path.join(
      image_folder,
      `${file_prefix}-${result?._id}`
    );
    // Rename uploaded image
    const ext = path.extname(file_full_name);
    fs.renameSync(uploaded_image, rename_image + ext);

    return `${base_url}/image_files/${file_prefix}-${result?._id + ext}`;
  }
};

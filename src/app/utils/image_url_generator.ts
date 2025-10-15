import path from "path";
import fs from "fs";

export const image_url_generator = (
  result: Record<string, any>,
  file_name: string | undefined,
  file_full_name: string | undefined,
  base_url: string
) => {
  if (file_name && file_full_name) {
    const uploaded_image = path.join(process.cwd(), "image_files", file_name);
    const rename_image = path.join(
      process.cwd(),
      "image_files",
      `${result?._id}`
    );
    const ext = path.extname(file_full_name);
    fs.renameSync(uploaded_image, rename_image + ext);
    return `${base_url}/image_files/${result?._id + ext}`;
  }
};

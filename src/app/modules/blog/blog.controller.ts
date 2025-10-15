import { catch_async } from "../../utils/catch_async";
import { blog_services } from "./blog.service";

const create_blog = catch_async(async (req, res, next) => {
  const file = req.file;
  const file_name = file?.filename;
  const file_full_name = file?.originalname;

  const base_url = `${req.protocol}://${req.get("host")}`;

  const result = await blog_services.create_blog_into_db(
    req.body,
    base_url,
    file_name,
    file_full_name
  );
  res.status(200).send({
    success: true,
    message: "blog created successfully",
    data: result,
  });
});

export const blog_controllers = {
  create_blog,
};

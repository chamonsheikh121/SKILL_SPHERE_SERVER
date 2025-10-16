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

const update_blog = catch_async(async (req, res, next) => {
  const blog_id = req?.params?.blog_id;
  const file_name = req?.file?.filename,
  file_full_name = req?.file?.originalname;
  const base_url = `${req.protocol}://${req.get("host")}`;

  const result = await blog_services.update_blog_into_db(
    blog_id as string,
    req.body,
    base_url,
    file_name,
    file_full_name
  );
  res.status(200).send({
    success: true,
    message: "Blog updated successfully",
    data: result,
  });
});
const get_single_blog = catch_async(async (req, res, next) => {
  const blog_id = req?.params?.blog_id;

  const result = await blog_services.get_single_blog_from_db(blog_id as string);
  res.status(200).send({
    success: true,
    message: "Blog retrieved successfully",
    data: result,
  });
});
const get_all_blog = catch_async(async (req, res, next) => {
  const result = await blog_services.get_all_blog_from_db();
  res.status(200).send({
    success: true,
    message: "Blogs retrieved successfully",
    data: result,
  });
});

export const blog_controllers = {
  create_blog,
  update_blog,
  get_all_blog,
  get_single_blog,
};

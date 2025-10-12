import { catch_async } from "../../utils/catch_async";
import { blog_services } from "./blog.service";

const create_blog = catch_async(async (req, res, next) => {

    

  const result = await blog_services.create_blog_into_db(req.body)
  res.status(200).send({
    success: true,
    message: "blog created successfully",
    data: result,
  });
});

export const blog_controllers = {
  create_blog,
};

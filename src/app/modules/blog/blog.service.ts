import { TBlog } from "./blog.interface";
import Blog_Model from "./blog.model";


const create_blog_into_db = async (payload: TBlog) => {
  const result = await Blog_Model.create(payload);
  return result;
};

export const blog_services = {
  create_blog_into_db,
};

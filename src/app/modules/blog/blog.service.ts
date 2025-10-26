import path from "path";
import { TBlog } from "./blog.interface";
import Blog_Model from "./blog.model";
import { image_url_generator } from "../../utils/image_url_generator";
import Query_Builder from "../../builder/query_builder";


const create_blog_into_db = async (
  payload: TBlog,
  base_url: string,
  file_name: string | undefined,
  file_full_name: string | undefined
) => {
  const result = await Blog_Model.create(payload);
  if (!result) {
    throw new Error("Failed to create Blog");
  }

  const thumbnail = image_url_generator(
    result,
    file_name,
    file_full_name,
    base_url
  );

  if (thumbnail) {
    const result_with_image = await Blog_Model.findByIdAndUpdate(
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

const update_blog_into_db = async (
  id: string,
  payload: Partial<TBlog>,
  base_url: string,
  file_name: string | undefined,
  file_full_name: string | undefined
) => {
  const result = await Blog_Model.findById(id);

  if (!result) {
    throw new Error("No blog found");
  }

  const thumbnail = image_url_generator(
    result,
    file_name,
    file_full_name,
    base_url
  );

  if (thumbnail) {
    payload.thumbnail = thumbnail;
    const result_with_image = await Blog_Model.findByIdAndUpdate(id, payload, {
      new: true,
    });
    return result_with_image;
  }

  const update_to_db = await Blog_Model.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return update_to_db;
};

const get_single_blog_from_db = async (id: string) => {
  const result = await Blog_Model.findById(id);
  if (!result) {
    throw new Error("No blog found");
  }

  return result;
};
const get_all_blog_from_db = async (query:Record<string, unknown>) => {
  const blog_query = new Query_Builder(Blog_Model.find().populate("userId"), query).filter().sort().pagination().search(['email']); 

  const result = await blog_query.model_query
  if (!result.length) {
    throw new Error("No blog found");
  }

  return result;
};

export const blog_services = {
  create_blog_into_db,
  update_blog_into_db,
  get_single_blog_from_db,
  get_all_blog_from_db,
};

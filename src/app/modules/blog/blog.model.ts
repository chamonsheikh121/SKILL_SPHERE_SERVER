// models/Blog.ts
import mongoose, { Schema, Document, Model, model } from "mongoose";
import { TBlog } from "./blog.interface";


const BlogSchema = new Schema<TBlog>(
  {
    title: { type: String, required: true, trim: true },
    thumbnail: { type: String},
    content: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "Users", required: true },
    tags: [{ type: String, trim: true }],
    views: {
        type:Number,
    },
    is_published: { type: Boolean, default: false },
    is_deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Blog_Model = model<TBlog>("Blogs", BlogSchema);

export default Blog_Model;

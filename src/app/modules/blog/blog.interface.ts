// types/blog.ts
import { Types } from "mongoose";

export type TBlog = {
  title: string;
  thumbnail?: string;
  content: string;
  userId: Types.ObjectId;
  tags: string[];
  views?: number;
  is_published: boolean;
  is_deleted: boolean;
};

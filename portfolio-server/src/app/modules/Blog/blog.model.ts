// blog.model.ts
import { Schema, Model, model } from 'mongoose';
import { IBlog } from './blog.interface';

const blogSchema = new Schema<IBlog>({
  title: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  coverImage: {  type: [String], required: false, default: [] },
  description: { type: String, required: true },

},{
  timestamps: true,
  versionKey: false,
});

const Blog: Model<IBlog> = model<IBlog>('Blog', blogSchema);

export default Blog;

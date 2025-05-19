import { IBlog } from "./blog.interface";
import Blog from "./blog.model";


const createBlog = async (payload: IBlog): Promise<IBlog> => {
  const result = await Blog.create(payload);
  return result;
};
const getAllBlog = async () => {
  const result = await Blog.find({}).sort({ createdAt: -1 });
  return result;
};
const getSingleBlog = async (id: string) => {
  const result = await Blog.findById(id);
  return result;
};
const updateBlog = async (
  id: string,
  payload: Partial<IBlog>,
): Promise<IBlog | null> => {
  const result = await Blog.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};
const deleteBlog = async (id: string): Promise<IBlog | null> => {
  const result = await Blog.findByIdAndDelete(id);
  return result;
};
export const blogService = {
  createBlog,
  getAllBlog,
  getSingleBlog,
  updateBlog,
  deleteBlog,
};

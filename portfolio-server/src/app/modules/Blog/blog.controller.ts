import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { sendImageToCloudinary } from "../../utils/cloudinaryImageUploader";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import { blogService } from "./blog.service";

const blogCreate = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  payload.imageUrl = [];

  if (req.files && req.files instanceof Array) {
    const imageUrls = await Promise.all(
      req.files.map(async (file) => {
        const uniqueSuffix = Date.now() + Math.round(Math.random() * 1e3);
        const imageName = `${uniqueSuffix}-${'dev-rakib-mia'}`;
        const path = file?.buffer;

        const { secure_url } = await sendImageToCloudinary(imageName, path);
        return secure_url;
      }),
    );
    payload.coverImage = imageUrls;
  }
  const result = await blogService.createBlog(payload);
  sendResponse(res, StatusCodes.OK, 'blog created successfully', result);
});

const getAllBlogs = catchAsync(async (req, res) => {
  const result = await blogService.getAllBlog();
  sendResponse(res, StatusCodes.OK, 'all blog fetch successfully', result);
});

const getSingleBlog = catchAsync(async (req, res) => {
  const result = await blogService.getSingleBlog(req.params.id);
  sendResponse(res, StatusCodes.OK, 'blog fetch successfully', result);
});

const updateBlog = catchAsync(async (req, res) => {
  const payload = req.body;

  // Check if new image files are uploaded
  if (req.files && Array.isArray(req.files) && req.files.length > 0) {
    const imageUrls = await Promise.all(
      req.files.map(async (file) => {
        const uniqueSuffix = Date.now() + Math.round(Math.random() * 1e3);
        const imageName = `${uniqueSuffix}-${'dev-rakib-mia'}`;
        const path = file?.buffer;

        const { secure_url } = await sendImageToCloudinary(imageName, path);
        return secure_url;
      }),
    );
    payload.coverImage = imageUrls;
  } else {
    const existingBlog = await blogService.getSingleBlog(
      req.params.id,
    );
    if (existingBlog) {
      payload.coverImage = existingBlog.coverImage;
    }
  }

  const result = await blogService.updateBlog(req.params.id, payload);
  sendResponse(res, StatusCodes.OK, 'blog updated successfully', result);
});

const deleteBlog = catchAsync(async (req, res) => {
  await blogService.deleteBlog(req.params.id);
  sendResponse(res, StatusCodes.OK, 'blog delete successfully', {});
});

export const blogController = {
  blogCreate,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
};

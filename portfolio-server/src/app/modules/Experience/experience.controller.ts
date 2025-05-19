import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { sendImageToCloudinary } from "../../utils/cloudinaryImageUploader";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import { experienceService } from "./experience.service";

// Create Experience
const createExperience = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  payload.images = [];

  if (req.files && Array.isArray(req.files)) {
    const imageUrls = await Promise.all(
      req.files.map(async (file) => {
        const uniqueSuffix = Date.now() + Math.round(Math.random() * 1e3);
        const imageName = `${uniqueSuffix}-dev-rakib-mia`;
        const path = file.buffer;

        const { secure_url } = await sendImageToCloudinary(imageName, path);
        return secure_url;
      })
    );
    payload.images = imageUrls;
  }

  const result = await experienceService.createExperience(payload);
  sendResponse(res, StatusCodes.OK, 'Experience created successfully', result);
});

// Get All Experiences
const getAllExperiences = catchAsync(async (req: Request, res: Response) => {
  const result = await experienceService.getAllExperiences();
  sendResponse(res, StatusCodes.OK, 'All experiences fetched successfully', result);
});

// Get Single Experience
const getSingleExperience = catchAsync(async (req: Request, res: Response) => {
  const result = await experienceService.getSingleExperience(req.params.id);
  sendResponse(res, StatusCodes.OK, 'Experience fetched successfully', result);
});

// Update Experience
const updateExperience = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;

  if (req.files && Array.isArray(req.files) && req.files.length > 0) {
    const imageUrls = await Promise.all(
      req.files.map(async (file) => {
        const uniqueSuffix = Date.now() + Math.round(Math.random() * 1e3);
        const imageName = `${uniqueSuffix}-dev-rakib-mia`;
        const path = file.buffer;

        const { secure_url } = await sendImageToCloudinary(imageName, path);
        return secure_url;
      })
    );
    payload.images = imageUrls;
  } else {
    const existing = await experienceService.getSingleExperience(req.params.id);
    if (existing) {
      payload.images = existing.images;
    }
  }

  const result = await experienceService.updateExperience(req.params.id, payload);
  sendResponse(res, StatusCodes.OK, 'Experience updated successfully', result);
});

// Delete Experience
const deleteExperience = catchAsync(async (req: Request, res: Response) => {
  await experienceService.deleteExperience(req.params.id);
  sendResponse(res, StatusCodes.OK, 'Experience deleted successfully', {});
});

export const experienceController = {
  createExperience,
  getAllExperiences,
  getSingleExperience,
  updateExperience,
  deleteExperience,
};

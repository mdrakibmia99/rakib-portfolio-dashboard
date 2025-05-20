import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { skillService } from './skill.service';
import { StatusCodes } from 'http-status-codes';
import sendResponse from '../../utils/sendResponse';
import { sendImageToCloudinary } from '../../utils/cloudinaryImageUploader';
import Skill from './skill.model';

export const skillCreate = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body; // Already parsed as JSON from the router middleware

  // Initialize icon URL
  let iconUrl: string = '';

  // If file is uploaded, upload it to Cloudinary
  if (req.file) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e5);
    const imageName = `${uniqueSuffix}-skill-icon`;
    const imageBuffer = req.file.buffer;

    const { secure_url } = await sendImageToCloudinary(imageName, imageBuffer);
    iconUrl = secure_url as string;
  }

  const result = await skillService.createSkill({
    ...payload,
    icon: iconUrl, // Store the Cloudinary URL
  });

  sendResponse(res, StatusCodes.CREATED, 'Skill created successfully', result);
});
const createSkillCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await skillService.createSkillCategory(req.body);
  sendResponse(
    res,
    StatusCodes.OK,
    'skill category created successfully',
    result,
  );
});

const getAllSkill = catchAsync(async (req, res) => {
  const result = await skillService.getAllSkill();
  sendResponse(res, StatusCodes.OK, 'all skill fetch successfully', result);
});
const getAllSkillCategory = catchAsync(async (req, res) => {
  const result = await skillService.getAllSkillCategory();
  sendResponse(res, StatusCodes.OK, 'all skill  fetch successfully', result);
});

const getSingleSkill = catchAsync(async (req, res) => {
  const result = await skillService.getSingleSkill(req.params.id);
  sendResponse(res, StatusCodes.OK, 'skill fetch successfully', result);
});

const updateSkill = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;

  // handle image upload if exists
  if (req.file) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e3);
    const imageName = `${uniqueSuffix}-skill-icon`;
    const { secure_url } = await sendImageToCloudinary(imageName, req.file.buffer);
    payload.icon = secure_url;
  }

  const result = await Skill.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  sendResponse(res, 200, 'Skill updated successfully', result);
});


const deleteSkill = catchAsync(async (req, res) => {
  await skillService.deleteSkill(req.params.id);
  sendResponse(res, StatusCodes.OK, 'skill delete successfully', {});
});

export const skillController = {
  skillCreate,
  getAllSkill,
  getSingleSkill,
  updateSkill,
  deleteSkill,
  createSkillCategory,
  getAllSkillCategory,
};

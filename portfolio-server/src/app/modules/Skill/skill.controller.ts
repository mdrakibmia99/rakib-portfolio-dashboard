import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { skillService } from './skill.service';
import { StatusCodes } from 'http-status-codes';
import sendResponse from '../../utils/sendResponse';

const skillCreate = catchAsync(async (req: Request, res: Response) => {
  const result = await skillService.createSkill(req.body);
  sendResponse(res, StatusCodes.OK, 'skill created successfully', result);
});

const getAllSkill = catchAsync(async (req, res) => {
  const result = await skillService.getAllSkill();
  sendResponse(res, StatusCodes.OK, 'all skill fetch successfully', result);
});

const getSingleSkill = catchAsync(async (req, res) => {
  const result = await skillService.getSingleSkill(req.params.id);
  sendResponse(res, StatusCodes.OK, 'skill fetch successfully', result);
});

const updateSkill = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await skillService.updateSkill(req.params.id, payload);
  sendResponse(res, StatusCodes.OK, 'skill updated successfully', result);
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
};

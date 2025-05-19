import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import { Request, Response } from 'express';
import sendResponse from '../../utils/sendResponse';
import { projectService } from './project.service';
import { sendImageToCloudinary } from '../../utils/cloudinaryImageUploader';

const projectCreate = catchAsync(async (req: Request, res: Response) => {
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
    payload.imageUrl = imageUrls;
  }
  const result = await projectService.createProject(payload);
  sendResponse(res, StatusCodes.OK, 'Project created successfully', result);
});

const getAllProjects = catchAsync(async (req, res) => {
  const result = await projectService.getAllProjects();
  sendResponse(res, StatusCodes.OK, 'all project fetch successfully', result);
});

const getSingleProject = catchAsync(async (req, res) => {
  const result = await projectService.getSingleProject(req.params.id);
  sendResponse(res, StatusCodes.OK, 'project fetch successfully', result);
});

const updateProject = catchAsync(async (req, res) => {
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
    payload.imageUrl = imageUrls;
  } else {
    const existingProject = await projectService.getSingleProject(
      req.params.id,
    );
    if (existingProject) {
      payload.imageUrl = existingProject.imageUrl;
    }
  }

  const result = await projectService.updateProject(req.params.id, payload);
  sendResponse(res, StatusCodes.OK, 'project updated successfully', result);
});

const deleteProject = catchAsync(async (req, res) => {
  await projectService.deleteProject(req.params.id);
  sendResponse(res, StatusCodes.OK, 'project delete successfully', {});
});

export const projectController = {
  projectCreate,
  getAllProjects,
  getSingleProject,
  updateProject,
  deleteProject,
};

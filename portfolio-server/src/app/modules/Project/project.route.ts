import { NextFunction, Request, Response, Router } from 'express';
import { projectController } from './project.controller';
import { uploadFile } from '../../utils/cloudinaryImageUploader';

const projectRouter = Router();

projectRouter.post(
  '/',
  uploadFile.array('images', 8),
  (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body, "req.body");
    req.body = JSON.parse(req.body.data);
    next();
  },
  projectController.projectCreate,
);

projectRouter.get("/", projectController.getAllProjects);
projectRouter.get("/:id", projectController.getSingleProject);
projectRouter.put(
  "/:id",
  uploadFile.array("images", 10),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  projectController.updateProject
);

projectRouter.delete("/:id", projectController.deleteProject);

export default projectRouter;

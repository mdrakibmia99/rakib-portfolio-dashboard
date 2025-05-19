import { NextFunction, Request, Response, Router } from "express";
import { uploadFile } from "../../utils/cloudinaryImageUploader";
import { experienceController } from "./experience.controller";


const experienceRouter = Router();

// Create Experience
experienceRouter.post(
  '/',
  uploadFile.array('images', 8),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  experienceController.createExperience,
);

// Get All Experiences
experienceRouter.get("/", experienceController.getAllExperiences);

// Get Single Experience
experienceRouter.get("/:id", experienceController.getSingleExperience);

// Update Experience
experienceRouter.put(
  "/:id",
  uploadFile.array("images", 10),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  experienceController.updateExperience
);

// Delete Experience
experienceRouter.delete("/:id", experienceController.deleteExperience);

export default experienceRouter;

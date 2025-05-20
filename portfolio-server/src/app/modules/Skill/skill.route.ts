import { NextFunction, Request, Response, Router } from 'express';
import { skillController } from './skill.controller';
import validateRequest from '../../middlewares/validateRequest';
import { SkillValidation } from './skill.validation';
import { uploadFile } from '../../utils/cloudinaryImageUploader';

const skillRouter = Router();

skillRouter.post(
  '/',
  uploadFile.single('image'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  skillController.skillCreate,
);
skillRouter.post(
  '/category',
  validateRequest(SkillValidation.skillCategorySchema),
  skillController.getAllSkillCategory,
);

skillRouter.get('/category', skillController.getAllSkillCategory);
skillRouter.get('/', skillController.getAllSkill);

skillRouter.get('/:id', skillController.getSingleSkill);

skillRouter.put(
  '/:id',
  uploadFile.single('image'), // for handling image upload
  (req: Request, res: Response, next: NextFunction) => {
    // If the request has a body with JSON `data`, parse it
    if (req.body.data) {
      req.body = JSON.parse(req.body.data);
    }
    next();
  },
  validateRequest(SkillValidation.updateSkillZodSchema),
  skillController.updateSkill,
);

skillRouter.delete('/:id', skillController.deleteSkill);

export default skillRouter;

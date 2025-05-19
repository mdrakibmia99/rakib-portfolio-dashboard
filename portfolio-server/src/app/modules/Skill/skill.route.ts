import { Router } from 'express';
import { skillController } from './skill.controller';
import validateRequest from '../../middlewares/validateRequest';
import { SkillValidation } from './skill.validation';

const skillRouter = Router();

skillRouter.post(
  '/',
  validateRequest(SkillValidation.createSkillZodSchema),
  skillController.skillCreate,
);

skillRouter.get('/', skillController.getAllSkill);

skillRouter.get('/:id', skillController.getSingleSkill);

skillRouter.put(
  '/:id',
  validateRequest(SkillValidation.updateSkillZodSchema),
  skillController.updateSkill,
);

skillRouter.delete('/:id', skillController.deleteSkill);

export default skillRouter;

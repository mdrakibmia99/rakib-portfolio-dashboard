import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { userValidation } from './user.validation';
import { userController } from './user.controller';

const userRouter = Router();
userRouter.post(
  '/register',
  validateRequest(userValidation.UserValidationSchema),
  userController.createUser,
);
export default userRouter;

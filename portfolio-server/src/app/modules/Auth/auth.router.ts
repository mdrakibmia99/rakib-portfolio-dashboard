import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { authController } from './auth.controller';
import { authValidation } from './auth.validation';



const authRouter = Router();

authRouter.post(
  '/login',
  validateRequest(authValidation.loginValidationSchema),
  authController.loginUser,
);
authRouter.post(
  '/refresh-token',
  validateRequest(authValidation.refreshTokenValidationSchema),
  authController.refreshToken,
);
authRouter.post(
  '/send-mail',
  validateRequest(authValidation.contactValidationSchema),
  authController.contactMessage,
);


export default authRouter;

import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { authController } from './auth.controller';
import { authValidation } from './auth.validation';
// import { USER_ROLE } from '../../constants/user';
// import auth from '../../middlewares/auth';


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
// authRouter.put(
//   '/update-password',
//   auth(USER_ROLE.admin),
//   validateRequest(authValidation.updatePasswordValidationSchema),
//   authController.updatePassword,
// );


export default authRouter;

import { Router } from 'express';
import authRouter from '../modules/Auth/auth.router';

import userRouter from '../modules/user/user.router';

const router = Router();
const moduleRoutes = [
  {
    path: '/auth',
    route: authRouter,
  },
  {
    path: '/users',
    route: userRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;

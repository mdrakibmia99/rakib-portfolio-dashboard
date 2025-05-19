import { Router } from 'express';
import authRouter from '../modules/Auth/auth.router';

import userRouter from '../modules/user/user.router';
import projectRouter from '../modules/Project/project.route';
import blogRouter from '../modules/Blog/blog.route';

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
  {
    path: '/projects',
    route: projectRouter,
  },
  {
    path: '/blogs',
    route: blogRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;

import { Router } from "express";
import auth from "../../middlewares/auth";
import { adminController } from "./admin.controller";
import { USER_ROLE } from "../../constants/user";


const adminRouter= Router();
adminRouter.get(
    '/users',
    auth(USER_ROLE.admin),
    adminController.getUsers
  );
adminRouter.put(
    '/users/:id',
    auth(USER_ROLE.admin),
    adminController.updateUserRole
  );
adminRouter.delete(
    '/users/:id',
    auth(USER_ROLE.admin),
    adminController.deleteUser
  );





  export default adminRouter;
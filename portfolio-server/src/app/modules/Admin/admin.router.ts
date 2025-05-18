import { Router } from "express";
import auth from "../../middlewares/auth";
import { adminController } from "./admin.controller";
import { USER_ROLE } from "../../constants/user";
import { landlordController } from "../Landlord/landlord.controller";


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

  adminRouter.get(
    '/listings',
    auth( USER_ROLE.admin),
    adminController.adminGetAllLandLordListing,
  );
  adminRouter.put(
    '/listings/:id',
    auth( USER_ROLE.admin),
    landlordController.updateLandLordListing,
  );
  adminRouter.delete(
    '/listings/:id',
    auth(USER_ROLE.landlord, USER_ROLE.admin),
    landlordController.deleteLandLordListing,
  );

  export default adminRouter;
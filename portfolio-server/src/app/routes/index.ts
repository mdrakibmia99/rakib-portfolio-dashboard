import { Router } from "express";
import authRouter from "../modules/Auth/auth.router";
// import adminRouter from "../modules/Admin/admin.router";
import userRouter from "../modules/user/user.router";
import landLordRouter from "../modules/Landlord/landlord.router";
import TenantRouter from "../modules/Tenant/tenant.router";
import adminRouter from "../modules/Admin/admin.router";




const router= Router()
const moduleRoutes=[
    {
        path:"/auth",
        route:authRouter
    },
    {
        path:"/users",
        route:userRouter
    },
    {
        path:"/admin",
        route:adminRouter
    },
    {
        path:"/landlords",
        route:landLordRouter
    },
    {
        path:"/tenants",
        route:TenantRouter
    },


]

moduleRoutes.forEach(route=>router.use(route.path,route.route))

export default router;
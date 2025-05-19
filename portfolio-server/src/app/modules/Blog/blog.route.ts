import { NextFunction, Request, Response, Router } from "express";
import { uploadFile } from "../../utils/cloudinaryImageUploader";
import { blogController } from "./blog.controller";


const blogRouter = Router();

blogRouter.post(
  '/',
  uploadFile.array('images', 8),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  blogController.blogCreate,
);

blogRouter.get("/", blogController.getAllBlogs);
blogRouter.get("/:id", blogController.getSingleBlog);
blogRouter.put(
  "/:id",
  uploadFile.array("images", 10),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  blogController.updateBlog
);

blogRouter.delete("/:id", blogController.deleteBlog);

export default blogRouter;


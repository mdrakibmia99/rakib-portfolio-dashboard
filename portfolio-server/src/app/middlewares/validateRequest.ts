import { AnyZodObject } from 'zod';
import catchAsync from '../utils/catchAsync';
import { NextFunction, Request, Response } from 'express';

const validateRequest = (schema: AnyZodObject) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const verifyData = await schema.parseAsync({
      body: req.body,
      cookies: req?.cookies,
    });
    req.body = verifyData.body;
    next();
  });
};
export default validateRequest;

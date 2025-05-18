/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from "express";
import config from "../config";


export const handleValidationError=(err:any,res:Response)=>{
  const issues = Object.values(err.errors).map((item: any) => {
    return {
        name: item.name,
        path: item.path,
        message: item.message
    }
});
    res.status(400).json({
        success: false,
        message: err.message,
        statusCode: 400,
        error: err,
        stack: config.NODE_ENV === 'development' ? err?.stack : null,
        issues: issues
      });

}
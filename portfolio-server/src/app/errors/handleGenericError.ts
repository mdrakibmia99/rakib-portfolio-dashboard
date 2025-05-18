import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import config from "../config";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleGenericError=(err:any,res:Response)=>{
  //  console.log(err.statusCode,"amar error")
    res.status(err?.statusCode || 500).json({
      success: false,
      message: err.message,
      statusCode:err?.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
      error: err,
      stack: config.NODE_ENV === 'development' ? err?.stack : null,});
}
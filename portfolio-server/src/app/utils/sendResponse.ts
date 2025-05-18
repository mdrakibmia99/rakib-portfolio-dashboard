
import { Response } from "express";

const sendResponse=(res:Response,statusCode:number,message:string,data:any)=>{
    res.status(statusCode).json({
        success:true,
        message,
        statusCode,
        data

    })
}
export default sendResponse;
import { Response } from "express";

export const formattedResponseHandler = (res : Response, data : any, statusCode : number, msg : string | null) => {
    let returnObj : any = {};
    if(data) returnObj = data;
    if(msg) returnObj.message = msg;
    return res.status(statusCode).json(returnObj);
    
}
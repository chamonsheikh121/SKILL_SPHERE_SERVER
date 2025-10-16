import { NextFunction, Request, Response } from "express"


export const request_data_parser = async(req:Request, res:Response,next:NextFunction)=>{
    // console.log(req?.body?.data);
    if(req?.body?.data){
       req.body= JSON.parse(req?.body?.data)
    //    console.log('saC',req.body);
        next()
    }
}
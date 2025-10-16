import { NextFunction, Request, Response } from "express"


export const request_data_parser = async(req:Request, res:Response,next:NextFunction)=>{
    
    if(req?.body?.data){
       req.body= JSON.parse(req?.body?.data)
    
    }
    next()
}
import { NextFunction, Request, Response } from "express"
import { catch_async } from "../utils/catch_async"



export const authorizer = ()=>{

    return catch_async(async(req:Request, res:Response, next:NextFunction)=>{

    

    })

}
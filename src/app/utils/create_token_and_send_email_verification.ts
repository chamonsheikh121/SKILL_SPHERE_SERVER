import config from "../config";
import { TAuthPayload } from "../modules/auth/auth.interface";
import UserModel from "../modules/user/user.model";
import  jwt from 'jsonwebtoken';
import { send_verification_email } from "./send_verification_mail";



export const create_token_and_verify_email = async(email: string, base_url: string)=>{

   try {
     const result = await UserModel.findOne({email})

    const auth_payload: TAuthPayload = {
        email: result?.email as string,
        role: result?.role as "student" | "admin" | "user",
        registration_number: result?.registration_number,
      };
    
      console.log(auth_payload);
    
      const verification_token = await jwt.sign(auth_payload, config.VERIFICATION_TOKEN_SECRET as string,{expiresIn:"10m"});
    
    const verification_link = `${base_url}/api/v1/auth/verify-email?email=${result?.email}&token=${verification_token}`
    
    
    await send_verification_email(verification_link,email)

   } catch (error) {
    throw new Error("Failed to send verification email")
   }
}
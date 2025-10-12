import mongoose from "mongoose";
import { TAdmin } from "./admin.interface"
import { AdminModel } from "./admin.model"
import UserModel from "../user/user.model";
import { generate_admin_reg_numb } from "../user/generate_registration_number";


const create_admin_to_db = async(payload:TAdmin)=>{
    
const session = await mongoose.startSession()

try {
    session.startTransaction()

    const admin_registration_number = await generate_admin_reg_numb();
    payload.registration_number= admin_registration_number

    await UserModel.findByIdAndUpdate(payload.user_id,{
        role:'admin'
    },{session});



    const result = await AdminModel.create([payload],{session})

   await session.commitTransaction()
   await session.endSession()
    return result

} catch (error) {
   await session.abortTransaction()
    await session.endSession()
}

const result = await AdminModel.create(payload);
return result;

}

export const admin_services = {
    create_admin_to_db
}
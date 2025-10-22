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

const get_single_admin_from_db = async (id: string) => {
  const result = await AdminModel.findById(id);
  if (!result) {
    throw new Error("No admin found");
  }

  return result;
};
const get_all_admin_from_db = async () => {
  const result = await AdminModel.find();
  if (!result.length) {
    throw new Error("No admins found");
  }

  return result;
};

export const admin_services = {
    create_admin_to_db,
    get_single_admin_from_db,
    get_all_admin_from_db
}
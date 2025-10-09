import { TUser } from "./user.interface";
import UserModel from "./user.model";

const create_user_into_db = async (payload: TUser) => {
  const result = await UserModel.create(payload);
  return result;
};

export const user_services = {
  create_user_into_db,
};

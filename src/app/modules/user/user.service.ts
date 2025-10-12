import { TUser } from "./user.interface";
import UserModel from "./user.model";

const create_user_into_db = async (payload: TUser) => {
  const result = await UserModel.create(payload);
  return result;
};

const update_user_into_db = async (id: string, payload: Partial<TUser>) => {
  const { name, ...rest_primitive_data } = payload;
  const new_data: Record<string, unknown> = { ...rest_primitive_data };

  if (name && Object.keys(name).length) {
    console.log(Object.keys(name), Object.keys(name).length);
    for (const [keys, value] of Object.entries(name)) {
      new_data[`name.${keys}`] = value;
    }
  }
  console.log(new_data);

  const result = await UserModel.findByIdAndUpdate(id, new_data, { new: true });
  return result;
};

const get_single_user_from_db = async (id: string) => {
  const result = await UserModel.findById(id);
  if (!result) {
    throw new Error("No user found");
  }

  return result;
};
const get_all_user_from_db = async () => {
  const result = await UserModel.find();
  if (!result.length) {
    throw new Error("No user found");
  }

  return result;
};

export const user_services = {
  create_user_into_db,
  update_user_into_db,
  get_single_user_from_db,
  get_all_user_from_db
};

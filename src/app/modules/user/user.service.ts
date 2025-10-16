import path from "path";
import config from "../../config";
import { create_token_and_verify_email } from "../../utils/create_token_and_send_email_verification";
import { send_verification_email } from "../../utils/send_verification_mail";
import { TAuthPayload } from "../auth/auth.interface";
import { TUser } from "./user.interface";
import UserModel from "./user.model";
import fs from "fs";
import { image_url_generator } from "../../utils/image_url_generator";

const create_user_into_db = async (
  payload: TUser,
  base_url: string,
  file_name: string | undefined,
  file_full_name: string | undefined
) => {
  const result = await UserModel.create(payload);
  if (!result) {
    throw new Error("User creation failed");
  }

  const image_url = image_url_generator(
    result,
    file_name,
    file_full_name,
    base_url
  );

  if (image_url) {
    const user_with_profile_image = await UserModel.findOneAndUpdate(
      {
        email: result?.email,
      },
      {
        profile_image: image_url,
      },
      {
        new: true,
      }
    );
    await create_token_and_verify_email(result?.email, base_url);
    return user_with_profile_image;
  }

  await create_token_and_verify_email(result?.email, base_url);
  return result;
};

const update_user_into_db = async (
  id: string,
  payload: Partial<TUser>,
  base_url: string,
  file_name: string | undefined,
  file_full_name: string | undefined
) => {
  // step 1: modifying none primitive to primitive as update payload
  const { name, ...rest_primitive_data } = payload;
  const new_data: Record<string, unknown> = { ...rest_primitive_data };

  if (name && Object.keys(name).length) {
    console.log(Object.keys(name), Object.keys(name).length);
    for (const [keys, value] of Object.entries(name)) {
      new_data[`name.${keys}`] = value;
    }
  }

  // step 2: profile image create or if exist update
  const result = await UserModel.findById(id);
  if (!result) {
    throw new Error("User not found");
  }
  const profile_image = image_url_generator(
    result,
    file_name,
    file_full_name,
    base_url
  );

  new_data.profile_image = profile_image;
  const update_user_to_db = await UserModel.findByIdAndUpdate(id, new_data, {
    new: true,
  });
  return update_user_to_db;
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
  get_all_user_from_db,
};

import bcrypt from "bcrypt";
import config from "../config";

export const bcrypt_pass = async (password: string) => {
  const result = await bcrypt.hash(
    password,
    Number(config.BCRYPT_SALT_ROUND)
  );
  return result;
};

import bcrypt from "bcrypt";
export const compare_bcrypt_pass = async (
  bcrypt_pass: string,
  user_pass: string
): Promise<boolean> => {
    const is_match = await bcrypt.compare(user_pass,bcrypt_pass);
  return is_match;
};

import bcrypt from "bcrypt";
export const compare_bcrypt_pass = async (
  plain_pass: string,
  bcrypted_pass: string
): Promise<boolean> => {
    const is_match = await bcrypt.compare(plain_pass,bcrypted_pass);
  return is_match;  
};

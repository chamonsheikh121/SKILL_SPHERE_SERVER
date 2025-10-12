import { TCertificate } from "./certificate.interface";
import Certificate_Model from "./certificate.model";



const create_certificate_into_db = async (payload: TCertificate) => {
  const result = await Certificate_Model.create(payload);
  return result;
};

export const certificate_services = {
  create_certificate_into_db,
};

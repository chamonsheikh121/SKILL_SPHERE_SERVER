import path from "path";
import { TCertificate } from "./certificate.interface";
import Certificate_Model from "./certificate.model";
import fs from "fs";
import { image_url_generator } from "../../utils/image_url_generator";

const create_certificate_into_db = async (
  payload: TCertificate,
  base_url: string,
  file_name: string | undefined,
  file_full_name: string | undefined
) => {
  const result = await Certificate_Model.create(payload);
  if (!result) {
    throw new Error("Failed to create certificate");
  }

  const certificateUrl = image_url_generator(
    result,
    file_name,
    file_full_name,
    base_url
  );

  if (certificateUrl) {
    const result_with_image = await Certificate_Model.findByIdAndUpdate(
      result?._id,
      {
        certificateUrl,
      },
      {
        new: true,
      }
    );
    return result_with_image;
  }

  return result;
};

export const certificate_services = {
  create_certificate_into_db,
};

import path from "path";
import { TCertificate } from "./certificate.interface";
import Certificate_Model from "./certificate.model";
import fs from "fs";
import { image_url_generator } from "../../utils/image_url_generator";
import UserModel from "../user/user.model";
import { CourseModel } from "../course/course.model";

const create_certificate_into_db = async (
  payload: TCertificate,
  base_url: string,
  file_name: string | undefined,
  file_full_name: string | undefined
) => {
  const result = await Certificate_Model.create(payload);

  const user = await UserModel.findById(payload?.userId);
  const course = await CourseModel.findById(payload?.courseId);

  if (!user) {
    throw new Error("User not Found");
  }
  if (!course) {
    throw new Error("Course not Found");
  }
  if (!result) {
    throw new Error("Failed to create certificate");
  }

  const certificateUrl = image_url_generator(
    "certificate",
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

const update_certificate_into_db = async (
  id: string,
  payload: Partial<TCertificate>,
  file_name: string | undefined,
  file_full_name: string | undefined,
  base_url: string
) => {

  const certificate = await Certificate_Model.findById(id);
  console.log(certificate);

  if (!certificate) {
    throw new Error("Certificate not found");
  }

  const certificateUrl = image_url_generator(
    "certificate",
    certificate,
    file_name,
    file_full_name,
    base_url
  );

  if (certificateUrl) {
    payload.certificateUrl = certificateUrl;
    const result = await Certificate_Model.findByIdAndUpdate(id, payload, {
      new: true,
    });
    return result;
  }
  const result = await Certificate_Model.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

export const certificate_services = {
  create_certificate_into_db,
  update_certificate_into_db,
};

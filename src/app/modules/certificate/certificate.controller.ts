import { catch_async } from "../../utils/catch_async";
import { certificate_services } from "./certificate.service";

const create_certificate = catch_async(async (req, res, next) => {
  const file = req.file;
  const file_name = file?.filename;
  const file_full_name = file?.originalname;

  const base_url = `${req.protocol}://${req.get("host")}`;

  const result = await certificate_services.create_certificate_into_db(
    req.body,
    base_url,
    file_name,
    file_full_name
  );
  res.status(200).send({
    success: true,
    message: "Certificate created successfully",
    data: result,
  });
});
const update_certificate = catch_async(async (req, res, next) => {
  const { certificate_id } = req?.params;
  const file = req.file;
  const file_name = file?.filename;
  const file_full_name = file?.originalname;

  const base_url = `${req.protocol}://${req.get("host")}`;

  console.log(certificate_id);
  const result = await certificate_services.update_certificate_into_db(
    certificate_id as string,
    req.body,
    file_name,
    file_full_name,
    base_url
  );
  res.status(200).send({
    success: true,
    message: "Certificate created successfully",
    data: result,
  });
});

export const certificate_controllers = {
  create_certificate,
  update_certificate
};

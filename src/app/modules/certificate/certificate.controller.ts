import { catch_async } from "../../utils/catch_async";
import { certificate_services } from "./certificate.service";


const create_certificate = catch_async(async (req, res, next) => {
const file = req.file;
  const file_name = file?.filename;
  const file_full_name = file?.originalname;

  const base_url = `${req.protocol}://${req.get("host")}`;

  const result = await certificate_services.create_certificate_into_db(req.body,
     base_url,
    file_name,
    file_full_name
  )
  res.status(200).send({
    success: true,
    message: "Certificate created successfully",
    data: result,
  });
});

export const certificate_controllers = {
  create_certificate,
};

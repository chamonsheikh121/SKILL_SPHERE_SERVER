import { catch_async } from "../../utils/catch_async";
import { certificate_services } from "./certificate.service";


const create_certificate = catch_async(async (req, res, next) => {


  const result = await certificate_services.create_certificate_into_db(req.body)
  res.status(200).send({
    success: true,
    message: "Certificate created successfully",
    data: result,
  });
});

export const certificate_controllers = {
  create_certificate,
};

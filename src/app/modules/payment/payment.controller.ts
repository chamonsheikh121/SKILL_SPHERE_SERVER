import { catch_async } from "../../utils/catch_async";
import { payment_services } from "./payment.service";

const create_payment = catch_async(async (req, res, next) => {

    

  const result = await payment_services.create_payment_into_db(req.body)
  res.status(200).send({
    success: true,
    message: "payment created successfully",
    data: result,
  });
});

export const payment_controllers = {
  create_payment,
};

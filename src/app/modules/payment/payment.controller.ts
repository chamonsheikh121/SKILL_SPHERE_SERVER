import { catch_async } from "../../utils/catch_async";
import { payment_services } from "./payment.service";

const initialize_SSLCOMMERZ_payment = catch_async(async (req, res, next) => {
  const result = await payment_services.initialize_sslcommerz_into_db(req.body)
  res.status(200).send({
    success: true,
    message: "SSL initialized successfully",
    data: result,
  });
});
const success_SSLCOMMERZ_payment = catch_async(async (req, res, next) => {

    const trans_id = req.params.transactionId
  const result = await payment_services.success_sslcommerz_into_db(trans_id)
  if(result){
    res.status(200).redirect(`http://localhost:5173/payment/success/${result?._id}`)
  }
  ;
});
const fail_SSLCOMMERZ_payment = catch_async(async (req, res, next) => {

    const trans_id = req.params.transactionId
  const result = await payment_services.fail_sslcommerz_into_db(trans_id)
  if(result){
    res.status(200).redirect(`http://localhost:5173/payment/fail/${result?._id}`)
  }
  ;
});
const cancel_SSLCOMMERZ_payment = catch_async(async (req, res, next) => {

    const trans_id = req.params.transactionId
  const result = await payment_services.cancel_sslcommerz_into_db(trans_id)
  if(result){
    res.status(200).redirect(`http://localhost:5173/payment/cancel/${result?._id}`)
  }
  ;
});

export const payment_controllers = {
  initialize_SSLCOMMERZ_payment,
  success_SSLCOMMERZ_payment,
  fail_SSLCOMMERZ_payment,
  cancel_SSLCOMMERZ_payment
};

import { catch_async } from "../../utils/catch_async";
import { review_services } from "./review.service";


const create_review = catch_async(async (req, res, next) => {
  const result = await review_services.create_review_into_db(req.body);
  res.status(200).send({
    success: true,
    message: "review created successfully",
    data: result,
  });
});

export const review_controllers = {
  create_review,
};

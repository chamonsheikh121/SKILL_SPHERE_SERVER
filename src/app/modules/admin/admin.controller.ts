import { catch_async } from "../../utils/catch_async";
import { admin_services } from "./admin.service";


const create_admin=catch_async(async(req,res, next)=>{

    const result = await admin_services.create_admin_to_db(req.body)

    res.status(200).send({
        success:true,
        message:'admin created successfully',
        data: result
    })

})


const get_single_admin_from_db = catch_async(async (req, res, next) => {

  const admin_id = req?.params?.admin_id

  const result = await admin_services.get_single_admin_from_db(admin_id as string);
  res.status(200).send({
    success: true,
    message: "student retrieved successfully",
    data: result,
  });
});
const get_all_admins = catch_async(async (req, res, next) => {
  const result = await admin_services.get_all_admin_from_db();
  res.status(200).send({
    success: true,
    message: "students retrieved successfully",
    data: result,
  });
});



export const admin_controllers={
    create_admin,
    get_all_admins,
    get_single_admin_from_db
}
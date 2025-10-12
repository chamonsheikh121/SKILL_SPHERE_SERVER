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


export const admin_controllers={
    create_admin
}
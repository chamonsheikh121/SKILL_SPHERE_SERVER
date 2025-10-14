

import  express  from 'express';
import { validate_request } from '../../middle_wires/validate_request';
const router =  express.Router()


router.post('/login',validate_request(user_zod_validation_schema), user_controllers.create_user)


export const user_router = router;
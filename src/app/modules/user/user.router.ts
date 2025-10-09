
import  express  from 'express';
import { user_controllers } from './user.controller';
import { validate_request } from '../../middle_wires/validate_request';
import { user_zod_validation_schema } from './user.zod_validation';
const router =  express.Router()


router.post('/create-user',validate_request(user_zod_validation_schema), user_controllers.create_user)

export const user_router = router;
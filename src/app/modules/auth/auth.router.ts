

import  express  from 'express';
import { validate_request } from '../../middle_wires/validate_request';
import { forget_pass_zod_validation_schema, login_zod_validation_schema } from './auth.zod_validation';
import { auth_controllers } from './auth.controller';
const router =  express.Router()


router.post('/login',validate_request(login_zod_validation_schema),auth_controllers.login)
router.post('/forget-password',validate_request(forget_pass_zod_validation_schema),auth_controllers.forgot_password)


export const auth_router = router;
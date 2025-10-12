
import  express  from 'express';
import { user_controllers } from './user.controller';
import { validate_request } from '../../middle_wires/validate_request';
import { update_user_zod_validation_schema, user_zod_validation_schema } from './user.zod_validation';
const router =  express.Router()


router.post('/create-user',validate_request(user_zod_validation_schema), user_controllers.create_user)
router.patch('/update-user/:user_id',validate_request(update_user_zod_validation_schema), user_controllers.update_user)
router.get('/:user_id', user_controllers.get_single_user)
router.get('/', user_controllers.get_all_user)

export const user_router = router;
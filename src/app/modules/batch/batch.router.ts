
import  express  from 'express';
import { validate_request } from '../../middle_wires/validate_request';
import { batch_zod_validation_schema } from './batch.zod_validation';
import { batch_controllers } from './batch.controller';

const router =  express.Router()


router.post('/create-offered-course',validate_request(batch_zod_validation_schema), batch_controllers.create_batch_course)

export const batch_router = router;
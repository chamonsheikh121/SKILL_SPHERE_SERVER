
import  express  from 'express';
import { validate_request } from '../../middle_wires/validate_request';
import { batch_zod_validation_schema, update_batch_zod_validation_schema } from './batch.zod_validation';
import { batch_controllers } from './batch.controller';

const router =  express.Router()


router.post('/create-batch',validate_request(batch_zod_validation_schema), batch_controllers.create_batch)
router.patch('/update-batch/:batch_id',validate_request(update_batch_zod_validation_schema), batch_controllers.update_batch)
router.get('/:batch_id', batch_controllers.get_single_batch)
router.get('/', batch_controllers.get_all_batch)
export const batch_router = router;
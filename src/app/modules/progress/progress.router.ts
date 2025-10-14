import  express  from 'express';
import { validate_request } from '../../middle_wires/validate_request';
import { progress_controllers } from './progress.controller';
const router =  express.Router()


router.get('/:progress_id', progress_controllers.get_single_progress)
router.get('/', progress_controllers.get_all_progress)

export const progress_router = router;
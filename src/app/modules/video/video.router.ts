
import  express  from 'express';
import { video_controllers } from './video.controller';
import { upload_video } from '../../utils/upload_video';
import { validate_request } from '../../middle_wires/validate_request';
import { video_update_zod_validation_schema, video_zod_validation_schema } from './video.zod_validation';
const router =  express.Router()


router.post('/create-video',upload_video.single('video_file'), validate_request(video_zod_validation_schema), video_controllers.create_video)
router.patch('/update-video/:video_id',validate_request(video_update_zod_validation_schema), video_controllers.update_video)
router.get('/:video_id', video_controllers.get_single_video)
router.get('/', video_controllers.get_all_video)
router.delete('/delete-video/:video_id', video_controllers.delete_video)

export const video_router = router;
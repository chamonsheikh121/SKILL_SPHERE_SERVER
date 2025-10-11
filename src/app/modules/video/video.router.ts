
import  express  from 'express';
import { user_controllers } from './video.controller';
import { upload } from '../../utils/upload_video';
const router =  express.Router()


router.post('/create-video',upload.single('video_file'), user_controllers.create_video)


export const video_router = router;
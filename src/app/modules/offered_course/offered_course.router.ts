
import  express  from 'express';
import { validate_request } from '../../middle_wires/validate_request';
import { offered_course_zod_validation_schema } from './offered_course.zod_validation';
import { offered_course_controllers } from './offered_course.controller';

const router =  express.Router()


router.post('/create-offered-course',validate_request(offered_course_zod_validation_schema), offered_course_controllers.create_offered_course)

export const offered_course_router = router;
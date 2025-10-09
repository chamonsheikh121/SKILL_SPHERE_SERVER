
import  express  from 'express';
import { validate_request } from '../../middle_wires/validate_request';
import { course_zod_validation_schema } from './course.zod_validation';
import { course_controllers } from './course.controller';
const router =  express.Router()


router.post('/create-course',validate_request(course_zod_validation_schema), course_controllers.create_course)

export const course_router = router;
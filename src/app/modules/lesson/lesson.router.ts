
import  express  from 'express';
import { validate_request } from '../../middle_wires/validate_request';
import { lesson_zod_validation_schema, update_lesson_zod_validation_schema } from './lesson.zod_validation';
import { lesson_controllers } from './lesson.controller';
const router =  express.Router()


router.post('/create-lesson',validate_request(lesson_zod_validation_schema), lesson_controllers.create_lesson)
router.patch('/update-lesson/:lesson_id',validate_request(update_lesson_zod_validation_schema), lesson_controllers.update_lesson)
router.get('/:lesson_id', lesson_controllers.get_single_lesson)
router.get('/', lesson_controllers.get_all_lesson)
router.delete('/delete-lesson/:lesson_id', lesson_controllers.delete_lesson)

export const lesson_router = router;
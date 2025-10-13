
import  express  from 'express';
import { student_controllers } from './student.controller';

const router =  express.Router()

router.get('/:student_id', student_controllers.get_single_student)
router.get('/', student_controllers.get_all_student)

export const student_router = router;
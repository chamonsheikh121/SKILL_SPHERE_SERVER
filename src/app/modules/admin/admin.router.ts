
import express from 'express'
import { admin_controllers } from './admin.controller';
const router = express.Router()

router.post('/create-admin', admin_controllers.create_admin)
router.get('/', admin_controllers.get_all_admins)
router.get('/:admin_id', admin_controllers.get_single_admin_from_db)

export const admin_router = router;
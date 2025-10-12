
import express from 'express'
import { admin_controllers } from './admin.controller';
const router = express.Router()

router.post('/create-admin', admin_controllers.create_admin)


export const admin_router = router;
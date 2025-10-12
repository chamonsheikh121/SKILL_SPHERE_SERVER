
import  express  from 'express';
import { validate_request } from '../../middle_wires/validate_request';
import { blog_zod_validation_schema } from './blog.zod_validation';
import { blog_controllers } from './blog.controller';
const router =  express.Router()


router.post('/create-blog',validate_request(blog_zod_validation_schema), blog_controllers.create_blog)

export const blog_router = router;
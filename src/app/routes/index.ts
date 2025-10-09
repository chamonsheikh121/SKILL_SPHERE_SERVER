
import express from 'express';
import { user_router } from '../modules/user/user.router';

const router= express.Router()


const routes=[
    {
        path:'/users',
        route:user_router
    }
]


routes.forEach((route)=> router.use(route.path, route.route))

export default router;
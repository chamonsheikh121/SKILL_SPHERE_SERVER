
import  express  from 'express';
import { validate_request } from '../../middle_wires/validate_request';
import { certificate_controllers } from './certificate.controller';
import { certificate_zod_validation_schema } from './certificate.zod_validation';

const router =  express.Router()


router.post('/create-certificate',validate_request(certificate_zod_validation_schema), certificate_controllers.create_certificate)

export const certificate_router = router;
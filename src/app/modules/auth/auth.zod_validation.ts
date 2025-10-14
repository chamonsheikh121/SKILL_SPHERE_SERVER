import {z} from "zod"

export const login_zod_validation_schema = z.object({
    body:z.object({
        email: z.string().email("Invalid email Address"),
        password:z.string()
    })
})  
export const forget_pass_zod_validation_schema = z.object({
    body:z.object({
        email: z.string().email("Invalid email Address"),
    })
})  
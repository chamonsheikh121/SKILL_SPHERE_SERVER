import {z} from "zod"

export const login_zod_validation_schema = z.object({
    body:z.object({
        email: z.string().email("Invalid email Address"),
        password:z.string().min(6, "Password must be at least 6 characters long")
    })
})  
export const change_pass_zod_validation_schema = z.object({
    body:z.object({
        old_password:z.string(),
        new_password:z.string().min(6, "Password must be at least 6 characters long")
    })
})  
export const forget_pass_zod_validation_schema = z.object({
    body:z.object({
        email: z.string().email("Invalid email Address"),
    })
})  
export const reset_pass_zod_validation_schema = z.object({
    body:z.object({
        email: z.string().email("Invalid email Address"),
        new_password:z.string().min(6, "Password must be at least 6 characters long")
    })
})  
import z from "zod"

const login_zod_validation_schema = z.object({
    body:{
        email: z.string().email("Invalid email Address"),
        password:z.string()
    }
})
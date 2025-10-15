
export type TAuth ={
    email: string;
    password: string
}


export type TChange_password = {
    old_password: string;
    new_password: string;
}


export type TAuthPayload = {
    email: string;
    role:  "student" | "admin" | "user";
    registration_number?: string | undefined;
}

export type TReset_password ={
    email: string;
    new_password: string;
}
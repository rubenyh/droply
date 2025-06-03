import * as z from "zod";

export const signInSchema = z.object({
    identifier: z.string().min(1, {message: "Email is required"}).email({message: "Please enter a valid email"}),
    password: z.string().min(1, {message: "Please enter your password"}).min(8, {message: "Password must be atleat 8 characters"}) 
})
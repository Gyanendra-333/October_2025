import { z } from "zod";

// userNameValidationSchema
export const userNameValidationSchema = z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be under 20 characters")
    .regex(/^[A-Za-z][A-Za-z0-9_]*$/, "Username must start with a letter and contain only letters, numbers, or underscores");


// signUpSchema
export const signUpSchema = z
    .object({
        username: userNameValidationSchema,

        email: z
            .string()
            .email("Invalid email address"),

        password: z
            .string()
            .min(6, "Password must be at least 6 characters")
            .max(32, "Password must not exceed 32 characters"),

        confirmPassword: z
            .string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });


// signInSchema
export const signInSchema = z.object({
    email: z
        .email("Please enter a valid email"),

    password: z
        .string()
        .min(6, "Password must be at least 6 characters"),
});

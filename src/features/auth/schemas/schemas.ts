import z from "zod";

export const loginSchema = z.object({
  username: z.string().min(3, "At least 3 characters"),
  password: z.string().min(6, "At least 6 characters"),
});

export const registerSchema = z.object({
  name: z.string().min(2, "At least 2 characters"),
  username: z
    .string()
    .min(3, "At least 3 characters")
    .regex(/^\S+$/, "No spaces allowed"),
  password: z.string().min(6, "At least 6 characters"),
});

import type z from "zod";
import type { loginSchema, registerSchema } from "../schemas/schemas";

export type LoginFields = z.infer<typeof loginSchema>;
export type RegisterFields = z.infer<typeof registerSchema>;

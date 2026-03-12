import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  phone: z
    .string()
    .min(9, "Phone number is too short")
    .max(15, "Phone number is too long")
    .regex(/^[0-9+\-\s]+$/, "Phone number contains invalid characters"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters long")
    .max(500, "Message is too long"),
});

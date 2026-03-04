import z, { email } from "zod";

export const loginSchema = z.object({
  email: z.email({ error: "Invalid email address" }),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const registerSchema = loginSchema.extend({
  fullname: z.string().min(3, "Name too short"),
});

export const otpSchema = z.object({
  email: z.email({ error: "Invalid email address" }),
  otp: z
    .string()
    .regex(/^\d+$/, "OTP must be numeric")
    .length(6, "OTP must be 6 characters long"),
});

import { z } from "zod";

export const addressSchema = z.object({
  label: z.string().min(1, "Label is required"),
  recipient_name: z.string().min(1, "Recipient name is required"),
  phone: z
    .string()
    .min(9, "Phone number is too short")
    .max(15, "Phone number is too long")
    .regex(/^[0-9+\-\s]+$/, "Phone number contains invalid characters"),
  address_line: z.string().min(1, "Street address is required"),
  city: z.string().min(1, "City is required"),
  province: z.string().min(1, "Province is required"),
  postal_code: z.string().min(1, "Postal code is required"),
  is_default: z.boolean().optional().default(false),
});

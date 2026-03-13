import z from "zod";

export const checkoutSchema = z.object({
  address_id: z.string().min(1, "Address is required"),
  payment_method: z.enum(["bank_transfer", "cod"]),
  notes: z.string().max(100).optional(),
});

import z from "zod";

export const promotionSchema = z
  .object({
    name: z
      .string()
      .min(3, "Promotion name must be at least 3 characters")
      .max(255, "Promotion name must not exceed 255 characters"),
    description: z
      .string()
      .max(1000, "Description must not exceed 1000 characters")
      .optional()
      .default(""),
    discount_type: z.enum(["percentage", "fixed"], {
      errorMap: () => ({
        message: "Discount type must be percentage or fixed",
      }),
    }),
    discount_value: z.preprocess(
      (val) => {
        if (val === "" || val === null || val === undefined) return undefined;
        const num = Number(val);
        return Number.isNaN(num) ? undefined : num;
      },
      z
        .number({
          required_error: "Discount value is required",
          invalid_type_error: "Discount value must be a valid number",
        })
        .positive("Discount value must be greater than 0"),
    ),
    min_purchase: z.preprocess(
      (val) => {
        if (val === "" || val === null || val === undefined) return undefined;
        const num = Number(val);
        return Number.isNaN(num) ? undefined : num;
      },
      z
        .number({
          invalid_type_error: "Minimum purchase must be a valid number",
        })
        .min(0, "Minimum purchase cannot be negative")
        .optional()
        .default(0),
    ),
    max_discount: z.preprocess(
      (val) => {
        if (val === "" || val === null || val === undefined) return undefined;
        const num = Number(val);
        return Number.isNaN(num) ? undefined : num;
      },
      z
        .number({
          invalid_type_error: "Maximum discount must be a valid number",
        })
        .min(0, "Maximum discount cannot be negative")
        .optional()
        .default(0),
    ),
    start_date: z.string().min(1, "Start date is required"),
    end_date: z.string().min(1, "End date is required"),
    is_active: z.boolean().optional().default(false),
  })
  .refine(
    (data) => {
      // If start_date and end_date are valid dates, ensure end_date >= start_date
      const start = new Date(data.start_date).getTime();
      const end = new Date(data.end_date).getTime();
      if (!isNaN(start) && !isNaN(end)) {
        return end >= start;
      }
      return true; // Let the individual field validation handle invalid date strings if needed
    },
    {
      message: "End date must be after or equal to Start date",
      path: ["end_date"], // Attach the error to the end_date field
    },
  );

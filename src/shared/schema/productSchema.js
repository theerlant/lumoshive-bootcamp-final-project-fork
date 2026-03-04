import z from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const productSchema = z.object({
  name: z
    .string()
    .min(3, "Product name too short")
    .max(255, "Product name too long"),
  sku: z.string().min(3, "SKU too short").max(100, "SKU too long"),
  category_id: z.string(),
  description: z.string().max(1000, "Description too long").default(""),
  price: z.number().min(0, "Price cannot be negative").default(0),
  stock: z.number().min(0, "Stock cannot be negative").default(0),
  variants: z
    .record(
      z.string(),
      z.array(z.string()).min(1, "A category cannot be empty"),
    )
    .default({}),
  is_published: z.boolean().default(false),
  is_new: z.boolean().default(true),
  images: z
    .array(
      z.object({
        file: z
          .instanceof(File)
          .refine((file) => file.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
          .refine(
            (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
            ".jpg, .jpeg, .png and .webp files are accepted.",
          ),
      }),
    )
    .max(10, "Only up to 10 images allowed")
    .optional(),
});

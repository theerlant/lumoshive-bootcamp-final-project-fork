import z from "zod";

export const bannerSchema = z.object({
  name: z.string().min(3, "Nama banner minimal 3 karakter"),
  target_url: z
    .string()
    .url("Format URL tidak valid")
    .or(z.string().min(1, "URL wajib diisi")),
  start_date: z.string().min(1, "Tanggal rilis wajib diisi"),
  end_date: z.string().min(1, "Tanggal berakhir wajib diisi"),
  position: z.enum(["home", "category"], {
    errorMap: () => ({ message: "Pilih posisi banner" }),
  }),
  image: z
    .any()
    .refine((files) => files?.length > 0, "Foto banner wajib diupload")
    .refine(
      (files) => files?.[0]?.size <= 2000000,
      "Ukuran maksimal adalah 2MB",
    )
    .refine(
      (files) =>
        ["image/jpeg", "image/png", "image/webp"].includes(files?.[0]?.type),
      "Format harus JPG, PNG, atau WEBP",
    ),
});

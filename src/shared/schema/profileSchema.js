import z from "zod";

export const profileSchema = z
  .object({
    full_name: z
      .string()
      .min(3, "Full name must be at least 3 characters")
      .max(255, "Full name too long"),
    avatar: z
      .any()
      .optional()
      .refine(
        (files) => !files || files.length === 0 || files[0] instanceof File,
        "Avatar must be a valid file"
      )
      .refine(
        (files) =>
          !files ||
          files.length === 0 ||
          files[0]?.size <= 5 * 1024 * 1024,
        "Max image size is 5MB."
      )
      .refine(
        (files) =>
          !files ||
          files.length === 0 ||
          ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
            files[0]?.type
          ),
        "Only .jpg, .jpeg, .png and .webp formats are supported."
      ),
    current_password: z.string().optional(),
    new_password: z.string().optional(),
    confirm_new_password: z.string().optional(),
  })
  .refine(
    (data) => {
      // If user is trying to set a new password, current password is required
      if (data.new_password && !data.current_password) return false;
      return true;
    },
    {
      message: "Current password is required to set a new password",
      path: ["current_password"],
    }
  )
  .refine(
    (data) => {
      // If user provided a new password, the confirm password must match
      if (data.new_password && data.new_password !== data.confirm_new_password)
        return false;
      return true;
    },
    {
      message: "New passwords don't match",
      path: ["confirm_new_password"],
    }
  );

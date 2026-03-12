import { useEffect, useState, useRef } from "react";
import { UserService } from "../../../../shared/services/userService";
import { Button } from "../../../components/Button";
import useSWR from "swr";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { profileSchema } from "../../../../shared/schema/profileSchema";

export const MyProfilePage = () => {
  const { data, error, mutate } = useSWR("/profile", () => UserService.get());
  const [loading, setLoading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const fileInputRef = useRef(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileSchema),
    values: {
      full_name: data?.profile?.full_name ?? "",
      avatar: undefined,
      current_password: "",
      new_password: "",
      confirm_new_password: "",
    },
  });

  // Since SWR fetches asynchronously, we need to update default values once data arrives
  useEffect(() => {
    if (data?.data?.data?.profile?.full_name) {
      setValue("full_name", data.data.data.profile.full_name);
    }
  }, [data, setValue]);

  const avatarFile = watch("avatar");
  useEffect(() => {
    if (avatarFile && avatarFile.length > 0) {
      const objectUrl = URL.createObjectURL(avatarFile[0]);
      setAvatarPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [avatarFile]);

  const onSubmit = async (formData) => {
    setLoading(true);

    try {
      // Helper variables for cleaner conditions
      const hasNameChanged = formData.full_name !== data?.profile?.full_name;
      const hasNewAvatar = formData.avatar && formData.avatar.length > 0;

      // 1. Update Profile (Name & Avatar)
      if (hasNameChanged || hasNewAvatar) {
        // Because we might have a file, we MUST use FormData, not a standard object
        const profilePayload = new FormData();
        profilePayload.append("full_name", formData.full_name);

        if (hasNewAvatar) {
          profilePayload.append("avatar", formData.avatar[0]);
        }

        // Pass the FormData object to your service
        await UserService.update(profilePayload);
        toast.success("Profile updated successfully!");
      }

      // 2. Change Password
      if (formData.current_password && formData.new_password) {
        await UserService.changePassword(
          formData.current_password,
          formData.new_password,
        );
        toast.success("Password changed successfully!");
      }

      // Re-fetch SWR data to immediately reflect the new name/avatar
      if (mutate) mutate();
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.message ||
          err.message ||
          "Failed to update profile",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-5 lg:p-10 xl:px-16 shadow-none lg:shadow-md rounded-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-[#DB4444] text-lg font-medium">
          Edit Your Profile
        </h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          <div className="col-span-full flex flex-col items-center gap-2">
            <img
              src={
                avatarPreview ||
                data?.data?.data?.profile?.avatar_url ||
                "/avatar_placeholder.png"
              }
              className="w-28 aspect-square rounded-full object-cover border-2 border-[#DB4444]/20"
              alt="Profile avatar"
            />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              {...register("avatar")}
              ref={(e) => {
                register("avatar").ref(e);
                fileInputRef.current = e;
              }}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-sm font-medium text-[#DB4444] hover:underline"
            >
              Change Avatar
            </button>
            {errors.avatar && (
              <span className="text-red-500 text-xs">
                {errors.avatar.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm">Full Name</label>
            <input
              type="text"
              {...register("full_name")}
              placeholder={data?.data?.data?.profile?.full_name ?? "John Doe"}
              className={`rounded-md px-4 py-3 text-sm outline-none bg-[#F5F5F5] text-black ${
                errors.full_name ? "border border-red-500" : ""
              }`}
            />
            {errors.full_name && (
              <span className="text-red-500 text-xs">
                {errors.full_name.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm">Email</label>
            <input
              type="email"
              value={data?.email ?? ""}
              readOnly
              className="rounded-md px-4 py-3 text-sm outline-none bg-[#F5F5F5] text-black/50 cursor-not-allowed"
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 mt-8">
          <label className="text-sm font-medium">Password Changes</label>
          <div className="w-full">
            <input
              type="password"
              {...register("current_password")}
              placeholder="Current Password"
              className={`w-full rounded-md px-4 py-3 text-sm outline-none bg-[#F5F5F5] text-black ${
                errors.current_password ? "border border-red-500" : ""
              }`}
            />
            {errors.current_password && (
              <span className="text-red-500 text-xs mt-1 block">
                {errors.current_password.message}
              </span>
            )}
          </div>
          <div className="w-full">
            <input
              type="password"
              {...register("new_password")}
              placeholder="New Password"
              className={`w-full rounded-md px-4 py-3 text-sm outline-none bg-[#F5F5F5] text-black ${
                errors.new_password ? "border border-red-500" : ""
              }`}
            />
            {errors.new_password && (
              <span className="text-red-500 text-xs mt-1 block">
                {errors.new_password.message}
              </span>
            )}
          </div>
          <div className="w-full">
            <input
              type="password"
              {...register("confirm_new_password")}
              placeholder="Confirm New Password"
              className={`w-full rounded-md px-4 py-3 text-sm outline-none bg-[#F5F5F5] text-black ${
                errors.confirm_new_password ? "border border-red-500" : ""
              }`}
            />
            {errors.confirm_new_password && (
              <span className="text-red-500 text-xs mt-1 block">
                {errors.confirm_new_password.message}
              </span>
            )}
          </div>
        </div>
        <div className="flex justify-end gap-4 mt-8">
          <Button small type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
};

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LucideCheckCircle, LucidePlus, LucideUpload } from "lucide-react";
import { bannerService } from "@/shared/services/bannerService";
import { Breadcrumbs } from "../../../components/Breadcrumbs";
import Button from "../../../components/Button";
import { Modal } from "@/admin/components/Modal";
import { bannerSchema } from "../../../../shared/schema/bannerSchema";
import { InputField, InputLabel } from "../../../components/InputField";

const AdminAddBannerPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [preview, setPreview] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(bannerSchema),
    defaultValues: {
      position: "home",
    },
  });

  const imageFile = watch("image");

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("title", values.name);
      formData.append("target_url", values.target_url);
      formData.append("start_date", new Date(values.start_date).toISOString());
      formData.append("end_date", new Date(values.end_date).toISOString());
      formData.append("position", values.position);
      formData.append("is_published", "true");
      formData.append("order", "1");

      formData.append("image", values.image[0]);

      await bannerService.admin.create(formData);

      setShowSuccessModal(true);
      setTimeout(() => navigate("/admin/banners"), 2000);
    } catch (err) {
      console.error(err);
      alert("Gagal menambahkan banner. Cek koneksi atau format data.");
    } finally {
      setLoading(false);
    }
  };

  const handlePreview = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div>
      <section className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Add New Banner</h1>
        <Breadcrumbs
          items={[
            { label: "Home", href: "/admin" },
            { label: "Banner", href: "/admin/banners" },
            { label: "Add New Banner" },
          ]}
        />
      </section>

      <section className="w-full">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-x-12 gap-y-6"
        >
          {/* Kolom Kiri */}
          <div className="space-y-4 text-left">
            <div className="flex flex-col gap-2">
              <InputLabel>Banner Name</InputLabel>
              <InputField
                {...register("name")}
                placeholder="Masukkan nama banner"
              />
              {errors.name && (
                <span className="text-red-500 text-xs">
                  {errors.name.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <InputLabel className="text-sm font-semibold">
                End Date
              </InputLabel>
              <InputField type="date" {...register("end_date")} />
              {errors.end_date && (
                <span className="text-red-500 text-xs">
                  {errors.end_date.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <InputLabel className="text-sm font-semibold">
                Banner Type
              </InputLabel>
              <select
                {...register("position")}
                className="flex px-4 py-3 text-sm bg-gray-50 outline focus:outline-[#DB4444] outline-gray-200 rounded-lg"
              >
                <option value="home">Main Banner (Home)</option>
                <option value="category">Category Banner</option>
              </select>
            </div>
          </div>

          {/* Kolom Kanan */}
          <div className="space-y-4 text-left">
            <div className="flex flex-col gap-2">
              <InputLabel className="text-sm font-semibold">
                Release Date
              </InputLabel>
              <InputField type="date" {...register("start_date")} />
              {errors.start_date && (
                <span className="text-red-500 text-xs">
                  {errors.start_date.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <InputLabel className="text-sm font-semibold">
                Target URL
              </InputLabel>
              <InputField
                {...register("target_url")}
                placeholder="https://example.com"
              />
              {errors.target_url && (
                <span className="text-red-500 text-xs">
                  {errors.target_url.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <InputLabel className="text-sm font-semibold">
                Banner Photo
              </InputLabel>
              <div
                className={`border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center gap-2 bg-gray-50 ${errors.image ? "border-red-300" : "border-gray-200"}`}
              >
                {preview ? (
                  <img
                    src={preview}
                    className="w-40 h-24 object-cover rounded shadow-sm"
                  />
                ) : (
                  <LucideUpload className="text-gray-400" size={30} />
                )}
                <InputField
                  type="file"
                  accept="image/*"
                  {...register("image", { onChange: handlePreview })}
                />
                <p className="text-[10px] text-gray-400 mt-1 text-center">
                  Format: JPG, PNG, WEBP (Max 2MB)
                </p>
              </div>
              {errors.image && (
                <span className="text-red-500 text-xs">
                  {errors.image.message}
                </span>
              )}
            </div>
          </div>

          <div className="col-span-2 flex justify-end gap-4 mt-6">
            <Button
              variant="outlined"
              type="button"
              onClick={() => navigate(-1)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add Banner"}
            </Button>
          </div>
        </form>
      </section>

      {/* Modal Sukses */}
      <Modal isOpen={showSuccessModal} onClose={() => {}}>
        <div className="flex flex-col items-center p-8 text-center">
          <LucideCheckCircle
            size={64}
            className="text-green-500 mb-4 animate-bounce"
          />
          <h2 className="text-xl font-bold text-gray-800">
            Banner successfully added!
          </h2>
          <p className="text-gray-500 text-sm mt-2">
            Redirecting to list page...
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default AdminAddBannerPage;

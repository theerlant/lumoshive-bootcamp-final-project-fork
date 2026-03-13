import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { LucideCheckCircle, LucidePlus, LucideUpload } from "lucide-react";

import { bannerService } from "@/shared/services/bannerService";
import { Breadcrumbs } from "../../../components/Breadcrumbs";
import Button from "../../../components/Button";
import { Modal } from "@/admin/components/Modal";

const bannerSchema = z.object({
  name: z.string().min(3, "Nama banner minimal 3 karakter"),
  target_url: z.string().url("Format URL tidak valid").or(z.string().min(1, "URL wajib diisi")),
  start_date: z.string().min(1, "Tanggal rilis wajib diisi"),
  end_date: z.string().min(1, "Tanggal berakhir wajib diisi"),
  position: z.enum(["home", "category"], {
    errorMap: () => ({ message: "Pilih posisi banner" }),
  }),
  image: z
    .any()
    .refine((files) => files?.length > 0, "Foto banner wajib diupload")
    .refine((files) => files?.[0]?.size <= 2000000, "Ukuran maksimal adalah 2MB")
    .refine(
      (files) => ["image/jpeg", "image/png", "image/webp"].includes(files?.[0]?.type),
      "Format harus JPG, PNG, atau WEBP"
    ),
});

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
    <div className="p-6">
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

      <section className="bg-white p-8 rounded-lg border border-gray-100 w-full shadow-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-x-12 gap-y-6">
          
          {/* Kolom Kiri */}
          <div className="space-y-4 text-left">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">Banner Name</label>
              <input
                {...register("name")}
                placeholder="Masukkan nama banner"
                className={`border rounded-md px-3 py-2 text-sm outline-none focus:ring-1 ${errors.name ? 'border-red-500' : 'focus:ring-red-500'}`}
              />
              {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">End Date</label>
              <input
                type="date"
                {...register("end_date")}
                className={`border rounded-md px-3 py-2 text-sm outline-none focus:ring-1 ${errors.end_date ? 'border-red-500' : 'focus:ring-red-500'}`}
              />
              {errors.end_date && <span className="text-red-500 text-xs">{errors.end_date.message}</span>}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">Banner Type</label>
              <select
                {...register("position")}
                className="border rounded-md px-3 py-2 text-sm bg-white outline-none focus:ring-1 focus:ring-red-500"
              >
                <option value="home">Main Banner (Home)</option>
                <option value="category">Category Banner</option>
              </select>
            </div>
          </div>

          {/* Kolom Kanan */}
          <div className="space-y-4 text-left">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">Release Date</label>
              <input
                type="date"
                {...register("start_date")}
                className={`border rounded-md px-3 py-2 text-sm outline-none focus:ring-1 ${errors.start_date ? 'border-red-500' : 'focus:ring-red-500'}`}
              />
              {errors.start_date && <span className="text-red-500 text-xs">{errors.start_date.message}</span>}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">Target URL</label>
              <input
                {...register("target_url")}
                placeholder="https://example.com"
                className={`border rounded-md px-3 py-2 text-sm outline-none focus:ring-1 ${errors.target_url ? 'border-red-500' : 'focus:ring-red-500'}`}
              />
              {errors.target_url && <span className="text-red-500 text-xs">{errors.target_url.message}</span>}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">Banner Photo</label>
              <div className={`border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center gap-2 bg-gray-50 ${errors.image ? 'border-red-300' : 'border-gray-200'}`}>
                {preview ? (
                  <img src={preview} className="w-40 h-24 object-cover rounded shadow-sm" />
                ) : (
                  <LucideUpload className="text-gray-400" size={30} />
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="text-xs"
                  {...register("image", { onChange: handlePreview })}
                />
                <p className="text-[10px] text-gray-400 mt-1 text-center">Format: JPG, PNG, WEBP (Max 2MB)</p>
              </div>
              {errors.image && <span className="text-red-500 text-xs">{errors.image.message}</span>}
            </div>
          </div>

          <div className="col-span-2 flex justify-end gap-4 mt-6">
            <Button
            variant="outlined"
            type="button"
            onClick={() => navigate(-1)}
            disabled={loading}>
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
          <LucideCheckCircle size={64} className="text-green-500 mb-4 animate-bounce" />
          <h2 className="text-xl font-bold text-gray-800">Banner successfully added!</h2>
          <p className="text-gray-500 text-sm mt-2">Redirecting to list page...</p>
        </div>
      </Modal>
    </div>
  );
};

export default AdminAddBannerPage;
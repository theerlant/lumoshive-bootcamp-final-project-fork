import useSWR from "swr";
import { useNavigate, useParams } from "react-router-dom";
import { promotionService } from "../../../../shared/services/promotionService";
import { Breadcrumbs } from "../../../components/Breadcrumbs";

export const AdminDetailPromotionPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: res,
    error,
    isLoading,
  } = useSWR(id ? `/api/v1/promotions/code/${id}` : null, () =>
    promotionService.admin.getByCode(id),
  );

  const data = res?.data || res;

  if (isLoading) return <div className="p-6 text-gray-500">Loading...</div>;
  if (error || !data)
    return <div className="p-6 text-gray-500">Promotion not found.</div>;

  /* =========================
     DISCOUNT LABEL
  ========================= */

  const discountLabel =
    data.discount_type === "percentage"
      ? `${data.discount_value}%`
      : `Rp ${Number(data.discount_value || 0).toLocaleString("id-ID")}`;

  return (
    <div className="p-6">
      <PageHeader />

      <section>
        <div className="grid grid-cols-2 gap-x-12 gap-y-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">
              Promotion Name
            </label>
            <input
              type="text"
              value={data.name || "-"}
              readOnly
              className="border border-gray-200 rounded-lg px-4 py-3 bg-[#F3F4F6] text-sm text-gray-500 outline-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">
              Discount Type
            </label>
            <input
              type="text"
              value={
                data.discount_type === "percentage"
                  ? "Percentage"
                  : "Fixed Amount"
              }
              readOnly
              className="border border-gray-200 rounded-lg px-4 py-3 bg-[#F3F4F6] text-sm text-gray-500 outline-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">
              Discount Value
            </label>
            <input
              type="text"
              value={discountLabel}
              readOnly
              className="border border-gray-200 rounded-lg px-4 py-3 bg-[#F3F4F6] text-sm text-gray-500 outline-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">
              Minimum Purchase
            </label>
            <input
              type="text"
              value={`Rp ${Number(data.min_purchase || 0).toLocaleString("id-ID")}`}
              readOnly
              className="border border-gray-200 rounded-lg px-4 py-3 bg-[#F3F4F6] text-sm text-gray-500 outline-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">
              Maximum Discount
            </label>
            <input
              type="text"
              value={`Rp ${Number(data.max_discount || 0).toLocaleString("id-ID")}`}
              readOnly
              className="border border-gray-200 rounded-lg px-4 py-3 bg-[#F3F4F6] text-sm text-gray-500 outline-none"
            />
          </div>

          {/* Start Date */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">
              Start Date
            </label>
            <input
              type="text"
              value={data.start_date ? data.start_date.split("T")[0] : "-"}
              readOnly
              className="border border-gray-200 rounded-lg px-4 py-3 bg-[#F3F4F6] text-sm text-gray-500 outline-none"
            />
          </div>

          {/* End Date */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">
              End Date
            </label>
            <input
              type="text"
              value={data.end_date ? data.end_date.split("T")[0] : "-"}
              readOnly
              className="border border-gray-200 rounded-lg px-4 py-3 bg-[#F3F4F6] text-sm text-gray-500 outline-none"
            />
          </div>

          <div className="flex flex-col gap-2 col-span-2">
            <label className="text-sm font-semibold text-gray-700">
              Description
            </label>
            <textarea
              value={data.description || "-"}
              readOnly
              className="border border-gray-200 rounded-lg px-4 py-3 bg-[#F3F4F6] text-sm text-gray-500 outline-none min-h-[80px]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">
              Active Status
            </label>
            <input
              type="text"
              value={data.is_active ? "Active" : "Inactive"}
              readOnly
              className={`border border-gray-200 rounded-lg px-4 py-3 text-sm font-medium outline-none ${data.is_active ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}
            />
          </div>
        </div>

        {/* Close Button */}
        <div className="flex justify-end mt-12">
          <button
            onClick={() => navigate(-1)}
            className="px-10 py-2.5 rounded-lg bg-[#8E8E93] text-white font-medium text-sm hover:bg-gray-500 transition-colors"
          >
            Close
          </button>
        </div>
      </section>
    </div>
  );
};

const PageHeader = () => {
  return (
    <section className="mb-8">
      <h1 className="text-2xl font-bold text-gray-800">Detail Promotion</h1>
      <div className="mt-1">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/admin" },
            { label: "Promotion", href: "/admin/promotions" },
            { label: "Detail Promotion" },
          ]}
        />
      </div>
    </section>
  );
};

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { promotionService } from "../../../../shared/services/promotionService";
import { Breadcrumbs } from "../../../components/Breadcrumbs";

export const AdminDetailPromotionPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await promotionService.admin.getByCode(id);
        setData(res);
      } catch (err) {
        console.error("Failed to fetch promotion detail:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchDetail();
  }, [id]);

  if (loading) return <div className="p-6 text-gray-500">Loading...</div>;
  if (!data) return <div className="p-6 text-gray-500">Promotion not found.</div>;

  /* =========================
     FIX TYPE PROMOTION
  ========================= */

  const isVoucher = Boolean(data.voucher_code);

  /* =========================
     PRODUCT DATA
  ========================= */

  const products =
    data.products ||
    (data.product ? [data.product] : []);

  /* =========================
     DISCOUNT LABEL
  ========================= */

  const discountLabel =
    data.discount_type === "percentage"
      ? `Percentage : ${data.discount_value}%`
      : `Amount : ${Number(data.discount_value || 0).toLocaleString("id-ID")}`;

  return (
    <div className="p-6">
      <PageHeader />

      <section className="bg-white p-10 rounded-xl shadow-sm border border-gray-100 w-full">

        <div className="grid grid-cols-2 gap-x-12 gap-y-6">

          {/* Promotion Type */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">
              Promotion Type
            </label>
            <input
              type="text"
              value={isVoucher ? "Voucher Code" : "Direct Discount"}
              readOnly
              className="border border-gray-200 rounded-lg px-4 py-3 bg-[#F3F4F6] text-sm text-gray-500 outline-none"
            />
          </div>

          {/* Right field row 1 */}
          {isVoucher ? (
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">
                Voucher Code
              </label>
              <input
                type="text"
                value={data.voucher_code || "-"}
                readOnly
                className="border border-gray-200 rounded-lg px-4 py-3 bg-[#F3F4F6] text-sm text-gray-500 outline-none"
              />
            </div>
          ) : (
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
          )}

          {/* Voucher Only Row */}
          {isVoucher && (
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
          )}

          {/* Product */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">
              Product
            </label>

            <div className="border border-gray-200 rounded-lg px-4 py-3 bg-[#F3F4F6] flex gap-2 flex-wrap min-h-[46px]">

              {products.length === 0 && (
                <span className="text-sm text-gray-400">-</span>
              )}

              {products.map((p, index) => (
                <span
                  key={index}
                  className="bg-[#D1D5DB] px-3 py-1 rounded text-[10px] text-gray-600"
                >
                  {p.name}
                </span>
              ))}

            </div>
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

          {/* Discount */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">
              Discount
            </label>
            <input
              type="text"
              value={discountLabel}
              readOnly
              className="border border-gray-200 rounded-lg px-4 py-3 bg-[#F3F4F6] text-sm text-gray-500 outline-none"
            />
          </div>

          {/* Usage Limit */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">
              Promotion Usage Limit
            </label>
            <input
              type="text"
              value={data.usage_limit || "0"}
              readOnly
              className="border border-gray-200 rounded-lg px-4 py-3 bg-[#F3F4F6] text-sm text-gray-500 outline-none"
            />
          </div>

          {/* Voucher Checkbox */}
          {isVoucher && (
            <div className="flex items-center gap-3 col-span-2 mt-2">
              <input
                type="checkbox"
                checked
                readOnly
                className="w-4 h-4 accent-gray-400"
              />
              <label className="text-sm text-gray-400">
                Show the voucher code on the checkout page
              </label>
            </div>
          )}
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
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Breadcrumbs } from "../../../components/Breadcrumbs";
import Button from "../../../components/Button";
import { InputField } from "../../../components/InputField";
import { stockService } from "../../../../shared/services/stockService";
import ProductAsyncSelect from "./ProductAsyncSelect";

export default function AdminStockFormPage() {
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newStock, setNewStock] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async () => {
    if (!selectedProduct || !newStock) return alert("Lengkapi data!");

    try {
      //  Quantity yang dikirim adalah (stok Baru-stok Lama) seharusnya, cman output ga sesuai
      //const oldStock = selectedProduct.new_stock || 0;
      // const adjustmentQuantity = Number(newStock) - oldStock;
      const adjustmentQuantity = Number(newStock);

      await stockService.admin.adjust(
        selectedProduct.id,
        adjustmentQuantity,
        description,
      );

      navigate("/admin/stocks", {
        state: { successMessage: true, successType: "success-add" },
      });
    } catch (err) {
      alert("Gagal adjust stok");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold">Add Stock</h1>
        <Breadcrumbs
          items={[
            { label: "Home", href: "/admin" },
            { label: "Stock", href: "/admin/stocks" },
            { label: "Add Stock", href: "" },
          ]}
        />
      </div>
      <div className="grid grid-cols-2 gap-6">
        {/* Opsi Pilihan produk */}
        <div className="space-y-2 z-50 relative">
          <label className="text-sm font-medium">Product Name</label>
          <ProductAsyncSelect
            value={selectedProduct}
            onChange={setSelectedProduct}
          />
        </div>

        {/* stok saat ini */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Current Stock</label>
          <div className="p-3 bg-gray-100 rounded-lg text-gray-700 font-bold">
            {selectedProduct ? selectedProduct.stock || 0 : 0}
          </div>
        </div>

        {/* Inputan new stok */}
        <div className="col-span-2 space-y-2">
          <label className="text-sm font-medium">New Stock</label>
          <InputField
            placeholder="Masukkan jumlah stok terbaru"
            type="number"
            value={newStock}
            onChange={(e) => setNewStock(e.target.value)}
          />
          <p className="text-sm text-red-500 ">
            Jika ingin mengurangi stok masukkan "-" contoh "-5"
          </p>

          {selectedProduct && newStock && (
            <p className="text-sm text-gray-500 mt-1">
              Stok akhir/current stock akan menjadi:{" "}
              <span className="font-bold text-[#DB4444]">
                {(selectedProduct.stock || 0) + Number(newStock)}
              </span>
            </p>
          )}
        </div>

        <div className="col-span-2 space-y-2">
          <label className="text-sm font-medium">Description</label>
          <textarea
            className="w-full border p-3 rounded-lg bg-gray-50"
            placeholder="Contoh: Restock dari Supplier A"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-10">
        <Button variant="outlined" onClick={() => navigate(-1)}>
          Cancel
        </Button>
        <Button onClick={handleSubmit}>Add Stock</Button>
      </div>
    </div>
  );
}

import { useState } from "react";
import Button from "../admin/components/Button";
import Switch from "../admin/components/Switch";
import Navbar from "../admin/components/Navbar";
import PromotionStatusChip from "../admin/components/PromotionStatusChip";
import OrderStatusChip from "../admin/components/OrderStatusChip";
import {
  TableBody,
  TableCell,
  TableColGroup,
  TableHead,
  TableHeadCol,
  TableRow,
  TableWrapper,
} from "../admin/components/Table";
import { LucideCheck, LucideEye, LucideX } from "lucide-react";
import IconButton from "../admin/components/IconButton";

/*
	CATATAN:
	- Test component hanya di section masing-masing agar tidak terjadi merge conflict
	- Jangan mengubah style, menambah elemen diluar zona
*/
export default function ComponentSandbox() {
  const [active, setActive] = useState(false);

  return (
    <div className="flex flex-col gap-8 p-10 min-h-screen bg-gray-50">
      <div className="w-full bg-red-600 text-white rounded-lg">
        <h1 className="p-4 text-3xl font-bold text-center">
          UI Component Sandbox
        </h1>
      </div>

      {/* ========================================= */}
      {/* SECTION 1: Theerlan */}
      {/* ========================================= */}
      <section className="p-6 bg-white rounded-lg shadow-sm border border-red-200">
        <h2 className="text-xl font-bold mb-4 text-red-600">SECT 1</h2>
        <div className="flex flex-wrap gap-4 items-end">
          {/* Taruh component disini */}
          <Button>TEST</Button>
          <Switch on={active} onChange={() => setActive(!active)} />
        </div>
        <div className="border p-2">
          <span>Navbar Components (UserCard, NavItem)</span>
          <Navbar />
        </div>
        <div className="flex gap-2">
          <p>Promotion Status</p>
          <PromotionStatusChip active />
          <PromotionStatusChip />
        </div>
        <div className="flex gap-2">
          <p>Order Status Chip</p>
          <OrderStatusChip status="created" />
          <OrderStatusChip status="processing" />
          <OrderStatusChip status="canceled" />
          <OrderStatusChip status="completed" />
        </div>
        <div className="p-2 border">
          <TableWrapper caption="order table">
            {/** Opsional untuk menentukan ukuran kolom */}
            <TableColGroup
              colSizes={["15%", "20%", "20%", "15%", "15%", "auto"]}
            />
            <TableHead>
              <TableHeadCol title="User Name" sort="none" />
              <TableHeadCol title="Address" />
              <TableHeadCol title="Payment Method" />
              <TableHeadCol title="Amount" />
              <TableHeadCol title="Status" />
              <TableHeadCol title="Actions" />
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>kevindebruyne</TableCell>
                <TableCell>Jl. Pangeran Antasari No.13</TableCell>
                <TableCell>Online Debit</TableCell>
                <TableCell>Rp 1.000.000</TableCell>
                <TableCell>
                  <div className="flex">
                    <OrderStatusChip status="created" />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <IconButton>
                      <div className="bg-green-400 rounded-full p-1 *:size-4 *:stroke-3 text-white">
                        <LucideCheck />
                      </div>
                    </IconButton>
                    <IconButton>
                      <div className="bg-red-500 rounded-full p-1 *:size-4 *:stroke-3 text-white">
                        <LucideX />
                      </div>
                    </IconButton>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>kevindebruyne</TableCell>
                <TableCell>Jl. Pangeran Antasari No.13</TableCell>
                <TableCell>Gopay</TableCell>
                <TableCell>Rp 1.000.000</TableCell>
                <TableCell>
                  <div className="flex">
                    <OrderStatusChip status="canceled" />
                  </div>
                </TableCell>
                <TableCell>
                  {" "}
                  <IconButton>
                    <div className="*:size-5">
                      <LucideEye />
                    </div>
                  </IconButton>
                </TableCell>
              </TableRow>
            </TableBody>
          </TableWrapper>
        </div>
      </section>

      {/* ========================================= */}
      {/* SECTION 2: Ferdinand */}
      {/* ========================================= */}
      <section className="p-6 bg-white rounded-lg shadow-sm border border-red-200">
        <h2 className="text-xl font-bold mb-4 text-red-600">SECT 2</h2>

        <div className="flex flex-wrap gap-4 items-end">
          {/* Taruh component disini */}
        </div>
      </section>

      {/* ========================================= */}
      {/* SECTION 3: Ferdyawan */}
      {/* ========================================= */}
      <section className="p-6 bg-white rounded-lg shadow-sm border border-blue-200">
        <h2 className="text-xl font-bold mb-4 text-blue-600">SECT 3</h2>
        <div className="flex flex-col gap-6 max-w-md">
          {/* Taruh component disini */}
        </div>
      </section>

      {/* ========================================= */}
      {/* SECTION 4: Dimas */}
      {/* ========================================= */}
      <section className="p-6 bg-white rounded-lg shadow-sm border border-green-200">
        <h2 className="text-xl font-bold mb-4 text-green-600">SECT 4</h2>
        <div className="grid grid-cols-3 max-w-md">
          {/* Taruh component disini */}
          <div className="btn flex flex-col gap-3">
          <Button variant="primary" onClick={()=>alert("Primary!")}>primary</Button>
          <Button variant="primary" onClick={()=>alert("Primary!")} disabled>primary</Button>
          <Button variant="secondary" disabled>secondary</Button>
          <Button variant="outlined" >outlined</Button>
          </div>
        </div>
      </section>
    </div>
  );
}

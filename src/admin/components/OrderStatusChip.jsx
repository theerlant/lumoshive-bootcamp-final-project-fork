import { toTitleCase } from "@/shared/utils/toTitleCase";

const baseClasses = "px-2 py-0.5 rounded-[5px] text-white text-sm";
const statusClasses = {
  created: "bg-[#DF7B00]",
  processing: "bg-[#2794EB]",
  canceled: "bg-[#DC3741]",
  completed: "bg-[#198754]",
};

export default function OrderStatusChip({ status = "" }) {
  return (
    <div className={`${baseClasses} ${statusClasses[status]}`}>
      {toTitleCase(status)}
    </div>
  );
}

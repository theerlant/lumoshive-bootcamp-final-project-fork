import { toTitleCase } from "@/shared/utils/toTitleCase";

const baseClasses = "px-2 py-0.5 rounded-[5px] text-white text-sm";
const colorClasses = {
  base: "bg-[#DF7B00]",
  ongoing: "bg-[#2794EB]",
  missed: "bg-[#DC3741]",
  completed: "bg-[#198754]",
};

export default function OrderStatusChip({ color = "base", status = "" }) {
  return (
    <div className={`${baseClasses} ${colorClasses[color]}`}>
      {toTitleCase(status)}
    </div>
  );
}

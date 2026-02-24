const baseClasses = "px-1.5 py-1 rounded-full text-white";
const activeClasses = "bg-[#198754]";
const inactiveClasses = "bg-[#6C757D]";

export default function PromotionStatusChip({ active = false }) {
  return (
    <div
      className={`${baseClasses} ${active ? activeClasses : inactiveClasses}`}
    >
      {active ? "Active" : "Inactive"}
    </div>
  );
}

/**
 * @param {import("react").ReactNode} icon - gunakan lib Lucide Icon yg penting sesuaikan dengan figma
 * @param {string} title - title dari nav item
 * @param {boolean} active
 * @param {string} href - url untuk menuju nav tujuan
 */

import { Link } from "react-router-dom";

const baseClasses = "flex items-center h-[40px]"; // class tailwind base
const activeClasses = "text-[#DB4444] font-semibold"; // tambahan jika sedang active

export default function NavItem({
  icon,
  title = "Nav Item",
  active = false,
  href = "#",
}) {
  return (
    <Link to={href} className={`${baseClasses} ${active ? activeClasses : ""}`}>
      {/* Active pill di kiri, refer ke figma */}
      {active ? <ActivePill /> : <div className="w-[6px] mr-4" />}
      {icon}
      <span className="ml-2">{title}</span>
    </Link>
  );
}

function ActivePill() {
  return <div className="w-[6px] h-full rounded-r-[20px] bg-[#DB4444] mr-4" />;
}

import { LucideChevronRight } from "lucide-react";
import { Fragment } from "react";
import { Link } from "react-router-dom";

/**
 * Show breadcrumbs navigator.
 * Last item indicate active item, href is unused here.
 * @param {Array<{label: string, href: string}>} items - array of items
 */
export const Breadcrumbs = ({ items }) => {
  return (
    <div className="flex items-center gap-1 text-xs text-[#DB4444] tracking-tight leading-none">
      {items.map((item, index) => (
        <Fragment key={item.label}>
          {index < items.length - 1 ? (
            <Link className="hover:underline" to={item.href}>
              {item.label}
            </Link>
          ) : (
            <p className="font-semibold">{item.label}</p>
          )}
          {index < items.length - 1 && (
            <LucideChevronRight strokeWidth={3} size={16} />
          )}
        </Fragment>
      ))}
    </div>
  );
};

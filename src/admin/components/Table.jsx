import { LucideChevronDown, LucideChevronUp } from "lucide-react";

export const TableWrapper = ({ caption = "", children }) => {
  return (
    <table className="w-full font-admin border-collapse">
      {caption && <caption className="hidden">{caption}</caption>}
      {children}
    </table>
  );
};

/**
 * Table column group
 * @param {string[]} colSizes - array of column sizes
 */
export const TableColGroup = ({ colSizes = [] }) => {
  return (
    <colgroup>
      {colSizes.map((size, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: column group is static
        <col key={index} style={{ width: size }} />
      ))}
    </colgroup>
  );
};

export const TableHead = ({ children }) => {
  return (
    <thead className="w-full font-bold text-left align-top">
      <tr className="*:pb-4">{children}</tr>
    </thead>
  );
};

/**
 * Table header column with optional sorting
 * @param {string} title - column title
 * @param {string} sort - 'asc' | 'desc' | 'none'. Null disables the button
 * @param {function} onSort - callback when sorting button clicked
 */
export const TableHeadCol = ({
  title = "Column",
  sort = null,
  onSort = () => {},
}) => {
  return (
    <th className="">
      <div className="flex items-center gap-2">
        <span>{title}</span>
        {sort !== null && (
          <button
            type="button"
            className="flex flex-col cursor-pointer *:size-2.5 *:stroke-3"
            onClick={() => onSort()}
          >
            {sort === "none" ? (
              <>
                <LucideChevronUp />
                <LucideChevronDown />
              </>
            ) : sort === "asc" ? (
              <LucideChevronUp />
            ) : (
              <LucideChevronDown />
            )}
          </button>
        )}
      </div>
    </th>
  );
};

export const TableBody = ({ children }) => {
  return (
    <tbody className="divide-y divide-gray-300 border-b border-gray-300">
      {children}
    </tbody>
  );
};

export const TableRow = ({ children }) => {
  return (
    <tr className="*:py-4 border-b border-gray-300 last:border-0">
      {children}
    </tr>
  );
};

export const TableCell = ({ children }) => {
  return <td className="text-xs font-medium text-[#111]">{children}</td>;
};

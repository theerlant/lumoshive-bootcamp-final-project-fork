/**
 * refer ke Figma untuk memastikan styling variant
 * @param {string} variant - 'primary' | 'secondary' | 'outlined'
 */

// deklarasi base class tailwind untuk semua variant

const baseClasses =
  "font-medium rounded-[8px] font-[16px] cursor-pointer not-disabled:hover:ring-1 focus:ring-2 ease-in-out duration-300";

const sizeClasses = {
  small: "px-3 py-1.5 text-sm",
  medium: "px-4 py-2 text-base",
  large: "px-4 py-2 text-base",
};

// deklarasi class tailwind untuk variant
const variantClasses = {
  primary:
    "bg-[#DB4444] text-white ring-white not-disabled:hover:bg-[#c53c3c] disabled:bg-[#f28b8b] disabled:cursor-not-allowed",
  secondary:
    "bg-[#89868D] text-white disabled:cursor-not-allowed not-disabled:hover:bg-[#6F6E73]",
  outlined:
    "border-[#DB4444] border not-disabled:hover:border-[#DB4444] text-[#DB4444] bg-transparent disabled:border-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed",
};

export default function Button({
  size = "medium",
  variant = "primary",
  children,
  ...props
}) {
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`}
      {...props}
    >
      {children}
    </button>
  );
}

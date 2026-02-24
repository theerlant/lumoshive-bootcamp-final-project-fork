/**
 * refer ke Figma untuk memastikan styling variant
 * @param {string} variant - 'primary' | 'secondary' | 'outlined'
 * @param {import("react").ReactNode} children - konten button
 * @param {boolean} disabled
 * @callback onClick
 */

// deklarasi base class tailwind untuk semua variant
const baseClasses = "w-[330px] h-[46px] font-medium rounded-[8px] font-[16px] cursor-pointer focus:outline-none hover:ring-1 focus:ring-2 ease-in-out duration-300";

// deklarasi class tailwind untuk variant
const variantClasses = {
primary: "bg-[#DB4444] text-white ring-white hover:bg-[#c53c3c] disabled:bg-[#f28b8b] disabled:cursor-not-allowed",
secondary:  "bg-white text-[#DB4444] border border-[#DB4444] hover:bg-gray-100  disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed",
outlined: "border border-[#DB4444] text-[#DB4444] bg-transparent hover:bg-gray-100  disabled:border-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed",
};

export default function Button({
  variant = "primary",
  disabled = false,
  onClick = () => {},
  children,
}) {
  return (
    <button
      type="button"
      className={`${baseClasses} ${variantClasses[variant]}`}
      disabled={disabled}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      {children}
    </button>
  );
}

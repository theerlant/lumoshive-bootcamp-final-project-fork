/**
 * refer ke Figma untuk memastikan styling variant
 * @param {string} variant - 'primary' | 'secondary' | 'outlined'
 * @param {import("react").ReactNode} children - konten button
 * @param {boolean} disabled
 * @callback onClick
 */

// deklarasi base class tailwind untuk semua variant
const variantBaseClasses = {
    auth : "w-[330px] h-[46px] font-medium rounded-[8px] font-[16px] cursor-pointer focus:outline-none not-disabled:hover:ring-1 focus:ring-2 ease-in-out duration-300",
    product : "w-[100px] h-[32px] rounded-[4px] cursor-pointer font-[400] focus:outline-none not-disabled:hover:ring-1 focus:ring-2 ease-in-out duration-300"
}

// deklarasi class tailwind untuk variant
const variantClasses = {
primary: "bg-[#DB4444] text-white ring-white not-disabled:hover:bg-[#c53c3c] disabled:bg-[#f28b8b] disabled:cursor-not-allowed",
secondary:  "bg-[#89868D] text-white disabled:cursor-not-allowed not-disabled:hover:bg-[#6F6E73]",
outlined: "border-[#DB4444] border not-disabled:hover:border-[#DB4444] text-[#DB4444] bg-transparent   disabled:border-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed",
};



export default function Button({
  baseClasses = "auth",
  variant = "primary",
  disabled = false,
  onClick = () => {},
  children,
}) {
  return (
    <button
      type="button"
      className={`${variantBaseClasses[baseClasses]} ${variantClasses[variant]}`}
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

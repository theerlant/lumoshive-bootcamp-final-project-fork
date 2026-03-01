/**
 * refer ke Figma untuk memastikan styling variant
 * @param {string} variant - 'primary' | 'secondary' | 'outlined'
 * @param {import("react").ReactNode} children - konten button
 * @param {boolean} disabled
 * @callback onClick
 */

// deklarasi base class tailwind untuk semua variant

const baseClasses = "font-medium rounded-[8px] font-[16px] cursor-pointer focus:outline-none not-disabled:hover:ring-1 focus:ring-2 ease-in-out duration-300";
  
const sizeClasses  = {
  small : "w-[100px] h-[32px]",
  medium : "w-[128px] h-[32px]",
  large : "w-[330px] h-[46px]",
}

// deklarasi class tailwind untuk variant
const variantClasses = {
primary: "bg-[#DB4444] text-white ring-white not-disabled:hover:bg-[#c53c3c] disabled:bg-[#f28b8b] disabled:cursor-not-allowed",
secondary:  "bg-[#89868D] text-white disabled:cursor-not-allowed not-disabled:hover:bg-[#6F6E73]",
outlined: "border-[#DB4444] border  not-disabled:hover:border-[#DB4444] text-[#DB4444] bg-transparent   disabled:border-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed",
};



export default function Button({
  size = "small",
  variant = "primary",
  disabled = false,
  onClick = () => {},
  children,
}) {
  return (
    <button
      type="button"
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`}
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

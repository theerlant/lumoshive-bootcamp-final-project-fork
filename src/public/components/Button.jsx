const baseClasses = "py-4 px-12 rounded-sm not-[disabled]:hover:cursor-pointer";
const smallClasses = "py-2.5! px-8! text-xs!";
const variantClasses = {
  primary: "bg-[#DB4444] hover:bg-[#E07575] disabled:bg-[#E07575] text-white",
  outlined:
    "bg-transparent outline -outline-offset-2 hover:outline-black/50 hover:text-[#7D8184]",
  outlinedAlt:
    "bg-transparent outline -outline-offset-2 outline-[#DB4444] text-[#DB4444]",
};

export const Button = ({
  variant = "primary",
  small = false,
  children,
  ...props
}) => {
  return (
    <button
      {...props}
      className={`${baseClasses} ${variantClasses[variant]} ${small ? smallClasses : ""}`}
    >
      {children}
    </button>
  );
};

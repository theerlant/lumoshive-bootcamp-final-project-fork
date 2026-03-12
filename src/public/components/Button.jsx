const baseClasses = "py-4 px-12 rounded-sm not-[disabled]:hover:cursor-pointer";
const smallClasses = "py-2.5!";
const variantClasses = {
  primary: "bg-[#DB4444] hover:bg-[#E07575] disabled:bg-[#E07575] text-white",
  outlined: "bg-transparent border hover:border-black/50 hover:text-[#7D8184]",
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

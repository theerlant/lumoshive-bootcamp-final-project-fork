const baseClasses =
  "cursor-pointer disabled:cursor-not-allowed text-[#6C757D] disabled:opacity-80";

const sizeClasses = {
  small: "text-xs *:size-4",
  normal: "text-sm *:size-4.5",
  large: "text-base *:size-6",
};

// title digunakan untuk memunculkan tip saat tombol di hover (atau untuk pengguna aksesibilitas)
export const IconButton = ({ size = "normal", children, ...props }) => {
  return (
    <button
      type="button"
      className={`${baseClasses} ${sizeClasses[size]}`}
      {...props}
    >
      {children}
    </button>
  );
};

const baseClasses =
  "cursor-pointer disabled:cursor-not-allowed text-[#6C757D] disabled:opacity-80";

const sizeClasses = {
  small: "text-xs *:size-4",
  normal: "text-sm *:size-5",
  large: "text-base *:size-6",
};

export default function IconButton({
  size = "normal",
  children,
  onClick = () => {},
  disabled = false,
}) {
  return (
    <button
      type="button"
      className={`${baseClasses} ${sizeClasses[size]}`}
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

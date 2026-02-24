export default function IconButton({
  children,
  onClick = () => {},
  disabled = false,
}) {
  return (
    <button
      type="button"
      className={`${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
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

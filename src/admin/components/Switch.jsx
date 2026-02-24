const baseClasses =
  "w-[40px] h-[22px] rounded-full relative cursor-pointer *:bg-white hover:*:bg-gray-100";
const offClasses = "bg-[#d2d2d2]";
const onClasses = "bg-[#DB4444]";

const thumbBaseClasses =
  "absolute w-[18px] h-[18px] rounded-full translate-x-[2px] top-[2px] transition-transform";
const thumbOnClasses = "translate-x-[20px]!";

/**
 * @param {boolean} on switch state
 * @param {function} onChange callback function when switch state changes
 */
export default function Switch({ on = false, onChange = () => {} }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={(e) => {
        e.preventDefault();
        onChange();
      }}
      className={`${baseClasses} ${on ? onClasses : offClasses}`}
    >
      <div className={`${thumbBaseClasses} ${on ? thumbOnClasses : ""}`} />
    </button>
  );
}

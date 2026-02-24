import { useState } from "react";

export const InputLabel = ({ text, htmlFor }) => {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-medium mb-1">
      {text}
    </label>
  );
};

export const InputField = ({
  type,
  placeholder,
  value,
  onChange,
  id,
  actions,
}) => {
  const [focus, setFocus] = useState(false);

  return (
    <div
      className={`flex w-full px-4 py-3 bg-gray-50 outline ${focus ? "outline-[#DB4444] outline-1" : "outline-gray-200"} rounded-lg `}
    >
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="flex-1 focus:outline-none"
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
      {actions}
    </div>
  );
};

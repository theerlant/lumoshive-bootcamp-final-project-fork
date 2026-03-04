import { useState } from "react";

export const InputLabel = ({ text, htmlFor }) => {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-medium mb-1">
      {text}
    </label>
  );
};

export const InputField = ({ actions, ...props }) => {
  const [focus, setFocus] = useState(false);

  return (
    <div
      className={`flex px-4 py-3 text-sm bg-gray-50 outline ${focus ? "outline-[#DB4444] outline-1" : "outline-gray-200"} rounded-lg `}
    >
      <input
        className={`flex-1 focus:outline-none ${props.className ?? ""}`}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        {...props}
      />
      {actions}
    </div>
  );
};

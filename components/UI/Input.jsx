import React from "react";
import EyeOpen from "../../assets/Ui/eyeopen.svg";
import EyeClose from "../../assets/Ui/eyeclose.svg";

const Input = ({
  type,
  placeholder,
  onChange,
  name,
  value,
  required,
  password,
  setShowPassword,
  ...props
}) => {
  return (
    <div className="py-4">
      <label className="text-customGray-dark pr-2 py-2">{props.children}</label>
      <div className="flex">
        <input
          type={type}
          value={value}
          className="w-full px-1 pt-2 border-b-2 border-customGray-dark focus:outline-none"
          placeholder={placeholder}
          onChange={(e) => onChange(e)}
          name={name}
          required
        />
        {password ? (
          type === "text" ? (
            <EyeOpen className="h-6 cursor-pointer" onClick={() => setShowPassword(false)} />
          ) : (
            <EyeClose className="h-6 cursor-pointer" onClick={() => setShowPassword(true)} />
          )
        ) : null}
      </div>
    </div>
  );
};

export default Input;

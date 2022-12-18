import React from "react";

const Input = ({ type, placeholder, onChange,name, value,required, ...props }) => {
  return (
    <div className="py-4">
      <label className="text-customGray-dark pr-2 py-2">{props.children}</label>
      <input
        type={type}
        value={value}
        className="w-full px-1 pt-2 border-b-2 border-customGray-dark focus:outline-none"
        placeholder={placeholder}
        onChange={(e) => onChange(e)}
        name={name}
        required
      ></input>
    </div>
  );
};

export default Input;

import React, { Fragment } from "react";

const FormInput = ({
  title,
  type,
  onChange,
  value,
  name,
  errors,
  placeholder,
}) => {
  return (
    <Fragment>
      <label className="p-2">{title}</label>
      <input
        type={type}
        name={name}
        className={
          !errors
            ? "p-2 rounded-lg border-2 border-transparent"
            : "p-2 rounded-lg border-2 border-red-500"
        }
        value={value}
        placeholder={errors ? placeholder : ""}
        onChange={(e) => onChange(e)}
      />
    </Fragment>
  );
};

export default FormInput;

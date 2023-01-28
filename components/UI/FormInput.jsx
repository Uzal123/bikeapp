import React, { Fragment } from "react";

const FormInput = ({ title, type, onChange, value, name }) => {
  return (
    <Fragment>
      <label className="p-2">{title}</label>
      <input
        type={type}
        name={name}
        className="p-2 rounded-lg"
        value={value}
        onChange={(e) => onChange(e)}
      />
    </Fragment>
  );
};

export default FormInput;

import React, { Fragment } from "react";

const DropInput = ({title,value,onChange,items,name}) => {
  return (
    <Fragment>
      <label className="whitespace-nowrap p-2">{title}</label>
      <select
        name={name}
        className="w-full p-2 rounded-lg"
        value={value}
        onChange={(e) => onChange(e)}
      >
        {Object.keys(items).map((key, i) => (
          <option key={i} value={key}>
            {items[key]}
          </option>
        ))}
      </select>
    </Fragment>
  );
};

export default DropInput;

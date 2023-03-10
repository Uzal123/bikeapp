import React from "react";

const ButtonTab = ({ label, val, onClick, tab }) => {
  return (
    <button
      className={tab === val ? "text-primary font-semibold text-xl underline" : "hover:text-primary"}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default ButtonTab;

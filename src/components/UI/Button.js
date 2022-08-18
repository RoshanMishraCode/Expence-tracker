import React from "react";

const Button = (props) => {
  return (
    <button
      className={`${props.className} btn shadow-none border-0`}
      type={`${props.type || "button"}`}
      onClick={props.onClick}
      style={props.style}
    >
      {props.children}
    </button>
  );
};

export default Button;

import React from "react";

const InputBox = (props) => {
  const {
    value = "",
    onChange,
    htmlFor,
    name,
    type = "text",
    id,
    heading,
    min,
    maxlength,
  } = props;
  return (
    <div className="col-sm-6">
      <label htmlFor={htmlFor} className="form-label fw-bold">
        {heading}
      </label>
      <input
        type={type}
        value={value}
        min={min}
        name={name}
        maxLength={maxlength}
        onChange={onChange}
        className="form-control"
        id={id}
        autoComplete="off"
        required
      />
    </div>
  );
};

export default InputBox;

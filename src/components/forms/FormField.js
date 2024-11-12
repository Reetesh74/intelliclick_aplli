import React from "react";

function FormField({
  label,
  placeholder,
  name,
  value,
  onChange,
  fullWidth,
  type,
  options,
}) {
  return (
    <div className={`field ${fullWidth ? "full-width-field" : ""}`}>
      <label className="label">{label}</label>
      {type === "select" ? (
        <select name={name} value={value} onChange={onChange} className="input">
          <option value="" disabled hidden>
            {placeholder}
          </option>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type="text"
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          className="input"
        />
      )}
    </div>
  );
}

export default FormField;

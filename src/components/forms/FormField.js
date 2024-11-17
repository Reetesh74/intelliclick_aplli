import React from "react";
import "../ProgressBar/ProgressBar";

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
  // Default value for the 'value' prop in case it is undefined
  const safeValue = value || "";

  return (
    <div className={`field ${fullWidth ? "full-width-field" : ""}`}>
      <label className="label">{label}</label>
      {type === "select" ? (
        <select
          name={name}
          value={safeValue} // Ensuring 'value' is never undefined
          onChange={onChange}
          className={`input ${safeValue === "" ? "placeholder-active" : ""}`}
        >
          <option value="" hidden>
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
          value={safeValue} // Same fallback for input as well
          onChange={onChange}
          className="input"
        />
      )}
    </div>
  );
}

export default FormField;

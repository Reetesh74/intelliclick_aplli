import React from "react";
import "../ProgressBar/ProgressBar"; // Assuming your progress bar CSS is in this file

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
  const safeValue = value || ""; // Default value in case it's undefined

  return (
    <div className={`field ${fullWidth ? "full-width-field" : ""}`}>
      <label className="label">{label}</label>
      {type === "select" ? (
        <select
          name={name}
          value={safeValue}
          onChange={onChange}
          className={`input custom-select ${
            fullWidth ? "full-width-select" : ""
          } ${safeValue === "" ? "placeholder-active" : ""}`}
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
          value={safeValue}
          onChange={onChange}
          className="input"
        />
      )}
    </div>
  );
}

export default FormField;

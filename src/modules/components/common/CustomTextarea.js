import React from "react";
import { FirstLetterUppercase } from "./helpers";

export const CustomTextarea = (props) => {
  const {
    label,
    placeholder,
    inputValue,
    onChange,
    maxlength,
    onKeyDown,
    rows,
    floatingLabel,
    disabled,
    error,
    requiredField,
  } = props;

  return (
    <div className="relative mb-4">
      {label ? (
        <div
          className={`font-poppins z-10 text-h1 font-semibold leading-normal text-pickled-bluewood pb-2 `}
        >
          {label ? label : "Select Option"}
          {requiredField ? <span style={{ color: "red" }}>*</span> : ""}
        </div>
      ) : (
        ""
      )}
      <textarea
        placeholder={
          placeholder
            ? FirstLetterUppercase(placeholder)
            : FirstLetterUppercase(label)
        }
        value={inputValue}
        rows={rows}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        maxLength={maxlength}
        onKeyDown={(e) => {
          if (typeof onKeyDown === "function") {
            onKeyDown(e.target.value);
          }
        }}
        //   className="input-with-label-in-textbox text-pickled-bluewood font-poppins p-3 text-h1 font-medium leading-tight bg-white w-full"
        style={{
          color: disabled ? "rgba(0, 0, 0, 0.25)" : "#383A65",
          backgroundColor: disabled ? "#f5f5f5" : "#fff",
          cursor: disabled ? "not-allowed" : "text",
        }}
        className={`font-poppins font-medium ${
          floatingLabel !== false
            ? "input-with-label-in-textbox p-3 text-h1 leading-tight w-full"
            : "text-xs rounded-lg leading-normal"
        }`}
      />
      {error && <p className="error-text text-xs">{error}</p>}
    </div>
  );
};

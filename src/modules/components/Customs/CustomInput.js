import React, { useState } from "react";
import { Input } from "antd";
import { FirstLetterUppercase } from "../Context/helpers"

let debounceTimeout = null;

export const CustomInput = (props) => {
  const {
    label,
    placeholder,
    inputValue,
    onChange,
    maxlength,
    onKeyDown,
    floatingLabel,
    disabled,
    debounceInput,
    allowClear,
    error,
    requiredField,
  } = props;
  const [inputDebounceValue, setInputDebounceValue] = useState(null);

  const debounceInputEffect = (value) => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    setInputDebounceValue(value);
    debounceTimeout = setTimeout(() => {
      onChange(value);
    }, 500);
  };

  return (
    <div>
      {label ? (
        <div
          className={`font-poppins z-10 text-h1 font-semibold leading-normal text-pickled-bluewood pb-2 `}
        >
          {label ? label : "Select Option"}
          {requiredField ? <span style={{ color: "red" }}>*</span> : ""}
          {/* {FirstLetterUppercase(label)} */}
        </div>
      ) : (
        ""
      )}
      <div
        className={`flex ${
          label ? (floatingLabel !== false ? "z-0" : "pt-2 pb-5") : ""
        }`}
      >
        <Input
          value={debounceInput === true ? inputDebounceValue : inputValue}
          onChange={(e) => {
            if (debounceInput === true) {
              debounceInputEffect(e.target.value);
            } else {
              onChange(e.target.value);
            }
          }}
          style={{
            height: "45px",
            color: disabled ? "rgba(0, 0, 0, 0.25)" : "#383A65",
            backgroundColor: disabled ? "#f5f5f5" : "#fff",
            cursor: disabled ? "not-allowed" : "text",
          }}
          size="large"
          placeholder={
            placeholder
              ? FirstLetterUppercase(placeholder)
              : FirstLetterUppercase(label)
          }
          className={`font-poppins font-medium ${
            floatingLabel !== false
              ? "input-with-label-in-textbox p-3 text-h1 leading-tight w-full"
              : "text-xs rounded-lg leading-normal"
          }`}
          disabled={disabled}
          maxLength={maxlength}
          allowClear={allowClear}
          onKeyDown={(e) => {
            if (typeof onKeyDown === "function") {
              onKeyDown(e.target.value);
            }
          }}
        />
      </div>
      {error && <p className="error-text text-xs">{error}</p>}
    </div>
  );
};
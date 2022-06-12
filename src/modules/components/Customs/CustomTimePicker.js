import React, { useState } from "react";
import { TimePicker } from "antd";
import { FirstLetterUppercase } from "../Context/helpers"

let debounceTimeout = null;

export const CustomTimePicker = (props) => {
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
    format,
    value
  } = props;

  return (
    <div>
      {label ? (
        <div
          className={`font-poppins z-10 text-h1 font-semibold leading-normal text-pickled-bluewood pb-2 `}
        >
          {label ? label : placeholder ? placeholder : "Select Option"}
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
        <TimePicker
          value={value}
          style={{
            height: "45px",
            color: "#383A65",
            backgroundColor: "#fff",
            cursor: "text",
          }}

          className={`font-poppins font-medium ${
            true !== false
              ? "input-with-label-in-textbox p-3 text-h1 leading-tight w-full"
              : "text-xs rounded-lg leading-normal"
          }`}
          placeholder={placeholder}
          format={format}
          onChange={(time, value) =>{
            onChange(time, value)
          }}
        />
      </div>
      {error && <p className="error-text text-xs">{error}</p>}
    </div>
  );
};
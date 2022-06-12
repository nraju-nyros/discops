import React from "react";
import { DatePicker } from "antd";
import moment from "moment";
import { FirstLetterUppercase, FormatDate, GetMomentDateObj } from "./helpers";

export const CustomSingleDatePicker = (props) => {
  const {
    label,
    startDate,
    endDate,
    mode,
    value,
    onStartDateChange,
    onEndDateChange,
    placeholder,
    startDatePlaceholder,
    endDatePlaceholder,
    disabledEndDate,
    floatingLabel,
    onChange,
    placement,
    format,
    requiredField,
    error
  } = props;

  const [dateValue,setDateValue ] = React.useState()
  return (
    <div className={`${mode === "rangePicker" ? "flex" : ""}`}>
      <div className={`${floatingLabel !== false ? "relative" : "w-full"}`}>
        <div
          className={`font-poppins z-10 ${
            floatingLabel !== false
              ? "absolute text-sub0 font-medium leading-tight text-regent-gray "
              : "text-h1 font-semibold leading-normal text-pickled-bluewood pb-2"
          }`}
          style={{
            top: floatingLabel !== false ? "-9px" : "",
            left: floatingLabel !== false ? "9px" : "",
            padding: floatingLabel !== false ? "2px" : "",
          }}
        >
          {label ? label : startDate ? FirstLetterUppercase(startDatePlaceholder) : ""}
          {requiredField ? <span style={{ color: "red" }}>*</span> : ""}
        </div>
        <div className="flex items-center">
          <DatePicker
            suffixIcon={
              <img src="/images/icons/tickDropdown.svg" alt="dropdownimage" />
            }
            allowClear={false}
            placeholder={label ? `Select ${label}` : placeholder}
            placement={placement}
            format={format}
            // placeholder={"Select dates"}
            className={`ant-select-selector custom-placeholder alert-filter-open-time-dropdown rounded-lg font-poppins text-xs font-medium leading-normal text-daisy-bush w-full border-0 ${
              startDate
                ? floatingLabel !== false
                  ? "input-with-label-in-textbox pt-3"
                  : "input-with-label-in-textbox pb-0 pt-0"
                : "bg-white-lilac"
            }`}
            style={{ height: "45px" }}
            value={value ? value : ''}
            // onChange={(date, dateString) => {
            //   onStartDateChange(date, dateString);
            // }}
            onChange={(val) => {
              onChange(val);
            }
            }
          />
        </div>
        {error && <p className="error-text text-xs">{error}</p>}
      </div>
      {/* {mode === "rangePicker" ? (
        <div className="flex pb-5 items-center">
          <span className="mx-2 font-poppins font-medium text-xs text-regent-gray leading-normal">
            to
          </span>
          <div className={`${floatingLabel !== false ? "relative" : ""}`}>
            <div
              className={`font-poppins z-10 ${
                floatingLabel !== false
                  ? "absolute text-sub0 font-medium leading-tight bg-white text-regent-gray "
                  : "text-h1 font-semibold leading-normal text-pickled-bluewood pb-2"
              }`}
              style={{
                top: floatingLabel !== false ? "-9px" : "",
                left: floatingLabel !== false ? "9px" : "",
                padding: floatingLabel !== false ? "2px" : "",
              }}
            >
              {label ? FirstLetterUppercase(label) : endDate ? FirstLetterUppercase(endDatePlaceholder) : ""}
            </div>
            <DatePicker
              suffixIcon={
                <img src="/images/icons/tickDropdown.svg" alt="dropdownimage" />
              }
              allowClear={false}
              placeholder={FirstLetterUppercase(endDatePlaceholder)}
              className={`ant-select-selector custom-placeholder alert-filter-open-time-dropdown rounded-lg font-poppins text-xs font-medium leading-normal text-daisy-bush w-full border-0 ${
                endDate
                  ? floatingLabel !== false
                    ? "input-with-label-in-textbox pt-3"
                    : "input-with-label-in-textbox pb-0 pt-0"
                  : "bg-white-lilac"
              }`}
              style={{ height: "45px" }}
              value={endDate ? GetMomentDateObj(FormatDate(endDate, "")) : ""}
              onChange={(date, dateString) => {
                onEndDateChange(date, dateString);
              }}
              disabledDate={disabledEndDate}
            />
          </div>
        </div>
      ) : (
        ""
      )} */}
    </div>
  );
};

import React from "react";
import { Select } from "antd";
import { SearchBox } from "./SearchBox";
import { FirstLetterUppercase } from "./helpers";
const { Option } = Select;

export const SelectDropdown = (props) => {
  const [autoFocus, setAutoFocus] = React.useState(null);
  const {
    dataList,
    label,
    optionsList,
    mode,
    showSearch,
    showArrow,
    suffixIcon,
    removeIcon,
    onChange,
    optionKeyName,
    optionValueName,
    optionDisplayName,
    value,
    onDropdownVisibleChange,
    className,
    onSearchInput,
    floatingLabel,
    placeholderOption,
    disabled,
    error,
    searchBy,
    requiredField,
    placeholder,
    addOption,
    addOptionLabel,
    addOptionClickAction,
    optionStyle
  } = props;

  const autoFocusSearch = () => {
    setTimeout(() => {
      setAutoFocus(!autoFocus);
    }, 10)
  }

  return (
    <div className={`${disabled ? "opacity-50" : ""}`}>
      {(typeof dataList === "number" && dataList !== null) ||
        (!searchBy && (
          <div
            className={`font-poppins z-10 text-h1 font-semibold leading-normal text-pickled-bluewood pb-2  }`}
          >
            {label ? label : "Select Option"}
            {requiredField ? <span style={{ color: "red" }}>*</span> : ""}
            {addOption ? <span className='ant-pagination-total-text'><a onClick={addOptionClickAction}>{addOptionLabel}</a></span> : ''}
          </div>
        ))}
      <Select
        dropdownStyle={optionStyle ? optionStyle : ''}
        onClick={autoFocusSearch}
        suffixIcon={
          suffixIcon ? (
            suffixIcon
          ) : (
            <img src="/images/icons/tickDropdown.svg" alt="dropdownimage" />
          )
        }
        size="large"
        className={`custom-select-dropdown custom-placeholder alert-filter-open-time-dropdown rounded-lg font-poppins text-xs font-medium leading-normal text-daisy-bush w-full ${(typeof dataList === "number" && dataList !== null) ||
            dataList?.length
            ? mode === "multiple" && floatingLabel !== false
              ? "input-with-label-in-textbox pt-3"
              : "input-with-label-in-textbox"
            : "bg-white-lilac"
          } ${mode === "single" ? "single-select-dropdown" : ""} ${className}`}
        style={{
          height:
            (typeof dataList === "number" && dataList !== null) ||
              dataList?.length > 0
              ? !floatingLabel !== false && mode === "single"
                ? "45px"
                : "auto"
              : "45px",
        }}
        // placeholder={label ? FirstLetterUppercase(label) : "Select Option"}

        placeholder={placeholder ? placeholder : label}
        onChange={(value, key) => {
          onChange(value, key);
        }}
        mode={mode ? mode : "single"}
        showSearch={showSearch ? showSearch : false}
        showArrow={showArrow === false ? false : true}
        disabled={disabled}
        removeIcon={
          removeIcon ? (
            removeIcon
          ) : (
            <img src="/images/icons/x-mark-delete.svg" alt="delete" />
          )
        }
        value={value}
        onDropdownVisibleChange={(isOpen) => {
          if (typeof onDropdownVisibleChange === "function") {
            onDropdownVisibleChange(isOpen);
          }
        }}
        dropdownRender={(menu) =>
          showSearch === true ? (
            <div>
              <div className="custom-select-dropdown-option-inside-search">
                <SearchBox
                  autoFocus={autoFocus}
                  onChange={(value) => {
                    onSearchInput(value);
                  }}
                />
              </div>
              {menu}
            </div>
          ) : (
            menu
          )
        }
      >
        {mode === "single" ? (
          <Option selected disabled style={{ display: "none" }}>
            {placeholderOption === "hide-option-selected" ? "" : "Select"}{" "}
            {label}
          </Option>
        ) : (
          ""
        )}
        {optionsList?.length &&
          optionsList.map((singleEle) => (
            <Option
              key={singleEle[optionKeyName]}
              value={singleEle[optionValueName]}
              className={`flex justify-between py-1 items-center flex-row-reverse ${mode === "multiple"
                  ? "custom-select-dropdown-with-checkbox"
                  : ""
                }`}
            >
              <div className="font-poppins text-xs font-medium leading-normal flex align-center">
                <span
                  className="options-checkbox"
                  style={{
                    width: "20px",
                    height: "21px",
                    border: "1px solid #E0E0E3",
                    marginRight: "10px",
                    display: "none",
                  }}
                ></span>
                {singleEle[optionDisplayName]}
              </div>
            </Option>
          ))}
      </Select>
      {error && <p className="error-text text-xs">{error}</p>}
    </div>
  );
};

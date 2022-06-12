import React, { useEffect, useState } from "react";
import { Select } from "antd";
import { SearchBox } from "./SearchBox";
import { FirstLetterUppercase } from "./helpers";
const { Option, OptGroup } = Select;

export const SelectDropdownWithGroup = (props) => {
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
    groupByKey = null,
    dropDownSearch,
  } = props;
  const [data, setData] = useState([]);
  const groupBy = function (value, key) {
    const itemData = [];
    let filteredData;
    value?.reduce((group, item) => {
      const element = item[key];

      itemData.push({
        groupName: element ? element : " ",
        data: value.filter((sub) => sub[key] === element),
      });
    });
    filteredData = itemData.filter(
      (value, index, self) =>
        index ===
        self.findIndex(
          (t) =>
            t.groupName === value.groupName && t.groupName === value.groupName
        )
    );
    return filteredData;
  };
  useEffect(() => {
    if (optionsList.length) {
      if (groupByKey) {
        setData([...groupBy(optionsList, groupByKey)]);
      } else {
        setData([]);
      }
    }
  }, [optionsList]);
  return (
    <div className={` mb-6 ${disabled ? "opacity-50" : ""}`}>
      {(typeof dataList === "number" && dataList !== null) || (
        <div
          className={`font-poppins z-10 text-h1 font-semibold leading-normal text-pickled-bluewood pb-2 `}
        >
          {label ? label : "Select Option"}
        </div>
      )}
      <Select
        suffixIcon={
          suffixIcon ? (
            suffixIcon
          ) : (
            <img src="/images/icons/tickDropdown.svg" alt="dropdownimage" />
          )
        }
        size="large"
        className={`custom-select-dropdown custom-placeholder alert-filter-open-time-dropdown rounded-lg font-poppins text-xs font-medium leading-normal text-daisy-bush w-full ${
          (typeof dataList === "number" && dataList !== null) ||
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
        placeholder={label ? FirstLetterUppercase(label) : "Select Option"}
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
          dropDownSearch === true ? (
            <div>
              <div className="custom-select-dropdown-option-inside-search">
                <SearchBox
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
            {label.toLowerCase()}
          </Option>
        ) : (
          ""
        )}

        {data?.length &&
          data?.map((singleEle, i) => (
            <OptGroup label={singleEle.groupName} key={i}>
              {singleEle.data.map((item, sub) => (
                <Option
                  key={item[optionKeyName]}
                  value={item[optionKeyName]}
                  className={`flex justify-between py-1 items-center flex-row-reverse ${
                    mode === "multiple"
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
                    {item[optionDisplayName]}
                  </div>
                </Option>
              ))}
            </OptGroup>
          ))}
      </Select>
      {error && <p className="error-text text-xs">{error}</p>}
    </div>
  );
};

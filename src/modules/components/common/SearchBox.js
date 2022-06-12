import React, { useState, useEffect } from "react";
import { Input, Tooltip } from "antd";

let debounceTimeout = null;

export const SearchBox = (props) => {
  const { onChange, placeholder, allowClear, value, autoFocus } = props;
  const [searchValue, setSearchValue] = useState(null);
  const inputRef = React.useRef(null);

  useEffect(() => {
    inputRef?.current?.focus()
  }, [autoFocus])

  const debounceSearch = (value) => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    setSearchValue(value);
    debounceTimeout = setTimeout(() => {
      onChange(value);
    }, 500);
  };

  return (
    <Input
      ref={inputRef}
      type="search"
      size="large"
      value={value}
      style={{
        borderRadius: "20px",
        // maxWidth: "285px",
        height: "40px",
        boxShadow: "0 1px 10px #00000012",
      }}
      className="text-h1 font-poppins border-0 hover:border-white"
      placeholder={placeholder ? placeholder : "Search"}
      onChange={(e) => {
        onChange(e.target.value);
      }}
      prefix={
        <Tooltip
          title={placeholder}
          overlayStyle={{
            maxWidth: "50%",
          }}
          placement="topRight">
          <img src="/images/icons/search.svg" alt="search" className="ml-2" />
        </Tooltip>
      }
      allowClear={allowClear === false ? false : true}
    />
  );
};

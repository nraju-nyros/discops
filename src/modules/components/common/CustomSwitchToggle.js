import React from "react";
import { Switch } from "antd";

export const CustomSwitchToggle = (props) => {
  const {
    label,
    switchValue,
    onChange,
    onText,
    offText,
    styleName,
    className,
    isDisabled,
  } = props;
  return (
    <div className="flex ">
      {label ? (
        <div
          className=""
          // style={{
          //   fontSize: styleName === "labelGreyDarkText" ? "12px" : "11px",
          //   color: styleName === "labelGreyDarkText" ? "#8892A5" : "",
          // }}
        >
          {label}
        </div>
      ) : (
        ""
      )}
      <div className={`flex items-center ${className}`}>
        <div
          className="mx-2 font-poppins font-medium text-xs leading-normal"
          style={{
            color:
              styleName === "greenTextActive" && switchValue === 1
                ? "#84D49D"
                : "rgb(136, 146, 165)",
          }}
        >
          {switchValue ? onText : offText}
        </div>
        <Switch
          onChange={(checked) => onChange(checked)}
          checked={switchValue}
          disabled={isDisabled ? true : false}
        />
      </div>
    </div>
  );
};

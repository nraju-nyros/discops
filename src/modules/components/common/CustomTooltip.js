import React from "react";
import { Tooltip } from "antd";

export const CustomTooltip = (props) => {
  const {
    title,
    placement,
    displayText,
    className,
    styles,
    overlayStyles,
    overlayClassNames,
  } = props;

  return (
    <div
      className={`${className} overflow-hidden overflow-ellipsis whitespace-nowrap`}
    >
      <Tooltip
        title={title}
        placement={placement ? placement : "topLeft"}
        overlayStyle={overlayStyles}
        overlayClassName={overlayClassNames}
      >
        <span
          style={styles}
        >
          {displayText ? displayText : title}
        </span>
      </Tooltip>
    </div>
  );
};

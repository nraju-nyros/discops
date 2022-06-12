import { Button, Drawer } from "antd";

export const SidePanel = (props) => {
  const {
    sidePanelVisible,
    className,
    onCancelClick,
    panelWidth,
    maskClosable,
    panelTitle,
    headerAction,
    customHeaderAction,
    onClearClick,
    panelFooter,
    sidePanelData,
    hideSecondaryButton,
    secondaryButtonLabel,
    onPrimaryButtonClick,
    primaryButtonLabel,
    isPrimaryButtonDisabled,
  } = props;
  return (
    <Drawer
      visible={sidePanelVisible}
      className={`sidepanel-section ${className}`}
      // style={{ width: panelWidth ? panelWidth : "360px" }}
      onClose={onCancelClick}
      width={panelWidth ? panelWidth : 360}
      bodyStyle={{ padding: 0 }}
      closable={false}
      contentWrapperStyle={{
        borderTopLeftRadius: "24px",
        borderBottomLeftRadius: "24px",
        overflow: "hidden",
      }}
      maskClosable={maskClosable}
      zIndex={10}
    >
      <div
        className="flex panel-header items-center"
        style={{ justifyContent: "space-between" }}
      >
        <div style={{ fontSize: 21, color: "#8892A5" }}>
          {panelTitle ? panelTitle : "Filter"}
        </div>
        {headerAction ? (
          customHeaderAction ? (
            customHeaderAction
          ) : (
            <div
              className="text-h1 font-medium"
              onClick={() => onClearClick()}
              style={{
                alignSelf: "center",
                cursor: "pointer",
                color: "#4E2C90",
              }}
            >
              Clear all
            </div>
          )
        ) : (
          ""
        )}
      </div>
      <div
        className="panel-content custom-scrollbar"
        style={{
          height: `calc(100vh - ${panelFooter ? "143px" : "95px"})`,
          // marginBottom: `${panelFooter ? "10px" : "0"}`,
          marginTop: "30px",
          overflow: "auto",
          paddingTop: 0,
        }}
      >
        {sidePanelData}
      </div>
      {panelFooter ? (
        <div
          className="panel-footer"
          style={{
            boxShadow: "0px -3px 6px #0000000a",
          }}
        >
          {hideSecondaryButton ? (
            ""
          ) : (
            <Button
              onClick={() => onCancelClick()}
              className="border-0 text-h1 font-semibold"
              style={{
                width: "40%",
                height: "50px",
                borderBottomLeftRadius: "24px",
                color: "#4E2C90",
              }}
            >
              {secondaryButtonLabel ? secondaryButtonLabel : "Cancel"}
            </Button>
          )}
          <Button
            disabled={isPrimaryButtonDisabled}
            onClick={() => onPrimaryButtonClick()}
            className="bg-daisy-bush border-0 bg-daisy-bush text-white rounded-none"
            style={{
              width: hideSecondaryButton ? "100%" : "60%",
              height: "50px",
              borderColor: "#4e2c90",
            }}
          >
            {primaryButtonLabel ? primaryButtonLabel : "Apply"}
          </Button>
        </div>
      ) : (
        ""
      )}
    </Drawer>
  );
};

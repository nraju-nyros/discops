import React, { useContext } from "react";
import { Col, Row, Button } from "antd";
import { AppContext } from "../store/app-context";

export const PageTitleBox = (props) => {
  const {
    id,
    title,
    subTitle,
    pageTitleButton,
    buttonOnClick,
    buttonIcon,
    buttonLabel,
    showHelp,
    helpText,
    helpIcon,
    onHelpClick,
    pageTitleButtonDisabled,
  } = props;
  const ctx = useContext(AppContext);
  let pageTitle = title;
  let pageSubtitle = subTitle;

  if (id) {
    const result = ctx.getTitle(id, ctx.userInfo?.UserFeatures);
    if (result) {
      pageTitle = result.title;
      pageSubtitle = result.subTitle;
    }
  }

  return (
    <Row className="px-1 items-center">
      <Col span={pageTitleButton ? (showHelp ? 10 : 12) : showHelp ? 22 : 24}>
        <div className="page-title">
          <div
            className="font-poppins leading-normal"
            style={{ color: "#8892A5", fontWeight: "400", fontSize: "21px" }}
          >
            {pageTitle}
          </div>
          {pageSubtitle ? (
            <div
              className="font-poppins text-h1 font-medium leading-normal"
              style={{ color: "#8892A5" }}
            >
              {pageSubtitle}
            </div>
          ) : (
            ""
          )}
        </div>
      </Col>
      {pageTitleButton ? (
        <Col span={12} className="text-right">
          <Button
            type="link"
            onClick={() => buttonOnClick()}
            size="medium"
            className="py-0 inline-flex items-center border border-daisy-bush bg-white rounded-md px-3"
            disabled={pageTitleButtonDisabled}
          >
            <div className="flex font-poppins text-daisy-bush text-sm font-semibold leading-normal">
              <div className="m-auto">{buttonIcon}</div>
              <div className=" font-poppins text-daisy-bush text-sm font-semibold leading-normal ml-2" />
              {buttonLabel}
            </div>
          </Button>
        </Col>
      ) : (
        ""
      )}
      {showHelp ? (
        <Col span={2} className="text-right">
          <Button
            type="link"
            onClick={() => onHelpClick()}
            size="medium"
            className="py-0 inline-flex items-center border border-daisy-bush bg-white rounded-md px-3 leaflet-zone-name"
          >
            <div className="flex font-poppins text-daisy-bush text-sm font-semibold leading-normal">
              <div className="m-auto">{helpIcon}</div>
              <div className=" font-poppins text-daisy-bush text-sm font-semibold leading-normal ml-2" />
              {helpText}
            </div>
          </Button>
        </Col>
      ) : (
        ""
      )}
    </Row>
  );
};

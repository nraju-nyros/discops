import React from "react";
// import { AppContext } from "../../Core/store/app-context";
import { AppContext } from "./Context/AppContext";

import { Modal, Button, Row, Col } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

export const SideDrawer = (props) => {
  const ctx = React.useContext(AppContext);

  const { hideCancel, hideCui, showHelp, onHelpClick } = props;
  return (
    <Modal
      visible={props.showModal}
      closable={false}
      transitionName={false}
      wrapClassName={props.wrapperClassName}
      footer={props.isFooterVisible}>
      <div className="flex flex-col h-full	">
        <div className="drawer-header sticky z-10 top-0 bg-white z-10">
        {/*  {ctx.pageInfo?.HomeTitle && !hideCui ? (
            <Row style={{ backgroundColor: "green", color: "white" }}>
              <div className="text-center w-full">
                {ctx.pageInfo?.HomeTitle}
              </div>
            </Row>
          ) : (
            ""
          )}*/}
          <div className="flex justify-between items-center	">
            {props.title && (
              <h1 className=" text-xl py-2 px-7 ">{props.title}</h1>
            )}
            {!hideCancel && (
              <div>
                <Button
                  onClick={props.onClose}
                  className="mr-5 text-regent-gray border-0 text-h1 font-semibold cancelColor">
                  Cancel
                </Button>
              </div>
            )}
          </div>
          {showHelp && (
            <Row>
              <Col span={2} offset={22}>
                  <Button
                    type="link"
                    onClick={onHelpClick}
                    size="medium"
                    className="py-0 inline-flex items-center border border-daisy-bush bg-white rounded-md px-3 leaflet-zone-name"
                  >
                    <div className="flex font-poppins text-daisy-bush text-sm font-semibold leading-normal">
                      <div className="m-auto">{<QuestionCircleOutlined />}</div>
                      <div className=" font-poppins text-daisy-bush text-sm font-semibold leading-normal ml-2" />
                      Help
                    </div>
                  </Button>
              </Col>
            </Row>
          )}
        </div>
        {props.children}
      </div>
    </Modal>
  );
};

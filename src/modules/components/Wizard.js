import { Button, Col, Row, Steps } from "antd";
import React, { useState } from "react";
import { QuestionCircleOutlined } from "@ant-design/icons";
const { Step } = Steps;

export const Wizard = ({ steps, current, classes, helpTemplate }) => {
  const [showHelp, setShowHelp] = useState(false);
  return (
    <>
      <Row className="max-h-screen">
        <Col span={24}>
          <Row className="h-full">
            <Col span={showHelp ? 20 : 24} className="flex flex-col h-full">
              <Steps className={`px-7 mt-2 pb-2 test ${classes}`} current={current}>
                {steps.map((item) => (
                  <Step key={item.title} title={item.title} />
                ))}
              </Steps>
              <div className="steps-content flex-grow flex flex-col flex-grow">
                {steps[current].content}
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

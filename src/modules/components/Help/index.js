import React, { useEffect, useState, useContext } from "react";
import { Col, Row, Form, Input, Button, List, Collapse } from "antd";
import { CloseOutlined } from "@ant-design/icons";
const { Panel } = Collapse;

export const Help = (props) => {
  const { template } = props;
  const { onHelpClick, helpToggle, className } = props;
  const [searchQuery, setSearchQuery] = useState(template);

  const onSearch = (val) => {
    if(val.target.value.length) {
      let temp = template.split(/\r\n|\r|\n/).filter((e) => e.toUpperCase().match(val.target.value.toUpperCase())).join('');
      setSearchQuery(temp);
    } else {
      setSearchQuery(template);
    }
  }

  const onCollapse = () => {
    onHelpClick();
  };

  return (
    <>
      <div
        theme={"light"}
        collapsible
        collapsed={!helpToggle}
        onCollapse={onCollapse}
        trigger={null}
        reverseArrow={true}
        className="px-4 pt-4 help-bg"
      >
        <div className="flex mt-2 mb-2 items-center">
          <div className="flex-grow mb-2">Help</div>
          <div>
            <Button className="py-0 inline-flex items-center border border-daisy-bush bg-white rounded-md px-3 hidden">
              FAQ's
            </Button>
          </div>
          <a className="ml-2" onClick={() => onCollapse(true)}>
            <CloseOutlined />
          </a>
        </div>
{/*        <Row>
          <Col span={24}>
            <Input onChange={onSearch} placeholder="Search" />
          </Col>
        </Row>*/}
        <Row>
          <Col span={24}>
          {template}
            {/*<span dangerouslySetInnerHTML={{__html: searchQuery}} />*/}
              {/*<iframe style={{maxWidth: '100%', minHeight: '90vh'}} src={`/serviceRequest/ListServiceRequest.js`}></iframe>*/}
          </Col>
        </Row>
      </div>
    </>
  );
};

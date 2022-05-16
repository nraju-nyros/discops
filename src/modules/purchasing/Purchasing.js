import { PlusOutlined, QuestionCircleOutlined,SearchOutlined } from "@ant-design/icons";


import { Table, Button, Checkbox, Col, Modal, Row, Tooltip, Input,Typography} from "antd";

import React, { useContext, useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";


const { Title } = Typography;


const mockData = [
  {
    DodDocNo: 10010213,
    PurchaseType: "Damage",
    SLoc: "Boston",
    FederalSupply: "FD00112",
    Material: "Tyres",
    Quantity: 9,
    Description: "Replacement",
    CategoryOfIncompleteness: 14,
    ReleaseStrategy: "Release1",
    ReleaseStatus: "ReleaseStatus11",
    Priority: "Priority11",
    MilstripStatus: "MilstripStatus111",
    Value: "111",
    DeliveryDate: "12-04-2022",
  },

  {
    DodDocNo: 10010241,
    PurchaseType: "Dismantle",
    SLoc: "DotHil",
    FederalSupply: "FD00112",
    Material: "Trunk",
    Quantity: 5,
    Description: "Dead",
    CategoryOfIncompleteness: 56,
    ReleaseStrategy: "Release1",
    ReleaseStatus: "ReleaseStatus11",
    Priority: "Priority11",
    MilstripStatus: "MilstripStatus111",
    Value: "111",
    DeliveryDate: "12-04-2022",
  },

  {
    DodDocNo: 10010311,
    PurchaseType: "Repairing",
    SLoc: "Sanfransico",
    FederalSupply: "FD00112",
    Material: "Clock Gear",
    Quantity: 2,
    Description: "Repairment",
    CategoryOfIncompleteness: 2,
    ReleaseStrategy: "Release1",
    ReleaseStatus: "ReleaseStatus11",
    Priority: "Priority11",
    MilstripStatus: "MilstripStatus111",
    Value: "111",
    DeliveryDate: "12-04-2022",
  },

  {
    DodDocNo: 10010356,
    PurchaseType: "New",
    SLoc: "New York",
    FederalSupply: "FD00112",
    Material: "6x Scope",
    Quantity: 4,
    Description: "New Order",
    CategoryOfIncompleteness: 96,
    ReleaseStrategy: "Release1",
    ReleaseStatus: "ReleaseStatus11",
    Priority: "Priority11",
    MilstripStatus: "MilstripStatus111",
    Value: "111",
    DeliveryDate: "12-04-2022",
  },

  {
    DodDocNo: 10010423,
    PurchaseType: "Repairing",
    SLoc: "Sanfransico",
    FederalSupply: "FD00112",
    Material: "Gear Box",
    Quantity: 7,
    Description: "Repairment",
    CategoryOfIncompleteness: 45,
    ReleaseStrategy: "Release1",
    ReleaseStatus: "ReleaseStatus11",
    Priority: "Priority11",
    MilstripStatus: "MilstripStatus111",
    Value: "111",
    DeliveryDate: "12-04-2022",
  }
];

export const Purchasing = () => {
  const [purchasingList, setPurchasingList] = useState(mockData);
    const [filterPurchasingList, setFilterPurchasingList] = useState(mockData);

  // useEffect(() => {
  //   getPurchasingList();
  // });

  const handleSearch = (event) => {
    let query = event.toLowerCase();
    let result = [];
    console.log("hhghgh", query);
    result = purchasingList.filter((item) => {
      return (
         item.DodDocNo.toString().toLowerCase().indexOf(query) >= 0 ||
        item.DodDocNo.toString().toLowerCase().indexOf(query) >= 0
      );
    });
    setFilterPurchasingList(result);
  };


 
 
  const columns = [
    {
      title: <Tooltip title="DoD Document Number">Document</Tooltip>,
      dataIndex: "DodDocNo",
      key: "DodDocNo",
      sorter: {
        compare: (a, b) => a.DodDocNo - b.DodDocNo,
      },
    },
    {
      title: <Tooltip title="Purchasing Document Type">Type</Tooltip>,
      dataIndex: "PurchaseType",
      key: "PurchaseType",
    },
    {
      title: <Tooltip title="Storage Location">Location</Tooltip>,
      dataIndex: "SLoc",
      key: "SLoc",
    },

    {
      title: <Tooltip title="Federal Supply Class Code">FSCC</Tooltip>,
      dataIndex: "FederalSupply",
      key: "FederalSupply",
    },
    {
      title: <Tooltip title="Material">Material</Tooltip>,
      dataIndex: "Material",
      key: "Material",
    },
    {
      title: <Tooltip title="Quantity">QTY</Tooltip>,
      dataIndex: "Quantity",
      key: "Quantity",
      sorter: {
        compare: (a, b) => a.Quantity - b.Quantity,
      },
    },
    {
      title: <Tooltip title="NIIN Text description">Description</Tooltip>,
      dataIndex: "Description",
      key: "Description",
    },
    {
      title: <Tooltip title="Category of Incompleteness">COI</Tooltip>,
      dataIndex: "CategoryOfIncompleteness",
      key: "CategoryOfIncompleteness",
      sorter: {
        compare: (a, b) =>
          a.CategoryOfIncompleteness - b.CategoryOfIncompleteness,
      },
    },
    {
      title: <Tooltip title="Release Strategy">R Strategy</Tooltip>,
      dataIndex: "ReleaseStrategy",
      key: "ReleaseStrategy",
    },
    {
      title: <Tooltip title="Release Status">R Status</Tooltip>,
      dataIndex: "ReleaseStatus",
      key: "ReleaseStatus",
    },

    {
      title: <Tooltip title="Release Status">Priority</Tooltip>,
      dataIndex: "Priority",
      key: "Priority",
    },
    {
      title: <Tooltip title="Milstrip Status">M Status</Tooltip>,
      dataIndex: "MilstripStatus",
      key: "MilstripStatus",
    },

    {
      title: <Tooltip title="Delivery Date">D Date</Tooltip>,
      dataIndex: "DeliveryDate",
      key: "DeliveryDate",
    },
  ];



  function onChange(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
  }

  return (
    <>
      <div className={"mr-3 ml-3"}>
        <div
          style={{
            textAlign: "center",
            color: "#fff",
            backgroundColor: "green",
            paddingTop: "2px",
            paddingBottom: "0px",
          }}
          className={"mt-2"}
        >
          <p>CONTROLLED UNCLASSIFIED INFORMATION(CUI)</p>
        </div>


      <Row className={"mr-1"}>
        <Col span={8}><Title level={2}>Purchasing</Title></Col>
        <Col span={6}></Col>
        <Col span={8} className="mt-2 mr-1" align="right">
         
        {/*<Button type="primary" icon={<SearchOutlined />}>*/}
           <Link to="/purchase/new">Create Purchase Requistion</Link>
        {/*</Button>*/}
        </Col>
      </Row>
      <Row>
        <Col span={8}><Title level={5}>Manage Purchasing here</Title></Col>
      </Row>

      <Input
        // ref={inputRef}
        type="search"
        size="large"
        style={{
          marginTop:"5px",
          borderRadius: "20px",
          maxWidth: "285px",
          height: "40px",
          boxShadow: "0 1px 10px #00000012",
        }}
        className="text-h1 font-poppins border-0 hover:border-white"
        placeholder={"Search"}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        prefix={
          <Tooltip
            title={"search"}
            overlayStyle={{
              maxWidth: "50%",
            }}
            placement="topRight"
          >
            <img
              src="/images/icons/search.svg"
              alt="search"
              className="ml-2"
            />
          </Tooltip>
        }
      />
      <div className={"mt-3"}>
        <Table
          pagination={{ pageSizeOptions: ["2", "4"], showSizeChanger: true }}
          columns={columns}
          dataSource={filterPurchasingList}
          onChange={onChange}
        />
      </div>
    </div>
  </>
  );
};

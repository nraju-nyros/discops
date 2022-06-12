import {
  PlusOutlined,
  QuestionCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";

import {
  Table,
  Button,
  Checkbox,
  Col,
  Modal,
  Row,
  Tooltip,
  Input,
  Typography,
} from "antd";

import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useHistory, Link } from "react-router-dom";
import { DispatchCreate } from "./DispatchCreate";
import { SideDrawer } from "../components/SideDrawer";

const { Title } = Typography;

const mockData = [
  {
    DodDocNo: 10010213,
    PurchaseType: "Pending",
    SLoc: "Boston",
    FederalSupply: "WAH0C0",
    Material: "Yes",
    Quantity: 9,
    Description: "Replacement",
    CategoryOfIncompleteness: 14,
    ReleaseStrategy: "Release1",
    ReleaseStatus: "Approved",
    Priority: "Priority11",
    MilstripStatus: "MilstripStatus111",
    Value: "111",
    DeliveryDate: "12-04-2022",
  },

  {
    DodDocNo: 10010241,
    PurchaseType: "-",
    SLoc: "DotHil",
    FederalSupply: "WAH0C0",
    Material: "No",
    Quantity: 5,
    Description: "Dead",
    CategoryOfIncompleteness: 56,
    ReleaseStrategy: "Release1",
    ReleaseStatus: "APPROVED",
    Priority: "Priority11",
    MilstripStatus: "MilstripStatus111",
    Value: "111",
    DeliveryDate: "12-04-2022",
  },

  {
    DodDocNo: 10010311,
    PurchaseType: "-",
    SLoc: "Sanfransico",
    FederalSupply: "WAH0C0",
    Material: "Yes",
    Quantity: 2,
    Description: "Repairment",
    CategoryOfIncompleteness: 2,
    ReleaseStrategy: "Release1",
    ReleaseStatus: "APPROVED",
    Priority: "Priority11",
    MilstripStatus: "MilstripStatus111",
    Value: "111",
    DeliveryDate: "12-04-2022",
  },

  {
    DodDocNo: 10010356,
    PurchaseType: "Pending",
    SLoc: "New York",
    FederalSupply: "WAH0C0",
    Material: "No",
    Quantity: 4,
    Description: "New Order",
    CategoryOfIncompleteness: 96,
    ReleaseStrategy: "Release1",
    ReleaseStatus: "APPROVED",
    Priority: "Priority11",
    MilstripStatus: "MilstripStatus111",
    Value: "111",
    DeliveryDate: "12-04-2022",
  },

  {
    DodDocNo: 10010423,
    PurchaseType: "Pending",
    SLoc: "Sanfransico",
    FederalSupply: "WAH0C0",
    Material: "Yes",
    Quantity: 7,
    Description: "Repairment",
    CategoryOfIncompleteness: 45,
    ReleaseStrategy: "Release1",
    ReleaseStatus: "APPROVED",
    Priority: "Priority11",
    MilstripStatus: "MilstripStatus111",
    Value: "111",
    DeliveryDate: "12-04-2022",
  },
];

export const DispatchList = () => {
  const [dispatchList, setDispatchList] = useState([]);
  const [filterDispatchList, setFilterDispatchList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    getDispatchList();
  }, []);

  const getDispatchList = () => {
    fetch("https://62a19ef0cd2e8da9b0f56b79.mockapi.io/api/v6/dispatch")
      .then((res) => res.json())
      .then((json) => {
        setDispatchList(json);
        setFilterDispatchList(json);
        console.log("response", json);
      });
  };

  const navigate = useNavigate();

  const handleSearch = (event) => {
    let query = event.toLowerCase();
    let result = [];
    console.log("hhghgh", query);
    result = dispatchList.filter((item) => {
      return (
        item.DodDocNo.toString().toLowerCase().indexOf(query) >= 0 ||
        item.DodDocNo.toString().toLowerCase().indexOf(query) >= 0
      );
    });
    setFilterDispatchList(result);
  };

  const columns = [
    {
      title: <Tooltip title="DoD Document Number">DISPATCH ID</Tooltip>,
      dataIndex: "DodDocNo",
      key: "DodDocNo",
      sorter: {
        compare: (a, b) => a.DodDocNo - b.DodDocNo,
      },
    },

    {
      title: <Tooltip title="NIIN Text description">Description</Tooltip>,
      dataIndex: "Description",
      key: "Description",
    },
    {
      title: <Tooltip title="Delivery Date">START Date</Tooltip>,
      dataIndex: "DeliveryDate",
      key: "DeliveryDate",
    },
    {
      title: <Tooltip title="Storage Location">OPERATORS</Tooltip>,
      dataIndex: "SLoc",
      key: "SLoc",
    },

    {
      title: <Tooltip title="Federal Supply Class Code">ORG CODE</Tooltip>,
      dataIndex: "FederalSupply",
      key: "FederalSupply",
    },
    {
      title: <Tooltip title="Material">APPROVAL REQUESTED</Tooltip>,
      dataIndex: "Material",
      key: "Material",
    },
    {
      title: <Tooltip title="Purchasing Document Type">SYNC TEXT</Tooltip>,
      dataIndex: "PurchaseType",
      key: "PurchaseType",
    },
    {
      title: <Tooltip title="Quantity">PROCESS STATUS</Tooltip>,
      dataIndex: "Quantity",
      key: "Quantity",
      sorter: {
        compare: (a, b) => a.Quantity - b.Quantity,
      },
    },

    {
      title: <Tooltip title="Release Status">Status</Tooltip>,
      dataIndex: "ReleaseStatus",
      key: "ReleaseStatus",
      render: (text, record) => {
        return (
          <>
            <span className=" status-border-process ">Approved</span>
          </>
        );
      },
    },

    {
      title: <Tooltip title="Milstrip Status">M Status</Tooltip>,
      dataIndex: "MilstripStatus",
      key: "MilstripStatus",
      render: (text, record) => {
        const buttonOnClick = () => {
          navigate({
            pathname: "/dispatch/completedispatchnotification",
            tabValue: "2",
          });
        };
        // const buttonOnClick2 = () => {
        //   history.push({
        //     pathname: "/workOrder/material/dismantle",
        //     // state: { workOrderDetail: workOrderDetail },
        //   });
        // };
        return (
          <div className="flex">
            <Button
              type="link"
              // onClick={() => buttonOnClick()}
              onClick={() =>
                navigate("/dispatch/completeddispatchnotification")
              }
              size="large"
              className="py-0 inline-flex items-center border border-daisy-bush rounded-md px-3 mr-3"
            >
              <div className="flex font-poppins text-daisy-bush text-sm font-semibold leading-normal">
                Complete Dispatch
              </div>
            </Button>
          </div>
        );
      },
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
          className={"banner"}
        >
          <p>CONTROLLED UNCLASSIFIED INFORMATION(CUI)</p>
        </div>

        <Row className={"mr-1"}>
          <Col span={8}>
            <Title level={2}>Dispatch Notifications</Title>
          </Col>
          <Col span={6}></Col>
          <Col span={8} className="mt-2 mr-1" align="right">
            <Button
              type="link"
              onClick={() => navigate("/dispatch/new")}
              // onClick={() => setIsModalVisible(true)}

              size="large"
              className="py-0 inline-flex items-center border border-daisy-bush rounded-md px-3"
            >
              <div className="flex font-poppins text-daisy-bush text-sm font-semibold leading-normal">
                <div className="m-auto">
                  <PlusOutlined
                    style={{ color: "#4E2C90" }}
                    className="flex m-auto"
                  />
                </div>

                <div className=" font-poppins text-daisy-bush text-sm font-semibold leading-normal " />
                {"Create Dispatch Notification"}
              </div>
            </Button>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <Title level={5}>Manage Dispatch Notifications here</Title>
          </Col>
        </Row>

        <Input
          // ref={inputRef}
          type="search"
          size="large"
          style={{
            marginTop: "5px",
            borderRadius: "20px",
            maxWidth: "285px",
            height: "40px",
            boxShadow: "0 1px 10px #00000012",
          }}
          className="text-h1 font-poppins border-0 hover:border-white"
          placeholder={"Search by Admin No. Serial No"}
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
            dataSource={filterDispatchList}
            onChange={onChange}
          />
        </div>
      </div>

      {/* {isModalVisible && (
      
          <DispatchCreate
            onClose={() => {
              setIsModalVisible(false);
              // getDispatchList();
            }}
          />
      )}*/}
    </>
  );
};

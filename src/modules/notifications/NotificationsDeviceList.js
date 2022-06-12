import {
  EditTwoTone,
  LoadingOutlined,
  WarningTwoTone,
} from "@ant-design/icons";
import { Button, Card, Col, Radio, Row, Spin, Tooltip, Modal,Input } from "antd";
import React, { useEffect, useState, useCallback } from "react";
// import { DataTable, DataTypes } from "../../Core/common/DataTable";
import { DataTable, DataTypes } from "../components/Customs/DataTable";

import { stripLeadingZeros } from "../components/Customs/helpers";
import { SearchBox } from "../components/common/SearchBox";


const list = [
  {
    AdminNo: "C11",
    Coding: "680",
    CreatedBy: "DEVUSER1@shipcomwireless.com",
    CreatedOn: "05/09/2022 05:33:09",
    DefectGroup: "AMG",
    DefectLocation: "AMH",
    Description: "steve class changes 5.9",
    DocumentNo: "103",
    EquipmentNo: "000000001011212104",
    Id: "a83e19f5-0ad9-43b3-a2fc-dab78190dbb4",
    InProcess: 1,
    Material: "014360005",
    ModelNo: "M2A3",
    NotifTime: "05:33:09",
    OperStatus: "OperStatus 001",
    OrgCode: "WAH0C0",
    ParentId: "172514af-e10a-48bb-8432-01b07445b0b9",
    Priority: "2",
    PriorityName: "2-Medium",
    ProcessStatus: 3,
    ProcessStatusName: "Completed",
    Remarks: "steve class changes 5.9 remarks",
    SerialNo: "2AGR0666Y",
    StartDate: "20220509",
    Status: 1,
    StorageLoc: "CEPB",
    SyncCode: 2,
    SyncText: "Pending",
    TechStatus: "E0003",
    TechStatusIcon: "BIO",
    TechStatusName: "BIO-Biological Cont",
    Type: "M1",
    TypeName: "M1-Maintenance Request",
    UpdatedBy: "DEVUSER1@shipcomwireless.com",
    UpdatedOn: "2022-05-09 05:36:38",
    WorkOrderNo: "WORK-688",
  },
  {
    AdminNo: "WAH0C0-",
    CauseCode: "068",
    Coding: "777",
    CreatedBy: "DEVUSER1@shipcomwireless.com",
    CreatedOn: "05/09/2022 04:47:55",
    DefectGroup: "AMG",
    DefectLocation: "DPM",
    DocumentNo: "199",
    Description: "steve test 5.8",
    EquipmentNo: "000000001011182894",
    Id: "1b9b62a1-6d9a-482b-9181-7ab38920556d",
    InProcess: 1,
    Material: "009739533",
    ModelNo: "",
    NotifTime: "04:47:55",
    OperStatus: "OperStatus 403",
    OrgCode: "WAH0C0",
    ParentId: "a2d5e68b-2fed-4385-bc55-a5cc7c39b85d",
    Priority: "1",
    PriorityName: "1-High (X)",
    ProcessStatus: 2,
    ProcessStatusName: "InProcess",
    Remarks: "steve test 5.8 remarks",
    SerialNo: "356405U",
    StartDate: "20220509",
    Status: 1,
    StorageLoc: "CEP8",
    SyncCode: 2,
    SyncText: "Pending",
    TechStatus: "E0007",
    TechStatusIcon: "CX",
    TechStatusName: "CX-Circle X",
    Type: "M1",
    TypeName: "M1-Maintenance Request",
    UpdatedBy: "DEVUSER1@shipcomwireless.com",
    UpdatedOn: "2022-05-09 04:48:39",
    WorkOrderNo: "WORK-676",
  },
  {
    AdminNo: "UIC   -",
    CauseCode: "115",
    Coding: "360",
    CreatedBy: "DEVUSER1@shipcomwireless.com",
    CreatedOn: "05/09/2022 04:37:16",
    DocumentNo: "129",
    DefectGroup: "",
    DefectLocation: "",
    Description: "test",
    EquipmentNo: "000000001016587025",
    Id: "2f4c5032-aa12-4c43-a790-cf9435c1cefd",
    ModelNo: "",
    OperStatus: "OperStatus 333",
    Priority: "2",
    PriorityName: "2-Medium",
    ProcessStatus: 2,
    ProcessStatusName: "InProcess",
    Remarks: "test",
    SerialNo: "010520",
    Status: 1,
    SyncCode: 2,
    SyncText: "Pending",
    TechStatus: "E0006",
    TechStatusIcon: "E",
    TechStatusName: "E-Admin Deadline",
    Type: "M1",
    TypeName: "M1-Maintenance Request",
    UpdatedBy: "DEVUSER1@shipcomwireless.com",
    UpdatedOn: "2022-05-09 04:37:43",
    WorkOrderNo: "WORK-199",
  },
  {
    AdminNo: "WAH0C0-",
    CauseCode: "099",
    Coding: "777",
    CreatedBy: "DEVUSER1@shipcomwireless.com",
    CreatedOn: "05/09/2022 03:19:26",
    DocumentNo: "181",
    DefectGroup: "",
    DefectLocation: "",
    Description: "tech statsus",
    EquipmentNo: "000000001011202839",
    Id: "9779c4f5-cac7-40fe-bc11-74b5af9cdaaa",
    ModelNo: "",
    OperStatus: "OperStatus 223",
    Priority: "2",
    PriorityName: "2-Medium",
    ProcessStatus: 2,
    ProcessStatusName: "InProcess",
    Remarks: "tech statsus",
    SerialNo: "109516",
    Status: 1,
    SyncCode: 2,
    SyncText: "Pending",
    TechStatus: "E0001",
    TechStatusIcon: "TICL",
    TechStatusName: "TICL-TI Cleared",
    Type: "M1",
    TypeName: "M1-Maintenance Request",
    UpdatedBy: "DEVUSER1@shipcomwireless.com",
    UpdatedOn: "2022-05-09 04:36:17",
    WorkOrderNo: "WORK-123",
  },
];
export const NotificationsDeviceList = ({
  handleNext,
  handleDeviceSelection,
  ctx,
  data,
  setData,
  query,
  handleEquipmentSearch,
  selectedDevice,
  setQuery
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isCreateNotification, setIsCreateNotification] = useState(false);
  const [data1, setData1] = useState([]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);

  const handleCheckedUser = () => {
    if (Object.keys(selectedDevice).length) {
      setData(
        data.filter((item) => {
          if (item.Id === selectedDevice.id) {
            item.isActive = true;
          }
          return item;
        })
      );
    }
  };

  const getQueryData = async (val) => {
    // alert("Hiii")
    // setIsLoading(true);
    // try {
    //   const res = await ctx.HttpGetList(
    //     `/notification/equipments?search=${val}`
    //   );
    //   if (res) {
    //     setIsLoading(false);
    //     res?.Data.forEach((element) => (element.isActive = false));
    //     setData(res.Data);
    //     handleCheckedUser();
    //   }
    // } catch (err) {
    //   setIsLoading(false);
    // }
    // alert("Hiii")
    setData1(list)
  };
  const debounceFunction = (func) => {
    let timer;
    return function (...args) {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        func(...args);
      }, 900);
    };
  };
  const debounceOptimized = useCallback(debounceFunction(getQueryData), []);
  let debounceTimeout = null;

  // useEffect(() => {
  // handleEquipmentSearch(query)
  // if (query) {
  //   if (debounceTimeout) {
  //     clearTimeout(debounceTimeout);
  //   }

  //   debounceTimeout = setTimeout(() => {
  //     getQueryData(query);
  //   }, 500);
  // }
  // }, [query]);

  const columns = [
    {
      title: "  ",
      dataIndex: "",
      key: "Id",
      type: DataTypes.CUSTOM,
      width: "2vw",
      render: (text, record) => {
        const handleCheckBox = (e, id) => {
          handleDeviceSelection(record);
          let tempData = data1.filter((item) => {
            if (item.Id === id) {
              item.isActive = true;
            } else {
              item.isActive = false;
            }
            return item;
          });

          setData1(tempData);
        };
        return (
          <div>
            <Radio
              className="radiobox"
              checked={record.isActive}
              onChange={(e) => handleCheckBox(e.target.checked, record.Id)}
            />
          </div>
        );
      },
    },

    {
      title: "Admin No",
      dataIndex: "AdminNo",
      key: "AdminNo",
      type: DataTypes.CUSTOM,
      width: "9vw",
    },
    {
      title: "Equipment",
      dataIndex: "EquipmentNo",
      key: "EquipmentNo",
      type: DataTypes.CUSTOM,
      width: "5vw",
      render: (text, record) => {
        return `${stripLeadingZeros(record.EquipmentNo)}`;
      },
    },
    {
      title: "Model No",
      dataIndex: "ModelNo",
      key: "ModelNo",
      type: DataTypes.CUSTOM,
      width: "6vw",
    },

    {
      title: "Serial No",
      dataIndex: "SerialNo",
      key: "SerialNo",
      type: DataTypes.CUSTOM,
      width: "5vw",
    },

    {
      title: "Oper Status",
      dataIndex: "OperStatus",
      key: "OperStatusName",
      type: DataTypes.CUSTOM,
      width: "8vw",
      sorter: true,
      render: (text, record) => {
        return (
          <div className="flex">
            {record.OperStatus ? (
              <Tooltip placement="topLeft" title={record.OperStatusName}>
                <img
                  src={`/images/icons/api-notifications-icon-${record.OperStatusIcon}.svg`}
                  className="w-1/6 mr-2"
                  alt={record.OperStatusIcon}
                />
              </Tooltip>
            ) : (
              "-"
            )}
            <span>{record.OperStatusIcon}</span>
          </div>
        );
      },
    },
    {
      title: "Tech Status",
      dataIndex: "TechStatusName",
      key: "TechStatusName",
      type: DataTypes.CUSTOM,
      width: "7vw",
    },
    {
      title: "Description",
      dataIndex: "Description",
      key: "Description",
      type: DataTypes.CUSTOM,
      width: "6vw",
    },
  ];

  let actionButtonItems = [
    <span>
      <EditTwoTone /> Edit
    </span>,
    <span>
      <WarningTwoTone /> Delete
    </span>,
  ];

  const onNext = () => {
    handleNext();
  };

  const LoaderUi = () => {
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    return (
      <div className="h-full flex justify-center items-center">
        <Spin indicator={antIcon} />
      </div>
    );
  };

  return (
    <>
      <div
        style={{ background: "#F3F5F8" }}
        className="content  flex-grow pt-10"
      >
        <div className="container px-7">
          <Row className="">
            <Col span={24}>
              <Row>
                <Col span={6}>
                  <div className="notification-form-left">
                    <div className="form-item">
                      <div className="my-5">
                        <div className="flex flex-col custom-search">
                           <Input
                            // value={query}
                            type="search"
                            placeholder="Search by Admin No. Serial No. or Description"
                            style={{
                                borderRadius: "20px",
                                height: "40px",
                                boxShadow: "0 1px 10px #00000012",
                              }}
                              className="text-h1 font-poppins border-0 hover:border-white"
                            onChange={(val) => {
                              if (!val) {
                                setData1([]);
                                setQuery(null);
                              } else {
                                setQuery(val.target.value);
                                getQueryData(val); 
                              }
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>

          {isLoading && ""}

          {data1.length > 0 && !isLoading && (
            <DataTable
              // className="bg-transparent deviceListTable "
              columns={columns}
              dataSource={data1}
              showActionButton={false}
              onActionButtonClick={(record) => console.log(record)}
              actionButtonItemClick={(clickedItem) =>
                setIsCreateNotification(true)
              }
              pagination={false}
            />
          )}
        </div>
      </div>

      <Row
        className={`footer drawer-header sticky bottom-0 z-10 bg-white  py-2 justify-center items-end`}
      >
        <Button
          className="bg-blue-text text-white p-5 flex items-center rounded-lg px-7 "
          // className="bg-blue-text border-0 text-white text-center "
          onClick={() => onNext()}
          disabled={!data1.filter((item) => item.isActive).length}
        >
          Next
        </Button>
      </Row>
    </>
  );
};

import React, { useEffect, useState, useCallback } from "react";
import { Button, Card, Col, Radio, Row, Spin, Tooltip, Table , Input} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import {
  EditTwoTone,
  LoadingOutlined,
  WarningTwoTone,
} from "@ant-design/icons";

export const DispatchEquipment = ({
  handleNext,
  handleDeviceSelection,
  ctx,
  data,
  setData,
  query,
  handleEquipmentSearch,
  selectedDevice,
  setQuery,
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isCreateNotification, setIsCreateNotification] = useState(false);

    const initialValues = {
      Id: '',
      adminNo: '',
      statusStrctDes : '',
      equipmentNo: '',
      modelNo: '',
      serialNo: '',
      operStatus: '',
      techStatus: '',
      description: '',
      
    };

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

const columns1 = [
    {
      title: "  ",
      dataIndex: "",
      key: "Id",
      // type: DataTypes.CUSTOM,
      width: "2vw",
      render: (text, record) => {
        // const handleCheckBox = (e, id) => {
        //   handleDeviceSelection(record);
        //   let tempData = data.filter((item) => {
        //     if (item.Id === id) {
        //       item.isActive = true;
        //     } else {
        //       item.isActive = false;
        //     }
        //     return item;
        //   });

        //   setData(tempData);
        // };
        return (
          <div>
            <Radio
              className="radiobox"
              // checked={record.isActive}
              // onChange={(e) => handleCheckBox(e.target.checked, record.Id)}
            />
          </div>
        );
      },
    },
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
  ];
    
  const columns = [
    {
        title: "  ",
        dataIndex: "Id",
        key: "Id", 
        width: "2vw",
        render: (text, record) => {
          const handleCheckBox = (e, id) => {
            handleDeviceSelection(record);
            let tempData = datas.filter((item) => {
              if (item.Id === id) {
                item.isActive = true;
                console.log("inside handle checkbox tempdata ", item)
              } else {
                item.isActive = false;
              }
              return item;
            });
            console.log("inside handle checkbox", record)
            setData(tempData);
          };
          return (
            <div>
              <Radio
                type="checkbox"
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
      dataIndex: "adminNo",
      key: "adminNo",
      width: "8vw",
    },
    {
      title: "STATUS STRCT DES.",
      dataIndex: "statusStrctDesc",
      key: "statusStrctDesc",
      width: "9vw",
      sorter: true,
      render: (text, record) => {
        return (
          <>
            {record.statusStrctDesc ? (
              <div
                className={`text-center rounded-full border text-xs px-1 w-32 ${
                  record.statusStrctDesc === "Available"
                    ? "text-dash-green-dark border-dash-green-dark"
                    : ""
                }`}
              >
                {record.statusStrctDesc}
              </div>
            ) : (
              <div>-</div>
            )}
          </>
        );
      },
    },
    {
      title: "Equipment",
      dataIndex: "equipmentNo",
      key: "equipmentNo",
      width: "5vw",
    },
    {
      title: "Model No",
      dataIndex: "modelNo",
      key: "modelNo",
      width: "6vw",
    },
    {
      title: "Serial No",
      dataIndex: "serialNo",
      key: "serialNo",
      width: "5vw",
      sorter: true,
    },
    {
      title: "OPER STATUS",
      dataIndex: "operStatus",
      key: "operStatus",
      width: "6vw",
      sorter: true,
    },
    {
      title: "TECH STATUS",
      dataIndex: "techStatus",
      key: "techStatus",
      width: "6vw",
      sorter: true,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: "6vw",
    },
  ];

  const datas = [
    {
      Id: '00100',
      adminNo: 'AG100',
      statusStrctDesc : 'Not Dispatchable',
      equipmentNo: '120',
      modelNo: '180',
      serialNo: '150',
      operStatus: '170',
      techStatus: '145',
      description: 'staus updated',
    },
    {
      Id: '00170',
      adminNo: 'AG170',
      statusStrctDesc : 'Not Dispatchable',
      equipmentNo: '140',
      modelNo: '180',
      serialNo: '183',
      operStatus: '180',
      techStatus: '216',
      description: 'staus changed',
    },
    {
      Id: '00156',
      adminNo: 'AG156',
      statusStrctDesc : 'Available',
      equipmentNo: '315',
      modelNo: '333',
      serialNo: '350',
      operStatus: '270',
      techStatus: '045',
      description: 'staus updated',
    },
    {
      Id: '00200',
      adminNo: 'AG200',
      statusStrctDesc : 'Available',
      equipmentNo: '020',
      modelNo: '873',
      serialNo: '360',
      operStatus: '370',
      techStatus: '845',
      description: 'staus updated',
    },
    {
      Id: '0028900',
      adminNo: 'AG289',
      statusStrctDesc : 'Available',
      equipmentNo: '920',
      modelNo: '980',
      serialNo: '950',
      operStatus: '970',
      techStatus: '195',
      description: 'staus updated',
    },
    {
      Id: '00260',
      adminNo: 'AG260',
      statusStrctDesc : 'Available',
      equipmentNo: '620',
      modelNo: '680',
      serialNo: '050',
      operStatus: '123',
      techStatus: '177',
      description: 'staus updated',
    },
  ]
  const [searchList, setSearchList] = useState(mockData)
  const [filterSearch, setFilterSearch] = useState(mockData)

  const LoaderUi = () => {
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    return (
      <div className="h-full flex justify-center items-center">
        <Spin indicator={antIcon} />
      </div>
    );
  };
  const onNext = () => {
    handleNext();
  };
  
  const handleChange = (val)=>{
    console.log("inside handle ",val)
  }
  const handleCheckedUser = () => {
    if (Object.keys(selectedDevice).length) {
      setData(
        datas.filter((item) => {
          if (item.Id === selectedDevice.Id) {
            item.isActive = true;
          }
          return item;
        })
      );
    }
  };
  const getQueryData = async (val) => {
    setIsLoading(true);
    let result = []
    let value = val.target.value 
    let searchQuery = value.toLowerCase()
    result = searchList.filter((item)=>{
      return (
        item.DodDocNo.toString().toLowerCase().indexOf(searchQuery) >= 0
      )
    })
    if(result.length !== 0){
      setIsLoading(false);
      setFilterSearch(result)
      handleCheckedUser();
      console.log("inside getquerry printing result ",result)
    }
   
    
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
  console.log("printing data here ",!datas.filter((item) => item.isActive).length)
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
                                setData([]);
                                setQuery(null);
                              } else {
                                setQuery(val.target.value);
                                debounceOptimized(val); 
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
          <Table columns={columns1} dataSource={filterSearch} />
        </div>
      </div>
      <div
          style={{ background: "#F3F5F8" }}
          className="flex-grow flex flex-col"
        >
          <Row
        className={`footer notification-footer drawer-header sticky bottom-0 z-10 bg-white py-2 justify-center items-end`}
        >
        <Button
          className="bg-blue-text text-white p-5 flex items-center rounded-lg px-7 "
          // className="bg-blue-text border-0 text-white text-center "
          onClick={() => onNext()}
          disabled={datas.filter((item) => item.isActive).length}
        >
          Next
        </Button>
      </Row>
        </div>                     
      
    </>
  );
};
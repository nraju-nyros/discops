import { Wizard } from "../components/Wizard";
import React, { useState } from "react";
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
  Radio,
} from "antd";

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

export const DispatchCreate = () => {
  const [current, setCurrent] = useState(0);
  const [purchasingList, setPurchasingList] = useState(mockData);
  const [filterPurchasingList, setFilterPurchasingList] = useState(mockData);
  const [searchData, setSearchData] = useState(false);

  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };

  const handleSearch = () => {
    setSearchData(true);
  };

  const columns = [
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

  const steps = [
    {
      title: "Select Equipment",

      content: (
        // <DispatchDeviceList
        //   current={current}
        //   handleNext={next}
        //   data={data}
        //   setData={setData}
        //   ctx={ctx}
        //   selectedDevice={selectedDevice}
        //   handleDeviceSelection={(value) => setSelectedDevice(value)}
        //   query={query}
        //   handleEquipmentSearch={(val) => setQuery(val)}
        //   setQuery={setQuery}
        //   isWarningModal={isWarningModal}
        //   setIsWarningModal={setIsWarningModal}
        // />
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
                              {/* <SearchBox
                            value={query}
                            placeholder="Search by Admin No. Serial No. or Description"
                            onChange={(val) => {
                              if (!val) {
                                setData([]);
                                setQuery(null);
                              } else {
                                debounceOptimized(val);
                                handleEquipmentSearch(val);
                              }
                            }}
                          />*/}

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
                            </div>
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>

              {/* {isLoading && ""}

          {data.length > 0 && !isLoading && (
            <DataTable
              // className="bg-transparent deviceListTable "
              columns={columns}
              dataSource={data}
              showActionButton={false}
              onActionButtonClick={(record) => console.log(record)}
              actionButtonItemClick={(clickedItem) =>
                setIsCreateNotification(true)
              }
              pagination={true}
            />
          )}*/}

              {searchData && (
                <Table
                  pagination={{ pageSizeOptions: ["2", "4"] }}
                  columns={columns}
                  dataSource={filterPurchasingList}
                  // onChange={onChange}
                />
              )}

              {/*{searchData === true?(
           <Table
            pagination={{ pageSizeOptions: ["2", "4"], showSizeChanger: true }}
            columns={columns}
            dataSource={filterPurchasingList}
            // onChange={onChange}
          />
          )}*/}
            </div>
          </div>

          <Row
            className={`footer drawer-header sticky bottom-0 z-10 bg-white  py-2 justify-center items-end`}
          >
            <Button
              className="bg-blue-text text-white p-5 flex items-center rounded-lg px-7 "
              // className="bg-blue-text border-0 text-white text-center "
              onClick={() => next()}
              // disabled={!data.filter((item) => item.isActive).length}
            >
              Next
            </Button>
          </Row>
        </>
      ),
    },
    {
      title: "Create Dispatch Notification",

      content: (
        // <DispatchNotification
        //   current={current}
        //   value={selectedDevice}
        //   selectedDevice={selectedDevice}
        //   handlePrev={prev}
        //   handleNext={next}
        //   formik={formik}
        //   handleClose={props.onClose}
        //   setIsSuccessModalVisible={setIsSuccessModalVisible}
        //   isSuccessModalVisible={isSuccessModalVisible}
        //   setIsConfirmModalVisible={setIsConfirmModalVisible}
        //   notificationPayload={notificationPayload}
        //   setNotificationPayload={setNotificationPayload}
        //   isConfirmModalVisible={isConfirmModalVisible}
        //   setIsModalVisible={setIsModalVisible}
        // />
        <>
          <div current={current}>Create Dispatch Notification Form</div>
          <Row
            className={`footer drawer-header sticky bottom-0 z-10 bg-white  py-2 justify-center items-end`}
          >
            <Button
              className="p-5 flex items-center  border-regent-gray rounded-lg mr-28 botton_text_gray"
              type="link"
              // onClick={handleClose}
              onClick={() => prev()}
            >
              Previous
            </Button>
            <Button
              className="bg-blue-text text-white p-5 flex items-center rounded-lg px-7 "
              // className="bg-blue-text border-0 text-white text-center "
              onClick={() => next()}
              // disabled={!data.filter((item) => item.isActive).length}
            >
              Next
            </Button>
          </Row>
        </>
      ),
    },
    {
      title: "Add Operator",
      content: (
        // <AddOperator
        //   current={current}
        //   value={selectedDevice}
        //   selectedDevice={selectedDevice}
        //   handlePrev={prev}
        //   formik={formik}
        //   handleClose={props.onClose}
        //   setIsSuccessModalVisible={setIsSuccessModalVisible}
        //   isSuccessModalVisible={isSuccessModalVisible}
        //   setIsConfirmModalVisible={setIsConfirmModalVisible}
        //   notificationPayload={notificationPayload}
        //   setNotificationPayload={setNotificationPayload}
        //   isConfirmModalVisible={isConfirmModalVisible}
        //   setIsModalVisible={setIsModalVisible}
        //   operatorList={operatorList}
        // />
        <>
          <div current={current}>Add Operator</div>
          <Row
            className={`footer drawer-header sticky bottom-0 z-10 bg-white  py-2 justify-center items-end`}
          >
            <Button
              className="p-5 flex items-center  border-regent-gray rounded-lg mr-28 botton_text_gray"
              type="link"
              // onClick={handleClose}
              onClick={() => prev()}
            >
              Previous
            </Button>
            <Button
              className="bg-blue-text text-white p-5 flex items-center rounded-lg px-7 "
              // className="bg-blue-text border-0 text-white text-center "
              onClick={() => next()}
              // disabled={!data.filter((item) => item.isActive).length}
            >
              Next
            </Button>
          </Row>
        </>
      ),
    },
  ];

  return (
    <>
      <Wizard
        steps={steps}
        current={current}
        className="step-width"
        classes="wizard-header"
      />
    </>
  );
};

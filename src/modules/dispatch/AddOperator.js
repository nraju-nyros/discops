import React, { useContext, useState } from "react";
import {
  Button,
  Card,
  Col,
  Row,
  Modal,
  Radio,
  Collapse,
  Tooltip,
  Table,
} from "antd";
import { AppContext } from "../components/Context/AppContext";
import { useNavigate } from "react-router-dom";
import { Form, FormikProvider, useFormik } from "formik";
import { CustomInput } from "../components/Customs/CustomInput";
import { CustomSwitchToggle } from "../components/Customs/CustomSwitchToggle";
import { CheckOutlined } from "@ant-design/icons";
import { SelectDropdown } from "../components/Customs/SelectDropdown";
import { AddOperatorForm } from "./AddOperatorForm";
import { AddExternalOperatorForm } from "./AddExternalOperatorForm";
// import { DataTable, DataTypes } from "./DataTable";
// import { SearchBox } from "../SearchBox";
import moment from "moment";
import * as Yup from "yup";

// const AddOperator = ({
  export const AddOperator = ({

  current,
  handlePrev,
  handleClose,
  setIsConfirmModalVisible,
  notificationPayload,
  setNotificationPayload,
  isConfirmModalVisible,
  operatorList,
}) => {
  const ctx = useContext(AppContext);
  let history = useNavigate();
  const [operationPayload, setOperationPayload] = useState(null);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAlternativeOperator, setIsAlternativeOperator] = useState();
  const [radioValue, setRadioValue] = useState(1);
  //const [current, setCurrent] = useState(0);
  const [dataList, setDataList] = useState([]);
  const [operatorDetails, setOperatorDetails] = useState({
    operator: null,
    name: null,
    operatorType: null,
    operatorTypeName: null,
  });
  const [externalOperatorDetails, setExternalOperatorDetails] = useState({
    firstname: "",
    lastname: "",
  });

  // const initialValues = {
  //   name: "",
  //   qualified: "",
  //   permitValidated: "",
  //   external: "", 
  // };
  const initialValues = {
    id: "",
    modelName: "",
    modelData: "",
    orgCode: "",
    parentId: "",
    documentNo: "",
    activity: "",
    workNumber: "",
    workUnit: "H",
    numberOfPeople: "",
    workCenter: history.location?.WorkCenter,
    description: "",
    plant: "",
    action: "",
    notification: "",
    projectedWorkHours: "",
    createdBy: "",
    createdOn: "",
  };

  const validationSchema = Yup.object().shape({
    description: Yup.string()
      .required("Description is required")
      .max(40, "Only 40 characters are allowed"),
    workCenter: Yup.string().nullable().required("Work center is required"),
    numberOfPeople: Yup.number()
      .transform((value) => (isNaN(value) ? undefined : value))
      .required("Number of People is only number required"),
    projectedWorkHours: Yup.number()
      .transform((value) => (isNaN(value) ? undefined : value))
      .required("Projected work hours is number required"),
  });

  const onSubmit = (val) => {
    console.log(val);
    console.log(notificationPayload);
    // setOperationPayload(val);
    // setIsConfirmModalVisible(true);
  };
  const operatorColumns = [
    {
      title: "Operator",
      dataIndex: "name",
      key: "name",
      // type: DataTypes.CUSTOM,
    },
    {
      title: "Qualified",
      dataIndex: "qualified",
      key: "qualified",
      // type: DataTypes.CUSTOM,
    },
    {
      title: "Permit Validated",
      dataIndex: "permitValidated",
      key: "permitValidated",
      // type: DataTypes.CUSTOM,
    },
    {
      title: "External",
      dataIndex: "external",
      key: "external",
      // type: DataTypes.CUSTOM,
    },
    {
      title: "ACTIONS",
      dataIndex: "",
      key: "",
      // type: DataTypes.CUSTOM,
      render: (text, record) => {
        return (
          <div className="md:flex items-center">
            <Tooltip title={"Close"}>
              <a onClick={() => actionModel("Delete", record)}>
                <img
                  className="m-auto w-5"
                  src={`/images/icons/close_list.svg`}
                />
              </a>
            </Tooltip>
          </div>
        );
      },
    },
  ];
  const noDataFound = () => {
    return (
      <>
        <div className="m-10 text-center">
          <h6 className="m-10 text-center leading-normal mb-4">
            No Operators Added
          </h6>
        </div>
      </>
    );
  };
  const actionModel = (clickedItem, record) => {
    removeItemFromList(record);
  };
  const handleTab = (e) => {
    setRadioValue(e.target.value);
  };
  const operatorValues = (value) => {
    setDataList((dataList) => [...dataList, value]);
  };
  const externalOperatorValues = (value) => {
    let permitValue;
    if (value.permitValidated === 1) {
      permitValue = "Yes";
    } else {
      permitValue = "No";
    }
    const ext_operator = value.firstname + " " + value.lastname;
    const operator_sample_list = {
      external: "Yes",
      qualified: "NA",
      operator: ext_operator,
      name: ext_operator,
      operatorType: "",
      operatorTypeName: "",
      permitValidated: permitValue,
    };
    setDataList((dataList) => [...dataList, operator_sample_list]);
  };

  const removeItemFromList = (formValue) => {
    if (formValue.operator) {
      const formID = formValue.operator;
      const oldItems = dataList;
      const newItems = oldItems.filter((id) => id.operator != formID);
      setDataList(newItems);
    } else {
      return false;
    }
  };

   const addPurchase = () => {

                    fetch('https://62a19ef0cd2e8da9b0f56b79.mockapi.io/api/v6/dispatch', {
                      method: 'POST',
                      headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({
  "DodDocNo": 10010213,
  "PurchaseType": "Pending",
  "SLoc": "Boston",
  "FederalSupply": "WAH0C0",
  "Material": "Yes",
  "Quantity": 9,
  "Description": "Replacement",
  "CategoryOfIncompleteness": 14,
  "ReleaseStrategy": "Release1",
  "ReleaseStatus": "Approved",
  "Priority": "Priority11",
  "MilstripStatus": "MilstripStatus111",
  "Value": "111",
  "DeliveryDate": "12-04-2022"
 })
                    }).then(res => res.json())
                      .then(res => console.log(res));
                      alert("Data insert success")
  }

  let handleSubmit = (event) => {
    event.preventDefault();
    setNotificationPayload({
      ...notificationPayload,
      ...{ Operators: dataList },
    });
    setIsConfirmModalVisible(true);
  };
  const handlePostOperation = async () => {
    setIsLoading(true);
    try {
      // const response = await ctx.HttpPost("/Dispatch", notificationPayload);
      const response = true
      if (response) {
        setIsLoading(false);
        setOperationPayload(response);
        setIsConfirmModalVisible();
        setIsSuccessModalVisible(true);
        setIsAlternativeOperator(true);
        handleClose();
      } else {
        setIsLoading(false);
        setIsConfirmModalVisible(false);
        setIsAlternativeOperator(false);
        setOperationPayload(null);
      }
    } catch (err) {}
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit,
  });
  const { touched, errors, values, setFieldValue } = formik;
  return (
    <>
      <FormikProvider value={formik}>
        <Form
          autoComplete="off"
          noValidate
          onSubmit={handleSubmit}
          className="flex-grow flex flex-col"
        >
          <div className="flex flex-col">
            <Row>
              <Col span={8}>
                <Card style={{ background: "#fafafa" }}>
                  <div className="pb-10">
                    <Row className="horizontal-center">
                      <br />
                      <Col span={24}>
                        <div class="search-by-card">
                          <div className="notification-form-left">
                            <div className="form-item">
                              <div className="my-5">
                                <Radio.Group
                                  onChange={(e) => {
                                    handleTab(e);
                                  }}
                                  size="large"
                                  className="flex"
                                  value={radioValue}
                                >
                                  <Radio
                                    value={1}
                                    className="font-poppins text-pickled-bluewood text-h1 active"
                                  >
                                    Add Operator
                                  </Radio>
                                  <Radio
                                    value={2}
                                    className="font-poppins text-pickled-bluewood text-h1"
                                  >
                                    Add External Operator
                                  </Radio>
                                </Radio.Group>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <br />
                    <Row className="horizontal-center">
                      <Col span={24}>
                        {radioValue === 1 && (
                          <AddOperatorForm
                            ctx={ctx}
                            initialValues={operatorDetails}
                            operatorValues={operatorValues}
                            setOperatorDetails={setOperatorDetails}
                            operatorsList={operatorList}
                          />
                        )}
                        {radioValue === 2 && (
                          <AddExternalOperatorForm
                            ctx={ctx}
                            initialValues={externalOperatorDetails}
                            externalOperatorValues={externalOperatorValues}
                          />
                        )}
                      </Col>
                    </Row>
                    <br />
                  </div>
                </Card>
              </Col>
              <Col span={16}>
                <Card style={{ background: "#fafafa", border: "none" }}>
                  <h1 className="leading-normal mb-4">Operators List</h1>
                  {/* <DataTable
                    rowKey={"name"}
                    noDataFound={noDataFound}
                    columns={operatorColumns}
                    pagination={false}
                    dataSource={dataList}
                  /> */}
                  {dataList.length ? (
                    <Table
                      columns={operatorColumns}
                      dataSource={dataList}
                      rowKey={"name"}
                      noDataFound={noDataFound}
                    />
                  ) : (
                    noDataFound()
                  )}
                </Card>
              </Col>
            </Row>
            <Row
              className={`footer notification-footer drawer-header sticky bottom-0 z-10 bg-white py-2 justify-center items-end`}
            >
              <Button
                className="p-5 flex items-center  border-regent-gray rounded-lg mr-28 botton_text_gray"
                type="link"
                // onClick={handleClose}
                onClick={handlePrev}
              >
                Previous
              </Button>
              <Button
                className="p-5 flex items-center bg-blue-text text-white rounded-lg px-7 ml-28"
                // onClick={() => {
                //   // setOperationPayload(null);
                //   setIsSuccessModalVisible(true);
                // }}
                htmlType="submit"
              >
                Create
              </Button>
            </Row>
          </div>
        </Form>
      </FormikProvider>
      <Modal
        title={null}
        visible={isSuccessModalVisible}
        wrapClassName="rounded confirm-modal-layout notification-custom-modal"
        closeIcon=" "
        centered={true}
        footer={null}
      >
        <div>
          <CheckOutlined
            style={{ color: "rgb(133,212,156)" }}
            className="text-2xl"
          />
          <h6 className="font-bold mt-1"> Dispatch Notification Created </h6>
          <p>
            Dispatch notification has been queued <br /> Successfully
          </p>
          <p>{operationPayload}</p>
        </div>

        <div className="flex justify-end mt-4 ant-modal-footer px-0 border-t-0">
          <Button
            className="mx-4   rounded-lg px-8"
            onClick={() => {
              // setOperationPayload(null);
              setIsSuccessModalVisible(false);
              // history("/");
              addPurchase()
            }}
          >
            Continue
          </Button>
        </div>
      </Modal>

      <Modal
        title={null}
        visible={isConfirmModalVisible}
        wrapClassName="rounded notification-custom-modal"
        closeIcon=" "
        centered={true}
        footer={null}
      >
        <div>
          <h6 className="font-bold mt-1"> Create Dispatch Notification </h6>
        </div>
        <div className="mt-3">
          <p>Are you sure you want to create Dispatch Notification?</p>
        </div>
        <div className="flex justify-end  ant-modal-footer px-0 border-t-0">
          <Button
            className="mx-2 ant-btn-primary rounded-lg"
            onClick={() => {
              setIsConfirmModalVisible(false);
              setOperationPayload(null);
              history("/");
            }}
          >
            Cancel
          </Button>
          <Button className=" ant-btn rounded-lg" onClick={handlePostOperation}>
            {isLoading ? "Loading..." : "Create"}
          </Button>
        </div>
      </Modal>
    </>
  );
};

// export default AddOperator;
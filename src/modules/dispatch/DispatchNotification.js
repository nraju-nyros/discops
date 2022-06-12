import React, { useEffect, useContext, useState } from "react";
import {
  Button,
  Card,
  Col,
  Row,
  Modal,
  DatePicker,
  TimePicker,
  Select,
} from "antd";
import { AppContext } from "../components/Context/AppContext";
import { useHistory } from "react-router-dom";
import { Form, FormikProvider, useFormik } from "formik";
import { CustomTimePicker } from "../components/Customs/CustomTimePicker";
import { CustomTextarea } from "../components/Customs/CustomTextarea";
import { CustomSwitchToggle } from "../components/Customs/CustomSwitchToggle";
import { SelectDropdown } from "../components/Customs/SelectDropdown";
import { CheckOutlined } from "@ant-design/icons";
import moment from "moment";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const { Option } = Select;
export const DispatchNotification = ({
  selectedDevice,
  handlePrev,
  handleNext,
  notificationPayload,
  setNotificationPayload,
}) => {
  console.log(notificationPayload);
  const ctx = useContext(AppContext);
  let history = useNavigate();
  const [autoFocus, setAutoFocus] = React.useState(null);
  const autoFocusSearch = () => {
    setTimeout(() => {
      setAutoFocus(!autoFocus);
    }, 10);
  };
  const [operationPayload, setOperationPayload] = useState(null);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [trainingEventList, setTrainingEventList] = useState([]);
  const [trainingLevelList, setTrainingLevelList] = useState([]);
  //const [current, setCurrent] = useState(0);
  const deadlineOverride = selectedDevice.OperStatusName;
  const initialValues = {
    id: "",
    modelName: selectedDevice?.ModelNo,
    modelData: "",
    orgCode: selectedDevice?.OrgCode,
    parentId: "",
    documentNo: selectedDevice?.DocumentNo,
    activity: "",
    workNumber: "",
    workUnit: "H",
    numberOfPeople: "",
    workCenter: history.location?.WorkCenter,
    description: notificationPayload?.description,
    plant: "",
    action: "",
    notification: "",
    projectedWorkHours: "",
    createdBy: "",
    createdOn: "",
    deadlineOverride: deadlineOverride,
    approvalRequested: deadlineOverride ? true : false,
    trainingEvent: notificationPayload?.trainingEvent || null,
    trainingLevel: notificationPayload?.trainingLevel || null,
    startDate: notificationPayload?.startDate,
    startTime: notificationPayload?.startTime,
    endDate: notificationPayload?.endDate,
    endTime: notificationPayload?.endTime,
  };

  const validationSchema = Yup.object().shape({
    description: Yup.string()
      .required("Description is required")
      .max(40, "Only 40 characters are allowed"),
  });

  const onSubmit = (val) => {
    setNotificationPayload({ ...notificationPayload, ...val });
    setOperationPayload(val);
    setIsConfirmModalVisible(true);
    handleNext();
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit,
  });
  const renderStepBar = (tab) => {
    return (
      <Row>
        <Col sm={12} md={24} className="bg-regent-gray py-3 text-white  px-7 ">
          <p> Create Dispatch Notification</p>
        </Col>
        {/* <Col
            sm={12}
            md={18}
            className={`py-3 ${tab === 1 ? "bg-regent-gray text-white" : "bg-catskill-white"
              }`}
          >
            <p className="ml-10">2. Add Operator</p>
          </Col> */}
      </Row>
    );
  };
  const handleSelectChange = (value) => {
    console.log(`inside select change ${value}`);
  };
  const handleSearchChange = (value) => {
    console.log("inside search change :", value);
  };
  const { touched, errors, handleSubmit, values, setFieldValue } = formik;
  return (
    <FormikProvider value={formik}>
      <Form
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit}
        className="flex-grow flex flex-col"
      >
        <div
          style={{ background: "#F3F5F8" }}
          className="flex-grow flex flex-col"
        >
          <br />

          <div className="content rounded-lg px-40 flex-grow pb-10">
            <Card className=" rounded-2xl">
              <div className="px-8 pb-10">
                <Row>
                  <Col span={24}>
                    <div className="mt-4 textareaLayoutFix">
                      <CustomTextarea
                        inputValue={values.description}
                        rows={2}
                        label={"Description"}
                        Placeholder="Enter description"
                        requiredField={true}
                        onChange={(val) => setFieldValue("description", val)}
                        error={
                          touched.description &&
                          errors.description &&
                          errors.description
                        }
                      />
                    </div>
                  </Col>
                </Row>

                <br />
                <Row gutter={50}>
                  <Col span={7}>
                    <h6 class="font-poppins z-10 text-h1 font-semibold leading-normal text-pickled-bluewood pb-2">
                      Start Date
                    </h6>

                    <div className="notification-form-right rounded">
                      <DatePicker
                        className={`ant-select-selector 
                              custom-placeholder alert-filter-open-time-dropdown 
                              rounded-lg font-poppins text-xs font-medium 
                              leading-normal text-daisy-bush w-full dateRangeBox`}
                        style={{
                          height: "40px",
                          width: "100%",
                          background: "#E9E9F8",
                        }}
                        placeholder="Select Start Date"
                        allowClear={false}
                        bordered={true}
                        floatingLabel={false}
                        value={values.startDate ? moment(values.startDate) : ""}
                        onChange={(_date) => {
                          setFieldValue(
                            "startDate",
                            moment(_date._d).format("L")
                          );
                        }}
                      />
                    </div>
                  </Col>
                  <Col span={5}>
                    <CustomTimePicker
                      label="Start Time"
                      placeholder="Select Start Time"
                      format="HH:mm"
                      value={
                        values.startTime
                          ? moment(values.startTime, "HH:mm")
                          : ""
                      }
                      onChange={(time, val) => setFieldValue("startTime", val)}
                    />
                    
                  </Col>
                  <Col span={7}>
                    <h6 class="font-poppins z-10 text-h1 font-semibold leading-normal text-pickled-bluewood pb-2">
                      End Date
                    </h6>

                    <div className="notification-form-right rounded">
                      <DatePicker
                        className={`ant-select-selector 
                              custom-placeholder alert-filter-open-time-dropdown 
                              rounded-lg font-poppins text-xs font-medium 
                              leading-normal text-daisy-bush w-full dateRangeBox`}
                        style={{
                          height: "40px",
                          width: "100%",
                          background: "#E9E9F8",
                        }}
                        placeholder="Select End Date"
                        allowClear={false}
                        bordered={true}
                        floatingLabel={false}
                        value={values.endDate ? moment(values.endDate) : ""}
                        onChange={(_date) => {
                          setFieldValue(
                            "endDate",
                            moment(_date._d).format("L")
                          );
                        }}
                      />
                    </div>
                  </Col>
                  <Col span={5}>
                    <CustomTimePicker
                      label="End Time"
                      placeholder="Select End Time"
                      format="HH:mm"
                      value={
                        values.endTime ? moment(values.endTime, "HH:mm") : ""
                      }
                      onChange={(time, val) => setFieldValue("endTime", val)}
                    />
                  </Col>
                </Row>
                <br />
                <div class="dotted_border"></div>
                <br />

                <Row gutter={50}>
                  <Col span={12}>
                    <div className=" input_text_color ">
                      {/* <SelectDropdown
                          value={values.trainingEvent}
                          //   dataList={values.SystemConditions}
                          optionsList={trainingEventList}
                          mode="single"
                          optionKeyName="Id"
                          optionValueName="Value"
                          className="border dropdown_blue_text  border-white-lilac colorFix"
                          optionDisplayName="Value"
                          onChange={(val, key) => {
                            setFieldValue("trainingEvent", val);
                          }}
                          label="Training Event"
                          placeholder=""
                          error={
                            touched.systemconditions &&
                            errors.systemconditions &&
                            errors.systemconditions
                          }
                        /> */}
                      <div
                        className={"font-poppins z-10 text-h1 font-semibold leading-normal text-pickled-bluewood pb-2 "}
                      >
                        <label> Training Event </label>
                      </div>
                      <div className="w-48">
                        <Select
                          onClick={autoFocusSearch}
                          size="large"
                          placeholder="Select an event"
                          onChange={handleSelectChange}
                          // onSearch={handleSearchChange}
                          showSearch = {handleSearchChange}
                          className="border dropdown_blue_text  border-white-lilac colorFix md:flex w-96 "
                          mode="single"
                          filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                        >
                          <Option value="event 1">event 1</Option>
                          <Option value="event 2">event 2</Option>
                          <Option value="event 3">event 3</Option>
                          <Option value="event 4">event 4</Option>
                          <Option value="event 5">event 5</Option>
                          <Option value="event 6">event 6</Option>
                        </Select>
                      </div>
                    </div>
                  </Col>
                  <Col span={12}>
                    <div className="mt-0 input_text_color ">
                      {/* <SelectDropdown
                        value={values.trainingLevel}
                        //   dataList={values.SystemConditions}
                        optionsList={trainingLevelList}
                        mode="single"
                        optionKeyName="Id"
                        optionValueName="Value"
                        className="border dropdown_blue_text  border-white-lilac colorFix"
                        optionDisplayName="Value"
                        onChange={(val, key) => {
                          setFieldValue("trainingLevel", val);
                        }}
                        label="Training Level"
                        Placeholder=""
                        error={
                          touched.systemconditions &&
                          errors.systemconditions &&
                          errors.systemconditions
                        }
                      /> */}

<div
                        className={"font-poppins z-10 text-h1 font-semibold leading-normal text-pickled-bluewood pb-2 "}
                      >
                        <label> Training Level </label>
                      </div>
                      <div className="w-48">
                        <Select
                          onClick={autoFocusSearch}
                          size="large"
                          placeholder="Select an level"
                          onChange={handleSelectChange}
                          // onSearch={handleSearchChange}
                          showSearch = {handleSearchChange}
                          className="border dropdown_blue_text  border-white-lilac colorFix w-96 "
                          mode="single"
                          filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                        >
                          <Option value="level 1">level 1</Option>
                          <Option value="level 2">level 2</Option>
                          <Option value="level 3">level 3</Option>
                          <Option value="level 4">level 4</Option>
                          <Option value="level 5">level 5</Option>
                          <Option value="level 6">level 6</Option>
                        </Select>
                      </div>

                    </div>
                  </Col>
                </Row>

                <Row gutter={50}>
                  <Col span={6}>
                    <div className="mt-4 mb1 input_text_color">
                      <h6 class="font-poppins z-10 text-h1 font-semibold leading-normal text-pickled-bluewood pb-2">
                        Extended Dispatch
                      </h6>
                      <CustomSwitchToggle
                        className="flex-row-reverse mt-2"
                        switchValue={values.releasedFlag1}
                        onText="Yes"
                        offText="No"
                        onChange={(val) =>
                          setFieldValue("releasedFlag1", val ? 1 : 0)
                        }
                      />
                    </div>
                  </Col>
                  <Col span={12}>
                    <div className="mt-4 mb1   input_text_color ">
                      <h6 class="font-poppins z-10 text-h1 font-semibold leading-normal text-pickled-bluewood pb-2">
                        Off Post Dispatch
                      </h6>
                      <CustomSwitchToggle
                        className="flex-row-reverse mt-2"
                        switchValue={values.inProcess}
                        onText="Yes"
                        offText="No"
                        onChange={(val) =>
                          setFieldValue("inProcess", val ? 1 : 0)
                        }
                      />
                    </div>
                  </Col>
                </Row>

                <Row gutter={50}>
                  <Col span={6}>
                    <div className="mt-4 mb1 input_text_color">
                      <h6 class="font-poppins z-10 text-h1 font-semibold leading-normal text-pickled-bluewood pb-2">
                        Approval Requested
                      </h6>
                      <CustomSwitchToggle
                        className="flex-row-reverse mt-2"
                        isDisabled={values.deadlineOverride}
                        switchValue={values.approvalRequested}
                        onText="Yes"
                        offText="No"
                        onChange={(val) =>
                          setFieldValue("approvalRequested", val ? 1 : 0)
                        }
                      />
                    </div>
                  </Col>
                  <Col span={6}>
                    <div className="mt-4 mb1 input_text_color">
                      <h6 class="font-poppins z-10 text-h1 font-semibold leading-normal text-pickled-bluewood pb-2">
                        Deadline Override
                      </h6>
                      <CustomSwitchToggle
                        className="flex-row-reverse mt-2"
                        switchValue={values.deadlineOverride}
                        onText="Yes"
                        offText="No"
                        isDisabled={true}
                        onChange={(val) =>
                          setFieldValue("deadlineOverride", val ? 1 : 0)
                        }
                      />
                    </div>
                  </Col>
                </Row>
              </div>
            </Card>
          </div>
          <Row
            className={`footer notification-footer drawer-header sticky bottom-0 z-10 bg-white py-2 justify-center items-end`}
          >
            <Button
              className="p-5 flex items-center  border-regent-gray rounded-lg mr-28 botton_text_gray"
              type="link"
              onClick={handlePrev}
            >
              Previous
            </Button>
            <Button
              className="p-5 flex items-center bg-blue-text text-white rounded-lg px-7 ml-28"
              htmlType="submit"
            >
              Next
            </Button>
          </Row>
        </div>
      </Form>

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
          <h6 className="font-bold mt-1"> Operation added </h6>
          <p>{operationPayload}</p>
        </div>

        <div className="flex justify-end mt-4 ant-modal-footer px-0 border-t-0">
          <Button
            className="mx-4   rounded-lg px-8"
            onClick={() => {
              setOperationPayload(null);
              setIsSuccessModalVisible(false);
              history("/workOrder/details");
            }}
          >
            Okay
          </Button>
        </div>
      </Modal>
    </FormikProvider>
  );
};

export default DispatchNotification;
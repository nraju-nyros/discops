import { CheckOutlined } from "@ant-design/icons";
import { Button, Card, Col, Modal, Row } from "antd";
import { Form, FormikProvider, useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
// import { CustomInput } from "../components/common/CustomInput";
import { CustomInput } from "../components/common/CustomInput";

import { CustomSwitchToggle } from "../components/common/CustomSwitchToggle";
import { CustomTextarea } from "../components/common/CustomTextarea";
import { stripLeadingZeros } from "../components/common/helpers";
import { SelectDropdown } from "../components/common/SelectDropdown";
import { SelectDropdownWithGroup } from "../components/common/SelectDropdownWithGroup";
import { AppContext } from "../components/store/app-context";
import PairedBadge from "../notifications/PairedBadge";
import { useNavigate } from "react-router-dom";


export const NotificationsCreateRequest = ({
  onClose,
  selectedDevice,
  handlePrev,
}) => {
  const ctx = useContext(AppContext);
  // const accessObject = ctx.userInfo.UserAccess;
  const [notificationType, setNotificationType] = useState([]);
  const [priorityTypes, setPriorityTypes] = useState([]);
  const [techStatuses, setTechStatuses] = useState([]);
  const [causeCode, setCauseCode] = useState([]);
  const [activityTypes, setActivityTypes] = useState([]);
  const [activityCodes, setActivityCodes] = useState([]);
  const [activityCode, setActivityCode] = useState("");
  const [activityGroup, setActivityGroup] = useState("");
  const [defectLocations, setDefectLocations] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [notificationPayload, setNotificationPayload] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);

  const [selectedEquipmentSerialNo, setSelectedEquipmenSerialNo] = useState();
  const [subActivityData, setSubActivityData] = useState([]);

  const [selectedActivities, setSelectedActivities] = useState([]);
  const [disable, setDisable] = useState(true);

  // Form DropDown Value calls
  const getNotificationType = async () => {
    // const response = await ctx.HttpGet("/Notification/notificationTypes");
    // if (response) {
    //   let notifList = response.filter((e) => ["M1", "O1", "PM"].indexOf(e.Id) >= 0)
    //   setNotificationType(notifList);
    // }
       const res = [
    { Id: "D1", Value: "Notification_1" },
    { Id: "D2", Value: "Notfication_2" },
    { Id: "D3", Value: "Notification_3" },
        { Id: "D4", Value: "Notification_4" },
    { Id: "D5", Value: "Notification_5" },

  ];
        setNotificationType(res);

  };
  const getDefectLocations = async (search) => {
    const response = await ctx.HttpGet("/notification/defectLocations");
    if (response) {
      setDefectLocations(response);
      setFilteredList(response);
    }
  };

  const getNotificationTechStatuses = async () => {
    const response = await ctx.HttpGet("/notification/techStatuses");
    if (response) {
      setTechStatuses(response);
    }
  };

  const getNotificationPriorityType = async () => {
    const response = await ctx.HttpGet("/notification/priorityTypes");
    if (response) {
      setPriorityTypes(response);
    }
  };

  const getNotificationCauseCodes = async () => {
    const response = await ctx.HttpGet("/notification/causeCodes");
    if (response) {
      setCauseCode(response);
    }
  };
  const getActivityTypes = async () => {
    const response = await ctx.HttpGet("/notification/activityTypes");
    if (response) {
      setActivityTypes(response);
    }
  };
  const getActivityCodes = async () => {
    const response = await ctx.HttpGet("/notification/activityCodes");
    if (response) {
      setActivityCodes(response);
    }
  };

  useEffect(() => {
    document.body.style.overflow = "auto";
    getNotificationType();
    getNotificationTechStatuses();
    getNotificationPriorityType();
    getNotificationCauseCodes();
    getDefectLocations();
    getActivityTypes();
    getActivityCodes();
    return () => {
      setErrors({});
    };
  }, []);

  let history = useNavigate();

  const initialValues = {
    orgCode: selectedDevice?.OrgCode,
    adminNo: selectedDevice?.AdminNo,
    description: "",
    type: null,
    modelNo: selectedDevice?.ModelNo,
    serialNo: selectedDevice?.SerialNo,
    equipmentNo: selectedDevice?.EquipmentNo,
    priority: null,
    operStatus: selectedDevice?.OperStatus,
    techStatus: null,
    defectLocation: "",
    defectGroup: "",
    storageLoc: selectedDevice?.StorageLoc,
    causeCode: null,
    inProcess: 0,
    remarks: "",
    material: selectedDevice?.Material,
    activity: null,
    subActivity: null,
    coding: null,
    //maintenanceObjects: null,
    //aviation: null,
  };

  const validationSchema = Yup.object().shape({
    description: Yup.string()
      .required("Description is required")
      .max(40, "Only 40 characters are allowed"),
    type: Yup.string().nullable().required("Type is required"),
    priority: Yup.string()
      .nullable()
      .when("type", {
        is: (type) =>
          type === "M1" ||
          type === "O1" ||
          type === "PM" ||
          type === "Z1" ||
          type === "O2",
        then: Yup.string().required("Priority is required").nullable(),
        otherwise: null,
      }),
    coding: Yup.string()
      .nullable()
      .when("type", {
        is: (type) => type === "MW" || type == "M1",
        then: Yup.string().required("Coding is required").nullable(),
        otherwise: null,
      }),
    // maintenanceObjects: Yup.string()
    //   .nullable()
    //   .when("type", {
    //     is: (type) => type === "MW",
    //     then: Yup.string().required("Maintenance is required").nullable(),
    //     otherwise: null,
    //   }),
    // aviation: Yup.string()
    //   .nullable()
    //   .when("type", {
    //     is: (type) => type === "MW",
    //     then: Yup.string().required("Aviation is required").nullable(),
    //     otherwise: null,
    //   }),

    activity: Yup.string()
      .nullable()
      .when("type", {
        is: (type) =>
          type === "PM" ||
          type === "O1" ||
          type === "O2" ||
          type === "MW" ||
          type === "Z1",
        then: Yup.string().required("Activity is required").nullable(),
        otherwise: null,
      }),
    subActivity: Yup.string()
      .nullable()
      .when("type", {
        is: (type) =>
          type === "PM" ||
          type === "O1" ||
          type === "O2" ||
          type === "MW" ||
          type === "Z1",
        then: Yup.string().required("SubActivity is required").nullable(),
        otherwise: null,
      }),
  });
  const handleAddActivities = (val) => {
    const { values } = formik;
    setDisable(false);
    setSelectedActivities([
      ...selectedActivities,
      {
        code: activityCode,
        group: activityGroup,
        keyName: values.activity,
        keyValue: values.subActivity,
      },
    ]);
    setSubActivityData([]);
    setActivityGroup("");
    setActivityCode("");
  };

  const handleDelete = (index) => {
    let defaultActivities = [...selectedActivities];

    setSelectedActivities(defaultActivities.filter((item, i) => i !== index));
    if (selectedActivities.length <= 1) {
      setFieldValue("activity", null);
      setFieldValue("subActivity", null);
      setDisable(true);
    }
  };
  const handleActivityChange = (val, key) => {
    let activityTest = activityCodes.filter(
      (item, i) => item.ExtendedValue == key["key"]
    );
    setSubActivityData(activityTest);
    setFieldValue("activity", val);
    setActivityGroup(key["key"]);
  };

  const handleSubActivityChange = (val, key) => {
    setFieldValue("subActivity", val);
    setActivityCode(key["key"]);
  };

  const handlePostNotification = async () => {
    setIsLoading(true);
    let payload = { ...notificationPayload };
    if (
      payload.type === "PM" ||
      payload.type === "O1" ||
      payload.type === "O2" ||
      payload.type === "MW" ||
      payload.type === "Z1"
    ) {
      payload.activityCode = selectedActivities;
    }

    try {
      const response = await ctx.HttpPost("/Notification", payload);
      if (response) {
        setIsLoading(false);
        setNotificationPayload(response.Data);
        // setNewNotificationId(response.Id);
        setIsConfirmModalVisible(false);
        setIsSuccessModalVisible(true);
      } else {
        setIsLoading(false);
        setIsConfirmModalVisible(false);
        setNotificationPayload(null);
      }
    } catch (err) { }
  };

  const onSubmit = (val) => {
    setSelectedEquipmenSerialNo(val.serialNo);
    setNotificationPayload(val);
    setIsConfirmModalVisible(true);
    const field = filteredList.filter(
      (item) => item.Value === val.defectLocation
    );
    val.defectLocation = field[0].Id;
    val.defectGroup = field[0].ExtendedValue;
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit,
  });

  const { touched, errors, handleSubmit, values, setFieldValue, setErrors } =
    formik;

  const DropdownValueWithGroup = () => {
    return <div>sdfsadf</div>;
  };
  useEffect(() => {
    if (values.activity !== null) {
      setFieldValue("subActivity", null);
      setDisable(true);
    }
  }, [values.activity]);
  const onCreateWorkOrderClick = () => {
    history.push({
      pathname: "/workOrder",
      state: {
        equipmentSerialNo: selectedEquipmentSerialNo,
      },
    });
  };

  const tempCodingGroupList = [
    {
      Group: "NONHOW",
      Id: "999",
      Value: "999-Code Not Provided",
    },
    {
      Group: "NONHOW",
      Id: "790",
      Value: "790-Out of Adjustment",
    },
    {
      Group: "NONHOW",
      Id: "777",
      Value: "777-Mid-Service Life",
    },
    {
      Group: "NONHOW",
      Id: "680",
      Value: "680-Unstable",
    },
    {
      Group: "NONHOW",
      Id: "432",
      Value: "432-Off Frequency",
    },
    {
      Group: "NONHOW",
      Id: "387",
      Value: "387-Low Performance",
    },
    {
      Group: "NONHOW",
      Id: "360",
      Value: "360-Intermittent",
    },
    {
      Group: "NONHOW",
      Id: "258",
      Value: "258-Overheating",
    },
    {
      Group: "NONHOW",
      Id: "099",
      Value: "099-Other",
    },
    {
      Group: "NONHOW",
      Id: "077",
      Value: "077-Accident",
    },
    {
      Group: "NONHOW",
      Id: "068",
      Value: "068-Inoperative",
    },
    {
      Group: "NONHOW",
      Id: "008",
      Value: "008-Noisy",
    },
  ];

  return (
    <FormikProvider value={formik}>
      <Form
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit}
        className="flex-grow flex flex-col"
      >
        <div style={{ background: "#F3F5F8" }} className="content  flex-grow">
          <div className="container">
            <div className="content rounded-lg  flex-grow">
              <div className="content rounded-lg  flex-grow mt-10">
                <Card className="rounded-2xl">
                  <div className="px-8 pt-8 py-10">
                    <Row gutter={50}>
                      <Col span={12}>
                        <div className="mt-4 mb1  input_text_color ">
                          <CustomInput
                            inputValue={values.adminNo}
                            disabled={true}
                            label={"Admin No."}
                            onChange={(val) => setFieldValue("adminNo", val)}
                          />
                        </div>
                      </Col>
                      <Col span={12}>
                        <div className="mt-4 mb1   input_text_color ">
                          <CustomInput
                            className="ml-8 "
                            inputValue={values.modelNo}
                            disabled={true}
                            label={"Model No."}
                            onChange={(val) => setFieldValue("modalNo", val)}
                          />
                        </div>
                      </Col>
                    </Row>
                    <Row gutter={50}>
                      <Col span={12}>
                        <div className="mt-4 mb1 input_text_color">
                          <CustomInput
                            inputValue={values.equipmentNo}
                            disabled={true}
                            label={"Equipment No."}
                            onChange={(key, val) => {
                              setFieldValue("equipmentNo", val);
                            }}
                          />
                        </div>
                      </Col>
                      <Col span={12}>
                        <div className="mt-4 mb1 input_text_color">
                          <SelectDropdown
                            dataList={values.type}
                            style={{ background: "#E9E9F8" }}
                            optionsList={notificationType}
                            mode="single"
                            optionKeyName="Id"
                            optionValueName="Value"
                            className="border dropdown_blue_text border-white-lilac colorFix"
                            optionDisplayName="Value"
                            onChange={(val, key) =>
                              setFieldValue("type", key["key"])
                            }
                            label="Notification Type"
                            Placeholder="Notification Type"
                            requiredField={true}
                            error={touched.type && errors.type && errors.type}
                          />
                        </div>
                      </Col>
                      <Col span={12}>
                        <Row>
                          <Col span={6}>
                            <div className="mt-4 progressCenter">
                              <h4 className="font-semibold text-daisy-bush text-h1 ">
                                In Process
                              </h4>
                              <CustomSwitchToggle
                                className="flex-row-reverse mt-2"
                                switchValue={values.inProcess}
                                onText="Active"
                                offText="Inactive"
                                onChange={(val) =>
                                  setFieldValue("inProcess", val ? 1 : 0)
                                }
                              />
                            </div>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </div>
                </Card>
                <Card className="rounded-2xl my-2">
                  {values.type === "M1" ||
                    values.type === "O1" ||
                    values.type === "O2" ||
                    values.type === "Z1" ||
                    values.type === "MW" ||
                    values.type === "PM" ? (
                    <div className="px-8 ">
                      <Row className="mt-4  ">
                        <Col span={24}>
                          <div className="mt-4 mb1  textareaLayoutFix">
                            <CustomTextarea
                              inputValue={values.description}
                              name="description"
                              rows={4}
                              label={"Description"}
                              // className="input_feild_height"
                              Placeholder="Description"
                              requiredField={true}
                              onChange={(val) =>
                                setFieldValue("description", val)
                              }
                              error={
                                touched.description &&
                                errors.description &&
                                errors.description
                              }
                            />
                          </div>
                        </Col>
                      </Row>

                      {formik.values.type === "M1" ? (
                        <Row gutter={50}>
                          <Col span={12} >
                            <SelectDropdown
                              dataList={values.techStatus}
                              mode="single"
                              optionKeyName="Id"
                              value={values.techStatusName}
                              optionValueName="Value"
                              className="border dropdown_blue_text  border-white-lilac colorFix"
                              optionDisplayName="Value"
                              onChange={(val, key) => {
                                setFieldValue("techStatus", key.key);
                                setFieldValue("techStatusName", val);
                              }}
                              optionsList={techStatuses}
                              label="Tech Status"
                              Placeholder="Tech Status"
                              error={
                                values.type === "M1" &&
                                touched.techStatus &&
                                errors.techStatus &&
                                errors.techStatus
                              }
                            />
                          </Col>
                          <Col span={12} style={{ height: "80px" }}>
                            {touched.location && errors.location && (
                              <p
                                className="text-error"
                                style={{ color: "red" }}
                              >
                                {errors.location}
                              </p>
                            )}
                            <SelectDropdownWithGroup
                              dataList={values.defectLocation}
                              optionKeyName="Value"
                              optionValueName="Value"
                              className="border dropdown_blue_text border-white-lilac colorFix"
                              optionDisplayName="Value"
                              mode="single"
                              showSearch={true}
                              optionsList={filteredList}
                              label="Defect Location"
                              groupByKey="ExtendedValue"
                              dropdownGroup={DropdownValueWithGroup}
                              onChange={(val, key) =>
                                setFieldValue("defectLocation", val)
                              }
                              dropDownSearch={false}
                            />
                          </Col>
                          <Col span={12} className="pt-2.5">
                            <SelectDropdown
                              dataList={values.causeCode}
                              value={values.causeCode}
                              optionKeyName="Id"
                              optionValueName="Id"
                              className="border dropdown_blue_text border-white-lilac colorFix"
                              optionsList={causeCode}
                              optionDisplayName="Value"
                              mode="single"
                              onChange={(val, key) =>
                                setFieldValue("causeCode", val)
                              }
                              label="Cause Code"
                            />
                          </Col>
                          <Col span={12} className="pt-2.5" style={{ height: "90px" }}>
                            <SelectDropdown
                              dataList={values.priority}
                              value={values.priority}
                              optionKeyName="Id"
                              optionValueName="Id"
                              className="border dropdown_blue_text border-white-lilac colorFix"
                              optionDisplayName="Value"
                              mode="single"
                              optionsList={priorityTypes}
                              onChange={(val, key) =>
                                setFieldValue("priority", val)
                              }
                              label="Priority"
                              Placeholder="priority"
                              requiredField={true}
                              error={
                                touched.priority &&
                                errors.priority &&
                                errors.priority
                              }
                            />
                          </Col>
                          <Col span={12} className="pt-2.5">
                            <SelectDropdown
                              dataList={values.coding}
                              value={values.tempCodingGroupList}
                              optionKeyName="Id"
                              optionValueName="Id"
                              className="border dropdown_blue_text border-white-lilac colorFix"
                              optionDisplayName="Value"
                              mode="single"
                              optionsList={tempCodingGroupList}
                              onChange={(val, key) => {
                                setFieldValue("coding", val);
                              }}
                              label="Coding"
                              Placeholder="Coding"
                              requiredField={true}
                              error={
                                touched.coding && errors.coding && errors.coding
                              }
                            />
                          </Col>
                        </Row>
                      ) : (
                        " "
                      )}
                      {formik.values.type === "PM" ||
                        formik.values.type === "O1" ||
                        formik.values.type === "O2" ? (
                        <Row gutter={50}>
                          <Col span={12} className="mb-1
                          ">
                            <SelectDropdown
                              dataList={values.priority}
                              optionKeyName="Id"
                              optionValueName="Id"
                              className="border dropdown_blue_text border-white-lilac colorFix"
                              optionDisplayName="Value"
                              mode="single"
                              optionsList={priorityTypes}
                              onChange={(val, key) =>
                                setFieldValue("priority", val)
                              }
                              label="Priority"
                              Placeholder="priority"
                              requiredField={true}
                              error={
                                touched.priority &&
                                errors.priority &&
                                errors.priority
                              }
                            />
                          </Col>
                        </Row>
                      ) : (
                        ""
                      )}
                      {formik.values.type === "Z1" ? (
                        <Row gutter={50}>
                          <Col span={12}>
                            <SelectDropdown
                              dataList={values.priority}
                              optionKeyName="Id"
                              optionValueName="Value"
                              className="border dropdown_blue_text border-white-lilac colorFix"
                              optionDisplayName="Value"
                              mode="single"
                              optionsList={priorityTypes}
                              onChange={(val, key) =>
                                setFieldValue("priority", val)
                              }
                              label="Priority"
                              Placeholder="priority"
                              requiredField={true}
                              error={
                                touched.priority &&
                                errors.priority &&
                                errors.priority
                              }
                            />
                          </Col>
                          <Col span={12} className="dropdown-margin ">
                            {touched.location && errors.location && (
                              <p
                                className="text-error "
                                style={{ color: "red" }}
                              >
                                {errors.location}
                              </p>
                            )}

                            <SelectDropdownWithGroup
                              dataList={values.defectLocation}
                              optionKeyName="Value"
                              optionValueName="Value"
                              className="border dropdown_blue_text border-white-lilac colorFix"
                              optionDisplayName="Value"
                              mode="single"
                              showSearch={true}
                              optionsList={filteredList}
                              label="Defect Location"
                              groupByKey="ExtendedValue"
                              dropdownGroup={DropdownValueWithGroup}
                              onChange={(val, key) =>
                                setFieldValue("defectLocation", key["key"])
                              }
                              dropDownSearch={false}
                            />
                          </Col>
                        </Row>
                      ) : (
                        ""
                      )}
                      {formik.values.type === "MW" ? (
                        <Row gutter={50}>
                          <Col span={12} className="pb-1" >
                            <SelectDropdown
                              value={values.coding}
                              dataList={values.tempCodingGroupList}
                              optionsList={tempCodingGroupList}
                              mode="single"
                              optionKeyName="Id"
                              optionValueName="Id"
                              className="border dropdown_blue_text  border-white-lilac colorFix"
                              optionDisplayName="Value"
                              requiredField={true}
                              onChange={(val, key) => {
                                setFieldValue("coding", val);
                              }}
                              label="Coding"
                              error={
                                touched.coding && errors.coding && errors.coding
                              }
                            />
                          </Col>
                          {/* <Col span={12} className="pb-1">
                            <SelectDropdown
                              value={values.maintenanceObjects}
                              dataList={values.maintenanceObjects}
                              optionsList={techStatuses}
                              mode="single"
                              optionKeyName="Id"
                              optionValueName="Value"
                              className="border dropdown_blue_text  border-white-lilac colorFix"
                              optionDisplayName="Value"
                              requiredField={true}
                              onChange={(val, key) => {
                                setFieldValue("maintenanceObjects", val);
                              }}
                              label="Maintenance Objects"
                              error={
                                touched.maintenanceObjects &&
                                errors.maintenanceObjects &&
                                errors.maintenanceObjects
                              }
                            />
                          </Col>
                          <Col span={12} className="pt-3 pb-1">
                            <SelectDropdown
                              value={values.aviation}
                              dataList={values.aviation}
                              optionsList={techStatuses}
                              mode="single"
                              optionKeyName="Id"
                              optionValueName="Value"
                              className="border dropdown_blue_text  border-white-lilac colorFix"
                              optionDisplayName="Value"
                              requiredField={true}
                              onChange={(val, key) => {
                                setFieldValue("aviation", val);
                              }}
                              label="Aviation"
                              error={
                                touched.aviation &&
                                errors.aviation &&
                                errors.aviation
                              }
                            />
                          </Col> */}
                          <Col span={12} className="dropdown-margin">
                            {touched.location && errors.location && (
                              <p
                                className="text-error"
                                style={{ color: "red" }}
                              >
                                {errors.location}
                              </p>
                            )}

                            <SelectDropdownWithGroup
                              dataList={values.defectLocation}
                              values={values.defectLocation}
                              optionKeyName="Value"
                              optionValueName="Value"
                              className="border dropdown_blue_text border-white-lilac colorFix"
                              optionDisplayName="Value"
                              mode="single"
                              showSearch={true}
                              optionsList={filteredList}
                              label="Defect Location"
                              groupByKey="ExtendedValue"
                              dropdownGroup={DropdownValueWithGroup}
                              onChange={(val, key) =>
                                setFieldValue("defectLocation", val)
                              }
                              dropDownSearch={false}
                            />
                          </Col>
                          <Col span={12} className="pt-3">
                            <SelectDropdown
                              dataList={values.causeCode}
                              value={values.causeCode}
                              optionKeyName="Id"
                              optionValueName="Id"
                              className="border dropdown_blue_text border-white-lilac colorFix"
                              optionsList={causeCode}
                              optionDisplayName="Value"
                              mode="single"
                              onChange={(val, key) =>
                                setFieldValue("causeCode", val)
                              }
                              label="Cause Code"
                            />
                          </Col>
                        </Row>
                      ) : (
                        ""
                      )}
                      <Row className="mt-4 pb-8 ">
                        <Col span={24}>
                          <div className="textareaLayoutFix ">
                            <CustomTextarea
                              rows={4}
                              label="Remarks"
                              inputValue={values.remarks}
                              onChange={(val) => setFieldValue("remarks", val)}
                            />
                          </div>
                        </Col>
                      </Row>
                    </div>
                  ) : (
                    <div className="px-8">
                      <Row className="mt-4 ">
                        <Col span={24}>
                          <div className="mt-4 mb1  textareaLayoutFix ">
                            <CustomTextarea
                              inputValue={values.description}
                              name="description"
                              rows={4}
                              label={"Description"}
                              // className="input_feild_height"
                              Placeholder="Description"
                              requiredField={true}
                              onChange={(val) =>
                                setFieldValue("description", val)
                              }
                              error={
                                touched.description &&
                                errors.description &&
                                errors.description
                              }
                            />
                          </div>
                        </Col>
                      </Row>

                      <Row className=" pb-8">
                        <Col span={24}>
                          <div className="textareaLayoutFix">
                            <CustomTextarea
                              rows={4}
                              label="Remarks"
                              inputValue={values.remarks}
                              onChange={(val) => setFieldValue("remarks", val)}
                            />
                          </div>
                        </Col>
                      </Row>
                    </div>
                  )}

                  {values.type === "O1" ||
                    values.type === "PM" ||
                    values.type === "O2" ||
                    values.type === "MW" ||
                    values.type === "Z1" ? (
                    <div className="dotted_border">
                      <div className="px-8 my-10">
                        <span className="font-poppins z-10 font-semibold leading-normal text-pickled-bluewood ">
                          Add Activities
                        </span>
                        <Row gutter={50} className="mt-5 items-end	mb-10">
                          <Col span={10}>
                            <div className="mt-4 mb1">
                              <SelectDropdown
                                dataList={values.activity}
                                optionKeyName="Id"
                                optionValueName="Value"
                                className="border dropdown_blue_text border-white-lilac colorFix"
                                optionDisplayName="Value"
                                mode="single"
                                value={formik.values.activity}
                                Placeholder="Select Activity"
                                optionsList={activityTypes}
                                requiredField={true}
                                onChange={(val, key) =>
                                  handleActivityChange(val, key)
                                }
                                label="Select Activity"
                                error={
                                  touched.activity &&
                                  errors.activity &&
                                  errors.activity
                                }
                              />
                            </div>
                          </Col>
                          {subActivityData.length > 0 && (
                            <>
                              <Col span={10} style={{ height: "90px" }}>
                                <div className="mt-4 mb1" >
                                  <SelectDropdown
                                    dataList={values.subActivity}
                                    optionKeyName="Id"
                                    optionValueName="Value"
                                    className="border dropdown_blue_text border-white-lilac colorFix"
                                    optionsList={subActivityData}
                                    optionDisplayName="Value"
                                    Placeholder="Select Sub Activity"
                                    mode="single"
                                    requiredField={true}
                                    onChange={(val, key) =>
                                      handleSubActivityChange(val, key)
                                    }
                                    label="Select Sub-Activity"
                                    error={
                                      touched.subActivity &&
                                      errors.subActivity &&
                                      errors.subActivity
                                    }
                                  />
                                </div>
                              </Col>
                              <Col span={4}>
                                <Button
                                  className="  p-5 flex items-center bg-blue-text text-white rounded-lg px-7 "
                                  onClick={handleAddActivities}
                                  disabled={
                                    values.subActivity === null ? true : false
                                  }
                                >
                                  Add Activities
                                </Button>
                              </Col>
                            </>
                          )}
                        </Row>

                        {selectedActivities.map((item, index) => (
                          <PairedBadge
                            title={item.keyName}
                            value={item.keyValue}
                            classWrapper=" mb-2 mr-2"
                            onDelete={handleDelete}
                            index={index}
                          />
                        ))}
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </Card>
              </div>
            </div>
          </div>

          <Row
            className={`footer notification-footer drawer-header sticky bottom-0 z-10 bg-white mt-10  py-2 justify-center items-end`}
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
              disabled={
                (formik.values.type === "PM" ||
                  formik.values.type === "MW" ||
                  formik.values.type === "O1" ||
                  formik.values.type === "O2" ||
                  formik.values.type === "Z1") &&
                  values.activity !== null
                  ? disable
                  : !disable
              }
            >
              Create
            </Button>
          </Row>
          <Modal
            title={null}
            visible={isConfirmModalVisible}
            wrapClassName="rounded confirm-modal-layout notification-custom-modal isModalVisible"
            closeIcon=" "
            centered={true}
            footer={null}
          >
            <div>
              <h6 className="font-bold mb-2">Create Notification</h6>
              <p>
                Are you sure you want to create this notification for
                <br />{" "}
                <b>
                  {" "}
                  Equipment No.{" "}
                  {stripLeadingZeros(notificationPayload?.equipmentNo)} ?
                </b>
              </p>
            </div>
            <div className="flex justify-end  ant-modal-footer px-0 border-t-0">
              <Button
                className="mx-2 ant-btn-primary rounded-lg"
                onClick={() => {
                  setIsConfirmModalVisible(false);
                  setNotificationPayload(null);
                }}
              >
                Cancel
              </Button>

              <Button
                className=" ant-btn rounded-lg"
                onClick={() => handlePostNotification()}
              >
                {isLoading ? "Loading..." : "Create"}
              </Button>
            </div>
          </Modal>
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
              <h6 className="font-bold mt-1">Notification has been created</h6>
              <p>{notificationPayload}</p>
            </div>

            <div className="flex justify-end mt-4 ant-modal-footer px-0 border-t-0">
              <Button
                className="mx-4 rounded-lg px-4 bg-white border border-daisy-bush"
                onClick={() => {
                  setNotificationPayload(null);
                  setIsSuccessModalVisible(false);
                  onClose();
                }}
                type="primary"
              >
                <div className="text-daisy-bush"> Back to Dashboard</div>
              </Button>
              <Button
                className="mx-4 rounded-lg px-3"
                onClick={() => onCreateWorkOrderClick()}
                // disabled={!accessObject.includes("PostWorkOrder")}
              >
                Create Work Order
              </Button>
            </div>
          </Modal>
        </div>
      </Form>
    </FormikProvider>
  );
};

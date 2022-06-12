import "antd/dist/antd.css";
import { Button, Col, Row, Slider, DatePicker } from "antd";
import { useFormik } from "formik";
import React, { useState, useEffect, useContext } from "react";
import { CustomInput } from "../components/common/CustomInput";
import { AppContext } from "../components/store/app-context";
import { SelectDropdown } from "../components/common/SelectDropdown";
import { CustomDatePicker } from "../components/common/CustomDatePicker";
import { CustomSwitchToggle } from "../components/common/CustomSwitchToggle";
import moment from "moment";

export const WorkInProcessSearch = ({
  handleClose,
  setAdvanceFilterData,
  setIsFilterModalVisible,
  advanceFilterData,
  cancel,
  inputs,
}) => {
  const ctx = useContext(AppContext);
  const getAllOptionList = () => {
    let tempOptionList = {};
    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].type == "selectDropDown") {
        tempOptionList[inputs[i].variable] = [];
      }
    }
    console.log(
      "printing tempOptionList inside getAllOptionList ",
      tempOptionList
    );
    return tempOptionList;
  };

  const [optionList, setOptionList] = useState(getAllOptionList());

  const fillOptionList = () => {
    let OptionKeys = Object.keys(optionList);
    console.log("printig optionKey insinde fillOptionList ", OptionKeys);
    let tempOptionList = { ...optionList };
    for (let i = 0; i < OptionKeys.length; i++) {
      if (
        !optionList[OptionKeys[i]] ||
        (optionList[OptionKeys[i]] && !optionList[OptionKeys[i]].length)
      ) {
        fetchOptionList(OptionKeys[i], tempOptionList);
      }
    }
    setOptionList(tempOptionList);
  };

  const fetchOptionList = (optionListName, optionList) => {
    optionList[optionListName] = [
      { Id: "T1", Value: "Temp Option 1" },
      { Id: "T2", Value: "Temp Option 2" },
      { Id: "T3", Value: "Temp Option 3" },
    ];
    console.log(
      "printing optionList with optionKeys inside fetchOptionList ",
      optionList[optionListName]
    );
  };

  const onSubmit = (val, { resetForm }) => {
    const finalObject = val;
    setAdvanceFilterData(finalObject);
    setIsFilterModalVisible(false);
  };

  const formik = useFormik({
    initialValues: {
      materialNumber: advanceFilterData?.materialNumber,
      serialNumber: advanceFilterData?.serialNumber,
      notificationNumber: advanceFilterData?.notificationNumber,
      workOrderNumber: advanceFilterData?.workOrderNumber,
      dateRange: advanceFilterData.dateRange ? advanceFilterData.dateRange : [],
      functionalLocation: advanceFilterData?.functionalLocation,
      searchNotificationType: advanceFilterData?.searchNotificationType,
      workOrderType: advanceFilterData?.workOrderType,
      mainWorkCenter: advanceFilterData?.mainWorkCenter,
      serialNo: advanceFilterData?.serialNo,
      supplyClass: advanceFilterData?.supplyClass,
      includeOutstanding: advanceFilterData?.includeOutstanding,
      includeNotifications: advanceFilterData?.includeNotifications,
      includePostponed: advanceFilterData?.includePostponed,
      startDate: advanceFilterData?.startDate
        ? advanceFilterData?.startDate
        : "",
      endDate: advanceFilterData?.endDate ? advanceFilterData?.endDate : "",
    },
    enableReinitialize: true,
    onSubmit,
  });

  const {
    touched,
    errors,
    handleSubmit,
    values,
    setFieldValue,

    resetForm,
  } = formik;

  useEffect(() => {
    fillOptionList();
    formik.resetForm();
    return () => {
      resetForm();
    };
  }, []);
  console.log(" printing vlues in workInProcessSearch ", values);
  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit}
      style={{ height: "100%" }}
    >
      <div className="flex flex-col h-full  ">
        <div className="drawer-header sticky top-0 pt-5 bg-white z-10">
          <div className="flex px-7 justify-between">
            <h1 className=" text-xl mb-1 ">Filter By</h1>
            <Button onClick={handleClose} className="border-0 text-blue-text">
              Clear all
            </Button>
          </div>
        </div>
        <div className="steps-content   flex flex-col overflow-auto h-full  flex-grow">
          <div className="h-full   z-10 px-7 ">
            <div>
              <Row className="">
                <Col span={24}>
                  <Row>
                    <Col span={24}>
                      <div className="notification-form-left">
                        <div className="form-item">
                          {/* Map all the inputs with their specific Type */}
                          {inputs.map((input) => {
                            if (input.type == "customInput") {
                              return (
                                <>
                                  <div className="mt-4">
                                    <CustomInput
                                      inputValue={values[input.variable]}
                                      label={input.label}
                                      onChange={(val) =>
                                        setFieldValue(input.variable, val)
                                      }
                                    />
                                  </div>
                                </>
                              );
                            } else if (input.type == "selectDropDown") {
                              return (
                                <>
                                  <div className="form-item mt-4">
                                    <SelectDropdown
                                      dataList={values[input.variable]}
                                      style={{ background: "#E9E9F8" }}
                                      optionKeyName="Id"
                                      optionValueName="Value"
                                      optionDisplayName="Value"
                                      mode="single"
                                      onChange={(val, key) => {
                                        setFieldValue(
                                          [input.variable],
                                          key["key"]
                                        );
                                      }}
                                      label={input.label}
                                      optionsList={input.dropDownOptions}
                                      value={values[input.variable]}
                                    />
                                  </div>
                                </>
                              );
                            } else if (input.type == "slider") {
                              return (
                                <>
                                  {/* This input doesnt exist in Core so created here, Should be added in Core */}
                                  <div className="mt-4">
                                    <div>
                                      <div
                                        className={`font-poppins z-10 text-h1 font-semibold leading-normal text-pickled-bluewood pb-2 `}
                                      >
                                        {input.label} <br></br>
                                        5000-100000
                                      </div>
                                      <Slider
                                        // trackStyle={{
                                        //   backgroundColor: "#383A65",
                                        // }}
                                        trackStyle={{
                                          backgroundColor: "#383A65",
                                          color: "#383A65",
                                        }}
                                        range
                                        max={100000}
                                        min={5000}
                                        step={1}
                                        defaultValue={[20, 50]}
                                        onAfterChange={(value) =>
                                          setFieldValue(input.variable, value)
                                        }
                                      />
                                    </div>
                                  </div>
                                </>
                              );
                            } else if (input.type == "dateRange") {
                              return (
                                <>
                                  <Col span={24}>
                                    <h6
                                      class="font-poppins z-10 text-h1 
                                        font-semibold leading-normal text-pickled-bluewood pb-2}"
                                    >
                                      Date range
                                    </h6>
                                    <div className="flex py-3 items-center">
                                      <div className="notification-form-right rounded">
                                        <DatePicker
                                          className={`ant-select-selector 
                                              custom-placeholder alert-filter-open-time-dropdown 
                                              rounded-lg font-poppins text-xs font-medium 
                                              leading-normal text-daisy-bush w-full dateRangeBox`}
                                          style={{
                                            height: "40px",
                                            background: "#E9E9F8",
                                          }}
                                          placeholder="Start Date"
                                          allowClear={false}
                                          bordered={true}
                                          suffixIcon={
                                            <img
                                              src="/images/icons/tickDropdown.svg"
                                              alt="dropdownimage"
                                            />
                                          }
                                          floatingLabel={false}
                                          value={
                                            values.startDate
                                              ? moment(values.startDate)
                                              : ""
                                          }
                                          onChange={(_date) => {
                                            setFieldValue(
                                              "startDate",
                                              moment(_date._d).format("L")
                                            );
                                          }}
                                        />
                                      </div>
                                      <span
                                        className="mx-2 font-poppins font-medium 
                                          text-xs text-regent-gray leading-normal"
                                      >
                                        to
                                      </span>
                                      <div className="notification-form-right ">
                                        <DatePicker
                                          className={`ant-select-selector custom-placeholder 
                                              alert-filter-open-time-dropdown rounded-lg font-poppins 
                                              text-xs font-medium leading-normal text-daisy-bush w-full dateRangeBox`}
                                          style={{
                                            height: "40px",
                                            background: "#E9E9F8",
                                          }}
                                          placeholder="End Date"
                                          allowClear={false}
                                          suffixIcon={
                                            <img
                                              src="/images/icons/tickDropdown.svg"
                                              alt="dropdownimage"
                                            />
                                          }
                                          floatingLabel={false}
                                          value={
                                            values.endDate
                                              ? moment(values.endDate)
                                              : ""
                                          }
                                          onChange={(_date) => {
                                            setFieldValue(
                                              "endDate",
                                              moment(_date._d).format("L")
                                            );
                                          }}
                                        />
                                      </div>
                                    </div>
                                  </Col>
                                </>
                              );
                            } else if (input.type == "switchToggle") {
                              return (
                                <>
                                  <Col span={24}>
                                    <div className="notification-form-right ">
                                      <div className="font-poppins z-10 text-h1 font-normal leading-normal text-pickled-bluewood pt-2 ">
                                        {input.label}
                                      </div>
                                      <CustomSwitchToggle
                                        className="flex-row-reverse my-2"
                                        switchValue={values[input.variable]}
                                        onText="Yes"
                                        offText="No"
                                        value={values[input.variable]}
                                        onChange={(val) =>
                                          setFieldValue(input.variable, val)
                                        }
                                      />
                                    </div>
                                  </Col>
                                </>
                              );
                            }
                          })}
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </div>
        </div>
        <div className="drawer-footer">
          <Row className="sticky bottom-0 z-10 items-end">
            <Col span={12}>
              <Button
                className="bg-athens-gray text-center w-full rounded-bl-3xl py-7 flex justify-center items-center"
                type="link"
                onClick={cancel}
              >
                Cancel
              </Button>
            </Col>
            <Col span={12}>
              <Button
                className="bg-blue-text border-0 text-white text-center w-full py-7 flex justify-center items-center"
                htmlType="submit"
              >
                Filter
              </Button>
            </Col>
          </Row>
        </div>
      </div>
    </form>
  );
};
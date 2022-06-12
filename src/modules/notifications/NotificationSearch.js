import { Button, Col, Row, DatePicker } from "antd";
import "antd/dist/antd.css";
import { useFormik } from "formik";
import React, { useState, useEffect, useContext } from "react";
import { CustomInput } from "../components/Customs/CustomInput";

import { AppContext } from "../components/store/app-context";
import { CustomSwitchToggle } from "../components/Customs/CustomSwitchToggle";
import { SelectDropdown } from "../components/Customs/SelectDropdown";
import moment from "moment";

export const NotificationSearch = ({
  handleClose,
  handleNext,
  current,
  setAdvanceFilterData,
  setIsFilterModalVisible,
  advanceFilterData,
  cancel,
}) => {
  const ctx = useContext(AppContext);

  const [notificationType, setNotificationType] = useState([]);

  const onSubmit = (val, { resetForm }) => {
    console.log("printing val inside onSubmit of Filter", val);
    const finalObject = val;
    let FilterdateRange = Object.entries(val);
    let d = FilterdateRange[6].map((item) => {
      let dateFrom = item[0];
      let dateTo = item[1];
      var date = new Date(dateFrom);
      var newdateFrom =
        date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
      var date2 = new Date(dateTo);
      var newdateTo =
        date2.getMonth() +
        1 +
        "/" +
        date2.getDate() +
        "/" +
        date2.getFullYear();
      let finalDate = [newdateFrom, newdateTo];
      let filterData = finalDate.filter((f) => f !== "NaN/NaN/NaN");

      return filterData;
    });
    finalObject.date = d[1];
    setAdvanceFilterData(finalObject);
    setIsFilterModalVisible(false);
  };

  const formik = useFormik({
    initialValues: {
      searchEquipmentSerialNumber: "",
      isCompletedNotification: advanceFilterData
        ? advanceFilterData?.isCompletedNotification
        : false,
      notificationNumber: advanceFilterData?.notificationNumber,
      material: advanceFilterData?.material,
      searchNotificationType: advanceFilterData?.searchNotificationType,
      dateRange: "",
      startDate: advanceFilterData?.startDate
        ? advanceFilterData?.startDate
        : "",
      endDate: advanceFilterData?.endDate ? advanceFilterData?.endDate : "",
    },
    enableReinitialize: true,
    onSubmit,
  });
  const valNotificatioList = [
    {
      Id : "001" ,
      Value: "Notification Type-1",
    },
    {
      Id : "002" ,
      Value: "Notification Type-2",
    },
    {
      Id : "003" ,
      Value: "Notification Type-3",
    },
    {
      Id : "004" ,
      Value: "Notification Type-4",
    },
  ]
  const getNotificationsType = async () => {
    const response = valNotificatioList
    if (response) {
      setNotificationType(response);
    }
  };

  const {
    touched,
    errors,
    handleSubmit,
    values,
    setFieldValue,

    resetForm,
  } = formik;

  useEffect(() => {
    if (!notificationType.length) getNotificationsType();
    formik.resetForm();
    return () => {
      resetForm();
    };
  }, []);

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
                          <div className="mt-4">
                            <CustomInput
                              inputValue={values.notificationNumber}
                              label={"Notification No."}
                              onChange={(val) =>
                                setFieldValue("notificationNumber", val)
                              }
                            />
                            {touched.notificationNumber &&
                              errors.notificationNumber && (
                                <p
                                  className="text-error"
                                  style={{ color: "red" }}
                                >
                                  {errors.notificationNumber}
                                </p>
                              )}
                          </div>
                          <div className="textareaLayoutFix mt-4">
                            <CustomInput
                              inputValue={values.material}
                              onChange={(val) => setFieldValue("material", val)}
                              label="Material"
                            />
                            {touched.material && errors.material && (
                              <p
                                className="text-error"
                                style={{ color: "red" }}
                              >
                                {errors.material}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="form-item mt-4">
                          <SelectDropdown
                            dataList={values.searchNotificationType}
                            style={{ background: "#E9E9F8" }}
                            optionKeyName="Id"
                            optionValueName="Value"
                            optionDisplayName="Value"
                            mode="single"
                            onChange={(val, key) => {
                              setFieldValue(
                                "searchNotificationType",
                                key["key"]
                              );
                            }}
                            label="Notification Type"
                            optionsList={notificationType}
                            value={values.searchNotificationType}
                          />
                          {touched.searchNotificationType &&
                            errors.searchNotificationType && (
                              <p
                                className="text-error"
                                style={{ color: "red" }}
                              >
                                {errors.searchNotificationType}
                              </p>
                            )}
                        </div>
                      </div>
                    </Col>
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
                            style={{ height: "40px", background: "#E9E9F8" }}
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
                              values.startDate ? moment(values.startDate) : ""
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
                            style={{ height: "40px", background: "#E9E9F8" }}
                            placeholder="End Date"
                            allowClear={false}
                            suffixIcon={
                              <img
                                src="/images/icons/tickDropdown.svg"
                                alt="dropdownimage"
                              />
                            }
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
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row className="mt-4 border-t border-athens-gray">
                <Col span={24}>
                  <div className="mt-5">
                    <h4 className="font-semibold">
                      <b>Include Completed Notifications</b>
                    </h4>
                    <CustomSwitchToggle
                      className="flex-row-reverse mt-2"
                      switchValue={values.isCompletedNotification}
                      onText="Active"
                      offText="Inactive"
                      onChange={(val) =>
                        setFieldValue("isCompletedNotification", val)
                      }
                    />
                  </div>
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
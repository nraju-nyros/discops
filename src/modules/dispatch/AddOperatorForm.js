import React, { useState, useEffect } from "react";
import { Button, Card, Col, Row, Modal, Select } from "antd";
import { SelectDropdown } from "../components/Customs/SelectDropdown";
import { Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";

export const AddOperatorForm = ({
  ctx,
  initialValues,
  operatorValues,
  operatorsList,
}) => {
  const [operatorList, setOperatorList] = useState(operatorsList);
  const [operatorNameList, setOperatorNameList] = useState([]);
  const [isQualified, setIsQualified] = useState("No");
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [autoFocus, setAutoFocus] = React.useState(null);
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Operator Name is required")
      .typeError("Operator Name is required"),
    operatorType: Yup.string()
      .required("Operator Type is required")
      .typeError("Operator Type is required"),
  });
  const autoFocusSearch = () => {
    setTimeout(() => {
      setAutoFocus(!autoFocus);
    }, 10);
  };
  const handleSelectChange = (value) => {
    console.log(`inside select change ${value}`);
    setOperatorNameList(value);
  };
  const handleSearchChange = (value) => {
    console.log("inside search change :", value);
  };
  const onSubmit = async (val, { resetForm }) => {
    console.log("inside submit ", val);
    if(isQualified == 'No'){
      setIsConfirmModalVisible(true);
      return false
    } else {
      handleSubmission();
    }
  };
  
  const handleSubmission = () => {
    const newObj = {
      ...values,
      qualified: isQualified,
      permitValidated: "NA",
      external: "No",
    };
    operatorValues(newObj);
    formik.resetForm({ initialValues });
    setOperatorNameList([]);
    console.log("inside submission ", operatorNameList);
    setIsConfirmModalVisible(false);
  };

  const { Option } = Select;
  const operatorListOptionArr = [
    { Id: "D1", Value: "Primary Operator" },
    { Id: "D2", Value: "Passenger/Crew" },
    { Id: "D3", Value: "Alternate Operator" },
  ];
  const getQualifiedStatus = async (results) => {
    if (results.length > 0) {
      setIsQualified("Yes");
      console.log("printing setIsQualified yes");
    } else {
      setIsQualified("No");
      console.log("printing setIsQualified No");
    }
  };
  const getOperatorNameQueryData = async (val) => {
    if (val.length > 2) {
      try {
        // const res = operatorListOptionArr;
        const res = [
    { Id: "D1", Value: "Operator_1" },
    { Id: "D2", Value: "Operator_2" },
    { Id: "D3", Value: "Operator_3" },
        { Id: "D4", Value: "Operator_4" },
    { Id: "D5", Value: "Operator_5" },

  ];
        console.log("inside getOperatorNameQueryData ", res);

        if (res) {
          setOperatorNameList(res);
          getQualifiedStatus(0);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      setOperatorNameList([]);
    }
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit,
  });
  const {
    touched,
    errors,
    handleSubmit,
    values,
    setFieldValue,
    setErrors,
    resetForm,
  } = formik;

  return (
    <>
      <FormikProvider value={formik}>
        <div>
          <div class="search-by-card">
            <div className="notification-form-left">
              <div className="form-item">
                <div className="my-5">
                  <div className="flex flex-col custom-search">
                    {/* <div
                        className={"font-poppins z-10 text-h1 font-semibold leading-normal text-pickled-bluewood pb-2 "}
                      >
                        <label> Operator Name </label>
                      </div>
                    <Select
                      onClick={autoFocusSearch}
                      size="large"
                      placeholder="Select an event"
                      onChange={(value, key) => {
                        setFieldValue("operator", key["key"]);
                        setFieldValue("name", key["value"]);
                        setOperatorNameList([]);
                      }}
                      // onSearch={handleSearchChange}
                      showSearch={handleSearchChange}
                      className="border dropdown_blue_text  border-white-lilac colorFix md:flex w-48 "
                      mode="single"
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      optionKeyName="Id"
                      optionValueName="Value"
                      optionDisplayName="Value"
                      // options = {operatorListOptionArr}
                    >
                       <Option value="operator name 1">operator name 1</Option>
                      <Option value="operator name 2">operator name 2</Option>
                      <Option value="operator name 3">operator name 3</Option>
                      <Option value="operator name 4">operator name 4</Option>
                      <Option value="operator name 5">operator name 5</Option>
                      <Option value="operator name 6">operator name 6</Option> 
                    </Select> 
                    <br />
                    <div
                        className={"font-poppins z-10 text-h1 font-semibold leading-normal text-pickled-bluewood pb-2 "}
                      >
                        <label> Operator Name </label>
                      </div>
                    <Select
                      onClick={autoFocusSearch}
                      size="large"
                      placeholder="Select an event"
                      onChange={handleSelectChange}
                      // onSearch={handleSearchChange}
                      showSearch={handleSearchChange}
                      className="border dropdown_blue_text  border-white-lilac colorFix md:flex w-48 "
                      mode="single"
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                    >
                      <Option value="operator type 1">operator type 1</Option>
                      <Option value="operator type 2">operator type 2</Option>
                      <Option value="operator type 3">operator type 3</Option>
                      <Option value="operator type 4">operator type 4</Option>
                      <Option value="operator type 5">operator type 5</Option>
                      <Option value="operator type 6">operator type 6</Option>
                    </Select> */}

                    <SelectDropdown
                      value={values.name}
                      mode="single"
                      showSearch={true}
                      optionKeyName="Id"
                      optionValueName="Value"
                      optionDisplayName="Value"
                      label="Operator Name"
                      optionsList={operatorNameList}
                      onChange={(value, key) => {
                        setFieldValue("operator", key["key"]);
                        setFieldValue("name", key["value"]);
                        console.log(
                          "printing key inside onChange of SelectDropdown",
                          key
                        );
                        console.log(
                          "printing val  inside onChange of SelectDropdown",
                          value
                        );
                        setOperatorNameList([]);
                      }}
                      onSearchInput={(val) => getOperatorNameQueryData(val)}
                      error={touched.name && errors.name}
                    />
                    <br />
                    <SelectDropdown
                      dataList={values.operatorTypeName}
                      value={values.operatorTypeName}
                      label="Operator Type"
                      optionsList={operatorListOptionArr}
                      mode="single"
                      optionKeyName="Id"
                      optionValueName="Value"
                      optionDisplayName="Value"
                      className="border dropdown_blue_text  border-white-lilac colorFix"
                      onChange={(val, key) => {
                        setFieldValue("operatorType", key["key"]);
                        setFieldValue("operatorTypeName", val);
                        console.log(
                          "printing key inside onChange of SelectDropdown 2 ",
                          key
                        );
                        console.log(
                          "printing val  inside onChange of SelectDropdown 2 ",
                          val
                        );
                      }}
                      error={touched.operatorType && errors.operatorType}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />
        </div>
        <Row className="horizontal-center">
          <Col span={24}>
            <Button
              className="p-5 flex items-center bg-blue-text text-white rounded-lg px-7 ml-28"
              // htmlType="submit"
              onClick={handleSubmit}
            >
              Add to List
            </Button>
          </Col>
        </Row>
      </FormikProvider>

      <Modal
        title={null}
        visible={isConfirmModalVisible}
        wrapClassName="rounded notification-custom-modal"
        closeIcon=" "
        centered={true}
        footer={null}
      >
        <div>
          <h6 className="font-bold mt-1"> Operator Not Qualified ! </h6>
        </div>
        <div className="mt-3">
          <p>
            Operator is not Qualified. Are you sure you want to add this
            Operator?
          </p>
        </div>
        <div className="flex justify-end  ant-modal-footer px-0 border-t-0">
          <Button
            className="mx-2 ant-btn-primary rounded-lg"
            onClick={() => {
              setIsConfirmModalVisible(false);
            }}
          >
            No
          </Button>
          <Button className=" ant-btn rounded-lg" onClick={handleSubmission}>
            Add Operator
          </Button>
        </div>
      </Modal>
    </>
  );
};

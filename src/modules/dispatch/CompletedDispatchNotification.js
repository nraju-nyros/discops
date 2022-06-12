import React, { useContext, useState } from "react";
import { Button, Card, Col, Row, Modal,DatePicker } from "antd";
// import { AppContext } from "../../Core/store/app-context";
import { AppContext } from "../components/Context/AppContext";

import { useHistory } from "react-router-dom";
import { Form, FormikProvider, useFormik } from "formik";
import { CustomInput } from "../components/Customs/CustomInput";

import { CustomTextarea } from "../components/Customs/CustomTextarea";
import { CustomSwitchToggle } from "../components/Customs/CustomSwitchToggle";
import { CheckOutlined, BranchesOutlined } from "@ant-design/icons";
import { SelectDropdown } from "../components/Customs/SelectDropdown";
// import { Layout } from "../../Core/layout";
import moment from "moment";
import * as Yup from "yup";
// import CompleteDispatchNotification from "../HelpTemplates/Dispatch/CompleteDispatchNotification.js";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { CustomTimePicker } from "../components/Customs/CustomTimePicker";
// import { SideDrawer } from "../components/SideDrawer";
// import { Help } from "../../Core/Help";

export const CompletedDispatchNotification = (props) => {

  const ctx = useContext(AppContext);
  // let history = useHistory();
  const [operationPayload, setOperationPayload] = useState(null);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [isSuccessModalVisibleOne, setIsSuccessModalVisibleOne] = useState(false);
  const [dispatchPayload, setDispatchPayload] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [current, setCurrent] = useState(0);
  const [showHelpModal, setShowHelpModal] = useState(false);
  
  

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
    // workCenter: history.location?.WorkCenter,
    description: "",
    plant: "",
    action: "",
    notification: "",
    projectedWorkHours: "",
    createdBy: "",
    createdOn: "",
  };

  const handlePostOperation = async () => {
    setIsLoading(true);
    try {
      const response = await ctx.HttpPost("/WorkOrder/operation", values);
      if (response) {
        setIsLoading(false);
        setOperationPayload(response);
        setIsConfirmModalVisible(false);
        setIsSuccessModalVisible(true);
        setIsSuccessModalVisibleOne(true);
        setDispatchPayload(response);
      } else {
        setIsLoading(false);
        setIsConfirmModalVisible(false);
        setOperationPayload(null);
        setDispatchPayload(null);
      }
    } catch (err) {}
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
    setOperationPayload(val);
    setIsConfirmModalVisible(true);
    setDispatchPayload(val)
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
          <p>Complete Dispatch Notifications</p>
        </Col>
        
      </Row>
    );
  };
  const { touched, errors, handleSubmit, values, setFieldValue } = formik;
  return (
   
   <>
   <div  className="mb-4">
    <Row>
        <Col sm={12} md={24}>
          <p>Complete Dispatch Notification</p>
        </Col>
        
      </Row></div>
<Row>
<Col span={showHelpModal ? 20 : 24}>
    <FormikProvider className="ant-modal-body" value={formik}>
      <Form
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit}
        className="flex-grow flex flex-col "
      >
        {/*<div className="flex flex-col h-full ant-modal-body  ">
          <div className="drawer-header sticky top-0 bg-white z-10">
          {renderStepBar(current)} 
          </div>
        </div>*/}
        <div
          style={{ background: "#F3F5F8" }}
          className="flex flex-col "
        >
          <div className="content rounded-lg px-40 flex-grow pb-10">
            <Card className=" rounded-2xl">
              <div className="px-8 pt-8 pb-10">
              <h5 class="font-poppins z-10 text-h1 font-semibold leading-normal text-pickled-bluewood pb-2">Return Date & Time</h5>
              
              <Row gutter={50}>
                <Col span={8}>
                <h6 class="font-poppins z-10 text-h1 font-semibold leading-normal text-pickled-bluewood pb-2">Date</h6>
                   
                      <div className="notification-form-right rounded">
                        <DatePicker
                          className={`ant-select-selector 
                          custom-placeholder alert-filter-open-time-dropdown 
                          rounded-lg font-poppins text-xs font-medium 
                          leading-normal text-daisy-bush w-full dateRangeBox`}
                          style={{ height: "40px", width: "100%", background: "#E9E9F8" }}
                          placeholder='Select Date'
                          allowClear={false}
                          bordered={true}
                          suffixIcon={
                            <img src="/images/icons/tickDropdown.svg" alt="dropdownimage" />
                          }
                          floatingLabel={false}
                          value={values.startDate ? moment(values.startDate) : ""}
                          onChange={(_date) => {
                            setFieldValue("startDate", moment(_date._d).format("L"))
                          }}
                  />
                  </div>
                </Col>
                <Col span={5}>
                  <div className="input_text_color">
                  {/*<h6 class="font-poppins z-10 text-h1 font-semibold leading-normal text-pickled-bluewood pb-2">Hours</h6>*/}
                    <CustomTimePicker
                      label="Time"
                      placeholder="Select Time"
                      format='HH:mm'
                      value={values.startTime ? moment(values.startTime, 'HH:mm') : ''}
                      onChange={(time, val) => setFieldValue("startTime", val)}
                    />
{/*                    <CustomInput
                      className="ml-8 "
                      inputValue={values.Hours}
                      disabled={false}
                      // label={"Hours"}
                      // Placeholder=""
                      requiredField={true}
                      onChange={(val) => setFieldValue("Hours", val)}
                      error={
                        touched.workCenter &&
                        errors.workCenter &&
                        errors.workCenter
                      }
                    />*/}
                    
                  </div>
                </Col>
                <Col span={4}>
                  <div className="input_text_color">
                  {/*<h6 class="font-poppins z-10 text-h1 font-semibold leading-normal text-pickled-bluewood pb-2">Minutes</h6>*/}
                 
{/*                    <CustomInput
                      className="ml-8"
                      inputValue={values.Minutes}
                      disabled={false}
                      // label={"Hours"}
                      Placeholder=""
                      requiredField={true}
                      onChange={(val) => setFieldValue("Minutes", val)}
                      error={
                        touched.workCenter &&
                        errors.workCenter &&
                        errors.workCenter
                      }
                    />*/}
                    
                  </div>
                </Col>
{/*                <Col span={3}>
                  <div className="font-poppins z-10 text-h1 font-semibold leading-normal text-pickled-bluewood pb-2">
                  
                  <SelectDropdown
                  //   value={values.getSystemConditions}
                  //   dataList={values.SystemConditions}
                  //   optionsList={systemConditions}
                    mode="single"
                    optionKeyName="Id"
                    optionValueName="Value"
                    className="border dropdown_blue_text  border-white-lilac colorFix"
                    optionDisplayName="Value"
                    onChange={(val, key) => {
                      setFieldValue("systemconditions", val);
                    }}
                    label="&nbsp;"
                    
                    error={
                      touched.systemconditions &&
                      errors.systemconditions &&
                      errors.systemconditions
                    }
                  />
                                   </div>
                                </Col>*/}
                
              </Row>
              {/* <div class="dotted_border"></div> */}
              
               <br/>
                <h5 class="font-poppins z-10 text-h1 font-semibold leading-normal text-pickled-bluewood pb-2">Enter Measurements</h5>
              
                <Row gutter={50}>
                  <Col span={6}>
                 
                     
                  <div className="input_text_color">
                        <h5 class="font-poppins z-10 text-h1 font-semibold leading-normal text-pickled-bluewood pb-2">Measurements</h5>
                        <CustomInput
                      className="ml-8 "
                      inputValue={"Miles Travelled"}
                      disabled={true}
                      // label={"Measurements"}
                      // Placeholder="Operating Hours"
                      requiredField={true}
                      onChange={(val) => setFieldValue("Measurements", val)}
                      error={
                        touched.Measurements &&
                        errors.Measurements &&
                        errors.Measurements
                      }
                    />
                    </div>
                  </Col>
                  <Col span={5}>
                    <div className="input_text_color">
                    <h6 class="font-poppins z-10 text-h1 font-semibold leading-normal text-pickled-bluewood pb-2">Previous Reading</h6>
                    
                      <CustomInput
                        className="ml-8 "
                        inputValue={values.Previous}
                        disabled={true}
                        // label={"Previous Reading"}
                        // Placeholder=""
                        requiredField={true}
                        onChange={(val) => setFieldValue("workCenter", val)}
                        error={
                          touched.Previous &&
                          errors.Previous &&
                          errors.Previous
                        }
                      />
                      
                    </div>
                  </Col>
                  <Col span={3}>
                    <div className="input_text_color">
                    <h5 class="font-poppins z-10 text-h1 font-semibold leading-normal text-pickled-bluewood pb-2">Units</h5>                 
                      <CustomInput
                        className="ml-4 "
                        inputValue={"MI"}
                        disabled={true}
                        // label={"Units"}
                        // Placeholder=""
                        requiredField={true}
                        onChange={(val) => setFieldValue("Units", val)}
                        error={
                          touched.Units &&
                          errors.Units &&
                          errors.Units
                        }
                      />
                      
                    </div>
                  </Col>
                  <Col span={5}>
                    <div className="input_text_color">
                    <h6 class="font-poppins z-10 text-h1 font-semibold leading-normal text-pickled-bluewood pb-2">Current Reading</h6>
                     <CustomInput
                        className="ml-4 "
                        inputValue={values.Currentone}
                        disabled={false}
                        maxLength="6"
                        // label={"Hours"}
                        // Placeholder=""
                        requiredField={true}
                       onChange={(val) =>
                    setFieldValue(
                      "CurrentTwo",
                      // val.replace(/^.{7}$/,"")
                    )
                  }
                        error={
                          touched.CurrentTwo &&
                          errors.CurrentTwo &&
                          errors.CurrentTwo
                        }
                      />
                      
                    </div>
                  </Col>
                  <Col span={5}>
                  <h5 class="font-poppins z-10 text-h1 font-semibold leading-normal text-pickled-bluewood pb-2">Primary Operator"</h5>             
                  <Row gutter={10}>
                    <Col span={10}>
                    <div className="input_text_color">
                  
                   
                      <CustomInput
                        className="ml-8 "
                        inputValue={""}
                        disabled={true}
                        // label={"Hours"}
                        // Placeholder=""
                        requiredField={true}
                        onChange={(val) => setFieldValue("Primary ", val)}
                        error={
                          touched.Primary  &&
                          errors.Primary  &&
                          errors.Primary 
                        }
                      />
                      
                    </div>
                  </Col>
                    <Col span={2}>
                    &nbsp;
                    </Col>
                    <Col span={10}>
                    <div className="input_text_color">
                  
                   
                    <Button style={{marginLeft:"0px"}}  onClick={() => {
                // setOperationPayload(null);
                // setIsSuccessModalVisibleOne(true);
              }}
              className="p-5 flex items-center  border-regent-gray rounded-lg"
              type="link"
            >
              {/*<BranchesOutlined />*/}
            </Button>
                      
                    </div>
                  </Col>
                  </Row>
                  </Col>
                  
                  
                </Row>
                <br/>
                <Row gutter={50}>
                  <Col span={6}>
                 
                     
                  <div className="input_text_color">
                        <CustomInput
                      className="ml-8 "
                      inputValue={"Operating Hours"}
                      disabled={true}
                      // label={"Hours"}
                      // Placeholder=""
                      requiredField={true}
                      onChange={(val) => setFieldValue("Measurements", val)}
                      error={
                        touched.Measurements &&
                        errors.Measurements &&
                        errors.Measurements
                      }
                    />
                    </div>
                  </Col>
                  <Col span={5}>
                    <div className="input_text_color">
                   
                    
                      <CustomInput
                        className="ml-8 "
                        inputValue={values.Previous }
                        disabled={true}
                        // label={"Hours"}
                        // Placeholder=""
                        requiredField={true}
                        onChange={(val) => setFieldValue("Previous", val)}
                        error={
                          touched.Previous  &&
                          errors.Previous  &&
                          errors.Previous 
                        }
                      />
                      
                    </div>
                  </Col>
                  <Col span={3}>
                    <div className="input_text_color">
                  
                   
                      <CustomInput
                        className="ml-4 "
                        inputValue={"H"}
                        disabled={true}
                        // label={"Hours"}
                        // Placeholder=""
                        requiredField={true}
                        onChange={(val) => setFieldValue("Units", val)}
                        error={
                          touched.Units &&
                          errors.Units &&
                          errors.Units
                        }
                      />
                      
                    </div>
                  </Col>
                  <Col span={5}>
                    <div className="input_text_color">
                  
                   
                      <CustomInput
                        className="ml-4 "
                        inputValue={values.CurrentTwo}
                        disabled={false}
                        // label={"Hours"}
                        // Placeholder=""
                        requiredField={true}
                        onChange={(val) =>
                          setFieldValue(
                            "Currentone",
                            // val.replace(/^.{7}$/,"Invalid Reading")
                          )
                        }
                        error={
                          touched.Currentone &&
                          errors.Currentone &&
                          errors.Currentone
                        }
                      />
                      
                    </div>
                  </Col>
                  
                  
                  <Col span={5}>
                    <div className="input_text_color">
                      <CustomInput
                        className="ml-8 "
                        inputValue={""}
                        disabled={true}
                        // label={"Primary Operator"}
                        // Placeholder=""
                        requiredField={true}
                        onChange={(val) => setFieldValue("Primary", val)}
                        error={
                          touched.Primary &&
                          errors.Primary &&
                          errors.Primary
                        }
                      />
                      
                    </div>

                  </Col>
                </Row>
                <br/>
                <Row gutter={50}>
                  <Col span={6}>
                 
                     
                  <div className="input_text_color">
                        <CustomInput
                      className="ml-8 "
                      inputValue={""}
                      disabled={true}
                      // label={"Hours"}
                      // Placeholder=""
                      requiredField={true}
                      onChange={(val) => setFieldValue("Measurements", val)}
                      error={
                        touched.Measurements &&
                        errors.Measurements &&
                        errors.Measurements
                      }
                    />
                    </div>
                  </Col>
                  <Col span={5}>
                    <div className="input_text_color">
                   
                    
                      <CustomInput
                        className="ml-8 "
                        inputValue={values.Previous}
                        disabled={true}
                        // label={"Hours"}
                        // Placeholder=""
                        requiredField={true}
                        onChange={(val) => setFieldValue("Previous", val)}
                        error={
                          touched.Previous &&
                          errors.Previous &&
                          errors.Previous
                        } 
                      />
                      
                    </div>
                  </Col>
                  <Col span={3}>
                    <div className="input_text_color">
                  
                   
                      <CustomInput
                        className="ml-4 "
                        inputValue={""}
                        disabled={true}
                        // label={"Hours"}
                        // Placeholder=""
                        requiredField={true}
                        onChange={(val) => setFieldValue("Units", val)}
                        error={
                          touched.Units &&
                          errors.Units &&
                          errors.Units
                        }
                      />
                      
                    </div>
                  </Col>
                  <Col span={5}>
                    <div className="input_text_color">
                  
                   
                      <CustomInput
                        className="ml-4 "
                        inputValue={values.Currentthree }
                        disabled={false}
                        // label={"Hours"}
                        // Placeholder=""
                        requiredField={true}
                        onChange={(val) =>
                          setFieldValue(
                            "Currentthree",
                            // val.replace(/^.{7}$/,"")
                          )
                        }
                      />
                      
                    </div>
                  </Col>
                 
                  <Col span={5}>
                    <div className="input_text_color">
                  
                   
                      <CustomInput
                        className="ml-8 "
                        inputValue={""}
                        disabled={true}
                        // label={"Hours"}
                        // Placeholder=""
                        requiredField={true}
                        onChange={(val) => setFieldValue("Primary", val)}
                        error={
                          touched.Primary &&
                          errors.Primary &&
                          errors.Primary
                        }
                      />
                      
                    </div>
                  </Col>
                 
                  
                </Row>
                <br/>
                <Row gutter={50}>
                  <Col span={6}>
                 
                     
                        <div className="input_text_color">
                        <CustomInput
                      className="ml-8 "
                      inputValue={""}
                      disabled={true}
                      // label={"Hours"}
                      // Placeholder=""
                      requiredField={true}
                      onChange={(val) => setFieldValue("workCenter", val)}
                      error={
                        touched.workCenter &&
                        errors.workCenter &&
                        errors.workCenter
                      }
                    />
                    </div>
                  </Col>
                  <Col span={5}>
                    <div className="input_text_color">                  
                      <CustomInput
                        className="ml-8 "
                        inputValue={values.workCenter}
                        disabled={true}
                        // label={"Hours"}
                        // Placeholder=""
                        requiredField={true}
                        onChange={(val) => setFieldValue("workCenter", val)}
                        error={
                          touched.workCenter &&
                          errors.workCenter &&
                          errors.workCenter
                        }
                      />
                      
                    </div>
                  </Col>
                  <Col span={3}>
                    <div className="input_text_color">  
                     <CustomInput
                        className="ml-4 "
                        inputValue={""}
                        disabled={true}
                        // label={"Hours"}
                        // Placeholder=""
                        requiredField={true}
                        onChange={(val) => setFieldValue("workCenter", val)}
                        error={
                          touched.workCenter &&
                          errors.workCenter &&
                          errors.workCenter
                        }
                      />
                      
                    </div>
                  </Col>
                  <Col span={5}>
                    <div className="input_text_color">
                  
                   
                      <CustomInput
                        className="ml-4 "
                        inputValue={values.workCenterTwo}
                        disabled={false}
                        // label={"Hours"}
                        // Placeholder=""
                        requiredField={false}
                        onChange={(val) =>
                          setFieldValue(
                            "workCenterTwo",
                            // val.replace(/^.{7}$/, "")
                          )
                        }
                        error={
                          touched.workCenterTwo &&
                          errors.workCenterTwo &&
                          errors.workCenterTwo
                        }
                      />
                      
                    </div>
                  </Col>
                    <Col span={5}>
                    <div className="input_text_color">
                  
                   
                      <CustomInput
                        className="ml-8 "
                        inputValue={""}
                        disabled={true}
                        // label={"Hours"}
                        // Placeholder=""
                        requiredField={true}
                        onChange={(val) => setFieldValue("workCenter", val)}
                        error={
                          touched.workCenter &&
                          errors.workCenter &&
                          errors.workCenter
                        }
                      />
                      
                    </div>
                  </Col>
                  
                  
                </Row>
               
                <br/>
               
                    </div>
                   
            </Card>
          </div>
          <Row
            className={`footer notification-footer drawer-header sticky bottom-0 z-10 bg-white py-2 justify-center items-end`}
          >
            <Button
              // onClick={() => {
              //   history.push('/dispatch/list');
              // }}
              className="p-5 flex items-center  border-regent-gray rounded-lg mr-28 botton_text_gray"
              type="link"
            >
              Cancel
            </Button>
            <Button
              className="p-5 flex items-center bg-blue-text text-white rounded-lg px-7 ml-28"
              onClick={() => {
                setDispatchPayload(null);
                // setIsSuccessModalVisible(true);
              
              }}
            >
              Submit
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
          <h6 className="font-bold mt-1"> Complete Dispatch </h6>
        </div>
        <div className="mt-3">
          <p>Are you sure you want to Complete Dispatch<br/> notification for Equipment No.1016484795?</p>
        </div>
        <div className="flex justify-end  ant-modal-footer px-0 border-t-0">
          <Button
            className="mx-2 ant-btn-primary rounded-lg"
            onClick={() => {
            
              setIsSuccessModalVisible(false);
              // history.push({
              //   pathname: "/dispatch/completedispatchnotification",
              //   tabValue: "2",
              // });
            }}
          >
            Cancel
          </Button>
          <Button className=" ant-btn rounded-lg" onClick={() => {
              setIsConfirmModalVisible(false);
              setDispatchPayload(null);
              // history.push('/dispatch/list');
            }}>
           Confirm
          </Button>
        </div>
      </Modal>

      <Modal
        title={null}
        visible={isSuccessModalVisibleOne}
        wrapClassName="rounded confirm-modal-layout notification-custom-modal"
        closeIcon=" "
        centered={true}
        footer={null}
      >
        <div>
          
           <h6 className="font-bold mt-1">Enter Split Management - Miles Travelled </h6>
           <br/>
           <Row gutter={50}>
                  <Col span={10}>
                 
                  <h6 class="font-poppins z-10 text-h1 font-semibold leading-normal text-pickled-bluewood pb-2 ">Operator</h6>
                        <div className="notification-form-right rounded">
                        <CustomInput
                      className="ml-8 "
                      inputValue={values.workCenter}
                      disabled={true}
                      // label={"Hours"}
                      // Placeholder=""
                      requiredField={true}
                      onChange={(val) => setFieldValue("workCenter", val)}
                      error={
                        touched.workCenter &&
                        errors.workCenter &&
                        errors.workCenter
                      }
                    />
                    </div>
                  </Col>
                  <Col  span={8}>
                  <h6 class="font-poppins z-10 text-h1 font-semibold leading-normal text-pickled-bluewood pb-2">Reading</h6>
                    <div style={{marginLeft:"-20px"}} className="input_text_color">                  
                      <CustomInput
                        className="ml-8 "
                        inputValue={values.workCenter}
                        disabled={false}
                        // label={"Hours"}
                        // Placeholder=""
                        requiredField={true}
                        onChange={(val) => setFieldValue("workCenter", val)}
                        error={
                          touched.workCenter &&
                          errors.workCenter &&
                          errors.workCenter
                        }
                      />
                      
                    </div>
                  </Col>
                  <Col span={6}>
                  <h6 class="font-poppins z-10 text-h1 font-semibold leading-normal text-pickled-bluewood pb-2">Unit</h6>
                    <div style={{marginLeft:"-20px"}} className="input_text_color">                  
                      <CustomInput
                        className="ml-8 "
                        inputValue={values.workCenter}
                        disabled={true}
                        // label={"Hours"}
                        // Placeholder=""
                        requiredField={true}
                        onChange={(val) => setFieldValue("workCenter", val)}
                        error={
                          touched.workCenter &&
                          errors.workCenter &&
                          errors.workCenter
                        }
                      />
                      
                    </div>
                  </Col>
                  
                  
                </Row>
                <br/>
                <Row gutter={50}>
                  <Col span={10}>
                 
                 
                        <div className="notification-form-right rounded">
                        <CustomInput
                      className="ml-8 "
                      inputValue={values.workCenter}
                      disabled={true}
                      // label={"Hours"}
                      // Placeholder=""
                      requiredField={true}
                      onChange={(val) => setFieldValue("workCenter", val)}
                      error={
                        touched.workCenter &&
                        errors.workCenter &&
                        errors.workCenter
                      }
                    />
                    </div>
                  </Col>
                  <Col  span={8}>
                 
                    <div style={{marginLeft:"-20px"}} className="input_text_color">                  
                      <CustomInput
                        className="ml-8 "
                        inputValue={values.workCenter}
                        disabled={false}
                        // label={"Hours"}
                        // Placeholder=""
                        requiredField={true}
                        onChange={(val) => setFieldValue("workCenter", val)}
                        error={
                          touched.workCenter &&
                          errors.workCenter &&
                          errors.workCenter
                        }
                      />
                      
                    </div>
                  </Col>
                  <Col span={6}>
                 
                    <div style={{marginLeft:"-20px"}} className="input_text_color">                  
                      <CustomInput
                        className="ml-8 "
                        inputValue={values.workCenter}
                        disabled={true}
                        // label={"Hours"}
                        // Placeholder=""
                        requiredField={true}
                        onChange={(val) => setFieldValue("workCenter", val)}
                        error={
                          touched.workCenter &&
                          errors.workCenter &&
                          errors.workCenter
                        }
                      />
                      
                    </div>
                  </Col>
                  
                  
                </Row>
        </div>
        <br/>
        <div className="flex justify-end  ant-modal-footer px-0 border-t-0">
          <Button
            className="mx-2 ant-btn-primary rounded-lg"
            onClick={() => {
            
             
              // history.push('/dispatch/list');
            }}
          >
            Cancel
          </Button>
          <Button className=" ant-btn rounded-lg" onClick={() => {
              setIsConfirmModalVisible(false);
              setDispatchPayload(null);
              // history.push('/dispatch/list');
            }}>
           Confirm
          </Button>
        </div>
      
      </Modal>
      
    </FormikProvider>
</Col>
       {/* {showHelpModal && (
          <Col span={4}>
            <Help
              // template={<CompleteDispatchNotification />}
              helpToggle={showHelpModal}
              onHelpClick={() => setShowHelpModal(!showHelpModal)}
            />
          </Col>
        )}*/}
</Row>
</>
  
  );
};

export default CompletedDispatchNotification;

import { Button, Col, Row, Steps } from "antd";
import React, { useContext, useState, useEffect } from "react";
import { DispatchNotification } from "./DispatchNotification";
import { DispatchEquipment } from "./DispatchEquipment";
import { AddOperator } from "./AddOperator";
import * as Yup from "yup";
import { Form, FormikProvider, useFormik } from "formik";
 import { Wizard } from "../components/Wizard";
import {AppContext} from "../components/Context/AppContext"

export const DispatchCreate = (props) => {
  const [current, setCurrent] = useState(0);
  const [query, setQuery] = useState(null);
  const [data, setData] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState({});
  const ctx = useContext(AppContext);
  const [notificationPayload, setNotificationPayload] = useState(null);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [operatorList, setOperatorList] = useState([]);

  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };


  const steps = [
    {
      title: "Select Equipment",
      content: (
       <DispatchEquipment 
          current={current}
          handleNext={next}
          data={data}
          setData={setData}
          selectedDevice={selectedDevice}
          handleDeviceSelection={(value) => setSelectedDevice(value)}
          query={query}
          handleEquipmentSearch={(val) => setQuery(val)}
          setQuery={setQuery}
          ctx={ctx}       
       />

       // <div>dsds</div>
      ),
    },
    {
      title: "Create Dispatch Notification",
      content: (
        <DispatchNotification
        handlePrev={prev}
        handleNext={next}
        handleClose={props.onClose}
        value={selectedDevice}
        selectedDevice={selectedDevice}
        notificationPayload={notificationPayload}
        setNotificationPayload={setNotificationPayload}  
          />
      ),
    },
    {
      title: "Add Operator",
      content: (
        <AddOperator 
        current={current}
        handlePrev={prev}
        handleClose={props.onClose}
        setIsConfirmModalVisible={setIsConfirmModalVisible}
        notificationPayload={notificationPayload}
        setNotificationPayload={setNotificationPayload}
        isConfirmModalVisible={isConfirmModalVisible}
        operatorList={operatorList}
        />
      ),
    },
  ];
  return (
    <Wizard
      steps={steps}
      current={current}
      className="step-width"
      classes="wizard-header"
    />
  )
}
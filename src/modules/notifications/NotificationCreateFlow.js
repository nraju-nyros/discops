import { Button, Col, Row, Steps } from "antd";
import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../components/store/app-context";
import { NotificationsCreateRequest } from "./NotificationsCreateRequest";
import { NotificationsDeviceList } from "./NotificationsDeviceList";
import { useHistory } from "react-router-dom";
 import { Wizard } from "../components/Wizard";
import { SearchBox } from "../components/common/SearchBox";
// import CreateNotification from "../HelpTemplates/Notifications/CreateNotification";
import { useNavigate } from "react-router-dom";


export const NotificationCreateFlow = ({
  handleClose,
  handleCreate,
  showModal,
  handleDeviceSelection,
  onClose,
}) => {
  const ctx = useContext(AppContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [sortByValue, setSortByValue] = useState("name");
  const [orderByValue, setOrderByValue] = useState("ASC");
  const [offsetValue, setOffsetValue] = useState(0);
  const [searchValue, setSearchValue] = useState("dev");
  const [current, setCurrent] = useState(0);
  const [selectedDevice, setSelectedDevice] = useState({});
  const [deviceList, setDeviceList] = useState([]);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState(null);

  const getDeviceList = async (
    searchBy = searchValue,
    sortBy = sortByValue,
    orderBy = orderByValue,
    offset = offsetValue,
    limit = pageSize
  ) => {
    let queryParams = {
      search: searchBy,
      sortBy: sortBy,
      orderBy: orderBy,
      offset: offset,
      limit: limit,
    };
    const response = await ctx.HttpGetList("/notification/list", queryParams);
    if (response) {
      setDeviceList(response.Data);
    }
  };

  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  let history = useNavigate();

  const handleCloseModal = () => {
    // setCurrent(0);
    // setSelectedDevice("");
    // handleClose();
    // history.push("/notifications");
  };
  // const getQueryData = async (val) => {
  //   setIsLoading(true);
  //   try {
  //     const res = await ctx.HttpGetList(
  //       `/notification/equipments?search=${val}`
  //     );
  //     if (res) {
  //       setIsLoading(false);
  //       res?.Data.forEach((element) => (element.isActive = false));
  //       setData(res.Data);
  //     }
  //   } catch (err) {
  //     setIsLoading(false);
  //   }
  // };

  useEffect(() => {
    if (history?.location?.state?.selectedEquipment) {
      setSelectedDevice(history.location.state.selectedEquipment);
      setCurrent(1);
      history.push({
        state: { ...history.location.state, selectedEquipment: null },
      });
    }
  }, []);

  const steps = [
    {
      title: "Select Equipment",
      content: (
        <NotificationsDeviceList
          current={current}
          handleNext={next}
          data={data}
          setData={setData}
          ctx={ctx}
          handleClose={handleCloseModal}
          selectedDevice={selectedDevice}
          handleDeviceSelection={(value) => setSelectedDevice(value)}
          query={query}
          handleEquipmentSearch={(val) => setQuery(val)}
          setQuery={setQuery}
        />
      ),
    },
    {
      title: "Create Notification",
      content: (
        <NotificationsCreateRequest
          current={current}
          value={selectedDevice}
          selectedDevice={selectedDevice}
          handlePrev={prev}
          onClose={onClose}
          getDeviceList={getDeviceList}
          handleCreate={handleCreate}
        />
      ),
    },
  ];

  return (
    <Wizard
      steps={steps}
      current={current}
      classes="wizard-header"
      // helpTemplate={<CreateNotification />}
    />
  );
};

import { PlusOutlined } from "@ant-design/icons";
import { Button, Checkbox, Col, Modal, Row, Tooltip } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useHistory, Link } from "react-router-dom";

import { DataTable, DataTypes } from "../components/Customs/DataTable";
import { Layout } from "../components/layout";
import { AppContext } from "../components/store/app-context";
import { SideDrawer } from "../components/SideDrawer";
import { WorkInProcessSearch } from "./WorkInProcessSearch";
import NotificationsExpandableView from "./NotificationsExpandableView";
import { SearchBox } from "../components/common/SearchBox";

export const WorkInProcessWorkOrderList = () => {
  const ctx = useContext(AppContext);
  const searchIcon = {
    backgroundImage:
      'url( {process.env.PUBLIC_URL + "/images/icons/search.svg"})',
    backgroundPosition: "center left",
    backgroundRepeat: "no-repeat",
  };

  const [response, setResponse] = useState([]);
  const [notificationList, setNotificationList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessModalUpdate, setIsSuccessModalUpdate] = useState(false);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [totalNotifications, setTotalNotifications] = useState(0);
  const [pageSize, setPageSize] = useState(100);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [sortByValue, setSortByValue] = useState("");
  const [orderByValue, setOrderByValue] = useState("");
  const [offsetValue, setOffsetValue] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [levelRecord, setLevelRecord] = useState([]);
  const [UpdateModel, setUpdateModel] = useState(false);
  const [notificationPayload, setNotificationPayload] = useState(null);
  const [updateNotificationModel, setUpdateNotificationModel] = useState(false);
  const [updateStatus, seupdateStatus] = useState(0);
  const [notificationTypeList, setNotificationTypeList] = useState([]);
  const [page, setPage] = useState(1);
  const [sortfilterStatus, setSortFilterStatus] = useState(false);
  const [advanceFilterData, setAdvanceFilterData] = useState({
    notificationNumber: "",
    material: "",
    includeCompletedNotifications: "",
    notificationType: "",
    last90Days: true,
    startDate: "",
    endDate: "",
  });
  let material = advanceFilterData?.material;
  let notificationNumber = advanceFilterData?.notificationNumber;
  let includeCompletedNotifications =
    advanceFilterData?.isCompletedNotification;
  let notificationType = advanceFilterData?.searchNotificationType;
  let startDate = advanceFilterData?.date && advanceFilterData.date[0];
  let endDate = advanceFilterData?.date && advanceFilterData.date[1];
  var search1 = searchValue && searchValue;

  useEffect(() => {
    if (isFilterModalVisible === true) {
      setOffsetValue(1);
      setPage(1);
    }
    paginationOnAdvanceFilter();
    getNotificationList();
  }, [
    searchValue,
    currentLevel,
    offsetValue,
    updateStatus,
    advanceFilterData,
    isFilterModalVisible,
    response,
  ]);

  useEffect(() => {
    if (!notificationTypeList.length) getNotificationsType();
  }, []);
  const getNotificationList = (
    searchBy = searchValue,
    sortBy = sortByValue,
    orderBy = orderByValue,
    offset = offsetValue,
    limit = pageSize
  ) => {
    let queryParams = {
      level: currentLevel,
      orgId: currentLevel === 1 ? null : levelRecord[currentLevel - 2].id,
      search: searchBy,
      sortBy: sortBy,
      orderBy: orderBy,
      offset: offset,
      limit: limit,
      UseAdvancedFilter: true,
      IncludeCompletedNotifications: true,
      NotificationNumber: advanceFilterData?.notificationNumber,
      Material: advanceFilterData?.material,
      NotificationType: advanceFilterData?.searchNotificationType,
      Last90Days: advanceFilterData?.dateRange,
      StartDate: `${
        advanceFilterData?.startDate && advanceFilterData.startDate
      }`,
      EndDate: `${advanceFilterData?.endDate && advanceFilterData.endDate}`,
    };
    // const response = list;
    fetch("https://62a19ef0cd2e8da9b0f56b79.mockapi.io/api/v6/workorders")
      .then((res) => res.json())
      .then((json) => {
        // setNotificationList(json)
        setResponse(json);
        console.log("response", json);
      });
    var newList = response.filter((item) => {
      return item.AdminNo.indexOf(search1) > -1;
    });

    var newFilterList = response.filter((item) => {
      return (
        item.AdminNo.toLowerCase().indexOf(queryParams.NotificationNumber) > -1
      );
    });

    if (search1 === undefined && notificationNumber.length > 0 && response) {
      console.log("printing newFilterList ", newFilterList);
      setNotificationList(newFilterList);
      setTotalNotifications(newFilterList.length);
    } else if (
      search1 !== undefined &&
      notificationNumber.length === 0 &&
      response
    ) {
      console.log("inside else if condition ");
      console.log("printing newList ", newList);
      setNotificationList(newList);
      setTotalNotifications(newList.length);
    } else {
      console.log("inside else condition ");
      setNotificationList(response);
      setTotalNotifications(response.length);
    }
  };

  const paginationOnAdvanceFilter = () => {
    var filterStatus = false;
    if (
      (typeof material === "undefined" ||
        material === "" ||
        material === null) &&
      (typeof notificationNumber === "undefined" ||
        notificationNumber === "" ||
        notificationNumber === null) &&
      typeof includeCompletedNotifications === "undefined" &&
      typeof notificationType === "undefined" &&
      typeof startDate === "undefined" &&
      typeof endDate === "undefined"
    ) {
    } else if (
      startDate & endDate &&
      typeof (
        material === "undefined" ||
        material === "" ||
        material === null
      ) &&
      typeof (
        notificationNumber === "undefined" ||
        notificationNumber === "" ||
        notificationNumber === null
      ) &&
      typeof (
        includeCompletedNotifications === false ||
        typeof includeCompletedNotifications === "undefined"
      ) &&
      typeof (notificationType === "undefined")
    ) {
    } else if (
      typeof includeCompletedNotifications === "undefined" &&
      notificationType !== "" &&
      search1 !== ""
    ) {
      setAdvanceFilterData("");
      setSortFilterStatus(false);
    } else if (
      includeCompletedNotifications === true &&
      notificationType !== "" &&
      search1 !== ""
    ) {
      setAdvanceFilterData("");
      setSortFilterStatus(false);
    } else if (search1) {
      setAdvanceFilterData("");
      setSortFilterStatus(false);
    } else {
      filterStatus = true;
      setSortFilterStatus(true);
    }
    getNotificationList(
      searchValue,
      sortByValue,
      orderByValue,
      offsetValue,
      pageSize,
      filterStatus
    );
  };

  const priorityObject = {
    1: <span className="opacity-border-red">High (X)</span>,
    2: <span className="opacity-border-orange">Medium</span>,
    3: <span className="opacity-border-green">Low</span>,
  };
  const syncStatusObj = {
    3: <span className="status-border-failed">Failed</span>,
    1: <span className=" status-border-process ">In process</span>,
    2: <span className=" status-border-success ">Success</span>,
  };

  const operObject = {
    FMC: "/images/icons/api-notifications-icon-fmc.svg",
    NMCM: "/images/icons/api-notifications-icon-nmcm.svg",
    NMCS: "/images/icons/api-notifications-icon-nmcs.svg",
  };

  const techStatus = {
    BIO: "/images/icons/api-notifications-icon-bio.svg",
    CHEM: "/images/icons/api-notifications-icon-chem.svg",
    CX: "/images/icons/api-notifications-icon-cx.svg",
    DA: "/images/icons/api-notifications-icon-da.svg",
    DI: "/images/icons/api-notifications-icon-di.svg",
    E: "/images/icons/api-notifications-icon-e.svg",
    NUKE: "/images/icons/api-notifications-icon-nuke.svg",
    TICL: "/images/icons/api-notifications-icon-ticl.svg",
    CLR: "/images/icons/api-notifications-icon-ticl.svg",
    X: "/images/icons/api-notifications-icon-x.svg",
  };

  const columns = [
    {
      title: "Order No.",
      dataIndex: "DocumentNo",
      key: "DocumentNo",
      type: DataTypes.CUSTOM,
      width: "7vw",
      sorter: true,
    },
    {
      title: "Order Type",
      dataIndex: "AdminNo",
      key: "AdminNo",
      type: DataTypes.CUSTOM,
      width: "7vw",
      fixed: "left",
      sorter: true,
    },
    {
      title: "Order Desc.",
      dataIndex: "OperStatus",
      key: "OperStatusName",
      type: DataTypes.CUSTOM,
      width: "8vw",
      sorter: true,
      render: (text, record) => {
        return (
          <div className="flex">
            {record.OperStatus ? (
              <Tooltip placement="topLeft" title={record.OperStatus}>
                <img
                  src={operObject[record.OperStatus]}
                  className="w-1/6 mr-2"
                  alt="record.OperStatus"
                />
              </Tooltip>
            ) : (
              "-"
            )}
            <span>{record.OperStatus}</span>
          </div>
        );
      },
    },
    {
      title: "material no.",
      dataIndex: "Description",
      key: "Description",
      type: DataTypes.CUSTOM,
      width: "8vw",
      sorter: true,
    },
    {
      title: "SYNC STATUS",
      dataIndex: "InProgress",
      key: "InProgress",
      type: DataTypes.CUSTOM,
      width: "7vw",
      sorter: true,
      render: (text, record) => {
        return (
          <div className="flex">
            {record.InProgress ? syncStatusObj[record.InProgress] : "-"}
          </div>
        );
      },
    },
    {
      title: "PRIORITY",
      dataIndex: "Priority",
      key: "PriorityName",
      type: DataTypes.CUSTOM,
      width: "8vw",
      sorter: true,
      render: (text, record) => priorityObject[record.Priority],
    },
    {
      title: "PRIORITY type",
      dataIndex: "Description",
      key: "Description",
      type: DataTypes.CUSTOM,
      width: "8vw",
      sorter: true,
    },
    {
      title: " Equip work ctr",
      dataIndex: "SerialNo",
      key: "SerialNo",
      type: DataTypes.CUSTOM,
      width: "8vw",
      sorter: true,
    },
    {
      title: "Equipment no.",
      dataIndex: "EquipmentNumber",
      key: "EquipmentNumber",
      type: DataTypes.CUSTOM,
      width: "7vw",
      sorter: true,
    },
    {
      title: "Model no. no.",
      dataIndex: "EquipmentNumber",
      key: "EquipmentNumber",
      type: DataTypes.CUSTOM,
      width: "7vw",
      sorter: true,
    },
  ];

  const clearFilter = () => {
    setIsFilterModalVisible(false);
    setAdvanceFilterData("");
    setSortByValue(false);
    setOffsetValue(1);
    setPage(1);
    setSortFilterStatus(false);
  };

  const cancel = () => {
    setIsFilterModalVisible(false);
    //setOffsetValue(1);
    //setPage(1);
  };

  const notificationtypelist = [
    {
      Id: "CE",
      Value: "CE-Controlled Exchange",
    },
    {
      Id: "M1",
      Value: "M1-Maintenance Request",
    },
    {
      Id: "ML",
      Value: "ML-MEL-MaintExpLimit",
    },
    {
      Id: "MW",
      Value: "MW-MWO Modification WO",
    },
    {
      Id: "O1",
      Value: "O1-Oil Sample Request",
    },
    {
      Id: "O2",
      Value: "O2-Oil Sample Action",
    },
    {
      Id: "PM",
      Value: "PM-Preventive Maint Due",
    },
    {
      Id: "Z1",
      Value: "Z1-copy w/ref",
    },
  ];
  const getNotificationsType = async () => {
    if (notificationTypeList.length) return notificationTypeList;

    const response = notificationtypelist;
    if (response) {
      console.log(response);
      setNotificationTypeList(response);
      return response;
    }
  };

  const notificationsInputs = [
    {
      label: "Notification No.",
      variable: "notificationNumber",
      type: "customInput",
    },
    {
      label: "Material",
      variable: "material",
      type: "customInput",
    },
    {
      label: "Notification Type",
      variable: "searchNotificationType",
      type: "selectDropDown",
      dropDownOptions: !notificationTypeList.length
        ? getNotificationsType()
        : notificationTypeList,
    },
    {
      label: "Date range",
      variable: "dateRange",
      type: "dateRange",
    },
  ];

  let history = useNavigate();

  useEffect(() => {
    if (
      history?.location?.state?.selectedEquipment ||
      history?.location?.state?.startFlow
    ) {
      setIsModalVisible(true);
    }
  }, []);

  const showFilterPopup = () => {
    setIsFilterModalVisible(!isFilterModalVisible);
    return (
      <WorkInProcessSearch
        advanceFilterData={advanceFilterData}
      ></WorkInProcessSearch>
    );
  };

  return (
    <>
      <div className="flex items-center mb-4">
        <div style={searchIcon}>
          <div className="flex custom-search">
            <SearchBox
              placeholder={"Search"}
              searchOnModule={"Material"}
              onChange={(value) => {
                setSearchValue(value);
                getNotificationList();
              }}
              className="border border-red-800"
            />
          </div>
        </div>

        <div className="my-auto">
          <Button
            className="pl-2"
            onClick={(value) => {
              showFilterPopup(value);
            }}
            type="link"
          >
            <div className="flex">
              <img src={"/images/icons/filter.svg"} alt="filter" />
              <span className="text-h1 font-medium text-regent-gray ml-2">
                Filter
              </span>
            </div>
          </Button>
        </div>
      </div>
      <DataTable
        columns={columns}
        dataSource={notificationList}
        showActionButton={false}
        rowKey={"Id"}
        showViewMoreExpandable={true}
        expandIconColumnIndex={8}
        expandableView={NotificationsExpandableView}
        pagination={false}
        totalRecords={totalNotifications}
        Checkbox={Checkbox}
        pageSize={pageSize}
        currentPage={page}
        onChange={(pageSizeOptions, filterOptions, sorterOptions) => {
          let sortOrderValue = "";
          if (sorterOptions && sorterOptions.order) {
            sortOrderValue = sorterOptions.order === "ascend" ? "ASC" : "DESC";
            setOrderByValue(sortOrderValue);
            setSortByValue(sorterOptions.columnKey);
          }
          setOffsetValue(pageSizeOptions.current);
          setPage(pageSizeOptions.current);
          setPageSize(pageSizeOptions.pageSize);
          getNotificationList(
            searchValue,
            sorterOptions.columnKey,
            sortOrderValue,
            pageSizeOptions.current,
            pageSizeOptions.pageSize
          );
        }}
      />
      {isFilterModalVisible && (
        <SideDrawer
          showModal={true}
          isFooterVisible={null}
          wrapperClassName=" custom-modal left-search-bar custom-width-modal animate-right"
          hideCui={true}
          hideCancel={true}
        >
          <WorkInProcessSearch
            advanceFilterData={advanceFilterData}
            handleClose={clearFilter}
            cancel={cancel}
            setIsFilterModalVisible={setIsFilterModalVisible}
            setAdvanceFilterData={setAdvanceFilterData}
            inputs={notificationsInputs}
          />
        </SideDrawer>
      )}
    </>
  );
};

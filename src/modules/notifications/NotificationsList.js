import {
  PlusOutlined,
  QuestionCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";

import {
  Table,
  Button,
  Checkbox,
  Col,
  Modal,
  Row,
  Tooltip,
  Input,
  Typography,
} from "antd";
import { AppContext } from "../components/store/app-context";

import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useHistory, Link } from "react-router-dom";
// import { DispatchCreate } from "./DispatchCreate";
import { SideDrawer } from "../components/SideDrawer";
import { CustomInput } from "../components/Customs/CustomInput";

import "antd/dist/antd.css";
// import { DataTable, DataTypes } from "../../Core/common/DataTable";
import { DataTable, DataTypes } from "../components/Customs/DataTable";
import { Layout } from "../components/layout";
import { NotificationCreateFlow } from "./NotificationCreateFlow";
import { NotificationSearch } from "./NotificationSearch";



const { Title } = Typography;
export const NotificationsList = () => {
  const ctx = useContext(AppContext);
  // const accessObject = ctx.userInfo.UserAccess;
    const [response, setResponse] = useState([]);
  const [notificationList, setNotificationList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [isSuccessModalUpdate, setIsSuccessModalUpdate] = useState(false);
  const [isSuccessModalDelete, setIsSuccessModalDelete] = useState(false);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [totalNotifications, setTotalNotifications] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [sortByValue, setSortByValue] = useState("");
  const [orderByValue, setOrderByValue] = useState("");
  const [offsetValue, setOffsetValue] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [levelRecord, setLevelRecord] = useState([]);
  const [isDeleteModal, setisDeleteModal] = useState(false);
  const [isReprocess, setIsReprocess] = useState(false);
  const [currentRow, setCurrentRow] = useState(null);
  const [error, setError] = useState(null);
  const [updateModel, setUpdateModel] = useState(false);
  const [current, setCurrent] = useState(0);
  const [selectedDevice, setSelectedDevice] = useState("0");
  const [notificationPayload, setNotificationPayload] = useState(null);
  const [editValues, setEditValues] = useState([]);
  const [updateNotificationModel, setUpdateNotificationModel] = useState(false);
  const [updateStatus, seupdateStatus] = useState(0);
  const [page, setPage] = useState(1);
  const [sortfilterStatus, setSortFilterStatus] = useState(false);
  const [resequipment, setEquipment] = useState([]);
  const [draw, setDraw] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);

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
  let includeCompletedNotifications = advanceFilterData?.isCompletedNotification;
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
    response
  ]);

  const list = [
    {
      AdminNo: "C11",
      Coding: "680",
      CreatedBy: "DEVUSER1@shipcomwireless.com",
      CreatedOn: "05/23/2022 05:33:09",
      DefectGroup: "AMG",
      DefectLocation: "AMH",
      Description: "steve class changes 5.9",
      DocumentNo: "103",
      EquipmentNo: "000000001011212104",
      Id: "a83e19f5-0ad9-43b3-a2fc-dab78190dbb4",
      InProcess: 1,
      Material: "014360005",
      ModelNo: "M2A3",
      NotifTime: "05:33:09",
      OperStatus: "OperStatus 001",
      OrgCode: "WAH0C0",
      ParentId: "172514af-e10a-48bb-8432-01b07445b0b9",
      Priority: "2",
      PriorityName: "2-Medium",
      ProcessStatus: 3,
      ProcessStatusName: "Completed",
      Remarks: "steve class changes 5.9 remarks",
      SerialNo: "2AGR0666Y",
      StartDate: "20220509",
      Status: 1,
      StorageLoc: "CEPB",
      SyncCode: 2,
      SyncText: "Pending",
      TechStatus: "E0003",
      TechStatusIcon: "BIO",
      TechStatusName: "BIO-Biological Cont",
      Type: "M1",
      TypeName: "M1-Maintenance Request",
      UpdatedBy: "DEVUSER1@shipcomwireless.com",
      UpdatedOn: "2022-05-09 05:36:38",
      WorkOrderNo: "WORK-688",
    },
    {
      AdminNo: "WAH0C0-",
      CauseCode: "068",
      Coding: "777",
      CreatedBy: "DEVUSER1@shipcomwireless.com",
      CreatedOn: "08/04/1998 04:47:55",
      DefectGroup: "AMG",
      DefectLocation: "DPM",
      DocumentNo: "199",
      Description: "steve test 5.8",
      EquipmentNo: "000000001011182894",
      Id: "1b9b62a1-6d9a-482b-9181-7ab38920556d",
      InProcess: 1,
      Material: "009739533",
      ModelNo: "",
      NotifTime: "04:47:55",
      OperStatus: "OperStatus 403",
      OrgCode: "WAH0C0",
      ParentId: "a2d5e68b-2fed-4385-bc55-a5cc7c39b85d",
      Priority: "1",
      PriorityName: "1-High (X)",
      ProcessStatus: 2,
      ProcessStatusName: "InProcess",
      Remarks: "steve test 5.8 remarks",
      SerialNo: "356405U",
      StartDate: "20220509",
      Status: 1,
      StorageLoc: "CEP8",
      SyncCode: 2,
      SyncText: "Pending",
      TechStatus: "E0007",
      TechStatusIcon: "CX",
      TechStatusName: "CX-Circle X",
      Type: "M1",
      TypeName: "M1-Maintenance Request",
      UpdatedBy: "DEVUSER1@shipcomwireless.com",
      UpdatedOn: "2022-05-09 04:48:39",
      WorkOrderNo: "WORK-676",
    },
    {
      AdminNo: "UIC   -",
      CauseCode: "115",
      Coding: "360",
      CreatedBy: "DEVUSER1@shipcomwireless.com",
      CreatedOn: "05/05/1997 04:37:16",
      DocumentNo: "129",
      DefectGroup: "",
      DefectLocation: "",
      Description: "test",
      EquipmentNo: "000000001016587025",
      Id: "2f4c5032-aa12-4c43-a790-cf9435c1cefd",
      ModelNo: "",
      OperStatus: "OperStatus 333",
      Priority: "2",
      PriorityName: "2-Medium",
      ProcessStatus: 2,
      ProcessStatusName: "InProcess",
      Remarks: "test",
      SerialNo: "010520",
      Status: 1,
      SyncCode: 2,
      SyncText: "Pending",
      TechStatus: "E0006",
      TechStatusIcon: "E",
      TechStatusName: "E-Admin Deadline",
      Type: "M1",
      TypeName: "M1-Maintenance Request",
      UpdatedBy: "DEVUSER1@shipcomwireless.com",
      UpdatedOn: "2022-05-09 04:37:43",
      WorkOrderNo: "WORK-199",
    },
    {
      AdminNo: "WAH0C0-",
      CauseCode: "099",
      Coding: "777",
      CreatedBy: "DEVUSER1@shipcomwireless.com",
      CreatedOn: "10/04/2014 03:19:26",
      DocumentNo: "181",
      DefectGroup: "",
      DefectLocation: "",
      Description: "tech statsus",
      EquipmentNo: "000000001011202839",
      Id: "9779c4f5-cac7-40fe-bc11-74b5af9cdaaa",
      ModelNo: "",
      OperStatus: "OperStatus 223",
      Priority: "2",
      PriorityName: "2-Medium",
      ProcessStatus: 2,
      ProcessStatusName: "InProcess",
      Remarks: "tech statsus",
      SerialNo: "109516",
      Status: 1,
      SyncCode: 2,
      SyncText: "Pending",
      TechStatus: "E0001",
      TechStatusIcon: "TICL",
      TechStatusName: "TICL-TI Cleared",
      Type: "M1",
      TypeName: "M1-Maintenance Request",
      UpdatedBy: "DEVUSER1@shipcomwireless.com",
      UpdatedOn: "2022-05-09 04:36:17",
      WorkOrderNo: "WORK-123",
    },
  ];
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
      UseAdvancedFilter: sortfilterStatus,
      NotificationNumber: advanceFilterData?.notificationNumber,
      Material: advanceFilterData?.material,
      IncludeCompletedNotifications: advanceFilterData?.isCompletedNotification,
      NotificationType: advanceFilterData?.searchNotificationType,
      Last90Days: advanceFilterData?.dateRange,
      StartDate: `${
        advanceFilterData?.startDate && advanceFilterData.startDate
      }`,
      EndDate: `${advanceFilterData?.endDate && advanceFilterData.endDate}`,
    };
    // const response = list;
    let result = [];
    // console.log("hhghgh", search1,advanceFilterData);

    // if(advanceFilterData.notificationNumber != ''){
    //   alert("FILTERS")
    // }


      fetch("https://62a31d955bd3609cee63046f.mockapi.io/api/v7/notifications")
    .then((res) => res.json())
    .then((json) => {
      // setNotificationList(json)
      setResponse(json)
      console.log("response",json)
    })

    // var newlist = response.filter((item) => {
    //   return item.DocumentNo.toLowerCase().indexOf(search1) > -1;
    // })

    // var newFilterList = response.filter((item) => {
    //   return item.DocumentNo.toLowerCase().indexOf(queryParams.NotificationNumber) > -1
    //   && item.Type.indexOf(queryParams.Material) > -1;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
    // })

    // if(search1 === undefined && queryParams.notificationNumber === undefined && response){
    //   setNotificationList(response)
    //   setTotalNotifications(response.length)
    // }
    // else if(search1 !== undefined && queryParams.NotificationNumber === undefined && response){
    //   setNotificationList(newlist)
    //   setTotalNotifications(newlist.length)
    // }else{
    //   setNotificationList(newFilterList)
    //   setTotalNotifications(newFilterList.length)
    // }


    result = response.filter((item) => {
      return (
        item.DocumentNo.toString().toLowerCase().indexOf(search1) >= 0 ||
        item.DocumentNo.toString().toLowerCase().indexOf(search1) >= 0
      );
    });
    setNotificationList(result);
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

  const deleteModel = async (clickedItem) => {
    try {
      if (clickedItem.props.children.match("Close")) {
        await setisDeleteModal(true);
      }
      if (
        clickedItem.props.children.match("Display/Change") ||
        clickedItem.props.children.match("Display")
      ) {
        setUpdateModel(true);
        const editiData1 = notificationList.filter((n) => {
          return n.Id === currentRow;
        });
        const editiData = editiData1.map((Item) => {
          return { ...Item, Id: currentRow };
        });
        setEditValues(editiData);
      }
      if (clickedItem.props.children.match("Reprocess")) {
        await setIsReprocess(true);
        const reprocess = notificationList.filter((n) => {
          return n.Id === currentRow;
        });
        setEquipment(reprocess);
        console.log("Reprocess");
      }
    } catch (err) {}
  };

  const deleteNotification = async () => {
    let id = currentRow && currentRow;

    if (id) {
      try {
        setIsLoading(true);
        const response = await ctx.HttpDelete("/notification", { id });
        if (response) {
          setIsLoading(false);
          setisDeleteModal(false);
          setIsReprocess(false);
          setNotificationPayload(response);
          if (updateStatus === 1) {
            seupdateStatus(0);
          } else {
            seupdateStatus(1);
          }
          setIsSuccessModalDelete(true);
        } else {
          setIsLoading(false);
          setNotificationPayload(null);
          setIsSuccessModalDelete(true);
        }
      } catch (err) {}
    } else {
      // setNotificationPayload(null);
      setisDeleteModal(false);
    }
  };

  const reprocessNotification = async () => {
    let id = currentRow && currentRow;

    if (id) {
      try {
        setIsLoading(true);
        setIsReprocess(false);
      } catch (err) {}
    } else {
      // setNotificationPayload(null);
      setIsReprocess(false);
    }
  };

  const priorityObject = {
    1: <span className="opacity-border-red">High (X)</span>,
    2: <span className="opacity-border-orange">Medium</span>,
    3: <span className="opacity-border-green">Low</span>,
  };
  const syncStatusObj = {
    0: <span className=" status-border-process ">Created</span>,
    1: <span className=" status-border-process ">Sent</span>,
    2: <span className=" status-border-process ">Pending</span>,
    3: <span className=" status-border-success ">Processed</span>,
    4: <span className="status-border-failed">Error</span>,
  };

  const columns = [
    {
      title: "Notification",
      dataIndex: "DocumentNo",
      key: "DocumentNo",
      type: DataTypes.CUSTOM,
      width: "9vw",
      fixed: "left",
      sorter: true,
    },
    // {
    //   title: "Assigned to W/O",
    //   dataIndex: "ParentId",
    //   type: DataTypes.CUSTOM,
    //   width: "7vw",
    //   fixed: "left",
    //   sorter: true,
    //   render: (text, record) => {
    //     if (record.ParentId) {
    //       return (
    //         <div className="text-dash-green-dark">
    //           <CheckOutlined />
    //         </div>
    //       );
    //     } else {
    //       return (
    //         <div className="text-punch">
    //           <CloseOutlined />
    //         </div>
    //       );
    //     }
    //   },
    // },
    {
      title: "Sync Status",
      dataIndex: "SyncCode",
      key: "SyncCode",
      type: DataTypes.CUSTOM,
      width: "8vw",
      sorter: true,
      render: (text, record) => {
        return (
          <div className="flex">
            <Tooltip placement="topLeft" title={record.SyncText}>
              {record.SyncCode ? syncStatusObj[record.SyncCode] : "-"}
            </Tooltip>
          </div>
        );
      },
    },
    {
      title: "Type",
      dataIndex: "Type",
      key: "Type",
      type: DataTypes.CUSTOM,
      width: "5vw",
      sorter: true,
      sortType: "Type",
      render: (text, record) => {
        return (
          <div>
            {record.TypeName ? (
              <Tooltip placement="topLeft" title={record.TypeName}>
                {record.Type}
              </Tooltip>
            ) : (
              "-"
            )}
          </div>
        );
      },
    },
    {
      title: "Tech Status",
      dataIndex: "TechStatus",
      key: "TechStatusName",
      type: DataTypes.CUSTOM,
      width: "8vw",
      sorter: true,
      render: (text, record) => {
        return (
          <div className="flex">
            {record.TechStatusIcon ? (
              <Tooltip placement="topLeft" title={record.TechStatusName}>
                <img
                  src={`/images/icons/api-notifications-icon-${record.TechStatusIcon}.svg`}
                  className="w-1/6 mr-2"
                  alt={record.TechStatusIcon}
                />
              </Tooltip>
            ) : (
              "-"
            )}
            <span>{record.TechStatusIcon}</span>
          </div>
        );
      },
    },
    {
      title: "Create Date",
      dataIndex: "CreatedOn",
      key: "CreatedOn",
      type: DataTypes.DATE,
      width: "8vw",
      sorter: false,
    },
    {
      title: "Priority",
      dataIndex: "Priority",
      key: "PriorityName",
      type: DataTypes.CUSTOM,
      width: "8vw",
      sorter: true,
      render: (text, record) => priorityObject[record.Priority],
    },
    {
      title: "Description",
      dataIndex: "Description",
      key: "Description",
      type: DataTypes.CUSTOM,
      width: "8vw",
    },
    {
      title: "Admin No",
      dataIndex: "AdminNo",
      key: "AdminNo",
      width: "10vw",
      type: DataTypes.CUSTOM,
      sorter: true,
    },
    {
      title: "Work Order",
      dataIndex: "WorkOrderNo",
      key: "WorkOrderNo",
      type: DataTypes.CUSTOM,
      width: "7vw",
      return: () => " ",
    },
  ];

  // let actionButtonItems = accessObject.includes("DeleteNotification")
  //   ? [
  //       <span className="p-2">
  //         {accessObject.includes("PutNotification")
  //           ? "Display/Change"
  //           : "Display"}
  //       </span>,
  //       <span className="p-2">Close</span>,
  //       <span className="p-2">Reprocess</span>,
  //     ]
  //   : [
  //       <span className="p-2">
  //         {accessObject.includes("PutNotification")
  //           ? "Display/Change"
  //           : "Display"}
  //       </span>,
  //       <span className="p-2">Reprocess</span>,
  //     ];

  const handleNotificationUpdate = async (payload) => {
    if (notificationPayload) {
      setIsLoading(true);
      try {
        const response = await ctx.HttpPut(
          "/Notification",
          notificationPayload
        );
        if (response) {
          setIsLoading(false);
          //setUpdateModel(false);
          setUpdateNotificationModel(false);
          setNotificationPayload(response);
          setIsSuccessModalUpdate(true);
          if (updateStatus === 1) {
            seupdateStatus(0);
          } else {
            seupdateStatus(1);
          }
        } else {
          setIsLoading(false);
          setUpdateModel(false);
          setUpdateNotificationModel(false);
          setNotificationPayload(null);
        }
      } catch (err) {}
    } else {
      setNotificationPayload(payload);
      setUpdateModel(true);
    }
  };
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

  const showFilterPopup = () => {
    setIsFilterModalVisible(!isFilterModalVisible);
    setSortFilterStatus(!sortfilterStatus);
    console.log("inside showfilterPopup ", advanceFilterData);
    return (
      <NotificationSearch
        advanceFilterData={advanceFilterData}
      ></NotificationSearch>
    );
  };

  const toggleHelp = () => {
    setShowHelpModal(!showHelpModal);
    return showHelpModal;
  };

  let history = useNavigate();

  useEffect(() => {
    if (
      history?.location?.state?.selectedEquipment ||
      history?.location?.state?.startFlow
    ) {
      setIsModalVisible(true);
    }
  }, []);
  
  return (
    <Layout
      page="notifications"
      title="Notifications"
      subTitle="Manage notifications here"
      pageTitleButton={true}
      buttonLabel={"Create Notification"}
      //   pageTitleButtonDisabled={!accessObject.includes("PostNotification")}
      searchPlaceholder="Search by Number, Type, or Material"
      showSearch={true}
      onSearchChange={(value) => {
        setSearchValue(value);
        getNotificationList(value,"searchFilter");
      }}
      buttonIcon={
        <PlusOutlined style={{ color: "#4E2C90" }} className="flex m-auto" />
      }
      showFilter={true}
      onFilterClick={showFilterPopup}
      buttonOnClick={() => setIsModalVisible(true)}
      showHelp={true}
      helpText={"Help"}
      helpIcon={<QuestionCircleOutlined />}
    >
      <DataTable
        columns={columns}
        dataSource={notificationList}
        showActionButton={true}
        onActionButtonClick={(record) => {
          setCurrentRow(record.Id);
        }}
        actionButtonItemClick={(clickedItem) => deleteModel(clickedItem)}
        actionButtonItems={notificationList}
        pagination={true}
        totalRecords={totalNotifications}
        Checkbox={Checkbox}
        pageSize={pageSize}
        currentPage={page}
        rowKey={"Id"}
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
          hideCancel={true}
          hideCui={true}
        >
          <NotificationSearch
            advanceFilterData={advanceFilterData}
            handleClose={clearFilter}
            cancel={cancel}
            setIsFilterModalVisible={setIsFilterModalVisible}
            getNotificationList={getNotificationList}
            setAdvanceFilterData={setAdvanceFilterData}
          />
        </SideDrawer>
      )}

      {isModalVisible && (
        <SideDrawer
          showModal={true}
          title="Create Notification"
          isFooterVisible={null}
          wrapperClassName=" custom-modal left-search-bar layoutFix animate-right"
          onClose={() => setIsModalVisible(false)}
        >
          <NotificationCreateFlow
            onClose={() => {
              setIsModalVisible(false);
              getNotificationList();
            }}
            List={list}
          />
        </SideDrawer>
      )}
    </Layout>
  );
};
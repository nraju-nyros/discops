import { Button, Tabs, Tooltip } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useHistory, Link } from "react-router-dom";

import { DataTable, DataTypes } from "../components/Customs/DataTable";
import { Layout } from "../components/layout";
import { AppContext } from "../components/store/app-context";
import { SideDrawer } from "../components/SideDrawer";
// import { WorkInProcessSearch } from "./WorkInProcessSearch";
import { WorkInProcessNotificationList } from "./WorkInProcessNotificationList";
import { WorkInProcessWorkOrderList } from "./WorkInProcessWorkOrderList";
import { CustomTabs } from "../components/common/CustomTabs";
export const WorkInProcessList = () => {

    const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
    const [currentLevel, setCurrentLevel] = useState(1);
    const [sortByValue, setSortByValue] = useState("");
    const [orderByValue, setOrderByValue] = useState("");
    const [offsetValue, setOffsetValue] = useState(1);
    const [searchValue, setSearchValue] = useState("");
    const [tab, setTab] = useState("1")
    const [updateStatus, seupdateStatus] = useState(0);
    const [page, setPage] = useState(1);
    const [sortfilterStatus, setSortFilterStatus] = useState(false);
    const [advanceFilterData, setAdvanceFilterData] = useState({});

    var date = new Date()
    date = date.toDateString()

    return (
        <Layout
        page="WorkInProcess"
        title="Work In Process"
        subTitle={"View notification and work order information here | Last synced  on "+ date}
        pageTitleButton={false}
        showSearch={false}
        >
             <CustomTabs 
        activeTabs={[]} 
        defaultActiveKey="1" 
        onTabClick={(key)=>(setTab(key))} 
        currentTab={tab} 
        tabData={
          [
            {name:"Notifications", key:"1", content: <WorkInProcessNotificationList/>},
            {name:"Work Orders", key:"2", content: <WorkInProcessWorkOrderList />}
          ]
        }
      />

        </Layout>
    )

}
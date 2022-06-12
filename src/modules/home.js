
// import React from 'react';
// import { useHistory, Link } from "react-router-dom";

// export const Home = () => {
//   return (
//     <>
//       <div style={{textAlign: 'center'}}>
//         <br/><br/><br/>
//         <h2>Home </h2>
//         <Link to="/Purchasing">Purchasing</Link>&nbsp;&nbsp;&nbsp;
//         <Link to="/dispatch">Dispatch</Link>&nbsp;&nbsp;&nbsp;
//         <Link to="/notifications">Notifications</Link>&nbsp;&nbsp;&nbsp;
//         <Link to="/workinprocess">WorkInPRocess</Link>


//       </div>
//     </>
//   )
// }


import { Layout } from "./components/layout";
import moment from "moment";
import { useContext, useState, useEffect, useMemo, useCallback } from "react";
import {
  RightOutlined,
  CarOutlined,
  BellOutlined,
  BarsOutlined,
  Loading3QuartersOutlined,
  LeftOutlined,
  UserOutlined,
  PlusOutlined,
  DesktopOutlined,
  QuestionCircleOutlined
} from "@ant-design/icons";
import { AppContext } from "./components/store/app-context";
import { DataTable, DataTypes } from "./components/common/DataTable";
import { FormatDateLocal } from "./components/common/helpers";
import { Button, Checkbox, Radio, Row, Tooltip } from "antd";
import { useHistory,useNavigate, Link } from "react-router-dom";
import { SearchBox } from "./components/common/SearchBox";
import { SideDrawer } from "./components/SideDrawer";
import { DiscopsHeaderCard } from "./components/DiscopsHeaderCard";
import { DispatchCreate } from "./dispatch/DispatchCreate";
import { MaintenanceExpandableView } from "./components/MaintenanceExpandableView";
// import DiscopsDashboardHelp from "../../modules/HelpTemplates/DiscopsDashboard/DiscopsDashboardHelp.js";
import { stripLeadingZeros } from "./components/common/helpers";

export const Home = () => {
    const mockData = [
        {
        "OperStatusName": "FMC-Fully Mission Capable",
        "OperStatusIcon": "FMC",
        "TechStatusName": "",
        "TechStatusIcon": "",
        "AdminNo": "WAH0C0-M4A1121",
        "SerialNo": "W258428",
        "Description": "CARBINE 5.56MILL M4A1",
        "FunctionalLoc": "",
        "Name": "OMA-Customer Units",
        "LinNo": "C06935",
        "ModelNo": "M4A1",
        "RegisterNo": "",
        "StatusStrctDesc": "Not dispatchable",
        "EquipmentNo": "000000001011176921",
        "DocumentNo": "",
        "EquipmentCategory": "H",
        "Material": "013820953",
        "OperStatus": "FMC",
        "TechStatus": "NS",
        "UserStatus": "",
        "CauseCode": "",
        "LocationCode": "CEP8",
        "PlantCode": "2000",
        "StorageLoc": "CEP8",
        "Readings": [],
        "OrgCode": "WAH0C0",
        "Id": "1f9cbe4c-8878-4d14-857f-641f60219824",
        "Status": 1,
        "UpdatedOn": "05/07/2022 21:29:54",
        "UpdatedBy": "SapService"
    },
    {
        "OperStatusName": "FMC-Fully Mission Capable",
        "OperStatusIcon": "FMC",
        "TechStatusName": "",
        "TechStatusIcon": "",
        "AdminNo": "WAH0C0-SRFC23",
        "SerialNo": "1252507",
        "Description": "SIGHT REFLEX COLLIM",
        "FunctionalLoc": "",
        "Name": "OMA-Customer Units",
        "LinNo": "S60288",
        "ModelNo": "",
        "RegisterNo": "",
        "StatusStrctDesc": "Not dispatchable",
        "EquipmentNo": "000000001011186164",
        "DocumentNo": "",
        "EquipmentCategory": "I",
        "Material": "014111265",
        "OperStatus": "FMC",
        "TechStatus": "NS",
        "UserStatus": "",
        "CauseCode": "",
        "LocationCode": "CEP8",
        "PlantCode": "2000",
        "StorageLoc": "CEP8",
        "Readings": [],
        "OrgCode": "WAH0C0",
        "Id": "2d8c4e19-0c49-4483-bd46-7e59204d5769",
        "Status": 1,
        "UpdatedOn": "05/07/2022 21:29:53",
        "UpdatedBy": "SapService"
    },
    {
        "OperStatusName": "FMC-Fully Mission Capable",
        "OperStatusIcon": "FMC",
        "TechStatusName": "",
        "TechStatusIcon": "",
        "AdminNo": "WAH0C0-SRFC28",
        "SerialNo": "1252531",
        "Description": "SIGHT REFLEX COLLIM",
        "FunctionalLoc": "",
        "Name": "OMA-Customer Units",
        "LinNo": "S60288",
        "ModelNo": "",
        "RegisterNo": "",
        "StatusStrctDesc": "Not dispatchable",
        "EquipmentNo": "000000001011186171",
        "DocumentNo": "",
        "EquipmentCategory": "I",
        "Material": "014111265",
        "OperStatus": "FMC",
        "TechStatus": "NS",
        "UserStatus": "",
        "CauseCode": "",
        "LocationCode": "CEP8",
        "PlantCode": "2000",
        "StorageLoc": "CEP8",
        "Readings": [],
        "OrgCode": "WAH0C0",
        "Id": "278511f7-8c7a-4488-b514-274153d097bf",
        "Status": 1,
        "UpdatedOn": "05/07/2022 21:29:53",
        "UpdatedBy": "SapService"
    },
    {
        "OperStatusName": "FMC-Fully Mission Capable",
        "OperStatusIcon": "FMC",
        "TechStatusName": "",
        "TechStatusIcon": "",
        "AdminNo": "WAH0C0-SRFC20",
        "SerialNo": "1252129",
        "Description": "SIGHT REFLEX COLLIM",
        "FunctionalLoc": "",
        "Name": "OMA-Customer Units",
        "LinNo": "S60288",
        "ModelNo": "",
        "RegisterNo": "",
        "StatusStrctDesc": "Not dispatchable",
        "EquipmentNo": "000000001011186158",
        "DocumentNo": "",
        "EquipmentCategory": "I",
        "Material": "014111265",
        "OperStatus": "FMC",
        "TechStatus": "NS",
        "UserStatus": "",
        "CauseCode": "",
        "LocationCode": "CEP8",
        "PlantCode": "2000",
        "StorageLoc": "CEP8",
        "Readings": [],
        "OrgCode": "WAH0C0",
        "Id": "280a8455-4a1c-4292-93cc-556a4982f8af",
        "Status": 1,
        "UpdatedOn": "05/07/2022 21:29:53",
        "UpdatedBy": "SapService"
    },
    {
        "OperStatusName": "NMCM-NMC-Maint",
        "OperStatusIcon": "NMCM",
        "TechStatusName": "",
        "TechStatusIcon": "",
        "AdminNo": "WAH0C0-SRFC30",
        "SerialNo": "1252545",
        "Description": "SIGHT REFLEX COLLIM",
        "FunctionalLoc": "",
        "Name": "OMA-Customer Units",
        "LinNo": "S60288",
        "ModelNo": "",
        "RegisterNo": "",
        "StatusStrctDesc": "Not dispatchable",
        "EquipmentNo": "000000001011186174",
        "DocumentNo": "",
        "EquipmentCategory": "I",
        "Material": "014111265",
        "OperStatus": "NMCM",
        "TechStatus": "CX",
        "UserStatus": "",
        "CauseCode": "",
        "LocationCode": "CEP8",
        "PlantCode": "2000",
        "StorageLoc": "CEP8",
        "Readings": [],
        "OrgCode": "WAH0C0",
        "Id": "1dc8f11e-e189-4c1c-a34a-adf41c01dc44",
        "Status": 1,
        "UpdatedOn": "05/07/2022 21:29:53",
        "UpdatedBy": "SapService"
    },
    {
        "OperStatusName": "FMC-Fully Mission Capable",
        "OperStatusIcon": "FMC",
        "TechStatusName": "",
        "TechStatusIcon": "",
        "AdminNo": "WAH0C0-SRFC21",
        "SerialNo": "1252497",
        "Description": "SIGHT REFLEX COLLIM",
        "FunctionalLoc": "",
        "Name": "OMA-Customer Units",
        "LinNo": "S60288",
        "ModelNo": "",
        "RegisterNo": "",
        "StatusStrctDesc": "Not dispatchable",
        "EquipmentNo": "000000001011186161",
        "DocumentNo": "",
        "EquipmentCategory": "I",
        "Material": "014111265",
        "OperStatus": "FMC",
        "TechStatus": "NS",
        "UserStatus": "",
        "CauseCode": "",
        "LocationCode": "CEP8",
        "PlantCode": "2000",
        "StorageLoc": "CEP8",
        "Readings": [],
        "OrgCode": "WAH0C0",
        "Id": "152bd139-8256-475b-8267-6a222959b861",
        "Status": 1,
        "UpdatedOn": "05/07/2022 21:29:53",
        "UpdatedBy": "SapService"
    },
    {
        "OperStatusName": "NMCM-NMC-Maint",
        "OperStatusIcon": "NMCM",
        "TechStatusName": "",
        "TechStatusIcon": "",
        "AdminNo": "WAH0C0-SRFC27",
        "SerialNo": "1252527",
        "Description": "SIGHT REFLEX COLLIM",
        "FunctionalLoc": "",
        "Name": "OMA-Customer Units",
        "LinNo": "S60288",
        "ModelNo": "",
        "RegisterNo": "",
        "StatusStrctDesc": "Not dispatchable",
        "EquipmentNo": "000000001011186170",
        "DocumentNo": "",
        "EquipmentCategory": "I",
        "Material": "014111265",
        "OperStatus": "NMCM",
        "TechStatus": "X",
        "UserStatus": "",
        "CauseCode": "",
        "LocationCode": "CEP8",
        "PlantCode": "2000",
        "StorageLoc": "CEP8",
        "Readings": [],
        "OrgCode": "WAH0C0",
        "Id": "88e7a01b-ecc3-4ec3-9285-dc360b9c425a",
        "Status": 1,
        "UpdatedOn": "05/07/2022 21:29:53",
        "UpdatedBy": "SapService"
    },
    {
        "OperStatusName": "FMC-Fully Mission Capable",
        "OperStatusIcon": "FMC",
        "TechStatusName": "",
        "TechStatusIcon": "",
        "AdminNo": "WAH0C0-SRFC22",
        "SerialNo": "1252499",
        "Description": "SIGHT REFLEX COLLIM",
        "FunctionalLoc": "",
        "Name": "OMA-Customer Units",
        "LinNo": "S60288",
        "ModelNo": "",
        "RegisterNo": "",
        "StatusStrctDesc": "Not dispatchable",
        "EquipmentNo": "000000001011186162",
        "DocumentNo": "",
        "EquipmentCategory": "I",
        "Material": "014111265",
        "OperStatus": "FMC",
        "TechStatus": "NS",
        "UserStatus": "",
        "CauseCode": "",
        "LocationCode": "CEP8",
        "PlantCode": "2000",
        "StorageLoc": "CEP8",
        "Readings": [],
        "OrgCode": "WAH0C0",
        "Id": "8f519909-3370-4493-b33a-23ca78c00f31",
        "Status": 1,
        "UpdatedOn": "05/07/2022 21:29:53",
        "UpdatedBy": "SapService"
    },
    {
        "OperStatusName": "NMCM-NMC-Maint",
        "OperStatusIcon": "NMCM",
        "TechStatusName": "",
        "TechStatusIcon": "",
        "AdminNo": "WAH0C0-SRFC29",
        "SerialNo": "1252533",
        "Description": "SIGHT REFLEX COLLIM",
        "FunctionalLoc": "",
        "Name": "OMA-Customer Units",
        "LinNo": "S60288",
        "ModelNo": "",
        "RegisterNo": "",
        "StatusStrctDesc": "Not dispatchable",
        "EquipmentNo": "000000001011186173",
        "DocumentNo": "",
        "EquipmentCategory": "I",
        "Material": "014111265",
        "OperStatus": "NMCM",
        "TechStatus": "X",
        "UserStatus": "",
        "CauseCode": "",
        "LocationCode": "CEP8",
        "PlantCode": "2000",
        "StorageLoc": "CEP8",
        "Readings": [],
        "OrgCode": "WAH0C0",
        "Id": "df9c1e63-9bb8-42f1-a337-1ecca9fcda4a",
        "Status": 1,
        "UpdatedOn": "05/07/2022 21:29:53",
        "UpdatedBy": "SapService"
    },
    {
        "OperStatusName": "FMC-Fully Mission Capable",
        "OperStatusIcon": "FMC",
        "TechStatusName": "",
        "TechStatusIcon": "",
        "AdminNo": "WAH0C0-SRFC24",
        "SerialNo": "1252514",
        "Description": "SIGHT REFLEX COLLIM",
        "FunctionalLoc": "",
        "Name": "OMA-Customer Units",
        "LinNo": "S60288",
        "ModelNo": "",
        "RegisterNo": "",
        "StatusStrctDesc": "Not dispatchable",
        "EquipmentNo": "000000001011186166",
        "DocumentNo": "",
        "EquipmentCategory": "I",
        "Material": "014111265",
        "OperStatus": "FMC",
        "TechStatus": "NS",
        "UserStatus": "",
        "CauseCode": "",
        "LocationCode": "CEP8",
        "PlantCode": "2000",
        "StorageLoc": "CEP8",
        "Readings": [],
        "OrgCode": "WAH0C0",
        "Id": "d4896eae-c797-4f56-8f44-8dde3e06ce77",
        "Status": 1,
        "UpdatedOn": "05/07/2022 21:29:53",
        "UpdatedBy": "SapService"
    },
    {
        "OperStatusName": "FMC-Fully Mission Capable",
        "OperStatusIcon": "FMC",
        "TechStatusName": "",
        "TechStatusIcon": "",
        "AdminNo": "WAH0C0-SRFC26",
        "SerialNo": "1252518",
        "Description": "SIGHT REFLEX COLLIM",
        "FunctionalLoc": "",
        "Name": "OMA-Customer Units",
        "LinNo": "S60288",
        "ModelNo": "",
        "RegisterNo": "",
        "StatusStrctDesc": "Not dispatchable",
        "EquipmentNo": "000000001011186168",
        "DocumentNo": "",
        "EquipmentCategory": "I",
        "Material": "014111265",
        "OperStatus": "FMC",
        "TechStatus": "NS",
        "UserStatus": "",
        "CauseCode": "",
        "LocationCode": "CEP8",
        "PlantCode": "2000",
        "StorageLoc": "CEP8",
        "Readings": [],
        "OrgCode": "WAH0C0",
        "Id": "b2016922-9e44-4068-9f22-fadf9e2e32b1",
        "Status": 1,
        "UpdatedOn": "05/07/2022 21:29:53",
        "UpdatedBy": "SapService"
    },
    {
        "OperStatusName": "FMC-Fully Mission Capable",
        "OperStatusIcon": "FMC",
        "TechStatusName": "",
        "TechStatusIcon": "",
        "AdminNo": "WAH0C0-M4A1200",
        "SerialNo": "W720890",
        "Description": "CARBINE 5.56MILL M4A1",
        "FunctionalLoc": "",
        "Name": "OMA-Customer Units",
        "LinNo": "C06935",
        "ModelNo": "M4A1",
        "RegisterNo": "",
        "StatusStrctDesc": "Not dispatchable",
        "EquipmentNo": "000000001011172684",
        "DocumentNo": "",
        "EquipmentCategory": "H",
        "Material": "013820953",
        "OperStatus": "FMC",
        "TechStatus": "NS",
        "UserStatus": "",
        "CauseCode": "",
        "LocationCode": "CEP8",
        "PlantCode": "2000",
        "StorageLoc": "CEP8",
        "Readings": [],
        "OrgCode": "WAH0C0",
        "Id": "b71a246f-38e0-4677-b585-7bb7e6bd8f0b",
        "Status": 1,
        "UpdatedOn": "05/07/2022 21:29:52",
        "UpdatedBy": "SapService"
    },
    {
        "OperStatusName": "FMC-Fully Mission Capable",
        "OperStatusIcon": "FMC",
        "TechStatusName": "",
        "TechStatusIcon": "",
        "AdminNo": "WAH0C0-M4A1207",
        "SerialNo": "W720967",
        "Description": "CARBINE 5.56MILL M4A1",
        "FunctionalLoc": "",
        "Name": "OMA-Customer Units",
        "LinNo": "C06935",
        "ModelNo": "M4A1",
        "RegisterNo": "",
        "StatusStrctDesc": "Not dispatchable",
        "EquipmentNo": "000000001011173557",
        "DocumentNo": "",
        "EquipmentCategory": "H",
        "Material": "013820953",
        "OperStatus": "FMC",
        "TechStatus": "DI",
        "UserStatus": "",
        "CauseCode": "",
        "LocationCode": "CEP8",
        "PlantCode": "2000",
        "StorageLoc": "CEP8",
        "Readings": [],
        "OrgCode": "WAH0C0",
        "Id": "e16a6be2-f065-4df1-99bb-ce00cd5194b0",
        "Status": 1,
        "UpdatedOn": "05/07/2022 21:29:52",
        "UpdatedBy": "SapService"
    },
    {
        "OperStatusName": "FMC-Fully Mission Capable",
        "OperStatusIcon": "FMC",
        "TechStatusName": "",
        "TechStatusIcon": "",
        "AdminNo": "WAH0C0-M4A1205",
        "SerialNo": "W720943",
        "Description": "CARBINE 5.56MILL M4A1",
        "FunctionalLoc": "",
        "Name": "OMA-Customer Units",
        "LinNo": "C06935",
        "ModelNo": "M4A1",
        "RegisterNo": "",
        "StatusStrctDesc": "Not dispatchable",
        "EquipmentNo": "000000001011173185",
        "DocumentNo": "",
        "EquipmentCategory": "H",
        "Material": "013820953",
        "OperStatus": "FMC",
        "TechStatus": "NS",
        "UserStatus": "",
        "CauseCode": "",
        "LocationCode": "CEP8",
        "PlantCode": "2000",
        "StorageLoc": "CEP8",
        "Readings": [],
        "OrgCode": "WAH0C0",
        "Id": "f84148fd-a382-440f-8a79-8754ab8e3f56",
        "Status": 1,
        "UpdatedOn": "05/07/2022 21:29:52",
        "UpdatedBy": "SapService"
    },
    {
        "OperStatusName": "FMC-Fully Mission Capable",
        "OperStatusIcon": "FMC",
        "TechStatusName": "",
        "TechStatusIcon": "",
        "AdminNo": "WAH0C0-M4A1202",
        "SerialNo": "W720927",
        "Description": "CARBINE 5.56MILL M4A1",
        "FunctionalLoc": "",
        "Name": "OMA-Customer Units",
        "LinNo": "C06935",
        "ModelNo": "M4A1",
        "RegisterNo": "",
        "StatusStrctDesc": "Not dispatchable",
        "EquipmentNo": "000000001011173134",
        "DocumentNo": "",
        "EquipmentCategory": "H",
        "Material": "013820953",
        "OperStatus": "FMC",
        "TechStatus": "NS",
        "UserStatus": "",
        "CauseCode": "",
        "LocationCode": "CEP8",
        "PlantCode": "2000",
        "StorageLoc": "CEP8",
        "Readings": [],
        "OrgCode": "WAH0C0",
        "Id": "fb494eb5-2bd3-4a05-b276-163159b905df",
        "Status": 1,
        "UpdatedOn": "05/07/2022 21:29:52",
        "UpdatedBy": "SapService"
    },
    {
        "OperStatusName": "FMC-Fully Mission Capable",
        "OperStatusIcon": "FMC",
        "TechStatusName": "",
        "TechStatusIcon": "",
        "AdminNo": "WAH0C0-M4A1206",
        "SerialNo": "W720966",
        "Description": "CARBINE 5.56MILL M4A1",
        "FunctionalLoc": "",
        "Name": "OMA-Customer Units",
        "LinNo": "C06935",
        "ModelNo": "M4A1",
        "RegisterNo": "",
        "StatusStrctDesc": "Not dispatchable",
        "EquipmentNo": "000000001011173553",
        "DocumentNo": "",
        "EquipmentCategory": "H",
        "Material": "013820953",
        "OperStatus": "FMC",
        "TechStatus": "NS",
        "UserStatus": "",
        "CauseCode": "",
        "LocationCode": "CEP8",
        "PlantCode": "2000",
        "StorageLoc": "CEP8",
        "Readings": [],
        "OrgCode": "WAH0C0",
        "Id": "9452a1bf-8143-43d7-b519-2039bb6e4705",
        "Status": 1,
        "UpdatedOn": "05/07/2022 21:29:52",
        "UpdatedBy": "SapService"
    },
    {
        "OperStatusName": "FMC-Fully Mission Capable",
        "OperStatusIcon": "FMC",
        "TechStatusName": "",
        "TechStatusIcon": "",
        "AdminNo": "ATAR-03",
        "SerialNo": "1213",
        "Description": "TARGET LOCATOR MODU",
        "FunctionalLoc": "",
        "Name": "OMA-Customer Units",
        "LinNo": "L05003",
        "ModelNo": "AN/PED-4",
        "RegisterNo": "",
        "StatusStrctDesc": "Not dispatchable",
        "EquipmentNo": "000000001011173481",
        "DocumentNo": "",
        "EquipmentCategory": "E",
        "Material": "015628084",
        "OperStatus": "FMC",
        "TechStatus": "NS",
        "UserStatus": "",
        "CauseCode": "",
        "LocationCode": "CEP8",
        "PlantCode": "2000",
        "StorageLoc": "CEP8",
        "Readings": [],
        "OrgCode": "WAH0C0",
        "Id": "5c3e1d8b-4660-4bf0-ad9a-e18892a3c267",
        "Status": 1,
        "UpdatedOn": "05/07/2022 21:29:52",
        "UpdatedBy": "SapService"
    },
    {
        "OperStatusName": "FMC-Fully Mission Capable",
        "OperStatusIcon": "FMC",
        "TechStatusName": "",
        "TechStatusIcon": "",
        "AdminNo": "ATAR-04",
        "SerialNo": "1244",
        "Description": "TARGET LOCATOR MODU",
        "FunctionalLoc": "",
        "Name": "OMA-Customer Units",
        "LinNo": "L05003",
        "ModelNo": "AN/PED-4",
        "RegisterNo": "",
        "StatusStrctDesc": "Not dispatchable",
        "EquipmentNo": "000000001011173489",
        "DocumentNo": "",
        "EquipmentCategory": "E",
        "Material": "015628084",
        "OperStatus": "FMC",
        "TechStatus": "NS",
        "UserStatus": "",
        "CauseCode": "",
        "LocationCode": "CEP8",
        "PlantCode": "2000",
        "StorageLoc": "CEP8",
        "Readings": [],
        "OrgCode": "WAH0C0",
        "Id": "49b03e52-72a8-4cb5-8dcd-ec817eec9d9c",
        "Status": 1,
        "UpdatedOn": "05/07/2022 21:29:52",
        "UpdatedBy": "SapService"
    },
    {
        "OperStatusName": "FMC-Fully Mission Capable",
        "OperStatusIcon": "FMC",
        "TechStatusName": "",
        "TechStatusIcon": "",
        "AdminNo": "WAH0C0-M4A1201",
        "SerialNo": "W720892",
        "Description": "CARBINE 5.56MILL M4A1",
        "FunctionalLoc": "",
        "Name": "OMA-Customer Units",
        "LinNo": "C06935",
        "ModelNo": "M4A1",
        "RegisterNo": "",
        "StatusStrctDesc": "Not dispatchable",
        "EquipmentNo": "000000001011172695",
        "DocumentNo": "",
        "EquipmentCategory": "H",
        "Material": "013820953",
        "OperStatus": "FMC",
        "TechStatus": "NS",
        "UserStatus": "",
        "CauseCode": "",
        "LocationCode": "CEP8",
        "PlantCode": "2000",
        "StorageLoc": "CEP8",
        "Readings": [],
        "OrgCode": "WAH0C0",
        "Id": "4c3e9ae2-dcb3-4212-a56c-d33df4bc7686",
        "Status": 1,
        "UpdatedOn": "05/07/2022 21:29:52",
        "UpdatedBy": "SapService"
    },
    {
        "OperStatusName": "FMC-Fully Mission Capable",
        "OperStatusIcon": "FMC",
        "TechStatusName": "",
        "TechStatusIcon": "",
        "AdminNo": "WAH0C0-M4A1112",
        "SerialNo": "W720777",
        "Description": "CARBINE 5.56MILL M4A1",
        "FunctionalLoc": "",
        "Name": "OMA-Customer Units",
        "LinNo": "C06935",
        "ModelNo": "M4A1",
        "RegisterNo": "",
        "StatusStrctDesc": "Not dispatchable",
        "EquipmentNo": "000000001011171300",
        "DocumentNo": "",
        "EquipmentCategory": "H",
        "Material": "013820953",
        "OperStatus": "FMC",
        "TechStatus": "NS",
        "UserStatus": "",
        "CauseCode": "",
        "LocationCode": "CEP8",
        "PlantCode": "2000",
        "StorageLoc": "CEP8",
        "Readings": [],
        "OrgCode": "WAH0C0",
        "Id": "20ec728f-6b33-4364-8c99-779599cc4e7a",
        "Status": 1,
        "UpdatedOn": "05/07/2022 21:29:51",
        "UpdatedBy": "SapService"
    },
    {
        "OperStatusName": "FMC-Fully Mission Capable",
        "OperStatusIcon": "FMC",
        "TechStatusName": "",
        "TechStatusIcon": "",
        "AdminNo": "WAHCA0-",
        "SerialNo": "012201",
        "Description": "RADIO SET: AN/PRC-150A(C)",
        "FunctionalLoc": "",
        "Name": "OMA-Customer Units",
        "LinNo": "R62247",
        "ModelNo": "AN/PRC-150",
        "RegisterNo": "",
        "StatusStrctDesc": "",
        "EquipmentNo": "000000001011167318",
        "DocumentNo": "",
        "EquipmentCategory": "E",
        "Material": "015756358",
        "OperStatus": "FMC",
        "TechStatus": "NS",
        "UserStatus": "",
        "CauseCode": "",
        "LocationCode": "CEP3",
        "PlantCode": "2000",
        "StorageLoc": "CEP3",
        "Readings": [],
        "OrgCode": "WAH0C0",
        "Id": "7bc8c460-e3cd-4e42-a03c-3e3a4232c1bd",
        "Status": 1,
        "UpdatedOn": "05/07/2022 21:29:51",
        "UpdatedBy": "SapService"
    },
    {
        "OperStatusName": "FMC-Fully Mission Capable",
        "OperStatusIcon": "FMC",
        "TechStatusName": "",
        "TechStatusIcon": "",
        "AdminNo": "WAH0C0-MM12",
        "SerialNo": "U172048",
        "Description": "MACHINE GUN 7.62 MI",
        "FunctionalLoc": "",
        "Name": "OMA-Customer Units",
        "LinNo": "M92454",
        "ModelNo": "M240L",
        "RegisterNo": "",
        "StatusStrctDesc": "Not dispatchable",
        "EquipmentNo": "000000001011166443",
        "DocumentNo": "",
        "EquipmentCategory": "E",
        "Material": "015495837",
        "OperStatus": "FMC",
        "TechStatus": "E",
        "UserStatus": "",
        "CauseCode": "",
        "LocationCode": "CEP8",
        "PlantCode": "2000",
        "StorageLoc": "CEP8",
        "Readings": [],
        "OrgCode": "WAH0C0",
        "Id": "a3075970-cc8f-4c36-8d02-13e3bd98f678",
        "Status": 1,
        "UpdatedOn": "05/07/2022 21:29:51",
        "UpdatedBy": "SapService"
    },
    {
        "OperStatusName": "FMC-Fully Mission Capable",
        "OperStatusIcon": "FMC",
        "TechStatusName": "",
        "TechStatusIcon": "",
        "AdminNo": "WAH0C0-M4A124",
        "SerialNo": "W252182",
        "Description": "CARBINE 5.56MILL M4A1",
        "FunctionalLoc": "",
        "Name": "OMA-Customer Units",
        "LinNo": "C06935",
        "ModelNo": "M4A1",
        "RegisterNo": "",
        "StatusStrctDesc": "Not dispatchable",
        "EquipmentNo": "000000001011175445",
        "DocumentNo": "",
        "EquipmentCategory": "H",
        "Material": "013820953",
        "OperStatus": "FMC",
        "TechStatus": "NS",
        "UserStatus": "",
        "CauseCode": "",
        "LocationCode": "CEP8",
        "PlantCode": "2000",
        "StorageLoc": "CEP8",
        "Readings": [],
        "OrgCode": "WAH0C0",
        "Id": "7aaf368d-a141-4aa7-9bee-d788d4e3ac39",
        "Status": 1,
        "UpdatedOn": "05/07/2022 21:29:50",
        "UpdatedBy": "SapService"
    },
    {
        "OperStatusName": "FMC-Fully Mission Capable",
        "OperStatusIcon": "FMC",
        "TechStatusName": "",
        "TechStatusIcon": "",
        "AdminNo": "WAH0C0-M4A128",
        "SerialNo": "W257469",
        "Description": "CARBINE 5.56MILL M4A1",
        "FunctionalLoc": "",
        "Name": "OMA-Customer Units",
        "LinNo": "C06935",
        "ModelNo": "M4A1",
        "RegisterNo": "",
        "StatusStrctDesc": "Not dispatchable",
        "EquipmentNo": "000000001011175916",
        "DocumentNo": "",
        "EquipmentCategory": "H",
        "Material": "013820953",
        "OperStatus": "FMC",
        "TechStatus": "NS",
        "UserStatus": "",
        "CauseCode": "",
        "LocationCode": "CEP8",
        "PlantCode": "2000",
        "StorageLoc": "CEP8",
        "Readings": [],
        "OrgCode": "WAH0C0",
        "Id": "5fcfe953-9036-4f99-a30c-a62ee1bbbef2",
        "Status": 1,
        "UpdatedOn": "05/07/2022 21:29:50",
        "UpdatedBy": "SapService"
    },
    {
        "OperStatusName": "FMC-Fully Mission Capable",
        "OperStatusIcon": "FMC",
        "TechStatusName": "",
        "TechStatusIcon": "",
        "AdminNo": "WAH0C0-M4A122",
        "SerialNo": "W251894",
        "Description": "CARBINE 5.56MILL M4A1",
        "FunctionalLoc": "",
        "Name": "OMA-Customer Units",
        "LinNo": "C06935",
        "ModelNo": "M4A1",
        "RegisterNo": "",
        "StatusStrctDesc": "Not dispatchable",
        "EquipmentNo": "000000001011175404",
        "DocumentNo": "",
        "EquipmentCategory": "H",
        "Material": "013820953",
        "OperStatus": "FMC",
        "TechStatus": "NS",
        "UserStatus": "",
        "CauseCode": "",
        "LocationCode": "CEP8",
        "PlantCode": "2000",
        "StorageLoc": "CEP8",
        "Readings": [],
        "OrgCode": "WAH0C0",
        "Id": "682170f5-3450-4675-8ba8-56a7e4e14661",
        "Status": 1,
        "UpdatedOn": "05/07/2022 21:29:50",
        "UpdatedBy": "SapService"
    },
    {
        "OperStatusName": "FMC-Fully Mission Capable",
        "OperStatusIcon": "FMC",
        "TechStatusName": "",
        "TechStatusIcon": "",
        "AdminNo": "WAH0C0-M4A121",
        "SerialNo": "W251781",
        "Description": "CARBINE 5.56MILL M4A1",
        "FunctionalLoc": "",
        "Name": "OMA-Customer Units",
        "LinNo": "C06935",
        "ModelNo": "M4A1",
        "RegisterNo": "",
        "StatusStrctDesc": "Not dispatchable",
        "EquipmentNo": "000000001011175389",
        "DocumentNo": "",
        "EquipmentCategory": "H",
        "Material": "013820953",
        "OperStatus": "FMC",
        "TechStatus": "NS",
        "UserStatus": "",
        "CauseCode": "",
        "LocationCode": "CEP8",
        "PlantCode": "2000",
        "StorageLoc": "CEP8",
        "Readings": [],
        "OrgCode": "WAH0C0",
        "Id": "0e621d36-678f-41aa-95fc-c4899bd95fa2",
        "Status": 1,
        "UpdatedOn": "05/07/2022 21:29:50",
        "UpdatedBy": "SapService"
    },
    {
        "OperStatusName": "FMC-Fully Mission Capable",
        "OperStatusIcon": "FMC",
        "TechStatusName": "",
        "TechStatusIcon": "",
        "AdminNo": "WAH0C0-M4A126",
        "SerialNo": "W256266",
        "Description": "CARBINE 5.56MILL M4A1",
        "FunctionalLoc": "",
        "Name": "OMA-Customer Units",
        "LinNo": "C06935",
        "ModelNo": "M4A1",
        "RegisterNo": "",
        "StatusStrctDesc": "Not dispatchable",
        "EquipmentNo": "000000001011175902",
        "DocumentNo": "",
        "EquipmentCategory": "H",
        "Material": "013820953",
        "OperStatus": "FMC",
        "TechStatus": "NS",
        "UserStatus": "",
        "CauseCode": "",
        "LocationCode": "CEP8",
        "PlantCode": "2000",
        "StorageLoc": "CEP8",
        "Readings": [],
        "OrgCode": "WAH0C0",
        "Id": "03c793c1-2c5f-45ac-8be9-2b6ed67e79a3",
        "Status": 1,
        "UpdatedOn": "05/07/2022 21:29:50",
        "UpdatedBy": "SapService"
    },
    {
        "OperStatusName": "FMC-Fully Mission Capable",
        "OperStatusIcon": "FMC",
        "TechStatusName": "",
        "TechStatusIcon": "",
        "AdminNo": "WAH0C0-M4A129",
        "SerialNo": "W257505",
        "Description": "CARBINE 5.56MILL M4A1",
        "FunctionalLoc": "",
        "Name": "OMA-Customer Units",
        "LinNo": "C06935",
        "ModelNo": "M4A1",
        "RegisterNo": "",
        "StatusStrctDesc": "Not dispatchable",
        "EquipmentNo": "000000001011175928",
        "DocumentNo": "",
        "EquipmentCategory": "H",
        "Material": "013820953",
        "OperStatus": "FMC",
        "TechStatus": "NS",
        "UserStatus": "",
        "CauseCode": "",
        "LocationCode": "CEP8",
        "PlantCode": "2000",
        "StorageLoc": "CEP8",
        "Readings": [],
        "OrgCode": "WAH0C0",
        "Id": "567c56f2-e0f9-4464-8d79-a139a883e93a",
        "Status": 1,
        "UpdatedOn": "05/07/2022 21:29:50",
        "UpdatedBy": "SapService"
    },
    {
        "OperStatusName": "FMC-Fully Mission Capable",
        "OperStatusIcon": "FMC",
        "TechStatusName": "",
        "TechStatusIcon": "",
        "AdminNo": "WAH0C0-M4A115",
        "SerialNo": "W251283",
        "Description": "CARBINE 5.56MILL M4A1",
        "FunctionalLoc": "",
        "Name": "OMA-Customer Units",
        "LinNo": "C06935",
        "ModelNo": "M4A1",
        "RegisterNo": "",
        "StatusStrctDesc": "Not dispatchable",
        "EquipmentNo": "000000001011175320",
        "DocumentNo": "",
        "EquipmentCategory": "H",
        "Material": "013820953",
        "OperStatus": "FMC",
        "TechStatus": "NS",
        "UserStatus": "",
        "CauseCode": "",
        "LocationCode": "CEP8",
        "PlantCode": "2000",
        "StorageLoc": "CEP8",
        "Readings": [],
        "OrgCode": "WAH0C0",
        "Id": "ffea64df-da90-411b-948e-abd7ebb51461",
        "Status": 1,
        "UpdatedOn": "05/07/2022 21:29:50",
        "UpdatedBy": "SapService"
    },
    {
        "OperStatusName": "FMC-Fully Mission Capable",
        "OperStatusIcon": "FMC",
        "TechStatusName": "",
        "TechStatusIcon": "",
        "AdminNo": "WAH0C0-M4A123",
        "SerialNo": "W252089",
        "Description": "CARBINE 5.56MILL M4A1",
        "FunctionalLoc": "",
        "Name": "OMA-Customer Units",
        "LinNo": "C06935",
        "ModelNo": "M4A1",
        "RegisterNo": "",
        "StatusStrctDesc": "Not dispatchable",
        "EquipmentNo": "000000001011175430",
        "DocumentNo": "",
        "EquipmentCategory": "H",
        "Material": "013820953",
        "OperStatus": "FMC",
        "TechStatus": "NS",
        "UserStatus": "",
        "CauseCode": "",
        "LocationCode": "CEP8",
        "PlantCode": "2000",
        "StorageLoc": "CEP8",
        "Readings": [],
        "OrgCode": "WAH0C0",
        "Id": "e379347a-c9fa-434b-a705-ec610dea2194",
        "Status": 1,
        "UpdatedOn": "05/07/2022 21:29:50",
        "UpdatedBy": "SapService"
    }]
  const ctx = useContext(AppContext);
  const history = useNavigate();
    const navigate = useNavigate();


  const [user, setUser] = useState("user");
  const [syncInfo, setSyncInfo] = useState([]);
  const [equipmentList, setEquipmentList] = useState(mockData);
  const [workOrderList, setWorkOrderList] = useState([]);
  const [notificationList, setNotificationList] = useState([]);
  const [selectedEquipment, setSelectedEquipment] = useState();
  const [searchFilter, setSearchFilter] = useState("");
  const [openFilter, setOpenFilter] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [notificationBoxData, setNotificationBoxData] = useState({});
  const [workOrderBoxData, setWorkOrderBoxData] = useState({});
  const [dispatchBoxData, setDispatchBoxData] = useState({});
  const [showHelpModal, setShowHelpModal] = useState(false);

  // const accessObject = ctx.userInfo.UserAccess;

  const getSyncInfo = async () => {

    const response = await ctx.HttpGet("/Auth/SyncInfo");
    if (response) {
        setSyncInfo(response);
    }
  };
  const getEquipmentList = async () => {

 // alert("HIii")
 console.log("search_param",searchFilter)

    // const queryParams = {
    //   search: searchFilter || undefined,
    // };
    // const response = await ctx.HttpGetList(
    //   "/Notification/equipments",
    //   queryParams
    // );
    // if (response) {
    //   console.log("FFFFFFFFF",response.Data)
    //   let dispBoxData = {
    //     Total: response.Data.length,
    //     Available: 0,
    //     Dispatched: 0,
    //   };

    //   response.Data.forEach((eq) => {
    //     if (eq.StatusStrctDesc === "Available") {
    //       dispBoxData.Available = dispBoxData.Available + 1;
    //     } else if (eq.StatusStrctDesc === "Dispatced") {
    //       dispBoxData.Dispatched = dispBoxData.Dispatched + 1;
    //     }
    //   });
    //   setDispatchBoxData(dispBoxData);
    // }
          setEquipmentList(mockData);

  };
  const getWorkOrderList = async () => {
    const queryParams = {
      search: searchFilter || undefined,
    };
    const response = await ctx.HttpGetList("/WorkOrder/list");
    if (response) {
      setWorkOrderList(response.Data);
    }
  };
  const getNotificationsList = async () => {
    const response = await ctx.HttpGetList("/Notification/list");
    if (response) {
      setNotificationList(response.Data);

      let notifBoxData = {
        Total: response.Data.length,
        X: 0,
        CX: 0,
        Dash: 0,
        Diagonal: 0,
      };

      response.Data.forEach((notif) => {
        if (notif.TechStatus === "X") {
          notifBoxData.X = notifBoxData.X + 1;
        } else if (notif.TechStatus === "CX") {
          notifBoxData.CX = notifBoxData.CX + 1;
        } else if (notif.TechStatus === "Dash") {
          notifBoxData.Dash = notifBoxData.Dash + 1;
        } else if (notif.TechStatus === "Diagonal") {
          notifBoxData.Diagonal = notifBoxData.Diagonal + 1;
        }
        // notifBoxData.Total + 1;
      });
      setNotificationBoxData(notifBoxData);
    }
  };

  const handleCheckBox = (checked, id) => {
    if (checked === true) {
      setSelectedEquipment(id);
    } else {
      setSelectedEquipment(null);
    }
  };

  useEffect(() => {
    getSyncInfo();
    getEquipmentList();
    getWorkOrderList();
    getNotificationsList();
  }, []);

  useEffect(() => {
    getEquipmentList();
  }, [searchFilter]);

  const onDispatchClick = () => {
    setIsModalVisible(true);
    // if (!selectedEquipment) {
    //   navigate({
    //       pathname:"/dispatch/create",
    //       state: { startFlow: true },
    //     });
    // } else {
    //   navigate({
    //     pathname: "/dispatch/create",
    //     state: { selectedEquipment: selectedEquipment },
    //   });
    // }
  };

  const onNotificationClick = () => {
    if (!selectedEquipment) {
      navigate({
        pathname: "/notifications",
        state: { startFlow: true },
      });
    } else {
      navigate({
        pathname: "/notifications",
        state: { selectedEquipment: selectedEquipment },
      });
    }
  };

  // TODO: finish this
  const onWorkOrderClick = () => {
    // if (!selectedEquipment) {
    //   navigate({
    //     pathname: "/workOrder",
    //     state: { startFlow: true },
    //   });
    // } else {
    //   navigate({
    //     pathname: "/workOrder",
    //     state: { selectedEquipment: selectedEquipment },
    //   });
    // }
     navigate({
        pathname: "/workinprocess",
        state: { startFlow: true },
      });
  };

  const onTempHomeClick = () => {
    navigate("/tempHome");
  };

  const techStatusObj = {
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
      title: "  ",
      dataIndex: "",
      key: "Id",
      type: DataTypes.CUSTOM,
      width: "2vw",
      render: (text, record) => {
        return (
          <div>
            <Checkbox
              className="radiobox focus:border-iron"
              checked={selectedEquipment === record}
              onChange={(e) => handleCheckBox(e.target.checked, record)}
            />
          </div>
        );
      },
    },
    {
      title: "LIN NO.",
      dataIndex: "LinNo",
      key: "LinNo",
      type: DataTypes.CUSTOM,
      width: "4vw",
      sorter: true,
    },
    {
      title: "ADMIN NO.",
      dataIndex: "AdminNo",
      key: "AdminNo",
      type: DataTypes.CUSTOM,
      width: "6vw",
      sorter: true,
    },
    {
      title: "EQUIPMENT DESC.",
      dataIndex: "Description",
      key: "Description",
      type: DataTypes.CUSTOM,
      width: "8vw",
      sorter: true,
    },
    {
      title: "MODEL NO.",
      dataIndex: "ModelNo",
      key: "ModelNo",
      type: DataTypes.CUSTOM,
      width: "6vw",
      sorter: true,
    },
    {
      title: "OPER STATUS",
      dataIndex: "OperStatus",
      key: "OperStatus",
      type: DataTypes.CUSTOM,
      width: "6vw",
      sorter: true,
      render: (text, record) => {
        return (
          <div>
            <Tooltip
              placement="topLeft"
              title={record.OperStatusName}
              className="flex flex-row items-center"
            >
              {record.OperStatus ? (
                <img
                  src={`/images/icons/api-notifications-icon-${record.OperStatus}.svg`}
                  className="w-1/6 mr-2"
                  alt={record.OperStatusIcon}
                />
              ) : (
                "-"
              )}
              <span>{record.OperStatusIcon}</span>
            </Tooltip>
          </div>
        );
      },
    },

    {
      title: "TECH STATUS",
      dataIndex: "TechStatus",
      key: "TechStatus",
      type: DataTypes.CUSTOM,
      width: "6vw",
      sorter: true,
      render: (text, record) => {
        return (
          <div className="flex">
            <Tooltip
              placement="topLeft"
              title={record.TechStatusName}
              className="flex flex-row items-center"
            >
              {record.TechStatus ? (
                <img
                  src={`/images/icons/api-notifications-icon-${record.TechStatus}.svg`}
                  className="w-1/6 mr-2"
                  alt={record.TechStatusIcon}
                />
              ) : (
                ""
              )}
              <span>{record.TechStatus}</span>
            </Tooltip>
          </div>
        );
      },
    },

    {
      title: "STATUS STRCT DES.",
      dataIndex: "StatusStrctDesc",
      key: "StatusStrctDesc",
      type: DataTypes.CUSTOM,
      width: "9vw",
      sorter: true,
      render: (text, record) => {
        return (
          <>
            {record.StatusStrctDesc ? (
              <div
                className={`text-center rounded-full border text-xs px-1 w-32 ${
                  record.StatusStrctDesc === "Available"
                    ? "text-success-text border-success-text"
                    : ""
                }`}
              >
                {record.StatusStrctDesc}
              </div>
            ) : (
              <div>-</div>
            )}
          </>
        );
      },
    },
    {
      title: "EQUIPMENT NO.",
      dataIndex: "EquipmentNo",
      key: "EquipmentNo",
      type: DataTypes.CUSTOM,
      width: "9vw",
      sorter: true,
      render: (text, record) => {
        return `${stripLeadingZeros(record.EquipmentNo)}`;
      },
    },
  ];

  const toggleHelp = () => {
    setShowHelpModal(!showHelpModal);
    return showHelpModal;
  };

  return (
    <Layout
      showHelp={true}
      helpText={"Help"}
      helpIcon={<QuestionCircleOutlined />}
      onHelpClick={() => toggleHelp()}
      helpToggle={showHelpModal}
      // helpTemplate={<DiscopsDashboardHelp />}
    >
      {/* DATE & NAME */}
      <div className="px-3">
        <div className="w-full flex flex-row items-end space-x-4 mb-4">
          <img
            src="/images/logo.png"
            alt="logo"
            className="my-auto h-auto w-35"
            style={{ width: "220px" }}
            onClick={() => onTempHomeClick()}
          />
          <div className="flex-grow" />
          <div className="rounded-md bg-white p-3 text-center border-iron w-52 flex flex-row items-center h-14 flex-grow">
            <div className="text-daisy-bush font-semibold text-center w-full">
                Last Synced: {FormatDateLocal(syncInfo.LastSyncedOn, "Not Available")}
            </div>
          </div>

          <div className="rounded-md bg-white p-3 text-center border-iron w-52 flex flex-row items-center h-14 flex-grow">
            <div className="text-daisy-bush font-semibold text-center w-full">
                          WAH0C0-M4A1121 : C06935
            </div>
          </div>
        </div>

             <Link to="/json">JSON</Link>


        {/* SUMMARY BAR */}
        <div className="flex flex-row w-full space-x-4">
          <DiscopsHeaderCard
            icon={<CarOutlined />}
            mainTitle="Purchasing"
            iconBgColor="dash-purple-light"
            iconColor="dash-purple-dark"
            mainValue={dispatchBoxData.Total || 5}
            subTitleOne="Available"
            subValueOne={dispatchBoxData.Available || 0}
            subTitleTwo="Dispatched"
            subValueTwo={dispatchBoxData.Dispatched || 0}
            onCardClick={() => navigate("/purchasing")}
          />
          <DiscopsHeaderCard
            icon={<CarOutlined />}
            mainTitle="Dispatch"
            iconBgColor="dash-purple-light"
            iconColor="dash-purple-dark"
            mainValue={dispatchBoxData.Total || 5}
            subTitleOne="Available"
            subValueOne={dispatchBoxData.Available || 0}
            subTitleTwo="Dispatched"
            subValueTwo={dispatchBoxData.Dispatched || 0}
            onCardClick={() => navigate("/dispatch")}
          />
          <DiscopsHeaderCard
            icon={<BellOutlined />}
            mainTitle="Notifications"
            iconBgColor="dash-peach-light"
            iconColor="dash-peach-dark"
            mainValue={notificationList.length || 4}
            subTitleOne="X"
            subValueOne={notificationBoxData.X || 0}
            subTitleTwo="CX"
            subValueTwo={notificationBoxData.CX || 0}
            subTitleThree="Dash"
            subValueThree={notificationBoxData.Dash || 0}
            subTitleFour="Diagonal"
            subValueFour={notificationBoxData.Diagonal || 0}
            onCardClick={() => navigate("/notifications")}
          />
          <DiscopsHeaderCard
            icon={<BarsOutlined />}
            mainTitle="WorkInPRocess"
            iconBgColor="dash-green-light"
            iconColor="dash-green-dark"
            mainValue={workOrderList.length || 0}
            subTitleOne="NMCM"
            subValueOne="1"
            subTitleTwo="NMCS"
            subValueTwo="0"
            subTitleThree="PMCM"
            subValueThree="1"
            subTitleFour="PMCS"
            subValueFour="0"
            onCardClick={() => navigate("/workinprocess")}
          />
          <DiscopsHeaderCard
            icon={<Loading3QuartersOutlined />}
            mainTitle="Parts Status"
            iconBgColor="dash-blue-light"
            iconColor="dash-blue-dark"
            mainValue="108"
            subTitleOne="Allocated"
            subValueOne="70"
            subTitleTwo="Shortage"
            subValueTwo="23"
            onCardClick={() => console.log("todo")}
          />
        </div>

        {/* BODY HEADER */}
        <Row className="bg-white px-8 py-6 mt-6 rounded-md">
          <div className="w-full text-daisy-bush font-semibold text-xl">
            All Equipment
          </div>
          <div className="my-1 text-gray">{`${equipmentList.length} Equipments`}</div>
          <div className="w-full flex flex-row mt-6 mb-8">
            {/* <div style={{ width: "27%" }}> */}
            <div className="flex custom-search">
              <SearchBox
                placeholder="Search by Admin No., Serial No., or Description"
                value={searchFilter}
                onChange={(val) => setSearchFilter(val)}
              />
              {/* </div> */}
            </div>
            {/* <div className="my-auto">
              <Button
                className="pl-2"
                onClick={() => {
                  setOpenFilter(!openFilter);
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
            </div> */}
            <div className="flex-grow" />
            <div className="flex flex-row space-x-4">
              <Button
                className="border-daisy-bush text-daisy-bush rounded-md font-semibold"
                onClick={() => onDispatchClick()}
                // TODO: UNCOMMENT WITH API and check name
                // disabled={!accessObject.includes("PostDispatch")}
              >
                <PlusOutlined />
                Dispatch
              </Button>
              <Button
                className="border-daisy-bush text-daisy-bush rounded-md font-semibold"
                onClick={() => onNotificationClick()}
                // disabled={!accessObject.includes("PostNotification")}
              >
                <PlusOutlined />
                Notification
              </Button>
              <Button
                className="border-daisy-bush text-daisy-bush rounded-md font-semibold"
                onClick={() => onWorkOrderClick()}
                // disabled={!accessObject.includes("PostWorkOrder")}
              >
                <PlusOutlined />
                WorkInPRocess
              </Button>
            </div>
          </div>

          {/* BODY CONTENT */}
          {equipmentList.length > 0 ? (
            <div className="bg-athens-gray p-2 rounded-md w-full">
              <DataTable
                columns={columns}
                dataSource={equipmentList}
                pagination={true}
                showViewMoreExpandable={true}
                expandIconColumnIndex={10}
                expandableView={MaintenanceExpandableView}
                rowKey={"Id"}
              />
            </div>
          ) : (
            <div className="w-full text-center text-3xl text-iron pt-24 mb-6">
              No Equipment Found
            </div>
          )}
        </Row>
      </div>
      <SideDrawer
        showModal={openFilter}
        isFooterVisible={null}
        wrapperClassName=" custom-modal left-search-bar animate-right "
        hideCancel={true}
        hideCui={true}
      >
        <div>Filters go here</div>
        <Button onClick={() => setOpenFilter(false)}>Close</Button>
      </SideDrawer>
      {isModalVisible && (
        <SideDrawer
          showModal={true}
          title="Create Dispatch"
          isFooterVisible={null}
          wrapperClassName=" custom-modal left-search-bar layoutFix animate-right"
          onClose={() => setIsModalVisible(false)}
        >
          <DispatchCreate
            onClose={() => {
              setIsModalVisible(false);
              //getNotificationList();
            }}
          />
        </SideDrawer>
      )}
    </Layout>
  );
};

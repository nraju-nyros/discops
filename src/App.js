import logo from './logo.svg';
import './App.css';
import { Home } from "./modules/home";
import { JsonData } from "./modules/JsonData";

import { Purchasing } from "./modules/purchasing/Purchasing";
import { PurchaseNew } from "./modules/purchasing/PurchaseNew";
import { DispatchList } from "./modules/dispatch/DispatchList";
import { DispatchCreate } from "./modules/dispatch/DispatchCreate";
// import { DispatchCreate1 } from "./modules/dispatch/DispatchCreate";

import { CompletedDispatchNotification } from "./modules/dispatch/CompletedDispatchNotification";

import { NotificationsList } from "./modules/notifications/NotificationsList";
import { WorkInProcessList } from "./modules/workInProcess/WorkInProcessList";


import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { createBrowserHistory } from "history";
const history = createBrowserHistory();


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/json" element={<JsonData/>}/>
          <Route exact path="/purchasing" element={<Purchasing/>}/>
          <Route exact path="/purchase/new" element={<PurchaseNew/>}/>
          <Route exact path="/dispatch" element={<DispatchList/>}/>
          <Route exact path="/dispatch/new" element={<DispatchCreate/>}/>
          <Route exact path="/dispatch/completeddispatchnotification" element={<CompletedDispatchNotification/>}/>
          <Route exact path="/notifications" element={<NotificationsList/>}/>
          <Route exact path="/workinprocess" element={<WorkInProcessList/>}/>



        </Routes>
      </Router>
    </>
  );
}

export default App;

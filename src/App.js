import logo from './logo.svg';
import './App.css';
import { Home } from "./modules/home";
import { Purchasing } from "./modules/purchasing/Purchasing";
import { PurchaseNew } from "./modules/purchasing/PurchaseNew";
import { DispatchList } from "./modules/dispatch/DispatchList";
import { DispatchCreate } from "./modules/dispatch/DispatchCreate";

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { createBrowserHistory } from "history";
const history = createBrowserHistory();


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/purchasing" element={<Purchasing/>}/>
          <Route exact path="/purchase/new" element={<PurchaseNew/>}/>
          <Route exact path="/dispatch" element={<DispatchList/>}/>
          <Route exact path="/dispatch/new" element={<DispatchCreate/>}/>

        </Routes>
      </Router>
    </>
  );
}

export default App;

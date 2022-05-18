import logo from './logo.svg';
import './App.css';
import { Purchasing } from "./modules/purchasing/Purchasing";
import { Home } from "./modules/home";
import { PurchaseNew } from "./modules/purchasing/PurchaseNew";

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
        </Routes>
      </Router>
    </>
  );
}

export default App;

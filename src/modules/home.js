
import React from 'react';
import { useHistory, Link } from "react-router-dom";

export const Home = () => {
  return (
    <>
      <div style={{textAlign: 'center'}}>
        <br/><br/><br/>
        <h2>Home </h2>
        <Link to="/Purchasing">Purchasing</Link>&nbsp;&nbsp;&nbsp;
        <Link to="/dispatch">Dispatch</Link>
      </div>
    </>
  )
}
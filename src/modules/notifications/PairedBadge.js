import React, { useState } from "react";

const PairedBadge = ({ title, value, index, classWrapper, onDelete, viewMode }) => {
  const ActivitiesStyles = {
    background: "rgb(78 44 144)",
    color: "rgb(255, 255, 255)",

    Width: "auto",
    borderRadius: "20px",
    textAlign: "center",
    display: "inline-block",
  };
  const tempstyles = {
    paddingLeft: "10px",
    paddingRight: "10px",
  };
  const hotstyles = {
    paddingLeft: "10px",
    background: "#c4c4dd",
    padding: "2px 10px 3px 15px",
    color: "#000",
  };
  const hotZstyles = {
    paddingLeft: "10px",
    background: "#c4c4dd",
    padding: "1px 9px 1px 18px",
    color: "#000",
    borderTopRightRadius: "25px",
    borderBottomRightRadius: "25px",
  };
  const btnstyles = {
    background: "#c4c4dd",
    // paddingLeft: "8px",
    // paddingRight: "0px",
    borderTopRightRadius: "25px",
    borderBottomRightRadius: "25px",
    paddingBottom: "2px",
    paddingTop: "1px",
  };
  const xstyles = {
    color: "rgb(255 255 255)",
    background: "#d95128",
    borderRadius: "50%",
    padding: "2px 7px 2px 7px",
    marginRight: "-2px",
  };
  return (
    <span style={ActivitiesStyles} className={classWrapper}>
      <span style={tempstyles}>{title}</span>
      { !viewMode ? <span style={hotstyles}>{value}</span> : <span style={hotZstyles}>{value}</span>}
     {!viewMode ? <button style={btnstyles} type="button" onClick={()=>onDelete(index)}>
        <span style={xstyles}>X</span>
      </button> : ""}
    </span>

);
};

export default PairedBadge;

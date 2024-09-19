import React, { useState } from "react";
import "../styles/Header.css";
import displayicn from "../icons_FEtask/Display.svg";
import downicn from "../icons_FEtask/down.svg";

const Header = ({ groupBy, sortBy, handleGroupChange, handleSortChange }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="header">
      <button className="display-button" onClick={toggleDropdown}>
        <div style={{paddingTop:"3px",marginRight:"5px"}}>

        <img src={displayicn} alt="" />
        </div>
        <div>
          
        <span>Display</span>
        </div>
        <div style={{paddingTop:"4px",marginLeft:"5px"}}>
          
        <img src={downicn} alt="" />
        </div>
      </button>
      {isDropdownOpen && (
        <div className="dropdown-menu">
          <div className="dropdown-section">
            <label>
              Grouping:
              <select value={groupBy} onChange={handleGroupChange} className="selectclass">
                <option value="status">Status</option>
                <option value="userId">User</option>
                <option value="priority">Priority</option>
              </select>
            </label>
          </div>
          <div className="dropdown-section">
            <label>
              Ordering:
              <select value={sortBy} onChange={handleSortChange} className="selectclass">
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;

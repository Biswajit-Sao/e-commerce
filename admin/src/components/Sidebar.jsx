import React from "react";
import { CiBoxList } from "react-icons/ci";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdBorderColor } from "react-icons/md";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <NavLink to="/add" className="sidebar-link">
        <IoIosAddCircleOutline className="icon" />
        <p>Add Items</p>
      </NavLink>
      <NavLink to="/list" className="sidebar-link">
        <CiBoxList className="icon" />
        <p>List Items</p>
      </NavLink>
      <NavLink to="/orders" className="sidebar-link">
        <MdBorderColor className="icon" />
        <p>Orders</p>
      </NavLink>
    </div>
  );
};

export default Sidebar;

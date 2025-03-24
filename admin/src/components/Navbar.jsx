import React from "react";
import "./Navbar.css";

const Navbar = ({setToken}) => {
  return (
    <nav className="navbar">
      <h1>Logo</h1>
      <button onClick={()=>setToken('')} className="logout-btn">Logout</button>
    </nav>
  );
};

export default Navbar;

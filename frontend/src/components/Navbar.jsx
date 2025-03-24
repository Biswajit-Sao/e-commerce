import React, { useContext, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { IoSearchSharp } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { CiLogout } from "react-icons/ci";
import { BsCartCheckFill } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { GoX } from "react-icons/go";
import "./Navbar.css";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const {
    setShowSearch,
    getCartCount,
    token,
    setToken,
    setCartItes,
    navigate,
  } = useContext(ShopContext);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setCartItes({});
    navigate("/login");
  };

  return (
    <div className="navbar-container">
      <div className="navbar-logo">
        <Link to="/">
          <h2>Logo</h2>
        </Link>
      </div>

      <div className="navbar-links">
        <ul className="navbar-menu">
          <li>
            <NavLink to="/" className="navbar-link">
              <p>HOME</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="/collection" className="navbar-link">
              <p>COLLECTION</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className="navbar-link">
              <p>ABOUT</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className="navbar-link">
              <p>CONTACT</p>
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="navbar-icons">
        <IoSearchSharp
          className="navbar-icon "
          onClick={() => setShowSearch(true)}
        />
        <div className="navbar-profile">
          <Link to="/login">
            <CgProfile className="navbar-icon" />
          </Link>
          {/* Dropdown menu */}
          {token && (
            <div className="navbar-dropdown">
              <p>My Profile</p>
              <p onClick={() => navigate("/orders")}>Orders</p>
              <p onClick={logout}>
                <CiLogout />
                Logout
              </p>
            </div>
          )}
        </div>
        <Link to="/cart" className="navbar-cart">
          <BsCartCheckFill className="navbar-icon" />
          <p className="cart-count">{getCartCount()}</p>
        </Link>
      </div>

      {/* Responsive menu button */}
      <div className="navbar-hamburger" onClick={() => setVisible(true)}>
        <GiHamburgerMenu className="navbar-icon" />
      </div>

      {/* Sidebar menu for small screens */}
      <div className={`navbar-sidebar ${visible ? "visible" : ""}`}>
        <div className="sidebar-close" onClick={() => setVisible(false)}>
          <GoX className="navbar-icon" />
        </div>
        <ul className="sidebar-menu">
          <li>
            <NavLink
              onClick={() => setVisible(false)}
              to="/"
              className="sidebar-link"
            >
              <p>HOME</p>
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={() => setVisible(false)}
              to="/collection"
              className="sidebar-link"
            >
              <p>COLLECTION</p>
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={() => setVisible(false)}
              to="/about"
              className="sidebar-link"
            >
              <p>ABOUT</p>
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={() => setVisible(false)}
              to="/contact"
              className="sidebar-link"
            >
              <p>CONTACT</p>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;

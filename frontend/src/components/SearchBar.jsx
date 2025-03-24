import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { FaSearch } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import "./SearchBar.css";
import { useLocation } from "react-router-dom";
const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } =useContext(ShopContext);

  const[visible,setVisible]=useState(false)

  const location=useLocation()
  useEffect(()=>{
    if(location.pathname.includes('collection')){
        setVisible(true)
    }
    else{
        setVisible(false)
    }
  },[location])

  return showSearch && visible ? (
    <div className="search-bar-container">
      <div className="search-input-wrapper">
        <input
          className="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search"
        />
        <FaSearch className="search-icon" />
      </div>
      <button className="close-button" onClick={() => setShowSearch(false)}>
        <RxCross2 className="close-icon" />
      </button>
    </div>
  ) : null;
};

export default SearchBar;

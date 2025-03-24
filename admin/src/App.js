import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import Login from "./components/Login";

export const backendUrl ="http://localhost:5000" ;




const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token'):"");

  useEffect(()=>{
    localStorage.setItem('token',token)
  },[token])

  return (
    <>
      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <div className="app-container">
          <Navbar setToken={setToken}/>
          <div className="app-layout">
            <Sidebar />
            <div className="app-content">
              <Routes>
                <Route path="/add" element={<Add token={token}/>} />
                <Route path="/list" element={<List token={token}/>} />
                <Route path="/orders" element={<Orders token={token}/>} />
              </Routes>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default App;

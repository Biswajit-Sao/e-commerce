import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./Login.css"; // Import the CSS file
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";

const Login = () => {
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
  const [currentState, setCurrentState] = useState("Sign Up");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;
      if (currentState === "Sign Up") {
        response = await axios.post(backendUrl + "/api/user/register", {
          name: formData.username,
          email: formData.email,
          password: formData.password,
        });
      } else {
        response = await axios.post(backendUrl + "/api/user/login", {
          email: formData.email,
          password: formData.password,
        });
      }

      
      if (response.data.success) {
        setToken(response.data.token);
        await localStorage.setItem('token',response.data.token)
        toast.success("Login Success 😀")
        
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  useEffect(()=>{
    if(token){
      navigate('/')
    }
  },[token,navigate])

  useEffect(()=>{
    if(!token && localStorage.getItem('token')){
      setToken(localStorage.getItem('token'))
    }
  },[])

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">{currentState}</h2>
        <form onSubmit={handleSubmit} className="login-form">
          {currentState === "Sign Up" && (
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="login-input"
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="login-input"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="login-input"
            required
          />
          <button type="submit" className="login-button">
            {currentState}
          </button>
        </form>
        <p
          onClick={() =>
            setCurrentState(currentState === "Sign Up" ? "Login" : "Sign Up")
          }
          className="login-toggle-link"
        >
          {currentState === "Sign Up"
            ? "Already have an account? Login"
            : "Don’t have an account? Sign Up"}
        </p>
      </div>
    </div>
  );
};

export default Login;

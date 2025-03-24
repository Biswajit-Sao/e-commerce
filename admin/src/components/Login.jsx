import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Login = ({setToken}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(backendUrl+'/api/user/admin',{email,password});
      
      if(response.data.success){
        setToken(response.data.token)
        toast.success('Login success 😀')
      }else{
        toast.error(response.data.message)
      }
      
    } catch (error) {
        console.log(error);
        toast.error(error.message)

        
    }
  };

  return (
    <div className="admin-login-container">
      <h2 className="admin-heading">Admin Panel</h2>
      <form className="admin-form" onSubmit={handleSubmit}>
        <div className="admin-input-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="admin-input-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="admin-btn">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;

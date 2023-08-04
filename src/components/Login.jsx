import React from "react";
import "./myStyles.css";
import logo from "../assets/chat.png";
import { Button, TextField } from "@mui/material";

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-logo-area">
        <img src={logo} alt="logo" className="login-logo" />
        <p className='welcome-text'> Every 'hello' is a chance to find a friend for a lifetime.</p>
      </div>
      <div className="login-area">
        <p className="login-heading">Login to your Account</p>

        <TextField id="standard-basic" label="Username" variant="outlined" />
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
        />
        <Button variant="outlined">Login</Button>
      </div>
    </div>
  );
};

export default Login;

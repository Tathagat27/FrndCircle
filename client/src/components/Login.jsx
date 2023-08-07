import "./myStyles.css";
import logo from "../assets/chat.png";
import { Backdrop, Button, CircularProgress, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Toaster from "./Toaster";
import axios from "axios";

const Login = () => {

  const [userData, setUserData] = useState({name: "", password: ""});
  const [loading, setLoading] = useState(false);
  const [loginStatus, setSignupStatus] = useState("");

  const nav = useNavigate();

  const changeHandler = (e) => {
    setUserData({...userData, [e.target.name]: e.target.value})
  }


  const loginHandler = async () => {
    setLoading(true);
    try{
      const config = {
        headers: {
          "Content-type": "application/json"
        },
      };

      const response = await axios.post(
        "http://localhost:8080/user/login/",
        userData,
        config
      );

      console.log(response);

      setSignupStatus({ msg: "Success", key: Math.random() });
      nav("/app/welcome")
      localStorage.setItem("userData", JSON.stringify(response));

    }
    catch(error){
      console.log(error.response.data);
      if(error.response.status === 405){
        setSignupStatus({
          msg: "USer with this email ID already exists",
          key: Math.random()
        })
      }
      if(error.response.status == 406){
        setSignupStatus({
          msg: "User Name already Taken, Please choose another Username",
          key: Math.random()
        })
      }
    }

      
    setLoading(false);

  }

  return (
    <div className="login-container">
    <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1}} open={loading}>
      <CircularProgress color="secondary" />
    </Backdrop>
      <div className="login-logo-area">
        <img src={logo} alt="logo" className="login-logo" />
        <p className="welcome-text">
       
          {`Every 'hello' is a chance to find a friend for a lifetime.`}
        </p>
      </div>
      <div className="login-area">
        <p className="login-heading">Login to your Account</p>

        <TextField onChange={changeHandler} id="standard-basic" label="Username" variant="outlined" name="name" />
        <TextField
          onChange={changeHandler} 
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          name="password"
        />
        <Button variant="outlined" onClick={loginHandler}>Login</Button>

        <p>{`Don't have an Account? `} <Link to={"/signup"} style={{textDecoration: 'none', color: 'blue'}} > Signup</Link></p>
        
        { loginStatus ? (
          <Toaster key={loginStatus.key} message={loginStatus.msg} />
        ) : null}

      </div>
    </div>
  );
};

export default Login;

import { Backdrop, Button, CircularProgress, TextField } from "@mui/material";
import logo from "../assets/chat.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import Toaster from "./Toaster.jsx";

const Signup = () => {

  const [userData, setUserData] = useState({name: "", email: "", password: ""});
  const [loading, setLoading] = useState(false);
  const [signupStatus, setSignupStatus] = useState("");

  const nav = useNavigate();

  const changeHandler = (e) => {
    setUserData({...userData, [e.target.name]: e.target.value})
  }


  const signupHandler = async () => {
    setLoading(true);
    try{
      const config = {
        headers: {
          "Content-type": "application/json"
        },
      };

      const response = await axios.post(
        "http://localhost:8080/user/signup/",
        userData,
        config
      );

      console.log(response);

      setSignupStatus({ msg: "Success", key: Math.random() });
      nav("/app/welcome")
      localStorage.setItem("userData", JSON.stringify(response));

    }
    catch(error){
      console.log(error);
      if(error.response && error.response.status === 400){
        setSignupStatus({
          msg: "All necessary input fields have not been filled",
          key: Math.random()
        })
      }
      else if(error.response && error.response.status === 405){
        setSignupStatus({
          msg: "User with this email ID already exists",
          key: Math.random()
        })
      }
      else if(error.response && error.response.status == 406){
        setSignupStatus({
          msg: "Username already Taken, Please choose another Username",
          key: Math.random()
        })
      }
      else{
        setSignupStatus({
          msg: "Network Error",
          key: Math.random()
        })
      }
    }

      
    setLoading(false);

  }

  return (
    <div className="signup-container">
    <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1}} open={loading}>
      <CircularProgress color="secondary" />
    </Backdrop>
      <div className="signup-logo-area">
        <img src={logo} alt="logo" className="signup-logo" />
        <p className="welcome-text">
          {`Every 'hello' is a chance to find a friend for a lifetime.`}
        </p>
      </div>
      <div className="signup-area">
        <p className="signup-heading">Create your Account</p>

        <TextField onChange={changeHandler} label="Username" variant="outlined" name="name" />
        <TextField onChange={changeHandler} label="Email" variant="outlined" name="email" />
        <TextField
          onChange={changeHandler} id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          name="password"
        />
        <Button variant="outlined" onClick={signupHandler}>Sign Up</Button>
        <p>{`Already have an Account? `} <Link to={"/"} style={{textDecoration: 'none', color: 'blue'}}>Login</Link>  
        </p>

        { signupStatus ? (
          <Toaster key={signupStatus.key} message={signupStatus.msg} />
        ) : null}
          
        
      </div>
    </div>
  );
};

export default Signup;

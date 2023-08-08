import './myStyles.css'
import logo from '../assets/chat.png'
import wavingHand from '../assets/wavingHand.png'
import { useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux";
import { motion } from "framer-motion";


const Welcome = () => {
  
  const lightTheme = useSelector((state) => state.themeKey);

  const userData = JSON.parse(localStorage.getItem("userData"))
  console.log(userData);

  const nav = useNavigate();
  if(!userData){
    console.log("User not Authenticated");
    nav("/");
  }

  return (
    <div className={'welcome' + (lightTheme ? "" : " dark")}>
      <motion.img
        drag
        whileTap={{ scale: 1.05, rotate: 10 }}
        src={logo}
        alt="Logo"
        className='welcome-logo'
      />
      <p className='hello-msg'>{`Hello ${userData.data.name}`}<img src={wavingHand} alt='hello' className='wavingHand' /></p>
      
      <p className={'welcome-text' + (lightTheme ? "" : " dark")}> {
        `Every 'hello' is a chance to find a friend for a lifetime.`
        }</p>
    </div>
  )
}

export default Welcome

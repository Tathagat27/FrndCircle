import './myStyles.css'
import logo from '../assets/chat.png'
import wavingHand from '../assets/wavingHand.png'
import { useNavigate } from 'react-router-dom'


const Welcome = () => {

  const userData = JSON.parse(localStorage.getItem("userData"))
  console.log(userData);

  const nav = useNavigate();
  if(!userData){
    console.log("User not Authenticated");
    nav("/");
  }

  return (
    <div className='welcome'>
      <img src={logo} alt='logo' className='welcome-logo' />
      <p className='hello-msg'>{`Hello ${userData.data.name}`}<img src={wavingHand} alt='hello' className='wavingHand' /></p>
      
      <p className='welcome-text'> {
        `Every 'hello' is a chance to find a friend for a lifetime.`
        }</p>
    </div>
  )
}

export default Welcome

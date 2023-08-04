import React from 'react'
import './myStyles.css'
import logo from '../assets/chat.png'

const Welcome = () => {
  return (
    <div className='welcome'>
      <img src={logo} alt='logo' className='welcome-logo' />
      <p className='welcome-text'> Every 'hello' is a chance to find a friend for a lifetime.</p>
    </div>
  )
}

export default Welcome

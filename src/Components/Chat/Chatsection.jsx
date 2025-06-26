import React from 'react'
import './Chatsection.css'
import { IoSend } from "react-icons/io5";

import Darkmode from '../darkMode/darkmode.jsx'
const Chatsection = () => {
  return (
    <div className='chatsection'>
        <div className="topsection">
            <div className="heading">
            <span>Hello User,</span>
            <span>What would you like to do today?</span>
            </div>

        </div>
        <div className="bottomsection">
            <input type="text" placeholder='Enter a prompt...' />
            <button id='send-btn'><IoSend /></button>
            <Darkmode/>
        </div>
    </div>
  )
}

export default Chatsection
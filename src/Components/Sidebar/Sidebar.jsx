import React from 'react'
import { RxHamburgerMenu } from "react-icons/rx";
import { FaPlus } from "react-icons/fa";
import { FaRegMessage } from "react-icons/fa6";
import './Sidebar.css';
import { useState } from 'react';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);


  return (
    <div className='sidebar'>
       <RxHamburgerMenu id="hamburger" onClick={
        () => {setIsOpen(prev => !prev)
        console.log(isOpen)}
        } />
    <div className="newChat">
    <FaPlus />
    {isOpen? <p>New chat</p>: null}
    
    </div>

    <div className="recent">
    <FaRegMessage />
    {isOpen? <p>Recent chats</p>: null}
    </div>
    </div>
  )
}

export default Sidebar
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { IoMdSunny } from "react-icons/io";
import './darkmode.css'
const darkmode = () => {
    const [mode, setMode] = useState("lightMode");  

    function toggle (){
        if (mode === "lightMode"){
            setMode("darkMode");
        }else{  
            setMode("lightMode");
        }
    }

    useEffect(() => {
        document.body.className = mode;
    }, [mode]);

  return (
    <div>
        <button className='btn' onClick={() =>{ toggle() 
            console.log(mode)}}> <IoMdSunny/> </button>
    </div>
  )
}

export default darkmode
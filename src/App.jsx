import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Sidebar from './Components/Sidebar/Sidebar'
import Chatsection from './Components/Chat/Chatsection'
import Separation from './Components/Separation/Separation'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Sidebar/>
      <Separation/>
      <Chatsection/>
    </>
  )
}

export default App

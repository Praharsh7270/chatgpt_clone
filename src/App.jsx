import { useState, useEffect, useCallback } from 'react'
import { RxHamburgerMenu } from "react-icons/rx";
import './App.css'
import Sidebar from './Components/Sidebar/Sidebar'
import Chatsection from './Components/Chat/Chatsection'
import Separation from './Components/Separation/Separation'

function App() {
  const [currentChatId, setCurrentChatId] = useState(Date.now());
  const [recentChats, setRecentChats] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Load recent chats on app start
  useEffect(() => {
    const savedChats = localStorage.getItem('recentChats');
    if (savedChats) {
      setRecentChats(JSON.parse(savedChats));
    }
  }, []);

  const handleNewChat = useCallback((newChatId) => {
    setCurrentChatId(newChatId);
    // Close sidebar on mobile after creating new chat
    if (window.innerWidth <= 768) {
      setIsSidebarOpen(false);
    }
  }, []);

  const handleLoadChat = useCallback((chatId) => {
    setCurrentChatId(chatId);
    // Close sidebar on mobile after loading chat
    if (window.innerWidth <= 768) {
      setIsSidebarOpen(false);
    }
  }, []);

  const handleChatUpdate = useCallback((updatedChats) => {
    setRecentChats(updatedChats);
  }, []);

  const toggleSidebar = useCallback(() => {
    console.log('Toggle sidebar called, current state:', isSidebarOpen);
    setIsSidebarOpen(!isSidebarOpen);
  }, [isSidebarOpen]);

  const closeSidebar = useCallback(() => {
    console.log('Close sidebar called');
    setIsSidebarOpen(false);
  }, []);

  console.log('App render state:', { isSidebarOpen, windowWidth: window.innerWidth });

  return (
    <>
      {/* Mobile hamburger button */}
      <button className="mobile-hamburger" onClick={toggleSidebar}>
        <RxHamburgerMenu />
      </button>

      {/* Mobile overlay */}
      <div 
        className={`sidebar-overlay ${isSidebarOpen ? 'active' : ''}`}
        onClick={closeSidebar}
      />

      {/* Sidebar */}
      <Sidebar 
        onNewChat={handleNewChat}
        onLoadChat={handleLoadChat}
        currentChatId={currentChatId}
        isMobileOpen={isSidebarOpen}
      />

      {/* Main content */}
      <div className="main-content">
        <Separation/>
        <Chatsection 
          currentChatId={currentChatId}
          onChatUpdate={handleChatUpdate}
        />
      </div>
    </>
  )
}

export default App

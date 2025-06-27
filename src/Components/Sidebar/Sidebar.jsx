import React, { useState, useEffect } from 'react'
import { RxHamburgerMenu } from "react-icons/rx";
import { FaPlus } from "react-icons/fa";
import { FaRegMessage } from "react-icons/fa6";
import './Sidebar.css';

const Sidebar = ({ onNewChat, onLoadChat, currentChatId, isMobileOpen }) => {
    const [desktopOpen, setDesktopOpen] = useState(false);
    const [recentChats, setRecentChats] = useState([]);

    // Load recent chats from localStorage on component mount
    useEffect(() => {
        const savedChats = localStorage.getItem('recentChats');
        if (savedChats) {
            setRecentChats(JSON.parse(savedChats));
        }
    }, []);

    // Save recent chats to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('recentChats', JSON.stringify(recentChats));
    }, [recentChats]);

    // Determine if sidebar should be open (mobile or desktop)
    const isMobile = window.innerWidth <= 768;
    const open = isMobile ? isMobileOpen : desktopOpen;

    const handleNewChat = () => {
        const newChatId = Date.now();
        const newChat = {
            id: newChatId,
            title: 'New Chat',
            timestamp: new Date().toLocaleString(),
            messages: []
        };
        // Add to recent chats (keep only last 10)
        setRecentChats(prev => [newChat, ...prev.slice(0, 9)]);
        // Call parent function to start new chat
        onNewChat(newChatId);
    };

    const handleLoadChat = (chatId) => {
        onLoadChat(chatId);
    };

    const handleHamburgerClick = () => {
        // Only for desktop - mobile uses the mobile hamburger
        if (!isMobile) {
            setDesktopOpen(prev => !prev);
        }
    };

    return (
        <div className={`sidebar${isMobile && open ? ' open' : ''}`}> {/* for mobile slide-in */}
            <RxHamburgerMenu 
                id="hamburger" 
                onClick={handleHamburgerClick}
                className={`hamburger-icon ${open ? 'open' : ''}`}
            />
            <div 
                className={`newChat${open ? ' open' : ''}`}
                onClick={handleNewChat}
            >
                <FaPlus />
                {open && <span className="text">New chat</span>}
            </div>
            <div className={`recent${open ? ' open' : ''}`}>
                <FaRegMessage />
                {open && <span className="text">Recent chats</span>}
                {open && recentChats.length > 0 && (
                    <div className="recent-chats-list">
                        {recentChats.map((chat) => (
                            <div 
                                key={chat.id}
                                className={`recent-chat-item ${currentChatId === chat.id ? 'active' : ''}`}
                                onClick={() => handleLoadChat(chat.id)}
                            >
                                <FaRegMessage className="chat-icon" />
                                <div className="chat-info">
                                    <span className="chat-title">{chat.title}</span>
                                    <span className="chat-time">{chat.timestamp}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Sidebar
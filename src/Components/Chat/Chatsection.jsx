import React, { useState, useEffect, useCallback } from 'react'
import './ChatSection.css'
import { IoSend } from "react-icons/io5";
import { generateResponse } from '../../geminiAPI/gemini.js';
import Darkmode from '../darkMode/darkmode.jsx'

const Chatsection = ({ currentChatId, onChatUpdate }) => {
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [chatTitle, setChatTitle] = useState('New Chat');

  // Load messages for current chat
  useEffect(() => {
    const savedChats = JSON.parse(localStorage.getItem('recentChats') || '[]');
    const currentChat = savedChats.find(chat => chat.id === currentChatId);
    
    if (currentChat) {
      setMessages(currentChat.messages || []);
      setChatTitle(currentChat.title || 'New Chat');
    } else {
      setMessages([]);
      setChatTitle('New Chat');
    }
  }, [currentChatId]);

  // Save messages whenever they change
  useEffect(() => {
    if (currentChatId && messages.length > 0) {
      const savedChats = JSON.parse(localStorage.getItem('recentChats') || '[]');
      const chatIndex = savedChats.findIndex(chat => chat.id === currentChatId);
      
      if (chatIndex !== -1) {
        savedChats[chatIndex].messages = messages;
        // Update chat title based on first user message
        if (messages.length > 0) {
          const firstUserMessage = messages.find(msg => msg.sender === 'user');
          if (firstUserMessage) {
            const title = firstUserMessage.text.slice(0, 30) + (firstUserMessage.text.length > 30 ? '...' : '');
            savedChats[chatIndex].title = title;
            setChatTitle(title);
          }
        }
      } else {
        // Create new chat entry
        const newChat = {
          id: currentChatId,
          title: chatTitle,
          timestamp: new Date().toLocaleString(),
          messages: messages
        };
        savedChats.unshift(newChat);
      }
      
      // Keep only last 10 chats
      const updatedChats = savedChats.slice(0, 10);
      localStorage.setItem('recentChats', JSON.stringify(updatedChats));
      
      // Notify parent component only if onChatUpdate exists
      if (onChatUpdate) {
        onChatUpdate(updatedChats);
      }
    }
  }, [messages, currentChatId, chatTitle]); // Removed onChatUpdate from dependencies

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Add user message to chat
    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      console.log('Sending message to Gemini:', inputMessage);
      
      // Get response from Gemini
      const response = await generateResponse(inputMessage);
      
      console.log('Gemini response received:', response);
      
      // Add AI response to chat
      const aiMessage = {
        id: Date.now() + 1,
        text: response,
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Detailed error getting response:', error);
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
      
      // Add error message
      const errorMessage = {
        id: Date.now() + 1,
        text: `Error: ${error.message}`,
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString(),
        isError: true
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className='chatsection'>
        <div className="topsection">
            {messages.length === 0 ? (
              <div className="heading">
                <span>Hello User,</span>
                <span>What would you like to do today?</span>
              </div>
            ) : (
              <div className="messages-container">
                {messages.map((message) => (
                  <div 
                    key={message.id} 
                    className={`message ${message.sender === 'user' ? 'user-message' : 'ai-message'} ${message.isError ? 'error-message' : ''}`}
                  >
                    <div className="message-content">
                      <p>{message.text}</p>
                      <span className="timestamp">{message.timestamp}</span>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="message ai-message">
                    <div className="message-content">
                      <p>Thinking...</p>
                    </div>
                  </div>
                )}
              </div>
            )}
        </div>
        <div className="bottomsection">
            <input 
              type="text" 
              placeholder='Enter a prompt...' 
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
            />
            <button 
              id='send-btn' 
              onClick={handleSendMessage}
              disabled={isLoading || !inputMessage.trim()}
            >
              <IoSend />
            </button>
            <Darkmode/>
        </div>
    </div>
  )
}

export default Chatsection
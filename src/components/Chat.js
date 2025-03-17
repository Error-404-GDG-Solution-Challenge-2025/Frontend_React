import React, { useState } from 'react';
import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import ChatInterface from './ChatInterface';
import Sidebar from './Sidebar';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#10a37f',
    },
    background: {
      default: '#343541',
      paper: '#444654',
    },
  },
  typography: {
    fontFamily: "'Söhne', 'Helvetica Neue', 'Arial', sans-serif",
  },
});

function Chat() {
  const [chats, setChats] = useState([
    { id: 1, title: 'Welcome Chat', messages: [] }
  ]);
  const [activeChat, setActiveChat] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleNewChat = () => {
    const newChat = {
      id: Date.now(),
      title: `New Chat`,
      messages: []
    };
    setChats([...chats, newChat]);
    setActiveChat(newChat.id);
  };

  const handleDeleteChat = (chatId) => {
    const newChats = chats.filter(chat => chat.id !== chatId);
    setChats(newChats);
    if (activeChat === chatId) {
      setActiveChat(newChats[0]?.id || null);
    }
  };

  const handleSendMessage = (message) => {
    const currentChat = chats.find(chat => chat.id === activeChat);
    if (!currentChat) return;

    const updatedChat = {
      ...currentChat,
      messages: [
        ...currentChat.messages,
        { role: 'user', content: message }
      ]
    };

    // Update chat title if it's the first message
    if (currentChat.messages.length === 0) {
      updatedChat.title = message.slice(0, 30) + (message.length > 30 ? '...' : '');
    }

    setChats(chats.map(chat =>
      chat.id === activeChat ? updatedChat : chat
    ));

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = "I'm a simulated response. In a real application, this would be connected to an AI API.";
      setChats(prevChats => prevChats.map(chat =>
        chat.id === activeChat ? {
          ...chat,
          messages: [...chat.messages, { role: 'assistant', content: aiResponse }]
        } : chat
      ));
    }, 1000);
  };

  const currentChat = chats.find(chat => chat.id === activeChat);


  chats.map(chat => console.log("MESSAGES: ",chat.messages));
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
        
        <Sidebar
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          onNewChat={handleNewChat}
          chats={chats}
          onDeleteChat={handleDeleteChat}
          activeChat={activeChat}
          onSelectChat={setActiveChat}
        />
        <ChatInterface
          messages={currentChat?.messages || []}
          onSendMessage={handleSendMessage}
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />
      </Box>
    </ThemeProvider>
  );
}

export default Chat;

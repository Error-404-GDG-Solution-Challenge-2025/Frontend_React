import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Paper,
  TextField,
  IconButton,
  Typography,
  Container,
  Avatar,
  CircularProgress,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import MenuIcon from '@mui/icons-material/Menu';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';

const ChatInterface = ({ messages, onSendMessage, isSidebarOpen, onToggleSidebar }) => {
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setIsTyping(true);
      onSendMessage(input);
      setInput('');
      setTimeout(() => setIsTyping(false), 1000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        backgroundColor: '#343541',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          display: { xs: 'flex', sm: isSidebarOpen ? 'none' : 'flex' },
          alignItems: 'center',
          p: 2,
          borderBottom: 1,
          borderColor: 'divider',
          backgroundColor: 'background.paper',
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={onToggleSidebar}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          Brand Name
        </Typography>
      </Box>

      <Container
        maxWidth="md"
        sx={{
          flexGrow: 1,
          overflow: 'auto',
          py: 3,
          px: { xs: 2, sm: 3 },
          scrollbarWidth: 'thin',
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#2A2B32',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#565869',
            borderRadius: '4px',
          },
        }}
      >
        {messages.map((message, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              mb: 3,
              gap: 2,
              backgroundColor: message.role === 'assistant' ? '#444654' : 'transparent',
              p: { xs: 2, sm: 3 },
              borderRadius: 1,
              width: '100%',
            }}
          >
            <Avatar
              sx={{
                bgcolor: message.role === 'assistant' ? '#10a37f' : '#5436DA',
                width: 36,
                height: 36,
              }}
            >
              {message.role === 'assistant' ? <SmartToyIcon /> : <PersonIcon />}
            </Avatar>
            <Box sx={{ flexGrow: 1 }}>
              <Typography
                variant="body1"
                sx={{
                  whiteSpace: 'pre-wrap',
                  color: '#ECECF1',
                  lineHeight: 1.75,
                  fontSize: '1rem',
                }}
              >
                {message.content}
              </Typography>
            </Box>
          </Box>
        ))}
        {isTyping && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              p: 2,
              backgroundColor: '#444654',
              borderRadius: 1,
            }}
          >
            <Avatar sx={{ bgcolor: '#10a37f' }}>
              <SmartToyIcon />
            </Avatar>
            <CircularProgress size={20} sx={{ color: '#10a37f' }} />
          </Box>
        )}
        <div ref={messagesEndRef} />
      </Container>

      <Paper
        component="form"
        onSubmit={handleSubmit}
        sx={{
          p: 2,
          backgroundColor: '#343541',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 0 15px rgba(0,0,0,0.2)',
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              fullWidth
              multiline
              maxRows={4}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Send a message..."
              variant="outlined"
              size="small"
              inputRef={inputRef}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#40414F',
                  color: 'white',
                  '& fieldset': {
                    borderColor: 'rgba(255,255,255,0.1)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(255,255,255,0.2)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#10a37f',
                  },
                },
                '& .MuiOutlinedInput-input': {
                  '&::placeholder': {
                    color: 'rgba(255,255,255,0.5)',
                  },
                },
              }}
            />
            <IconButton
              type="submit"
              disabled={!input.trim()}
              sx={{
                alignSelf: 'flex-end',
                color: input.trim() ? '#10a37f' : 'rgba(255,255,255,0.3)',
                mb: 0.5,
                '&:hover': {
                  backgroundColor: 'rgba(16, 163, 127, 0.1)',
                },
              }}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Container>
      </Paper>
    </Box>
  );
};

export default ChatInterface; 
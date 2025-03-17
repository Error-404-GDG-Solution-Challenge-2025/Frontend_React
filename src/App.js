import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './styles/App.css';

// Component imports
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';
import Chat from './components/Chat';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = '';
  };

  return (
    <Router>
      <AppContent openModal={openModal} isModalOpen={isModalOpen} closeModal={closeModal} />
    </Router>
  );
}

function AppContent({ openModal, isModalOpen, closeModal }) {
  const location = useLocation();
  const isChatPage = location.pathname === "/chat";

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="App">
      {!isChatPage && <Navbar />} {/* Hide Navbar on /chat */}
      
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero openModal={openModal} />
                <Services />
                <Contact />
              </>
            }
          />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </main>

      {!isChatPage && <Footer />} {/* Hide Footer on /chat */}
      
      <LoginModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}

export default App;

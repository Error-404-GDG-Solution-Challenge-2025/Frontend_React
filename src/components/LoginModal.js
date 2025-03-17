
// components/LoginModal.js
import React, { useState } from 'react';

const LoginModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the login data to a server
    console.log('Login attempt:', formData);
    
    // For demo purposes, show success message
    alert('Login successful!');
    onClose();
    setFormData({ email: '', password: '' });
  };

  return (
    <div className={`modal-overlay ${isOpen ? 'active' : ''}`} id="loginModal">
      <div className="login-modal">
        <button className="close-modal" aria-label="Close modal" onClick={onClose}>&times;</button>
        <h2>Login to Your Account</h2>
        <form className="login-form" id="loginForm" onSubmit={handleSubmit}>
          <input 
            type="email" 
            className="form-input" 
            placeholder="Email" 
            name="email"
            required 
            value={formData.email}
            onChange={handleChange}
          />
          <input 
            type="password" 
            className="form-input" 
            placeholder="Password" 
            name="password"
            required 
            value={formData.password}
            onChange={handleChange}
          />
          <button type="submit" className="login-button">Login</button>
        </form>
        <div className="login-options">
          <p>Don't have an account? <a href="#signup">Sign up</a></p>
          <p><a href="#forgot-password">Forgot password?</a></p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
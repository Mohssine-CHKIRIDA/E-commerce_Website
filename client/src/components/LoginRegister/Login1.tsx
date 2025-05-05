import React from 'react';
import './Login1.css';

const Login1: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    alert('Logged in!');
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Log In</h2>
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Log In</button>
        <p className="register-link">
          Don’t have an account? <a href="#">Register</a>
        </p>
      </form>
    </div>
  );
};

export default Login1;

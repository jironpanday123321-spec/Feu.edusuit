import React, { useState, useEffect } from 'react';
import Homepage from './components/homepage';
import Profile from './pages/profile';
import Grades from './pages/grades';
import Login from './login/Login';
import './App.css';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  const [currentPage, setCurrentPage] = useState(() => {
    return localStorage.getItem('currentPage') || 'home';
  });

  const navigateTo = (page) => {
    setCurrentPage(page);
    localStorage.setItem('currentPage', page);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
    navigateTo('home');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentPage');
  };

  if (!isLoggedIn) {
    return (
      <div className="App">
        <Login onLogin={handleLogin} />
      </div>
    );
  }

  return (
    <div className="App">
      {currentPage === 'home' && <Homepage navigateTo={navigateTo} onLogout={handleLogout} />}
      {currentPage === 'profile' && <Profile navigateTo={navigateTo} onLogout={handleLogout} />}
      {currentPage === 'grades' && <Grades navigateTo={navigateTo} onLogout={handleLogout} />}
    </div>

  );
}

export default App;

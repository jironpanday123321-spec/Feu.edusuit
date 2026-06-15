import React, { useState } from 'react';
import './sideber.css';
import feuLogo from '../assets/feuLogo.jpg'; // Assuming the logo can be reused for the header

const Sidebar = ({ isModalOpen, setIsModalOpen, currentPage, navigateTo }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <button className="menu-btn" onClick={() => setIsCollapsed(!isCollapsed)}>&#9776;</button>
        <div className="school-logo">
          <img src={feuLogo} alt="Student Central" />
        </div>
        <span className="school-name">FAR EASTERN UNIVERSITY</span>
      </div>

      <div className="user-profile">
        <div className="user-name-dropdown">
          <span className="user-name">PATRICK COMEDIAM <span className="dropdown-arrow">&#9662;</span></span>
        </div>
        <p className="user-email">2022062691@feu.edu.ph</p>
        <p className="user-course">BSPSYCH - 2024<br /><strong>Bachelor of Science in Psychology</strong></p>
        <p className="user-id">Student Number: 2022062691</p>
      </div>

      <div className="nav-menu">
        <a href="#" className={`nav-item ${currentPage === 'home' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); navigateTo && navigateTo('home'); }}>
          <span className="icon">&#8962;</span> <span className="nav-text">Home</span>
        </a>
        <a href="#" className={`nav-item ${currentPage === 'profile' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); navigateTo && navigateTo('profile'); }}>
          <span className="icon">&#128100;</span> <span className="nav-text">Profile</span>
        </a>

        <div className="nav-section-title">MENU</div>
        <a href="#" className={`nav-item ${currentPage === 'grades' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); navigateTo && navigateTo('grades'); }}>
          <span className="icon">&#127891;</span> <span className="nav-text">My Grades</span>
        </a>

        <div className="nav-section-title">SUPPORT</div>
        <button
          className="nav-item get-help-btn"
          onClick={() => setIsModalOpen(true)}
        >
          <span className="icon">&#10010;</span> <span className="nav-text">Get Help? ask Vercel </span>
        </button>
        <div className="nav-toggle">
          <span className="toggle-label">OFF <span className="toggle-switch"></span> Enable Tips</span>
        </div>
      </div>

      <div className="sidebar-footer">
        <p>Version 2.11.0.12</p>
        <p>Powered By <a href="#">Edusuite NEO and Vercel</a></p>
      </div>
    </div>
  );
};

export default Sidebar;

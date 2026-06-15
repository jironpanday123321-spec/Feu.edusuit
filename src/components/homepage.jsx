import React, { useState } from 'react';
import Sidebar from './sidebar';
import './homepage.css';

const Homepage = ({ navigateTo, onLogout }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="homepage-container">
      <Sidebar isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} currentPage="home" navigateTo={navigateTo} onLogout={onLogout} />

      <div className="main-content">
        <div className="main-header">
          <h1>Home</h1>
          <div className="header-dropdown">
            Show data for{' '}
            <select defaultValue="current">
              <option value="current">Current Semester (2nd Semester S.Y. 2025-2026)</option>
            </select>
          </div>
        </div>

        <div className="content-body">
          <div className="blue-banner">
            <div className="bb-title">EDUSUITE TIPS</div>
            <div className="bb-content">
              Enrollment is open for <span className="bb-highlight">2025-2026 Semester Midyear...</span>
            </div>
            <div className="bb-desc" style={{ paddingRight: '150px' }}>
              You must verify your information in your profile page and complete your unfinished clearances to enlist. If you think this is an error please email the school registrar.
            </div>
            <button className="btn-go-enrollment">
              Go To Enrollment
            </button>
          </div>

          <div className="blue-banner">
            <div className="bb-title">EDUSUITE</div>
            <div className="bb-content">
              <span className="bb-check">&#10004;</span> Marked as Enrolling for <span className="bb-highlight">2025-2026 Semes...</span>
            </div>
            <div className="bb-desc">
              You are currently tagged as enrolling for <strong>2025-2026 Semester</strong>.
            </div>
          </div>

          <div className="midyear-card">
            <div className="carousel-nav">
              <span>&lt;</span>
              <span>&gt;</span>
            </div>
            <h2>Midyear Term SY 2025-2026</h2>
            <p>See the enrollment schedule for midyear term SY 2025-2026.</p>
            <button className="btn-read-now">Read Now</button>
            <div className="carousel-dots">
              <div className="dot"></div>
              <div className="dot active"></div>
              <div className="dot"></div>
            </div>
          </div>


          <div className="section-block">
            <div className="section-header">BALANCE</div>
            <div className="section-body" style={{ backgroundColor: '#e6f0f5', padding: '20px' }}>
              <div className="balance-amount">Outstanding Balance : 47,798.47</div>
              <div className="balance-info">
                <span className="icon">&#8505;</span> You can now view your Balance widget in the <a href="#" style={{ color: '#00a4ef' }}>My Payments</a> page.
              </div>
            </div>
          </div>
        </div>

        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <span>Get Help</span>
                <button className="btn-close" onClick={() => setIsModalOpen(false)}>&times;</button>
              </div>
              <div className="modal-body">
                <h3>Edusuite Support</h3>
                <a href="#" className="modal-link">
                  Read our FAQs <span className="ext-icon">&#8599;</span>
                </a>
                <a href="#" className="modal-link">
                  Report a bug <span className="ext-icon">&#8599;</span>
                </a>
                <a href="#" className="modal-link">
                  Make a suggestion <span className="ext-icon">&#8599;</span>
                </a>
              </div>
              <div className="modal-footer">
                <button className="btn-modal-close" onClick={() => setIsModalOpen(false)}>Close</button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="tasks-sidebar">
        <h2>Tasks</h2>

        <div className="task-category">
          <div className="tc-header">Hold Orders <span className="info-icon-small">i</span></div>
          <div className="task-item">
            <div className="ti-title">Outstanding Balance</div>
            <div className="ti-desc">
              Please settle your balance to be able to enlist<br />
              For Verification &bull; Due on: 06-20-2026
            </div>
            <span className="enlistment-tag">ENLISTMENT</span>
          </div>
        </div>

        <div className="task-category">
          <div className="tc-header">Clearance <span className="info-icon-small">i</span></div>
          <div className="empty-task">No clearances assigned.</div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;

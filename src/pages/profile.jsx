import React, { useState } from 'react';
import Sidebar from '../components/sidebar';
import './profile.css';

const Profile = ({ navigateTo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="page-container">
      <Sidebar isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} currentPage="profile" navigateTo={navigateTo} />

      <div className="page-content">
        <div className="page-header">
          <h1>Profile</h1>
        </div>

        <div className="page-body">
          <div className="verify-alert">
            <div style={{ fontSize: '0.7rem', color: '#999', marginBottom: '5px' }}>VERIFY INFORMATION</div>
            <p>Is the information correct? Please make necessary changes if needed.</p>
            <div className="verify-link"><span>&#10004;</span> I verify that the information is correct</div>
          </div>

          <div className="section">
            <div className="section-title" style={{ textTransform: 'none' }}>
              Basic Information <span className="edit-link"><span className="icon">&#9998;</span> Edit</span>
            </div>

            <div className="grid-3-col">
              <div className="data-group">
                <span className="data-label">Sex <span className="req">*</span></span>
                <span className="data-value">Male</span>
              </div>
              <div className="data-group">
                <span className="data-label">Birthdate <span className="req">*</span></span>
                <span className="data-value">05/03/2004</span>
              </div>
              <div className="data-group">
                <span className="data-label">Mobile number <span className="req">*</span></span>
                <span className="data-value">09353566198</span>
              </div>
              <div className="data-group">
                <span className="data-label">Primary Guardian First Name <span className="req">*</span></span>
                <span className="data-value">Marilyn</span>
              </div>
              <div className="data-group">
                <span className="data-label">Primary Guardian Middle Name</span>
                <span className="data-value">Segundo</span>
              </div>
              <div className="data-group">
                <span className="data-label">Primary Guardian Last Name <span className="req">*</span></span>
                <span className="data-value">Comediam</span>
              </div>
              <div className="data-group">
                <span className="data-label">Primary Guardian Email Address <span className="req">*</span></span>
                <span className="data-value">bayquonp@gmail.com</span>
              </div>
              <div className="data-group">
                <span className="data-label">Primary Guardian Contact number <span className="req">*</span></span>
                <span className="data-value">09353566198</span>
              </div>
              <div className="data-group">
                <span className="data-label">Relation to student <span className="req">*</span></span>
                <span className="data-value">Mother</span>
              </div>
            </div>
          </div>

          <div className="section">
            <div className="section-title" style={{ textTransform: 'none' }}>User Tags</div>
            <div className="grid-3-col">
              <div className="data-group">
                <span className="data-label">Academic Standing</span>
                <div><span className="tag-badge">Unrated</span></div>
              </div>
              <div className="data-group">
                <span className="data-label">Status</span>
                <div><span className="tag-badge">Active</span></div>
              </div>
            </div>
          </div>

          <div className="section">
            <div className="section-title">
              PRIVACY POLICY CONSENT FORM (TO WHOM FEU CAN DISCLOSE MY RECORDS):
              <span className="edit-link"><span className="icon">&#9998;</span> Edit</span>
            </div>
            <div className="grid-3-col">
              <div className="data-group">
                <span className="data-label">Consent given to my Father: <span className="req">*</span></span>
                <span className="data-value">No</span>
              </div>
              <div className="data-group">
                <span className="data-label">Father's Name</span>
                <span className="data-value">Paterno</span>
              </div>
              <div className="data-group">
                <span className="data-label">Father's Contact Number</span>
                <span className="data-value">9353566198</span>
              </div>
              <div className="data-group">
                <span className="data-label">Father's Email</span>
                <span className="data-value">bayquonp@gmail.com</span>
              </div>
              <div className="data-group">
                <span className="data-label">Consent given to my Mother: <span className="req">*</span></span>
                <span className="data-value">No</span>
              </div>
              <div className="data-group">
                <span className="data-label">Mother's Name</span>
                <span className="data-value">Marilyn</span>
              </div>
              <div className="data-group">
                <span className="data-label">Mother's Contact Number</span>
                <span className="data-value">9353566198</span>
              </div>
              <div className="data-group">
                <span className="data-label">Mother's Email</span>
                <span className="data-value">marilynccomediam@yahoo.com</span>
              </div>
              <div className="data-group">
                <span className="data-label">Consent given to my Guardian: <span className="req">*</span></span>
                <span className="data-value">Yes</span>
              </div>
              <div className="data-group">
                <span className="data-label">Guardian's Name</span>
                <span className="data-value">Marilyn Comediam</span>
              </div>
              <div className="data-group">
                <span className="data-label">Guardian's Contact Number</span>
                <span className="data-value">9353566198</span>
              </div>
              <div className="data-group">
                <span className="data-label">Guardian's Email</span>
                <span className="data-value">marilyncomediam@yahoo.com</span>
              </div>
            </div>
          </div>

          <div className="section">
            <div className="section-title">ACADEMIC INFORMATION</div>
            <div className="grid-3-col">
              <div className="data-group">
                <span className="data-label">Annual QPA</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

import React, { useState } from 'react';
import Sidebar from './sidebar';
import './homepage.css';

const Homepage = ({ navigateTo, onLogout }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const hours = [
    '6AM', '7AM', '8AM', '9AM', '10AM', '11AM', '12PM',
    '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM'
  ];

  const scheduleData = [
    { day: 'Mon', start: '10:30', end: '12:00', code: 'PSYC 201', name: 'PSYCHODYNAMIC THEORIES', type: 'LEC' },
    { day: 'Mon', start: '12:00', end: '14:00', code: 'PSYC 310', name: 'FORENSIC PSYCHOLOGY LEC', type: 'LEC' },
    { day: 'Mon', start: '16:30', end: '19:30', code: 'PSYC 350', name: 'RESEARCH PSYCHOLOGY METHODS CASE STUDY 1', type: 'LEC' },

    { day: 'Tue', start: '10:30', end: '12:00', code: 'PSYC 201', name: 'PSYCHODYNAMIC THEORIES', type: 'LAB' },
    { day: 'Tue', start: '12:00', end: '14:00', code: 'PSYC 310', name: 'FORENSIC PSYCHOLOGY LEC', type: 'LEC' },
    { day: 'Tue', start: '16:30', end: '19:30', code: 'PSYC 350', name: 'RESEARCH PSYCHOLOGY METHODS CASE STUDY 1', type: 'LEC' },

    { day: 'Wed', start: '07:30', end: '09:00', code: 'PATHFIT WRP 2', name: '', type: 'LEC' },
    { day: 'Wed', start: '10:30', end: '12:30', code: 'PSYC 311L', name: 'FORENSIC PSYCHOLOGY LAB', type: 'LAB' },
    { day: 'Wed', start: '16:30', end: '19:30', code: 'PSYC 102', name: 'DEVELOPMENTAL PSYCHOLOGY', type: 'LEC' },

    { day: 'Thu', start: '10:30', end: '12:00', code: 'PSYC 201', name: 'PSYCHODYNAMIC THEORIES', type: 'LAB' },
    { day: 'Thu', start: '12:00', end: '14:00', code: 'PSYC 201', name: 'PSYCHODYNAMIC THEORIES', type: 'LEC' },
    { day: 'Thu', start: '16:30', end: '19:30', code: 'PSYC 350', name: 'RESEARCH PSYCHOLOGY METHODS CASE STUDY 1', type: 'LEC' },

    { day: 'Fri', start: '10:30', end: '12:00', code: 'PSYC 201', name: 'PSYCHODYNAMIC THEORIES', type: 'LAB' },
    { day: 'Fri', start: '12:00', end: '14:00', code: 'PSYC 201', name: 'PSYCHODYNAMIC THEORIES', type: 'LEC' },
    { day: 'Fri', start: '16:30', end: '19:30', code: 'PSYC 350', name: 'RESEARCH PSYCHOLOGY METHODS CASE STUDY 1', type: 'LEC' },

    { day: 'Sat', start: '07:30', end: '09:00', code: 'PATHFIT WRP 2', name: '', type: 'LEC' },
    { day: 'Sat', start: '10:30', end: '12:30', code: 'PSYC 311L', name: 'FORENSIC PSYCHOLOGY LAB', type: 'LAB' },
    { day: 'Sat', start: '16:30', end: '19:30', code: 'PSYC 102', name: 'DEVELOPMENTAL PSYCHOLOGY', type: 'LEC' },
  ];

  const getRowSpan = (startTime, endTime) => {
    const parseTime = (t) => {
      const [h, m] = t.split(':').map(Number);
      return h + m / 60;
    };
    const start = parseTime(startTime);
    const end = parseTime(endTime);
    const rowStart = Math.round((start - 6) * 2) + 1;
    const rowEnd = Math.round((end - 6) * 2) + 1;
    return { gridRow: `${rowStart} / ${rowEnd}` };
  };

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
              Enrolled for <span className="bb-highlight">2025-2026 Semester Midyear...</span>
            </div>
            <div className="bb-desc" style={{ paddingRight: '150px' }}>
              You have verified your information in your profile page and completed your clearance to enlist.
            </div>
            <button className="btn-go-enrollment">
              Enrolled
            </button>
          </div>

          <div className="blue-banner">
            <div className="bb-title">EDUSUITE</div>
            <div className="bb-content">
              <span className="bb-check">&#10004;</span> Marked as Enrolled <span className="bb-highlight">2025-2026 Semes...</span>
            </div>
            <div className="bb-desc">
              You are currently tagged as Enrolled for <strong>2025-2026 Semester</strong>. if you have changed your mind please click the the button below.
            </div>
          </div>

          <div className="midyear-card">
            <h2>Midyear Term SY 2025-2026</h2>
            <p>Enrolled schedule for midyear term SY 2025-2026.</p>
          </div>

          <div className="section-block">
            <div className="section-header">CLASSES</div>
            <div className="schedule-container">
              <div className="schedule-header-row">
                <div className="time-label-header"></div>
                {days.map(day => (
                  <div key={day} className="day-header">{day}</div>
                ))}
              </div>
              <div className="schedule-grid">
                <div className="time-labels-column">
                  {hours.map(hour => (
                    <div key={hour} className="hour-label">{hour}</div>
                  ))}
                </div>

                <div className="grid-content-area">
                  {/* Horizontal stripes — 28 rows (6AM–8PM = 14hrs × 2), explicit gridRow so they always fill all columns */}
                  {Array.from({ length: 28 }).map((_, i) => (
                    <div
                      key={`h-${i}`}
                      className={`grid-stripe ${i % 2 === 0 ? 'on-hour' : 'half-hour'}`}
                      style={{ gridRow: `${i + 1} / ${i + 2}` }}
                    />
                  ))}

                  {/* Vertical lines — 6 dividers between 7 columns */}
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={`v-${i}`}
                      className="vertical-line"
                      style={{ gridColumn: i + 1, gridRow: '1 / 29' }}
                    />
                  ))}

                  {scheduleData.map((item, index) => (
                    <div
                      key={index}
                      className={`class-block ${item.type.toLowerCase()}`}
                      style={{
                        ...getRowSpan(item.start, item.end),
                        gridColumn: days.indexOf(item.day) + 1
                      }}
                    >
                      <div className="class-code">{item.code}</div>
                      <div className="class-name">{item.name}</div>
                      <div className="class-tag">{item.type}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="section-block">
            <div className="section-header">BALANCE</div>
            <div className="balance-section-body">
              <div className="balance-amount-footer">Outstanding Balance/Running Balance : 27,798.45</div>
              <div className="balance-info-footer">
                <span className="icon">&#8505;</span> You can now view your COR Balance widget in the <a href="#" style={{ color: '#00a4ef' }}>My Grades</a> page.
              </div>
              <div className="balance-timestamp">Updated as of 16 June 2026 01:27 AM for undefined</div>
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
        <div className="tasks-sidebar-title-row">
          <h2>Tasks</h2>
          <span className="info-icon-plain">ℹ️</span>
        </div>

        <div className="task-category">
          <div className="task-item-status">
            <div className="ti-verification-line">
              <span className="ti-blue-clock">🕒</span>
              <span>For Verification • Due on: 06-20-2026</span>
            </div>
            <div className="enlisted-badge">ENLISTED</div>
          </div>
        </div>

        <div className="task-category">
          <div className="tc-header">Clearance <span className="info-icon-plain">ℹ️</span></div>
          <div className="clearance-status-msg">Cleared</div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
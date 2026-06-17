import React, { useState } from 'react';
import Sidebar from '../components/sidebar';
import { generateCOR, sampleCORData } from '../utils/generateCOR';
import './Grades.css';

const academicData = [
  {
    semester: "First Year - First Semester",
    courses: [
      { code: "GED0106", subject: "Art Appreciation", units: 3, grade: "B+" },
      { code: "GED0107", subject: "Readings in Philippine History", units: 3, grade: "B+" },
      { code: "GED0108", subject: "Retorika at Panitikan ng Pilipinas", units: 3, grade: "B" },
      { code: "GED0109", subject: "Speech Communication", units: 3, grade: "C+" },
      { code: "GED0110", subject: "Understanding the Self", units: 3, grade: "B+" },
      { code: "NSTP0101", subject: "NSTP 1", units: 3, grade: "P" },
      { code: "PSY1101", subject: "Introduction to Psychology", units: 3, grade: "B+" },
      { code: "PSY1103", subject: "General Psychology Concepts", units: 3, grade: "C" },
      { code: "PSY1105", subject: "Psychological Foundations", units: 3, grade: "D+" },
    ]
  },
  {
    semester: "First Year - Second Semester",
    courses: [
      { code: "GED0101", subject: "College Academic Skills in English", units: 3, grade: "B+" },
      { code: "GED0102", subject: "Life and Works of Rizal", units: 3, grade: "B" },
      { code: "GED0103", subject: "Mathematics in the Modern World", units: 3, grade: "B+" },
      { code: "GED0104", subject: "Science, Technology and Society", units: 3, grade: "C+" },
      { code: "GED0105", subject: "Wika, Kultura at Lipunan", units: 3, grade: "B+" },
      { code: "PSY1102", subject: "Psychological Statistics", units: 3, grade: "B" },
      { code: "PSY1106", subject: "Introduction to Counseling Psychology", units: 3, grade: "B+" },
      { code: "NSTP0102", subject: "NSTP 2", units: 3, grade: "P" },
      { code: "PSY1107", subject: "Behavioral Science", units: 3, grade: "C" },
      { code: "PSY1108", subject: "Fundamentals of Psychological Testing", units: 3, grade: "D+" },
    ]
  },
  {
    semester: "Second Year - First Semester",
    courses: [
      { code: "GED0128", subject: "Livelihood Communication", units: 3, grade: "C" },
      { code: "PSY0113", subject: "Human Growth and Behavior", units: 3, grade: "B+" },
      { code: "GED0196", subject: "Applied Ethics in CT", units: 3, grade: "B+" },
      { code: "GED0109", subject: "LEAP", units: 3, grade: "C+" },
      { code: "PTF0110", subject: "PATHFITNESS WRP", units: 2, grade: "B+" },
      { code: "GED0205", subject: "Purposive Communication", units: 3, grade: "B" },
      { code: "GED0115", subject: "Wika at Kulturang Rehiyonal", units: 3, grade: "C" },
      { code: "PSY0227", subject: "Developmental Psychology", units: 3, grade: "B+" },
      { code: "PSY0163", subject: "Biological Psychology", units: 3, grade: "C" },
      { code: "PSY1203", subject: "Experimental Psychology", units: 3, grade: "B+" },
      { code: "PSY1204", subject: "Theories of Personality", units: 3, grade: "C+" },
      { code: "PSY1205", subject: "Research Psychology Case Study 1", units: 5, grade: "F" },
      { code: "MSY1101", subject: "Social Psychology", units: 3, grade: "B+" },
    ]
  },
  {
    semester: "Summer Term (June-July 2026) - In Progress",
    courses: [
      { code: "PSY2201", subject: "Personality Theories", units: 6, grade: "IP" },
      { code: "WRP2211", subject: "PATHFITNESS SWIMMING 1", units: 1, grade: "IP" },
      { code: "PSY2205", subject: "Forensic Psychology Lec", units: 3, grade: "IP" },
      { code: "PSY2206", subject: "Forensic Psychology Lab", units: 3, grade: "IP" },
      { code: "PSY2203", subject: "Developmental Psychology Lec", units: 3, grade: "IP" },
      { code: "PSY2204", subject: "Developmental Psychology Lab", units: 3, grade: "IP" },
      { code: "PSY2204", subject: "Research Psychology Case Study 1", units: 5, grade: "RETAKE" },
    ]
  },
  {
    semester: "Second Year - Second Semester",
    courses: [
      { code: "GED0112", subject: "Scholarly Inquiry", units: 3, grade: "" },
      { code: "MTY3317", subject: "General Botany LEC", units: 3, grade: "" },
      { code: "WRP3301", subject: "PATHFITNESS DANCE", units: 1, grade: "" },
      { code: "BIO1103", subject: "Analysis Chemistry", units: 6, grade: "" },
      { code: "BIO1105", subject: "Biochemistry", units: 6, grade: "" },
      { code: "MTY1108", subject: "General Inorganic Chemistry", units: 6, grade: "" },
      { code: "PSY1204", subject: "Theories of Behaviorism", units: 6, grade: "" },
    ]
  },
  {
    semester: "Second Year \u2013 Third Semester",
    note: "QUALIFYING EXAMINATION FOR INCOMING THIRD YEAR STUDENTS",
    courses: [
      { code: "BIO1207", subject: "Brain Cell Biology Lec", units: 5, grade: "" },
      { code: "BIO1208", subject: "Brain Cell Biology Lab", units: 5, grade: "" },
      { code: "BIO1206", subject: "Systematic and A-systematic Psychology", units: 6, grade: "" },
      { code: "PSY1125", subject: "Introduction to Public Health 1", units: 3, grade: "" },
      { code: "BIO1226", subject: "Introduction to Public Health 2 (RLE)", units: 6, grade: "" },
      { code: "WRP3328", subject: "PATHFITNESS MUAY THAI", units: 1, grade: "" },
    ]
  },
  {
    semester: "Third Year - First Semester",
    courses: [
      { code: "BIO1203", subject: "General Zoology (Lecture)", units: 3, grade: "" },
      { code: "BIO1204", subject: "General Zoology (Laboratory)", units: 1, grade: "" },
      { code: "PSY1205", subject: "Field Methods in Psychology", units: 3, grade: "" },
      { code: "PSY1206", subject: "Psychological Assessment", units: 3, grade: "" },
      { code: "PSY1207", subject: "Abnormal Psychology", units: 3, grade: "" },
      { code: "PSY1208", subject: "Industrial/Organizational Psychology", units: 3, grade: "" },
      { code: "PSY2301", subject: "Counseling Psychology", units: 3, grade: "" },
      { code: "PSY2302", subject: "Community Psychology", units: 3, grade: "" },
    ]
  },
  {
    semester: "Third Year - Second Semester",
    courses: [
      { code: "BIO1228", subject: "Human Biology (Lecture)", units: 3, grade: "" },
      { code: "BIO1229", subject: "Human Biology (Laboratory)", units: 1, grade: "" },
      { code: "PSY1209", subject: "Social Psychology", units: 3, grade: "" },
      { code: "PSY1301", subject: "Psychological Test Development", units: 3, grade: "" },
      { code: "PSY1302", subject: "Group Dynamics", units: 3, grade: "" },
      { code: "PSY1303", subject: "Introduction to Clinical Psychology", units: 3, grade: "" },
      { code: "PSY2303", subject: "Behavior Modification", units: 3, grade: "" },
    ]
  },
  {
    semester: "Third Year - Summer",
    courses: [
      { code: "PSY1304", subject: "Practicum in Psychology 1", units: 3, grade: "" },
      { code: "PSY1305", subject: "Practicum in Psychology 2", units: 3, grade: "" },
    ]
  },
  {
    semester: "Fourth Year - First Semester",
    courses: [
      { code: "MAT1304", subject: "College Physics (Lecture)", units: 3, grade: "" },
      { code: "MAT1305", subject: "College Physics (Laboratory)", units: 1, grade: "" },
      { code: "PSY1210", subject: "Research in Psychology I", units: 3, grade: "" },
      { code: "PSY1211", subject: "Sikolohiyang Filipino", units: 3, grade: "" },
      { code: "PSY1306", subject: "Disaster and Mental Health", units: 3, grade: "" },
      { code: "PSY1307", subject: "Audit 1", units: 3, grade: "" },
      { code: "PSY2401", subject: "Advanced Clinical Psychology", units: 3, grade: "" },
    ]
  },
  {
    semester: "Fourth Year - Second Semester",
    courses: [
      { code: "PSY1212", subject: "Research in Psychology II", units: 3, grade: "" },
      { code: "PSY1213", subject: "Cognitive Psychology", units: 3, grade: "" },
      { code: "PSY1308", subject: "Industrial and Organizational Development", units: 3, grade: "" },
      { code: "PSY1309", subject: "Ethics in Psychology", units: 3, grade: "" },
      { code: "PSY1310", subject: "Audit 2", units: 3, grade: "" },
      { code: "PSY2402", subject: "Psychological Intervention", units: 3, grade: "" },
    ]
  }
];

const Grades = ({ navigateTo, onLogout }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="grades-page-container">
      <Sidebar isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} currentPage="grades" navigateTo={navigateTo} onLogout={onLogout} />

      <div className="grades-page-content">
        <div className="grades-page-header">
          <h1>TOR View</h1>
          <button className="btn-download-tor" onClick={() => generateCOR(sampleCORData)}>
            <span className="icon">&#11123;</span> Download COR
          </button>
        </div>

        <div className="grades-body">
          {academicData.map((term, index) => (
            <div key={index} className="semester-section">
              <div className="semester-title">{term.semester}</div>
              <div className="table-responsive">
                <table className="grades-table">
                  <thead>
                    <tr>
                      <th>CODE</th>
                      <th>SUBJECT</th>
                      <th>UNITS</th>
                      <th>GRADE</th>
                      <th>REMARKS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {term.courses.map((course, cIndex) => (
                      <tr key={cIndex}>
                        <td>{course.code}</td>
                        <td>{course.subject}</td>
                        <td>{course.units.toFixed(1)}</td>
                        <td>
                          <span style={{
                            fontWeight: '600',
                            color: (course.grade === 'F' || course.grade === 'RETAKE' || course.grade === 'IP') ? '#555' : '#555'
                          }}>
                            {course.grade || '-'}
                          </span>
                        </td>
                        <td>
                          {course.grade === 'P' ? (
                            <span><span className="icon-check">&#10004;</span> Pass</span>
                          ) : course.grade && course.grade !== 'F' && course.grade !== 'RETAKE' && course.grade !== 'IP' ? (
                            <span><span className="icon-check">&#10004;</span> Pass</span>
                          ) : course.grade === 'F' ? (
                            <span>Fail</span>
                          ) : course.grade === 'RETAKE' ? (
                            <span>Retake</span>
                          ) : course.grade === 'IP' ? (
                            <span>In Progress</span>
                          ) : '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {term.note && (
                <div className="semester-note">
                  {term.note}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Grades;


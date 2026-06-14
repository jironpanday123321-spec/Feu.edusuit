import React, { useState } from 'react';
import './Login.css';
import feuLogo from '../assets/feuLogo.jpg';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });

  const handleLogin = (e) => {
    e.preventDefault();
    let valid = true;
    const newErrors = { email: '', password: '' };

    if (!email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email address is invalid';
      valid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      if (email === '2022062691@feu.edu.ph' && password === 'P@tr1ck0345') {
        if (onLogin) onLogin();
      } else {
        setErrors({ ...newErrors, password: 'Invalid email or password' });
      }
    }
  };

  const handleMicrosoftLogin = () => {
    console.log('Sign in with Microsoft');
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="news-banner-wrapper">
          <span className="nav-arrow">&lt;</span>
          <div className="news-banner">
            <h2>Get The Latest News!</h2>
            <p>Get the latest news! Visit FEU Enrollment facebook page.</p>
            <button className="btn-news">Get the latest news!</button>
          </div>
          <span className="nav-arrow">&gt;</span>
        </div>

        <div className="teah-logo-container">
          <div className="teah-icon">
             {/* Using feuLogo as a placeholder to match the request of using the feuLogo here as well if needed, or making a custom icon */}
             <div style={{display:'flex', flexWrap:'wrap', width:'24px', height:'24px', justifyContent:'space-between', alignContent:'space-between'}}>
                 <div style={{width:'10px', height:'10px', backgroundColor:'#2ab24b', borderRadius:'2px'}}></div>
                 <div style={{width:'10px', height:'10px', backgroundColor:'#2ab24b', borderRadius:'2px'}}></div>
                 <div style={{width:'10px', height:'10px', backgroundColor:'#2ab24b', borderRadius:'2px'}}></div>
                 <div style={{width:'10px', height:'10px', backgroundColor:'#2ab24b', borderRadius:'2px'}}></div>
             </div>
          </div>
          <div className="teah-text">
            TAMS EASY<br/>
            ASSIST HUB<br/>
            (TEAH)
          </div>
        </div>
      </div>

      <div className="login-right">
        <div className="right-content-wrapper">
          <div className="header-container">
            <img src={feuLogo} alt="Far Eastern University Logo" className="header-logo" />
            <h1 className="header-title">Far Eastern University</h1>
          </div>

          <form className="login-form" onSubmit={handleLogin}>
            <div className="input-group">
              <input
                type="text"
                placeholder="Email"
                className="input-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            <div className="input-group">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                className="input-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button 
                type="button" 
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? (
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22"/></svg>
                ) : (
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                )}
              </button>
              {errors.password && <span className="error-text">{errors.password}</span>}
            </div>

            <button type="submit" className="btn-submit">
              Login
            </button>

            <button type="button" className="btn-microsoft" onClick={handleMicrosoftLogin}>
              <svg width="20" height="20" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="1" y="1" width="9" height="9" fill="#f35325"/>
                <rect x="11" y="1" width="9" height="9" fill="#81bc06"/>
                <rect x="1" y="11" width="9" height="9" fill="#05a6f0"/>
                <rect x="11" y="11" width="9" height="9" fill="#ffba08"/>
              </svg>
              Sign in with Microsoft
            </button>
          </form>

          <div className="links-container">
            <a href="#" className="link">Need help logging in?</a>
            <a href="#" className="link">Forgot password?</a>
          </div>
        </div>

        <div className="footer">
          <p>Version 2.11.0.12</p>
          <p>Powered by <a href="#" className="edusuite-link">Edusuite</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;

import logo from './logo_empath2.png';
import './App.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import HomePage from './Home.js';


function IntroScreen() { // Renamed to start with an uppercase letter
  const navigate = useNavigate();
  const [slideOut, setSlideOut] = useState(false);

  useEffect(() => {
    // Navigate to the home page after 2 minutes
    const timer = setTimeout(() => {
      setSlideOut(true);
    }, 10000);

    return () => clearTimeout(timer); // Clear the timer when the component unmounts
  }, []);

  useEffect(() => {
    if (slideOut) {
      const timeout = setTimeout(() => {
        navigate('/home');
      }
      , 1000);
      return () => clearTimeout(timeout);
    }
  }, [slideOut, navigate]);


  return (
    <div className={`App intro-screen ${slideOut ? 'slide-up' : ''}`}>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">
          Em<span className="coloured-text">Path</span>
        </h1>
        <h3 className="App-tagline">
          For Every <span className="coloured-text">Survivor</span>. For Every{' '}
          <span className="coloured-text">Story</span>.
        </h3>
      </header>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IntroScreen />} /> {/* Updated to use IntroScreen */}
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
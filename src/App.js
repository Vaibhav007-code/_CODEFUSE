import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Hackathons from './pages/Hackathons';
import Footer from './components/Footer';
import './styles/global.css';

const App = () => {
  useEffect(() => {
    const darkMode = localStorage.getItem('darkMode') === 'true';
    document.body.classList.toggle('dark-mode', darkMode);
  }, []);

  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/hackathons" element={<Hackathons />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;

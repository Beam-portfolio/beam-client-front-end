import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Header from './components/Header';
import FooterCTA from './components/FooterCTA';
import Footer from './components/Footer';
import Contact from './pages/Contact';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { ReduxProvider } from './redux/provider';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ProjectDetails from './pages/ProjectDetails';
const G_CLIENT_ID = import.meta.env.VITE_G_CLIENT_ID || '641875306779-da49l64fvmh9gts5qk5moedi7486fonn.apps.googleusercontent.com';

function App() {


  return (
    <GoogleOAuthProvider clientId={G_CLIENT_ID}>
      <ReduxProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/project/:projectId" element={<ProjectDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <FooterCTA />
          <Footer />
        </Router>
      </ReduxProvider>
    </GoogleOAuthProvider>
  );
}

export default App;

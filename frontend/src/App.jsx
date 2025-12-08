import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ScrollToTop from "./ScrollToTop";
import './App.css';
 // Or wherever your CSS is

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import WasteTracker from './pages/WasteTracker';
import RecyclingTips from './pages/RecyclingTips';
import CollectionSchedule from './pages/CollectionSchedule';
import EducationalResources from './pages/EducationalResources';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="page-container">
        <div className="text-center">
          <h2>Authentication Required</h2>
          <p>Please log in to access this page.</p>
          <div className="flex justify-center gap-2 mt-3">
            <a href="/login" className="btn btn-primary">Login</a>
            <a href="/register" className="btn">Sign Up</a>
          </div>
        </div>
      </div>
    );
  }

  return children;
};

function App() {
  return (
      
    <AuthProvider>
     
      <Router>
        <ScrollToTop/>
        <div className="App">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/tips" element={<RecyclingTips />} />
              <Route path="/education" element={<EducationalResources />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<Contact />} />
              
              {/* Protected Routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/tracker" element={
                <ProtectedRoute>
                  <WasteTracker />
                </ProtectedRoute>
              } />
              <Route path="/schedule" element={
                <ProtectedRoute>
                  <CollectionSchedule />
                </ProtectedRoute>
              } />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;




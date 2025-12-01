import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate("/");
  };

  // Close menu on route change
  useEffect(() => {
    closeMenu();
  }, [location]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* ---------------- CSS INSIDE JSX ---------------- */}
      <style>{`
        .navbar {
          width: 100%;
          height: 72px;
          background: ${isScrolled ? 'rgba(255, 255, 255, 0.98)' : '#ffffff'};
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(0, 0, 0, 0.08);
          position: fixed;
          top: 0;
          z-index: 1000;
          transition: all 0.3s ease;
        }

        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          height: 100%;
          padding: 0 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .logo {
          font-size: 1.5rem;
          font-weight: 700;
          text-decoration: none;
          color: #2E8B57;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s ease;
        }

        .logo:hover {
          color: #236B4E;
        }

        /* Main Navigation */
        .nav-main {
          display: flex;
          align-items: center;
          gap: 32px;
        }

        .nav-links {
          list-style: none;
          display: flex;
          align-items: center;
          gap: 28px;
          margin: 0;
          padding: 0;
        }

        .nav-links li a {
          text-decoration: none;
          font-weight: 500;
          font-size: 15px;
          color: #4B5563;
          transition: all 0.2s ease;
          padding: 8px 12px;
          border-radius: 6px;
          white-space: nowrap;
        }

        .nav-links li a:hover {
          color: #2E8B57;
          background: rgba(46, 139, 87, 0.06);
        }

        .nav-links li a.active {
          color: #2E8B57;
          font-weight: 600;
        }

        /* Auth Buttons - Clean and Spacious */
        .auth-section {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .auth-btn {
          padding: 10px 20px;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 500;
          font-size: 14px;
          transition: all 0.2s ease;
          border: none;
          cursor: pointer;
          white-space: nowrap;
        }

        .login-btn {
          color: #4B5563;
          background: transparent;
          border: 1.5px solid #E5E7EB;
        }

        .login-btn:hover {
          background: #F9FAFB;
          border-color: #D1D5DB;
          color: #374151;
        }

        .register-btn {
          background: #2E8B57;
          color: white;
          border: 1.5px solid #2E8B57;
        }

        .register-btn:hover {
          background: #236B4E;
          border-color: #236B4E;
          transform: translateY(-1px);
        }

        /* User Menu */
        .user-section {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 16px;
          background: rgba(46, 139, 87, 0.08);
          border-radius: 8px;
          border: 1px solid rgba(46, 139, 87, 0.1);
        }

        .user-avatar {
          width: 32px;
          height: 32px;
          background: #2E8B57;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
          font-size: 14px;
        }

        .user-name {
          font-weight: 500;
          color: #374151;
          font-size: 14px;
        }

        .logout-btn {
          padding: 10px 20px;
          border-radius: 8px;
          border: 1.5px solid #EF4444;
          background: transparent;
          color: #EF4444;
          font-weight: 500;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .logout-btn:hover {
          background: #EF4444;
          color: white;
        }

        /* ---------------- MOBILE MENU ---------------- */
        .mobile-menu-btn {
          display: none;
          flex-direction: column;
          gap: 4px;
          cursor: pointer;
          border: none;
          background: transparent;
          padding: 8px;
          border-radius: 6px;
          transition: background 0.2s ease;
        }

        .mobile-menu-btn:hover {
          background: rgba(0, 0, 0, 0.05);
        }

        .mobile-menu-btn span {
          width: 20px;
          height: 2px;
          background: #4B5563;
          transition: all 0.3s ease;
          transform-origin: center;
        }

        .mobile-menu-btn.active span:nth-child(1) {
          transform: rotate(45deg) translate(5px, 5px);
        }

        .mobile-menu-btn.active span:nth-child(2) {
          opacity: 0;
        }

        .mobile-menu-btn.active span:nth-child(3) {
          transform: rotate(-45deg) translate(5px, -5px);
        }

        /* Mobile Styles */
        @media (max-width: 968px) {
          .nav-container {
            padding: 0 20px;
          }

          .nav-main {
            position: fixed;
            top: 72px;
            left: 0;
            width: 100%;
            height: calc(100vh - 72px);
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(20px);
            flex-direction: column;
            padding: 40px 24px;
            gap: 24px;
            transform: translateX(-100%);
            transition: transform 0.3s ease-in-out;
            border-top: 1px solid rgba(0, 0, 0, 0.08);
          }

          .nav-main.active {
            transform: translateX(0);
          }

          .nav-links {
            flex-direction: column;
            gap: 16px;
            width: 100%;
          }

          .nav-links li {
            width: 100%;
          }

          .nav-links li a {
            display: block;
            padding: 16px 20px;
            font-size: 16px;
            border-radius: 8px;
            text-align: center;
            background: rgba(0, 0, 0, 0.02);
            border: 1px solid rgba(0, 0, 0, 0.05);
          }

          .nav-links li a:hover {
            background: rgba(46, 139, 87, 0.08);
            border-color: rgba(46, 139, 87, 0.2);
          }

          .auth-section, .user-section {
            flex-direction: column;
            width: 100%;
            gap: 12px;
          }

          .auth-btn, .logout-btn {
            width: 100%;
            text-align: center;
            padding: 14px 20px;
            font-size: 15px;
          }

          .user-info {
            width: 100%;
            justify-content: center;
            margin-bottom: 8px;
          }

          .mobile-menu-btn {
            display: flex;
          }
        }

        @media (max-width: 640px) {
          .nav-container {
            padding: 0 16px;
          }

          .logo {
            font-size: 1.3rem;
          }

          .nav-main {
            padding: 32px 20px;
          }
        }

        /* Animation for menu items */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .nav-main.active .nav-links li {
          animation: fadeInUp 0.4s ease forwards;
        }

        .nav-main.active .auth-section,
        .nav-main.active .user-section {
          animation: fadeInUp 0.4s ease 0.2s forwards;
          opacity: 0;
        }

        .nav-links li:nth-child(1) { animation-delay: 0.1s; }
        .nav-links li:nth-child(2) { animation-delay: 0.15s; }
        .nav-links li:nth-child(3) { animation-delay: 0.2s; }
        .nav-links li:nth-child(4) { animation-delay: 0.25s; }
        .nav-links li:nth-child(5) { animation-delay: 0.3s; }
        .nav-links li:nth-child(6) { animation-delay: 0.35s; }
      `}</style>

      {/* ---------------- HTML ---------------- */}
      <nav className="navbar">
        <div className="nav-container">

          {/* Logo */}
          <Link to="/" className="logo" onClick={closeMenu}>
            <span>🌱</span>
            EcoWaste
          </Link>

          {/* Main Navigation Section */}
          <div className={`nav-main ${isMenuOpen ? "active" : ""}`}>
            
            {/* Navigation Links */}
            <ul className="nav-links">
              <li>
                <Link 
                  to="/" 
                  onClick={closeMenu}
                  className={location.pathname === '/' ? 'active' : ''}
                >
                  Home
                </Link>
              </li>

              {user ? (
                <>
                  <li>
                    <Link 
                      to="/dashboard" 
                      onClick={closeMenu}
                      className={location.pathname === '/dashboard' ? 'active' : ''}
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/tracker" 
                      onClick={closeMenu}
                      className={location.pathname === '/tracker' ? 'active' : ''}
                    >
                      Tracker
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/tips" 
                      onClick={closeMenu}
                      className={location.pathname === '/tips' ? 'active' : ''}
                    >
                      Tips
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/schedule" 
                      onClick={closeMenu}
                      className={location.pathname === '/schedule' ? 'active' : ''}
                    >
                      Schedule
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/education" 
                      onClick={closeMenu}
                      className={location.pathname === '/education' ? 'active' : ''}
                    >
                      Learn
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link 
                      to="/tips" 
                      onClick={closeMenu}
                      className={location.pathname === '/tips' ? 'active' : ''}
                    >
                      Recycling Tips
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/education" 
                      onClick={closeMenu}
                      className={location.pathname === '/education' ? 'active' : ''}
                    >
                      Learn
                    </Link>
                  </li>

                  <li>
                    <Link 
                      to="/about" 
                      onClick={closeMenu}
                      className={location.pathname === '/about' ? 'active' : ''}
                    >
                      About
                    </Link>
                  </li>
                  
                  <li>
                    <Link 
                      to="/contact" 
                      onClick={closeMenu}
                      className={location.pathname === '/contact' ? 'active' : ''}
                    >
                      Contact
                    </Link>
                  </li> 
                  
                </>
              )}
            </ul>

            {/* Auth Section */}
            {user ? (
              <div className="user-section">
                <div className="user-info">
                  <div className="user-avatar">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <span className="user-name">
                    {user.name || 'User'}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="logout-btn"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="auth-section">
                <Link 
                  to="/login" 
                  className="auth-btn login-btn"
                  onClick={closeMenu}
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="auth-btn register-btn"
                  onClick={closeMenu}
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`mobile-menu-btn ${isMenuOpen ? "active" : ""}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

        </div>
      </nav>
    </>
  );
};

export default Navbar;

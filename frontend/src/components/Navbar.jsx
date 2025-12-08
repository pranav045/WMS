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

  useEffect(() => closeMenu(), [location]);
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <style>{`
        .navbar {
          width: 100%;
          height: 72px;
          background: ${isScrolled ? 'rgba(255,255,255,0.98)' : '#ffffff'};
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(0,0,0,0.08);
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
        }
        .logo:hover { color: #236B4E; }

        .nav-main {
          display: flex;
          align-items: center;
          gap: 32px;
        }

        .nav-links {
          list-style: none;
          display: flex;
          gap: 32px;
          margin-right: -12px;
        }

        /* NAV underline */
        .nav-links li a {
          position: relative;
          display: inline-block;
          padding: 8px 12px;
          color: #4B5563;
          text-decoration: none;
          font-weight: 500;
          font-size: 15px;
          transition: color 0.18s ease;
        }
        .nav-links li a::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -6px;
          width: 0%;
          height: 3px;
          background: #2E8B57;
          border-radius: 2px;
          transition: width 0.25s ease-in-out;
        }
        .nav-links li a:hover,
        .nav-links li a.active {
          color: #2E8B57;
        }
        .nav-links li a:hover::after,
        .nav-links li a.active::after {
          width: 100%;
        }

        .auth-section {
          display: flex;
          gap: 12px;
        }
        .auth-btn {
          padding: 10px 20px;
          border-radius: 8px;
          font-weight: 500;
          font-size: 14px;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .login-btn { color: #4B5563; border: 1.5px solid #E5E7EB; }
        .login-btn:hover { background: #F9FAFB; }
        .register-btn { background: #2E8B57; color: white; }
        .register-btn:hover { background: #236B4E; }

        .user-section-pro {
          display: flex;
          align-items: center;
          gap: 24px;
        }
        .user-avatar {
          width: 38px; height: 38px;
          background: #2E8B57; color: white; font-size: 15px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .logout-btn {
          background: #111827;
          color: white;
          padding: 10px 16px;
          border-radius: 8px;
          font-size: 14px;
          cursor: pointer;
          border: none;
        }

        .mobile-menu-btn {
          display: none;
          flex-direction: column;
          gap: 4px;
          background: none;
          border: none;
          padding: 8px;
          cursor: pointer;
        }
        .mobile-menu-btn span {
          width: 20px;
          height: 2px;
          background: #4B5563;
          transition: all 0.3s;
        }
        .mobile-menu-btn.active span:nth-child(1) {
          transform: rotate(45deg) translate(5px,5px);
        }
        .mobile-menu-btn.active span:nth-child(2) {
          opacity: 0;
        }
        .mobile-menu-btn.active span:nth-child(3) {
          transform: rotate(-45deg) translate(5px,-5px);
        }

        @media (max-width: 968px) {
          .nav-main {
            position: fixed;
            top: 72px;
            left: 0;
            width: 100%;
            height: calc(100vh - 72px);
            background: rgba(255,255,255,0.98);
            backdrop-filter: blur(20px);
            flex-direction: column;
            justify-content: flex-start;
            padding: 40px 24px;
            transform: translateX(-100%);
            transition: transform 0.3s ease-in-out;
          }
          .nav-main.active {
            transform: translateX(0);
          }
          .nav-links {
            flex-direction: column;
            gap: 24px;
            margin-right: 0;
            align-items: center;
          }
          .auth-section,
          .user-section-pro {
            flex-direction: column;
            width: 100%;
          }
          .auth-btn,
          .logout-btn {
            width: 100%;
            text-align: center;
          }
          .mobile-menu-btn {
            display: flex;
          }
        }
      `}</style>

      <nav className="navbar">
        <div className="nav-container">
          <Link to="/" className="logo" onClick={closeMenu}>
            EcoWaste<span className="material-symbols-outlined" style={{ fontSize: "35px" }}>eco</span>
          </Link>

          <button className={`mobile-menu-btn ${isMenuOpen ? "active" : ""}`} onClick={toggleMenu}>
            <span></span><span></span><span></span>
          </button>

          <div className={`nav-main ${isMenuOpen ? "active" : ""}`}>
            <ul className="nav-links">
              <li><Link to="/" className={location.pathname === "/" ? "active" : ""}>Home</Link></li>

              {user ? (
                <>
                  <li><Link to="/dashboard" className={location.pathname === "/dashboard" ? "active" : ""}>Dashboard</Link></li>
                  <li><Link to="/tracker" className={location.pathname === "/tracker" ? "active" : ""}>Tracker</Link></li>
                  <li><Link to="/tips" className={location.pathname === "/tips" ? "active" : ""}>Tips</Link></li>
                  <li><Link to="/schedule" className={location.pathname === "/schedule" ? "active" : ""}>Schedule</Link></li>
                  <li><Link to="/education" className={location.pathname === "/education" ? "active" : ""}>Learn</Link></li>
                </>
              ) : (
                <>
                  <li><Link to="/education" className={location.pathname === "/education" ? "active" : ""}>Learn</Link></li>
                  <li><Link to="/about" className={location.pathname === "/about" ? "active" : ""}>About</Link></li>
                  <li><Link to="/contact" className={location.pathname === "/contact" ? "active" : ""}>Contact</Link></li>
                </>
              )}
            </ul>

            {user ? (
              <div className="user-section-pro">
                <div className="user-avatar">
                  {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                </div>
                <button onClick={handleLogout} className="logout-btn">Logout</button>
              </div>
            ) : (
              <div className="auth-section">
                <Link to="/login" className="auth-btn login-btn">Login</Link>
                <Link to="/register" className="auth-btn register-btn">Register</Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

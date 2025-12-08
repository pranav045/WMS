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
          gap: 1px;
        }
        .logo:hover { color: #236B4E; }

        .nav-main { display: flex; align-items: center; gap: 32px; }

        .nav-links {
          list-style: none;
          display: flex;
          gap: 32px;
          margin: 0;
          padding: 0;
          margin-left: 20px;
        margin-right: -12px; 
        }

        .nav-links li a {
          text-decoration: none;
          font-weight: 500;
          font-size: 15px;
          color: #4B5563;
          padding: 8px 12px;
          border-radius: 6px;
          transition: all 0.2s ease;
          
        }
    /* NAV LINK - underline animation (replace previous .nav-links li a rules) */
.nav-links li a {
  position: relative;         /* needed for ::after positioning */
  display: inline-block;      /* allows width transitions */
  padding: 8px 12px;          /* keep your original padding */
  color: #4B5563;             /* default color */
  text-decoration: none;
  font-weight: 500;
  font-size: 15px;
  transition: color 0.18s ease;
  background: transparent;    /* ensure no hover background overrides underline */
}

/* underline element */
.nav-links li a::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -6px;               /* distance from link baseline — adjust if needed */
  width: 0%;
  height: 3px;
  background: #2E8B57;
  border-radius: 2px;
  transition: width 0.25s ease-in-out;
  will-change: width;
}

/* Hover: reveal underline and change color */
.nav-links li a:hover {
  color: #2E8B57;
}
.nav-links li a:hover::after {
  width: 100%;
}

/* Active state: keep underline visible */
.nav-links li a.active {
  color: #2E8B57;
  font-weight: 600;
}
.nav-links li a.active::after {
  width: 100%;
}

/* Fallback: if some other rule overrides, use higher specificity */
.nav-links li a:hover::after,
.nav-links li a.active::after {
  /* uncomment the next line only if you still see no underline */
  /* width: 100% !important; */
}



        .auth-section { display: flex; gap: 12px; }
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

        .user-section-pro { display: flex; align-items: center; gap: 24px; font-size: 14.5px; }
        .user-profile { display: flex; align-items: center; gap: 11px; }
        .user-avatar {
          width: 38px; height: 38px;
          background: #2E8B57; color: white; font-weight: 600; font-size: 15px;
          border-radius: 50%; display: flex; align-items: center; justify-content: center;
          border: 2.5px solid rgba(46,139,87,0.25);
          transition: all 0.2s ease;
        }
        .user-profile:hover .user-avatar {
          background: #236B4E; border-color: rgba(46,139,87,0.4); transform: scale(1.05);
        }
        .user-name { font-weight: 500; color: #1F2937; }

        .logout-btn {
          background: #111827; color: white; border: none;
          padding: 10px 18px; border-radius: 10px; font-weight: 500;
          font-size: 14px; cursor: pointer; transition: all 0.25s ease;
        }
        .logout-btn:hover { background: #1F2937; transform: translateY(-1px); }

        .mobile-menu-btn {
          display: none; flex-direction: column; gap: 4px;
          background: none; border: none; padding: 8px; cursor: pointer;
        }
        .mobile-menu-btn span { width: 20px; height: 2px; background: #4B5563; transition: all 0.3s; }
        .mobile-menu-btn.active span:nth-child(1) { transform: rotate(45deg) translate(5px,5px); }
        .mobile-menu-btn.active span:nth-child(2) { opacity: 0; }
        .mobile-menu-btn.active span:nth-child(3) { transform: rotate(-45deg) translate(5px,-5px); }

        @media (max-width: 968px) {
          .nav-links { margin-left: 0 !important; gap: 12px; }
          .nav-main {
            position: fixed; top: 72px; left: 0; width: 100%;
            height: calc(100vh - 72px); background: rgba(255,255,255,0.98);
            backdrop-filter: blur(20px); flex-direction: column;
            padding: 40px 24px; gap: 32px; transform: translateX(-100%);
            transition: transform 0.35s ease; border-top: 1px solid rgba(0,0,0,0.08);
          }
          .nav-main.active { transform: translateX(0); }
          .auth-section, .user-section-pro { flex-direction: column; width: 100%; gap: 16px; }
          .auth-btn, .logout-btn { width: 100%; padding: 14px; text-align: center; }
          .mobile-menu-btn { display: flex; }
        }
      `}</style>

      <nav className="navbar">
        <div className="nav-container">
          <Link to="/" className="logo" onClick={closeMenu}>
            EcoWaste
            <span className="material-symbols-outlined" style={{ fontSize: "35px" }}>eco</span>
          </Link>

          {/* FIX APPLIED: Button moved above menu */}
          <button className={`mobile-menu-btn ${isMenuOpen ? "active" : ""}`} onClick={toggleMenu}>
            <span></span><span></span><span></span>
          </button>

          <div className={`nav-main ${isMenuOpen ? "active" : ""}`}>
            <ul className="nav-links">
              <li><Link to="/" onClick={closeMenu} className={location.pathname === '/' ? 'active' : ''}>Home</Link></li>

              {user ? (
                <>
                  <li><Link to="/dashboard" onClick={closeMenu} className={location.pathname === '/dashboard' ? 'active' : ''}>Dashboard</Link></li>
                  <li><Link to="/tracker" onClick={closeMenu} className={location.pathname === '/tracker' ? 'active' : ''}>Tracker</Link></li>
                  <li><Link to="/tips" onClick={closeMenu} className={location.pathname === '/tips' ? 'active' : ''}>Tips</Link></li>
                  <li><Link to="/schedule" onClick={closeMenu} className={location.pathname === '/schedule' ? 'active' : ''}>Schedule</Link></li>
                  <li><Link to="/education" onClick={closeMenu} className={location.pathname === '/education' ? 'active' : ''}>Learn</Link></li>
                </>
              ) : (
                <>
                  <li><Link to="/education" onClick={closeMenu} className={location.pathname === '/education' ? 'active' : ''}>Learn</Link></li>
                  <li><Link to="/about" onClick={closeMenu} className={location.pathname === '/about' ? 'active' : ''}>About</Link></li>
                  <li><Link to="/contact" onClick={closeMenu} className={location.pathname === '/contact' ? 'active' : ''}>Contact</Link></li>
                </>
              )}
            </ul>

            {user ? (
              <div className="user-section-pro">
                <div className="user-profile">
                  <div className="user-avatar">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <span className="user-name">{user.name || 'User'}</span>
                </div>
                <button onClick={handleLogout} className="logout-btn">Logout</button>
              </div>
            ) : (
              <div className="auth-section">
                <Link to="/login" className="auth-btn login-btn" onClick={closeMenu}>Login</Link>
                <Link to="/register" className="auth-btn register-btn" onClick={closeMenu}>Register</Link>
              </div>
            )}
          </div>

        </div>
      </nav>
    </>
  );
};

export default Navbar;

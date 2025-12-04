import React from 'react';
import { Link } from "react-router-dom";

// ADD THESE IMPORTS ↓↓↓
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";





const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">

        <div className="footer-section">
          <h3>EcoWaste</h3>
          <p>
            Transforming waste management through technology and community engagement 
            for a sustainable future.
          </p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/tracker">Waste Tracker</Link></li>
            <li><Link to="/tips">Recycling Tips</Link></li>
            <li><Link to="/education">Educational Resources</Link></li>
          </ul>
        </div>
        
        {/* <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/tracker">Waste Tracker</Link></li>
            <li><Link to="/tips">Recycling Tips</Link></li>
            <li><Link to="/education">Educational Resources</Link></li>
          </ul>
        </div> */}

        <div className="footer-section">
          <h3>Contact Info</h3>
          <p>📧 info@ecowaste.com</p>
          <p>📞 +91 7078911359</p>
          <p>📍 Jalandhar Punjab</p>
        </div>

        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-links">

            {/* <p><FontAwesomeIcon icon={faFacebook} /> <a href="https://facebook.com">Facebook</a></p>

            <p><FontAwesomeIcon icon={faTwitter} /> <a href="https://twitter.com">Twitter</a></p>

            <p><FontAwesomeIcon icon={faInstagram} /> <a href="https://instagram.com">Instagram</a></p>

            <p><FontAwesomeIcon icon={faLinkedin} /> <a href="https://linkedin.com">LinkedIn</a></p> */}

            <a href="https://facebook.com" className="hover:text-primary-color"><FontAwesomeIcon icon={faFacebook} /> Facebook</a><br/>
            <a href="https://twitter.com" className="hover:text-primary-color"><FontAwesomeIcon icon={faTwitter} /> Twitter</a><br/>
            <a href="https://instagram.com" className="hover:text-primary-color"><FontAwesomeIcon icon={faInstagram} /> Instagram</a><br/>
            <a href="https://linkedin.com" className="hover:text-primary-color"><FontAwesomeIcon icon={faLinkedin} /> LinkedIn</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 EcoWaste. All rights reserved. | Building a Cleaner Tomorrow</p>
      </div>
    </footer>
  );
};

export default Footer;

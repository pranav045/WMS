import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>EcoWaste</h3>
          <p>Transforming waste management through technology and community engagement for a sustainable future.</p>
        </div>
        
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/tracker">Waste Tracker</a></li>
            <li><a href="/tips">Recycling Tips</a></li>
            <li><a href="/education">Educational Resources</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Contact Info</h3>
          <p>📧 info@ecowaste.com</p>
          <p>📞 +91 7078911359</p>
          <p>📍 Jalandhar Punjab</p>
        </div>
        
        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-links">
           <a href="https://facebook.com">Facebook</a><br/>
<a href="https://twitter.com">Twitter</a><br/>
<a href="https://instagram.com">Instagram</a><br/>
<a href="https://linkedin.com">LinkedIn</a>
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
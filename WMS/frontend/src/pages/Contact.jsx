import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://wms-b7au.onrender.com/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        alert(data.message || "Thank you! We'll get back to you soon.");
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        alert(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please check your connection.");
    }
  };

  return (
    <>
      <style>{`
        .contact-page {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem 1.5rem;
        }

        .contact-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .contact-title {
          font-size: 2.25rem;
          font-weight: 700;
          color: #111827;
          margin-bottom: 0.75rem;
        }
          /* Fix: Improve input + dropdown visibility */
.form-input,
.form-textarea,
.form-input option {
  color: #111827; /* Dark visible text */
  background-color: #F9FAFB; /* Light background */
}

/* Dropdown menu styling */
select.form-input {
  background-color: #FFFFFF;
}

select.form-input option {
  background-color: #FFFFFF;
  color: #111827;
}


        .contact-subtitle {
          color: #6B7280;
          font-size: 1.125rem;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        /* Main Grid Layout */
        .contact-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }

        @media (min-width: 1024px) {
          .contact-layout {
            grid-template-columns: 1fr 400px;
            gap: 3rem;
          }
        }

        /* Cards */
        .contact-card {
          background: white;
          border-radius: 12px;
          padding: 2rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          border: 1px solid #E5E7EB;
        }

        .card-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #111827;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        /* Form Styles */
        .form-group {
          margin-bottom: 1.25rem;
        }

        .form-label {
          display: block;
          font-weight: 500;
          color: #374151;
          margin-bottom: 0.5rem;
          font-size: 0.875rem;
        }

        .form-input {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1px solid #D1D5DB;
          border-radius: 8px;
          font-size: 0.875rem;
          transition: all 0.2s;
          background: #F9FAFB;
        }

        .form-input:focus {
          outline: none;
          border-color: #10B981;
          background: white;
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
        }

        .form-textarea {
          resize: vertical;
          min-height: 100px;
          font-family: inherit;
        }

        .submit-btn {
          width: 100%;
          background: #111827;
          color: white;
          padding: 0.875rem 2rem;
          border: none;
          border-radius: 8px;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .submit-btn:hover {
          background: #374151;
          transform: translateY(-1px);
        }

        /* Contact Info */
        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .info-item {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          padding: 1rem;
          border-radius: 8px;
          transition: background 0.2s;
        }

        .info-item:hover {
          background: #F9FAFB;
        }

        .info-icon {
          width: 40px;
          height: 40px;
          background: #10B981;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1rem;
          flex-shrink: 0;
        }

        .info-content h4 {
          font-size: 0.875rem;
          font-weight: 600;
          color: #111827;
          margin-bottom: 0.25rem;
        }

        .info-content p {
          color: #6B7280;
          font-size: 0.875rem;
          line-height: 1.4;
          margin: 0;
        }

        /* FAQ Section */
        .faq-section {
          margin-top: 2rem;
        }

        .faq-grid {
          display: grid;
          gap: 1rem;
        }

        .faq-item {
          padding: 1rem;
          background: #F9FAFB;
          border-radius: 8px;
          border-left: 3px solid #10B981;
        }

        .faq-question {
          font-size: 0.875rem;
          font-weight: 600;
          color: #111827;
          margin-bottom: 0.5rem;
        }

        .faq-answer {
          font-size: 0.75rem;
          color: #6B7280;
          line-height: 1.4;
          margin: 0;
        }

        /* Emergency Section */
        .emergency-section {
          margin-top: 2rem;
        }

        .emergency-card {
          background: linear-gradient(135deg, #DC2626, #B91C1C);
          color: white;
          padding: 1.5rem;
          border-radius: 12px;
          text-align: center;
        }

        .emergency-header {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
        }

        .emergency-icon {
          font-size: 1.25rem;
        }

        .emergency-title {
          font-size: 1rem;
          font-weight: 600;
          margin: 0;
        }

        .emergency-description {
          font-size: 0.875rem;
          opacity: 0.9;
          margin-bottom: 1rem;
          line-height: 1.4;
        }

        .emergency-phone {
          background: rgba(255, 255, 255, 0.15);
          padding: 0.75rem 1.5rem;
          border-radius: 50px;
          font-size: 1rem;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .emergency-note {
          font-size: 0.75rem;
          opacity: 0.8;
          margin-top: 0.75rem;
          margin-bottom: 0;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .contact-page {
            padding: 1.5rem 1rem;
          }

          .contact-title {
            font-size: 1.875rem;
          }

          .contact-subtitle {
            font-size: 1rem;
          }

          .contact-card {
            padding: 1.5rem;
          }

          .contact-layout {
            gap: 1.5rem;
          }
        }

        @media (max-width: 480px) {
          .contact-card {
            padding: 1.25rem;
          }

          .info-item {
            padding: 0.75rem;
          }

          .emergency-card {
            padding: 1.25rem;
          }
        }
      `}</style>

      <div className="contact-page">
        {/* Header */}
        <div className="contact-header">
          <h1 className="contact-title">Get In Touch</h1>
          <p className="contact-subtitle">
            Have questions about waste management? Our team is here to help you
            create a sustainable future.
          </p>
        </div>

        {/* Main Content */}
        <div className="contact-layout">
          {/* Left Column - Contact Form */}
          <div>
            <div className="contact-card">
              <h3 className="card-title">
                <span class="material-symbols-outlined">send</span>
                Send us a Message
              </h3>

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="form-input"
                    placeholder="Your full name"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="form-input"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Subject</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="form-input"
                  >
                    <option value="">Select a topic</option>
                    <option value="general">General Inquiry</option>
                    <option value="recycling">Recycling Questions</option>
                    <option value="collection">Collection Services</option>
                    <option value="partnership">Partnership</option>
                    <option value="technical">Technical Support</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    required
                    className="form-input form-textarea"
                    placeholder="How can we help you today?"
                  />
                </div>

                <button type="submit" className="submit-btn">
                  Send Message
                </button>
              </form>
            </div>

            {/* Emergency Section - Now properly placed below form */}
            <div className="emergency-section">
              <div className="emergency-card">
                <div className="emergency-header">
                  <span className="emergency-icon">
                    <span class="material-symbols-outlined">siren</span>
                  </span>
                  <h3 className="emergency-title">Emergency Contact</h3>
                </div>
                <p className="emergency-description">
                  For hazardous waste spills or immediate environmental concerns
                </p>
                <div className="emergency-phone">
                  <span class="material-symbols-outlined">call</span>
                  +91 (555) 123-EMER
                </div>
                <p className="emergency-note">24/7 Emergency Response Line</p>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Info & FAQ */}
          <div>
            {/* Contact Information */}
            <div className="contact-card">
              <h3 className="card-title">
                {/* <span></span> */}
                <span class="material-symbols-outlined">contact_page</span>
                Contact Information
              </h3>

              <div className="contact-info">
                <div className="info-item">
                  <div className="info-icon">
                    <span class="material-symbols-outlined">mail</span>
                  </div>
                  <div className="info-content">
                    <h4>Email</h4>
                    <p>
                      info@ecowaste.com
                      <br />
                      support@ecowaste.com
                    </p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">
                    <span class="material-symbols-outlined">call</span>
                  </div>
                  <div className="info-content">
                    <h4>Phone</h4>
                    <p>
                      +91 0000000001 ECOW
                      <br />
                      +91 0000000002-HELP
                    </p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">
                    <span class="material-symbols-outlined">apartment</span>
                  </div>
                  <div className="info-content">
                    <h4>Office</h4>
                    <p>
                      123 Jalandhar
                      <br />
                      Eco City, EC 12345
                    </p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">
                    <span class="material-symbols-outlined">schedule</span>
                  </div>
                  <div className="info-content">
                    <h4>Business Hours</h4>
                    <p>
                      Mon-Fri: 9AM-6PM
                      <br />
                      Sat: 10AM-4PM
                      <br />
                      Sun: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Section - Compact and Professional */}
            <div className="faq-section">
              <div className="contact-card">
                <h3 className="card-title">
                  <span>❓</span>
                  Quick Answers
                </h3>

                <div className="faq-grid">
                  <div className="faq-item">
                    <div className="faq-question">
                      How do I start recycling?
                    </div>
                    <p className="faq-answer">
                      Sort waste into categories and use our waste tracker for
                      personalized guidance.
                    </p>
                  </div>

                  <div className="faq-item">
                    <div className="faq-question">What can't be recycled?</div>
                    <p className="faq-answer">
                      Plastic bags, styrofoam, greasy boxes require special
                      handling.
                    </p>
                  </div>

                  <div className="faq-item">
                    <div className="faq-question">Collection schedule?</div>
                    <p className="faq-answer">
                      Check our collection page for your area's specific pickup
                      days.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;

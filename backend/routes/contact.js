// routes/contact.js
const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const nodemailer = require('nodemailer');

// Email transporter


// Email transporter (Updated Gmail SMTP settings)
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // TLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Verify connection to Gmail SMTP
transporter.verify((error, success) => {
  if (error) {
    console.error("SMTP Verify Error:", error);
  } else {
    console.log("SMTP Server is Ready to Send Emails!");
  }
});


router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please fill all fields'
      });
    }

    // Save to DB
    const newMessage = new Message({ name, email, subject, message });
    await newMessage.save();

    // Send Email to YOU
    await transporter.sendMail({
      from: `"Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,           // You get the email
      replyTo: email,                        // So you can reply directly
      subject: `New Message: ${subject}`,
      text: `
        New message from your website!

        Name: ${name}
        Email: ${email}
        Subject: ${subject}

        Message:
        ${message}

        Time: ${new Date().toLocaleString()}
      `,
      html: `
        <h2>New Contact Form Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <blockquote>${message.replace(/\n/g, '<br>')}</blockquote>
        <hr>
        <small>Sent at: ${new Date().toLocaleString()}</small>
      `
    });

    res.status(201).json({
      success: true,
      message: "Thank you! Your message has been sent. We'll reply soon."
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again.'
    });
  }
});

module.exports = router;
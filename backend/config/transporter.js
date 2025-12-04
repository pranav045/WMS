import nodemailer from "nodemailer";

// Debug logs
console.log("Email User:", process.env.EMAIL_USER);
console.log("Email Pass:", process.env.EMAIL_PASS);

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Optional: Verify transporter connection
transporter.verify(function (error, success) {
  if (error) {
    console.log("❌ SMTP Verify Error:", error);
  } else {
    console.log("📧 Server is ready to take messages");
  }
});

export default transporter;

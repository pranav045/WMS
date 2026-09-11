const express = require("express");
const router = express.Router();
const sendEmail = require("../utils/sendEmail");

router.post("/", async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({
      success: false,
      message: "All fields are required!",
    });
  }

  try {
    const result = await sendEmail({ name, email, subject, message });
    console.log("Email API Response:", result);

    if (result && result.id) {
      return res.status(200).json({
        success: true,
        message: "Thank you! We'll contact you soon.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Email sending failed",
    });

  } catch (error) {
    console.error("Email API Error:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while sending the email!",
    });
  }
});

module.exports = router;

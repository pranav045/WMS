const sendEmail = async ({ name, email, subject, message }) => {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.EMAIL_TO;

  if (!apiKey || !to) {
    throw new Error('Email service is not configured');
  }

  const payload = {
    from: "WMS Contact Form <onboarding@resend.dev>",
    to: [to],
    subject: `Contact: ${subject}`,
    text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`,
  };

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }

  return response.json();
};

module.exports = sendEmail;

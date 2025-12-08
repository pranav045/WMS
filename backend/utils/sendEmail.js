const sendEmail = async ({ name, email, message }) => {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.EMAIL_TO;

  const payload = {
    from: "WMS Contact Form <onboarding@resend.dev>",
    to: [to],
    subject: `New contact from: ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
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

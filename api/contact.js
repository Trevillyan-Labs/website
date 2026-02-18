const nodemailer = require('nodemailer');

/**
 * Vercel serverless function: POST /api/contact
 * Sends contact form submissions via Gmail SMTP.
 *
 * Required Vercel env vars:
 *   GMAIL_USER       - Gmail address (e.g. you@gmail.com)
 *   GMAIL_APP_PASSWORD - App password from Google Account (2FA required)
 *   CONTACT_EMAIL    - Where to receive messages (defaults to GMAIL_USER)
 */
module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, subject, message, consent } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'Name, email, subject, and message are required.' });
  }

  if (!consent) {
    return res.status(400).json({ error: 'You must agree to the Privacy Policy.' });
  }

  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_APP_PASSWORD;
  const contactEmail = process.env.CONTACT_EMAIL || gmailUser;

  if (!gmailUser || !gmailPass) {
    console.error('Missing GMAIL_USER or GMAIL_APP_PASSWORD env vars');
    return res.status(500).json({ error: 'Server configuration error. Please try again later.' });
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: gmailUser,
      pass: gmailPass
    }
  });

  const mailOptions = {
    from: `"${name}" <${gmailUser}>`,
    replyTo: email,
    to: contactEmail,
    subject: `[Trevillyan Labs Contact] ${subject}`,
    text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
    html: `
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Contact form send error:', err);
    return res.status(500).json({ error: 'Failed to send message. Please try again later.' });
  }
};

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

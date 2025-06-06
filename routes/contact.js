// File: routes/contact.js
const express = require("express");
const SibApiV3Sdk = require("sib-api-v3-sdk");
const router = express.Router();

// 1) Configure Brevo API key once at module load
SibApiV3Sdk.ApiClient.instance.authentications["api-key"].apiKey =
  process.env.BREVO_API_KEY;

router.post("/", async (req, res) => {
  console.log(">> [contact] POST /api/contact invoked");
  console.log(">> [contact] Env vars:",
    "API_KEY:", process.env.BREVO_API_KEY ? "SET" : "MISSING",
    "FROM_EMAIL:", process.env.BREVO_FROM_EMAIL,
    "TO_EMAIL:", process.env.CONTACT_RECIPIENT_EMAIL
  );
  console.log(">> [contact] Body:", req.body);

  const { name, email, subject, message, website } = req.body;

  // 2) Honeypot check
  if (website && website.trim() !== "") {
    console.log(">> [contact] Honeypot triggered");
    return res.status(200).json({ ok: true });
  }

  // 3) Validation
  if (!name || !email || !message) {
    console.log(">> [contact] Validation failed:", { name, email, message });
    return res
      .status(400)
      .json({ error: "Name, email, and message are required." });
  }

  // 4) Build Brevo payload properly—assign fields after constructing the model
  const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
  sendSmtpEmail.sender = { email: process.env.BREVO_FROM_EMAIL };
  sendSmtpEmail.to = [{ email: process.env.CONTACT_RECIPIENT_EMAIL }];
  sendSmtpEmail.subject = subject
    ? `New message: ${subject}`
    : `New contact‐form message from ${name}`;
  sendSmtpEmail.htmlContent = `
    <h2>New contact‐form submission</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    ${subject ? `<p><strong>Subject:</strong> ${subject}</p>` : ""}
    <p><strong>Message:</strong><br/>${message.replace(/\n/g, "<br/>").trim()}</p>
  `;

  console.log(">> [contact] Sending to Brevo:", JSON.stringify({
    sender: sendSmtpEmail.sender,
    to: sendSmtpEmail.to,
    subject: sendSmtpEmail.subject,
    htmlContent: sendSmtpEmail.htmlContent
  }, null, 2));

  // 5) Send email via Brevo
  try {
    const brevoResponse = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log(">> [contact] Brevo response:", brevoResponse);
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error(">> [contact] Brevo error:", JSON.stringify(err, null, 2));
    if (err.response) {
      console.error(">> [contact] Brevo response body:", err.response.body);
    }
    return res.status(500).json({ error: "Failed to send email." });
  }
});

module.exports = router;

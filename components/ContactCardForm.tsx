// File: components/ContactCardForm.jsx
import { useState } from "react";

export default function ContactCardForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    website: "", // honeypot
  });
  const [status, setStatus] = useState<"loading" | "success" | "error" | null>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Honeypot check
    if (formData.website.trim() !== "") {
      setStatus("success");
      return;
    }

    setStatus("loading");
    try {
      const resp = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (resp.ok) {
        setStatus("success");
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
          website: "",
        });
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <div className="row justify-content-center animate__animated animate__fadeIn">
      <div className="col-md-8">
        <h2 className="text-center mb-4">
          If you have any questions,
          <br />
          please send us a message
        </h2>
        <div className="card shadow border-0">
          <div className="card-body p-5 bg-light">
            <form
              onSubmit={handleSubmit}
              className="contact-form"
              noValidate
              autoComplete="off"
            >
              {/* Honeypot */}
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                style={{ display: "none" }}
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="contact_name" className="form-label">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="contact_name"
                    name="name"
                    className="form-control"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6 mt-3 mt-md-0">
                  <label htmlFor="contact_email" className="form-label">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="contact_email"
                    name="email"
                    className="form-control"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="contact_subject" className="form-label">
                  Subject
                </label>
                <input
                  type="text"
                  id="contact_subject"
                  name="subject"
                  className="form-control"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="contact_message" className="form-label">
                  Message
                </label>
                <textarea
                  id="contact_message"
                  name="message"
                  className="form-control"
                  rows={6}
                  placeholder="Write your message here..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="btn btn-primary px-5 py-3"
                  disabled={status === "loading"}
                >
                  {status === "loading" && (
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  )}
                  {status === "loading" ? "Sending…" : "Send Message"}
                </button>
              </div>

              {status === "success" && (
                <p className="text-success text-center mt-3">
                  Thank you! Your message has been sent.
                </p>
              )}
              {status === "error" && (
                <p className="text-danger text-center mt-3">
                  Oops! Something went wrong. Please try again later.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

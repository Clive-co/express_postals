// File: components/ContactSection.jsx
import { useState } from "react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    website: "", // the honeypot field
  });
  const [status, setStatus] = useState<"loading" | "success" | "error" | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // If honeypot is filled, treat as bot and return silently
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
    <section id="contact" className="ftco-section bg-light py-5">
      <div className="container">
        {/* Heading */}
        <div className="row justify-content-center mb-4">
          <div className="col-md-8 text-center heading-section animate__animated animate__fadeIn">
            <span className="subheading">Get In Touch</span>
            <h2 className="mb-3">Contact Us</h2>
          </div>
        </div>

        {/* Image + Form Row */}
        <div className="row justify-content-center">
          {/* Left: Image */}
          <div className="col-md-6 animate__animated animate__fadeIn mb-4 mb-md-0">
            <img
              src="images/img8-min.jpg"
              alt="Contact Illustration"
              className="img-fluid rounded"
            />
          </div>

          {/* Right: Form */}
          <div className="col-md-6 animate__animated animate__fadeIn">
            <form
              onSubmit={handleSubmit}
              className="contact-form"
              noValidate
              autoComplete="off"
            >
              {/* Honeypot (hidden) */}
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                style={{ display: "none" }}
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="form-group">
                <label htmlFor="contact_name" className="sr-only">
                  Name
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
              <div className="form-group">
                <label htmlFor="contact_email" className="sr-only">
                  Email
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
              <div className="form-group">
                <label htmlFor="contact_subject" className="sr-only">
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
              <div className="form-group">
                <label htmlFor="contact_message" className="sr-only">
                  Message
                </label>
                <textarea
                  id="contact_message"
                  name="message"
                  rows={5}
                  className="form-control"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <div className="form-group text-center">
                <button
                  type="submit"
                  className="btn btn-primary py-3 px-5"
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
                <p className="text-success text-center">
                  Thank you! Your message has been sent.
                </p>
              )}
              {status === "error" && (
                <p className="text-danger text-center">
                  Oops! Something went wrong. Please try again later.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

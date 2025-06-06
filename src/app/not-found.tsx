// src/app/not-found.tsx
"use client";

import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../public/css/style.css"; // Ensure you have a styles.css file for custom styles

export default function NotFound() {
  return (
    <div
      className="not-found-container d-flex flex-column justify-content-center align-items-center vh-100 text-center px-3"
      style={{
        background: "linear-gradient(135deg, #fdfbfb, #ebedee)",
        padding: "2rem",
      }}
    >
      {/* 404 Illustration */}
      <img
        src="/images/404.png"
        alt="404 – Page Not Found"
        style={{ maxWidth: 300, width: "100%", marginBottom: "2rem" }}
      />

      <h2 className="mb-3 text-dark fw-bold" style={{ fontSize: "1.75rem" }}>
        Oops! Page Not Found
      </h2>
      <p
        className="mb-4 text-muted"
        style={{ maxWidth: 480, color: "#666666", lineHeight: 1.6 }}
      >
        The page you are looking for might have been removed, had its name changed,
        or is temporarily unavailable. Please check the URL or return to the
        homepage.
      </p>

      <Link href="/" className="btn btn-primary px-4 py-2"
          style={{
            backgroundColor: "#007bff",
            borderRadius: "5px",
            transition: "background-color 0.3s ease",
          }}>
          ← Back to Home
      </Link>
    </div>
  );
}

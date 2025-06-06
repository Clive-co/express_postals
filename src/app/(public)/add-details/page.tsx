// app/add-details/page.tsx
"use client";

import { useSearchParams } from "next/navigation";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function AddDetailsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Read initial values from the URL (or empty string if not provided)
  const initialPickupLocation = searchParams.get("pickupLocation") || "";
  const initialDropOffLocation = searchParams.get("dropOffLocation") || "";
  const initialSenderName = searchParams.get("senderName") || "";
  const initialRecipientName = searchParams.get("recipientName") || "";

  // Local state for all form fields:
  const [senderName, setSenderName] = useState(initialSenderName);
  const [senderAddress, setSenderAddress] = useState(initialPickupLocation);
  const [senderPhone, setSenderPhone] = useState("");
  const [senderEmail, setSenderEmail] = useState("");

  const [recipientName, setRecipientName] = useState(initialRecipientName);
  const [recipientAddress, setRecipientAddress] = useState(initialDropOffLocation);
  const [recipientPhone, setRecipientPhone] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");

  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    const payload = {
      sender: {
        name: senderName,
        address: senderAddress,
        phone: senderPhone,
        email: senderEmail,
      },
      recipient: {
        name: recipientName,
        address: recipientAddress,
        phone: recipientPhone,
        email: recipientEmail,
      },
    };

    try {
      const res = await fetch("/api/shipments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to create shipment");
      }
      const { shipment } = await res.json();
      router.push(`/shipments/${shipment._id}`);
    } catch (err: any) {
      alert(err.message);
      setSubmitting(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f9fafb",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "32px",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          width: "100%",
          maxWidth: "600px",
        }}
      >
        <h2
          style={{
            fontSize: "22px",
            fontWeight: 600,
            color: "#333333",
            marginBottom: "24px",
            textAlign: "center",
          }}
        >
          Additional Shipment Details
        </h2>

        {/* Show the “initial” values at top so user sees what they entered before: */}
        <div
          style={{
            backgroundColor: "#f3f4f6",
            padding: "16px",
            borderRadius: "4px",
            marginBottom: "24px",
          }}
        >
          <p style={{ margin: "4px 0", color: "#555555" }}>
            <strong>Pick-up location:</strong> {senderAddress || "–"}
          </p>
          <p style={{ margin: "4px 0", color: "#555555" }}>
            <strong>Drop-off location:</strong> {recipientAddress || "–"}
          </p>
          <p style={{ margin: "4px 0", color: "#555555" }}>
            <strong>Sender Name:</strong> {senderName || "–"}
          </p>
          <p style={{ margin: "4px 0", color: "#555555" }}>
            <strong>Recipient Name:</strong> {recipientName || "–"}
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Sender block */}
          <fieldset style={{ border: "1px solid #e5e7eb", borderRadius: "4px", padding: "16px" }}>
            <legend style={{ fontSize: "16px", fontWeight: 500, color: "#333333" }}>
              Sender Information
            </legend>

            <div style={{ marginBottom: "12px" }}>
              <label
                htmlFor="senderName"
                style={{ display: "block", marginBottom: "4px", color: "#555555", fontSize: "14px" }}
              >
                Name
              </label>
              <input
                id="senderName"
                type="text"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="John Doe"
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  border: "1px solid #cccccc",
                  borderRadius: "4px",
                  fontSize: "16px",
                  color: "#333333",
                }}
                required
              />
            </div>

            <div style={{ marginBottom: "12px" }}>
              <label
                htmlFor="senderAddress"
                style={{ display: "block", marginBottom: "4px", color: "#555555", fontSize: "14px" }}
              >
                Pick Up Location
              </label>
              <input
                id="senderAddress"
                type="text"
                value={senderAddress}
                onChange={(e) => setSenderAddress(e.target.value)}
                placeholder="123 Main St, City, Country"
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  border: "1px solid #cccccc",
                  borderRadius: "4px",
                  fontSize: "16px",
                  color: "#333333",
                }}
                required
              />
            </div>

            <div style={{ marginBottom: "12px" }}>
              <label
                htmlFor="senderPhone"
                style={{ display: "block", marginBottom: "4px", color: "#555555", fontSize: "14px" }}
              >
                Phone
              </label>
              <input
                id="senderPhone"
                type="tel"
                value={senderPhone}
                onChange={(e) => setSenderPhone(e.target.value)}
                placeholder="+1 234 567 890"
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  border: "1px solid #cccccc",
                  borderRadius: "4px",
                  fontSize: "16px",
                  color: "#333333",
                }}
                required
              />
            </div>

            <div>
              <label
                htmlFor="senderEmail"
                style={{ display: "block", marginBottom: "4px", color: "#555555", fontSize: "14px" }}
              >
                Email
              </label>
              <input
                id="senderEmail"
                type="email"
                value={senderEmail}
                onChange={(e) => setSenderEmail(e.target.value)}
                placeholder="john@example.com"
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  border: "1px solid #cccccc",
                  borderRadius: "4px",
                  fontSize: "16px",
                  color: "#333333",
                }}
                required
              />
            </div>
          </fieldset>

          {/* Recipient block */}
          <fieldset style={{ border: "1px solid #e5e7eb", borderRadius: "4px", padding: "16px" }}>
            <legend style={{ fontSize: "16px", fontWeight: 500, color: "#333333" }}>
              Recipient Information
            </legend>

            <div style={{ marginBottom: "12px" }}>
              <label
                htmlFor="recipientName"
                style={{ display: "block", marginBottom: "4px", color: "#555555", fontSize: "14px" }}
              >
                Name
              </label>
              <input
                id="recipientName"
                type="text"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                placeholder="Jane Smith"
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  border: "1px solid #cccccc",
                  borderRadius: "4px",
                  fontSize: "16px",
                  color: "#333333",
                }}
                required
              />
            </div>

            <div style={{ marginBottom: "12px" }}>
              <label
                htmlFor="recipientAddress"
                style={{ display: "block", marginBottom: "4px", color: "#555555", fontSize: "14px" }}
              >
                Drop Off Location
              </label>
              <input
                id="recipientAddress"
                type="text"
                value={recipientAddress}
                onChange={(e) => setRecipientAddress(e.target.value)}
                placeholder="456 Elm St, City, Country"
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  border: "1px solid #cccccc",
                  borderRadius: "4px",
                  fontSize: "16px",
                  color: "#333333",
                }}
                required
              />
            </div>

            <div style={{ marginBottom: "12px" }}>
              <label
                htmlFor="recipientPhone"
                style={{ display: "block", marginBottom: "4px", color: "#555555", fontSize: "14px" }}
              >
                Phone
              </label>
              <input
                id="recipientPhone"
                type="tel"
                value={recipientPhone}
                onChange={(e) => setRecipientPhone(e.target.value)}
                placeholder="+1 987 654 321"
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  border: "1px solid #cccccc",
                  borderRadius: "4px",
                  fontSize: "16px",
                  color: "#333333",
                }}
                required
              />
            </div>

            <div>
              <label
                htmlFor="recipientEmail"
                style={{ display: "block", marginBottom: "4px", color: "#555555", fontSize: "14px" }}
              >
                Email
              </label>
              <input
                id="recipientEmail"
                type="email"
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
                placeholder="jane@example.com"
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  border: "1px solid #cccccc",
                  borderRadius: "4px",
                  fontSize: "16px",
                  color: "#333333",
                }}
                required
              />
            </div>
          </fieldset>

          {/* Submit button with loading spinner */}
          <button
            type="submit"
            disabled={submitting}
            className="btn btn-primary px-5 py-3"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              color: "#ffffff",
              fontWeight: 500,
              borderRadius: "4px",
              padding: "12px 16px",
              fontSize: "16px",
              cursor: submitting ? "not-allowed" : "pointer",
              opacity: submitting ? 0.7 : 1,
            }}
          >
            {submitting ? (
              <>
                <svg
                  className="animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ height: "20px", width: "20px", marginRight: "8px" }}
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
                Submitting…
              </>
            ) : (
              "Place Shipment Order"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

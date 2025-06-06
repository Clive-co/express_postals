"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface Shipment {
  _id: string;
  trackingId: string;
  sender: {
    name: string;
    address: string;
    phone: string;
    email: string;
  };
  recipient: {
    name: string;
    address: string;
    phone: string;
    email: string;
  };
  status: string;
  createdAt: string;
  pickupDate?: string;
  dropOffDate?: string;
  pickupTime?: string;
}

export default function ShipmentDetailPage() {
  const { id } = useParams();
  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [copied, setCopied] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch(`/api/shipments/${id}`)
      .then((res) => res.json())
      .then((data) => setShipment(data.shipment))
      .catch(() => setShipment(null));
  }, [id]);

  function downloadReceipt() {
    if (!shipment) return;

    const doc = new jsPDF({
      unit: "pt",
      format: "letter",
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 40; // 40pt margin

    // ─── Header Background ────────────────────────────────────────────────
    const headerHeight = 80;
    doc.setFillColor(245, 245, 245);
    doc.rect(margin, margin - 20, pageWidth - 2 * margin, headerHeight, "F");

    // ─── Title ─────────────────────────────────────────────────────────────
    const titleY = margin;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(33, 37, 41);
    doc.text("Express Postals Receipt", margin + 10, titleY);

    // ─── Company Info ──────────────────────────────────────────────────────
    const companyInfoY = titleY + 22;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(100);
    const companyLines = [
      "Express Postals, Inc.",
      "310 7th Ave",
      "South Charleston, WV 25303",
      "Phone: +1 223-307-8767 · support@expresspostals.com",
    ];
    companyLines.forEach((line, i) => {
      doc.text(line, margin + 10, companyInfoY + i * 12);
    });

    // ─── Divider ───────────────────────────────────────────────────────────
    doc.setDrawColor(200);
    doc.setLineWidth(0.5);
    doc.line(
      margin,
      margin + headerHeight - 5,
      pageWidth - margin,
      margin + headerHeight - 5
    );

    // ─── Issued Date ────────────────────────────────────────────────────────
    const issuedY = margin + headerHeight + 10;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(66, 66, 66);
    const issuedDate = new Date().toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    doc.text(`Issued: ${issuedDate}`, margin, issuedY);

    // ─── Tracking ID ───────────────────────────────────────────────────────
    const trackY = issuedY + 16;
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(33, 37, 41);
    doc.text(`Tracking ID: ${shipment.trackingId}`, margin, trackY);

    // ─── Build table data (no weight/price rows) ──────────────────────────
    const rows = [
      ["Pick-up Location",  shipment.sender.address],
      ["Drop-off Location", shipment.recipient.address],
      ["Sender Name",       shipment.sender.name],
      ["Sender Phone",      shipment.sender.phone],
      ["Sender Email",      shipment.sender.email],
      ["Recipient Name",    shipment.recipient.name],
      ["Recipient Phone",   shipment.recipient.phone],
      ["Recipient Email",   shipment.recipient.email],
      ["Created At",        new Date(shipment.createdAt).toLocaleString()],
    ];

    autoTable(doc, {
      startY: trackY + 20,
      margin: { left: margin, right: margin },
      head: [
        [
          { content: "Field", styles: { halign: "left" } },
          { content: "Value", styles: { halign: "left" } },
        ],
      ],
      body: rows.map(([field, value]) => [field, value]),
      styles: {
        font: "helvetica",
        fontSize: 10,
        textColor: [50, 50, 50],
        cellPadding: 6,
        valign: "middle",
      },
      headStyles: {
        fillColor: [230, 230, 230],
        textColor: [33, 37, 41],
        fontStyle: "bold",
        fontSize: 11,
        valign: "middle",
        halign: "left",
      },
      alternateRowStyles: { fillColor: [250, 250, 250] },
      theme: "grid",
    });

    // ─── Dotted Separator ──────────────────────────────────────────────────
    const lastY = (doc as any).lastAutoTable
      ? (doc as any).lastAutoTable.finalY
      : doc.internal.pageSize.getHeight() - 100;
    const separatorY = lastY + 20;
    const dashWidth = 4;
    const dashGap = 3;
    let x = margin;
    while (x < pageWidth - margin) {
      doc.setDrawColor(180);
      doc.setLineWidth(0.3);
      doc.line(x, separatorY, x + dashWidth, separatorY);
      x += dashWidth + dashGap;
    }

    // ─── Tagline ─────────────────────────────────────────────────────────────
    const taglineY = separatorY + 15;
    doc.setFont("helvetica", "italic");
    doc.setFontSize(12);
    doc.setTextColor(66);
    doc.text(
      "“Delivering smiles, one package at a time.”",
      pageWidth / 2,
      taglineY,
      { align: "center" }
    );

    // ─── Footer Message ──────────────────────────────────────────────────────
    const footerY = taglineY + 20;
    doc.setFont("helvetica", "italic");
    doc.setFontSize(12);
    doc.setTextColor(100);
    doc.text(
      "Thank you for choosing Express Postals!",
      pageWidth / 2,
      footerY,
      { align: "center" }
    );

    doc.save(`receipt-${shipment.trackingId}.pdf`);
  }

  const handleCopy = (trackingId: string) => {
    navigator.clipboard.writeText(trackingId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (shipment === null) {
    return (
      <div className="container-scroller">
        <div className="container-fluid page-body-wrapper full-page-wrapper">
          <div className="content-wrapper d-flex align-items-center auth px-0">
            <div className="row w-100 mx-0">
              <div className="col-lg-6 col-md-8 mx-auto">
                <div className="request-form animate__animated animate__fadeIn animate__delay-1s w-100 text-center">
                  <h2>Loading…</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-scroller">
      <div className="container-fluid page-body-wrapper full-page-wrapper">
        <div className="content-wrapper d-flex align-items-center auth px-0">
          <div className="row w-100 mx-0">
            <div className="col-lg-6 col-md-8 mx-auto">
              <div
                className="request-form animate__animated animate__fadeIn animate__delay-1s w-100"
                style={{
                  backgroundColor: "#f9fafb",
                  padding: "24px",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  textAlign: "center",
                }}
              >
                <h2
                  className="mb-4"
                  style={{
                    fontSize: "28px",
                    fontWeight: "bold",
                    color: "#333333",
                  }}
                >
                  Thank You!
                </h2>
                <p
                  className="mb-4"
                  style={{
                    fontSize: "16px",
                    color: "#555555",
                  }}
                >
                  Your shipment order has been created successfully. Here are the details:
                </p>

                {/* Tracking ID */}
                <div
                  style={{
                    backgroundColor: "#ffffff",
                    padding: "16px",
                    borderRadius: "8px",
                    border: "1px solid #e5e7eb",
                    display: "inline-block",
                    marginBottom: "16px",
                  }}
                >
                  <p
                    className="mb-2 text-gray-600"
                    style={{
                      fontSize: "14px",
                      marginBottom: "8px",
                    }}
                  >
                    Note your{" "}
                    <span className="font-semibold text-gray-800">Tracking ID</span> to
                    track shipment status:
                  </p>
                  <div
                    className="inline-flex items-center"
                    style={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      color: "#333333",
                      backgroundColor: "#f3f4f6",
                      padding: "8px 16px",
                      borderRadius: "4px",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      position: "relative",
                    }}
                  >
                    <span className="font-mono">{shipment.trackingId}</span>
                    <i
                      onClick={() => handleCopy(shipment.trackingId)}
                      className="fas fa-copy cursor-pointer text-gray-500 hover:text-gray-800"
                      title="Copy to clipboard"
                      style={{ cursor: "pointer" }}
                    ></i>
                    {copied && (
                      <span
                        style={{
                          position: "absolute",
                          top: "-24px",
                          right: "0",
                          backgroundColor: "#4caf50",
                          color: "#ffffff",
                          padding: "4px 8px",
                          borderRadius: "4px",
                          fontSize: "12px",
                          boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
                        }}
                      >
                        Copied!
                      </span>
                    )}
                  </div>
                </div>

                {/* Pick-up / Drop-off */}
                <div className="form-group">
                  <label className="label">Pick-up location</label>
                  <p>{shipment.sender.address}</p>
                </div>
                <div className="form-group">
                  <label className="label">Drop-off location</label>
                  <p>{shipment.recipient.address}</p>
                </div>

                <hr />

                {/* Sender Information */}
                <h4 className="mt-4 mb-3">Sender Information</h4>
                <div className="form-group">
                  <label className="label">Name</label>
                  <p>{shipment.sender.name}</p>
                </div>
                <div className="form-group">
                  <label className="label">Phone</label>
                  <p>{shipment.sender.phone}</p>
                </div>
                <div className="form-group">
                  <label className="label">Email</label>
                  <p>{shipment.sender.email}</p>
                </div>

                <hr />

                {/* Recipient Information */}
                <h4 className="mt-4 mb-3">Recipient Information</h4>
                <div className="form-group">
                  <label className="label">Name</label>
                  <p>{shipment.recipient.name}</p>
                </div>
                <div className="form-group">
                  <label className="label">Phone</label>
                  <p>{shipment.recipient.phone}</p>
                </div>
                <div className="form-group">
                  <label className="label">Email</label>
                  <p>{shipment.recipient.email}</p>
                </div>

                <hr />

                {/* Created At */}
                <div className="form-group">
                  <label className="label">Created At</label>
                  <p>{new Date(shipment.createdAt).toLocaleString()}</p>
                </div>

                <div className="form-group mt-4">
                  <button
                    onClick={downloadReceipt}
                    className="btn btn-primary py-3 px-4"
                  >
                    Download Receipt
                  </button>
                </div>

                {/* Return to Home */}
                <div className="form-group mt-4">
                  <button
                    onClick={() => router.push("/")}
                    className="btn btn-secondary py-3 px-4"
                  >
                    Return to Home
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

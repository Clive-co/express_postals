// models/Shipment.js
const mongoose = require("mongoose");
const crypto = require("crypto");

// Generate something like "SHP-3F9A7C1D"
function generateTrackingId() {
  return `SHP-${crypto.randomBytes(4).toString("hex").toUpperCase()}`;
}

const ShipmentSchema = new mongoose.Schema(
  {
    trackingId: {
      type: String,
      default: generateTrackingId,
      unique: true,
    },
    sender: {
      name:    String,
      address: String,
      phone:   String,
      email:   String,
    },
    recipient: {
      name:    String,
      address: String,
      phone:   String,
      email:   String,
    },
    status: {
      type: String,
      enum: ["pending", "in_transit", "delivered", "cancelled"],
      default: "pending",
    },
    // ← Removed weightKg and priceUsd entirely
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Shipment", ShipmentSchema);

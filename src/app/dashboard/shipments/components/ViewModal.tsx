"use client";

import React from "react";
import { Shipment } from "../types";
import dayjs from "dayjs";

export default function ViewModal({
  shipment,
  onClose,
}: {
  shipment: Shipment;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-lg bg-white shadow-lg dark:bg-gray-800 max-h-[90vh]">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Shipment Details
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6 space-y-6 text-gray-800 dark:text-gray-200 overflow-auto">
          <div className="text-sm">
            <span className="font-medium">Tracking ID:</span> {shipment.trackingId}
          </div>

          <div className="grid grid-cols-2 gap-6 text-sm">
            <div>
              <h3 className="mb-2 text-base font-semibold text-gray-900 dark:text-gray-100">
                Sender Information
              </h3>
              <p>
                <span className="font-medium">Name:</span> {shipment.sender.name}
              </p>
              <p>
                <span className="font-medium">Pick Up Location:</span> {shipment.sender.address}
              </p>
              <p>
                <span className="font-medium">Phone:</span> {shipment.sender.phone}
              </p>
              <p>
                <span className="font-medium">Email:</span> {shipment.sender.email}
              </p>
            </div>

            <div>
              <h3 className="mb-2 text-base font-semibold text-gray-900 dark:text-gray-100">
                Recipient Information
              </h3>
              <p>
                <span className="font-medium">Name:</span> {shipment.recipient.name}
              </p>
              <p>
                <span className="font-medium">Drop Off Location:</span> {shipment.recipient.address}
              </p>
              <p>
                <span className="font-medium">Phone:</span> {shipment.recipient.phone}
              </p>
              <p>
                <span className="font-medium">Email:</span> {shipment.recipient.email}
              </p>
            </div>
          </div>

          {/* ─── Status & Created At (2 columns) ────────────────────────────── */}
          <div className="grid grid-cols-2 gap-6 text-sm">
            <div>
              <span className="font-medium">Status:</span>{" "}
              {shipment.status.replace("_", " ").toUpperCase()}
            </div>
            <div>
              <span className="font-medium">Created At:</span>{" "}
              {dayjs(shipment.createdAt).format("MMM DD, YYYY, h:mm A")}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t border-gray-200 dark:border-gray-700 px-6 py-4">
          <button
            onClick={onClose}
            className="
              inline-flex items-center rounded-md border border-gray-300 
              bg-white px-4 py-2 text-sm font-medium text-gray-700 
              hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 
              dark:text-gray-200 dark:hover:bg-gray-600
            "
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

// src/app/dashboard/shipments/update-status/page.tsx
"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type Shipment = {
  _id: string;
  trackingId: string;
  status: "pending" | "in_transit" | "delivered" | "cancelled";
  // …any other fields you want…
};

export default function UpdateShipmentStatusPage() {
  // Lookup form
  const [trackingId, setTrackingId] = useState("");
  const [lookupLoading, setLookupLoading] = useState(false);
  const [lookupError, setLookupError] = useState<string | null>(null);

  // Fetched shipment
  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [newStatus, setNewStatus] = useState<Shipment["status"]>("pending");

  // Update form
  const [updateLoading, setUpdateLoading] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // (1) Look up by trackingId
  async function handleLookup(e: React.FormEvent) {
    e.preventDefault();
    setLookupError(null);
    setShipment(null);
    setFeedback(null);

    if (!trackingId.trim()) {
      setLookupError("Please enter a Tracking ID.");
      return;
    }

    setLookupLoading(true);
    try {
      const res = await fetch(`/api/shipments/track/${encodeURIComponent(trackingId.trim())}`, {
        credentials: "include",
      });

      if (!res.ok) {
        // Try JSON
        let msg = `Shipment not found (status ${res.status})`;
        try {
          const err = await res.json();
          if (err.error) msg = err.error;
        } catch {
          // ignore
        }
        throw new Error(msg);
      }

      const body = await res.json();
      const data: Shipment = body.shipment;
      setShipment(data);
      setNewStatus(data.status);
    } catch (err: any) {
      setLookupError(err.message || "Failed to fetch shipment.");
    } finally {
      setLookupLoading(false);
    }
  }

  // (2) Update its status
  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    setFeedback(null);

    if (!shipment) {
      setFeedback({ type: "error", message: "Lookup a shipment first." });
      return;
    }
    if (newStatus === shipment.status) {
      setFeedback({
        type: "error",
        message: "Please choose a different status.",
      });
      return;
    }

    setUpdateLoading(true);
    try {
      const res = await fetch(`/api/shipments/${shipment._id}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) {
        let msg = `Update failed (status ${res.status})`;
        try {
          const err = await res.json();
          if (err.error) msg = err.error;
        } catch {}
        throw new Error(msg);
      }

      setFeedback({
        type: "success",
        message: "Status updated successfully.",
      });
      // reflect new status
      setShipment((s) => (s ? { ...s, status: newStatus } : s));
    } catch (err: any) {
      setFeedback({ type: "error", message: err.message });
    } finally {
      setUpdateLoading(false);
    }
  }

  return (
    <div className="min-h-[100vh] bg-gray-50 dark:bg-gray-dark px-4 py-6 sm:px-6 lg:px-8">
      {/* header omitted for brevity */}

      <div className="rounded-lg bg-white dark:bg-gray-700 shadow-sm overflow-hidden">
        <div className="p-6 space-y-8">
          {/* Lookup form */}
          <form onSubmit={handleLookup} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="sm:col-span-2">
                <label htmlFor="tracking-id" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Tracking ID
                </label>
                <input
                  id="tracking-id"
                  type="text"
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  placeholder="SHP-1234ABCD"
                />
              </div>
              <div className="text-right">
                <button
                  type="submit"
                  disabled={lookupLoading}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium focus:outline-none",
                    lookupLoading
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-purple-600 text-white hover:bg-purple-700"
                  )}
                >
                  {lookupLoading ? "Searching…" : "Fetch Shipment"}
                </button>
              </div>
            </div>
            {lookupError && (
              <div className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">
                {lookupError}
              </div>
            )}
          </form>

          {/* If we have a shipment, show the update form */}
          {shipment && (
            <form onSubmit={handleUpdate} className="space-y-6">
              <div>
                <label htmlFor="current-status" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Current Status
                </label>
                <input
                  id="current-status"
                  readOnly
                  value={shipment.status.replace("_", " ").toUpperCase()}
                  className="mt-1 block w-full rounded-md border bg-gray-100 px-3 py-2"
                />
              </div>

              <div>
                <label htmlFor="new-status" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  New Status
                </label>
                <select
                  id="new-status"
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as Shipment["status"])}
                  className="mt-1 block w-full rounded-md border px-3 py-2"
                >
                  <option value="pending">Pending</option>
                  <option value="in_transit">In Transit</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              {feedback && (
                <div
                  className={cn(
                    "rounded-md px-4 py-3 text-sm",
                    feedback.type === "success" ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"
                  )}
                  role="alert"
                >
                  {feedback.message}
                </div>
              )}

              <div className="text-right">
                <button
                  type="submit"
                  disabled={updateLoading}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium focus:outline-none",
                    updateLoading
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-purple-600 text-white hover:bg-purple-700"
                  )}
                >
                  {updateLoading ? "Updating…" : "Update Status"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { Shipment } from "../types";

export default function AddShipmentModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({
    senderName:       "",
    senderAddress:    "",
    senderPhone:      "",
    senderEmail:      "",
    recipientName:    "",
    recipientAddress: "",
    recipientPhone:   "",
    recipientEmail:   "",
    status:           "pending" as Shipment["status"],
  });
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!form.senderName || !form.recipientName) {
      setError("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        sender: {
          name:    form.senderName,
          address: form.senderAddress,
          phone:   form.senderPhone,
          email:   form.senderEmail,
        },
        recipient: {
          name:    form.recipientName,
          address: form.recipientAddress,
          phone:   form.recipientPhone,
          email:   form.recipientEmail,
        },
        status: form.status,
      };

      const res = await fetch("/api/shipments", {
        method:      "POST",
        credentials: "include",
        headers:     { "Content-Type": "application/json" },
        body:        JSON.stringify(payload),
      });

      if (!res.ok) {
        let msg = `Error ${res.status}`;
        try {
          const body = await res.json();
          if (body.error) msg = body.error;
        } catch {}
        throw new Error(msg);
      }

      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="
        fixed inset-0 z-50 flex items-start justify-center
        bg-black bg-opacity-40 p-4 pt-20
      "
    >
      <div
        className="
          relative w-full max-w-lg 
          h-[calc(100vh-4rem)] overflow-hidden 
          rounded-lg bg-white shadow-xl dark:bg-gray-800
        "
      >
        <div className="flex h-full flex-col">
          {/* ─── Header ───────────────────────────────────────────────────────── */}
          <div className="flex items-center justify-between px-6 pt-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Add New Shipment
            </h2>
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>

          {/* ─── Scrollable form area ─────────────────────────────────────────── */}
          <div className="px-6 pt-4 pb-6 flex-1 overflow-y-auto">
            {error && (
              <div className="mb-4 rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={submit} className="space-y-4">
              {/* ─── Sender Fields ────────────────────────────────────────────── */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="sender-name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    Sender Name
                  </label>
                  <input
                    id="sender-name"
                    type="text"
                    required
                    value={form.senderName}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, senderName: e.target.value }))
                    }
                    placeholder="John Doe"
                    className="
                      mt-1 block w-full rounded-md border
                      border-gray-300 bg-white px-3 py-2 text-gray-900
                      placeholder-gray-400 focus:border-purple-500 focus:outline-none
                      focus:ring-purple-500 sm:text-sm dark:bg-gray-700
                      dark:border-gray-600 dark:placeholder-gray-400
                      dark:text-gray-100 dark:focus:border-purple-400
                    "
                  />
                </div>
                <div>
                  <label
                    htmlFor="sender-address"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    Pick Up Location
                  </label>
                  <input
                    id="sender-address"
                    type="text"
                    required
                    value={form.senderAddress}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, senderAddress: e.target.value }))
                    }
                    placeholder="123 Main St, City, State"
                    className="
                      mt-1 block w-full rounded-md border
                      border-gray-300 bg-white px-3 py-2 text-gray-900
                      placeholder-gray-400 focus:border-purple-500 focus:outline-none
                      focus:ring-purple-500 sm:text-sm dark:bg-gray-700
                      dark:border-gray-600 dark:placeholder-gray-400
                      dark:text-gray-100 dark:focus:border-purple-400
                    "
                  />
                </div>
                <div>
                  <label
                    htmlFor="sender-phone"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    Sender Phone
                  </label>
                  <input
                    id="sender-phone"
                    type="tel"
                    required
                    value={form.senderPhone}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, senderPhone: e.target.value }))
                    }
                    placeholder="+1 (555) 123-4567"
                    className="
                      mt-1 block w-full rounded-md border
                      border-gray-300 bg-white px-3 py-2 text-gray-900
                      placeholder-gray-400 focus:border-purple-500 focus:outline-none
                      focus:ring-purple-500 sm:text-sm dark:bg-gray-700
                      dark:border-gray-600 dark:placeholder-gray-400
                      dark:text-gray-100 dark:focus:border-purple-400
                    "
                  />
                </div>
                <div>
                  <label
                    htmlFor="sender-email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    Sender Email
                  </label>
                  <input
                    id="sender-email"
                    type="email"
                    required
                    value={form.senderEmail}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, senderEmail: e.target.value }))
                    }
                    placeholder="john@example.com"
                    className="
                      mt-1 block w-full rounded-md border
                      border-gray-300 bg-white px-3 py-2 text-gray-900
                      placeholder-gray-400 focus:border-purple-500 focus:outline-none
                      focus:ring-purple-500 sm:text-sm dark:bg-gray-700
                      dark:border-gray-600 dark:placeholder-gray-400
                      dark:text-gray-100 dark:focus:border-purple-400
                    "
                  />
                </div>
              </div>

              {/* ─── Recipient Fields ─────────────────────────────────────────── */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="recipient-name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    Recipient Name
                  </label>
                  <input
                    id="recipient-name"
                    type="text"
                    required
                    value={form.recipientName}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, recipientName: e.target.value }))
                    }
                    placeholder="Jane Smith"
                    className="
                      mt-1 block w-full rounded-md border
                      border-gray-300 bg-white px-3 py-2 text-gray-900
                      placeholder-gray-400 focus:border-purple-500 focus:outline-none
                      focus:ring-purple-500 sm:text-sm dark:bg-gray-700
                      dark:border-gray-600 dark:placeholder-gray-400
                      dark:text-gray-100 dark:focus:border-purple-400
                    "
                  />
                </div>
                <div>
                  <label
                    htmlFor="recipient-address"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    Drop Off Location
                  </label>
                  <input
                    id="recipient-address"
                    type="text"
                    required
                    value={form.recipientAddress}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, recipientAddress: e.target.value }))
                    }
                    placeholder="456 Elm St, Other City, State"
                    className="
                      mt-1 block w-full rounded-md border
                      border-gray-300 bg-white px-3 py-2 text-gray-900
                      placeholder-gray-400 focus:border-purple-500 focus:outline-none
                      focus:ring-purple-500 sm:text-sm dark:bg-gray-700
                      dark:border-gray-600 dark:placeholder-gray-400
                      dark:text-gray-100 dark:focus:border-purple-400
                    "
                  />
                </div>
                <div>
                  <label
                    htmlFor="recipient-phone"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    Recipient Phone
                  </label>
                  <input
                    id="recipient-phone"
                    type="tel"
                    required
                    value={form.recipientPhone}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, recipientPhone: e.target.value }))
                    }
                    placeholder="+1 (555) 987-6543"
                    className="
                      mt-1 block w-full rounded-md border
                      border-gray-300 bg-white px-3 py-2 text-gray-900
                      placeholder-gray-400 focus:border-purple-500 focus:outline-none
                      focus:ring-purple-500 sm:text-sm dark:bg-gray-700
                      dark:border-gray-600 dark:placeholder-gray-400
                      dark:text-gray-100 dark:focus:border-purple-400
                    "
                  />
                </div>
                <div>
                  <label
                    htmlFor="recipient-email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    Recipient Email
                  </label>
                  <input
                    id="recipient-email"
                    type="email"
                    required
                    value={form.recipientEmail}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, recipientEmail: e.target.value }))
                    }
                    placeholder="jane@example.com"
                    className="
                      mt-1 block w-full rounded-md border
                      border-gray-300 bg-white px-3 py-2 text-gray-900
                      placeholder-gray-400 focus:border-purple-500 focus:outline-none
                      focus:ring-purple-500 sm:text-sm dark:bg-gray-700
                      dark:border-gray-600 dark:placeholder-gray-400
                      dark:text-gray-100 dark:focus:border-purple-400
                    "
                  />
                </div>
              </div>

              {/* ─── Status Field ──────────────────────────────────────────────── */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label
                    htmlFor="shipment-status"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    Status
                  </label>
                  <select
                    id="shipment-status"
                    required
                    value={form.status}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        status: e.target.value as Shipment["status"],
                      }))
                    }
                    className="
                      mt-1 block w-full rounded-md border
                      border-gray-300 bg-white px-3 py-2 text-gray-900
                      focus:border-purple-500 focus:outline-none
                      focus:ring-purple-500 sm:text-sm dark:bg-gray-700
                      dark:border-gray-600 dark:text-gray-100
                      dark:focus:border-purple-400
                    "
                  >
                    <option value="pending">Pending</option>
                    <option value="in_transit">In Transit</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                {/* Note: Weight & Price fields have been removed */}
              </div>

              {/* ─── Save Button ───────────────────────────────────────────────── */}
              <div className="pt-4 text-right">
                <button
                  type="submit"
                  disabled={loading}
                  className="
                    inline-flex items-center gap-2 rounded-md 
                    bg-purple-600 px-4 py-2 text-sm font-medium text-white 
                    hover:bg-purple-700 focus:outline-none focus:ring-2 
                    focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50
                  "
                >
                  {loading ? "Saving…" : "Save Shipment"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

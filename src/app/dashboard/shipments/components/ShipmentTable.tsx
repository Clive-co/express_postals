// src/app/dashboard/shipments/components/ShipmentTable.tsx
"use client";

import React, { useState } from "react";
import { Shipment } from "../types";
import ViewModal from "./ViewModal";
import EditStatusModal from "./EditStatusModal";
import DeleteModal from "./DeleteModal";
import dayjs from "dayjs";
import { cn } from "@/lib/utils";

export default function ShipmentTable({
  shipments,
  loading,
  onDeletedOrUpdated,
}: {
  shipments: Shipment[];
  loading: boolean;
  onDeletedOrUpdated: () => void;
}) {
  const [toView, setToView] = useState<Shipment | null>(null);
  const [toEdit, setToEdit] = useState<Shipment | null>(null);
  const [toDelete, setToDelete] = useState<Shipment | null>(null);

  // ─── Loading State ─────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-700 dark:shadow-card">
        <div className="flex items-center justify-center space-x-2">
          <svg
            className="h-6 w-6 animate-spin text-gray-600 dark:text-gray-300"
            xmlns="http://www.w3.org/2000/svg"
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
          <span className="text-gray-700 dark:text-gray-300">
            Loading shipments…
          </span>
        </div>
      </div>
    );
  }

  // ─── Empty State ────────────────────────────────────────────────────────────
  if (!loading && shipments.length === 0) {
    return (
      <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-700 dark:shadow-card">
        <div className="flex flex-col items-center justify-center space-y-3">
          <svg
            className="h-12 w-12 text-gray-300 dark:text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 7h2l.4 2M7 7h10l1 2m-12 0h12M5 7v11a1 1 0 001 1h1a2 2 0 104 0h6a2 2 0 104 0h1a1 1 0 001-1V7M16 21a2 2 0 11-4 0m-6 0a2 2 0 11-4 0"
            />
          </svg>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            No Shipments Found
          </h3>
          <p className="max-w-xs text-center text-gray-500 dark:text-gray-300">
            You haven’t created any shipments yet.
          </p>
        </div>
      </div>
    );
  }

  // ─── Main Table ──────────────────────────────────────────────────────────────
  return (
    <>
      <div className="rounded-lg bg-white dark:bg-gray-700 shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider"
              >
                Tracking ID
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider"
              >
                Sender Name
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider"
              >
                Drop Off Location
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider"
              >
                Created At
              </th>
              <th scope="col" className="relative px-4 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-700 dark:divide-gray-600">
            {shipments.map((ship) => (
              <tr
                key={ship._id}
                className="hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                {/* Tracking ID */}
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800 dark:text-gray-100">
                  {ship.trackingId}
                </td>

                {/* Sender Name */}
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800 dark:text-gray-100">
                  {ship.sender.name}
                </td>

                {/* Status Badge (REFLECTS UPDATED “PILL” STYLING) */}
                <td className="px-4 py-3 whitespace-nowrap text-sm">
                  <div
                    className={cn(
                      "max-w-fit rounded-full px-3.5 py-1 text-sm font-medium",
                      {
                        "bg-[#219653]/[0.08] text-[#219653]": ship.status === "delivered",
                        "bg-[#D34053]/[0.08] text-[#D34053]": ship.status === "cancelled",
                        "bg-[#FFA70B]/[0.08] text-[#FFA70B]": ship.status === "pending",
                        "bg-[#2F80ED]/[0.08] text-[#2F80ED]": ship.status === "in_transit",
                      }
                    )}
                  >
                    {ship.status.replace("_", " ").toUpperCase()}
                  </div>
                </td>

                {/* Drop Off Location */}
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800 dark:text-gray-100">
                  {ship.recipient.address}
                </td>

                {/* Created At */}
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800 dark:text-gray-100">
                  {new Date(ship.createdAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </td>

                {/* Actions */}
                <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium space-x-2">
                  {/* View Icon */}
                  <button
                    title="View"
                    onClick={() => setToView(ship)}
                    className="inline-flex items-center justify-center h-8 w-8 rounded border border-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-gray-100 focus:outline-none"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 
                          8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 
                          0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </button>

                  {/* Edit Icon */}
                  <button
                    title="Edit"
                    onClick={() => setToEdit(ship)}
                    className="inline-flex items-center justify-center h-8 w-8 rounded border border-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-gray-100 focus:outline-none"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11 5H6a2 2 0 00-2 2v12a2 2 0 
                          002 2h12a2 2 0 002-2v-5m-1.414-9.414 
                          a2 2 0 112.828 2.828L11.828 15H9v-2.828 
                          l8.586-8.586z"
                      />
                    </svg>
                  </button>

                  {/* Delete Icon */}
                  <button
                    title="Delete"
                    onClick={() => setToDelete(ship)}
                    className="inline-flex items-center justify-center h-8 w-8 rounded border border-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-gray-100 focus:outline-none"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 
                          21H7.862a2 2 0 01-1.995-1.858L5 7m5 
                          4v6m4-6v6M1 7h22M8 7V4a2 2 0 012-2h4a2 
                          2 0 012 2v3"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}

            {/* If you need an “empty row” when shipments is empty (client‐side paging), add it here */}
            {shipments.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-4 text-center text-gray-500 dark:text-gray-300"
                >
                  No shipments found on this page.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ─── Modals ─────────────────────────────────────────────────────────────── */}
      {toView && <ViewModal shipment={toView} onClose={() => setToView(null)} />}
      {toEdit && (
        <EditStatusModal
          shipment={toEdit}
          onClose={() => {
            setToEdit(null);
            onDeletedOrUpdated();
          }}
        />
      )}
      {toDelete && (
        <DeleteModal
          shipment={toDelete}
          onClose={() => {
            setToDelete(null);
            onDeletedOrUpdated();
          }}
        />
      )}
    </>
  );
}

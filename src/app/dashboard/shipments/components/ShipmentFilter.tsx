// app/dashboard/shipments/components/ShipmentFilter.tsx
"use client";
import React from "react";

const OPTIONS = [
  { value: "", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "in_transit", label: "In Transit" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
];

export default function ShipmentFilter({
  value,
  onChange,
}: {
  value?: string;
  onChange: (v?: string) => void;
}) {
  return (
    <div className="mb-4">
      <div className="inline-flex items-center bg-white dark:bg-gray-700 shadow rounded-md px-4 py-2">
        <span className="mr-4 text-gray-700 dark:text-gray-200 font-semibold">
          Filter by status:
        </span>

        <div className="relative">
          <select
            value={value || ""}
            onChange={(e) => {
              const v = e.target.value;
              onChange(v === "" ? undefined : v);
            }}
            className="
              appearance-none
              w-36
              bg-gray-100 dark:bg-gray-600
              text-gray-700 dark:text-gray-200
              py-2 pl-3 pr-8
              rounded border border-gray-300 dark:border-gray-500
              focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
            "
          >
            {OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>

          {/* Custom dropdown arrow */}
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <svg
              className="h-4 w-4 text-gray-500 dark:text-gray-300"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 8l4 4 4-4"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

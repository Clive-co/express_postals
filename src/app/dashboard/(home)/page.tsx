// src/app/dashboard/page.tsx   (or pages/dashboard.tsx, etc.)
"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import WeatherCard from "./_components/weatherCard";
import { OverviewCardsGroup } from "./_components/overview-cards";
import { OverviewCardsSkeleton } from "./_components/overview-cards/skeleton";

// Type definition for a Shipment record:
type Shipment = {
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
  status: "pending" | "in_transit" | "delivered" | "cancelled";
  weightKg: number;
  priceUsd: number;
  createdAt: string; // ISO date string
};

// Custom hook that fetches all shipments on the client:
function useRecentShipments(count: number) {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [loading,    setLoading]  = useState(true);
  const [error,      setError]    = useState<string|null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    fetch(`/api/shipments?limit=${count}`, { credentials: "include" })
      .then(async res => {
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body.error || `Server returned ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        if (!mounted) return;
        const arr: Shipment[] = Array.isArray(data.shipments)
          ? data.shipments
          : [];
        setShipments(arr);
      })
      .catch(err => {
        if (!mounted) return;
        console.error(err);
        setError(err.message || "Could not load shipments.");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => { mounted = false; };
  }, [count]);

  return { shipments, loading, error };
}

// Main Home/component page:
export default function Home() {
  const { shipments, loading, error } = useRecentShipments(5);

  // Sort by createdAt descending, then take top 5:
  const latestFive = [...shipments]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      {/* ─── Other dashboard sections (e.g. OverviewCardsGroup) would go here ─── */}
      {/* Example Placeholder: */}
      {/* <OverviewCardsGroup /> */}
      <WeatherCard />

      <div className="mt-8">
        {/* ─── “Recent Shipments” Header ──────────────────────────────────────── */}
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
          Recent Shipment Orders
        </h2>

        {/* ─── Loading State ─────────────────────────────────────────────────── */}
        {loading && (
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
        )}

        {/* ─── Error State ───────────────────────────────────────────────────── */}
        {!loading && error && (
          <div className="rounded-lg bg-white px-7.5 py-6 shadow-1 dark:bg-gray-dark dark:shadow-card">
            <div className="flex flex-col items-center justify-center space-y-3 py-8">
              <svg
                className="h-12 w-12 text-red-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-lg font-semibold text-red-600 dark:text-red-400">
                Oops! Couldn’t load shipments.
              </h3>
              <p className="max-w-xs text-center text-gray-500 dark:text-gray-300">
                Something went wrong while fetching your shipments. Please try again
                later or contact support if the problem persists.
              </p>
            </div>
          </div>
        )}

        {/* ─── Empty State (no shipments) ───────────────────────────────────── */}
        {!loading && !error && shipments.length === 0 && (
          <div className="rounded-lg bg-white px-7.5 py-6 shadow-1 dark:bg-gray-dark dark:shadow-card">
            <div className="flex flex-col items-center justify-center space-y-3 py-8">
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
                You haven’t gotten any shipment orders yet. Once you get orders, they’ll
                show up here.
              </p>
            </div>
          </div>
        )}

        {/* ─── Table of the 5 Latest Shipments ────────────────────────────────── */}
        {!loading && !error && shipments.length > 0 && (
          <div
            className={cn(
              "rounded-lg bg-white px-7.5 pb-4 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card"
            )}
          >
            <Table>
              <TableHeader>
                <TableRow className="border-none bg-[#F7F9FC] dark:bg-gray-800 [&>th]:py-4 [&>th]:text-base [&>th]:text-gray-800 dark:[&>th]:text-white">
                  <TableHead className="min-w-[120px] !text-left">
                    Tracking ID
                  </TableHead>
                  <TableHead>Customer Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Drop Off Location</TableHead>
                  <TableHead>Created At</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {latestFive.map((ship) => (
                  <TableRow
                    key={ship._id}
                    className="border-[#eee] dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    {/* Tracking ID */}
                    <TableCell className="min-w-[120px] !text-left">
                      <span className="text-gray-900 dark:text-white">
                        {ship.trackingId}
                      </span>
                    </TableCell>

                    {/* Sender Name */}
                    <TableCell>
                      <span className="text-gray-900 dark:text-white">
                        {ship.sender.name}
                      </span>
                    </TableCell>

                    {/* Status Badge */}
                    <TableCell>
                      <div
                        className={cn(
                          "max-w-fit rounded-full px-3.5 py-1 text-sm font-medium",
                          {
                            "bg-[#219653]/[0.08] text-[#219653]":
                              ship.status === "delivered",
                            "bg-[#D34053]/[0.08] text-[#D34053]":
                              ship.status === "cancelled",
                            "bg-[#FFA70B]/[0.08] text-[#FFA70B]":
                              ship.status === "pending",
                            "bg-[#2F80ED]/[0.08] text-[#2F80ED]":
                              ship.status === "in_transit",
                          }
                        )}
                      >
                        {ship.status.replace("_", " ").toUpperCase()}
                      </div>
                    </TableCell>

                    {/* Recipient Address */}
                    <TableCell>
                      <span className="text-gray-900 dark:text-white">
                        {ship.recipient.address}
                      </span>
                    </TableCell>

                    {/* Created At (formatted) */}
                    <TableCell>
                      <span className="text-gray-900 dark:text-white">
                        {dayjs(ship.createdAt).format("MMM DD, YYYY")}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
}

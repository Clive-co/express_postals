// src/components/Tables/top-shipments.tsx
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

/**
 * Fetch the five most‐recent shipments (by createdAt) and render them.
 * • If the call fails → show a friendly error card.
 * • If there are zero shipments → show an empty-state card.
 * • Otherwise, render a 5-row table.
 */
export async function TopShipments({ className }: { className?: string }) {
  // 1) build a full base URL depending on environment
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? "https://www.express-postals.com"
      : "http://localhost:3000";

  // 2) fetch the shipments endpoint
  const res = await fetch(`${baseUrl}/api/shipments`, { cache: "no-store" });
 console.log("Fetching shipments from:", res.json());
  // ── Error state ─────────────────────────────────────────────────────────────
  if (!res.ok) {
    return (
      <div
        className={cn(
          "grid rounded-[10px] bg-white px-7.5 pb-4 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card",
          className
        )}
      >
        <h2 className="mb-4 text-body-2xlg font-bold text-dark dark:text-white">
          Recent Shipments
        </h2>
        <div className="flex flex-col items-center justify-center space-y-3 py-8">
          {/* “Exclamation” icon */}
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
            Something went wrong while fetching your shipments. Please try again later
            or contact support if the problem persists.
          </p>
        </div>
      </div>
    );
  }

  // ── Parse JSON / normalize to Shipment[] ────────────────────────────────────
  const json = await res.json();
  const shipments: Shipment[] = Array.isArray(json)
    ? json
    : Array.isArray(json.shipments)
    ? json.shipments
    : [];

  // ── Sort descending by createdAt, then take top 5 ──────────────────────────
  const latestFive = shipments
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 5);

  // ── Empty state: no shipments found ────────────────────────────────────────
  if (latestFive.length === 0) {
    return (
      <div
        className={cn(
          "grid rounded-[10px] bg-white px-7.5 pb-4 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card",
          className
        )}
      >
        <h2 className="mb-4 text-body-2xlg font-bold text-dark dark:text-white">
          Recent Shipments
        </h2>
        <div className="flex flex-col items-center justify-center space-y-3 py-8">
          {/* “Box/Truck” icon */}
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
          <h3 className="text-lg font-semibold text-dark dark:text-white">
            No Shipments Found
          </h3>
          <p className="max-w-xs text-center text-gray-500 dark:text-gray-300">
            You haven’t created any shipments yet. Once you add shipments, they’ll
            show up here.
          </p>
        </div>
      </div>
    );
  }

  // ── Normal table rendering (when we do have ≥1 shipment) ────────────────────
  return (
    <div
      className={cn(
        "grid rounded-[10px] bg-white px-7.5 pb-4 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card",
        className
      )}
    >
      <h2 className="mb-4 text-body-2xlg font-bold text-dark dark:text-white">
        Recent Shipments
      </h2>

      <Table>
        <TableHeader>
          <TableRow className="border-none bg-[#F7F9FC] dark:bg-dark-2 [&>th]:py-4 [&>th]:text-base [&>th]:text-dark dark:[&>th]:text-white">
            <TableHead className="min-w-[120px] !text-left">
              Tracking ID
            </TableHead>
            <TableHead>Sender Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Recipient Address</TableHead>
            <TableHead>Created At</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {latestFive.map((ship) => (
            <TableRow
              key={ship._id}
              className="border-[#eee] dark:border-dark-3 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              {/* Tracking ID */}
              <TableCell className="min-w-[120px] !text-left">
                <span className="text-dark dark:text-white">
                  {ship.trackingId}
                </span>
              </TableCell>

              {/* Sender Name */}
              <TableCell>
                <span className="text-dark dark:text-white">
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
                <span className="text-dark dark:text-white">
                  {ship.recipient.address}
                </span>
              </TableCell>

              {/* Created At (formatted) */}
              <TableCell>
                <span className="text-dark dark:text-white">
                  {dayjs(ship.createdAt).format("MMM DD, YYYY")}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

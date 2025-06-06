"use client";

import { useState, useEffect } from "react";
import ShipmentFilter from "./components/ShipmentFilter";
import ShipmentTable from "./components/ShipmentTable";
import Pagination from "./components/Pagination";
import AddShipmentModal from "./components/AddShipmentModal";
import { Shipment } from "./types";

export default function ShipmentsPage() {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [statusFilter, setStatusFilter] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);

  async function fetchPage() {
    setLoading(true);
    setError(null);
    try {
      const qs = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(statusFilter ? { status: statusFilter } : {}),
      });
      const res = await fetch(`/api/shipments?${qs}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch");
      setShipments(data.shipments);
      setTotal(data.total);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPage();
  }, [page, statusFilter]);

  return (
    <div className="min-h-[100vh] bg-gray-50 dark:bg-gray-900 px-4 py-6 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 space-y-3 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Shipments
          </h1>
          <nav className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            <a href="/dashboard" className="hover:underline">
              Dashboard
            </a>{" "}
            / Shipments
          </nav>
        </div>

        <button
          onClick={() => setShowAdd(true)}
          className="inline-flex items-center px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add New Shipment
        </button>
      </div>

      {/* Filter */}
      <ShipmentFilter
        value={statusFilter}
        onChange={(s) => {
          setPage(1);
          setStatusFilter(s);
        }}
      />

      {/* Error */}
      {error && <div className="text-red-600 my-2">{error}</div>}

      {/* Table */}
      <ShipmentTable
        shipments={shipments}
        loading={loading}
        onDeletedOrUpdated={fetchPage}
      />

      {/* Pagination */}
      <Pagination
        totalCount={total}
        pageSize={limit}
        currentPage={page}
        onPageChange={(p) => setPage(p)}
      />

      {/* Modal */}
      {showAdd && (
        <AddShipmentModal
          onClose={() => {
            setShowAdd(false);
            fetchPage();
          }}
        />
      )}
    </div>
  );
}

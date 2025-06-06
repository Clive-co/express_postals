// src/app/dashboard/shipments/components/Pagination.tsx
"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { ArrowLeftIcon, ArrowRightIcon } from "@/assets/icons";

interface PaginationProps {
  totalCount: number;          // total number of items
  pageSize: number;            // items per page
  currentPage: number;         // 1-based current page
  onPageChange: (page: number) => void;
}

export default function Pagination({
  totalCount,
  pageSize,
  currentPage,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.max(0, Math.ceil(totalCount / pageSize));

  // If there’s only one (or zero) page, render nothing.
  if (totalPages <= 1) return null;

  // Build array [1, 2, 3, …, totalPages]
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div
      className="
        flex flex-col sm:flex-row
        items-center justify-between
        border-t border-gray-200 dark:border-gray-600
        bg-gray-50 dark:bg-gray-800
        px-4 py-3 sm:px-6
        space-y-3 sm:space-y-0
      "
    >
      {/* ─── Mobile: just “Previous” / “Next” ─────────────────────────────────── */}
      <div className="flex w-full justify-between sm:hidden">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className={cn(
            "relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md",
            currentPage === 1
              ? "bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400"
              : "bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          )}
        >
          Previous
        </button>
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className={cn(
            "relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md",
            currentPage === totalPages
              ? "bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400"
              : "bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          )}
        >
          Next
        </button>
      </div>

      {/* ─── Desktop: “Page X of Y” + page-number buttons with arrows ─────────────────── */}
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Page{" "}
          <span className="font-medium">{currentPage}</span> of{" "}
          <span className="font-medium">{totalPages}</span>
        </p>

        <nav
          className="isolate inline-flex -space-x-px rounded-md shadow-sm"
          aria-label="Pagination"
        >
          {/* ← Previous arrow */}
          <button
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className={cn(
              "relative inline-flex items-center px-2 py-2 text-sm font-medium focus:z-20",
              currentPage === 1
                ? "bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400"
                : "bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            )}
          >
            <span className="sr-only">Previous</span>
            <ArrowLeftIcon className="h-5 w-5" aria-hidden="true" />
          </button>

          {/* Page numbers */}
          {pageNumbers.map((num) => {
            const isCurrent = num === currentPage;
            return (
              <button
                key={num}
                onClick={() => onPageChange(num)}
                aria-current={isCurrent ? "page" : undefined}
                className={cn(
                  "relative inline-flex items-center px-4 py-2 text-sm font-medium focus:z-20",
                  isCurrent
                    ? "bg-purple-600 text-white focus:outline-none"
                    : "bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                )}
              >
                {num}
              </button>
            );
          })}

          {/* → Next arrow */}
          <button
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className={cn(
              "relative inline-flex items-center px-2 py-2 text-sm font-medium focus:z-20",
              currentPage === totalPages
                ? "bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400"
                : "bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            )}
          >
            <span className="sr-only">Next</span>
            <ArrowRightIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </nav>
      </div>
    </div>
  );
}

"use client";

import { IPagination } from "@/types";
import { Button } from "./ui/button";

interface PaginationProps {
  pagination: IPagination;
  onPageChange: (page: number) => void;
}

export const Pagination = ({ pagination, onPageChange }: PaginationProps) => {
  const { page, totalPages, total, limit } = pagination;

  const startItem = (page - 1) * limit + 1;
  const endItem = Math.min(page * limit, total);

  const generatePageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total pages is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show first page
      if (page > 3) {
        pages.push(1);
        if (page > 4) {
          pages.push("...");
        }
      }

      // Show pages around current page
      const start = Math.max(1, page - 1);
      const end = Math.min(totalPages, page + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      // Show last page
      if (page < totalPages - 2) {
        if (page < totalPages - 3) {
          pages.push("...");
        }
        pages.push(totalPages);
      }
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-12">
      {/* Results info */}
      <div className="text-sm text-gray-400">
        Showing {startItem}-{endItem} of {total} results
      </div>

      {/* Pagination buttons */}
      <div className="flex items-center gap-1">
        {/* Previous button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="border-gray-600 text-gray-300 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </Button>

        {/* Page numbers */}
        {generatePageNumbers().map((pageNum, index) => (
          <Button
            key={index}
            variant={pageNum === page ? "default" : "outline"}
            size="sm"
            onClick={() => typeof pageNum === "number" && onPageChange(pageNum)}
            disabled={pageNum === "..."}
            className={
              pageNum === page
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : pageNum === "..."
                ? "border-none text-gray-400 cursor-default hover:bg-transparent"
                : "border-gray-600 text-gray-300 hover:bg-gray-800"
            }
          >
            {pageNum}
          </Button>
        ))}

        {/* Next button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          className="border-gray-600 text-gray-300 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

"use client";

export default function Pagination({ totalPages, currentPage, onPageChange }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center mt-8 gap-2 flex-wrap justify-end mb-6">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded-md border transition ${
            page === currentPage
              ? "bg-blue-500 text-white border-blue-500"
              : "bg-white text-blue-500 border-blue-300 hover:bg-blue-100"
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
}

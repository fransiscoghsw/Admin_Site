import React from "react";

const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
    showPrevNext = true,
    className = "",
}) => {
    // Generate page numbers with ellipsis
    const generatePageNumbers = () => {
        const delta = 2; // Number of pages to show around current page
        const pages = [];

        if (totalPages <= 7) {
            // Show all pages if total is 7 or less
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Always show first page
            pages.push(1);

            if (currentPage > delta + 3) {
                pages.push("...");
            }

            // Show pages around current page
            const start = Math.max(2, currentPage - delta);
            const end = Math.min(totalPages - 1, currentPage + delta);

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            if (currentPage < totalPages - delta - 2) {
                pages.push("...");
            }

            // Always show last page
            if (totalPages > 1) {
                pages.push(totalPages);
            }
        }

        return pages;
    };

    if (totalPages <= 1) {
        return null;
    }

    return (
        <div
            className={`flex justify-center mt-10 space-x-2 flex-wrap gap-2 ${className}`}
        >
            {showPrevNext && (
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-md ${
                        currentPage === 1
                            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                            : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                    }`}
                >
                    &laquo; Previous
                </button>
            )}

            {generatePageNumbers().map((page, index) => (
                <React.Fragment key={index}>
                    {page === "..." ? (
                        <span className="px-4 py-2 text-gray-500">...</span>
                    ) : (
                        <button
                            onClick={() => onPageChange(page)}
                            className={`px-4 py-2 rounded-md ${
                                currentPage === page
                                    ? "bg-[#000080] text-white"
                                    : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                            }`}
                        >
                            {page}
                        </button>
                    )}
                </React.Fragment>
            ))}

            {showPrevNext && (
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-md ${
                        currentPage === totalPages
                            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                            : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                    }`}
                >
                    Next &raquo;
                </button>
            )}
        </div>
    );
};

export default Pagination;

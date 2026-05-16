import React from "react";
import Button from "../common/Button.jsx";
import { PiPlus } from "react-icons/pi";

const ArticleSearchBar = ({ searchQuery, onSearchChange, onAddClick }) => {
  return (
    <div className="flex mb-6 justify-between">
      <div className="max-w-md grow">
        <div className="flex rounded-2xl shadow">
          <div className="relative w-full">
            <div className="absolute inset-y-0 start-1 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              className="block p-2.5 w-full z-20 ps-11 text-gray-900 bg-gray-50 rounded-2xl border border-gray-300 focus:ring-[#B87817] focus:border-[#B87817] focus:outline-none"
              placeholder="Masukkan judul artikel ..."
              value={searchQuery}
              onChange={onSearchChange}
            />
          </div>
        </div>
      </div>

      <Button variant="create" size="md" onClick={onAddClick}>
        <PiPlus className="w-5 h-5" />
        Tambah
      </Button>
    </div>
  );
};

export default ArticleSearchBar;

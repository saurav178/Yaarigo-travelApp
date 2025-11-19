import React from "react";

export default function Loader() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#1D4350] border-opacity-70"></div>
    </div>
  );
}

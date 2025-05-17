import React from "react";

const Loader = () => (
  <div className="flex flex-col items-center justify-center py-20">
    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-opacity-50"></div>
    <div className="mt-4 text-blue-700 font-semibold">Loading...</div>
  </div>
);

export default Loader;
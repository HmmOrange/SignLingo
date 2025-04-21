// input.jsx
import React from "react";

export function Input({ className = "", ...props }) {
  return (
    <input
      className={`border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-cyan-400 ${className}`}
      {...props}
    />
  );
}

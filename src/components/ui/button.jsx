// button.jsx
import React from "react";

export function Button({ children, className = "", ...props }) {
  return (
    <button
      className={`px-4 py-2 rounded font-medium focus:outline-none ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

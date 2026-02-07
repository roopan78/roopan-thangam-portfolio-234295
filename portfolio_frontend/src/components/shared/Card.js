import React from "react";

/**
 * PUBLIC_INTERFACE
 * Card surface with optional hover style.
 */
export function Card({ children, hover = false, className = "", ...rest }) {
  return (
    <div className={`card ${hover ? "cardHover" : ""} ${className}`} {...rest}>
      {children}
    </div>
  );
}

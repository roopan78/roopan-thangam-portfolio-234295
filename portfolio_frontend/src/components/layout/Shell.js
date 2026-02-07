import React from "react";

/**
 * PUBLIC_INTERFACE
 * Shell layout for the SPA. Accepts `left` (sticky navigation) and `children` (main content).
 */
export function Shell({ left, children }) {
  return (
    <div className="appShell">
      <div className="shellGrid">
        <aside aria-label="Primary navigation">{left}</aside>
        <div>{children}</div>
      </div>
    </div>
  );
}

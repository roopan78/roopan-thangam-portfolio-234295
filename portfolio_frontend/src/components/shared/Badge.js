import React from "react";

/**
 * PUBLIC_INTERFACE
 * Small badge for metadata.
 */
export function Badge({ children, variant = "primary" }) {
  const cls = variant === "secondary" ? "badge badgeSecondary" : "badge";
  return <span className={cls}>{children}</span>;
}

import React from "react";

/**
 * PUBLIC_INTERFACE
 * Button component with variants. Supports rendering as <button> or <a>.
 */
export function Button({
  as = "button",
  variant = "primary",
  className = "",
  children,
  ...rest
}) {
  const Comp = as;
  const variantClass = variant === "ghost" ? "buttonGhost" : "buttonPrimary";
  return (
    <Comp className={`button ${variantClass} ${className}`} {...rest}>
      {children}
    </Comp>
  );
}

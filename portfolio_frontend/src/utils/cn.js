/**
 * PUBLIC_INTERFACE
 * cn
 *
 * Small className join helper (no external dependencies).
 * Filters falsy values and joins the rest.
 *
 * @param  {...any} parts
 * @returns {string}
 */
export function cn(...parts) {
  return parts.filter(Boolean).join(" ");
}

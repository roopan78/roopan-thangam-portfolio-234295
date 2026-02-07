import { useEffect } from "react";

/**
 * PUBLIC_INTERFACE
 * Adds `is-visible` class to elements matching `selector` when they enter the viewport.
 * Motion remains CSS-only; observer merely toggles a class.
 */
export function useRevealOnScroll({ selector = "[data-reveal]" } = {}) {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll(selector));
    if (nodes.length === 0) return;

    // No IO support: show everything
    if (!("IntersectionObserver" in window)) {
      nodes.forEach((n) => n.classList.add("is-visible"));
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );

    nodes.forEach((n) => obs.observe(n));
    return () => obs.disconnect();
  }, [selector]);
}

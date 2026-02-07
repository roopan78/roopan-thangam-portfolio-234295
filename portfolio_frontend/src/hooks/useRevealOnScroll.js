import { useEffect, useMemo, useRef, useState } from "react";

/**
 * Check for reduced motion preference.
 * @returns {boolean}
 */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(!!media.matches);
    onChange();

    // Safari compatibility
    if (media.addEventListener) media.addEventListener("change", onChange);
    else media.addListener(onChange);

    return () => {
      if (media.removeEventListener) media.removeEventListener("change", onChange);
      else media.removeListener(onChange);
    };
  }, []);

  return reduced;
}

/**
 * PUBLIC_INTERFACE
 * useRevealOnScroll
 *
 * A small IntersectionObserver-based hook for reveal-on-scroll animations.
 * Returns a ref callback and state you can use to set data attributes or classes.
 *
 * Typical usage:
 *  const { ref, isRevealed } = useRevealOnScroll();
 *  <section ref={ref} data-revealed={isRevealed ? "true" : "false"} />
 *
 * Supports:
 * - once: reveal only once (default true)
 * - rootMargin: pre-reveal (default "0px 0px -10% 0px")
 * - threshold: visibility threshold (default 0.2)
 *
 * If prefers-reduced-motion is enabled, it reveals immediately.
 *
 * @param {{ once?: boolean, rootMargin?: string, threshold?: number }} [options]
 * @returns {{ ref: (node: HTMLElement | null) => void, isRevealed: boolean, reducedMotion: boolean }}
 */
export function useRevealOnScroll(options = {}) {
  const { once = true, rootMargin = "0px 0px -10% 0px", threshold = 0.2 } = options;

  const reducedMotion = usePrefersReducedMotion();
  const observerRef = useRef(null);
  const nodeRef = useRef(null);

  const [isRevealed, setIsRevealed] = useState(false);

  const config = useMemo(() => ({ once, rootMargin, threshold }), [once, rootMargin, threshold]);

  useEffect(() => {
    if (reducedMotion) {
      setIsRevealed(true);
      return;
    }

    const node = nodeRef.current;
    if (!node) return;

    // Disconnect any previous observer (e.g., when options change)
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;

        if (entry.isIntersecting) {
          setIsRevealed(true);
          if (config.once && observerRef.current) observerRef.current.disconnect();
        } else if (!config.once) {
          setIsRevealed(false);
        }
      },
      {
        root: null,
        rootMargin: config.rootMargin,
        threshold: config.threshold,
      }
    );

    observerRef.current.observe(node);

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [config.once, config.rootMargin, config.threshold, reducedMotion]);

  const ref = (node) => {
    nodeRef.current = node;
  };

  return { ref, isRevealed, reducedMotion };
}

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

/**
 * Clamp a number between min and max.
 * @param {number} v
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
function clamp(v, min, max) {
  return Math.min(max, Math.max(min, v));
}

/**
 * Simple prefers-reduced-motion hook.
 * @returns {boolean}
 */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(!!media.matches);
    onChange();

    // Safari compatibility: addListener/removeListener
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
 * useCursorParallax
 *
 * Tracks cursor position and produces GPU-friendly translate3d transforms
 * for multiple depth layers (background/mid/foreground).
 *
 * Returns:
 * - cursor: normalized cursor position in range [-1, 1] for x/y
 * - getLayerTransform(depth): { transform } style object (translate3d)
 * - getMagneticTransform(depth): helper for "magnetic" hover (translate3d)
 *
 * The hook automatically disables heavy motion when prefers-reduced-motion is enabled.
 *
 * @param {object} [options]
 * @param {number} [options.max=1] clamp for normalized values
 * @param {number} [options.smoothing=0.12] lerp factor (0..1) for animation smoothing
 * @param {Record<string, number>} [options.strengths] pixel strengths per layer key
 * @returns {{
 *   cursor: { x: number, y: number },
 *   reducedMotion: boolean,
 *   getLayerTransform: (strength: number) => { transform: string },
 *   getMagneticTransform: (strength: number) => { transform: string },
 * }}
 */
export function useCursorParallax(options = {}) {
  const {
    max = 1,
    smoothing = 0.12,
    strengths = { background: 10, mid: 20, foreground: 35 },
  } = options;

  const reducedMotion = usePrefersReducedMotion();

  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);

  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  const animate = useCallback(() => {
    const t = targetRef.current;
    const c = currentRef.current;

    c.x += (t.x - c.x) * smoothing;
    c.y += (t.y - c.y) * smoothing;

    // Avoid excessive rerenders by only updating when values meaningfully change
    setCursor((prev) => {
      const nx = clamp(c.x, -max, max);
      const ny = clamp(c.y, -max, max);
      if (Math.abs(prev.x - nx) < 0.001 && Math.abs(prev.y - ny) < 0.001) return prev;
      return { x: nx, y: ny };
    });

    rafRef.current = window.requestAnimationFrame(animate);
  }, [max, smoothing]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (reducedMotion) {
      setCursor({ x: 0, y: 0 });
      return;
    }

    rafRef.current = window.requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    };
  }, [animate, reducedMotion]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (reducedMotion) return;

    const onMove = (e) => {
      const { innerWidth: w, innerHeight: h } = window;

      // normalize to [-1, 1] with (0,0) at center
      const x = ((e.clientX / w) - 0.5) * 2;
      const y = ((e.clientY / h) - 0.5) * 2;

      targetRef.current = {
        x: clamp(x, -max, max),
        y: clamp(y, -max, max),
      };
    };

    const onLeave = () => {
      targetRef.current = { x: 0, y: 0 };
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, [max, reducedMotion]);

  const getLayerTransform = useCallback(
    (strength) => {
      if (reducedMotion) return { transform: "translate3d(0px, 0px, 0px)" };
      const x = clamp(cursor.x, -max, max) * strength;
      const y = clamp(cursor.y, -max, max) * strength;
      return { transform: `translate3d(${x}px, ${y}px, 0px)` };
    },
    [cursor.x, cursor.y, max, reducedMotion]
  );

  // For magnetic hover we usually want slightly stronger pull but still clamped
  const getMagneticTransform = useCallback(
    (strength) => {
      if (reducedMotion) return { transform: "translate3d(0px, 0px, 0px)" };
      const x = clamp(cursor.x, -max, max) * strength;
      const y = clamp(cursor.y, -max, max) * strength;
      return { transform: `translate3d(${x}px, ${y}px, 0px)` };
    },
    [cursor.x, cursor.y, max, reducedMotion]
  );

  const resolvedStrengths = useMemo(() => strengths, [strengths]);

  return {
    cursor,
    reducedMotion,
    strengths: resolvedStrengths,
    getLayerTransform,
    getMagneticTransform,
  };
}

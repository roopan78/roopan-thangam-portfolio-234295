import { useCallback, useEffect, useMemo, useRef, useState } from "react";

/**
 * PUBLIC_INTERFACE
 * Track the currently visible section for active navigation highlighting.
 * Uses IntersectionObserver for accuracy and performance.
 */
export function useActiveSection({ sectionIds, rootMargin = "-30% 0px -60% 0px" }) {
  const [activeId, setActiveId] = useState(sectionIds?.[0] ?? "summary");

  const refs = useRef(new Map());
  const sectionIdSet = useMemo(() => new Set(sectionIds), [sectionIds]);

  // PUBLIC_INTERFACE
  const registerSectionRef = useCallback(
    (id) => (node) => {
      if (!sectionIdSet.has(id)) return;
      if (node) refs.current.set(id, node);
      else refs.current.delete(id);
    },
    [sectionIdSet]
  );

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Choose the entry most visible in viewport
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];

        if (visible?.target?.id) setActiveId(visible.target.id);
      },
      { root: null, threshold: [0.15, 0.25, 0.33, 0.5, 0.66], rootMargin }
    );

    for (const node of refs.current.values()) observer.observe(node);

    return () => observer.disconnect();
  }, [rootMargin]);

  return { activeId, setActiveId, registerSectionRef };
}

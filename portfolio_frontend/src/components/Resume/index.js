import React, { useMemo } from "react";
import styles from "./Resume.module.css";
import { cn } from "../../utils/cn";
import { useRevealOnScroll } from "../../hooks/useRevealOnScroll";

/**
 * Resume asset path served from CRA public/ folder.
 * Keeping it centralized makes future updates trivial.
 */
const RESUME_URL = "/resume.pdf";

/**
 * PUBLIC_INTERFACE
 * Resume
 *
 * Ocean Professional themed Resume section:
 * - Section header
 * - Glassmorphism card container with embedded PDF preview
 * - Persistent prominent Download Resume button
 * - Reveal-on-scroll animations (respects prefers-reduced-motion)
 *
 * @returns {JSX.Element}
 */
export function Resume() {
  const { ref, isRevealed, reducedMotion } = useRevealOnScroll({
    once: true,
    rootMargin: "0px 0px -12% 0px",
    threshold: 0.15,
  });

  const revealedAttr = isRevealed ? "true" : "false";

  const staggerStyles = useMemo(() => {
    // Keep the stagger stable and purely presentational via CSS vars.
    // If reduced motion is on, CSS already removes transitions, but we also
    // avoid overly large delays so content isn't perceived as "missing".
    const base = reducedMotion ? 0 : 90;
    return {
      header: { "--reveal-delay": `${base * 0}ms` },
      card: { "--reveal-delay": `${base * 1}ms` },
      button: { "--reveal-delay": `${base * 2}ms` },
    };
  }, [reducedMotion]);

  return (
    <section id="resume" className={styles.section} aria-label="Resume" ref={ref}>
      {/* Ambient gradient background for the section */}
      <div className={styles.bg} aria-hidden="true">
        <div className={styles.bgGradient} />
        <div className={styles.bgNoise} />
      </div>

      <div className={styles.container}>
        <header
          className={cn(styles.header, styles.reveal)}
          data-revealed={revealedAttr}
          style={staggerStyles.header}
        >
          <div>
            <h2 className={styles.title}>Resume</h2>
            <p className={styles.subtitle}>
              Preview my latest resume below, or download the PDF.
            </p>
          </div>

          <a
            className={cn(styles.downloadBtn, styles.reveal)}
            data-revealed={revealedAttr}
            style={staggerStyles.button}
            href={RESUME_URL}
            download
            aria-label="Download resume PDF"
          >
            Download Resume
            <span className={styles.downloadArrow} aria-hidden="true">
              ↓
            </span>
          </a>
        </header>

        <div
          className={cn(styles.card, styles.reveal)}
          data-revealed={revealedAttr}
          style={staggerStyles.card}
          role="region"
          aria-label="Resume preview"
        >
          <div className={styles.cardTopGlow} aria-hidden="true" />
          <div className={styles.previewFrame}>
            {/* <object> provides a native PDF preview in most modern browsers. */}
            <object
              className={styles.previewObject}
              data={`${RESUME_URL}#view=FitH`}
              type="application/pdf"
              aria-label="Resume PDF preview"
            >
              <div className={styles.fallback}>
                <p className={styles.fallbackText}>
                  Your browser can’t display embedded PDFs.{" "}
                  <a className={styles.fallbackLink} href={RESUME_URL} target="_blank" rel="noreferrer">
                    Open the resume in a new tab
                  </a>{" "}
                  or{" "}
                  <a className={styles.fallbackLink} href={RESUME_URL} download>
                    download it here
                  </a>
                  .
                </p>
              </div>
            </object>
          </div>
        </div>
      </div>
    </section>
  );
}

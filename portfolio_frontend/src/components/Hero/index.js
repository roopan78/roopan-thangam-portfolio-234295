import React, { useMemo } from "react";
import styles from "./Hero.module.css";
import { useCursorParallax } from "../../hooks/useCursorParallax";
import { FloatingCard } from "./FloatingCard";

/**
 * PUBLIC_INTERFACE
 * Hero
 *
 * Landing-page hero section featuring Ocean Professional glassmorphism,
 * floating cards, and cursor-driven parallax ("anti-gravity" effect).
 *
 * This component is self-contained and uses CSS for idle float animations.
 *
 * @returns {JSX.Element}
 */
export function Hero() {
  const { strengths, getLayerTransform, getMagneticTransform, reducedMotion } =
    useCursorParallax({
      strengths: { background: 10, mid: 20, foreground: 35 },
      smoothing: 0.10,
    });

  const cards = useMemo(
    () => [
      {
        title: "Years of Experience",
        value: "6+",
        subtitle: "Salesforce development",
        floatVariant: "a",
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2a7 7 0 0 0-7 7v3a7 7 0 0 0 14 0V9a7 7 0 0 0-7-7Z"
              stroke="currentColor"
              strokeWidth="2"
              opacity="0.9"
            />
            <path
              d="M9 21h6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        ),
      },
      {
        title: "Salesforce Certs",
        value: "3",
        subtitle: "Admin • Platform Dev • App Builder",
        floatVariant: "b",
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M7 4h10v14H7z"
              stroke="currentColor"
              strokeWidth="2"
              opacity="0.9"
            />
            <path
              d="M9 8h6M9 12h6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M10 18l2 2 2-2"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ),
      },
      {
        title: "Key Skills",
        value: "Apex • LWC",
        subtitle: "Flows • Integrations • CI/CD",
        floatVariant: "c",
        icon: (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2l2.4 6.6L21 11l-6.6 2.4L12 20l-2.4-6.6L3 11l6.6-2.4L12 2Z"
              stroke="currentColor"
              strokeWidth="2"
              opacity="0.9"
            />
          </svg>
        ),
      },
    ],
    []
  );

  return (
    <section className={styles.hero} aria-label="Hero">
      {/* Background gradient + subtle noise overlay */}
      <div className={styles.heroBg} aria-hidden="true">
        <div className={styles.bgGradient} />
        <div className={styles.bgNoise} />
      </div>

      {/* Parallax blobs (background layer) */}
      <div
        className={styles.blobs}
        aria-hidden="true"
        style={getLayerTransform(strengths.background)}
      >
        <div className={styles.blobA} />
        <div className={styles.blobB} />
        <div className={styles.blobC} />
      </div>

      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.content}>
            <div className={styles.kicker}>
              <span className={styles.kickerDot} aria-hidden="true" />
              Ocean Professional Portfolio
            </div>

            <h1 className={styles.title}>
              Roopan <span className={styles.titleAccent}>Thangam</span>
            </h1>

            <div className={styles.role}>Salesforce Developer</div>

            <p className={styles.tagline}>
              I build clean, scalable Salesforce solutions—Apex, Lightning Web
              Components, Flows, and integrations—shipped with a product mindset.
            </p>

            <div className={styles.ctaRow}>
              <a
                className={styles.primaryCta}
                href="#projects"
                style={getMagneticTransform(reducedMotion ? 0 : 8)}
              >
                View Projects
                <span className={styles.ctaArrow} aria-hidden="true">
                  →
                </span>
              </a>

              <a
                className={styles.secondaryCta}
                href="/resume.pdf"
                style={getMagneticTransform(reducedMotion ? 0 : 6)}
              >
                Download Resume
              </a>
            </div>

            <div className={styles.trustRow} aria-label="Highlights">
              <div className={styles.trustItem}>
                <span className={styles.trustLabel}>Focus</span>
                <span className={styles.trustValue}>Automation & UX</span>
              </div>
              <div className={styles.trustItem}>
                <span className={styles.trustLabel}>Style</span>
                <span className={styles.trustValue}>Modern, reliable</span>
              </div>
              <div className={styles.trustItem}>
                <span className={styles.trustLabel}>Tooling</span>
                <span className={styles.trustValue}>Git, CI, best practices</span>
              </div>
            </div>
          </div>

          {/* Floating cards (mid/foreground layers) */}
          <div className={styles.visual} aria-hidden="false">
            <div
              className={styles.visualSurface}
              style={getLayerTransform(strengths.mid)}
            >
              <div className={styles.ring} aria-hidden="true" />
              <div className={styles.ring2} aria-hidden="true" />
            </div>

            <div className={styles.cardsLayer} aria-hidden="true">
              <FloatingCard
                title={cards[0].title}
                value={cards[0].value}
                subtitle={cards[0].subtitle}
                icon={cards[0].icon}
                floatVariant={cards[0].floatVariant}
                style={{
                  ...getLayerTransform(strengths.foreground),
                }}
                className={styles.cardPosA}
              />

              <FloatingCard
                title={cards[1].title}
                value={cards[1].value}
                subtitle={cards[1].subtitle}
                icon={cards[1].icon}
                floatVariant={cards[1].floatVariant}
                style={{
                  ...getLayerTransform(strengths.mid),
                }}
                className={styles.cardPosB}
              />

              <FloatingCard
                title={cards[2].title}
                value={cards[2].value}
                subtitle={cards[2].subtitle}
                icon={cards[2].icon}
                floatVariant={cards[2].floatVariant}
                style={{
                  ...getLayerTransform(strengths.foreground - 8),
                }}
                className={styles.cardPosC}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

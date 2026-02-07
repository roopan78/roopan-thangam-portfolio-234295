import React from "react";
import styles from "./Hero.module.css";
import { cn } from "../../utils/cn";

/**
 * PUBLIC_INTERFACE
 * FloatingCard
 *
 * A glassmorphism card used inside the Hero section.
 * Accepts style transforms for cursor parallax layers.
 *
 * @param {{
 *  title: string,
 *  value: string,
 *  subtitle?: string,
 *  icon?: React.ReactNode,
 *  className?: string,
 *  style?: React.CSSProperties,
 *  floatVariant?: "a" | "b" | "c"
 * }} props
 */
export function FloatingCard({
  title,
  value,
  subtitle,
  icon,
  className,
  style,
  floatVariant = "a",
}) {
  return (
    <div
      className={cn(styles.floatingCard, styles[`float${floatVariant.toUpperCase()}`], className)}
      style={style}
      role="group"
      aria-label={`${title}: ${value}`}
    >
      <div className={styles.cardHeader}>
        <div className={styles.cardIcon} aria-hidden="true">
          {icon}
        </div>
        <div className={styles.cardTitle}>{title}</div>
      </div>

      <div className={styles.cardValue}>{value}</div>
      {subtitle ? <div className={styles.cardSubtitle}>{subtitle}</div> : null}
    </div>
  );
}

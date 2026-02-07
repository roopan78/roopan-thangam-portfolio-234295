import React, { forwardRef } from "react";
import { Card } from "../shared/Card";

export const SummarySection = forwardRef(function SummarySection({ data }, ref) {
  return (
    <section
      id="summary"
      ref={ref}
      className="section"
      aria-label="Summary"
      data-reveal
    >
      <div className="sectionHeader">
        <div>
          <h2 className="sectionTitle">{data.heading}</h2>
          <p className="sectionSubtitle">
            A concise overview of strengths and areas of focus.
          </p>
        </div>
      </div>

      <div className="grid gridCols2">
        <Card hover>
          {data.body.map((p) => (
            <p key={p} style={{ margin: "0 0 10px 0", lineHeight: "var(--line-height)" }}>
              {p}
            </p>
          ))}
          <p style={{ margin: 0, color: "var(--color-text-muted)", fontSize: "var(--text-sm)" }}>
            Tip: edit content in <code>src/data/profile.js</code>.
          </p>
        </Card>

        <Card hover aria-label="Focus areas">
          <div className="grid" style={{ gap: 12 }}>
            {data.focusAreas.map((a) => (
              <div key={a.label}>
                <p style={{ margin: 0, fontWeight: 800 }}>{a.label}</p>
                <p
                  style={{
                    margin: "4px 0 0 0",
                    color: "var(--color-text-muted)",
                    lineHeight: "var(--line-height)",
                  }}
                >
                  {a.value}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
});

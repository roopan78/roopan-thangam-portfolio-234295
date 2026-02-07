import React, { forwardRef } from "react";
import { Card } from "../shared/Card";
import { Badge } from "../shared/Badge";

export const EducationSection = forwardRef(function EducationSection({ data }, ref) {
  return (
    <section
      id="education"
      ref={ref}
      className="section"
      aria-label="Education"
      data-reveal
    >
      <div className="sectionHeader">
        <div>
          <h2 className="sectionTitle">{data.heading}</h2>
          <p className="sectionSubtitle">Academic background and relevant notes.</p>
        </div>
      </div>

      <div className="grid gridCols2" aria-label="Education list">
        {data.items.map((e, idx) => (
          <Card key={`${e.school}-${e.period}`} hover>
            <p style={{ margin: 0, fontWeight: 900 }}>{e.school}</p>
            <p style={{ margin: "8px 0 0 0", color: "var(--color-text-muted)" }}>
              {e.program}
            </p>

            <div className="badgeRow" style={{ marginTop: 10 }}>
              <Badge variant={idx % 2 ? "secondary" : "primary"}>{e.period}</Badge>
            </div>

            <ul className="timelineBullets" aria-label="Education notes">
              {e.notes.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </section>
  );
});

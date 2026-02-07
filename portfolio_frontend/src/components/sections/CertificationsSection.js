import React, { forwardRef } from "react";
import { Card } from "../shared/Card";
import { Badge } from "../shared/Badge";

export const CertificationsSection = forwardRef(function CertificationsSection(
  { data },
  ref
) {
  return (
    <section
      id="certifications"
      ref={ref}
      className="section"
      aria-label="Certifications"
      data-reveal
    >
      <div className="sectionHeader">
        <div>
          <h2 className="sectionTitle">{data.heading}</h2>
          <p className="sectionSubtitle">{data.subtitle}</p>
        </div>
      </div>

      <div className="grid gridCols2" aria-label="Certifications list">
        {data.items.map((c, idx) => (
          <Card key={`${c.name}-${c.date}`} hover>
            <p style={{ margin: 0, fontWeight: 900 }}>{c.name}</p>
            <p style={{ margin: "8px 0 0 0", color: "var(--color-text-muted)" }}>
              {c.issuer}
            </p>
            <div className="badgeRow" style={{ marginTop: 10 }}>
              <Badge variant={idx % 2 ? "secondary" : "primary"}>{c.date}</Badge>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
});

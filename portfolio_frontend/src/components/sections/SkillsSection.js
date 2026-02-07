import React, { forwardRef } from "react";
import { Card } from "../shared/Card";
import { Chip } from "../shared/Chip";

export const SkillsSection = forwardRef(function SkillsSection({ data }, ref) {
  return (
    <section
      id="skills"
      ref={ref}
      className="section"
      aria-label="Skills"
      data-reveal
    >
      <div className="sectionHeader">
        <div>
          <h2 className="sectionTitle">{data.heading}</h2>
          <p className="sectionSubtitle">{data.subtitle}</p>
        </div>
      </div>

      <div className="grid gridCols3">
        {data.categories.map((cat) => (
          <Card key={cat.name} hover aria-label={`Skills category: ${cat.name}`}>
            <p style={{ margin: 0, fontWeight: 900, letterSpacing: "-0.01em" }}>
              {cat.name}
            </p>
            <div className="badgeRow" style={{ marginTop: 12 }}>
              {cat.items.map((s) => (
                <Chip key={s} label={s} />
              ))}
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
});

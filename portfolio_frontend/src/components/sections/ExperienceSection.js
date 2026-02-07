import React, { forwardRef } from "react";
import { Card } from "../shared/Card";
import { Badge } from "../shared/Badge";

export const ExperienceSection = forwardRef(function ExperienceSection({ data }, ref) {
  return (
    <section
      id="experience"
      ref={ref}
      className="section"
      aria-label="Experience"
      data-reveal
    >
      <div className="sectionHeader">
        <div>
          <h2 className="sectionTitle">{data.heading}</h2>
          <p className="sectionSubtitle">{data.subtitle}</p>
        </div>
      </div>

      <div className="timeline" aria-label="Experience timeline">
        {data.roles.map((r) => (
          <div key={`${r.company}-${r.period}`} className="timelineItem">
            <div className="timelineRail" aria-hidden="true">
              <div className="timelineDot" />
            </div>

            <Card hover>
              <div className="timelineHeader">
                <div>
                  <p className="timelineTitle">
                    {r.title} · {r.company}
                  </p>
                  <p className="timelineMeta">
                    {r.location} · {r.period}
                  </p>
                </div>

                <div className="badgeRow" aria-label="Role tags" style={{ marginTop: 0 }}>
                  {r.tags.map((t, idx) => (
                    <Badge key={t} variant={idx % 2 ? "secondary" : "primary"}>
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>

              <ul className="timelineBullets" aria-label="Role achievements">
                {r.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
});

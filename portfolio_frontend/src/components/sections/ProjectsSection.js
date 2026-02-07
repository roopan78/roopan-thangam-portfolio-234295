import React, { forwardRef } from "react";
import { Card } from "../shared/Card";
import { Badge } from "../shared/Badge";
import { Button } from "../shared/Button";

export const ProjectsSection = forwardRef(function ProjectsSection({ data }, ref) {
  return (
    <section
      id="projects"
      ref={ref}
      className="section"
      aria-label="Projects"
      data-reveal
    >
      <div className="sectionHeader">
        <div>
          <h2 className="sectionTitle">{data.heading}</h2>
          <p className="sectionSubtitle">{data.subtitle}</p>
        </div>
      </div>

      <div className="grid gridCols3" aria-label="Projects grid">
        {data.items.map((p) => (
          <Card key={p.name} hover aria-label={`Project: ${p.name}`}>
            <p style={{ margin: 0, fontWeight: 900, letterSpacing: "-0.01em" }}>
              {p.name}
            </p>
            <p
              style={{
                margin: "10px 0 0 0",
                color: "var(--color-text-muted)",
                lineHeight: "var(--line-height)",
              }}
            >
              {p.description}
            </p>

            <div className="badgeRow" aria-label="Project badges">
              {p.badges.map((b, idx) => (
                <Badge key={b} variant={idx % 2 ? "secondary" : "primary"}>
                  {b}
                </Badge>
              ))}
            </div>

            <div className="heroActions" style={{ marginTop: 14 }} aria-label="Project links">
              {p.links.map((l) => (
                <Button
                  key={l.label}
                  variant="ghost"
                  as="a"
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${p.name}: ${l.label} (opens in new tab)`}
                  title={l.label}
                >
                  {l.label}
                </Button>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
});

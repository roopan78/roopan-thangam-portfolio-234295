import React from "react";
import { Button } from "../shared/Button";
import { Chip } from "../shared/Chip";

/**
 * PUBLIC_INTERFACE
 * Hero header showing name, title, avatar placeholder, location, quick links, and resume CTA.
 */
export function Header({ profile }) {
  const { name, title, location, hero } = profile;

  return (
    <header className="hero" aria-label="Profile header">
      <div className="heroInner">
        <div>
          <div className="heroKicker" aria-label="Theme label">
            <span aria-hidden="true">●</span> {hero.kicker}
          </div>

          <h1 className="heroTitle">{name}</h1>
          <p className="heroRole">
            <strong>{title}</strong> · {location}
          </p>

          <p className="heroRole" style={{ marginTop: 10 }}>
            {hero.intro}
          </p>

          <div className="heroMetaRow" aria-label="Highlights">
            {hero.highlights.map((h) => (
              <Chip key={h} label={h} />
            ))}
          </div>

          <div className="heroActions" aria-label="Quick links">
            <Button
              variant="primary"
              as="a"
              href={hero.resume.href}
              download
              aria-label={hero.resume.label}
              title={hero.resume.label}
            >
              {hero.resume.label}
            </Button>

            <Button
              variant="ghost"
              as="a"
              href={hero.links.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="Open LinkedIn in a new tab"
              title="LinkedIn"
            >
              LinkedIn
            </Button>

            <Button
              variant="ghost"
              as="a"
              href={hero.links.github}
              target="_blank"
              rel="noreferrer"
              aria-label="Open GitHub in a new tab"
              title="GitHub"
            >
              GitHub
            </Button>

            <Button
              variant="ghost"
              as="a"
              href={hero.links.email}
              aria-label="Send an email"
              title="Email"
            >
              Email
            </Button>
          </div>
        </div>

        <div className="avatarCard" aria-label="Avatar and note">
          <div className="avatar" aria-label="Avatar placeholder">
            RT
          </div>
          <p className="avatarCaption">
            Replace this placeholder with a headshot by adding an image in{" "}
            <code>public/</code> and updating the Header component.
          </p>
        </div>
      </div>
    </header>
  );
}

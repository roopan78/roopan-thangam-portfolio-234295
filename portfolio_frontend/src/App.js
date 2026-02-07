import React, { useEffect, useMemo, useState } from "react";
import "./styles/theme.css";
import "./styles/app.css";

import { profile } from "./data/profile";

import { Shell } from "./components/layout/Shell";
import { SideNav } from "./components/layout/SideNav";
import { Header } from "./components/layout/Header";

import { SummarySection } from "./components/sections/SummarySection";
import { SkillsSection } from "./components/sections/SkillsSection";
import { ExperienceSection } from "./components/sections/ExperienceSection";
import { ProjectsSection } from "./components/sections/ProjectsSection";
import { CertificationsSection } from "./components/sections/CertificationsSection";
import { EducationSection } from "./components/sections/EducationSection";
import { ContactSection } from "./components/sections/ContactSection";

import { useActiveSection } from "./hooks/useActiveSection";
import { useRevealOnScroll } from "./hooks/useRevealOnScroll";

/**
 * PUBLIC_INTERFACE
 * App entrypoint for the portfolio SPA.
 * Renders a responsive shell with sticky navigation, a hero header, and content sections.
 * Provides smooth anchor scrolling, active section highlighting, and reveal-on-scroll transitions (CSS-only).
 */
function App() {
  const navItems = useMemo(() => profile.navItems, []);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const { activeId, setActiveId, registerSectionRef } = useActiveSection({
    sectionIds: navItems.map((n) => n.id),
    rootMargin: "-25% 0px -65% 0px",
  });

  useRevealOnScroll({ selector: "[data-reveal]" });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setPrefersReducedMotion(!!mq.matches);
    apply();

    // Safari < 14 compatibility: addListener/removeListener fallback
    if (mq.addEventListener) {
      mq.addEventListener("change", apply);
      return () => mq.removeEventListener("change", apply);
    }
    mq.addListener(apply);
    return () => mq.removeListener(apply);
  }, []);

  // Ensure initial hash scroll works (e.g., /#projects)
  useEffect(() => {
    const hash = window.location.hash?.replace("#", "");
    if (!hash) return;
    const el = document.getElementById(hash);
    if (!el) return;

    const behavior = prefersReducedMotion ? "auto" : "smooth";
    // Let layout paint before scrolling
    window.requestAnimationFrame(() => {
      el.scrollIntoView({ behavior, block: "start" });
      setActiveId(hash);
    });
  }, [prefersReducedMotion, setActiveId]);

  const onNavigate = (id) => {
    const el = document.getElementById(id);
    if (!el) return;

    const behavior = prefersReducedMotion ? "auto" : "smooth";
    el.scrollIntoView({ behavior, block: "start" });

    // Keep URL in sync for shareable deep links
    if (window.history?.replaceState) {
      window.history.replaceState(null, "", `#${id}`);
    } else {
      window.location.hash = id;
    }

    setActiveId(id);
  };

  return (
    <Shell
      left={
        <SideNav
          brand={profile.brand}
          items={navItems}
          activeId={activeId}
          onNavigate={onNavigate}
        />
      }
    >
      <Header profile={profile} />

      <main className="appMain" aria-label="Portfolio content">
        <SummarySection ref={registerSectionRef("summary")} data={profile.summary} />
        <SkillsSection ref={registerSectionRef("skills")} data={profile.skills} />
        <ExperienceSection
          ref={registerSectionRef("experience")}
          data={profile.experience}
        />
        <ProjectsSection ref={registerSectionRef("projects")} data={profile.projects} />
        <CertificationsSection
          ref={registerSectionRef("certifications")}
          data={profile.certifications}
        />
        <EducationSection ref={registerSectionRef("education")} data={profile.education} />
        <ContactSection ref={registerSectionRef("contact")} data={profile.contact} />
      </main>

      <footer className="appFooter" aria-label="Site footer">
        <div className="footerInner">
          <p className="footerText">
            © {new Date().getFullYear()} {profile.name}. Built with React.
          </p>
          <a className="footerLink" href="#summary" onClick={(e) => { e.preventDefault(); onNavigate("summary"); }}>
            Back to top
          </a>
        </div>
      </footer>
    </Shell>
  );
}

export default App;

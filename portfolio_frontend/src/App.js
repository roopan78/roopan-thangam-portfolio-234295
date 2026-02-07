import React, { useEffect, useMemo, useState } from "react";
import "./App.css";
import { Hero } from "./components/Hero";

/**
 * Resume asset path served from CRA public/ folder.
 * Keeping it centralized makes future updates trivial.
 */
const RESUME_URL = "/resume.pdf";

// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState("light");

  const sectionContainerStyle = useMemo(
    () => ({
      width: "min(1120px, calc(100% - 40px))",
      margin: "0 auto",
    }),
    []
  );

  const sectionTitleStyle = useMemo(
    () => ({
      margin: 0,
      fontSize: 28,
      letterSpacing: "-0.02em",
    }),
    []
  );

  // Effect to apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div className="App">
      <button
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      >
        {theme === "light" ? "🌙 Dark" : "☀️ Light"}
      </button>

      <main>
        <Hero />

        <section id="resume" style={{ padding: "72px 0", background: "var(--bg-secondary)" }}>
          <div style={sectionContainerStyle}>
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
                gap: 16,
                flexWrap: "wrap",
                marginBottom: 14,
              }}
            >
              <div>
                <h2 style={sectionTitleStyle}>Resume</h2>
                <p style={{ margin: "10px 0 0", color: "rgba(17, 24, 39, 0.70)", lineHeight: 1.7 }}>
                  Preview my latest resume below, or download the PDF.
                </p>
              </div>

              <a
                href={RESUME_URL}
                download
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  padding: "12px 16px",
                  borderRadius: 14,
                  fontWeight: 700,
                  textDecoration: "none",
                  color: "#fff",
                  background: "linear-gradient(135deg, var(--color-primary), rgba(37, 99, 235, 0.75))",
                  boxShadow:
                    "0 14px 40px rgba(37, 99, 235, 0.22), 0 0 0 1px rgba(255, 255, 255, 0.35) inset",
                }}
                aria-label="Download resume PDF"
              >
                Download Resume
                <span aria-hidden="true" style={{ fontWeight: 900 }}>
                  ↓
                </span>
              </a>
            </div>

            <div
              style={{
                borderRadius: 18,
                overflow: "hidden",
                border: "1px solid rgba(37, 99, 235, 0.16)",
                boxShadow: "0 18px 45px rgba(17, 24, 39, 0.08)",
                background: "#fff",
              }}
            >
              {/* Using <object> provides a native PDF preview in most modern browsers.
                  We also include a fallback link for browsers that don't support embedding. */}
              <object
                data={`${RESUME_URL}#view=FitH`}
                type="application/pdf"
                width="100%"
                height="840"
                aria-label="Resume PDF preview"
              >
                <div style={{ padding: 18 }}>
                  <p style={{ margin: 0, lineHeight: 1.7, color: "rgba(17, 24, 39, 0.75)" }}>
                    Your browser can’t display embedded PDFs.
                    {" "}
                    <a href={RESUME_URL} target="_blank" rel="noreferrer">
                      Open the resume in a new tab
                    </a>
                    {" "}
                    or
                    {" "}
                    <a href={RESUME_URL} download>
                      download it here
                    </a>
                    .
                  </p>
                </div>
              </object>
            </div>
          </div>
        </section>

        {/* Keep space for the rest of the portfolio sections to be added below */}
        <section id="projects" style={{ padding: "72px 0" }}>
          <div style={sectionContainerStyle}>
            <h2 style={sectionTitleStyle}>Projects</h2>
            <p style={{ marginTop: 10, color: "rgba(17, 24, 39, 0.70)", lineHeight: 1.7 }}>
              Coming soon — this section is linked from the hero CTA.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;

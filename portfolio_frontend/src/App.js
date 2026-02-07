import React, { useState, useEffect } from "react";
import "./App.css";
import { Hero } from "./components/Hero";

// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState("light");

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
        {/* Keep space for the rest of the portfolio sections to be added below */}
        <section id="projects" style={{ padding: "72px 0" }}>
          <div style={{ width: "min(1120px, calc(100% - 40px))", margin: "0 auto" }}>
            <h2 style={{ margin: 0, fontSize: 28, letterSpacing: "-0.02em" }}>Projects</h2>
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

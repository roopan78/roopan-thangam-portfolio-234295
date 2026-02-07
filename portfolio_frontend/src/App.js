import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import portfolio from './data/portfolio.js';

// PUBLIC_INTERFACE
/**
 * Main portfolio application with side navigation, scrollspy, and responsive layout.
 * Sections: hero, summary, skills, experience, projects, certifications, education, contact.
 */
function App() {
  const [theme, setTheme] = useState('light');
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Section IDs derived from portfolio data
  const sections = [
    { id: 'hero', label: 'Home' },
    { id: 'summary', label: 'Summary' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' }
  ];

  // Theme toggle effect
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  // IntersectionObserver for scrollspy
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach(section => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      sections.forEach(section => {
        const element = document.getElementById(section.id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, []);

  // PUBLIC_INTERFACE
  /**
   * Smooth scroll to section and close mobile menu
   */
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="App">
      {/* Mobile Top Bar */}
      <header className="mobile-header">
        <div className="mobile-header-content">
          <h1 className="mobile-logo">{portfolio.profile.name}</h1>
          <div className="mobile-header-actions">
            <button 
              className="theme-toggle-mobile" 
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            <button 
              className="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
        {/* Mobile drawer menu */}
        <nav className={`mobile-nav ${mobileMenuOpen ? 'open' : ''}`}>
          <ul>
            {sections.map(section => (
              <li key={section.id}>
                <button
                  className={`nav-link ${activeSection === section.id ? 'active' : ''}`}
                  onClick={() => scrollToSection(section.id)}
                >
                  {section.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* Desktop Side Navigation */}
      <nav className="side-nav">
        <div className="side-nav-header">
          <h2 className="side-nav-title">{portfolio.profile.name}</h2>
          <p className="side-nav-subtitle">{portfolio.profile.role}</p>
          <button 
            className="theme-toggle-desktop" 
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>
        </div>
        <ul className="side-nav-list">
          {sections.map(section => (
            <li key={section.id}>
              <button
                className={`nav-link ${activeSection === section.id ? 'active' : ''}`}
                onClick={() => scrollToSection(section.id)}
              >
                {section.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        {/* Hero Section */}
        <section id="hero" className="section hero-section bg-hero-gradient">
          <div className="container">
            <h1 className="hero-title">{portfolio.profile.name}</h1>
            <p className="hero-role">{portfolio.profile.role}</p>
            <p className="hero-location">{portfolio.profile.location}</p>
            <div className="hero-links row">
              <a href={portfolio.profile.links.github} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                GitHub
              </a>
              <a href={portfolio.profile.links.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                LinkedIn
              </a>
              <a href={portfolio.profile.links.trailhead} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                Trailhead
              </a>
              <a href={portfolio.profile.links.resumeUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Download Resume
              </a>
            </div>
          </div>
        </section>

        {/* Summary Section */}
        <section id="summary" className="section bg-surface">
          <div className="container">
            <header className="section-header">
              <h2 className="section-title">Professional Summary</h2>
            </header>
            <p className="summary-text">{portfolio.summary}</p>
            <div className="highlights-grid">
              {portfolio.highlights.map((highlight, idx) => (
                <div key={idx} className="highlight-item">
                  <span className="highlight-icon">✓</span>
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section - Enhanced with category cards and skill chips */}
        <section id="skills" className="section">
          <div className="container">
            <header className="section-header">
              <h2 className="section-title">Technical Skills</h2>
              <p className="section-subtitle">A comprehensive overview of my technical expertise and proficiencies</p>
            </header>
            <div className="skills-grid">
              {portfolio.skills.map((skillGroup, idx) => (
                <div key={idx} className="skill-category-card">
                  <div className="skill-category-header">
                    <h3 className="skill-group-title">{skillGroup.name}</h3>
                    {skillGroup.proficiency && (
                      <span className="skill-proficiency-badge">{skillGroup.proficiency}</span>
                    )}
                  </div>
                  <div className="skill-chips-container">
                    {skillGroup.items.map((skill, skillIdx) => (
                      <span key={skillIdx} className="skill-chip">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience Section - Enhanced with timeline styling */}
        <section id="experience" className="section bg-surface">
          <div className="container">
            <header className="section-header">
              <h2 className="section-title">Professional Experience</h2>
              <p className="section-subtitle">My career journey and key achievements in Salesforce development</p>
            </header>
            <div className="experience-list">
              {portfolio.experience.map((job, idx) => (
                <article key={idx} className="experience-item">
                  <div className="experience-header">
                    <div>
                      <h3 className="experience-title">{job.title}</h3>
                      <p className="experience-company">{job.company}</p>
                    </div>
                    <div className="experience-meta">
                      <span className="experience-period">{job.period}</span>
                      <span className="experience-location muted">{job.location}</span>
                    </div>
                  </div>
                  <ul className="experience-bullets">
                    {job.bullets.map((bullet, bulletIdx) => (
                      <li key={bulletIdx}>{bullet}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="section">
          <div className="container">
            <header className="section-header">
              <h2 className="section-title">Featured Projects</h2>
            </header>
            <div className="projects-grid grid grid-2">
              {portfolio.projects.map((project, idx) => (
                <div key={idx} className="card card-hover">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-summary">{project.summary}</p>
                  <div className="project-tech row">
                    {project.tech.map((techItem, techIdx) => (
                      <span key={techIdx} className="chip">{techItem}</span>
                    ))}
                  </div>
                  <div className="project-tags row">
                    {project.tags.map((tag, tagIdx) => (
                      <span key={tagIdx} className="chip chip-primary">{tag}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications Section */}
        <section id="certifications" className="section bg-surface">
          <div className="container">
            <header className="section-header">
              <h2 className="section-title">Certifications</h2>
            </header>
            <div className="certifications-grid grid grid-2">
              {portfolio.certifications.map((cert, idx) => (
                <div key={idx} className="card">
                  <h3 className="cert-name">{cert.name}</h3>
                  <p className="cert-issuer muted">{cert.issuer}</p>
                  <p className="cert-year">Issued: {cert.year}</p>
                  {cert.verifyUrl && (
                    <a href={cert.verifyUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">
                      Verify
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="section">
          <div className="container">
            <header className="section-header">
              <h2 className="section-title">Education</h2>
            </header>
            <div className="education-list stack">
              {portfolio.education.map((edu, idx) => (
                <div key={idx} className="card">
                  <h3 className="edu-institution">{edu.institution}</h3>
                  <p className="edu-degree">{edu.degree}</p>
                  <p className="edu-period muted">{edu.period}</p>
                  <p className="edu-details">{edu.details}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="section bg-surface">
          <div className="container">
            <header className="section-header">
              <h2 className="section-title">Get In Touch</h2>
              <p className="section-subtitle">Feel free to reach out for opportunities or collaborations.</p>
            </header>
            <div className="contact-content">
              <div className="contact-info">
                <div className="contact-item">
                  <span className="contact-label">Email:</span>
                  <a href={`mailto:${portfolio.profile.email}`} className="App-link">
                    {portfolio.profile.email}
                  </a>
                </div>
                <div className="contact-item">
                  <span className="contact-label">Phone:</span>
                  <a href={`tel:${portfolio.profile.phone}`} className="App-link">
                    {portfolio.profile.phone}
                  </a>
                </div>
                <div className="contact-item">
                  <span className="contact-label">Location:</span>
                  <span>{portfolio.profile.location}</span>
                </div>
              </div>
              <div className="contact-links row">
                <a href={portfolio.profile.links.github} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                  GitHub
                </a>
                <a href={portfolio.profile.links.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  LinkedIn
                </a>
                <a href={portfolio.profile.links.trailhead} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                  Trailhead
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <div className="container">
            <p className="footer-text">
              © {new Date().getFullYear()} {portfolio.profile.name}. Built with React.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;

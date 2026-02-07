import React, { useState, useEffect } from 'react';
import './App.css';
import portfolio, { getAllProjectTags, getProjectsByTag } from './data/portfolio.js';

// Section IDs derived from portfolio data (static, defined outside component)
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

// PUBLIC_INTERFACE
/**
 * ContactForm component with accessible form validation and mailto fallback.
 * Supports future backend integration via REACT_APP_API_BASE.
 */
function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [statusMessage, setStatusMessage] = useState('');
  const [showCopyFallback, setShowCopyFallback] = useState(false);

  // PUBLIC_INTERFACE
  /**
   * Validates a single field and returns error message if invalid
   */
  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        if (!value.trim()) {
          return 'Name is required';
        }
        if (value.trim().length < 2) {
          return 'Name must be at least 2 characters';
        }
        return '';
      case 'email':
        if (!value.trim()) {
          return 'Email is required';
        }
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          return 'Please enter a valid email address';
        }
        return '';
      case 'message':
        if (!value.trim()) {
          return 'Message is required';
        }
        if (value.trim().length < 10) {
          return 'Message must be at least 10 characters';
        }
        return '';
      default:
        return '';
    }
  };

  // PUBLIC_INTERFACE
  /**
   * Handles input change and inline validation
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field if it was previously invalid
    if (errors[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  // PUBLIC_INTERFACE
  /**
   * Handles input blur for validation
   */
  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  // PUBLIC_INTERFACE
  /**
   * Validates entire form
   */
  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // PUBLIC_INTERFACE
  /**
   * Handles mailto fallback with copyable text if mailto fails
   */
  const handleMailtoFallback = () => {
    const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    const mailtoUrl = `mailto:${portfolio.profile.email}?subject=${subject}&body=${body}`;

    try {
      // Try to open mailto
      window.location.href = mailtoUrl;
      
      // Show success message
      setStatus('success');
      setStatusMessage('Opening your email client... If it doesn\'t open, you can copy the message below.');
      setShowCopyFallback(true);
      
      // Reset form after a delay
      setTimeout(() => {
        setFormData({ name: '', email: '', message: '' });
        setStatus('idle');
        setStatusMessage('');
        setShowCopyFallback(false);
      }, 10000);
    } catch (err) {
      // If mailto fails, show copyable fallback
      setStatus('error');
      setStatusMessage('Unable to open email client. Please copy the message below and email manually.');
      setShowCopyFallback(true);
    }
  };

  // PUBLIC_INTERFACE
  /**
   * Handles form submission with future backend hook
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      setStatus('error');
      setStatusMessage('Please fix the errors above before submitting.');
      return;
    }

    setStatus('submitting');
    setStatusMessage('');

    // Hook for future backend integration
    const apiBase = process.env.REACT_APP_API_BASE;
    
    if (apiBase) {
      // Future: POST to backend
      try {
        const response = await fetch(`${apiBase}/contact`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          setStatus('success');
          setStatusMessage('Thank you! Your message has been sent successfully.');
          setFormData({ name: '', email: '', message: '' });
          setErrors({});
          
          // Clear success message after 5 seconds
          setTimeout(() => {
            setStatus('idle');
            setStatusMessage('');
          }, 5000);
        } else {
          throw new Error('Failed to send message');
        }
      } catch (error) {
        setStatus('error');
        setStatusMessage('Failed to send message. Please try again or contact me directly via email.');
        console.error('Contact form error:', error);
      }
    } else {
      // Default: mailto fallback
      handleMailtoFallback();
    }
  };

  // PUBLIC_INTERFACE
  /**
   * Copies the message to clipboard
   */
  const handleCopyMessage = () => {
    const messageToCopy = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
    navigator.clipboard.writeText(messageToCopy).then(() => {
      alert('Message copied to clipboard!');
    }).catch(() => {
      alert('Failed to copy. Please manually copy the text.');
    });
  };

  return (
    <div className="contact-form-wrapper">
      {/* Status message with ARIA-live for screen readers */}
      {statusMessage && (
        <div 
          className={`contact-status contact-status-${status}`}
          role="alert"
          aria-live="polite"
        >
          {statusMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="contact-form" noValidate>
        {/* Name Field */}
        <div className="form-group">
          <label htmlFor="contact-name" className="form-label">
            Name <span className="required-indicator" aria-label="required">*</span>
          </label>
          <input
            type="text"
            id="contact-name"
            name="name"
            className={`form-input ${errors.name ? 'form-input-error' : ''}`}
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            aria-required="true"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
            disabled={status === 'submitting'}
          />
          {errors.name && (
            <span id="name-error" className="form-error" role="alert" aria-live="polite">
              {errors.name}
            </span>
          )}
        </div>

        {/* Email Field */}
        <div className="form-group">
          <label htmlFor="contact-email" className="form-label">
            Email <span className="required-indicator" aria-label="required">*</span>
          </label>
          <input
            type="email"
            id="contact-email"
            name="email"
            className={`form-input ${errors.email ? 'form-input-error' : ''}`}
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            disabled={status === 'submitting'}
          />
          {errors.email && (
            <span id="email-error" className="form-error" role="alert" aria-live="polite">
              {errors.email}
            </span>
          )}
        </div>

        {/* Message Field */}
        <div className="form-group">
          <label htmlFor="contact-message" className="form-label">
            Message <span className="required-indicator" aria-label="required">*</span>
          </label>
          <textarea
            id="contact-message"
            name="message"
            className={`form-input form-textarea ${errors.message ? 'form-input-error' : ''}`}
            value={formData.message}
            onChange={handleChange}
            onBlur={handleBlur}
            rows="6"
            required
            aria-required="true"
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? 'message-error' : undefined}
            disabled={status === 'submitting'}
          />
          {errors.message && (
            <span id="message-error" className="form-error" role="alert" aria-live="polite">
              {errors.message}
            </span>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-primary btn-submit"
          disabled={status === 'submitting'}
          aria-disabled={status === 'submitting'}
        >
          {status === 'submitting' ? 'Sending...' : 'Send Message'}
        </button>
      </form>

      {/* Copyable Fallback (shown if mailto fails) */}
      {showCopyFallback && (
        <div className="contact-fallback">
          <p className="contact-fallback-text">
            You can also email me directly at: <strong>{portfolio.profile.email}</strong>
          </p>
          <div className="contact-fallback-message">
            <pre>{`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`}</pre>
          </div>
          <button 
            type="button" 
            className="btn btn-outline btn-sm"
            onClick={handleCopyMessage}
          >
            Copy Message
          </button>
        </div>
      )}

      {/* Contact Info & Links */}
      <div className="contact-info-section">
        <h3 className="contact-info-title">Other Ways to Connect</h3>
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
  );
}

// PUBLIC_INTERFACE
/**
 * ProjectCard component with optional expandable details.
 * Displays project title, summary, tech stack, tags, and links.
 */
function ProjectCard({ project }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className="card card-hover project-card">
      <div className="project-card-header">
        <h3 className="project-title">{project.title}</h3>
      </div>
      
      <p className="project-summary">{project.summary}</p>

      {/* Tech Stack */}
      <div className="project-section">
        <h4 className="project-section-label">Technologies</h4>
        <div className="project-tech row">
          {project.tech.map((techItem, techIdx) => (
            <span key={techIdx} className="chip">{techItem}</span>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div className="project-section">
        <h4 className="project-section-label">Categories</h4>
        <div className="project-tags row">
          {project.tags.map((tag, tagIdx) => (
            <span key={tagIdx} className="chip chip-primary">{tag}</span>
          ))}
        </div>
      </div>

      {/* Links (if available) */}
      {(project.links?.demo || project.links?.repo) && (
        <div className="project-links">
          {project.links.demo && (
            <a 
              href={project.links.demo} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-outline btn-sm"
            >
              View Demo
            </a>
          )}
          {project.links.repo && (
            <a 
              href={project.links.repo} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-outline btn-sm"
            >
              View Code
            </a>
          )}
        </div>
      )}

      {/* Expandable Details Section (optional) */}
      {project.details && (
        <div className="project-details-toggle">
          <button 
            className="btn-expand"
            onClick={() => setExpanded(!expanded)}
            aria-expanded={expanded}
          >
            {expanded ? '▼ Less Details' : '▶ More Details'}
          </button>
          {expanded && (
            <div className="project-details-content">
              <p>{project.details}</p>
            </div>
          )}
        </div>
      )}
    </article>
  );
}

// PUBLIC_INTERFACE
/**
 * Main portfolio application with side navigation, scrollspy, and responsive layout.
 * Sections: hero, summary, skills, experience, projects, certifications, education, contact.
 */
function App() {
  const [theme, setTheme] = useState('light');
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProjectTag, setSelectedProjectTag] = useState('All');

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

  // PUBLIC_INTERFACE
  /**
   * Get filtered projects based on selected tag
   */
  const getFilteredProjects = () => {
    if (selectedProjectTag === 'All') {
      return portfolio.projects;
    }
    return getProjectsByTag(selectedProjectTag, portfolio.projects);
  };

  // Get all available project tags for filter buttons
  const allProjectTags = ['All', ...getAllProjectTags(portfolio.projects)];

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

        {/* Projects Section - Enhanced with filtering */}
        <section id="projects" className="section">
          <div className="container">
            <header className="section-header">
              <h2 className="section-title">Featured Projects</h2>
              <p className="section-subtitle">
                Explore my portfolio of Salesforce solutions and technical implementations
              </p>
            </header>

            {/* Tag Filter Bar */}
            <div className="project-filters">
              {allProjectTags.map((tag) => (
                <button
                  key={tag}
                  className={`filter-tag ${selectedProjectTag === tag ? 'active' : ''}`}
                  onClick={() => setSelectedProjectTag(tag)}
                  aria-pressed={selectedProjectTag === tag}
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Projects Grid */}
            <div className="projects-grid grid grid-2">
              {getFilteredProjects().map((project, idx) => (
                <ProjectCard key={idx} project={project} />
              ))}
            </div>

            {/* Empty state when no projects match filter */}
            {getFilteredProjects().length === 0 && (
              <div className="projects-empty-state">
                <p>No projects found for the selected filter.</p>
              </div>
            )}
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
            <ContactForm />
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

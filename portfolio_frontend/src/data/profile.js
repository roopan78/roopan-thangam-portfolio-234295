/**
 * Centralized portfolio data/config.
 * Keep UI components mostly presentational by editing this file.
 */

export const profile = {
  name: "Roopan Thangam",
  title: "Salesforce Developer",
  location: "Toronto, ON (Open to Remote)",
  brand: {
    title: "Roopan Thangam",
    subtitle: "Salesforce Developer Portfolio",
    markText: "RT",
  },
  navItems: [
    { id: "summary", label: "Summary" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "certifications", label: "Certifications" },
    { id: "education", label: "Education" },
    { id: "contact", label: "Contact" },
  ],
  hero: {
    kicker: "Ocean Professional · Modern UX",
    intro:
      "I build scalable Salesforce solutions with clean architecture, secure integrations, and user-first Lightning experiences.",
    highlights: [
      "Apex · LWC · Flows",
      "Integrations (REST/SOAP) · Platform Events",
      "CI/CD · Tests · Code Quality",
    ],
    links: {
      linkedin: "https://www.linkedin.com/",
      github: "https://github.com/",
      email: "mailto:roopan.thangam@example.com",
    },
    resume: {
      // Place your resume file in public/ as resume.pdf and update this if needed
      href: "/resume.pdf",
      label: "Download Resume",
    },
  },
  summary: {
    heading: "Professional Summary",
    body: [
      "Salesforce Developer specializing in Apex, Lightning Web Components (LWC), Flow automation, and secure system integrations.",
      "Comfortable across the full delivery lifecycle: discovery, solution design, development, testing, deployment, and production support.",
      "Focused on performance, maintainability, and clear communication with stakeholders.",
    ],
    focusAreas: [
      { label: "Architecture", value: "Apex patterns, trigger frameworks, domain design" },
      { label: "Automation", value: "Record-triggered flows, approvals, validation strategy" },
      { label: "Integration", value: "REST/SOAP, JWT/OAuth, middleware, error handling" },
      { label: "Quality", value: "Test strategy, CI pipelines, code review standards" },
    ],
  },
  skills: {
    heading: "Skills",
    subtitle: "Grouped by category for fast scanning.",
    categories: [
      {
        name: "Salesforce Development",
        items: ["Apex", "SOQL/SOSL", "Lightning Web Components (LWC)", "Aura", "Visualforce"],
      },
      {
        name: "Automation & Platform",
        items: ["Flows", "Process/Validation Strategy", "Platform Events", "Async Apex (Queueable/Batch/Sched.)"],
      },
      {
        name: "Integrations",
        items: ["REST/SOAP APIs", "OAuth/JWT", "Named Credentials", "External Services", "Error handling & retries"],
      },
      {
        name: "DevOps & Quality",
        items: ["SFDX", "Git/GitHub", "CI/CD", "Unit Testing", "PMD/Code scanning"],
      },
      {
        name: "Tools & Practices",
        items: ["Agile", "User stories", "Documentation", "Stakeholder communication"],
      },
    ],
  },
  experience: {
    heading: "Experience",
    subtitle: "Timeline of roles and impact.",
    roles: [
      {
        company: "Company Name",
        title: "Salesforce Developer",
        location: "Toronto, ON",
        period: "2023 — Present",
        tags: ["Apex", "LWC", "Integrations"],
        bullets: [
          "Built Lightning experiences with LWC and Apex controllers, improving usability and reducing case handling time.",
          "Designed robust integrations using Named Credentials and OAuth, with structured error handling and monitoring.",
          "Implemented test strategies and deployment automation to improve release reliability.",
        ],
      },
      {
        company: "Company Name",
        title: "Salesforce Administrator / Developer",
        location: "Remote",
        period: "2021 — 2023",
        tags: ["Flows", "Security", "Data"],
        bullets: [
          "Automated business processes with Flows and approval processes while maintaining governance and auditability.",
          "Improved data quality using validation rules, duplicate rules, and structured data migration practices.",
          "Partnered with stakeholders to translate requirements into clear user stories and deliverables.",
        ],
      },
    ],
  },
  projects: {
    heading: "Featured Projects",
    subtitle: "A selection of work with measurable outcomes.",
    items: [
      {
        name: "Case Intake Automation",
        description:
          "Automated case creation and triage with Flow + Apex for edge cases, ensuring consistent routing and SLA compliance.",
        badges: ["Flow", "Apex", "Email-to-Case"],
        links: [
          { label: "Repo", href: "https://github.com/" },
          { label: "Write-up", href: "https://example.com" },
        ],
      },
      {
        name: "Integration Gateway",
        description:
          "Built a resilient REST integration layer with retries, idempotency keys, and structured logging for observability.",
        badges: ["REST", "Named Credentials", "Queueable"],
        links: [{ label: "Architecture Notes", href: "https://example.com" }],
      },
      {
        name: "Sales Dashboard (LWC)",
        description:
          "Created a modern, responsive dashboard with Lightning Web Components and Apex aggregation for KPIs.",
        badges: ["LWC", "SOQL", "UX"],
        links: [{ label: "Demo", href: "https://example.com" }],
      },
    ],
  },
  certifications: {
    heading: "Certifications",
    subtitle: "Industry-recognized credentials.",
    items: [
      { name: "Salesforce Certified Platform Developer I", issuer: "Salesforce", date: "2024" },
      { name: "Salesforce Certified Platform Developer II", issuer: "Salesforce", date: "2025" },
      { name: "Salesforce Certified Administrator", issuer: "Salesforce", date: "2023" },
    ],
  },
  education: {
    heading: "Education",
    items: [
      {
        school: "Institution Name",
        program: "Computer Science / Software Engineering (Program Name)",
        period: "2018 — 2021",
        notes: ["Relevant coursework: OOP, Databases, Web Development, Software Design"],
      },
    ],
  },
  contact: {
    heading: "Contact",
    subtitle: "Send a message — I’ll respond as soon as possible.",
    emailTo: "roopan.thangam@example.com",
    social: [
      { label: "LinkedIn", href: "https://www.linkedin.com/" },
      { label: "GitHub", href: "https://github.com/" },
    ],
  },
};

/**
 * Central portfolio content model used to render the portfolio UI.
 * This file is intentionally content-driven so the UI can stay mostly static.
 */

/** @type {const} */
const portfolio = {
  profile: {
    name: "Roopan Thangam",
    role: "Salesforce Developer",
    location: "Toronto, ON, Canada",
    email: "roopan.thangam@example.com",
    phone: "+1 (647) 555-0142",
    links: {
      github: "https://github.com/roopan-thangam",
      linkedin: "https://www.linkedin.com/in/roopan-thangam/",
      trailhead: "https://trailblazer.me/id/roopanthangam",
      resumeUrl: "/assets/Roopan_Thangam_Resume.pdf"
    }
  },

  summary:
    "Salesforce Developer with hands-on experience delivering Lightning-based solutions, Flow automations, and Apex integrations. I focus on building maintainable, scalable implementations that improve sales and service operations, with a strong emphasis on clean data models, security, and user adoption.",

  skills: [
    {
      name: "Salesforce Platform",
      items: [
        "Apex (Classes, Triggers, Batch, Queueable)",
        "Lightning Web Components (LWC)",
        "Lightning Aura (maintenance)",
        "SOQL/SOSL",
        "Salesforce Flow (Screen, Record-Triggered, Scheduled)",
        "Validation Rules & Approval Processes",
        "Security (Profiles, Permission Sets, Sharing)",
        "Experience Cloud (basic)"
      ]
    },
    {
      name: "Integration & Data",
      items: [
        "REST/SOAP Integrations",
        "Platform Events (basic)",
        "External Services",
        "ETL/Data Loader",
        "Data Modeling & Governance",
        "Error handling & logging patterns"
      ]
    },
    {
      name: "DevOps & Tools",
      items: [
        "SFDX & Salesforce CLI",
        "Git & GitHub",
        "VS Code",
        "Change Sets (legacy orgs)",
        "Scratch Orgs (basic)",
        "CI/CD fundamentals"
      ]
    },
    {
      name: "Web/Programming",
      items: ["JavaScript/TypeScript fundamentals", "HTML/CSS", "Node.js basics", "Postman"],
      proficiency: "Intermediate"
    }
  ],

  highlights: [
    "Designed and delivered Flow + Apex automation that reduced manual case triage by ~40%.",
    "Built reusable LWC components with consistent UX patterns and improved page performance.",
    "Implemented secure integrations with robust error handling and retry strategies.",
    "Partnered with business stakeholders to translate requirements into scalable Salesforce solutions."
  ],

  experience: [
    {
      company: "CloudOps Solutions (Example)",
      title: "Salesforce Developer",
      period: "2023 — Present",
      location: "Toronto, ON",
      bullets: [
        "Developed Lightning Web Components and Apex services to support Sales and Service workflows.",
        "Implemented record-triggered and scheduled Flows to automate lead assignment, follow-ups, and SLA tracking.",
        "Built REST integrations to synchronize customer data with external systems; improved observability with structured logging.",
        "Performed data quality cleanup and implemented validation rules to reduce duplicate and incomplete records."
      ]
    },
    {
      company: "CRMWorks Consulting (Example)",
      title: "Salesforce Developer / Admin",
      period: "2021 — 2023",
      location: "Remote",
      bullets: [
        "Delivered end-to-end Salesforce enhancements including configuration, security, and custom development.",
        "Optimized Apex trigger patterns and introduced bulk-safe designs to reduce governor limit issues.",
        "Created reports and dashboards for sales leadership, improving visibility into pipeline and activity metrics.",
        "Supported UAT and release planning; authored admin/developer documentation for smoother adoption."
      ]
    }
  ],

  projects: [
    {
      title: "Service Case Automation Suite",
      summary:
        "A set of Flows and Apex utilities that automate case routing, prioritization, and SLA notifications while keeping security and audit requirements intact.",
      tech: ["Salesforce Flow", "Apex", "LWC", "Custom Metadata Types"],
      tags: ["Automation", "Service Cloud", "SLA"],
      links: {
        demo: "",
        repo: ""
      }
    },
    {
      title: "Reusable LWC UI Kit",
      summary:
        "A small library of reusable LWC components (tables, empty states, toasts, modals) to speed up delivery and standardize UX across teams.",
      tech: ["LWC", "SLDS", "JavaScript"],
      tags: ["Frontend", "Component Library", "UX"],
      links: {
        demo: "",
        repo: ""
      }
    },
    {
      title: "Customer Data Sync Integration",
      summary:
        "A REST-based integration that synchronizes customer profiles and key events between Salesforce and an external platform with retry and error handling patterns.",
      tech: ["Apex", "REST", "Named Credentials", "Platform Events (basic)"],
      tags: ["Integration", "Data", "Reliability"],
      links: {
        demo: "",
        repo: ""
      }
    }
  ],

  certifications: [
    {
      name: "Salesforce Certified Platform Developer I",
      issuer: "Salesforce",
      year: 2023,
      verifyUrl: ""
    },
    {
      name: "Salesforce Certified Administrator",
      issuer: "Salesforce",
      year: 2022,
      verifyUrl: ""
    }
  ],

  education: [
    {
      institution: "Postgraduate Program (Example)",
      degree: "Software Development / Cloud Computing",
      period: "2020 — 2021",
      details: "Coursework included web development, databases, and cloud fundamentals."
    },
    {
      institution: "Bachelor’s Degree (Example)",
      degree: "Computer Science",
      period: "2016 — 2020",
      details: "Focus on programming fundamentals, data structures, and software engineering."
    }
  ],

  contact: {
    fallbackEmail: "roopan.thangam@example.com"
  }
};

export default portfolio;

/**
 * Small helper utilities that make UI code cleaner.
 */

// PUBLIC_INTERFACE
export function getAllProjectTags(projects = portfolio.projects) {
  /** Returns a de-duplicated, alphabetically sorted list of tags across all projects. */
  const set = new Set();
  (projects || []).forEach((p) => (p.tags || []).forEach((t) => set.add(t)));
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}

// PUBLIC_INTERFACE
export function getProjectsByTag(tag, projects = portfolio.projects) {
  /** Returns projects that include the given tag (case-sensitive match). */
  if (!tag) return projects || [];
  return (projects || []).filter((p) => (p.tags || []).includes(tag));
}

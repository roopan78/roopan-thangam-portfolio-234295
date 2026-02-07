/**
 * Central portfolio content model used to render the portfolio UI.
 * This file is intentionally content-driven so the UI can stay mostly static.
 */

/** @type {const} */
const portfolio = {
  profile: {
    name: "Roopan Thangam",
    role: "Salesforce Developer",
    location: "Tirunelveli, Tamil Nadu, India",
    email: "roopanth21@outlook.com",
    phone: "+91 8610930273",
    links: {
      github: "https://github.com/roopan-thangam",
      linkedin: "https://www.linkedin.com/in/roopan-thangam/",
      trailhead: "https://trailblazer.me/id/roopanthangam",
      resumeUrl: "/assets/Roopan_Thangam_Resume.pdf"
    }
  },

  summary:
    "Salesforce Developer with 1 year of experience in Lightning Web Components (LWC), Apex, and SOQL. Skilled in building scalable applications, optimizing business processes, and delivering client-specific solutions. Experienced in working on multi-module Salesforce products and providing end-to-end development and support. Holds Salesforce AI Associate and Salesforce Administrator certifications.",

  skills: [
    {
      name: "Salesforce Platform",
      items: [
        "Lightning Web Components (LWC)",
        "Apex",
        "Apex Triggers",
        "Aura Components",
        "Visualforce Pages",
        "Flows",
        "SOQL"
      ],
      proficiency: "Advanced"
    },
    {
      name: "Web Technologies",
      items: [
        "JavaScript",
        "CSS",
        "HTML"
      ],
      proficiency: "Advanced"
    },
    {
      name: "Tools & Version Control",
      items: [
        "Git",
        "Salesforce CLI",
        "VS Code"
      ],
      proficiency: "Intermediate"
    }
  ],

  highlights: [
    "Developed and maintained RangerNXT, a single-page Salesforce application for rapid form creation.",
    "Implemented instant PDF generation with configurable options to enhance business document handling.",
    "Contributed to RangerFusion, a multi-business solution covering HRM, ESS, Finance, and more.",
    "Provided client support and customization for iPower, Cloudbyts, and Effitech.",
    "Attended Salesforce TDX at Bangalore for RangerNXT product."
  ],

  experience: [
    {
      company: "Ranger Technologies",
      title: "Salesforce Developer",
      period: "Oct 2024 — Present",
      location: "Remote",
      bullets: [
        "Developed and maintained features in RangerNXT, a single-page Salesforce application for rapid form creation, reducing LWC and Apex development time.",
        "Implemented instant PDF generation with configurable options to enhance business document handling.",
        "Contributed to RangerFusion, a multi-business solution covering HRM, ESS, Finance, and more.",
        "Developed and optimized modules for Sales Order, Purchase Order, Estimation, and Invoice.",
        "Provided client support and customization for iPower, Cloudbyts, and Effitech, particularly in the Sales App module.",
        "Wrote and optimized SOQL queries for high-performance data retrieval and implemented business logic in Apex."
      ]
    }
  ],

  projects: [
    {
      title: "RangerNXT Form Builder",
      summary:
        "Built dynamic form generation in Salesforce with customizable UI and instant PDF output. A single-page application that reduces LWC and Apex development time significantly.",
      tech: ["LWC", "Apex", "Visualforce", "JavaScript", "CSS"],
      tags: ["Form Builder", "PDF Generation", "Automation"],
      links: {
        demo: "",
        repo: ""
      },
      details: "RangerNXT enables rapid form creation with a user-friendly interface, allowing businesses to build forms without extensive coding. Features include instant PDF generation with configurable templates and options."
    },
    {
      title: "Sales Order & Invoice Automation",
      summary:
        "Streamlined sales operations through LWC and Apex automation. Developed and optimized modules for Sales Order, Purchase Order, Estimation, and Invoice within RangerFusion.",
      tech: ["LWC", "Apex", "SOQL", "Flows"],
      tags: ["Automation", "Sales Cloud", "Finance"],
      links: {
        demo: "",
        repo: ""
      },
      details: "Implemented end-to-end automation for sales processes, reducing manual data entry and improving accuracy. Integrated with existing business workflows for seamless operations."
    },
    {
      title: "RangerFusion Multi-Business Solution",
      summary:
        "Contributed to a comprehensive multi-business solution covering HRM, ESS, Finance, and more. Provided client support and customization for multiple enterprises.",
      tech: ["LWC", "Apex", "Aura Components", "SOQL"],
      tags: ["Enterprise Solution", "HRM", "Finance"],
      links: {
        demo: "",
        repo: ""
      },
      details: "RangerFusion is a modular Salesforce solution designed to handle multiple business functions. Worked on customizations for iPower, Cloudbyts, and Effitech clients, particularly in the Sales App module."
    }
  ],

  certifications: [
    {
      name: "Salesforce Certified AI Associate",
      issuer: "Salesforce",
      year: 2024,
      verifyUrl: ""
    },
    {
      name: "Salesforce Certified Administrator",
      issuer: "Salesforce",
      year: 2024,
      verifyUrl: ""
    }
  ],

  education: [
    {
      institution: "Francis Xavier Engineering College",
      degree: "B.E – Computer Science and Engineering",
      period: "Aug 2020 — May 2024",
      details: "Tamil Nadu, India. Graduated with a Bachelor of Engineering degree specializing in Computer Science and Engineering."
    }
  ],

  contact: {
    fallbackEmail: "roopanth21@outlook.com"
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

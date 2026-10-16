export const personalInfo = {
  name: "Parth",
  fullName: "Parth Jha",
  location: "Bangalore, India",
  email: "parthjha4@gmail.com",
  phone: "+91 8207354243",
  tagline: "Full-Stack Developer & AI Engineer",
  statement:
    "I build backend-heavy full-stack systems — from Spring Boot services and payment reconciliation to agentic AI that reads real-world documents.",
  about: `I'm a final year Information Science and Engineering student at CMR Institute of Technology, Bengaluru (graduating 2027), currently working as a Software Engineering Intern at Prudential Technological Services India, where I migrate finance reporting from IBM Cognos to Databricks. Java is my primary language, and I like building systems that hold up in the real world: a Redis-backed URL shortener with rate limiting, a B2B sales-ops platform that reached the Odoo Hackathon finals, and a LangGraph-powered insurance coordination platform. I've solved 439+ problems on LeetCode, and these days I'm exploring cloud, system design, Databricks, PySpark, Azure Data Factory and SQL. I think in systems, not just pages.`,
  links: {
    linkedin: "https://www.linkedin.com/in/parth1810/",
    github: "https://github.com/parthjha18",
    leetcode: "https://leetcode.com/u/parthjha_123/",
  },
};

export const stats = {
  status: "Interning at Prudential",
  gpa: "9.41 / 10",
  leetcode: "439+ Solved",
};

export const education = [
  {
    institution: "CMR Institute of Technology, Bengaluru",
    degree: "B.E. Information Science and Engineering",
    period: "2023 – 2027 (Pursuing)",
    gpa: "9.41/10.0",
    highlight: "Secured 10 SGPA in 3rd semester",
  },
  {
    institution: "Delhi Public School, Sitamarhi",
    degree: "12th Grade – Science",
    period: "2021 – 2023",
    gpa: "86%",
    highlight: null,
  },
  {
    institution: "DAV Public School, Sitamarhi",
    degree: "10th Grade",
    period: "2020",
    gpa: "93.4%",
    highlight: null,
  },
];

export const experience = [
  {
    role: "Software Engineering Intern",
    company: "Prudential Technological Services India",
    period: "Jul 2026 – Present",
    description: [
      "Value Creation Centre, Performance Management team (Bangalore) — migrating Finance MI reporting from IBM Cognos to Databricks",
      "Reverse-engineered Cognos XML report definitions into SQL and built Databricks dashboards (Net Revenue by Client, Asia Life, FUM Flows) with KPI filters and local-currency value aggregation",
      "Reconciled and validated KPIs, flagging mismatches across business units; traced KPIs from raw layer through gold-layer facts/dimensions to wrapper-layer rollups (star vs. snowflake schema)",
      "Wrote a Python script to extract key-value pairs from Cognos XML, and documented the time saved using AI assistance versus manual work",
      "Lead React developer on a 6–8 week Reference Data Management PoC deployed on Databricks Apps (React, TypeScript, Tailwind, Express, Lakebase Postgres) with maker/checker/admin roles via Entra ID; turned wireframes into a ~37-day Jira work plan",
      "Built a personal Databricks Free Edition sandbox (Lakebase Postgres + React/TS Databricks App) to self-learn for the PoC, and now helping document Azure Data Factory pipelines for another team",
    ],
    tech: [
      "Databricks",
      "SQL",
      "Delta Lake",
      "IBM Cognos",
      "Python",
      "React",
      "TypeScript",
      "Tailwind",
      "Express",
      "Azure Data Factory",
      "Jira",
    ],
  },
  {
    role: "Frontend Developer Intern",
    company: "The Developers Arena",
    period: "Feb – Mar 2026",
    description: [
      "Built two fully responsive frontend websites (portfolio + restaurant) using HTML, CSS, JavaScript",
      "Multi-section layouts with smooth-scroll navigation, image carousel, validated contact form",
      "Used Git for version control throughout development",
    ],
    tech: ["HTML", "CSS", "JavaScript", "Git"],
  },
];

export const projects = [
  {
    title: "DealFlow360",
    subtitle: "Odoo Hackathon 2026 finalist · B2B sales-operations platform",
    problem:
      "B2B sales teams lose control of discounts and risk once a quote leaves the sales rep — approvals are ad hoc, negotiation history gets overwritten, and nobody sees a deal's health until it's too late.",
    approach:
      "Team project built as a backend-first Node.js, Express and PostgreSQL platform that governs a deal from quotation to payment. Discount tiers and risk bands drive configurable approval chains (Sales Rep → Manager → Finance), approved quotes are never edited in place — a change creates a new version — and a restricted customer portal supports line-level questions and counter-offers. It also covers fulfillment splitting, mixed one-time and subscription billing, and deal-health and anomaly dashboards. I contributed 30 commits across the team's backend and frontend.",
    result:
      "Selected for the final round of the Odoo Hackathon, held at Odoo's office in Gandhinagar, Gujarat.",
    tech: [
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "React",
      "TypeScript",
      "REST APIs",
    ],
    metrics: [
      { label: "Roles", value: "5" },
      { label: "Screens", value: "18" },
      { label: "Round", value: "Finals" },
    ],
    gradient: "from-fuchsia-500/20 to-purple-600/20",
    accent: "fuchsia",
  },
  {
    title: "Payment Reconciliation Agent",
    subtitle: "Razorpay Buildathon 2026 · Track 04: AI Finance Controller",
    problem:
      "Payment gateway logs, bank settlement files and merchant ledgers are supposed to agree and rarely do — finance teams burn analyst-hours matching records and explaining every mismatch by hand.",
    approach:
      "Built a four-layer pipeline that uses AI only where deterministic logic can't. Layers 1–2 do exact-key joins and arithmetic reconciliation (amount − fee − tax = settlement). Layer 3 uses Gemini for fuzzy reference-ID matching with a confidence threshold and a deterministic edit-distance fallback when the API is down. Layer 4 classifies each leftover exception into one of 9 categories with a plain-language audit trail. Shipped with a React (Vite) dashboard and a regeneratable synthetic data generator.",
    result:
      "100% transaction accuracy across all 9 exception categories on the synthetic ground-truth set, and ~0.2 ms per record on the deterministic layers — 5,000 transactions/month reconcile in about a second.",
    tech: [
      "Python",
      "FastAPI",
      "Gemini API",
      "React",
      "Vite",
      "Pandas",
      "pytest",
    ],
    metrics: [
      { label: "Accuracy", value: "100%" },
      { label: "Layers", value: "4" },
      { label: "Exceptions", value: "9" },
    ],
    gradient: "from-amber-500/20 to-orange-600/20",
    accent: "amber",
  },
  {
    title: "DuCO-Agent",
    subtitle: "Agentic AI for dual health-insurance coordination",
    problem:
      "Patients with two insurance plans struggle to work out which insurer pays first, what they'll owe out of pocket, and how to get pre-authorization — all from a pile of scans, PDFs and notes.",
    approach:
      "Built a multi-agent system with four LangGraph StateGraph agents — Intake, Coordination of Benefits, Financial and Pre-Auth — with reflection loops, validation and conditional routing instead of a linear chain. A vision LLM parses invoices and estimates, PyMuPDF plus an LLM structures MRI reports into ICD-10 codes, and letter generation runs in parallel with asyncio. Node.js/Supabase backend, FastAPI agent service and a React frontend.",
    result:
      "From raw multi-modal documents to a per-CPT-code cost breakdown in INR across both insurers, downloadable pre-auth PDF letters, and a plain-English audio briefing for the patient.",
    tech: [
      "Python",
      "FastAPI",
      "LangGraph",
      "Node.js",
      "Express.js",
      "Supabase",
      "PostgreSQL",
      "React",
      "Vite",
    ],
    metrics: [
      { label: "AI Agents", value: "4" },
      { label: "Services", value: "3" },
      { label: "Doc Types", value: "3" },
    ],
    gradient: "from-rose-500/20 to-red-600/20",
    accent: "rose",
  },
  {
    title: "Insurance Port Assistant",
    subtitle: "RAG-based health insurance portability advisor for India",
    problem:
      "Switching health insurers under IRDAI portability rules is confusing — people can't tell which waiting-period credits, no-claim bonuses and room-rent caps carry over, or whether switching is worth it.",
    approach:
      "Users upload their existing policy PDF; the backend parses it with pdfplumber, embeds it into ChromaDB, and extracts structured benefits (sum insured, waiting periods, co-pay, NCB). A compare endpoint puts old and new policies side by side, and a RAG chat answers questions grounded in the actual policy text, with an AI verdict on cost-effectiveness. Demo personas are generated from a dataset of Indian professional profiles.",
    result:
      "A working end-to-end advisor with a FastAPI backend, React + Tailwind frontend, and a demo mode that answers from general IRDAI knowledge when no policy is uploaded.",
    tech: [
      "Python",
      "FastAPI",
      "ChromaDB",
      "OpenRouter",
      "pdfplumber",
      "React",
      "TypeScript",
      "Tailwind CSS",
    ],
    metrics: [
      { label: "API Routes", value: "6" },
      { label: "Retrieval", value: "RAG" },
      { label: "Vector DB", value: "Chroma" },
    ],
    gradient: "from-indigo-500/20 to-violet-600/20",
    accent: "indigo",
  },
  {
    title: "Scalable URL Shortener",
    subtitle: "Spring Boot backend with Redis caching and rate limiting",
    problem:
      "A URL shortener looks trivial until you handle concurrent redirects, cache outages and abusive traffic — naive read-modify-write click counting loses data under load.",
    approach:
      "Built a layered Java 17 / Spring Boot 3 service (controller → service → repository) with MySQL persistence, 7-character Base62 short codes with collision handling, and atomic click counting via a single UPDATE. Redis caches lookups (10-minute TTL) and powers a per-IP fixed-window rate limiter (60 req/min, 429 + Retry-After) — both fail open so the service stays up if Redis dies. Global JSON error handling, Bean Validation, and unit + MockMvc tests with JUnit 5 and Mockito. Dockerized with Compose, plus a React frontend served through nginx.",
    result:
      "A production-style backend that degrades gracefully, starts with one `docker-compose up`, and is covered by service, generator and controller tests.",
    tech: [
      "Java 17",
      "Spring Boot",
      "Spring Data JPA",
      "MySQL",
      "Redis",
      "JUnit 5",
      "Mockito",
      "Docker",
      "React",
    ],
    metrics: [
      { label: "Rate Limit", value: "60/min" },
      { label: "Cache TTL", value: "10 min" },
      { label: "Codes", value: "Base62" },
    ],
    gradient: "from-emerald-500/20 to-teal-600/20",
    accent: "emerald",
  },
  {
    title: "PG Accommodation Recommendation System",
    subtitle: "Trust-aware, explainable recommendation engine",
    problem:
      "Finding reliable PG accommodations is difficult — listings lack trust signals, reviews are sparse, and preference matching is manual.",
    approach:
      "Full-stack platform with an API gateway (Node.js/Express) coordinating a Python ML microservice. Recommendations use weighted Euclidean distance over preferences, fuzzy location matching, and Bayesian trust scoring, with a RoBERTa sentiment pipeline filtering unreliable listings. Recent additions: counterfactual “what-if” suggestions that re-run the real pipeline to show which preference change would actually improve results, real road-time commute ranking via OpenStreetMap (Nominatim + OSRM), and a Demo/Real data toggle that syncs live PG listings collected from residents through a Google Form.",
    result:
      "Tenants get trust-ranked, explainable recommendations — with badges, a ‘Why this PG?’ breakdown, commute-aware ranking and real listings alongside a 1,000-record Bangalore North dataset.",
    tech: [
      "Node.js",
      "Express.js",
      "Python",
      "FastAPI",
      "PostgreSQL",
      "Prisma",
      "React",
      "Pandas",
      "Scikit-Learn",
      "PyTorch",
      "Hugging Face Transformers",
      "RapidFuzz",
      "OpenStreetMap",
    ],
    metrics: [
      { label: "Records", value: "1000" },
      { label: "Microservices", value: "2" },
      { label: "Commute", value: "OSRM" },
    ],
    gradient: "from-cyan-500/20 to-blue-600/20",
    accent: "cyan",
  },
  {
    title: "BookShare",
    subtitle: "Live peer-to-peer book rental platform",
    problem:
      "Book sharing is limited by geography — there's no easy way to discover books near you, rent them, and handle the logistics.",
    approach:
      "Full-stack MERN platform with 17+ REST API endpoints covering book listing, rental lifecycle and payments. Geospatial search using MongoDB GeoJSON + the Haversine formula, Razorpay payments with server-side signature verification, and a dual-confirmation rental flow where both owner and renter confirm exchange and return. Secure auth with JWT, bcrypt.js and OTP email verification (Nodemailer), role-based access with an admin analytics dashboard, and Docker Compose for the frontend, backend and database.",
    result:
      "Deployed and live — frontend on Vercel, backend on Render with MongoDB Atlas — with geospatial search and a complete rental lifecycle from listing to return.",
    tech: [
      "React",
      "Express",
      "Node.js",
      "MongoDB",
      "JWT",
      "bcrypt.js",
      "Razorpay",
      "Nodemailer",
      "Docker",
      "Vercel",
    ],
    metrics: [
      { label: "API Endpoints", value: "17+" },
      { label: "Services", value: "3" },
      { label: "Auth Layers", value: "3" },
    ],
    gradient: "from-purple-500/20 to-pink-600/20",
    accent: "purple",
  },
];

export const certifications = [
  {
    title: "Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate",
    issuer: "Oracle",
  },
  {
    title: "Complete Full Stack Web Development Bootcamp",
    issuer: "Udemy",
  },
];

export const hackathons = [
  {
    name: "Odoo Hackathon 2026",
    achievement:
      "Selected for the final round, held at Odoo's office in Gandhinagar, Gujarat — built DealFlow360, a B2B sales-operations platform",
  },
  {
    name: "Razorpay Buildathon 2026",
    achievement:
      "Participated in Track 04 (AI Finance Controller) — built a multi-source payment reconciliation agent with layered deterministic + AI matching",
  },
  {
    name: "NMIT Hacks (NMITx Hackathon)",
    achievement:
      "Team entry, virtual round — BetterEngineer, an AI DSA coach that gives progressive hints instead of full solutions",
  },
  {
    name: "GHCI'25 GenAI Hackathon",
    achievement: "Advanced to Round 2",
  },
  {
    name: "Smart India Hackathon 2024",
    achievement: "College-level selected — MERN stack project for Indian diaspora connection",
  },
];

export const achievements = [
  "Solved 439+ problems on LeetCode, including 63 Hard",
  "Earned the 200 Days, 100 Days and 50 Days badges on LeetCode in 2026",
  "Selected for the final round of the Odoo Hackathon 2026 at Odoo, Gandhinagar",
  "Advanced to Round 2 of the GHCI'25 GenAI Hackathon",
  "Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate",
  "Secured 10 SGPA in 3rd semester",
];

export const skills = {
  "Languages": ["Java", "Python", "JavaScript", "TypeScript", "SQL", "C"],
  "Web": ["HTML", "CSS", "REST APIs", "Tailwind CSS"],
  "Frameworks": ["Spring Boot", "ReactJS", "Node.js", "Express.js", "FastAPI", "Flask", "PySpark", "JWT"],
  "Databases": ["MySQL", "PostgreSQL", "MongoDB", "Redis", "Databricks", "Delta Lake", "Supabase", "ChromaDB"],
  "ML/AI": [
    "LangGraph",
    "RAG",
    "Gemini API",
    "Hugging Face Transformers",
    "Recommendation Systems",
    "Pandas",
    "Scikit-Learn",
    "PyTorch",
    "SMOTE",
  ],
  "Tools": [
    "Git",
    "GitHub",
    "GitHub Actions",
    "Docker",
    "AWS",
    "Azure Data Factory",
    "IBM Cognos",
    "Jira",
    "Postman",
    "JUnit",
    "Mockito",
    "VS Code",
    "Cursor",
    "Power BI",
    "Tableau",
  ],
  "Core CS": ["DSA", "OOP", "DBMS", "OS", "Computer Networks", "Distributed Systems", "System Design", "Software Engineering"],
};

export const activities = [
  { label: "NSS Volunteer", desc: "Community service" },
  { label: "Cricket", desc: "Recreational player" },
  { label: "Music", desc: "Listener" },
];
export const languages = ["English", "Hindi"];

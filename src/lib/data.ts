export const personalInfo = {
  name: "Parth",
  fullName: "Parth Jha",
  location: "Bangalore, India",
  email: "parthjha4@gmail.com",
  phone: "+91 8207354243",
  tagline: "Full-Stack Developer & ML Engineer",
  statement:
    "I build systems where engineering meets intelligence — from recommendation engines to geospatial platforms.",
  about: `I'm a full-stack developer who enjoys building systems that combine solid engineering with ML — from recommendation engines to geospatial platforms. Currently pursuing my B.E. in Information Science and Engineering at CMR Institute of Technology, Bengaluru, I've interned building responsive frontend sites and I'm active in hackathons. I think in systems, not just pages.`,
  links: {
    linkedin: "https://www.linkedin.com/in/parth1810/",
    github: "https://github.com/parthjha18",
    leetcode: "https://leetcode.com/u/parthjha_123/",
  },
};

export const education = [
  {
    institution: "CMR Institute of Technology, Bengaluru",
    degree: "B.E. Information Science and Engineering",
    period: "2023 – 2027 (Pursuing)",
    gpa: "9.37/10.0",
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
    title: "PG Accommodation Recommendation System",
    subtitle: "Trust-aware recommendation engine with sentiment analysis",
    problem:
      "Finding reliable PG accommodations is difficult — listings lack trust signals, reviews are sparse, and preference matching is manual.",
    approach:
      "Built a full-stack platform with an API gateway (Node.js/Express) coordinating with a Python/FastAPI ML microservice. The recommendation engine combines preference matching, confidence scoring, and trust signals using Scikit-Learn. A rating pipeline uses Pandas + Hugging Face RoBERTa for sentiment analysis with threshold-based filtering to surface only reliable listings.",
    result:
      "A unified platform where tenants get trust-ranked recommendations based on actual preferences, not just location proximity.",
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
    ],
    metrics: [
      { label: "Microservices", value: "2" },
      { label: "ML Models", value: "2" },
      { label: "Tech Stack", value: "12" },
    ],
    gradient: "from-cyan-500/20 to-blue-600/20",
    accent: "cyan",
  },
  {
    title: "BookShare",
    subtitle: "Location-based book rental platform",
    problem:
      "Book sharing is limited by geography — there's no easy way to discover books near you, rent them, and handle the logistics.",
    approach:
      "Built a full-stack MERN platform with 17+ REST API endpoints covering book listing, rental lifecycle, and payments. Geospatial search using MongoDB GeoJSON + Haversine formula. Secure auth with JWT, bcrypt.js, OTP email verification (Nodemailer), and role-based access with an admin analytics dashboard. Fully Dockerized (Docker Compose) for frontend, backend, and DB.",
    result:
      "A production-ready rental platform with Dockerized deployment, geospatial search, and a complete rental lifecycle from listing to return.",
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
    ],
    metrics: [
      { label: "API Endpoints", value: "17+" },
      { label: "Services", value: "3" },
      { label: "Auth Layers", value: "3" },
    ],
    gradient: "from-purple-500/20 to-pink-600/20",
    accent: "purple",
  },
  {
    title: "BetterEngineer",
    subtitle: "AI-powered DSA platform (NMIT Hacks, May 2026)",
    problem:
      "DSA learners often get stuck and resort to viewing full solutions instead of working through problems with guided hints.",
    approach:
      "Proposed an AI-powered platform that guides users through DSA problems with progressive hints instead of direct solutions. Designed to build problem-solving skills rather than solution memorization.",
    result:
      "Selected as a team entry for NMIT Hacks — a concept that rethinks how AI can coach rather than replace the learning process.",
    tech: ["AI/ML", "DSA", "Web Platform"],
    metrics: [
      { label: "Hackathon", value: "NMIT Hacks" },
      { label: "Status", value: "Virtual Round" },
      { label: "Role", value: "Team Member" },
    ],
    gradient: "from-emerald-500/20 to-teal-600/20",
    accent: "emerald",
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
    name: "GHCI'25 GenAI Hackathon",
    achievement: "Selected in Round 1",
  },
  {
    name: "Smart India Hackathon 2024",
    achievement: "College-level selected — MERN stack project for Indian diaspora connection",
  },
  {
    name: "NMIT Hacks (NMITx Hackathon)",
    achievement: "Team entry, virtual round",
  },
];

export const achievements = [
  "Solved 300+ DSA problems on LeetCode",
  "Selected for Round 1 of GHCI'25 GenAI Hackathon",
  "Secured 10 SGPA in 3rd semester",
];

export const skills = {
  "Languages": ["C", "Java", "Python", "JavaScript"],
  "Web": ["HTML", "CSS", "REST APIs", "Tailwind CSS"],
  "Frameworks": ["ReactJS", "Express.js", "Node.js", "JWT"],
  "Databases": ["MySQL", "MongoDB", "PostgreSQL"],
  "ML/AI": ["Hugging Face Transformers", "Recommendation Systems", "Pandas", "SMOTE", "Scikit-Learn", "PyTorch"],
  "Tools": ["Git", "GitHub", "Postman", "Docker", "VS Code", "Cursor", "Power BI", "Tableau"],
  "Core CS": ["DSA", "OOP", "DBMS", "OS", "Computer Networks", "Distributed Systems", "Software Engineering"],
};

export const activities = [
  { label: "NSS Volunteer", desc: "Community service" },
  { label: "Cricket", desc: "Recreational player" },
];
export const languages = ["English", "Hindi"];

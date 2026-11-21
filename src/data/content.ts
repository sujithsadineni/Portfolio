// All site copy lives here (rule F): components only render it.
import type { IconType } from "react-icons";
import {
  FaReact,
  FaNodeJs,
  FaAws,
  FaDocker,
  FaBolt,
  FaVial,
  FaJava,
  FaAngular,
  FaJenkins,
} from "react-icons/fa";
import { RiNextjsFill } from "react-icons/ri";
import { LuBot, LuBrainCircuit } from "react-icons/lu";
import { SiApachekafka } from "react-icons/si";

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

export const links = {
  linkedin: "https://www.linkedin.com/in/sujith-sadineni-508322209/",
  github: "https://github.com/sujithsadineni",
  email: "mailto:sujithsadineni@gmail.com",
  instagram: "https://www.instagram.com/sujith_sadineni/",
  youtube: "https://www.youtube.com/@Sujithkumarsadineni",
  reddit: "https://www.reddit.com/user/E-11-EVN/",
  resume: asset("Sujith_Sadineni_React.pdf"),
};

export const about = {
  name: "Sujith Kumar Sadineni",
  shortName: "Sujith Sadineni",
  greeting: "👋 Hi,",
  typewriter: [
    "Senior Full-Stack Engineer",
    "Cloud & Microservices Architect",
    "React, Java & AWS Specialist",
    "AI-Powered Product Builder",
    "Open-Source Project Builder",
  ],
  // {strong} segments are rendered bold
  bio: [
    "Over 7 years of experience engineering scalable, cloud-native applications. I specialize in ",
    { strong: "React, Next.js, TypeScript, Java, Spring Boot, Node.js, GraphQL, Kafka" },
    ", and ",
    { strong: "AWS" },
    ", focusing on secure API architecture, AI-enhanced workflows, and responsive, accessible UI/UX across the entire SDLC. I also build ",
    { strong: "open-source projects" },
    " like cashflow.",
  ] as (string | { strong: string })[],
};

export const techLogos = [
  "react:React",
  "nodejs:Node.js",
  "aws:AWS",
  "graphql:GraphQL",
  "docker:Docker",
  "typescript:TypeScript",
  "java:Java",
  "spring:Spring",
  "angular:Angular",
].map((s) => {
  const [file, name] = s.split(":");
  return { name, src: asset(`assets/${file}.svg`) };
});

export const popSound = asset("pop.mp3");

export type Expertise = {
  title: string;
  icons: IconType[];
  short: string; // comma-separated → tech chips
  lead: string; // one-line summary
  details: string[];
};

// Facts only (rule J): AI items are verified against the public cashflow repo
// (api/src/assistant/claude.js + README); the rest restate the original text.
export const expertise = {
  subtitle:
    "7+ years across the stack: React and TypeScript, Java and Node.js services, AWS, and now LLM-powered features.",
  items: [
    {
      title: "AI Engineering & LLM Apps",
      icons: [LuBrainCircuit, LuBot],
      short: "Claude API, Tool use, Agent loops, Zod validation, Prompt caching, Claude Code",
      lead: "I ship LLM features that are grounded in real data, checkable, private by default and cost-aware.",
      details: [
        "Built \"Ask Claude\" in cashflow (open source): an assistant that answers spending questions through Claude tool use over the app's own read-only queries.",
        "Grounded every answer: the system prompt forbids estimated figures, and every lookup the model made is shown so the answer can be checked.",
        "Wrote a capped, auditable tool loop with Zod-validated tool inputs and server-side model fallback, instead of a black-box agent runner.",
        "Kept it cheap and fast with prompt caching and per-request token cost tracking.",
        "Designed for privacy: AI is opt-in per question or statement, only the needed fields are sent, and card numbers never leave the machine.",
        "Develop AI-assisted with Claude Code, using project rule files (CLAUDE.md / AGENTS.md) and custom skills that automate testing, audits and reviews.",
      ],
    },
    {
      title: "Frontend Development",
      icons: [FaReact, FaAngular, RiNextjsFill],
      short: "React, Next.js, Angular, TypeScript, Redux, Accessibility",
      lead: "Fast, accessible interfaces that hold up on every screen size.",
      details: [
        "Build responsive single-page apps in React and TypeScript: React, Hooks and Redux at NC DHHS, React with SASS at Morgan Stanley, and React with Hooks at Cognizant.",
        "Deliver Angular and Next.js applications alongside React, choosing the framework that fits the product.",
        "Keep large UIs maintainable with Redux, custom hooks and modular SCSS/Tailwind component styles.",
        "Cut load times with code splitting, lazy loading and memoization, and keep bundles lean by removing unused dependencies.",
        "Build accessible, mobile-first interfaces with UX teams: this portfolio meets WCAG AA contrast in both themes and works fully by keyboard.",
        "Use modern browser APIs (View Transitions, IntersectionObserver, container queries) for smooth, responsive UI without heavy libraries.",
      ],
    },
    {
      title: "Backend Development",
      icons: [FaNodeJs, FaJava],
      short: "Java, Spring Boot, Node.js, Express, GraphQL, REST",
      lead: "Secure, well-structured APIs and services that scale.",
      details: [
        "Design REST and GraphQL APIs: GraphQL services in Java/Spring Boot at Cognizant, Node.js/Express APIs at NC DHHS.",
        "Delivered secure microservices at Morgan Stanley with Node.js, Prisma ORM and PostgreSQL.",
        "Model data across PostgreSQL and MySQL with JPA/Hibernate, Prisma, Knex and Sequelize.",
        "Secure APIs with JWT/OAuth stateless authentication and bcrypt password hashing.",
        "Handle file uploads end to end: GraphQL multipart uploads stored in AWS S3 (File Upload S3 project).",
        "Add middleware for logging, validation and versioning; validate payloads with Zod and log with pino in cashflow.",
      ],
    },
    {
      title: "Cloud & DevOps",
      icons: [FaAws, SiApachekafka],
      short: "AWS, ECS, EC2, S3, CloudWatch, CI/CD",
      lead: "Automated delivery and observable infrastructure on AWS.",
      details: [
        "Run containerised services on AWS ECS and EC2, with CI/CD in Jenkins, at NC DHHS.",
        "Led CI/CD workflows at Morgan Stanley with Jenkins and AWS CodePipeline; also automate with GitHub Actions.",
        "Monitor production with CloudWatch and the ELK Stack for centralised logs and alerts.",
        "Protect configuration with AWS Secrets Manager and least-privilege IAM roles.",
        "Provision scalable infrastructure with VPC, S3 and Elastic Load Balancing.",
        "AWS Certified Solutions Architect: design for availability, security and cost from the start.",
      ],
    },
    {
      title: "Containers & Orchestration",
      icons: [FaDocker, FaJenkins],
      short: "Docker, Kubernetes, EKS, Helm",
      lead: "Portable, repeatable environments from laptop to production.",
      details: [
        "Containerise React front ends and Java/Node.js services with Docker.",
        "Shipped containerised releases through Docker and Jenkins CI/CD pipelines at Cognizant.",
        "Run and roll out workloads on Kubernetes and AWS EKS clusters.",
        "Package deployments with Dockerfiles and Helm charts for repeatable releases.",
        "Plan rollbacks and keep development, staging and production environments in parity.",
        "Use the same container images across environments to remove 'works on my machine' issues.",
      ],
    },
    {
      title: "Performance & Scale",
      icons: [FaBolt],
      short: "Kafka, Code splitting, Memoization, SQL indexing, Grafana",
      lead: "Finding bottlenecks and removing them, front to back.",
      details: [
        "Tune React apps with code splitting, lazy loading and memoization.",
        "Improved backend performance with Express middleware and PostgreSQL indexing during my MS projects.",
        "Speed up queries with indexing, schema tuning and SQL optimisation.",
        "Move heavy work to asynchronous processing with Kafka for better throughput.",
        "Resolved performance bottlenecks in core banking and analytics modules.",
        "Keep pages light: this site's images went from 1.2 MB to about 127 KB, and unused dependencies were removed.",
      ],
    },
    {
      title: "Testing & Quality",
      icons: [FaVial],
      short: "Jest, RTL, Cypress, JUnit, Mockito, SonarQube",
      lead: "Quality built in, not bolted on.",
      details: [
        "Test UIs with Jest and React Testing Library; maintained RTL-tested React apps at Morgan Stanley.",
        "Cover user journeys end to end with Cypress.",
        "Test Java services with JUnit and Mockito.",
        "Enforce standards with SonarQube static analysis and high test coverage across services.",
        "Practise TDD and thorough peer code reviews.",
        "Verify UI changes with scripted headless-Chrome checks for layout, themes and accessibility.",
      ],
    },
  ] as Expertise[],
};

export type TimelineItem = {
  date: string;
  title: string;
  company: string;
  logo: string;
  kind: "work" | "edu";
  start: string; // "YYYY-MM" (work) or "YYYY" (edu)
  end: string | null; // null = present
  highlights: string[];
  tags: string[];
};

// highlights/tags restate the original role descriptions (facts only)
export const timeline: TimelineItem[] = [
  {
    date: "May 2025 – Present",
    title: "Senior Full-Stack Developer",
    company: "NC DHHS",
    logo: asset("nc-state.jpg"),
    kind: "work",
    start: "2025-05",
    end: null,
    highlights: ["Designed single-page apps with React, Hooks and Redux.", "Built scalable APIs with Node.js/Express and implemented JWT authentication.", "Set up CI/CD with Jenkins and AWS ECS.", "Monitored applications with CloudWatch and the ELK Stack."],
    tags: ["React", "Redux", "Node.js", "Express", "JWT", "Jenkins", "AWS ECS", "CloudWatch", "ELK"],
  },
  {
    date: "Dec 2022 – May 2025",
    title: "Senior Full-Stack Developer",
    company: "Morgan Stanley",
    logo: asset("morgan.jpeg"),
    kind: "work",
    start: "2022-12",
    end: "2025-05",
    highlights: ["Delivered secure microservices with Node.js, Prisma ORM and PostgreSQL.", "Led CI/CD workflows with Jenkins and AWS CodePipeline.", "Maintained single-page apps built with React, SASS and React Testing Library."],
    tags: ["Node.js", "Prisma", "PostgreSQL", "Jenkins", "CodePipeline", "React", "SASS", "RTL"],
  },
  {
    date: "2022 – 2024",
    title: "Master's In Computer Science",
    company: "Southern Arkansas University",
    logo: asset("sau.png"),
    kind: "edu",
    start: "2022",
    end: "2024",
    highlights: ["Completed an MS in Computer Science.", "Built full-stack apps with React, GraphQL and Node.js.", "Improved backend performance with Express middleware and PostgreSQL indexing."],
    tags: ["React", "GraphQL", "Node.js", "Express", "PostgreSQL"],
  },
  {
    date: "Apr 2019 – Aug 2022",
    title: "Full-Stack Developer",
    company: "Cognizant",
    logo: asset("Cognizant-Logo.png"),
    kind: "work",
    start: "2019-04",
    end: "2022-08",
    highlights: ["Developed scalable single-page apps with React and Hooks.", "Built GraphQL APIs with Java Spring Boot.", "Focused on accessibility and modular SCSS styling.", "Shipped through CI/CD with Docker and Jenkins."],
    tags: ["React", "Java", "Spring Boot", "GraphQL", "SCSS", "Docker", "Jenkins"],
  },
  {
    date: "2015 – 2019",
    title: "B.E in Computer Science",
    company: "St Joseph's College Of Engineering",
    logo: asset("st.joseph.logo.png"),
    kind: "edu",
    start: "2015",
    end: "2019",
    highlights: ["Graduated in Computer Science.", "Built a strong foundation in Java, OOP and data structures.", "Took part in web and full-stack development internships."],
    tags: ["Java", "OOP", "Data structures"],
  },
];

// Last stop of the journey (facts: both projects are on this site / GitHub)
export const journeyToday = {
  title: "Still building",
  company: "AI-powered products & open source",
  highlights: [
    "cashflow: an open-source, local-first finance app with a grounded Claude assistant.",
    "Dependency Watch: automatic vulnerability-fix and version-upgrade detection (in progress).",
  ],
  tags: ["Claude API", "React", "Node.js", "PostgreSQL", "Open source"],
};

// kept short on purpose: the open card must fit inside the grid of cards
export type ProjectDetails = {
  // shown in a browser window; without one, the window shows `files` (or the description)
  screenshot?: { src: string; alt: string };
  // real paths from the public repo, shown as its file tree
  files?: string[];
  solved: string[];
  learned?: string[];
};

export type Project = {
  title: string;
  tagline: string; // one line on the small card
  description: string; // the window text when there's no screenshot or repo
  tags: string[];
  repo?: string;
  live?: string;
  status?: string;
  logo?: string;
  details: ProjectDetails;
};

export const projectsText = {
  heading: "🚀 Featured Projects",
  code: "Code",
  live: "Live demo",
  open: "Details",
  close: "Close details",
  solved: "What it solves",
  learned: "What I learned",
  stack: "Stack",
  files: "Files in the repo",
};

// Order matters: first item is the lead project.
// Facts come from each public repo (README, file tree, code); "learned" lines are DRAFTS for the user to confirm.
export const projects: Project[] = [
  {
    // facts from the public repo: README.md + AGENTS.md
    title: "cashflow",
    status: "Featured",
    logo: asset("projects/cashflow-logo.svg"),
    tagline: "Household expense tracker that runs entirely on your own computer.",
    description:
      "A household expense tracker that runs entirely on your own machine. Reads bank PDFs from nine banks, queues rows for review with duplicate detection, and checks every statement against its printed balances to the cent.",
    tags: ["React 19", "Vite", "Tailwind v4", "Node.js", "Express 5", "PostgreSQL", "Claude API"],
    repo: "https://github.com/sujithsadineni/cashflow",
    live: "https://sujithsadineni.github.io/cashflow/",
    details: {
      screenshot: {
        src: asset("projects/cashflow-overview.jpg"),
        alt: "cashflow's Overview page in the Glass design: income, spend, loans and savings for the month, an activity chart and a category breakdown",
      },
      solved: [
        "Statements from nine banks in one place, without sharing bank logins",
        "Nothing is saved until you review it",
        "Every statement balanced to the cent",
      ],
      // TODO(user): draft from the repo's rules; confirm or rewrite in your own words
      learned: [
        "Moving from Java / Spring Boot to Node, Express and React",
        "Money as integer cents, never floats",
        "Using the Claude API safely: opt-in, one file at a time",
      ],
    },
  },
  {
    // github.com/sujithsadineni/patchpilot: coming-soon page for now, tool built later
    title: "patchpilot",
    logo: asset("projects/patchpilot-logo.svg"),
    status: "In progress",
    tagline: "Finds vulnerable npm packages and the safe version to move to.",
    description:
      "Automatic vulnerability-fix (VF) detection and new-version upgrade detection for npm projects: reads npm audit, finds the n-1 stable version for each package, and proposes the upgrade.",
    tags: ["Node.js", "npm audit", "Automation"],
    repo: "https://github.com/sujithsadineni/patchpilot",
    live: "https://sujithsadineni.github.io/patchpilot/",
    details: {
      screenshot: {
        src: asset("projects/patchpilot-soon.jpg"),
        alt: "patchpilot coming-soon page in dark mode: shield logo, Coming soon badge and the three planned steps",
      },
      solved: [
        "Reads npm audit and lists what needs fixing",
        "Finds the n-1 stable version for each package",
        "Proposes the upgrade",
      ],
    },
  },
  {
    // facts from github.com/sujithsadineni/aws-dropvault (README, infra/lib/stack.ts); v1 = tag v1-express-postgres
    title: "aws-dropvault",
    logo: asset("projects/dropvault-logo.svg"),
    tagline: "Private file uploads on AWS: straight to S3, with sign-in, thumbnails and infrastructure as code.",
    description:
      "My 2025 file uploader rebuilt as a serverless AWS app: presigned uploads straight to a private S3 bucket, Cognito login, API Gateway + Lambda, DynamoDB records and S3-event thumbnails, all defined in AWS CDK.",
    tags: ["AWS CDK", "S3", "Lambda", "API Gateway", "DynamoDB", "Cognito"],
    repo: "https://github.com/sujithsadineni/aws-dropvault",
    live: "https://sujithsadineni.github.io/aws-dropvault/",
    details: {
      screenshot: {
        src: asset("projects/dropvault-vault.jpg"),
        alt: "aws-dropvault in dark mode: a drop zone, the five-step How it works on AWS panel and a grid of uploaded files with thumbnails",
      },
      solved: [
        "Upload from the browser straight to S3, with size and type enforced by S3",
        "Each person signs in and sees only their own files",
        "Image thumbnails made automatically after upload",
      ],
      // TODO(user): Claude's draft; confirm or rewrite in your own words
      learned: [
        "Presigned URLs instead of passing files through a server",
        "Event-driven work: S3 → Lambda",
        "A whole AWS stack as code with CDK",
      ],
    },
  },
  {
    // facts from github.com/sujithsadineni/postdeck (README, src/); v1 (Myposts.com GraphQL API) = tag v1-graphql-knex
    title: "postdeck",
    logo: asset("projects/postdeck-logo.svg"),
    tagline: "A posts admin console built with Ant Design 6: charts, tables, forms and themes.",
    description:
      "My 2025 Myposts.com GraphQL API rebuilt as a front-end admin console on generated sample data: dashboard charts, a full-featured posts table with CSV and Excel export and import, a three-step editor, a calendar, and light, dark and compact themes.",
    tags: ["React 19", "Ant Design 6", "TypeScript", "Charts", "faker", "Vite"],
    repo: "https://github.com/sujithsadineni/postdeck",
    live: "https://sujithsadineni.github.io/postdeck/",
    details: {
      screenshot: {
        src: asset("projects/postdeck-dashboard.jpg"),
        alt: "postdeck dashboard in dark mode: stat cards, a views-by-week area chart and a posts-by-status donut chart",
      },
      solved: [
        "Sort, filter, search and bulk-edit posts in one table",
        "Export posts to CSV or Excel, and import them back from CSV",
        "Write, schedule and preview posts with a validated three-step form",
      ],
      // TODO(user): Claude's draft; confirm or rewrite in your own words
      learned: [
        "Building a whole admin UI from Ant Design 6 components",
        "Theming with design tokens: dark, compact and brand colour",
        "Safe spreadsheet export: no formulas run from cell text",
      ],
    },
  },
  {
    // facts from github.com/sujithsadineni/posterwall (README + docs/LEARNED.md); v1 = tag v1-rest-mysql
    title: "PosterWall",
    logo: asset("projects/posterwall-logo.svg"),
    tagline: "Movie posters in five languages: rate, like and discuss.",
    description:
      "A movie-poster board rebuilt from my 2025 posts app: GraphQL and PostgreSQL in place of REST and MySQL, poster uploads, ratings, likes, comments and sharing, with a React 19 + shadcn/ui front end.",
    tags: ["React 19", "GraphQL", "PostgreSQL", "Drizzle", "shadcn/ui", "Playwright"],
    repo: "https://github.com/sujithsadineni/posterwall",
    live: "https://sujithsadineni.github.io/posterwall/",
    details: {
      screenshot: {
        src: asset("projects/posterwall-wall.jpg"),
        alt: "PosterWall in dark mode: language filter chips and a grid of movie posters with ratings, likes and comments",
      },
      solved: [
        "Post a movie with its poster, a rating and a review",
        "Browse English, UK, Hindi, Telugu and Tamil films",
        "Likes, comments and share links on every movie",
      ],
      // TODO(user): draft from docs/LEARNED.md; confirm or rewrite in your own words
      learned: [
        "Rebuilding REST + MySQL as GraphQL + PostgreSQL",
        "Safe image uploads, checked by their bytes",
        "Tests first: API tests plus Playwright",
      ],
    },
  },
  {
    title: "Portfolio Website",
    logo: asset("logo.png"), // the site's golden S (favicon)
    tagline: "This site: React 19 and TypeScript, light and dark, five mini-games.",
    description:
      "This site: React 19, TypeScript, Vite and SCSS with light/dark themes, deployed to GitHub Pages.",
    tags: ["React 19", "TypeScript", "Vite", "SCSS"],
    repo: "https://github.com/sujithsadineni/Portfolio",
    live: "https://sujithsadineni.github.io/Portfolio/",
    details: {
      screenshot: {
        src: asset("projects/portfolio-home.jpg"),
        alt: "This portfolio's home page in the dark theme: the intro on the left and the Stack Match mini-game on the right",
      },
      solved: [
        "One place for my work, experience and projects",
        "Light and dark themes that fit any phone",
        "Five small games that make a visit memorable",
      ],
      learned: [
        "View Transitions and scroll-driven animation without libraries",
        "Keyboard, focus, contrast and reduced-motion support",
        "Shipping a Vite app to GitHub Pages",
      ],
    },
  },
  {
    // facts from github.com/sujithsadineni/aisle (README, src/); v1 (2021 PHP + MySQL Lifestyle Store) = tag v1-php-2021
    title: "aisle",
    logo: asset("projects/aisle-logo.svg"),
    tagline: "A modern storefront: filters, product options, cart with promo codes and a three-step checkout.",
    description:
      "My 2021 PHP + MySQL Lifestyle Store rebuilt as a React storefront: 24 products with drawn pictures, filters and search, colour and size options, a cart with promo codes and GST, and checkout by card, UPI or cash on delivery.",
    tags: ["React 19", "TypeScript", "E-commerce", "CSS", "Accessibility", "Vite"],
    repo: "https://github.com/sujithsadineni/aisle",
    live: "https://sujithsadineni.github.io/aisle/",
    details: {
      screenshot: {
        src: asset("projects/aisle-home.jpg"),
        alt: "aisle home page: a Good things, well made hero with drawn camera, watch and sneaker, and a shop-by-category row",
      },
      solved: [
        "Find products fast with filters, search and sort",
        "Pick colour, size and quantity, then pay by card, UPI or cash",
        "Promo codes, free delivery over ₹2,999 and GST worked out in the cart",
      ],
      // TODO(user): Claude's draft; confirm or rewrite in your own words
      learned: [
        "Rebuilding a PHP + MySQL store as a modern front end",
        "Cart maths: stock limits, promos, shipping and tax",
        "A step-by-step checkout that checks every field",
      ],
    },
  },
  {
    // facts from github.com/sujithsadineni/doorway (README, src/); v1 (2021 static login page) = tag v1-static-2021
    title: "doorway",
    logo: asset("projects/doorway-logo.svg"),
    tagline: "Ten 2026 designs for log in, sign up and checkout, with Apple, Google and passkey buttons.",
    description:
      "My 2021 login and sign-up pages rebuilt as a React design gallery: ten styles (Liquid Glass, Bento, Neo-Brutalism, Terminal, Spatial and more) for log in, sign up and checkout, sharing one set of validated, accessible form components.",
    tags: ["React 19", "TypeScript", "CSS", "Accessibility", "UI design", "Vite"],
    repo: "https://github.com/sujithsadineni/doorway",
    live: "https://sujithsadineni.github.io/doorway/",
    details: {
      screenshot: {
        src: asset("projects/doorway-gallery.jpg"),
        alt: "doorway gallery in dark mode: eight of the ten login designs shown as cards, from Liquid Glass to Swiss Grid",
      },
      solved: [
        "Log in, sign up and checkout in ten distinct design styles",
        "Apple, Google and passkey sign-in, Apple Pay and Google Pay buttons",
        "Live checks: password strength, card number, expiry and CVC",
      ],
      // TODO(user): Claude's draft; confirm or rewrite in your own words
      learned: [
        "One set of form components, ten looks, all in CSS",
        "Accessible forms: labels, linked errors, focus rings",
        "Card checks: Luhn, brand detection and formatting",
      ],
    },
  },
];

export type GameId = "pop" | "bugs" | "match" | "vulns" | "type";

export const games = {
  items: {
    pop: {
      title: "Logo Pop",
      how: "Pop all 9 tech logos as fast as you can. Avoid the legacy bubbles (+2s).",
    },
    bugs: {
      title: "Bug Squash",
      how: "Squash bugs, spare passing tests. Red critical bugs are worth 3, flaky ones flicker. Chain hits for combos. Keys 1–9 work too.",
    },
    match: {
      title: "Stack Match",
      how: "Match each logo with its name. You get a 1.5s peek first. ★★★ for 8 moves or fewer.",
    },
    vulns: {
      title: "Patch the Vulns",
      how: "Click vulnerable packages to upgrade them before they're exploited. Critical ones are fast. Major bumps need a second click. Keys 1–9 work too.",
    },
    type: {
      title: "Type the Command",
      how: "Type 3 commands exactly, from easy to hard. Speed and accuracy count.",
    },
  } satisfies Record<GameId, { title: string; how: string }>,

  // Shown when a logo is popped / matched. Sourced from the timeline + expertise above.
  facts: {
    React: "React: SPAs at NC DHHS, Morgan Stanley & Cognizant",
    "Node.js": "Node.js: APIs at NC DHHS & Morgan Stanley",
    AWS: "AWS: Certified Solutions Architect; ECS, CodePipeline, CloudWatch",
    GraphQL: "GraphQL: Spring Boot GraphQL APIs at Cognizant",
    Docker: "Docker: containerised CI/CD at Cognizant",
    TypeScript: "TypeScript: this site is written in it",
    Java: "Java: Spring Boot services at Cognizant",
    Spring: "Spring Boot: GraphQL APIs at Cognizant",
    Angular: "Angular: responsive enterprise SPAs",
  } as Record<string, string>,

  // Versions are made up for the game.
  packages: [
    { name: "react", version: "18.2.0" },
    { name: "express", version: "4.18.2" },
    { name: "lodash", version: "4.17.20" },
    { name: "axios", version: "1.6.0" },
    { name: "graphql", version: "16.8.0" },
    { name: "pg", version: "8.11.0" },
    { name: "jsonwebtoken", version: "9.0.0" },
    { name: "multer", version: "1.4.5" },
    { name: "vite", version: "5.4.0" },
  ],

  // tier 1 = short (phones get tiers 1,1,2), 3 = long
  commands: [
    { cmd: "git status", tier: 1, explain: "Show what changed in the working tree", output: ["On branch main", "nothing to commit, working tree clean"] },
    { cmd: "npm ci", tier: 1, explain: "Clean, reproducible install from the lockfile", output: ["added 312 packages in 4s", "found 0 vulnerabilities"] },
    { cmd: "aws s3 ls", tier: 1, explain: "List your S3 buckets", output: ["2026-11-19 portfolio-assets", "2026-11-19 file-uploads"] },
    { cmd: "git pull --rebase", tier: 2, explain: "Fetch, then replay your commits on top", output: ["Successfully rebased and updated refs/heads/main."] },
    { cmd: "npm run deploy", tier: 2, explain: "Build the site and publish it", output: ["> vite build", "✓ built in 0.8s", "Published 🚀"] },
    { cmd: "kubectl get pods", tier: 2, explain: "List running pods in the cluster", output: ["NAME        READY   STATUS    RESTARTS", "api-7d9f    1/1     Running   0"] },
    { cmd: "docker compose up -d", tier: 3, explain: "Start every service in the background", output: ["✔ Container db   Started", "✔ Container api  Started"] },
    { cmd: "git commit -m \"fix: null check\"", tier: 3, explain: "Commit staged changes with a message", output: ["[main a1b2c3d] fix: null check", " 1 file changed, 2 insertions(+)"] },
    { cmd: "npm audit fix --omit=dev", tier: 3, explain: "Patch vulnerable production dependencies", output: ["fixed 3 of 3 vulnerabilities", "found 0 vulnerabilities"] },
  ],

  badges: [
    { id: "player-one", icon: "🕹️", title: "Player One", how: "Finish any game" },
    { id: "full-stack", icon: "🧩", title: "Full-Stack Gamer", how: "Finish all 5 games" },
    { id: "quick-draw", icon: "⚡", title: "Quick Draw", how: "Logo Pop in under 5s" },
    { id: "clean-code", icon: "🧹", title: "Clean Code", how: "Bug Squash: 10+ squashed, 0 tests broken" },
    { id: "photographic", icon: "🧠", title: "Photographic Memory", how: "Stack Match in 7 moves or fewer" },
    { id: "zero-day", icon: "🛡️", title: "Zero-Day Hero", how: "Patch the Vulns with nothing exploited" },
    { id: "touch-typist", icon: "⌨️", title: "Touch Typist", how: "Type the Command: 50+ WPM at 100% accuracy" },
  ],

  cta: { text: "Enjoyed that? The serious part:", resume: "My resume", contact: "Contact me" },
  share: (score: string, game: string) => `I scored ${score} in ${game} on Sujith Sadineni's portfolio 🎮`,

  konami: {
    message: "🎮 Konami code unlocked! You clearly explore the details. Let's talk.",
    consoleHint:
      "👋 Curious developer? Try the Konami code on this page: ↑ ↑ ↓ ↓ ← → ← → B A",
  },
};

export const contact = {
  heading: "📬 Contact Me",
  fields: { name: "Your Name", email: "Your Email", subject: "Subject", message: "Message" },
  send: "Send Message",
  sending: "Sending…",
  success: "Message sent successfully!",
  error: "Something went wrong. Please try again.",
};

export const footer = {
  social: { instagram: "Instagram", email: "Email", github: "GitHub", linkedin: "LinkedIn", youtube: "YouTube", reddit: "Reddit" },
  copyright: (year: number) => `© ${year} ${about.name}`,
  techUsed:
    "🛠 Built with React 19, confetti, Vite, TypeScript, EmailJS, SCSS, and GitHub Pages",
};

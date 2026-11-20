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

export type Project = {
  title: string;
  description: string;
  tags: string[];
  repo?: string;
  live?: string;
  status?: string;
};

// Order matters: first item is the lead project.
export const projects: Project[] = [
  {
    title: "cashflow",
    status: "Featured",
    description:
      "A household expense tracker that runs entirely on your own machine. Reads bank PDFs from nine banks, queues rows for review with duplicate detection, and checks every statement against its printed balances to the cent.",
    tags: ["React", "Vite", "Tailwind", "Node.js", "Express", "PostgreSQL", "Claude API"],
    repo: "https://github.com/sujithsadineni/cashflow",
    live: "https://sujithsadineni.github.io/cashflow/",
  },
  {
    // TODO: final name + repo link once published
    title: "Dependency Watch",
    status: "In progress",
    description:
      "Automatic vulnerability-fix (VF) detection and new-version upgrade detection for npm projects: reads npm audit, finds the n-1 stable version for each package, and proposes the upgrade.",
    tags: ["Node.js", "npm audit", "Automation"],
  },
  {
    title: "AWS S3 File Upload",
    description:
      "Full-stack file upload app: React + Apollo Client front end, an Apollo Server GraphQL API on Express with multipart uploads, Knex over PostgreSQL, and file storage in an AWS S3 bucket.",
    tags: ["React", "Apollo", "GraphQL", "Express", "PostgreSQL", "AWS S3"],
    repo: "https://github.com/sujithsadineni/File-Upload-S3",
  },
  {
    title: "MyPosts.com",
    description:
      "Posts platform API built with Apollo Server on Express, Knex migrations over PostgreSQL, and bcrypt + JWT authentication and authorization.",
    tags: ["Apollo Server", "GraphQL", "Knex", "PostgreSQL", "JWT"],
    repo: "https://github.com/sujithsadineni/Myposts.com",
  },
  {
    title: "Posts Full-Stack App",
    description:
      "Interactive posts app with a React + Ant Design client and an Express GraphQL server using Sequelize on MySQL, with JWT-based login.",
    tags: ["React", "Ant Design", "Express", "GraphQL", "Sequelize", "MySQL"],
    repo: "https://github.com/sujithsadineni/Full-Stack",
  },
  {
    title: "Portfolio Website",
    description:
      "This site: React 19, TypeScript, Vite and SCSS with light/dark themes, deployed to GitHub Pages.",
    tags: ["React", "TypeScript", "Vite", "SCSS"],
    repo: "https://github.com/sujithsadineni/Portfolio",
    live: "https://sujithsadineni.github.io/Portfolio/",
  },
  {
    title: "Lifestyle Store",
    description:
      "E-commerce store with sign-up/login, product catalogue, cart and checkout, built in PHP with a MySQL database.",
    tags: ["PHP", "MySQL", "Bootstrap"],
    repo: "https://github.com/sujithsadineni/internsala_final_project",
  },
  {
    // TODO: no public repo — add link or replace
    title: "House Renting Website",
    description:
      "A replica of Sulekha.com with a clean UI and a more advanced search algorithm.",
    tags: [],
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

export const footer = {
  techUsed:
    "🛠 Built with React 19, confetti, Vite, TypeScript, EmailJS, SCSS, and GitHub Pages",
};

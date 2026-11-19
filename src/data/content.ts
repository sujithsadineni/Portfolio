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
  short: string;
  details: string[];
};

export const expertise = {
  subtitle:
    "Based on 7+ years of experience as a Full-Stack Developer with React, Node, Java, SpringBoot & AWS.",
  items: [
    {
      title: "Frontend Development",
      icons: [FaReact, FaAngular, RiNextjsFill],
      short: "React, Angular, Next.js, Redux, Hooks, UI/UX Design",
      details: [
        "Developed responsive SPAs using React.js, Angular, and Next.js.",
        "Leveraged Redux, React Hooks, and SCSS/Tailwind for modular, accessible UI.",
        "Optimized load time via lazy loading, virtual DOM, and bundle splitting.",
        "Collaborated with UI/UX teams to ensure WCAG compliance and mobile responsiveness.",
        "Delivered testable components with RTL, Jest, and Cypress.",
      ],
    },
    {
      title: "Backend Development",
      icons: [FaNodeJs, FaJava],
      short: "Node.js, Java, Express, Spring Boot, GraphQL, REST APIs",
      details: [
        "Built secure and scalable REST/GraphQL APIs using Node.js, Express, Java, and Spring Boot.",
        "Integrated Prisma, JPA, and Hibernate for ORM-based database access.",
        "Applied JWT/OAuth for stateless authentication and secure API layers.",
        "Developed custom middleware for logging, validation, and versioning.",
        "Ensured performance via async patterns, schema optimization, and SQL tuning.",
      ],
    },
    {
      title: "Cloud & DevOps",
      icons: [FaAws, SiApachekafka],
      short: "AWS, ECS, EC2, S3, CI/CD, Secrets Manager",
      details: [
        "Deployed microservices using ECS, EC2, and Docker.",
        "Automated CI/CD pipelines via Jenkins, GitHub Actions, and AWS CodePipeline.",
        "Secured configuration using AWS Secrets Manager and IAM roles.",
        "Provisioned scalable infrastructure with VPC, S3, CloudWatch, and ELB.",
        "Implemented centralized monitoring using CloudWatch and ELK Stack.",
      ],
    },
    {
      title: "Containerization",
      icons: [FaDocker, FaJenkins],
      short: "Docker, Kubernetes, EKS, CI/CD",
      details: [
        "Containerized frontend and backend apps using Docker.",
        "Managed deployments using Kubernetes and AWS EKS clusters.",
        "Created Dockerfiles and Helm charts for efficient orchestration.",
        "Integrated containers into CI/CD workflows for consistent delivery.",
        "Improved portability, rollback strategies, and environment parity.",
      ],
    },
    {
      title: "Performance Optimization",
      icons: [FaBolt],
      short: "Lazy loading, useCallback, indexing, tuning",
      details: [
        "Used code-splitting, lazy loading, and memoization for frontend performance.",
        "Optimized backend using indexed SQL queries and tuned database schema.",
        "Integrated Kafka for async processing and improved throughput.",
        "Monitored app health with Prometheus and Grafana dashboards.",
        "Resolved bottlenecks in core banking and analytics modules.",
      ],
    },
    {
      title: "Testing & Quality",
      icons: [FaVial],
      short: "Jest, RTL, JUnit, Mockito, Cypress, Sonar",
      details: [
        "Ensured frontend quality with Jest, RTL, and Cypress.",
        "Wrote robust backend tests using JUnit and Mockito.",
        "Maintained high test coverage across services and components.",
        "Used SonarQube for static analysis and enforcing code standards.",
        "Practiced TDD, peer reviews, and tested real-world user flows.",
      ],
    },
  ] as Expertise[],
};

export const timeline = [
  {
    date: "May 2025 – Present",
    title: "Senior Full-Stack Developer",
    company: "NC DHHS",
    logo: asset("nc-state.jpg"),
    description:
      "Designed SPAs with React, Hooks, and Redux. Built scalable APIs with Node.js/Express, implemented JWT auth, CI/CD using Jenkins, AWS ECS, and monitored apps with CloudWatch and ELK Stack.",
  },
  {
    date: "Dec 2022 – May 2025",
    title: "Senior Full-Stack Developer",
    company: "Morgan Stanley",
    logo: asset("morgan.jpeg"),
    description:
      "Delivered secure microservices using Node.js, Prisma ORM, and PostgreSQL. Led CI/CD workflows via Jenkins and AWS CodePipeline. Maintained SPAs using React, SASS, and RTL.",
  },
  {
    date: "2022 – 2024",
    title: "Master's In Computer Science",
    company: "Southern Arkansas University",
    logo: asset("sau.png"),
    description:
      "Completed MS in Computer Science. Built full-stack apps with React, GraphQL, Node.js. Improved backend performance with Express middleware and PostgreSQL indexing.",
  },
  {
    date: "Apr 2019 – Aug 2022",
    title: "Full-Stack Developer",
    company: "Cognizant",
    logo: asset("Cognizant-Logo.png"),
    description:
      "Developed scalable SPAs using React.js and Hooks. Built GraphQL APIs with Java Spring Boot. Focused on accessibility, modular styling (SCSS), and CI/CD with Docker & Jenkins.",
  },
  {
    date: "2015 – 2019",
    title: "B.E in Computer Science",
    company: "St Joseph's College Of Engineering",
    logo: asset("st.joseph.logo.png"),
    description:
      "Graduated in Computer Science. Gained strong foundation in Java, OOP, data structures, and participated in web and full-stack development internships.",
  },
];

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

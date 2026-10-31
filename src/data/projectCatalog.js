import { projects as originalProjects } from "./siteData.js";
import pcecInventory from "./pcecFeatureInventory.json" with { type: "json" };

// Reviewed against the owner's 21 GitHub repositories and local project folders,
// 19 October 2026. Repository visibility is a snapshot, not a runtime API call.
// Only public repositories have outbound source links.
const repo = (name, visibility = "private") => ({
  name,
  visibility,
  ...(visibility === "public"
    ? { url: `https://github.com/N3RO-O/${name}` }
    : {}),
});
const gallery = (label, images) => ({
  label,
  images: images.map(([src, caption]) => ({ src, caption })),
});

const originalSources = {
  "church-times-up": {
    repository: repo("ChurchTimesUp"),
    category: "desktop",
    status: "Desktop v1.6.2",
    source: "GitHub + local",
    variants: [
      "Windows desktop",
      "Stage and OBS outputs",
      "Earlier StageTimer archive",
    ],
  },
  kiddytrack: {
    repository: repo("kiddytrack"),
    category: "web",
    status: "Capstone project",
    source: "GitHub",
  },
  philrads: {
    repository: repo("Philrads-Asset-Inventory"),
    category: "web",
    status: "Internal system",
    source: "GitHub",
  },
  "philrads-ims": {
    category: "web",
    status: "Internal system",
    source: "Portfolio + local",
    variants: [
      "Inventory application",
      "Shipment and inventory working materials",
    ],
  },
  nerovault: {
    repository: repo("Nerovault", "public"),
    category: "web",
    status: "Local-first PWA",
    source: "GitHub + local",
  },
};

const additions = [
  {
    id: "myaipeeps",
    title: "MyAIpeeps",
    subtitle: "Desktop product · AI agent workspace",
    category: "desktop",
    year: "2026",
    repository: repo("MyAIpeeps"),
    source: "GitHub + local",
    status: "In development",
    selected: true,
    description:
      "A desktop workspace for coordinating a small team of AI coding agents, with a manager, live worker terminals, a task board, shared memory, and a pixel-art office.",
    tech: ["Electron", "React", "TypeScript", "SQLite", "PixiJS"],
    role: "Product customization and development of the MyAIpeeps experience, building on the MIT-licensed Munder Difflin project by Chaitanya Giri and contributors.",
    features: [
      "Manager and worker agent workflow with live terminals",
      "Task board, shared memory, and activity views",
      "Local voice transcription and meeting notes",
      "Light and dark office interfaces",
    ],
    attribution:
      "Built on Munder Difflin by Chaitanya Giri and contributors. Upstream MIT attribution is retained in the source project.",
    variants: ["Desktop office workspace", "Light and dark office interfaces"],
    galleries: [
      gallery("Office interface", [
        [
          "/assets/projects/myaipeeps/office-dark.png",
          "MyAIpeeps — dark office interface with the manager and terminal panel.",
        ],
        [
          "/assets/projects/myaipeeps/office-light.png",
          "MyAIpeeps — light office interface.",
        ],
      ]),
    ],
  },
  {
    id: "datemyldr",
    title: "DateMyLDR",
    subtitle: "Interactive world · A little closer, together",
    category: "web",
    year: "2026",
    repository: repo("DateMyLDR"),
    source: "GitHub + local",
    status: "MVP",
    selected: true,
    description:
      "A cozy pixel-art world for long-distance couples: private two-person rooms, shared movement, real-time chat, ambient sound, and small games made for two.",
    tech: ["Next.js", "React", "TypeScript", "Supabase", "Tailwind CSS"],
    features: [
      "Customizable layered avatars and six illustrated places",
      "Private invitations and two-person date rooms",
      "Real-time chat, presence, movement, and emotes",
      "Draw & Guess, Couple Quiz, Truth or Dare, and Tic-Tac-Toe",
    ],
    galleries: [
      gallery("Environment artwork", [
        [
          "/assets/projects/datemyldr/enchanted-forest.webp",
          "DateMyLDR — enchanted forest environment artwork; not a screenshot of the interface.",
        ],
        [
          "/assets/projects/datemyldr/rooftop-stars.webp",
          "DateMyLDR — rooftop under the stars environment artwork.",
        ],
      ]),
    ],
  },
  {
    id: "pcec-connect",
    title: "PCEC Connect",
    subtitle: "Community platform · Member experience",
    category: "web",
    year: "2026",
    repository: repo("pcec-connect-pwa"),
    source: "GitHub + local",
    status: "1.1.11 · Testing release",
    selected: true,
    description:
      "An installable community platform for the Philippine Council of Evangelical Churches: member accounts, church news, events, social feeds, private conversations, prayer, QR giving and administration in one responsive app.",
    tech: ["TypeScript", "PWA", "Supabase", "PostgreSQL", "Realtime", "Playwright"],
    liveUrl: "https://pcec-connect.vercel.app/",
    documentationUrl: "https://update-pcec-app.vercel.app/documentation.html",
    problem: "Members and administrators need one place for church information and community activity, with clear privacy boundaries. Giving also has to work through an existing Surgebox QR without access to its payment API.",
    solution: "Separate member and administrator journeys, enforce permissions in PostgreSQL, keep private media behind signed access, and record donor reports independently from confirmed receipts. The supplied bank QR stays usable while finance reconciles the reference against the actual payment record.",
    role: "Product requirements, responsive interface, TypeScript application, Supabase data and access rules, testing, deployment and technical handover documentation.",
    features: pcecInventory.current.map(feature => feature.name),
    featureGroups: pcecInventory.groups,
    futureFeatures: pcecInventory.future,
    statusNote:
      "Implemented features have isolated test evidence. Real email delivery, bank reconciliation, administrator MFA, backup restoration and current physical-device acceptance remain launch gates. A bank reference alone does not confirm payment. Gallery captures use isolated sample data; no real member records or receipts are shown.",
    galleries: [
      gallery("Member app", [
        ["/assets/projects/pcec-connect/home-1440.jpg", "Actual home interface · isolated sample backend · desktop."],
        ["/assets/projects/pcec-connect/community-1440.jpg", "Actual community feed · isolated sample members and posts."],
        ["/assets/projects/pcec-connect/new-group-390.jpg", "Actual friend picker for a private group · isolated sample friend."],
        ["/assets/projects/pcec-connect/media-viewer-1440.jpg", "Actual media viewer with previous/next controls · bundled artwork as sample items."],
        ["/assets/projects/pcec-connect/donate-390.jpg", "Actual giving screen using the supplied Surgebox QR · no payment performed."],
      ]),
      gallery("Accounts & mobile", [
        ["/assets/projects/pcec-connect/login-390.jpg", "Actual white and blue PCEC login on a phone-sized viewport."],
        ["/assets/projects/pcec-connect/signup-390.jpg", "Actual registration form · no account submitted."],
        ["/assets/projects/pcec-connect/home-768.jpg", "Actual tablet layout · isolated sample content."],
        ["/assets/projects/pcec-connect/profile-390.jpg", "Actual established-member profile · isolated sample account."],
        ["/assets/projects/pcec-connect/settings-390.jpg", "Actual appearance, privacy and account settings · isolated sample account."],
      ]),
      gallery("Administration", [
        ["/assets/projects/pcec-connect/admin-1440.jpg", "Actual administrator dashboard · isolated sample backend."],
        ["/assets/projects/pcec-connect/admin-members-1440.jpg", "Actual member management table · isolated sample accounts."],
        ["/assets/projects/pcec-connect/admin-donation-analytics-1440.jpg", "Actual donation analytics empty state · no provider connection or real transactions."],
      ]),
    ],
    variants: [
      "Current member PWA",
      "Earlier PWA workspace copies",
      "Design previews and supporting guides",
    ],
  },
  {
    id: "philrads-portal",
    title: "PHILRADS Staff Portal",
    subtitle: "Operations platform · Staff workspace",
    category: "web",
    year: "2026",
    repository: repo("PHILRADS-Portal", "public"),
    source: "GitHub + local",
    status: "Milestone 1",
    selected: true,
    description:
      "An installable staff operations portal for PHILRADS, with a dashboard, navigation across nine modules, and a foundation for staff authentication and document workflows.",
    tech: ["React", "TypeScript", "Vite", "Tailwind CSS", "Supabase"],
    features: [
      "Responsive home dashboard and nine-module navigation",
      "PWA installation, offline shell, and update handling",
      "Database schema and role-based access policies",
      "Prepared document-upload boundary for Google Drive",
    ],
    statusNote:
      "Milestone 1 includes the dashboard and application foundation. Eight other modules are placeholders; unconnected dashboards use labelled sample data.",
  },
  {
    id: "kiddytrack-cpic",
    title: "KiddyTrack / CPIC",
    subtitle: "Education · School monitoring edition",
    category: "web",
    repository: repo("kiddytrack-CPIC", "public"),
    source: "GitHub",
    status: "Public source",
    description:
      "The CPIC edition of KiddyTrack, with teacher, parent, and principal dashboards for pupil records, attendance, scores, lesson approvals, messaging, and reports.",
    tech: ["PHP", "MySQL", "JavaScript", "CSS"],
    features: [
      "Role-specific school dashboards",
      "Pupil attendance and score recording",
      "Lesson-plan submission and approval",
      "Messages, notifications, and report generation",
    ],
  },
  {
    id: "reportly",
    title: "Reportly",
    subtitle: "Productivity · Time tracking & reports",
    category: "web",
    repository: repo("reportly-app", "public"),
    source: "GitHub",
    status: "Public source",
    description:
      "A mobile-first time-reporting application for daily hours, task entries, holiday-aware next-day entries, total hours, and reporting statistics.",
    tech: ["React", "Vite", "Supabase", "JavaScript"],
    features: [
      "Create reports and record daily work",
      "Track tasks, hours, and holidays",
      "Automatic next-day entries",
      "Responsive reporting and statistics views",
    ],
  },
  {
    id: "habit-ops",
    title: "Habit Ops",
    subtitle: "Productivity · A habit tracker with a little XP",
    category: "web",
    year: "2026",
    repository: repo("habit-ops"),
    source: "GitHub + local",
    status: "Local development",
    description:
      "A monthly habit tracker with spreadsheet-like check-ins, daily totals, progress charts, XP, levels, streaks, achievements, and reminder support.",
    tech: ["Next.js", "React", "TypeScript", "Supabase", "Web Push"],
    features: [
      "Monthly habit grid and daily check-ins",
      "Progress charts, streaks, XP, levels, and achievements",
      "Private per-user habit records",
      "Prepared push-notification reminder flow",
    ],
    statusNote:
      "The latest local status supersedes the older deployment note: its shared hosted backend was removed, so this entry is listed as local development.",
  },
  {
    id: "pcec-update",
    title: "PCEC Connect / Project Update",
    subtitle: "Web design · Leadership reporting",
    category: "web",
    year: "2026",
    repository: repo("update-pcec-app", "public"),
    source: "GitHub + local",
    status: "Project reporting site",
    description:
      "A leadership-facing project update site with a concise progress summary, readiness checklist, roadmap, architecture guide, and supporting reviews for PCEC Connect.",
    tech: ["HTML", "CSS", "JavaScript"],
    features: [
      "Progress summary and launch checklist",
      "Architecture and system guides",
      "Readiness reports and supporting review pages",
      "Install instructions and presentation assets",
    ],
    variants: [
      "Current project-update site",
      "Older 6 October website copy",
      "Earlier workspace named pcec-connect-pwa",
    ],
  },
  {
    id: "pcec-auth-prototype",
    title: "PCEC / Authentication Prototype",
    subtitle: "Prototype · API & Flutter screens",
    category: "web",
    source: "Local",
    status: "Prototype",
    description:
      "An early login and sign-up prototype pairing an Express API with SQLite, bcrypt password hashing, JWT sessions, and Flutter login/sign-up screens.",
    tech: ["Node.js", "Express", "SQLite", "JWT", "Flutter", "Dart"],
    features: [
      "Login and sign-up API",
      "Password hashing and token-based sessions",
      "Flutter login and registration screens",
      "Earlier backend and integration drafts",
    ],
  },
  {
    id: "ctu-publisher",
    title: "Church Time’s Up / Publisher",
    subtitle: "Internal tool · Product administration",
    category: "web",
    year: "2026",
    source: "Local",
    status: "Private local application",
    description:
      "A separate publisher administration application for Church Time’s Up, covering customer records, community discounts, license records, payment review, and audit history.",
    tech: ["Node.js", "Express", "MongoDB", "Supabase"],
    features: [
      "Administrator authentication and customer records",
      "Community discount review",
      "License issuance and revocation records",
      "Verified-payment administration and audit history",
    ],
    statusNote:
      "A local administration tool. Payment collection, branded email delivery, and desktop activation are not presented as shipped features.",
  },
  {
    id: "philrads-disaster-bot",
    title: "PHILRADS Disaster Monitor",
    subtitle: "Automation · Disaster information routing",
    category: "bot",
    year: "2026",
    repository: repo("philrads-disaster-bot"),
    source: "GitHub + local",
    status: "Bot project",
    description:
      "A Discord monitoring bot that checks weather, earthquake, and disaster-related sources, filters relevant items, and routes source-linked updates to dedicated channels.",
    tech: ["Node.js", "JavaScript", "Discord", "RSS"],
    features: [
      "Separate routing for agency updates and disaster news",
      "Relevance and priority filtering",
      "Queued delivery, retries, and deduplication",
      "Source-health analytics and daily summaries",
    ],
  },
  {
    id: "philrads-rss-free",
    title: "PHILRADS Monitor / Direct Edition",
    subtitle: "Automation · RSS-free monitoring variant",
    category: "bot",
    year: "2026",
    source: "Local",
    status: "Local edition",
    description:
      "A direct-monitoring edition of the PHILRADS disaster bot, combining official agency sources, publisher feeds, and limited public social-page collection.",
    tech: ["Node.js", "JavaScript", "Discord", "Telegram"],
    features: [
      "Direct-source monitoring adapters",
      "Source pictures when available",
      "Discord routing and optional Telegram delivery",
      "Persistent queues, source health, and deduplication",
    ],
    statusNote:
      "Collection intervals and limited public-page visibility do not guarantee complete or instant disaster coverage.",
  },
  {
    id: "philrads-best-time",
    title: "PHILRADS Best-Time Bot",
    subtitle: "Analytics · Social publishing insights",
    category: "bot",
    source: "Local",
    status: "Local bot",
    description:
      "A Discord analytics bot that turns Meta post exports into day-and-hour engagement rankings, chart images, content suggestions, and a seven-day posting plan.",
    tech: ["Python", "discord.py", "pandas", "matplotlib"],
    features: [
      "CSV-based engagement analysis",
      "Day and hour rankings with bar charts",
      "Seven-day posting-plan cards",
      "Content-type suggestions and date-range controls",
    ],
  },
  {
    id: "philrads-feed-bridge",
    title: "PHILRADS / Feed Bridge",
    subtitle: "Integration · RSS-Bridge workspace",
    category: "bot",
    source: "Local",
    status: "Upstream integration",
    description:
      "A local RSS-Bridge integration workspace used in the PHILRADS monitoring toolchain to generate feeds for websites without their own RSS output.",
    tech: ["PHP", "RSS", "RSS-Bridge"],
    features: ["Website-to-feed conversion", "Local PHP integration workspace"],
    attribution:
      "RSS-Bridge is an upstream open-source application by the RSS-Bridge project. This entry describes the local integration, not authorship of RSS-Bridge.",
  },
  {
    id: "shaina-portfolio",
    title: "Shaina / Personal Portfolio",
    subtitle: "Web design · Hospitality portfolio",
    category: "web",
    repository: repo("shainaportfolio", "public"),
    source: "GitHub",
    status: "Public source",
    description:
      "A one-page hospitality portfolio for Shaina Margaret Tejada, with résumé content, bordeaux and brass tones, editorial serif typography, and a reservation-ticket-inspired contact section.",
    tech: ["HTML", "CSS", "JavaScript"],
    features: [
      "Responsive one-page résumé and portfolio",
      "Portrait, skills, experience, and education",
      "Mobile navigation and scroll-reveal details",
      "Downloadable résumé and contact section",
    ],
  },
  {
    id: "nero-portfolio",
    title: "Nero / This Portfolio",
    subtitle: "Identity · Developer portfolio",
    category: "web",
    year: "2026",
    repository: repo("jonahdev", "public"),
    source: "GitHub + local",
    status: "Current redesign",
    description:
      "The portfolio you’re exploring: the Nero identity of Jonah Mark Tabuzo, with project stories, photography, field notes, smooth scrolling and pixel-type motion.",
    tech: ["React", "Vite", "CSS", "JavaScript"],
    features: [
      "Responsive layouts with a pinned work reel and particle hero",
      "Project case studies and a searchable complete index",
      "Photography, video, and writing",
      "Accessible dialogs and a press-and-hold résumé download",
    ],
  },
  {
    id: "github-profile",
    title: "Nero / GitHub Profile",
    subtitle: "Identity · Profile README",
    category: "experiment",
    repository: repo("N3RO-O", "public"),
    source: "GitHub",
    status: "Profile repository",
    description:
      "The GitHub profile repository presenting Jonah’s development background, project highlights, technical toolkit, and ways to connect.",
    tech: ["Markdown", "SVG"],
    features: [
      "Profile banner and developer introduction",
      "Featured projects and technical toolkit",
      "Links to case studies and contact channels",
    ],
  },
];

export const projectCatalog = [
  ...originalProjects.map((project) => ({
    ...project,
    ...originalSources[project.id],
    selected: true,
  })),
  ...additions,
].map((project) => ({ galleries: [], features: [], ...project }));

export const selectedProjects = projectCatalog.filter(
  (project) => project.selected,
);
export const repositoryCount = projectCatalog.filter(
  (project) => project.repository,
).length;
export const catalogCategories = [
  ["all", "All projects"],
  ["web", "Web"],
  ["desktop", "Desktop"],
  ["bot", "Bots & automation"],
  ["experiment", "Experiments"],
];

export const site = {
  url: 'https://jonahdevportfolio.vercel.app',
  name: 'Jonah Tabuzo',
  title: 'Full-Stack Web Developer & Visual Creator',
  tagline:
    'Building practical web systems and telling stories through visuals | Graduating 2026',
  location: 'Virac, Catanduanes, Philippines',
  email: 'jonahmarkt@gmail.com',
  phone: '+63 928 574 4262',
  cvUrl: '/assets/jonah-tabuzo-cv.pdf',
  photo: '/assets/jonah-photo.jpg?v=2',
  availability:
    'Open to OJT & Entry-Level — IT Support, Web Development, Systems Analysis',
  socials: [
    { label: 'GitHub', href: 'https://github.com/N3RO-O', handle: 'N3RO-O' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/jonahtabuzo' },
    { label: 'Website', href: 'https://pixodeph.vercel.app/' },
    { label: 'Discord', href: 'https://discord.gg/HpUJFCTX33' },
  ],
  formspree: 'https://formspree.io/f/xojnyrwr',
  githubUser: 'N3RO-O',
}

export const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'creative', label: 'Creative' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
]

export const about = {
  paragraphs: [
    "I'm Jonah Tabuzo — a web developer and Information Systems student based in Virac, Catanduanes, Philippines, graduating in 2026. I build production-ready web systems from the ground up and produce photo & video content that communicates clearly.",
    'As Lead Programmer on my capstone (KiddyTrack) and developer on OJT systems at PHILRADS, I translate real stakeholder needs into dashboards non-technical users can navigate without training. I learn fast, document well, and care about impact over feature count.',
    "I'm seeking OJT and entry-level roles in IT Support, Web Development, and Systems Analysis — where I can ship reliable tools and grow with a team that values craft.",
    "Outside code, I run Nero's Cult (Discord gaming community), shoot events for local businesses, and contribute QA work at PIXODE Philippines — a dev collective building practical digital tools for underserved communities.",
  ],
  highlights: [
    { icon: 'code', label: 'Lead Programmer', desc: 'KiddyTrack Capstone 2024' },
    { icon: 'camera', label: 'Visual Creator', desc: 'Photo, video & editing' },
    { icon: 'users', label: 'Team Player', desc: 'Stakeholder-focused delivery' },
    { icon: 'zap', label: 'Quick Learner', desc: 'React, Tailwind, modern stack' },
  ],
}

export const skillCategories = [
  {
    title: 'Frontend',
    icon: 'layout',
    skills: ['React', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Responsive UI'],
  },
  {
    title: 'Backend',
    icon: 'server',
    skills: ['PHP', 'MySQL', 'AJAX', 'REST APIs', 'Session Auth', 'CRUD Systems'],
  },
  {
    title: 'Tools & Methods',
    icon: 'wrench',
    skills: ['Git', 'GitHub', 'Systems Analysis', 'SQL', 'Database Design', 'Basic Networking'],
  },
  {
    title: 'Professional',
    icon: 'briefcase',
    skills: [
      'Project Management',
      'Stakeholder Engagement',
      'Communication',
      'Documentation',
      'QA & Testing',
    ],
  },
  {
    title: 'Creative',
    icon: 'camera',
    skills: ['Photography', 'Videography', 'Video Editing', 'Visual Storytelling'],
  },
  {
    title: 'Currently Learning',
    icon: 'book',
    skills: ['TypeScript', 'Node.js', 'Laravel', 'C++ / C#'],
    accent: true,
  },
]

export const projects = [
  {
    id: 'kiddytrack',
    title: 'KiddyTrack',
    subtitle: 'Capstone · Lead Programmer',
    year: '2024',
    accent: '#e8b84b',
    description:
      'Role-based academic monitoring platform for teachers, parents, and school administrators — built from scratch for active classroom use.',
    problem:
      'Schools relied on manual grade tracking and fragmented communication between teachers, parents, and principals.',
    solution:
      'Designed separate dashboards per role with a relational database schema and academic tracking modules — grade data presented in human-readable views, not raw tables.',
    role: 'Lead Programmer — full-stack development, database design, UI/UX for non-technical users.',
    tech: ['PHP', 'MySQL', 'JavaScript', 'HTML/CSS', 'Systems Design'],
    metrics: [
      '3 role-based dashboards (Teacher, Parent, Principal)',
      'Zero training required for end users in pilot feedback',
      'Full academic tracking module from schema to UI',
    ],
    features: [
      'Separate dashboards for teachers, parents, and principals',
      'Relational database schema designed from scratch',
      'Grade tracking presented clearly for non-technical users',
    ],
    links: {
      live: 'https://kiddytrack.page.gd',
      github: null,
    },
    galleries: [
      {
        label: 'Teacher Dashboard',
        images: Array.from({ length: 11 }, (_, i) => ({
          src: `/assets/projects/kiddytrack/teacher pov/ss${i + 1}.png`,
          caption: `Teacher — view ${i + 1}`,
        })),
      },
      {
        label: 'Parent Dashboard',
        images: Array.from({ length: 5 }, (_, i) => ({
          src: `/assets/projects/kiddytrack/parent pov/ss${i + 1}.png`,
          caption: `Parent — view ${i + 1}`,
        })),
      },
      {
        label: 'Principal Dashboard',
        images: Array.from({ length: 9 }, (_, i) => ({
          src: `/assets/projects/kiddytrack/principal pov/ss${i + 1}.png`,
          caption: `Principal — view ${i + 1}`,
        })),
      },
    ],
  },
  {
    id: 'philrads',
    title: 'PHILRADS Asset Database System',
    subtitle: 'OJT Project 1',
    year: '2024',
    accent: '#800000',
    description:
      'Role-based asset inventory and management system for PHILRADS — tracking equipment, resources, and records with full CRUD functionality.',
    problem:
      'Manual spreadsheets made asset tracking slow, error-prone, and inaccessible to staff in the field.',
    solution:
      'Built a responsive web system with Admin and Staff roles, full CRUD operations, and dashboards scoped to each role\'s needs.',
    role: 'Full-stack developer — database, backend logic, and responsive UI.',
    tech: ['PHP', 'MySQL', 'JavaScript', 'CSS', 'Role-Based Access'],
    metrics: [
      'Reduced manual inventory lookup time significantly',
      'Full CRUD for asset records',
      'Separate Admin & Staff dashboards',
    ],
    features: [
      'Add, view, edit, and delete asset records',
      'Role-based access control (Admin / Staff)',
      'Clean responsive interface for office and field use',
    ],
    links: {
      live: 'https://assetphilrads.page.gd/Philrads/',
      liveSecondary: 'https://assetphilrads.page.gd/Philrads/asset_detail.php?id=10',
      liveSecondaryLabel: 'Sample asset record',
      github: 'https://github.com/N3RO-O/Philrads-Asset-Inventory',
    },
    galleries: [
      {
        label: 'Admin Dashboard',
        images: Array.from({ length: 17 }, (_, i) => ({
          src: `/assets/projects/Asset Database System/admin/ss${i + 1}.png`,
          caption: `Admin — view ${i + 1}`,
        })),
      },
      {
        label: 'Staff Dashboard',
        images: Array.from({ length: 12 }, (_, i) => ({
          src: `/assets/projects/Asset Database System/staff/ss${i + 1}.png`,
          caption: `Staff — view ${i + 1}`,
        })),
      },
    ],
  },
  {
    id: 'philrads-ims',
    title: 'PHILRADS Inventory Management System (IMS)',
    subtitle: 'OJT Project · PHILRADS',
    year: '2024–2025',
    accent: '#4a9eff',
    description:
      'Web-based inventory management system built during OJT at PHILRADS — centralizing stock, asset records, and operational data in one platform staff can use daily.',
    problem:
      'Inventory and asset data lived in disconnected spreadsheets and manual logs, slowing lookups and increasing record errors.',
    solution:
      'Developed the IMS web portal with structured modules for inventory tracking, integrated with the asset database for end-to-end visibility from dashboard to individual asset records.',
    role: 'Full-stack developer — requirements gathering, database design, PHP backend, and user-facing modules.',
    tech: ['PHP', 'MySQL', 'JavaScript', 'HTML/CSS', 'Bootstrap'],
    metrics: [
      'Live IMS portal deployed for PHILRADS staff',
      'Integrated asset detail views with inventory workflows',
      'Role-appropriate views for daily office operations',
    ],
    features: [
      'Centralized inventory management dashboard',
      'Asset record views with full detail pages',
      'Built for real OJT stakeholder workflows at PHILRADS',
      'Paired with the PHILRADS Asset Database module',
    ],
    links: {
      live: 'https://philrads-ims.page.gd/?i=1',
      liveSecondary: 'https://assetphilrads.page.gd/Philrads/asset_detail.php?id=10',
      liveSecondaryLabel: 'Asset detail view',
      github: 'https://github.com/N3RO-O/Philrads-Asset-Inventory',
    },
    galleries: [
      {
        label: 'Admin Dashboard',
        images: Array.from({ length: 6 }, (_, i) => ({
          src: `/assets/projects/Asset Database System/admin/ss${i + 1}.png`,
          caption: `IMS / Admin — view ${i + 1}`,
        })),
      },
      {
        label: 'Staff Views',
        images: Array.from({ length: 4 }, (_, i) => ({
          src: `/assets/projects/Asset Database System/staff/ss${i + 1}.png`,
          caption: `Staff — view ${i + 1}`,
        })),
      },
    ],
  },
]

export const experience = [
  {
    period: '2025',
    title: 'Samsung Product Promoter',
    company: "Alson's Trading · Virac",
    description:
      'Represented a global tech brand on the sales floor — built client relationships and transferable communication, persuasion, and customer-facing skills.',
  },
  {
    period: '2024 – Present',
    title: 'Quality Assurance Engineer',
    company: 'PIXODE Philippines',
    description:
      'QA for internal tools at a dev collective building practical digital tools for underserved communities across the Philippines.',
  },
  {
    period: '2020 – 2021',
    title: 'Administrative Support & Community Outreach',
    company: 'Provincial Government Office · Virac',
    description:
      'Data entry, document preparation, and correspondence. Streamlined workflows and maintained compliance under strict deadlines.',
  },
]

export const education = {
  degree: 'Bachelor of Science in Information Systems',
  school: 'Catanduanes State University',
  period: 'Expected 2026',
  details: [
    'Capstone Lead Programmer — KiddyTrack academic monitoring system',
    'OJT — PHILRADS IMS & Asset Database System (live deployments)',
    'HACK4GOV CTF 2023 Participant',
  ],
}

export const certifications = [
  {
    title: 'OJT Certificate',
    issuer: 'PHILRADS · On-the-Job Training',
    year: '2024–2025',
    image: '/assets/cert/tabuzo-certificate.png',
  },
  {
    title: 'Power BI Data Analytics',
    issuer: 'Professional Certification',
    year: '2025',
    image: '/assets/cert/power-bi.png',
  },
  {
    title: 'Certificate of Completion',
    issuer: 'Training & Development',
    year: '2025',
    image: '/assets/cert/certificate.png',
  },
  {
    title: 'HACK4GOV CTF 2023',
    issuer: 'Capture the Flag Participant',
    year: '2023',
    image: null,
  },
]

export const creative = {
  intro:
    'Beyond code, I shoot and edit — commercial photography, event coverage, and short-form video for local businesses in Catanduanes. The same eye for composition in a frame shapes how I design interfaces.',
  items: [
    { type: 'photo', src: '/assets/creative/photo-01.jpg', alt: 'Photography sample 1' },
    { type: 'photo', src: '/assets/creative/photo-02.jpg', alt: 'Photography sample 2' },
    { type: 'photo', src: '/assets/creative/photo-03.jpg', alt: 'Photography sample 3' },
    {
      type: 'video',
      src: '/assets/creative/your-video.mp4',
      poster: '/assets/creative/your-video-thumb.png',
      alt: 'Videography sample',
    },
  ],
}

export const testimonials = [
  {
    quote:
      'Jonah consistently delivered clean, well-structured code for our internal tools at PIXODE. He has a sharp eye for detail and an impressive ability to translate business requirements into working systems — fast.',
    name: 'PIXODE Philippines',
    role: 'Dev Org · Quality Assurance',
  },
  {
    quote:
      'Working with Jonah on the KiddyTrack project was seamless. He understood the needs of both teachers and parents immediately, and built dashboards that non-technical users could navigate without any training.',
    name: 'KiddyTrack Project',
    role: 'Academic Monitoring System · 2024',
  },
]

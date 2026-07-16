export const posts = [
  {
    slug: 'performant-visual-web-experiences-2026',
    title: 'Building Performant Visual Web Experiences in 2026',
    date: '2026-07-10',
    readingTime: '5 min read',
    excerpt:
      'How to ship sites that feel premium and fast at the same time — without a heavy framework or a 2MB JavaScript bundle.',
    tags: ['Performance', 'UX', 'Frontend'],
    body: [
      { type: 'p', text: 'A beautiful site that takes five seconds to become interactive is not a beautiful site. Performance and visual polish are not opposites — they are the same job seen from two angles. Here is the approach I use for portfolio and product sites in 2026.' },
      { type: 'h2', text: 'Ship less JavaScript' },
      { type: 'p', text: 'Most of the motion and micro-interactions people love can be done with CSS transitions and a single small animation library. You rarely need a full framework runtime just to fade in a card on scroll.' },
      { type: 'code', text: '/* scroll reveal without JS */\n.reveal { opacity: 0; transform: translateY(20px); transition: .5s ease; }\n.reveal.in { opacity: 1; transform: none; }' },
      { type: 'h2', text: 'Respect the user' },
      { type: 'p', text: 'Honor prefers-reduced-motion, keep tap targets large, and never let a decorative animation block the main thread. A site that is calm on low-power devices feels more premium, not less.' },
      { type: 'h2', text: 'Measure, then celebrate' },
      { type: 'p', text: 'Add lightweight analytics once the structure is solid. Watching a heatmap of what visitors actually click is far more useful than guessing which section to polish next.' },
    ],
  },
  {
    slug: 'local-first-apps-without-a-backend',
    title: 'Local-First Apps Without a Backend',
    date: '2026-06-22',
    readingTime: '4 min read',
    excerpt:
      'What I learned building Nerovault — a private budget tracker that keeps 100% of user data on the device.',
    tags: ['Architecture', 'PWA', 'Privacy'],
    body: [
      { type: 'p', text: 'Not every app needs a server. For personal tools — budgets, notes, habits — local-first is often the better default: no accounts, no database to secure, no monthly bill.' },
      { type: 'h2', text: 'Persistence is just the browser' },
      { type: 'p', text: 'localStorage (or IndexedDB for larger data) is enough for most cases. The trick is a clean data shape and a migration path so older saved data still loads after an update.' },
      { type: 'h2', text: 'Make it installable' },
      { type: 'p', text: 'A manifest plus a service worker turns a web page into an app that opens offline. For a tool people use daily, that difference matters more than any single feature.' },
    ],
  },
]

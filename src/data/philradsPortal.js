// PHILRADS Staff Portal case study. Captions follow the screenshot notes made
// from the production build, October 2026. Every capture uses invented sample
// data: no real beneficiaries, staff, donors or funding records appear.
const dir = "/assets/projects/philrads-portal";
const shot = (name, caption) => ({
  src: `${dir}/d-${name}.webp`,
  thumb: `${dir}/thumbs/d-${name}.webp`,
  caption,
});
const phone = (name, caption) => ({ src: `${dir}/p-${name}.webp`, caption, portrait: true });
const strip = (title, text, frames) => ({
  title,
  text,
  frames: frames.map(([name, label]) => ({ src: `${dir}/m-${name}.webp`, label })),
});

export const philradsPortal = {
  id: "philrads-portal",
  title: "PHILRADS Staff Portal",
  subtitle: "Staff operations platform · Progressive web app",
  category: "web",
  year: "2026",
  repository: { name: "PHILRADS-Portal", visibility: "private" },
  source: "GitHub + local",
  status: "In active development",
  selected: true,
  description:
    "One place for the staff and volunteers of a Philippine relief and development organization: relief stock, field operations, every activity since 2023, tasks, files and forms. It works on a phone in the field with a weak signal, and on a desktop in the office.",
  audience:
    "PHILRADS staff and volunteers in warehouses, field sites and the office. Four roles decide which modules and actions each person gets; administrators see everything.",
  problem:
    "Field staff mostly open the portal on a phone, often with a weak signal. The organization’s statistics lived in one Excel workbook per year, and funding details must stay with the people allowed to see them.",
  solution:
    "A React and TypeScript PWA on Supabase Postgres. Row-level security calls one has_permission() check, so changing who can do what is a data change, not new code. A service worker keeps the app usable offline, and the yearly workbook syncs through a reviewed, all-or-nothing database function.",
  role: "Product design and full-stack development: the React and TypeScript interface, the Supabase schema and row-level security, the offline PWA, the workbook sync and the automated database tests.",
  tech: [
    "React",
    "TypeScript",
    "Vite",
    "PWA",
    "Supabase",
    "PostgreSQL",
    "Tailwind CSS",
    "Leaflet",
    "Google Drive",
  ],
  facts: [
    ["13", "working modules behind one sign-in"],
    ["4", "roles, each permission enforced in the database"],
    ["227", "automated database checks for who can see and change what"],
    ["390 px", "phone width it is designed and tested at"],
  ],
  features: [
    "13 working modules behind one sign-in; PDM and Chat are marked “Soon”",
    "Four roles enforced in the database through has_permission()",
    "Funding and donors on Statistics visible only to administrators and coordinators",
    "Drag-and-drop sync from the Excel statistics workbook: review before apply, all-or-nothing, never deletes",
    "Top donors ranked by funding or by number of activities",
    "Installable PWA that opens offline; field uploads wait on the device until the connection returns",
    "A What’s new popup when an update is waiting",
  ],
  modules: [
    ["Home", "The day at a glance: a verse of the day, a getting-started checklist for new staff and the operations overview."],
    ["Live Map", "Warehouses, field hubs, response sites and evacuation centres on one map, with teammates sharing their live location."],
    ["Inventory", "Relief goods from the PHILRADS IMS by warehouse, with donations, an activity log and release approvals."],
    ["Documentation", "Field photos, videos and reports go straight into the right Google Drive folder, with a searchable record."],
    ["Response", "Relief operations from assessment to distribution: families and people served against the target, per barangay."],
    ["Statistics", "Every PHILRADS project and activity since 2023: totals, a year-by-year chart and what each program reached."],
    ["Projects", "Programs and projects with milestones, deadlines, progress and the team on each."],
    ["Tasks", "My Day planning, assigned and team tasks, and points, levels and streaks that reward finished work."],
    ["Forms", "The organization’s own forms filled on screen and printed like the originals."],
    ["Resources", "Policies, manuals, templates and brand files from Google Drive, pinned and grouped."],
    ["Staff & volunteers", "Invite people, choose each one’s role, switch accounts on or off, and archive with undo."],
    ["Logs", "A record of everything that happens, with flags to look into. Nobody can change or delete it."],
    ["Profile", "Photo, colour, position and a short bio colleagues see, plus level and badges."],
  ],
  upcomingModules: ["PDM", "Chat"],
  technical: [
    ["Permissions in the database", "Row-level security calls one has_permission() check. Funding lives in its own table that only administrators and coordinators can read, so it never reaches other devices."],
    ["All-or-nothing sync", "A single Postgres function applies the reviewed workbook changes in one transaction and refuses funding changes from anyone without access."],
    ["Works offline", "A service worker caches the app so it opens without a signal, and field uploads wait on the device until the connection returns."],
    ["Tested", "227 database checks cover each role’s access; a headless browser checks pages for sideways scrolling, console errors and the motion below."],
  ],
  story: [
    "The latest release keeps funding private, makes the statistics workbook syncable and adds a Top donors card.",
    "Funding and donors on Statistics are visible only to administrators and coordinators. Staff see the same activities and people served, with no amounts, donors or sync button.",
    "Dropping the Excel workbook shows every change before anything is saved. Empty fields are filled, values that differ are left for a person to decide, nothing is ever deleted, and the sync is saved all at once or not at all.",
    "Interface motion was tuned in the same release: spring-like switches, gliding tab and navigation highlights, rows that slide out on delete, a password shake with a show-password eye, and a What’s new popup when an update is waiting.",
  ],
  motion: [
    strip("Switches that move like real ones", "The knob stretches as it sets off, overshoots the end, then settles.", [
      ["switch-on-1", "0 ms"], ["switch-on-2", "90 ms"], ["switch-on-3", "170 ms"], ["switch-on-4", "260 ms"], ["switch-on-5", "360 ms"], ["switch-on-6", "700 ms"],
    ]),
    strip("Tab highlight glides to your choice", "One shared component moves a single pill behind every tab bar.", [
      ["pill-1", "0 ms"], ["pill-2", "130 ms"], ["pill-3", "260 ms"], ["pill-4", "390 ms"], ["pill-5", "520 ms"], ["pill-6", "700 ms"],
    ]),
    strip("Deleted rows slide away", "The removed task slides off, then the rows below glide up into its place.", [
      ["row-1", "0 ms"], ["row-2", "160 ms"], ["row-3", "330 ms"], ["row-4", "480 ms"], ["row-5", "620 ms"], ["row-6", "780 ms"],
    ]),
    strip("A shake before a word", "On a wrong password or offline sign-in the card shakes first, then the message fades in.", [
      ["shake-1", "0 ms"], ["shake-2", "80 ms"], ["shake-3", "160 ms"], ["shake-4", "300 ms"], ["shake-5", "700 ms"],
    ]),
    strip("Navigation highlight follows you", "Moving from Statistics to Tasks, the highlight travels down the sidebar.", [
      ["nav-1", "before"], ["nav-3", "300 ms"], ["nav-4", "440 ms"], ["nav-5", "700 ms"],
    ]),
  ],
  statusNote:
    "In active development on its own branch. It is not a public product, so there is no public demo or source link. Screenshots come from the production build with invented sample data; no real beneficiaries, staff or donors appear.",
  galleries: [
    {
      label: "Latest release",
      images: [
        shot("statistics", "Statistics, administrator view: funding recorded, donors and the sync button."),
        shot("statistics-staff", "The same page for staff: activities and people served, with no amounts, donors or sync."),
        shot("statistics-donors", "Top donors this month, this year or since records began, ranked by funding or by activities."),
        shot("sync-drop", "Drop the statistics workbook or choose it. One sheet per year is read in the browser."),
        shot("sync-review", "Pick the period. New activities are listed with their row number in the sheet."),
        shot("sync-updates", "Updates show sheet and portal values side by side. Differences start unticked."),
        shot("sync-done", "Applied in one transaction. Records the sheet doesn’t list are kept."),
      ],
    },
    {
      label: "Modules",
      images: [
        shot("home", "Home: a verse of the day, a getting-started checklist and the operations overview."),
        shot("welcome", "First sign-in: one question puts the matching step first in the checklist."),
        shot("live-map", "Live Map: warehouses, field hubs, response sites and evacuation centres on one map."),
        shot("inventory", "Inventory: relief goods by warehouse, with what is low, expired or expiring within 90 days."),
        shot("inventory-donations", "Inventory donations: how much has been given out and how many people each reached."),
        shot("inventory-approvals", "Inventory approvals: releases waiting in the IMS, approved from the portal by administrators."),
        shot("response", "Response: families and people served against the target, per barangay."),
        shot("projects", "Projects: milestones, deadlines, progress and the team on each."),
        shot("tasks", "Tasks: My Day planning, team tasks, and points, levels and a monthly team goal."),
        shot("tasks-rewards", "Tasks rewards: badges, levels and kudos between colleagues."),
        shot("documentation", "Documentation: field photos, videos and reports filed into the right Google Drive folder."),
        shot("forms", "Forms: needs assessment, distribution list, masterlist and consent, printed like the originals."),
        shot("resources", "Resources: policies, manuals, templates and brand files from Google Drive."),
        shot("staff", "Staff & volunteers: invite people, choose roles, switch accounts on or off."),
        shot("logs", "Logs: every task, stock, staff and sign-in event, with flags. Nobody can edit or delete it."),
        shot("profile", "Profile: photo, colour, position, short bio, level and badges."),
        shot("sign-in", "Sign in: staff accounts only; signs out after 10 minutes without activity."),
      ],
    },
    {
      label: "On a phone",
      images: [
        phone("home", "Home at 390 px, the width most field staff use."),
        phone("live-map", "Live Map on a phone."),
        phone("inventory", "Inventory on a phone."),
        phone("statistics", "Statistics on a phone."),
        phone("tasks", "Tasks on a phone."),
      ],
    },
  ],
};

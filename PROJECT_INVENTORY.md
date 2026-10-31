# Project inventory — 19 October 2026

The Nero catalog contains **22 project entries**, with **9 selected projects** in the visual showcase. It features **16 of the 21 owner repositories** on the GitHub account `N3RO-O`, plus local applications and earlier editions.

## GitHub coverage

Every repository below maps to exactly one catalog entry. Public source links are included in project dialogs. Private entries contain portfolio summaries and an enquiry link.

| Repository               | Portfolio entry               | Visibility        |
| ------------------------ | ----------------------------- | ----------------- |
| ChurchTimesUp            | Church Time's Up              | Private           |
| kiddytrack               | KiddyTrack                    | Private           |
| kiddytrack-CPIC          | KiddyTrack / CPIC             | Public            |
| Philrads-Asset-Inventory | PHILRADS / Assets             | Private           |
| Nerovault                | Nerovault                     | Public            |
| MyAIpeeps                | MyAIpeeps                     | Private           |
| DateMyLDR                | DateMyLDR                     | Private           |
| pcec-connect-pwa         | PCEC Connect                  | Private           |
| PHILRADS-Portal          | PHILRADS Staff Portal         | Private (no link) |
| habit-ops                | Habit Ops                     | Private           |
| update-pcec-app          | PCEC Connect / Project Update | Public            |
| philrads-disaster-bot    | PHILRADS Disaster Monitor     | Private           |
| reportly-app             | Reportly                      | Public            |
| shainaportfolio          | Shaina / Personal Portfolio   | Public            |
| jonahdev                 | Nero / This Portfolio         | Public            |
| N3RO-O                   | Nero / GitHub Profile         | Public            |

## Local coverage

Paths are relative to `C:/Users/hp/Desktop/Projects` and are documentation only. They are not shipped in browser project data.

| Local workspace                               | Catalog mapping                                                           |
| --------------------------------------------- | ------------------------------------------------------------------------- |
| Code & Systems/stage-timer                    | Church Time's Up                                                          |
| Code & Systems/stage-timer/publisher-admin    | Church Time's Up / Publisher                                              |
| Code & Systems/ChurchTimesUp-archive          | Earlier edition of Church Time's Up                                       |
| Code & Systems/Nerovault-main                 | Nerovault                                                                 |
| Code & Systems/MyAIpeeps                      | MyAIpeeps; upstream Munder Difflin attribution retained                   |
| Code & Systems/DateMyLDR                      | DateMyLDR                                                                 |
| Code & Systems/pcec-connect-pwa               | Current PCEC Connect                                                      |
| PCEC App/pcec-connect-pwa-main                | Earlier copy of the same PCEC Connect member app                          |
| Code & Systems/update-pcec-app                | PCEC Connect / Project Update                                             |
| PCEC App/pcec-connect-pwa                     | Copy of the project-update site, despite its folder name                  |
| PCEC App/Website Update (older copy - 6 Oct)  | Earlier project-update edition                                            |
| PCEC App/Backend & Flutter Screens            | PCEC / Authentication Prototype, including SQLite API and Flutter screens |
| PCEC App/Design Previews and Reports & Guides | Supporting materials for PCEC Connect and its update site                 |
| PHILRADS Portal                               | PHILRADS Staff Portal                                                     |
| Code & Systems/PHILRADS/habit-ops             | Habit Ops                                                                 |
| Bots/philrads-disaster-bot                    | PHILRADS Disaster Monitor                                                 |
| Bots/philrads-rss-free                        | PHILRADS Monitor / Direct Edition                                         |
| Bots/Strategy Bot                             | PHILRADS Best-Time Bot                                                    |
| Code & Systems/philrads-feed-bridge           | PHILRADS / Feed Bridge, credited as an upstream RSS-Bridge integration    |
| Code & Systems/PHILRADS/IMS                   | Working materials associated with the existing PHILRADS IMS case study    |
| jonahdev-main                                 | Nero / This Portfolio                                                     |

`Code & Systems/aipeepshome` is empty. The outer `Code & Systems/habit-ops` folder contains a backend scaffold and is grouped with Habit Ops. Logos, signatures, certificates, background assets, dependency folders, backups, and repeated source copies are supporting materials rather than separate authored products.

## Left out of the portfolio

These are intentionally not catalog entries:

- Repositories: `weekly-report-builder`, `Nero-s-Soundcloud` (fork), `Wand-Enhancer` (fork), `df2-Necrotonine`, `patawad`.
- Local: `Code & Systems/PHILRADS/habit-quest` (earlier Habit Ops edition).
- The five final PHILRADS video exports in `PHILRADS Videos/Final Exports`. They are separate work from the portfolio's own motion studies, which stay in the Creative section.

## Verification

`npm run check` verifies the 16 featured repository mappings, unique project IDs, valid categories, source-link visibility, that no video exports are listed, Nero manifest branding, and every referenced local asset. `npm run build` checks the production bundle.

The inventory is a reviewed snapshot, not an automatic claim about deployment readiness. Testing releases, prototypes, local tools, archived projects, and forks retain explicit status labels.

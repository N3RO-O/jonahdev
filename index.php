<?php
/* ============================================================
   index.php  —  Jonah Tabuzo Portfolio
   ============================================================ */

$name      = "Jonah Tabuzo";
$handle    = "Yunah444";
$role      = "Web Developer · Visual Creator · Systems Analyst";
$location  = "Virac, Catanduanes, Philippines";
$email     = "jonahmarkt@gmail.com";
$phone     = "+63 928 574 4262";
$website   = "pixodeph.vercel.app";
$github    = "https://github.com/Yunah444";
$org_url   = "https://pixodeph.vercel.app/";
$org_name  = "PIXODE Philippines";
$discord   = "n3r0_0";
$discord_server = "https://discord.gg/HpUJFCTX33";
$discord_server_name = "Nero's Cult";
$available = true;

// Skills grouped
$languages = ["PHP","MySQL","JavaScript","HTML","CSS","Python"];
$creative  = ["Video Editing","Photography","Videography","AI-Assisted Workflow"];

$core_skills = [
  "Systems Analysis & IT Project Management",
  "Database Management & SQL",
  "Programming & Web Development",
  "Basic Networking Knowledge",
  "Computer Literacy & Troubleshooting",
];
$soft_skills = [
  "Communication & Stakeholder Engagement",
  "Customer Relationship Building",
  "Quick Learner & Team Adaptability",
  "Attention to Detail & Organization",
];

$projects = [
  [
    "idx"   => "01",
    "name"  => "KiddyTrack",
    "desc"  => "Web-based academic performance monitoring for teachers & parents",
    "year"  => "2024",
    "tags"  => ["PHP","MySQL","JavaScript","Systems Design"],
    "url"   => "https://github.com/Yunah444/kiddytrack-CPIC",
    "type"  => "web",
    "highlights" => [
      "Designed & implemented database integration and academic data tracking modules",
      "Built separate dashboards for teachers and parent portals",
      "Implemented secure monitoring tools for educational stakeholders",
    ],
  ],
  [
    "idx"   => "02",
    "name"  => "Database Management System",
    "desc"  => "Custom asset database system built with PHP, JavaScript & CSS",
    "year"  => "2024",
    "tags"  => ["PHP","MySQL","JavaScript","CSS"],
    "url"   => "#",
    "type"  => "web",
    "highlights" => [
      "Full CRUD operations with clean, responsive UI",
      "Structured relational schema and optimized SQL queries",
    ],
  ],
  [
    "idx"   => "03",
    "name"  => "Nero's Soundcloud",
    "desc"  => "Lavalink-powered Discord music bot",
    "year"  => "2022",
    "tags"  => ["JavaScript","Discord.js","Lavalink"],
    "url"   => "https://github.com/Yunah444/Nero-s-Soundcloud",
    "type"  => "bot",
    "highlights" => [],
  ],
];

$experience = [
  [
    "title"   => "Samsung Product Promoter",
    "company" => "Alson's Trading",
    "loc"     => "Virac",
    "period"  => "2025",
    "desc"    => "Built strong client relationships and developed transferable interpersonal and customer-facing skills.",
  ],
  [
    "title"   => "Administrative Support & Community Outreach",
    "company" => "Provincial Government Office",
    "loc"     => "Virac",
    "period"  => "2020–2021",
    "desc"    => "Handled data entry, document preparation, and correspondence management. Streamlined workflows and maintained compliance standards under strict deadlines.",
  ],
];

$achievements = [
  ["label" => "HACK4GOV CTF 2023", "desc" => "Capture the Flag Participant"],
];

$socials = [
  ["label" => "GitHub",   "icon" => "gh",  "url" => "https://github.com/Yunah444"],
  ["label" => "PIXODE",   "icon" => "px",  "url" => "https://pixodeph.vercel.app/"],
  ["label" => "Discord",  "icon" => "dc",  "url" => "https://discord.gg/HpUJFCTX33"],
  ["label" => "Email",    "icon" => "em",  "url" => "mailto:jonahmarkt@gmail.com"],
];

$year = date("Y");
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="<?= htmlspecialchars($name) ?> — Web Developer, Systems Analyst & Visual Creator from the Philippines.">
  <title><?= htmlspecialchars($name) ?> — Portfolio</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@300;400;500;700&family=Roboto:ital,wght@0,300;0,400;0,500;1,300&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>

  <div class="cursor" id="cursor"></div>
  <div class="cursor-glow" id="cursorGlow"></div>

  <!-- ── NAV ── -->
  <nav id="navbar">
    <a href="#" class="nav-logo">jonah<span>.dev</span></a>
    <button class="nav-toggle" id="navToggle" aria-label="Toggle menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
    <ul class="nav-links" id="navLinks">
      <?php foreach(['work','about','experience','contact'] as $l): ?>
        <li><a href="#<?= $l ?>" class="nav-link"><?= $l ?></a></li>
      <?php endforeach; ?>
    </ul>
    <?php if($available): ?>
      <div class="nav-status">
        <span class="status-dot"></span>available for hire
      </div>
    <?php endif; ?>
  </nav>

  <!-- ── HERO ── -->
  <section id="hero">
    <div class="hero-content">
      <div class="hero-eyebrow">
        <span class="hero-prompt-sym">~</span> / <?= strtolower($location) ?> / <?= $year ?>
      </div>
      <h1 class="hero-title">
        <span class="dim">_</span><span class="green"><?= explode(' ',$name)[0] ?></span><br>
        <span class="hero-last"><?= explode(' ',$name)[1] ?></span>
      </h1>
      <p class="hero-role"><?= htmlspecialchars($role) ?></p>
      <p class="hero-subtitle">
        Building practical web systems and crafting visual stories — from school management platforms to photo &amp; video production. I use <span>AI as a tool</span> to work smarter across both code and creative work.
      </p>

      <div class="tag-group">
        <div class="tag-group-label">// languages</div>
        <div class="tag-row">
          <?php foreach($languages as $l): ?>
            <span class="tag tag--green"><?= htmlspecialchars($l) ?></span>
          <?php endforeach; ?>
        </div>
      </div>

      <div class="tag-group">
        <div class="tag-group-label">// creative</div>
        <div class="tag-row">
          <?php foreach($creative as $c): ?>
            <span class="tag tag--purple"><?= htmlspecialchars($c) ?></span>
          <?php endforeach; ?>
        </div>
      </div>

      <div class="hero-actions">
        <a href="#work"    class="btn btn-primary">./view_work</a>
        <a href="#contact" class="btn btn-outline">./contact_me</a>
        <a href="<?= htmlspecialchars($github) ?>" target="_blank" rel="noopener" class="btn btn-ghost">github ↗</a>
      </div>
    </div>

    <div class="terminal" id="heroTerminal">
      <div class="terminal-bar">
        <div class="t-dot r"></div><div class="t-dot y"></div><div class="t-dot g"></div>
        <span class="terminal-title">whoami.sh</span>
      </div>
      <div class="terminal-body">
        <div class="t-line"><span class="t-ps1">~$</span><span class="t-cmd"> cat profile.json</span></div>
        <div class="t-line"><span class="t-out">{</span></div>
        <div class="t-line"><span class="t-out">&nbsp;&nbsp;<span class="t-key">"name"</span>: <span class="t-val">"<?= htmlspecialchars($name) ?>"</span>,</span></div>
        <div class="t-line"><span class="t-out">&nbsp;&nbsp;<span class="t-key">"role"</span>: <span class="t-val">"Dev &amp; Creator"</span>,</span></div>
        <div class="t-line"><span class="t-out">&nbsp;&nbsp;<span class="t-key">"location"</span>: <span class="t-val">"<?= htmlspecialchars($location) ?>"</span>,</span></div>
        <div class="t-line"><span class="t-out">&nbsp;&nbsp;<span class="t-key">"org"</span>: <span class="t-val">"<?= htmlspecialchars($org_name) ?>"</span>,</span></div>
        <div class="t-line"><span class="t-out">&nbsp;&nbsp;<span class="t-key">"github"</span>: <span class="t-val">"@<?= htmlspecialchars($handle) ?>"</span>,</span></div>
        <div class="t-line"><span class="t-out">&nbsp;&nbsp;<span class="t-key">"discord"</span>: <span class="t-val">"<?= htmlspecialchars($discord) ?>"</span>,</span></div>
        <div class="t-line"><span class="t-out">&nbsp;&nbsp;<span class="t-key">"server"</span>: <span class="t-val">"<?= htmlspecialchars($discord_server_name) ?>"</span>,</span></div>
        <div class="t-line"><span class="t-out">&nbsp;&nbsp;<span class="t-key">"status"</span>: <span class="t-val">"<?= $available ? 'open_to_work' : 'unavailable' ?>"</span></span></div>
        <div class="t-line"><span class="t-out">}</span></div>
        <div class="t-line"><span class="t-ps1">~$</span> <span class="t-cursor"></span></div>
      </div>
    </div>
  </section>

  <!-- ── WORK ── -->
  <section id="work">
    <div class="sec-label">projects</div>
    <div class="sec-title">Work<span>_</span></div>
    <div class="work-list">
      <?php foreach($projects as $p): ?>
        <a href="<?= htmlspecialchars($p['url']) ?>" target="_blank" rel="noopener" class="work-row reveal">
          <div class="work-idx"><?= $p['idx'] ?></div>
          <div class="work-info">
            <div class="work-header">
              <div class="work-name"><?= htmlspecialchars($p['name']) ?></div>
              <span class="work-type-badge"><?= htmlspecialchars($p['type']) ?></span>
            </div>
            <div class="work-meta"><?= $p['year'] ?> — <?= htmlspecialchars($p['desc']) ?></div>
            <?php if(!empty($p['highlights'])): ?>
              <ul class="work-highlights">
                <?php foreach($p['highlights'] as $h): ?>
                  <li><?= htmlspecialchars($h) ?></li>
                <?php endforeach; ?>
              </ul>
            <?php endif; ?>
            <div class="work-tags">
              <?php foreach($p['tags'] as $t): ?>
                <span class="tag tag--dim"><?= htmlspecialchars($t) ?></span>
              <?php endforeach; ?>
            </div>
          </div>
          <div class="work-arrow">↗</div>
        </a>
      <?php endforeach; ?>
    </div>
  </section>

  <!-- ── ABOUT ── -->
  <section id="about">
    <div class="sec-label">about</div>
    <div class="sec-title">Who I Am<span>_</span></div>
    <div class="about-grid">

      <div class="about-card reveal">
        <div class="card-label">> bio.txt</div>
        <p class="about-text">
          I'm <strong><?= htmlspecialchars($name) ?></strong>, a developer and visual creator from <strong><?= htmlspecialchars($location) ?></strong>.
        </p>
        <p class="about-text">
          On the tech side, I build web systems and databases — most notably <strong>KiddyTrack</strong>, a school management platform used by teachers and parents. I'm also a co-founder of <strong><?= htmlspecialchars($org_name) ?></strong>, a small dev org building digital tools for the local community.
        </p>
        <p class="about-text">
          On the creative side, I do <strong>video editing, photography, and videography</strong>. I use <strong>AI as a practical tool</strong> in both worlds — whether that's generating code snippets, refining edits, or speeding up creative workflows.
        </p>
        <p class="about-text">
          I also run <strong><?= htmlspecialchars($discord_server_name) ?></strong>, a gaming community on Discord — join us at <a href="<?= htmlspecialchars($discord_server) ?>" target="_blank" rel="noopener" class="inline-link">discord.gg/HpUJFCTX33</a>.
        </p>
        <div class="achievement-tags">
          <?php foreach($achievements as $a): ?>
            <span class="achievement-tag">🏆 <?= htmlspecialchars($a['label']) ?> — <?= htmlspecialchars($a['desc']) ?></span>
          <?php endforeach; ?>
        </div>
      </div>

      <div class="about-card reveal">
        <div class="card-label">> skills.json</div>

        <div class="skill-block">
          <div class="skill-block-title">// core technical</div>
          <div class="tag-row">
            <?php foreach($core_skills as $s): ?>
              <span class="tag tag--outline"><?= htmlspecialchars($s) ?></span>
            <?php endforeach; ?>
          </div>
        </div>

        <div class="skill-block">
          <div class="skill-block-title">// professional</div>
          <div class="tag-row">
            <?php foreach($soft_skills as $s): ?>
              <span class="tag tag--muted"><?= htmlspecialchars($s) ?></span>
            <?php endforeach; ?>
          </div>
        </div>

        <div class="skill-block">
          <div class="skill-block-title">// creative & tools</div>
          <div class="tag-row">
            <?php foreach($creative as $c): ?>
              <span class="tag tag--purple"><?= htmlspecialchars($c) ?></span>
            <?php endforeach; ?>
            <span class="tag tag--purple">AI Tools (Coding)</span>
            <span class="tag tag--purple">AI Tools (Editing)</span>
          </div>
        </div>

        <div class="discord-card">
          <div class="discord-header">
            <svg class="discord-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.1 18.081.114 18.104.134 18.12a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>
            <span class="discord-server-name"><?= htmlspecialchars($discord_server_name) ?></span>
          </div>
          <div class="discord-meta">Gaming Community Server</div>
          <div class="discord-row">
            <span class="discord-label">Handle</span>
            <span class="discord-value"><?= htmlspecialchars($discord) ?></span>
          </div>
          <a href="<?= htmlspecialchars($discord_server) ?>" target="_blank" rel="noopener" class="btn btn-discord">Join Server ↗</a>
        </div>
      </div>

    </div>
  </section>

  <!-- ── EXPERIENCE ── -->
  <section id="experience">
    <div class="sec-label">experience</div>
    <div class="sec-title">Timeline<span>_</span></div>
    <div class="exp-list">
      <?php foreach($experience as $e): ?>
        <div class="exp-row reveal">
          <div class="exp-period"><?= htmlspecialchars($e['period']) ?></div>
          <div class="exp-line"><div class="exp-dot"></div></div>
          <div class="exp-body">
            <div class="exp-title"><?= htmlspecialchars($e['title']) ?></div>
            <div class="exp-company"><?= htmlspecialchars($e['company']) ?> &middot; <?= htmlspecialchars($e['loc']) ?></div>
            <p class="exp-desc"><?= htmlspecialchars($e['desc']) ?></p>
          </div>
        </div>
      <?php endforeach; ?>
    </div>
  </section>

  <!-- ── CONTACT ── -->
  <section id="contact">
    <div class="contact-pre">init contact</div>
    <h2 class="contact-title">Let's <span>Build</span><br>Something.</h2>
    <p class="contact-sub">Open to freelance projects, collaborations, or just a good conversation about tech, cameras, or games.</p>
    <a href="mailto:<?= htmlspecialchars($email) ?>" class="contact-email"><?= htmlspecialchars($email) ?></a>
    <div class="contact-phone"><?= htmlspecialchars($phone) ?></div>
    <ul class="socials">
      <?php foreach($socials as $s): ?>
        <li>
          <a href="<?= htmlspecialchars($s['url']) ?>" target="_blank" rel="noopener">
            <?= htmlspecialchars($s['label']) ?>
          </a>
        </li>
      <?php endforeach; ?>
    </ul>
  </section>

  <footer>
    <span>&copy; <?= $year ?> <?= htmlspecialchars($name) ?></span>
    <span class="footer-center"><?= htmlspecialchars($org_name) ?> &middot; <?= htmlspecialchars($location) ?></span>
    <span>open_to_work: <?= $available ? '<span class="green">true</span>' : 'false' ?></span>
  </footer>

  <script src="assets/js/main.js"></script>
</body>
</html>
<?php
/* ============================================================
   index.php — Jonah Tabuzo Portfolio
   ============================================================ */

$name        = "Jonah Tabuzo";
$handle      = "Yunah444";
$role        = "Web Developer · Visual Creator · Systems Analyst";
$hook        = "I build web systems and tell visual stories.";
$location    = "Virac, Catanduanes, Philippines";
$tz          = "Asia/Manila";
$email       = "jonahmarkt@gmail.com";
$phone       = "+63 928 574 4262";
$github      = "https://github.com/Yunah444";
$org_url     = "https://pixodeph.vercel.app/";
$org_name    = "PIXODE Philippines";
$org_desc    = "A small dev org building digital tools for local communities in the PH.";
$discord        = "n3r0_0";
$discord_id     = "756339517878829135";
$discord_srv    = "https://discord.gg/HpUJFCTX33";
$discord_nm     = "Nero's Cult";
$available      = true; // fallback if Lanyard is unreachable

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
    "short" => "School management platform",
    "desc"  => "Web-based academic performance monitoring for teachers & parents",
    "year"  => "2024",
    "tags"  => ["PHP","MySQL","JavaScript","Systems Design"],
    "url"   => "https://github.com/Yunah444/kiddytrack-CPIC",
    "color" => "#00ff41",
    "highlights" => [
      "Designed & implemented database integration and academic tracking modules",
      "Built separate dashboards for teachers and parent portals",
      "Implemented secure monitoring tools for educational stakeholders",
    ],
  ],
  [
    "idx"   => "02",
    "name"  => "Database Management System",
    "short" => "Custom asset database",
    "desc"  => "Full CRUD asset database system built with PHP, JavaScript & CSS",
    "year"  => "2024",
    "tags"  => ["PHP","MySQL","JavaScript","CSS"],
    "url"   => "#",
    "color" => "#79b8ff",
    "highlights" => [
      "Full CRUD operations with a clean, responsive interface",
      "Structured relational schema with optimized SQL queries",
    ],
  ],
  [
    "idx"   => "03",
    "name"  => "Nero's Soundcloud",
    "short" => "Discord music bot",
    "desc"  => "Lavalink-powered Discord music bot",
    "year"  => "2022",
    "tags"  => ["JavaScript","Discord.js","Lavalink"],
    "url"   => "https://github.com/Yunah444/Nero-s-Soundcloud",
    "color" => "#a78bfa",
    "highlights" => [],
  ],
];

$experience = [
  [
    "title"   => "Samsung Product Promoter",
    "company" => "Alson's Trading",
    "loc"     => "Virac",
    "period"  => "2025",
    "desc"    => "Built strong client relationships and developed transferable interpersonal and customer-facing skills while representing a global tech brand.",
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
  ["icon" => "🏆", "label" => "HACK4GOV CTF 2023", "desc" => "Capture the Flag Participant"],
];

$socials = [
  ["label" => "GitHub",   "url" => "https://github.com/Yunah444"],
  ["label" => "PIXODE",   "url" => "https://pixodeph.vercel.app/"],
  ["label" => "Discord",  "url" => "https://discord.gg/HpUJFCTX33"],
  ["label" => "Email",    "url" => "mailto:jonahmarkt@gmail.com"],
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

  <!-- Scroll progress -->
  <div class="scroll-progress" id="scrollProgress"></div>

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
    <div class="nav-right">
      <div class="nav-status" id="navStatus">
        <span class="status-dot" id="navStatusDot"></span>
        <span id="navStatusText">connecting...</span>
      </div>
    </div>
  </nav>

  <!-- ── HERO ── -->
  <section id="hero">
    <!-- Dot grid background -->
    <div class="hero-grid" aria-hidden="true"></div>

    <div class="hero-content">
      <div class="hero-eyebrow">
        <span class="sym">~</span><?= htmlspecialchars(strtolower($location)) ?> / <?= $year ?>
      </div>

      <h1 class="hero-title">
        <span class="ht-line1"><span class="dim">_</span><span class="green"><?= explode(' ',$name)[0] ?></span></span>
        <span class="ht-line2"><?= explode(' ',$name)[1] ?></span>
      </h1>

      <p class="hero-hook"><?= htmlspecialchars($hook) ?></p>

      <p class="hero-subtitle">
        From <span>school management platforms</span> to <span>photo &amp; video production</span>
        — powered by clean code and AI-assisted workflows.
      </p>

      <div class="tag-group">
        <span class="tg-label">// dev</span>
        <?php foreach($languages as $l): ?>
          <span class="tag tag--green"><?= htmlspecialchars($l) ?></span>
        <?php endforeach; ?>
      </div>
      <div class="tag-group">
        <span class="tg-label">// creative</span>
        <?php foreach($creative as $c): ?>
          <span class="tag tag--purple"><?= htmlspecialchars($c) ?></span>
        <?php endforeach; ?>
      </div>

      <div class="hero-actions">
        <a href="#work"    class="btn btn-primary">./view_work</a>
        <a href="#contact" class="btn btn-outline">./contact_me</a>
        <a href="<?= htmlspecialchars($github) ?>" target="_blank" rel="noopener" class="btn btn-ghost">github ↗</a>
      </div>
    </div>

    <!-- Terminal -->
    <div class="terminal" id="heroTerminal" aria-label="Profile terminal">
      <div class="terminal-bar">
        <div class="t-dot r"></div><div class="t-dot y"></div><div class="t-dot g"></div>
        <span class="terminal-title">whoami.sh</span>
      </div>
      <div class="terminal-body" id="terminalBody">
        <!-- Lines injected by JS for typewriter effect -->
      </div>
    </div>
  </section>

  <!-- ── WORK ── -->
  <section id="work">
    <div class="sec-eyebrow">// projects</div>
    <div class="sec-title">Work<span class="green">_</span></div>
    <div class="work-list">
      <?php foreach($projects as $i => $p): ?>
        <a href="<?= htmlspecialchars($p['url']) ?>" target="_blank" rel="noopener"
           class="work-row reveal"
           style="--accent:<?= $p['color'] ?>; --delay:<?= $i * 80 ?>ms">
          <div class="work-num"><?= $p['idx'] ?></div>
          <div class="work-body">
            <div class="work-top">
              <span class="work-name"><?= htmlspecialchars($p['name']) ?></span>
              <span class="work-year"><?= $p['year'] ?></span>
            </div>
            <div class="work-desc"><?= htmlspecialchars($p['desc']) ?></div>
            <?php if(!empty($p['highlights'])): ?>
              <ul class="work-hl">
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
    <div class="sec-eyebrow">// about</div>
    <div class="sec-title">Who I Am<span class="green">_</span></div>

    <div class="about-grid">

      <!-- Bio -->
      <div class="about-card reveal">
        <div class="card-label">&gt; bio.txt</div>
        <p class="body-text">
          I'm <strong><?= htmlspecialchars($name) ?></strong>, a web developer and visual creator from
          <strong><?= htmlspecialchars($location) ?></strong>. I build practical systems and craft
          visual content — often using <strong>AI as a day-to-day tool</strong> to work faster in
          both code and creative work.
        </p>
        <p class="body-text">
          Quality Assurance Engineer of <a href="<?= htmlspecialchars($org_url) ?>" target="_blank" rel="noopener" class="text-link"><?= htmlspecialchars($org_name) ?></a>
          — <?= htmlspecialchars($org_desc) ?>
        </p>
        <p class="body-text">
          I also run <strong><?= htmlspecialchars($discord_nm) ?></strong>, a gaming community on Discord.
          Find me as <span class="mono-highlight"><?= htmlspecialchars($discord) ?></span> or
          <a href="<?= htmlspecialchars($discord_srv) ?>" target="_blank" rel="noopener" class="text-link discord-link">join the server ↗</a>
        </p>

        <!-- Live Discord presence card -->
        <div class="discord-card" id="discordCard">
          <div class="dc-body">
            <div class="dc-avatar-wrap">
              <img class="dc-avatar" id="dcAvatar" src="" alt="" width="44" height="44">
              <span class="dc-dot" id="dcDot"></span>
            </div>
            <div class="dc-details">
              <div class="dc-username"><?= htmlspecialchars($discord) ?></div>
              <div class="dc-status-text" id="dcStatusText">—</div>
              <div class="dc-activity-text" id="dcActivityText"></div>
            </div>
          </div>
          <div class="dc-spotify" id="dcSpotify" style="display:none">
            <svg class="dc-spotify-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
            <div class="dc-spotify-info">
              <div class="dc-spotify-label">Listening to Spotify</div>
              <div class="dc-spotify-track" id="dcSpotifyTrack"></div>
              <div class="dc-spotify-artist" id="dcSpotifyArtist"></div>
            </div>
            <div class="dc-spotify-bar"><div class="dc-spotify-fill" id="dcSpotifyFill"></div></div>
          </div>
        </div>

        <div class="achievement-row">
          <?php foreach($achievements as $a): ?>
            <div class="achievement-badge">
              <span class="ach-icon"><?= $a['icon'] ?></span>
              <div>
                <div class="ach-label"><?= htmlspecialchars($a['label']) ?></div>
                <div class="ach-desc"><?= htmlspecialchars($a['desc']) ?></div>
              </div>
            </div>
          <?php endforeach; ?>
        </div>
      </div>

      <!-- Skills -->
      <div class="about-card reveal">
        <div class="card-label">&gt; skills.json</div>

        <div class="skill-block">
          <div class="sb-title">// core technical</div>
          <div class="tag-row">
            <?php foreach($core_skills as $s): ?>
              <span class="tag tag--outline"><?= htmlspecialchars($s) ?></span>
            <?php endforeach; ?>
          </div>
        </div>

        <div class="skill-block">
          <div class="sb-title">// professional</div>
          <div class="tag-row">
            <?php foreach($soft_skills as $s): ?>
              <span class="tag tag--muted"><?= htmlspecialchars($s) ?></span>
            <?php endforeach; ?>
          </div>
        </div>

        <div class="skill-block">
          <div class="sb-title">// creative &amp; AI tools</div>
          <div class="tag-row">
            <?php foreach($creative as $c): ?>
              <span class="tag tag--purple"><?= htmlspecialchars($c) ?></span>
            <?php endforeach; ?>
            <span class="tag tag--purple">AI (Coding)</span>
            <span class="tag tag--purple">AI (Editing)</span>
          </div>
        </div>
      </div>

    </div>
  </section>

  <!-- ── EXPERIENCE ── -->
  <section id="experience">
    <div class="sec-eyebrow">// experience</div>
    <div class="sec-title">Timeline<span class="green">_</span></div>
    <div class="exp-list">
      <?php foreach($experience as $e): ?>
        <div class="exp-row reveal">
          <div class="exp-period"><?= htmlspecialchars($e['period']) ?></div>
          <div class="exp-line"><div class="exp-dot"></div></div>
          <div class="exp-body">
            <div class="exp-title"><?= htmlspecialchars($e['title']) ?></div>
            <div class="exp-co"><?= htmlspecialchars($e['company']) ?> &middot; <?= htmlspecialchars($e['loc']) ?></div>
            <p class="exp-desc body-text"><?= htmlspecialchars($e['desc']) ?></p>
          </div>
        </div>
      <?php endforeach; ?>
    </div>
  </section>

  <!-- ── CONTACT ── -->
  <section id="contact">
    <div class="contact-inner">
      <div class="sec-eyebrow">// contact</div>
      <h2 class="contact-title">Let's <span class="green">Build</span><br>Something.</h2>
      <p class="contact-sub">
        Open to freelance projects, collabs, or just a good conversation
        about tech, cameras, or games.
      </p>
      <a href="mailto:<?= htmlspecialchars($email) ?>" class="contact-email"><?= htmlspecialchars($email) ?></a>
      <div class="contact-phone"><?= htmlspecialchars($phone) ?></div>
      <ul class="socials">
        <?php foreach($socials as $s): ?>
          <li><a href="<?= htmlspecialchars($s['url']) ?>" target="_blank" rel="noopener"><?= htmlspecialchars($s['label']) ?></a></li>
        <?php endforeach; ?>
      </ul>
    </div>
  </section>

  <!-- ── FOOTER ── -->
  <footer>
    <span>&copy; <?= $year ?> <?= htmlspecialchars($name) ?></span>
    <span class="footer-org"><?= htmlspecialchars($org_name) ?></span>
    <span class="footer-right">
      <span class="ph-time" id="phTime"></span>
      &nbsp;·&nbsp;
      open_to_work: <span class="green">true</span>
    </span>
  </footer>

  <!-- Discord presence (Lanyard) -->
    <div class="dp-info">
      <div class="dp-top">
        <span class="dp-name"><?= htmlspecialchars($discord) ?></span>
        <span class="dp-badge" id="dpBadge">fetching...</span>
      </div>
      <div class="dp-activity" id="dpActivity"></div>
      <div class="dp-spotify" id="dpSpotify"></div>
    </div>
  </div>

  <script>
    // Pass PHP data to JS
    window.PORTFOLIO = {
      tz: "<?= $tz ?>",
      discordId: "<?= $discord_id ?>",
      terminalLines: [
        { type: 'cmd',  text: 'cat profile.json' },
        { type: 'out',  text: '{' },
        { type: 'kv',   key: 'name',     val: '<?= addslashes($name) ?>' },
        { type: 'kv',   key: 'role',     val: 'Dev &amp; Creator' },
        { type: 'kv',   key: 'location', val: '<?= addslashes($location) ?>' },
        { type: 'kv',   key: 'org',      val: '<?= addslashes($org_name) ?>' },
        { type: 'kv',   key: 'github',   val: '@<?= addslashes($handle) ?>' },
        { type: 'kv',   key: 'discord',  val: '<?= addslashes($discord) ?>' },
        { type: 'kvl',  key: 'status',   val: '<?= $available ? "open_to_work" : "unavailable" ?>' },
        { type: 'out',  text: '}' },
      ]
    };
  </script>
  <script src="assets/js/main.js"></script>
</body>
</html>
<?php

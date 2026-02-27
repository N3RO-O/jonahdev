/* ============================================================
   assets/js/main.js
   ============================================================ */

(function () {
  'use strict';

  const data = window.PORTFOLIO || {};

  /* ── Helpers ───────────────────────────────────────────────── */
  const $ = id => document.getElementById(id);
  const isMobile = () => window.innerWidth <= 768;

  /* ── Page transition (fade out → new page → fade in) ──────── */
  const overlay = $('pageTransition');
  if (overlay) {
    window.addEventListener('load', () => {
      overlay.classList.remove('enter');
    });
    document.querySelectorAll('a[href^="http"], a[target="_blank"]').forEach(a => {
      a.addEventListener('click', () => {
        overlay.classList.add('enter');
        setTimeout(() => overlay.classList.remove('enter'), 400);
      });
    });
  }

  /* ── Scroll progress bar ───────────────────────────────────── */
  const bar = $('scrollProgress');
  if (bar) {
    const updateBar = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + '%';
    };
    window.addEventListener('scroll', updateBar, { passive: true });
    updateBar();
  }

  /* ── Custom cursor ─────────────────────────────────────────── */
  const cur  = $('cursor');
  const glow = $('cursorGlow');
  let gx = 0, gy = 0, mx = 0, my = 0;

  if (cur && !isMobile()) {
    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      cur.style.left = mx + 'px';
      cur.style.top  = my + 'px';
    });
    document.addEventListener('mouseleave', () => cur.style.opacity = '0');
    document.addEventListener('mouseenter', () => cur.style.opacity = '1');
  }
  if (glow && !isMobile()) {
    (function animGlow() {
      gx += (mx - gx) * 0.055;
      gy += (my - gy) * 0.055;
      glow.style.left = gx + 'px';
      glow.style.top  = gy + 'px';
      requestAnimationFrame(animGlow);
    })();
  }

  /* ── Nav: mobile toggle ────────────────────────────────────── */
  const toggle   = $('navToggle');
  const navLinks = $('navLinks');
  const closeNav = () => {
    navLinks && navLinks.classList.remove('open');
    toggle   && toggle.classList.remove('open');
    toggle   && toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', closeNav));
    document.addEventListener('click', e => {
      if (!toggle.contains(e.target) && !navLinks.contains(e.target)) closeNav();
    });
  }

  /* ── Nav: shadow on scroll ─────────────────────────────────── */
  const navbar = $('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 12);
    }, { passive: true });
  }

  /* ── Active nav link on scroll ─────────────────────────────── */
  const sections   = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-link');

  sections.forEach(s =>
    new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting)
          navAnchors.forEach(a => a.classList.toggle(
            'active', a.getAttribute('href') === '#' + e.target.id
          ));
      });
    }, { threshold: 0.35 }).observe(s)
  );

  /* ── Scroll reveal ─────────────────────────────────────────── */
  const revObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const siblings = [...entry.target.parentElement
        .querySelectorAll('.reveal:not(.visible)')];
      const delay = Math.max(0, siblings.indexOf(entry.target)) * 90;
      setTimeout(() => entry.target.classList.add('visible'), delay);
      revObs.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -28px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revObs.observe(el));

  /* ── Copy to clipboard ─────────────────────────────────────── */
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const text  = btn.dataset.copy;
      const toast = btn.parentElement.querySelector('.copy-toast');
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.cssText = 'position:fixed;opacity:0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      btn.classList.add('copied');
      btn.textContent = 'copied!';
      if (toast) toast.classList.add('show');
      setTimeout(() => {
        btn.classList.remove('copied');
        btn.textContent = 'copy';
        if (toast) toast.classList.remove('show');
      }, 2000);
    });
  });

  /* ── Terminal typewriter ───────────────────────────────────── */
  const termBody = $('terminalBody');
  if (termBody && data.terminalLines) {
    const lines = data.terminalLines;
    let i = 0;

    const buildLine = ({ type, text, key, val }) => {
      const div = document.createElement('div');
      div.className = 't-line';
      if (type === 'cmd') {
        div.innerHTML = `<span class="t-ps1">~$</span><span class="t-cmd"> ${text}</span>`;
      } else if (type === 'out') {
        div.innerHTML = `<span class="t-out">${text}</span>`;
      } else if (type === 'kv' || type === 'kvl') {
        const comma = type === 'kv' ? '<span class="t-comma">,</span>' : '';
        div.innerHTML = `<span class="t-out">&nbsp;&nbsp;<span class="t-key">"${key}"</span>: <span class="t-val">"${val}"</span>${comma}</span>`;
      }
      return div;
    };

    const revealNext = () => {
      if (i >= lines.length) {
        const end = document.createElement('div');
        end.className = 't-line visible';
        end.innerHTML = `<span class="t-ps1">~$</span> <span class="t-cursor"></span>`;
        termBody.appendChild(end);
        return;
      }
      const el = buildLine(lines[i]);
      termBody.appendChild(el);
      requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('visible')));
      i++;
      setTimeout(revealNext, lines[i - 1]?.type === 'cmd' ? 260 : 95);
    };

    setTimeout(revealNext, 1200);
  }

  /* ── Lanyard Discord presence ──────────────────────────────── */
  const DISCORD_ID = data.discordId;
  const LANYARD    = `https://api.lanyard.rest/v1/users/${DISCORD_ID}`;

  const dcDot          = $('dcDot');
  const dcAvatar       = $('dcAvatar');
  const dcStatusText   = $('dcStatusText');
  const dcActivityText = $('dcActivityText');
  const dcSpotify      = $('dcSpotify');
  const dcSpotifyTrack = $('dcSpotifyTrack');
  const dcSpotifyArtist= $('dcSpotifyArtist');
  const dcSpotifyFill  = $('dcSpotifyFill');
  const navDot         = $('navStatusDot');
  const navText        = $('navStatusText');
  const dpAvatar       = $('dpAvatar');
  const dpStatusDot    = $('dpStatusDot');
  const dpBadge        = $('dpBadge');
  const dpActivity     = $('dpActivity');
  const dpSpotify      = $('dpSpotify');

  const STATUS_MAP = {
    online:  { label: 'available for hire', hire: true  },
    idle:    { label: 'away / idle',         hire: false },
    dnd:     { label: 'do not disturb',      hire: false },
    offline: { label: 'unavailable',         hire: false },
  };

  let spotifyInterval = null;

  const setClass = (el, cls) => {
    if (!el) return;
    el.classList.remove('online','idle','dnd','offline');
    el.classList.add(cls);
  };

  const fetchPresence = async () => {
    try {
      const res  = await fetch(LANYARD);
      if (!res.ok) throw new Error('Lanyard error');
      const json = await res.json();
      if (!json.success) throw new Error('No data');

      const d      = json.data;
      const status = d.discord_status || 'offline';
      const user   = d.discord_user;
      const info   = STATUS_MAP[status] || STATUS_MAP.offline;

      const setAvatar = (el, size) => {
        if (!el || !user) return;
        const hash = user.avatar;
        const ext  = hash && hash.startsWith('a_') ? 'gif' : 'png';
        el.src = hash
          ? `https://cdn.discordapp.com/avatars/${user.id}/${hash}.${ext}?size=${size}`
          : `https://cdn.discordapp.com/embed/avatars/0.png`;
        el.onerror = () => { el.src = `https://cdn.discordapp.com/embed/avatars/0.png`; };
      };

      setAvatar(dcAvatar, 64);
      setAvatar(dpAvatar, 52);

      setClass(dcDot, status);
      setClass(navDot, status);
      setClass(dpStatusDot, status);

      if (navText) {
        navText.textContent = info.label;
        navText.style.color = info.hire ? 'var(--green)' : 'var(--g2)';
      }
      if (dpBadge) {
        dpBadge.textContent = info.label;
        dpBadge.style.color = info.hire ? 'var(--green)' : 'var(--g2)';
      }

      const customStatus = d.activities?.find(a => a.type === 4);
      if (dcStatusText) {
        dcStatusText.textContent = customStatus?.state
          ? `${customStatus.emoji?.name ?? ''} ${customStatus.state}`.trim()
          : info.label;
      }

      const game = d.activities?.find(a => a.type === 0 || a.type === 1);
      const gameText = game ? `${game.type === 1 ? '📡 Streaming' : '🎮 Playing'} ${game.name}` : '';
      if (dcActivityText) dcActivityText.textContent = gameText;
      if (dpActivity)     dpActivity.textContent     = gameText;

      clearInterval(spotifyInterval);
      if (d.listening_to_spotify && d.spotify) {
        const sp = d.spotify;
        if (dcSpotify)       dcSpotify.style.display = 'flex';
        if (dpSpotify)       dpSpotify.style.display = 'block';
        if (dcSpotifyTrack)  dcSpotifyTrack.textContent  = sp.song;
        if (dcSpotifyArtist) dcSpotifyArtist.textContent = sp.artist.replace(/;/g, ',');

        if (dcSpotifyFill && sp.timestamps) {
          const update = () => {
            const pct = Math.min(100, ((Date.now() - sp.timestamps.start) / (sp.timestamps.end - sp.timestamps.start)) * 100);
            dcSpotifyFill.style.width = pct + '%';
          };
          update();
          spotifyInterval = setInterval(update, 1000);
        }
      } else {
        if (dcSpotify) dcSpotify.style.display = 'none';
        if (dpSpotify) dpSpotify.style.display = 'none';
      }

    } catch (err) {
      if (navText) navText.textContent = 'available for hire';
      console.warn('Lanyard fetch failed:', err.message);
    }
  };

  if (DISCORD_ID) {
    fetchPresence();
    setInterval(fetchPresence, 30000);
  }

  /* ── Lanyard WebSocket (real-time) ─────────────────────────── */
  if (DISCORD_ID && typeof WebSocket !== 'undefined') {
    let ws, heartbeatTimer;

    const connectWS = () => {
      ws = new WebSocket('wss://api.lanyard.rest/socket');

      ws.addEventListener('message', e => {
        const msg = JSON.parse(e.data);
        if (msg.op === 1) {
          heartbeatTimer = setInterval(() => {
            ws.readyState === WebSocket.OPEN && ws.send(JSON.stringify({ op: 3 }));
          }, msg.d.heartbeat_interval);
          ws.send(JSON.stringify({ op: 2, d: { subscribe_to_id: DISCORD_ID } }));
        }
        if (msg.op === 0) fetchPresence();
      });

      ws.addEventListener('close', () => {
        clearInterval(heartbeatTimer);
        setTimeout(connectWS, 5000);
      });
      ws.addEventListener('error', () => ws.close());
    };

    connectWS();
  }

  /* ── PH local time in footer ───────────────────────────────── */
  const timeEl = $('phTime');
  if (timeEl && data.tz) {
    const updateTime = () => {
      timeEl.textContent = 'PH ' + new Date().toLocaleTimeString('en-PH', {
        timeZone: data.tz, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
      });
    };
    updateTime();
    setInterval(updateTime, 1000);
  }

  /* ── Keyboard nav accessibility ────────────────────────────── */
  document.querySelectorAll('.work-row, .blog-card').forEach(row => {
    row.setAttribute('role', 'link');
    row.setAttribute('tabindex', '0');
    row.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); row.click(); }
    });
  });

  /* ── Console easter egg ────────────────────────────────────── */
  (function () {
    const gold  = 'color:#e8b84b;font-weight:700;font-size:14px;';
    const dim   = 'color:#484e58;font-size:11px;';
    const white = 'color:#edeef0;font-size:11px;';
    console.log('%c\n     _     \n    (_)    \n     _  ___ \n    | |/ _ \\\n    | | (_) |\n   _/ |\\___/\n  |__/       \n', gold);
    console.log('%c👋 Hey developer — you opened DevTools. Respect.', white);
    console.log('%c   I\'m Jonah Tabuzo, a dev from Virac, PH.', dim);
    console.log('%c   jonahmarkt@gmail.com  ·  github.com/Yunah444', dim);
    console.log('%c   Available for freelance & collabs.', gold);
  })();

  /* ── UTM parameter capture ─────────────────────────────────── */
  (function () {
    const params = new URLSearchParams(window.location.search);
    const set = (id, val) => { const el = document.getElementById(id); if (el && val) el.value = val; };
    set('utmSource',   params.get('utm_source'));
    set('utmMedium',   params.get('utm_medium'));
    set('utmCampaign', params.get('utm_campaign'));
  })();

  /* ── Contact form — async Formspree submit ─────────────────── */
  const contactForm = $('contactForm');
  const cfSubmit    = $('cfSubmit');
  const cfSuccess   = $('cfSuccess');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btnText    = cfSubmit.querySelector('.cf-btn-text');
      const btnSending = cfSubmit.querySelector('.cf-btn-sending');
      cfSubmit.disabled = true;
      btnText.style.display    = 'none';
      btnSending.style.display = 'inline';
      try {
        const res = await fetch(contactForm.action, {
          method: 'POST',
          body: new FormData(contactForm),
          headers: { 'Accept': 'application/json' }
        });
        if (res.ok) {
          contactForm.style.display = 'none';
          cfSuccess.style.display   = 'flex';
        } else {
          throw new Error('Form submission failed');
        }
      } catch {
        btnText.style.display    = 'inline';
        btnSending.style.display = 'none';
        cfSubmit.disabled        = false;
        alert('Something went wrong — please email me directly at jonahmarkt@gmail.com');
      }
    });
  }

  /* ── Back to top ───────────────────────────────────────────── */
  const backToTop = $('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('visible', window.scrollY > 600);
    }, { passive: true });
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ── Discord widget collapse ───────────────────────────────── */
  const dpToggle   = $('dpToggle');
  const dpInfo     = $('dpInfo');
  const dpPresence = $('discordPresence');
  if (dpToggle && dpInfo) {
    dpToggle.addEventListener('click', () => {
      const collapsed = dpPresence.classList.toggle('collapsed');
      dpToggle.textContent = collapsed ? '+' : '−';
      dpToggle.title       = collapsed ? 'Expand' : 'Minimize';
    });
  }

  /* ── GitHub API — live badges ──────────────────────────────── */
  const GH_USER = data.githubUser;
  if (GH_USER && $('ghStrip')) {
    const setGH = (id, val) => { const el = $(id); if (el) el.textContent = val; };
    const timeAgo = (dateStr) => {
      const d = new Date(dateStr), now = new Date();
      const diff = Math.floor((now - d) / 1000);
      if (diff < 86400) return diff < 3600 ? `${Math.floor(diff/60)}m ago` : `${Math.floor(diff/3600)}h ago`;
      const days = Math.floor(diff / 86400);
      return days === 1 ? '1 day ago' : days < 30 ? `${days} days ago` : `${Math.floor(days/30)}mo ago`;
    };

    (async () => {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GH_USER}`),
          fetch(`https://api.github.com/users/${GH_USER}/repos?per_page=100&sort=pushed`)
        ]);
        const user  = await userRes.json();
        const repos = await reposRes.json();

        setGH('ghRepos', user.public_repos ?? repos.length);

        const stars = repos.reduce((a, r) => a + (r.stargazers_count || 0), 0);
        setGH('ghStars', stars);

        if (repos[0]?.pushed_at) setGH('ghCommit', timeAgo(repos[0].pushed_at));

        const langMap = {};
        repos.forEach(r => { if (r.language) langMap[r.language] = (langMap[r.language] || 0) + 1; });
        const top = Object.entries(langMap).sort((a,b) => b[1]-a[1])[0];
        if (top) setGH('ghTopLang', top[0]);
      } catch { /* silently fail */ }
    })();
  } /* ← GitHub block closes correctly here */

  /* ── Video cards — play on hover ───────────────────────────── */
  document.querySelectorAll('.visual-card--video').forEach(card => {
    const video = card.querySelector('.visual-video');
    if (!video) return;
    card.addEventListener('mouseenter', () => video.play().catch(() => {}));
    card.addEventListener('mouseleave', () => { video.pause(); video.currentTime = 0; });
  });

  /* ── Screenshot strip collapse toggle ─────────────────────── */
  document.querySelectorAll('.work-ss-label').forEach(label => {
    const strip = label.closest('.work-screenshots');
    if (!strip) return;

    // Guard: only init once
    if (label.dataset.init) return;
    label.dataset.init = '1';

    // Ensure collapsed on load
    strip.classList.remove('expanded');

    // Wrap label text in a span so the ::before arrow CSS stays intact
    label.innerHTML = `<span class="work-ss-label-text">// screenshots — click to expand</span>`;

    label.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      const expanded = strip.classList.toggle('expanded');
      label.querySelector('.work-ss-label-text').textContent = expanded
        ? '// screenshots — collapse'
        : '// screenshots — click to expand';
    });
  });

})(); /* ← Main IIFE closes correctly here */
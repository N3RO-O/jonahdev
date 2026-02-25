/* ============================================================
   assets/js/main.js
   ============================================================ */

(function () {
  'use strict';

  const data = window.PORTFOLIO || {};

  /* ── Helpers ───────────────────────────────────────────────── */
  const $ = id => document.getElementById(id);
  const isMobile = () => window.innerWidth <= 768;

  /* ── Scroll progress bar ───────────────────────────────────── */
  const bar = $('scrollProgress');
  if (bar) {
    const updateBar = () => {
      const max  = document.documentElement.scrollHeight - window.innerHeight;
      const pct  = max > 0 ? (window.scrollY / max) * 100 : 0;
      bar.style.width = pct + '%';
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
  const toggle = $('navToggle');
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
  const sections  = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-link');

  new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navAnchors.forEach(a => a.classList.toggle(
          'active', a.getAttribute('href') === '#' + e.target.id
        ));
      }
    });
  }, { threshold: 0.38 }).observe && sections.forEach(s =>
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

  /* ── Terminal typewriter ───────────────────────────────────── */
  const termBody = $('terminalBody');
  if (termBody && data.terminalLines) {
    const lines = data.terminalLines;
    let i = 0;

    // Build a line element from data
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

    // Typewriter: reveal lines one by one
    const revealNext = () => {
      if (i >= lines.length) {
        // Add prompt + blinking cursor at the end
        const end = document.createElement('div');
        end.className = 't-line visible';
        end.innerHTML = `<span class="t-ps1">~$</span> <span class="t-cursor"></span>`;
        termBody.appendChild(end);
        return;
      }
      const el = buildLine(lines[i]);
      termBody.appendChild(el);
      // Trigger reflow then show
      requestAnimationFrame(() => {
        requestAnimationFrame(() => el.classList.add('visible'));
      });
      i++;
      // Vary delay: cmd lines get slightly longer pause
      const delay = lines[i - 1]?.type === 'cmd' ? 260 : 95;
      setTimeout(revealNext, delay);
    };

    // Start typewriter after hero animation settles
    setTimeout(revealNext, 1200);
  }

  /* ── Lanyard Discord presence ──────────────────────────────── */
  const DISCORD_ID = data.discordId;
  const LANYARD    = `https://api.lanyard.rest/v1/users/${DISCORD_ID}`;

  // Elements (main card)
  const dcDot          = document.getElementById('dcDot');
  const dcAvatar       = document.getElementById('dcAvatar');
  const dcStatusText   = document.getElementById('dcStatusText');
  const dcActivityText = document.getElementById('dcActivityText');
  const dcSpotify      = document.getElementById('dcSpotify');
  const dcSpotifyTrack = document.getElementById('dcSpotifyTrack');
  const dcSpotifyArtist= document.getElementById('dcSpotifyArtist');
  const dcSpotifyFill  = document.getElementById('dcSpotifyFill');
  const navDot         = document.getElementById('navStatusDot');
  const navText        = document.getElementById('navStatusText');

  // Elements (footer)
  const dpAvatar       = document.getElementById('dpAvatar');
  const dpStatusDot    = document.getElementById('dpStatusDot');
  const dpBadge        = document.getElementById('dpBadge');
  const dpActivity     = document.getElementById('dpActivity');
  const dpSpotify      = document.getElementById('dpSpotify');

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

      // Avatar
      if (dcAvatar && user) {
        const hash = user.avatar;
        const ext  = hash && hash.startsWith('a_') ? 'gif' : 'png';
        dcAvatar.src = hash
          ? `https://cdn.discordapp.com/avatars/${user.id}/${hash}.${ext}?size=64`
          : `https://cdn.discordapp.com/embed/avatars/0.png`;
        dcAvatar.onerror = () => {
          dcAvatar.src = `https://cdn.discordapp.com/embed/avatars/0.png`;
        };
      }
      if (dpAvatar && user) {
        const hash = user.avatar;
        const ext  = hash && hash.startsWith('a_') ? 'gif' : 'png';
        dpAvatar.src = hash
          ? `https://cdn.discordapp.com/avatars/${user.id}/${hash}.${ext}?size=52`
          : `https://cdn.discordapp.com/embed/avatars/0.png`;
        dpAvatar.onerror = () => {
          dpAvatar.src = `https://cdn.discordapp.com/embed/avatars/0.png`;
        };
      }

      // Status dot + nav
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

      // Custom status or main status label
      const customStatus = d.activities?.find(a => a.type === 4);
      if (dcStatusText) {
        dcStatusText.textContent = customStatus?.state
          ? `${customStatus.emoji?.name ?? ''} ${customStatus.state}`.trim()
          : info.label;
      }

      // Game / activity (type 0 = Playing, type 1 = Streaming, type 2 = Listening [non-spotify])
      const game = d.activities?.find(a => a.type === 0 || a.type === 1);
      if (dcActivityText) {
        if (game) {
          const verb = game.type === 1 ? '📡 Streaming' : '🎮 Playing';
          dcActivityText.textContent = `${verb} ${game.name}`;
        } else {
          dcActivityText.textContent = '';
        }
      }
      if (dpActivity) {
        if (game) {
          const verb = game.type === 1 ? '📡 Streaming' : '🎮 Playing';
          dpActivity.textContent = `${verb} ${game.name}`;
        } else {
          dpActivity.textContent = '';
        }
      }

      // Spotify
      clearInterval(spotifyInterval);
      if (d.listening_to_spotify && d.spotify) {
        const sp = d.spotify;
        if (dcSpotify)       dcSpotify.style.display = 'flex';
        if (dpSpotify)       dpSpotify.style.display = 'block';
        if (dcSpotifyTrack)  dcSpotifyTrack.textContent  = sp.song;
        if (dcSpotifyArtist) dcSpotifyArtist.textContent = sp.artist.replace(/;/g, ',');

        // Progress bar
        if (dcSpotifyFill && sp.timestamps) {
          const update = () => {
            const now       = Date.now();
            const start     = sp.timestamps.start;
            const end       = sp.timestamps.end;
            const total     = end - start;
            const elapsed   = now - start;
            const pct       = Math.min(100, (elapsed / total) * 100);
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
      // Silently fall back — keep PHP default
      if (navText) navText.textContent = 'available for hire';
      console.warn('Lanyard fetch failed:', err.message);
    }
  };

  if (DISCORD_ID) {
    fetchPresence();
    // Re-poll every 30 seconds
    setInterval(fetchPresence, 30000);
  }

  /* ── Lanyard WebSocket (real-time updates) ─────────────────── */
  if (DISCORD_ID && typeof WebSocket !== 'undefined') {
    let ws, heartbeatTimer;

    const connectWS = () => {
      ws = new WebSocket('wss://api.lanyard.rest/socket');

      ws.addEventListener('open', () => {
        // Lanyard expects a subscribe op on open
      });

      ws.addEventListener('message', e => {
        const msg = JSON.parse(e.data);

        if (msg.op === 1) {
          // Hello — start heartbeat and subscribe
          heartbeatTimer = setInterval(() => {
            ws.readyState === WebSocket.OPEN &&
              ws.send(JSON.stringify({ op: 3 }));
          }, msg.d.heartbeat_interval);

          ws.send(JSON.stringify({
            op: 2,
            d: { subscribe_to_id: DISCORD_ID }
          }));
        }

        // op 0 = event (INIT_STATE or PRESENCE_UPDATE)
        if (msg.op === 0) fetchPresence();
      });

      ws.addEventListener('close', () => {
        clearInterval(heartbeatTimer);
        // Reconnect after 5s
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
      const now = new Date();
      const str = now.toLocaleTimeString('en-PH', {
        timeZone: data.tz,
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        hour12: true
      });
      timeEl.textContent = 'PH ' + str;
    };
    updateTime();
    setInterval(updateTime, 1000);
  }

  /* ── Keyboard nav accessibility ────────────────────────────── */
  // Allow Enter/Space on work rows
  document.querySelectorAll('.work-row').forEach(row => {
    row.setAttribute('role', 'link');
    row.setAttribute('tabindex', '0');
    row.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        row.click();
      }
    });
  });

})();
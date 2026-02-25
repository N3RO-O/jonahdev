/* ============================================================
   assets/js/main.js
   ============================================================ */

(function () {
  'use strict';

  /* ── Custom cursor ─────────────────────────────────────────── */
  const cur   = document.getElementById('cursor');
  const glow  = document.getElementById('cursorGlow');
  let glowX = 0, glowY = 0, mouseX = 0, mouseY = 0;

  if (cur) {
    document.addEventListener('mousemove', e => {
      mouseX = e.clientX; mouseY = e.clientY;
      cur.style.left = mouseX + 'px';
      cur.style.top  = mouseY + 'px';
    });
    document.addEventListener('mouseleave', () => cur.style.opacity = '0');
    document.addEventListener('mouseenter', () => cur.style.opacity = '1');
  }

  // Smooth glow follow
  if (glow) {
    (function animateGlow() {
      glowX += (mouseX - glowX) * 0.06;
      glowY += (mouseY - glowY) * 0.06;
      glow.style.left = glowX + 'px';
      glow.style.top  = glowY + 'px';
      requestAnimationFrame(animateGlow);
    })();
  }

  /* ── Mobile nav toggle ─────────────────────────────────────── */
  const toggle = document.getElementById('navToggle');
  const links  = document.getElementById('navLinks');

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });

    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        links.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    document.addEventListener('click', e => {
      if (!toggle.contains(e.target) && !links.contains(e.target)) {
        links.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  /* ── Scroll reveal ─────────────────────────────────────────── */
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      // Stagger siblings in same parent
      const siblings = [...entry.target.parentElement
        .querySelectorAll('.reveal:not(.visible)')];
      const delay = Math.max(0, siblings.indexOf(entry.target)) * 80;
      setTimeout(() => entry.target.classList.add('visible'), delay);
      revealObs.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

  /* ── Active nav on scroll ──────────────────────────────────── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const activeObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
        });
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(s => activeObs.observe(s));

  /* ── Navbar shadow on scroll ───────────────────────────────── */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.style.boxShadow = window.scrollY > 10
        ? '0 2px 32px rgba(0,0,0,0.7)'
        : 'none';
    }, { passive: true });
  }

  /* ── Typed terminal effect ─────────────────────────────────── */
  const terminal = document.getElementById('heroTerminal');
  if (terminal) {
    // Stagger line visibility for a "typing loads" feel
    const tLines = terminal.querySelectorAll('.t-line');
    tLines.forEach((line, i) => {
      line.style.opacity = '0';
      line.style.transition = 'opacity 0.15s ease';
      setTimeout(() => line.style.opacity = '1', 1100 + i * 120);
    });
  }

})();
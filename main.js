/* ══════════════════════════════════════════
   MAIN.JS — Global Premium Micro-Interactions
   Manikandan G Mani Portfolio
   Loaded by all pages. Handles:
     1. Scroll Progress Bar
     2. Tab Dynamics ("👀 Comeback!")
     3. Cinematic Image Reveal
     4. Magnetic Buttons
     5. Orb Parallax Scroll
     6. 3D Card Tilt (desktop only — mobile safe)
══════════════════════════════════════════ */

(function() {
  'use strict';

  // ── 1. Scroll Progress Bar ──────────────────────
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  document.body.prepend(progressBar);

  window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (height > 0) progressBar.style.width = (winScroll / height) * 100 + '%';
  }, { passive: true });

  // ── 2. Tab Dynamics ────────────────────────────
  const originalTitle = document.title;
  document.addEventListener('visibilitychange', () => {
    document.title = document.hidden ? '👀 Comeback!' : originalTitle;
  });

  // ── 3. Cinematic Image Reveal ──────────────────
  document.querySelectorAll('img').forEach(img => {
    if (!img.complete) {
      img.style.opacity = '0';
      img.style.transition = 'opacity 0.6s ease';
      img.addEventListener('load', () => { img.style.opacity = '1'; });
    }
  });

  // ── 4. Magnetic Buttons (desktop only) ────────
  const isHoverDevice = window.matchMedia('(hover: hover)').matches;

  if (isHoverDevice) {
    document.querySelectorAll('.btn, .back-btn, .figma-btn, .proj-btn').forEach(btn => {
      btn.addEventListener('mousemove', e => {
        const rect = btn.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width  / 2) * 0.3;
        const y = (e.clientY - rect.top  - rect.height / 2) * 0.3;
        btn.style.transform = `translate(${x}px, ${y}px)`;
        btn.style.transition = 'transform 0.1s ease';
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
        btn.style.transition = 'transform 0.4s ease';
      });
    });

    // ── 5. Orb Scroll Parallax ─────────────────
    const orbs = document.querySelectorAll('.orb');
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      if (orbs[0]) orbs[0].style.marginTop = (scrolled * 0.4) + 'px';
      if (orbs[1]) orbs[1].style.marginTop = (scrolled * 0.2) + 'px';
      if (orbs[2]) orbs[2].style.marginTop = (scrolled * 0.6) + 'px';
    }, { passive: true });

    // ── 6. 3D Card Tilt (desktop only) ─────────
    const tiltSelector = [
      '.project-card',
      '.skill-card',
      '.about-card-side',
      '.comp-card',
      '.decision-card',
      '.highlight-card',
      '.info-card',
      '.main-screen',
      '.img-wrap'
    ].join(', ');

    document.querySelectorAll(tiltSelector).forEach(card => {
      card.style.willChange = 'transform';

      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width  / 2;
        const y = e.clientY - rect.top  - rect.height / 2;
        const rotateX = (y / (rect.height / 2)) * -5;
        const rotateY = (x / (rect.width  / 2)) *  5;

        card.style.transform    = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`;
        card.style.borderColor  = 'var(--accent)';
        card.style.boxShadow    = '0 30px 60px var(--glow)';
        card.style.transition   = 'none';
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform    = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
        card.style.borderColor  = 'var(--border)';
        card.style.boxShadow    = 'none';
        card.style.transition   = 'transform .4s ease, border-color .4s ease, box-shadow .4s ease';
      });
    });
  }

  // ── 7. Page Transitions ─────────────────────────
  const transitionOverlay = document.getElementById('pageTransition');
  if (transitionOverlay) {
    // Reveal page on load
    window.addEventListener('load', () => {
      transitionOverlay.classList.add('hidden');
    });

    // Handle link clicks for internal navigation
    document.querySelectorAll('a').forEach(link => {
      const href = link.getAttribute('href');
      // Only transition if it's an internal .html page and not an anchor on the same page
      if (href && href.endsWith('.html') && !href.startsWith('#')) {
        link.addEventListener('click', e => {
          e.preventDefault();
          transitionOverlay.classList.remove('hidden');
          setTimeout(() => {
            window.location.href = href;
          }, 600); // Matches CSS transition duration
        });
      }
    });
  }

  // ── 8. Back to Top Button ───────────────────────
  const scrollTopBtn = document.getElementById('scrollTop');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }, { passive: true });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
  // ── 9. Global Scroll Reveal (Intersection Observer) ──
  const revealOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // If it's an exp-item, we can also add a specialized class
        if (entry.target.classList.contains('exp-item')) {
          entry.target.classList.add('exp-reveal');
        }
        observer.unobserve(entry.target);
      }
    });
  }, revealOptions);

  document.querySelectorAll('.reveal, .exp-item, .box').forEach(el => {
    revealObserver.observe(el);
  });

})();

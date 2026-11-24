/* ===== enhance.js : scroll animations + mobile menu ===== */
(function () {
  var root = document.documentElement;
  root.classList.add('enh-js');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* 1. Scroll progress bar */
  var bar = document.createElement('div');
  bar.id = 'enh-progress';
  document.body.appendChild(bar);

  var header = document.querySelector('header');
  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      var h = root.scrollHeight - root.clientHeight;
      bar.style.transform = 'scaleX(' + (h > 0 ? window.scrollY / h : 0) + ')';
      if (header) header.classList.toggle('enh-scrolled', window.scrollY > 20);
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* 2. Reveal on scroll */
  var groups = [
    { sel: 'main section h2, main section > h3, section > h2', cls: '' },
    { sel: 'main section p, section > p', cls: '' },
    { sel: 'main section article', cls: 'enh-pop' },
    { sel: 'main section ul > li', cls: '' },
    { sel: '[class*="chip"],[class*="tag"],[class*="pill"],[class*="badge"],[class*="skill"] span', cls: 'enh-pop' },
    { sel: 'main section img, main section form, main section a[href$=".pdf"]', cls: 'enh-pop' }
  ];
  var seen = new Set();
  var targets = [];

  groups.forEach(function (g) {
    document.querySelectorAll(g.sel).forEach(function (el) {
      if (seen.has(el) || (header && header.contains(el))) return;
      seen.add(el);
      targets.push({ el: el, cls: g.cls });
    });
  });

  /* alternate left/right for experience / education style lists */
  targets.forEach(function (t, i) {
    var el = t.el;
    el.classList.add('enh-reveal');
    if (t.cls) el.classList.add(t.cls);
    else if (el.tagName === 'LI' && el.closest('#experience,#education,#achievements')) {
      el.classList.add(i % 2 ? 'enh-right' : 'enh-left');
    }
    /* stagger siblings */
    var idx = Array.prototype.indexOf.call(el.parentNode.children, el);
    el.style.setProperty('--enh-d', Math.min(idx, 8) * 70 + 'ms');
  });

  if (reduce || !('IntersectionObserver' in window)) {
    targets.forEach(function (t) { t.el.classList.add('enh-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('enh-in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    targets.forEach(function (t) { io.observe(t.el); });
  }

  /* 3. Active nav link while scrolling */
  var navLinks = document.querySelectorAll('header nav a[href^="#"], header a[href^="#"]');
  var sections = [];
  navLinks.forEach(function (a) {
    var id = a.getAttribute('href').slice(1);
    var s = id && document.getElementById(id);
    if (s) sections.push({ a: a, s: s });
  });
  if ('IntersectionObserver' in window && sections.length) {
    var so = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        navLinks.forEach(function (l) { l.classList.remove('enh-active'); });
        sections.forEach(function (x) {
          if (x.s === e.target) x.a.classList.add('enh-active');
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (x) { so.observe(x.s); });
  }

  /* 4. Mobile menu */
  if (header) {
    var btn = header.querySelector('button');
    var nav = header.querySelector('nav') || header.querySelector('ul');
    if (btn && nav) {
      header.classList.add('enh-nav-ready');
      nav.classList.add('enh-nav');
      function setH() {
        root.style.setProperty('--enh-header-h', header.offsetHeight + 'px');
      }
      setH();
      window.addEventListener('resize', setH);

      function setOpen(open) {
        header.classList.toggle('enh-open', open);
        document.body.classList.toggle('enh-lock', open);
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      }
      /* capture phase so it overrides any older, broken toggle code */
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        setOpen(!header.classList.contains('enh-open'));
      }, true);
      nav.addEventListener('click', function (e) {
        if (e.target.closest('a')) setOpen(false);
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') setOpen(false);
      });
      window.addEventListener('resize', function () {
        if (window.innerWidth > 768) setOpen(false);
      });
    }
  }
})();

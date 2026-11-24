/* Extra motion: scroll progress, hero entrance, scroll reveal, cursor glow.
   Skipped entirely under reduced motion. */
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var root = document.documentElement;
  root.classList.add('js-motion');

  // Scroll progress bar
  var bar = document.createElement('div');
  bar.id = 'scroll-progress';
  bar.setAttribute('aria-hidden', 'true');
  document.body.appendChild(bar);
  function progress() {
    var max = document.documentElement.scrollHeight - window.innerHeight;
    var p = max > 0 ? window.scrollY / max : 0;
    bar.style.transform = 'scaleX(' + p + ')';
  }
  window.addEventListener('scroll', progress, { passive: true });
  progress();

  // Hero entrance (first section on the page)
  var hero = document.querySelector('main section:first-of-type') || document.querySelector('section:first-of-type');
  if (hero) {
    hero.querySelectorAll('h1, p, .btn, .tag').forEach(function (el, i) {
      el.classList.add('hero-in');
      el.style.animationDelay = (0.1 + i * 0.08) + 's';
    });
  }

  // Scroll reveal for headings and cards below the hero
  var targets = document.querySelectorAll(
    'section:not(:first-of-type) h2, section:not(:first-of-type) .tag, .edu-card, .card'
  );
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('is-shown');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.2 });
    targets.forEach(function (el) {
      if (el.closest('.hero-in')) return;
      el.classList.add('motion-in');
      io.observe(el);
    });
  }

  // Cursor glow (only for mouse or trackpad users)
  if (window.matchMedia('(pointer: fine)').matches) {
    var glow = document.createElement('div');
    glow.id = 'cursor-glow';
    glow.setAttribute('aria-hidden', 'true');
    document.body.appendChild(glow);
    var x = 0, y = 0, cx = 0, cy = 0;
    window.addEventListener('pointermove', function (e) {
      x = e.clientX;
      y = e.clientY;
      glow.style.opacity = '1';
    }, { passive: true });
    (function loop() {
      cx += (x - cx) * 0.12;
      cy += (y - cy) * 0.12;
      glow.style.transform = 'translate(' + cx + 'px,' + cy + 'px) translate(-50%,-50%)';
      requestAnimationFrame(loop);
    })();
  }
})();

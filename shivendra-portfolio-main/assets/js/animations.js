/* Scroll reveal for cards and timeline items. Does nothing under reduced motion. */
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!('IntersectionObserver' in window)) return;

  var items = document.querySelectorAll('section .card, section .timeline > *, section .cert-list > *');
  if (!items.length) return;

  document.documentElement.classList.add('js-reveal');
  items.forEach(function (el) { el.classList.add('reveal-target'); });

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  items.forEach(function (el) { io.observe(el); });
})();

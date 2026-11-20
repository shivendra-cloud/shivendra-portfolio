/* Click ripple at the pointer position. Skipped under reduced motion. */
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var layer = document.createElement('div');
  layer.className = 'ripple-layer';
  layer.setAttribute('aria-hidden', 'true');
  document.body.appendChild(layer);

  document.addEventListener('pointerdown', function (e) {
    var r = document.createElement('span');
    r.className = 'ripple';
    r.style.left = e.clientX + 'px';
    r.style.top = e.clientY + 'px';
    layer.appendChild(r);
    setTimeout(function () { r.remove(); }, 700);
  }, { passive: true });
})();

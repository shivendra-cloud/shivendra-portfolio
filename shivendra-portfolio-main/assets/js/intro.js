/* Full-screen intro on every visit. Click or press any key to skip. */
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var overlay = document.createElement('div');
  overlay.id = 'intro';
  overlay.setAttribute('aria-hidden', 'true');

  var text = document.createElement('div');
  text.className = 'intro-text';

  var word = 'Hello world';
  for (var i = 0; i < word.length; i++) {
    var span = document.createElement('span');
    span.className = 'intro-char' + (i >= 6 ? ' is-accent' : '');
    span.textContent = word.charAt(i);
    span.style.animationDelay = (0.15 + i * 0.07) + 's';
    text.appendChild(span);
  }
  var cursor = document.createElement('span');
  cursor.className = 'intro-cursor';
  cursor.textContent = '_';
  text.appendChild(cursor);

  overlay.appendChild(text);
  document.body.appendChild(overlay);
  document.documentElement.classList.add('intro-active');

  var done = false;
  function finish() {
    if (done) return;
    done = true;
    overlay.classList.add('is-leaving');
    setTimeout(function () {
      overlay.remove();
      document.documentElement.classList.remove('intro-active');
    }, 900);
  }

  setTimeout(finish, 2400);
  overlay.addEventListener('click', finish);
  window.addEventListener('keydown', finish, { once: true });
})();

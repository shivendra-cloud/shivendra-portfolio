/* Theme switch: dark by default, light optional, choice saved in localStorage */
(function () {
  var KEY = 'portfolio-theme';
  var root = document.documentElement;
  var stored = null;
  try { stored = localStorage.getItem(KEY); } catch (e) { /* storage blocked: use default */ }
  var theme = stored === 'light' ? 'light' : 'dark';
  root.setAttribute('data-theme', theme);

  function label(t) {
    return t === 'light' ? 'Dark mode' : 'Light mode';
  }

  function build() {
    var host = document.querySelector('header nav') || document.querySelector('header');
    if (!host || document.getElementById('theme-toggle')) return;
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.id = 'theme-toggle';
    btn.className = 'theme-toggle';
    btn.textContent = label(theme);
    btn.setAttribute('aria-label', 'Switch colour theme');
    btn.addEventListener('click', function () {
      theme = theme === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', theme);
      btn.textContent = label(theme);
      try { localStorage.setItem(KEY, theme); } catch (e) { /* ignore */ }
    });
    host.appendChild(btn);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', build);
  } else {
    build();
  }
})();

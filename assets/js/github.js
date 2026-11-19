/* Lists public GitHub repos. On any error, shows a link to the profile instead. */
(function () {
  var USER = 'shivendra-cloud';
  var API = 'https://api.github.com/users/' + USER + '/repos?sort=updated&per_page=12';
  var PROFILE = 'https://github.com/' + USER;

  function el(tag, text, cls) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text) n.textContent = text;
    return n;
  }

  function build() {
    var section = el('section');
    section.id = 'github';
    section.setAttribute('aria-labelledby', 'github-title');
    var title = el('h2', 'Open source on GitHub');
    title.id = 'github-title';
    var grid = el('div', null, 'grid');
    grid.id = 'gh-grid';
    section.appendChild(title);
    section.appendChild(grid);

    var contact = document.getElementById('contact');
    if (contact && contact.parentNode) {
      contact.parentNode.insertBefore(section, contact);
    } else {
      (document.querySelector('main') || document.body).appendChild(section);
    }
    load(grid);
  }

  function fallback(grid, reason) {
    grid.innerHTML = '';
    var p = el('p', 'Repositories could not be loaded right now (' + reason + '). ');
    var a = el('a', 'View the GitHub profile');
    a.href = PROFILE;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    p.appendChild(a);
    grid.appendChild(p);
  }

  function load(grid) {
    fetch(API, { headers: { Accept: 'application/vnd.github+json' } })
      .then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json();
      })
      .then(function (repos) {
        var list = (Array.isArray(repos) ? repos : []).filter(function (r) { return !r.fork; }).slice(0, 6);
        if (!list.length) return fallback(grid, 'no public repos');
        list.forEach(function (repo) {
          var card = el('article', null, 'card');
          var h3 = el('h3');
          var link = el('a', repo.name);
          link.href = repo.html_url;
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
          h3.appendChild(link);
          card.appendChild(h3);
          card.appendChild(el('p', repo.description || 'No description yet.'));
          var meta = repo.language ? repo.language + ' · ' : '';
          card.appendChild(el('p', meta + '★ ' + (repo.stargazers_count || 0), 'muted'));
          grid.appendChild(card);
        });
      })
      .catch(function (err) {
        fallback(grid, err && err.message ? err.message : 'network error');
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', build);
  } else {
    build();
  }
})();

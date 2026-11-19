#!/usr/bin/env bash
set -e
cd /workspaces/shivendra-portfolio
mkdir -p assets/css assets/js

cat > assets/css/sections.css << 'EOF'
.brand{font-family:var(--font-mono);font-weight:600;color:var(--text)}
.brand span{color:var(--accent)}
.site-nav ul{display:flex;gap:var(--s3);align-items:center}
.site-nav a{color:var(--muted);font-size:.92rem;padding:.4rem 0;border-bottom:2px solid transparent}
.site-nav a:hover{color:var(--text);text-decoration:none}
.site-nav a[aria-current="true"]{color:var(--accent);border-bottom-color:var(--accent)}
.nav-toggle{display:none;background:none;border:1px solid var(--border);color:var(--text);border-radius:8px;padding:.45rem .8rem;font:inherit;cursor:pointer}
.hero__meta{font-family:var(--font-mono);color:var(--accent);margin-bottom:var(--s2)}
.hero__lead{max-width:60ch;color:var(--muted);font-size:1.1rem}
.hero__actions{display:flex;flex-wrap:wrap;gap:var(--s2);margin-top:var(--s3)}
.about p{max-width:70ch}
.facts{display:grid;gap:var(--s2);margin-top:var(--s3);grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr))}
.fact dt{font-family:var(--font-mono);font-size:.8rem;color:var(--muted)}
.fact dd{margin:0;font-weight:600}
.skill-group h3{font-size:1rem;font-family:var(--font-mono);color:var(--accent)}
.tags{display:flex;flex-wrap:wrap;gap:.5rem}
.project h3{margin-bottom:.25rem}
.project__meta{font-family:var(--font-mono);font-size:.8rem;color:var(--muted);margin-bottom:var(--s2)}
.project .tags{margin-top:var(--s2)}
.timeline{border-left:2px solid var(--border);margin-left:.4rem}
.timeline li{position:relative;padding:0 0 var(--s3) var(--s3)}
.timeline li::before{content:"";position:absolute;left:-7px;top:.55rem;width:12px;height:12px;border-radius:50%;background:var(--accent)}
.timeline li.is-ended::before{background:var(--muted)}
.timeline h3{font-size:1.05rem;margin-bottom:.15rem}
.timeline__when{font-family:var(--font-mono);font-size:.8rem;color:var(--muted);margin-bottom:.4rem}
.badge{font-family:var(--font-mono);font-size:.7rem;border:1px solid var(--muted);color:var(--muted);border-radius:999px;padding:.1rem .5rem;margin-left:.4rem;vertical-align:middle}
.cert-list li{padding:.6rem 0;border-bottom:1px solid var(--border)}
.cert-list li:last-child{border-bottom:0}
EOF

cat > assets/css/responsive.css << 'EOF'
@media (max-width:820px){
  .nav-toggle{display:inline-block}
  .site-nav{display:none;position:absolute;top:var(--header-h);left:0;right:0;background:var(--bg);border-bottom:1px solid var(--border);padding:var(--s2) var(--s3)}
  .site-nav.is-open{display:block}
  .site-nav ul{flex-direction:column;align-items:flex-start;gap:var(--s1)}
}
@media (max-width:640px){
  .section{padding-block:var(--s4)}
  .hero{padding-block:var(--s5)}
}
EOF

cat > assets/js/navigation.js << 'EOF'
(function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  function close() {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  }
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') close();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        close();
        toggle.focus();
      }
    });
  }
  var links = [].slice.call(document.querySelectorAll('#site-nav a[href^="#"]'));
  if ('IntersectionObserver' in window && links.length) {
    var map = {};
    links.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          links.forEach(function (a) { a.removeAttribute('aria-current'); });
          if (map[en.target.id]) map[en.target.id].setAttribute('aria-current', 'true');
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    Object.keys(map).forEach(function (id) {
      var s = document.getElementById(id);
      if (s) io.observe(s);
    });
  }
})();
EOF

cat > assets/js/main.js << 'EOF'
var y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();
EOF

cat > index.html << 'EOF'
<!DOCTYPE html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Shivendra Shukla (Shiv) | Portfolio</title>
<meta name="description" content="Portfolio of Shivendra Shukla (Shiv), an IT student in Mumbai building practical technology projects.">
<meta name="theme-color" content="#0E0F11">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=JetBrains+Mono:wght@400;600&display=swap">
<link rel="stylesheet" href="assets/css/variables.css">
<link rel="stylesheet" href="assets/css/base.css">
<link rel="stylesheet" href="assets/css/layout.css">
<link rel="stylesheet" href="assets/css/components.css">
<link rel="stylesheet" href="assets/css/sections.css">
<link rel="stylesheet" href="assets/css/responsive.css">
</head>
<body>
<a class="skip-link" href="#main">Skip to content</a>

<header class="site-header">
  <div class="container">
    <a class="brand" href="#top">shiv<span>_</span></a>
    <button class="nav-toggle" aria-expanded="false" aria-controls="site-nav">Menu</button>
    <nav class="site-nav" id="site-nav" aria-label="Main">
      <ul>
        <li><a href="#about">About</a></li>
        <li><a href="#skills">Skills</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#experience">Experience</a></li>
        <li><a href="#education">Education</a></li>
        <li><a href="#achievements">Achievements</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  </div>
</header>

<main id="main">
  <section class="hero" id="top">
    <div class="container">
      <p class="hero__meta">Hello, world</p>
      <h1>Shivendra Shukla <span class="muted">(Shiv)</span></h1>
      <p class="hero__lead">IT student in Mumbai building practical technology projects. [Add one sentence about what you are currently focused on.]</p>
      <div class="hero__actions">
        <a class="btn btn--primary" href="#projects">View projects</a>
        <a class="btn btn--ghost" href="#contact">Get in touch</a>
      </div>
    </div>
  </section>

  <section class="section about" id="about">
    <div class="container">
      <p class="section__label">01 / About</p>
      <h2 class="section__title">About</h2>
      <p>I am an IT student based in Mumbai. I enjoy building web projects and working in teams, and I led a team at the Smart India Hackathon. [Add two or three sentences in your own words.]</p>
      <dl class="facts">
        <div class="fact"><dt>Location</dt><dd>Mumbai, India</dd></div>
        <div class="fact"><dt>Studying</dt><dd>BSc IT</dd></div>
        <div class="fact"><dt>Expected graduation</dt><dd>May 2028</dd></div>
      </dl>
    </div>
  </section>

  <section class="section" id="skills">
    <div class="container">
      <p class="section__label">02 / Skills</p>
      <h2 class="section__title">Skills</h2>
      <div class="grid">
        <div class="card skill-group"><h3>Frontend</h3><div class="tags"><span class="tag">HTML</span><span class="tag">CSS</span><span class="tag">JavaScript</span><span class="tag">React</span><span class="tag">Vite</span><span class="tag">Bootstrap</span></div></div>
        <div class="card skill-group"><h3>Backend and data</h3><div class="tags"><span class="tag">Supabase</span></div></div>
        <div class="card skill-group"><h3>Tools and hosting</h3><div class="tags"><span class="tag">Git</span><span class="tag">GitHub</span><span class="tag">Vercel</span></div></div>
      </div>
    </div>
  </section>

  <section class="section" id="projects">
    <div class="container">
      <p class="section__label">03 / Projects</p>
      <h2 class="section__title">Projects</h2>
      <div class="grid">
        <article class="card project">
          <h3>KalaSetu</h3>
          <p class="project__meta">Smart India Hackathon &middot; SIH26090</p>
          <p>Team leader, and contributed to the full-stack development. [Add a one-line description of what KalaSetu does.]</p>
          <div class="tags"><span class="tag">React</span><span class="tag">Vite</span></div>
          <!-- TODO: add repo and demo links -->
        </article>
        <article class="card project">
          <h3>METATCAMPUS</h3>
          <p class="project__meta">Web project</p>
          <p>[Add a one-line description of what METATCAMPUS does and your role.]</p>
          <div class="tags"><span class="tag">HTML</span><span class="tag">CSS</span><span class="tag">Bootstrap</span><span class="tag">JavaScript</span><span class="tag">Supabase</span><span class="tag">Vercel</span></div>
          <!-- TODO: add repo and demo links -->
        </article>
      </div>
    </div>
  </section>

  <section class="section" id="experience">
    <div class="container">
      <p class="section__label">04 / Experience</p>
      <h2 class="section__title">Experience</h2>
      <ul class="timeline">
        <li>
          <h3>Reddit Growth Intern, SpiritWish</h3>
          <p class="timeline__when">From 19 May 2026 &middot; extended to six months from 19 August 2026</p>
          <p class="muted">[Add what you worked on. Do not add metrics unless verified.]</p>
        </li>
        <li class="is-ended">
          <h3>Co-Head, PRD Committee, CSI <span class="badge">Ended</span></h3>
          <p class="timeline__when">2026&ndash;27 &middot; resigned 21 September 2026</p>
          <p class="muted">[Add a short description of the role.]</p>
        </li>
        <li>
          <h3>Volunteer, NSS</h3>
          <p class="timeline__when">Since July 2025</p>
          <p class="muted">[Add a short description of your NSS activities.]</p>
        </li>
        <li class="is-ended">
          <h3>[Role to confirm], LEGO event</h3>
          <p class="timeline__when">May 2025</p>
          <p class="muted">[Add a short description of the role.]</p>
        </li>
      </ul>
    </div>
  </section>

  <section class="section" id="education">
    <div class="container">
      <p class="section__label">05 / Education</p>
      <h2 class="section__title">Education</h2>
      <div class="card">
        <h3>BSc Information Technology</h3>
        <p class="timeline__when">Thakur Shyamnarayan Degree College &middot; expected May 2028</p>
      </div>
    </div>
  </section>

  <section class="section" id="achievements">
    <div class="container">
      <p class="section__label">06 / Achievements</p>
      <h2 class="section__title">Achievements and certificates</h2>
      <div class="card">
        <ul class="cert-list">
          <li><strong>Smart India Hackathon (SIH26090)</strong> <span class="muted">&mdash; team leader, KalaSetu</span></li>
          <!-- TODO: verify each certificate (issuer, date, link) before publishing -->
          <li>AI Engineer <span class="muted">[issuer and date to add]</span></li>
          <li>IBM Introduction to AI <span class="muted">[date to add]</span></li>
          <li>NSS LTP <span class="muted">[issuer and date to add]</span></li>
          <li>Data Analytics <span class="muted">[issuer and date to add]</span></li>
        </ul>
      </div>
    </div>
  </section>

  <section class="section" id="blog"><div class="container"><p class="section__label">07 / Blog</p><h2 class="section__title">Blog</h2><p class="muted">Placeholder.</p></div></section>
  <section class="section" id="resume"><div class="container"><p class="section__label">08 / Resume</p><h2 class="section__title">Resume</h2><p class="muted">Placeholder.</p></div></section>
  <section class="section" id="contact"><div class="container"><p class="section__label">09 / Contact</p><h2 class="section__title">Contact</h2><p class="muted">Placeholder.</p></div></section>
</main>

<footer class="site-footer">
  <div class="container"><p>&copy; <span id="year">2026</span> Shivendra Shukla. All rights reserved.</p></div>
</footer>

<script src="assets/js/navigation.js" defer></script>
<script src="assets/js/main.js" defer></script>
</body>
</html>
EOF

git add index.html assets phase2.sh
git commit -m "Phase 2B/2C/3: nav, hero, about, skills, projects, experience, education, achievements" || echo "Nothing new to commit"
git push origin main
echo "Done. Wait about a minute, then hard-refresh: https://shivendra-cloud.github.io/shivendra-portfolio/"

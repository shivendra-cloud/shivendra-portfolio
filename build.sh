#!/usr/bin/env bash
set -e
cd /workspaces/shivendra-portfolio
mkdir -p assets/css

cat > assets/css/variables.css << 'EOF'
:root{
  --bg:#0E0F11; --surface:#16181B; --border:#26292E;
  --text:#F2F2F0; --muted:#9A9EA6;
  --accent:#B5F23D; --accent-ink:#0E0F11;
  --font-sans:"Inter",system-ui,-apple-system,"Segoe UI",sans-serif;
  --font-mono:"JetBrains Mono",ui-monospace,Consolas,monospace;
  --s1:.5rem; --s2:1rem; --s3:1.5rem; --s4:2.5rem; --s5:4rem; --s6:6rem;
  --radius:12px; --max:1120px; --header-h:64px;
}
EOF

cat > assets/css/base.css << 'EOF'
*,*::before,*::after{box-sizing:border-box}
html{scroll-behavior:smooth;scroll-padding-top:calc(var(--header-h) + 1rem);-webkit-text-size-adjust:100%}
body{margin:0;background:var(--bg);color:var(--text);font-family:var(--font-sans);font-size:1rem;line-height:1.65}
h1,h2,h3{line-height:1.2;margin:0 0 var(--s2);font-weight:700}
p{margin:0 0 var(--s2)}
a{color:var(--accent);text-decoration:none}
a:hover{text-decoration:underline}
img{max-width:100%;height:auto;display:block}
ul{margin:0;padding:0;list-style:none}
:focus-visible{outline:3px solid var(--accent);outline-offset:3px;border-radius:4px}
.skip-link{position:absolute;left:-999px;top:0;background:var(--accent);color:var(--accent-ink);padding:.6rem 1rem;z-index:100}
.skip-link:focus{left:var(--s2);top:var(--s2)}
.mono{font-family:var(--font-mono)}
.muted{color:var(--muted)}
.sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
@media (prefers-reduced-motion:reduce){
  html{scroll-behavior:auto}
  *,*::before,*::after{animation:none!important;transition:none!important}
}
EOF

cat > assets/css/layout.css << 'EOF'
.container{width:100%;max-width:var(--max);margin-inline:auto;padding-inline:var(--s3)}
.site-header{position:sticky;top:0;z-index:50;height:var(--header-h);background:rgba(14,15,17,.9);border-bottom:1px solid var(--border);display:flex;align-items:center}
.site-header .container{display:flex;align-items:center;justify-content:space-between;gap:var(--s2)}
.section{padding-block:var(--s5)}
.section__label{font-family:var(--font-mono);color:var(--accent);font-size:.85rem;margin-bottom:var(--s1)}
.section__title{font-size:clamp(1.6rem,4vw,2.2rem)}
.hero{padding-block:var(--s6)}
.hero h1{font-size:clamp(2.2rem,7vw,4rem)}
.grid{display:grid;gap:var(--s3);grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr))}
.site-footer{border-top:1px solid var(--border);padding-block:var(--s4);color:var(--muted);font-size:.9rem}
EOF

cat > assets/css/components.css << 'EOF'
.btn{display:inline-block;padding:.7rem 1.2rem;border-radius:var(--radius);font-weight:600;border:1px solid var(--accent)}
.btn--primary{background:var(--accent);color:var(--accent-ink)}
.btn--primary:hover{text-decoration:none;filter:brightness(1.08)}
.btn--ghost{color:var(--accent)}
.card{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:var(--s3)}
.tag{display:inline-block;font-family:var(--font-mono);font-size:.8rem;padding:.2rem .6rem;border:1px solid var(--border);border-radius:999px;color:var(--muted)}
EOF

cat > assets/css/responsive.css << 'EOF'
@media (max-width:640px){
  .section{padding-block:var(--s4)}
  .hero{padding-block:var(--s5)}
}
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
<link rel="stylesheet" href="assets/css/responsive.css">
</head>
<body>
<a class="skip-link" href="#main">Skip to content</a>

<header class="site-header">
  <div class="container">
    <a class="mono" href="#top">shiv</a>
    <nav aria-label="Main"><!-- Phase 2B: navigation --></nav>
  </div>
</header>

<main id="main">
  <section class="hero" id="top">
    <div class="container">
      <p class="section__label">Hello, world</p>
      <h1>Shivendra Shukla</h1>
      <p class="muted">IT student building practical technology projects.</p>
      <!-- Phase 2C: hero content and buttons -->
    </div>
  </section>

  <section class="section" id="about"><div class="container"><p class="section__label">01 / About</p><h2 class="section__title">About</h2><p class="muted">Placeholder.</p></div></section>
  <section class="section" id="skills"><div class="container"><p class="section__label">02 / Skills</p><h2 class="section__title">Skills</h2><p class="muted">Placeholder.</p></div></section>
  <section class="section" id="projects"><div class="container"><p class="section__label">03 / Projects</p><h2 class="section__title">Projects</h2><p class="muted">Placeholder.</p></div></section>
  <section class="section" id="experience"><div class="container"><p class="section__label">04 / Experience</p><h2 class="section__title">Experience</h2><p class="muted">Placeholder.</p></div></section>
  <section class="section" id="education"><div class="container"><p class="section__label">05 / Education</p><h2 class="section__title">Education</h2><p class="muted">Placeholder.</p></div></section>
  <section class="section" id="achievements"><div class="container"><p class="section__label">06 / Achievements</p><h2 class="section__title">Achievements</h2><p class="muted">Placeholder.</p></div></section>
  <section class="section" id="blog"><div class="container"><p class="section__label">07 / Blog</p><h2 class="section__title">Blog</h2><p class="muted">Placeholder.</p></div></section>
  <section class="section" id="resume"><div class="container"><p class="section__label">08 / Resume</p><h2 class="section__title">Resume</h2><p class="muted">Placeholder.</p></div></section>
  <section class="section" id="contact"><div class="container"><p class="section__label">09 / Contact</p><h2 class="section__title">Contact</h2><p class="muted">Placeholder.</p></div></section>
</main>

<footer class="site-footer">
  <div class="container"><p>&copy; 2026 Shivendra Shukla. All rights reserved.</p></div>
</footer>
</body>
</html>
EOF

git add index.html assets/css build.sh
git commit -m "Phase 2A: design tokens, base CSS, layout, page skeleton" || echo "Nothing new to commit"
git push origin main
echo "Done. Wait about a minute, then hard-refresh: https://shivendra-cloud.github.io/shivendra-portfolio/"

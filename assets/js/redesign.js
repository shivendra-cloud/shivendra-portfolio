(function(){
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function(s,c){return (c||document).querySelector(s)};
  var $$ = function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s))};

  var h1 = $('#name');
  if (h1 && !reduce){
    var i = 0, txt = h1.textContent.trim();
    h1.textContent = '';
    txt.split(' ').forEach(function(word){
      var w = document.createElement('span'); w.className = 'w'; w.setAttribute('aria-hidden','true');
      word.split('').forEach(function(ch){
        var l = document.createElement('span'); l.className = 'l'; l.textContent = ch;
        l.style.animationDelay = (0.25 + i++ * 0.045) + 's'; w.appendChild(l);
      });
      h1.appendChild(w);
    });
  }

  var roles = ['IT Student','Full-stack Developer','SQL and Data Enthusiast','Community Growth Intern'];
  var typed = $('#typed'), r = 0, c = 0, del = false;
  function type(){
    var cur = roles[r];
    if (reduce){ typed.textContent = roles[0]; return; }
    typed.textContent = cur.slice(0, c);
    if (!del && c === cur.length){ del = true; return setTimeout(type, 1600); }
    if (del && c === 0){ del = false; r = (r + 1) % roles.length; }
    c += del ? -1 : 1;
    setTimeout(type, del ? 35 : 75);
  }
  if (typed) setTimeout(type, 900);

  var io = new IntersectionObserver(function(es){
    es.forEach(function(e){ if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  }, {threshold:.12, rootMargin:'0px 0px -40px 0px'});
  $$('.reveal').forEach(function(el){
    var sib = $$('.reveal', el.parentElement).indexOf(el);
    el.style.setProperty('--d', (Math.max(sib,0) * 0.08) + 's');
    io.observe(el);
  });

  var bar = $('#progress'), links = $$('#menu a');
  var secs = links.map(function(a){return $(a.getAttribute('href'))});
  function onScroll(){
    var h = document.documentElement;
    bar.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight) * 100) + '%';
    var y = h.scrollTop + 140, cur = -1;
    secs.forEach(function(s,k){ if (s && s.offsetTop <= y) cur = k; });
    links.forEach(function(a,k){ a.classList.toggle('on', k === cur); });
  }
  window.addEventListener('scroll', onScroll, {passive:true}); onScroll();

  var burger = $('#burger'), menu = $('#menu');
  burger.addEventListener('click', function(){
    var open = menu.classList.toggle('open'); burger.setAttribute('aria-expanded', open);
  });
  links.forEach(function(a){ a.addEventListener('click', function(){ menu.classList.remove('open'); burger.setAttribute('aria-expanded', false); }); });

  if (!reduce && window.matchMedia('(hover:hover)').matches){
    var glow = $('#glow');
    window.addEventListener('mousemove', function(e){ glow.style.left = e.clientX + 'px'; glow.style.top = e.clientY + 'px'; });

    $$('.tilt').forEach(function(el){
      el.addEventListener('mousemove', function(e){
        var b = el.getBoundingClientRect(), x = e.clientX - b.left, y = e.clientY - b.top;
        var rx = ((y / b.height) - .5) * -7, ry = ((x / b.width) - .5) * 7;
        el.style.setProperty('--mx', x + 'px'); el.style.setProperty('--my', y + 'px');
        el.style.transform = 'perspective(900px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg) translateY(-3px)';
      });
      el.addEventListener('mouseleave', function(){ el.style.transform = ''; });
    });

    $$('.magnetic').forEach(function(btn){
      btn.addEventListener('mousemove', function(e){
        var b = btn.getBoundingClientRect();
        btn.style.transform = 'translate(' + ((e.clientX - b.left - b.width/2) * .25) + 'px,' + ((e.clientY - b.top - b.height/2) * .35) + 'px)';
      });
      btn.addEventListener('mouseleave', function(){ btn.style.transform = ''; });
    });
  }

  var y = $('#year'); if (y) y.textContent = new Date().getFullYear();
})();

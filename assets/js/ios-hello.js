/*!
 * ios-hello.js — full-screen, iOS-style multilingual "Hello" intro.
 * Self-contained: injects its own CSS + overlay, needs no other changes.
 */
(function () {
  'use strict';

  var GREETINGS = [
    { t: 'Hello',      lang: 'en',    cls: 'script' },
    { t: 'hola',       lang: 'es',    cls: 'script' },
    { t: 'bonjour',    lang: 'fr',    cls: 'script' },
    { t: 'नमस्ते',       lang: 'hi',    cls: 'plain'  },
    { t: 'こんにちは',     lang: 'ja',    cls: 'plain'  },
    { t: 'ciao',       lang: 'it',    cls: 'script' },
    { t: '你好',         lang: 'zh',    cls: 'plain'  },
    { t: '안녕하세요',     lang: 'ko',    cls: 'plain'  },
    { t: 'Hello',      lang: 'en',    cls: 'script' }
  ];
  var STEP_MS = 950;
  var FADE_MS = 550;
  var SHOW_ONCE_PER_SESSION = false;

  try {
    if (SHOW_ONCE_PER_SESSION && sessionStorage.getItem('iosHelloSeen')) return;
  } catch (e) {}

  var reduceMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

  var css = '' +
  '#ios-hello{position:fixed;inset:0;z-index:2147483000;display:flex;align-items:center;justify-content:center;' +
    'background:radial-gradient(ellipse at 50% 40%,#101a33 0%,#070b16 70%);' +
    'opacity:1;transition:opacity ' + 700 + 'ms ease,visibility 0s linear ' + 700 + 'ms;}' +
  '#ios-hello.done{opacity:0;visibility:hidden;pointer-events:none;}' +
  '#ios-hello .ih-word{position:absolute;left:50%;top:50%;margin:0;white-space:nowrap;' +
    'transform:translate(-50%,-50%) scale(.96);opacity:0;filter:blur(10px);' +
    'font-size:clamp(56px,13vw,150px);line-height:1.1;color:#fff;letter-spacing:.01em;' +
    'transition:opacity ' + FADE_MS + 'ms ease,filter ' + FADE_MS + 'ms ease,transform ' + (FADE_MS + 250) + 'ms cubic-bezier(.2,.7,.2,1);' +
    'background:linear-gradient(100deg,#ff9f6b 0%,#ff6fa8 35%,#8f7bff 70%,#4cc3ff 100%);' +
    '-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;}' +
  '#ios-hello .ih-word.script{font-family:"Snell Roundhand","Segoe Script","Apple Chancery","Brush Script MT","Lucida Handwriting",cursive;font-weight:400;}' +
  '#ios-hello .ih-word.plain{font-family:system-ui,-apple-system,"Segoe UI","Noto Sans Devanagari","Noto Sans JP","Noto Sans SC","Noto Sans KR",sans-serif;font-weight:200;}' +
  '#ios-hello .ih-word.in{opacity:1;filter:blur(0);transform:translate(-50%,-50%) scale(1);}' +
  '#ios-hello .ih-word.out{opacity:0;filter:blur(8px);transform:translate(-50%,-50%) scale(1.03);}' +
  '#ios-hello .ih-skip{position:absolute;right:20px;bottom:20px;background:none;border:0;color:rgba(255,255,255,.45);' +
    'font:500 13px system-ui,sans-serif;cursor:pointer;padding:8px 12px;letter-spacing:.04em;}' +
  '#ios-hello .ih-skip:hover,#ios-hello .ih-skip:focus-visible{color:#fff;}' +
  'html.ios-hello-lock,html.ios-hello-lock body{overflow:hidden;}';

  var style = document.createElement('style');
  style.setAttribute('data-ios-hello', '');
  style.textContent = css;
  document.head.appendChild(style);

  var root = document.createElement('div');
  root.id = 'ios-hello';
  root.setAttribute('role', 'status');
  root.setAttribute('aria-label', 'Hello');

  var words = GREETINGS.map(function (g) {
    var p = document.createElement('p');
    p.className = 'ih-word ' + g.cls;
    p.setAttribute('lang', g.lang);
    p.setAttribute('aria-hidden', 'true');
    p.textContent = g.t;
    root.appendChild(p);
    return p;
  });

  var skip = document.createElement('button');
  skip.className = 'ih-skip';
  skip.type = 'button';
  skip.textContent = 'Skip';
  root.appendChild(skip);

  document.documentElement.classList.add('ios-hello-lock');
  (document.body || document.documentElement).appendChild(root);

  var timers = [];
  var finished = false;

  function later(fn, ms) { timers.push(setTimeout(fn, ms)); }

  function finish() {
    if (finished) return;
    finished = true;
    timers.forEach(clearTimeout);
    try { sessionStorage.setItem('iosHelloSeen', '1'); } catch (e) {}
    root.classList.add('done');
    document.documentElement.classList.remove('ios-hello-lock');
    window.removeEventListener('keydown', onKey);
    setTimeout(function () {
      if (root.parentNode) root.parentNode.removeChild(root);
      if (style.parentNode) style.parentNode.removeChild(style);
    }, 900);
  }

  function onKey(e) { if (e.key === 'Escape' || e.key === 'Enter') finish(); }
  window.addEventListener('keydown', onKey);
  skip.addEventListener('click', finish);

  words.forEach(function (w, i) {
    var start = 250 + i * STEP_MS;
    later(function () { w.classList.add('in'); }, start);
    if (i < words.length - 1) {
      later(function () { w.classList.remove('in'); w.classList.add('out'); }, start + STEP_MS - FADE_MS + 150);
    }
  });
  later(finish, 250 + words.length * STEP_MS + 150);
})();

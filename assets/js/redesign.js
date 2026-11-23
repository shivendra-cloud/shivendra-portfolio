(function(){
'use strict';
var D=document,root=D.documentElement;
var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches,hover=matchMedia('(hover:hover)').matches;
var $=function(s,c){return (c||D).querySelector(s)},$$=function(s,c){return [].slice.call((c||D).querySelectorAll(s))};
var PC='140,120,255';
function setPc(){PC=root.dataset.theme==='light'?'90,70,220':'140,120,255'}setPc();

/* preloader */
var pre=$('#pre');setTimeout(function(){pre.classList.add('out')},reduce?0:1000);
setTimeout(start,reduce?0:900);

/* marquee */
var tr=$('.track');if(tr)tr.innerHTML+=tr.innerHTML;

function start(){splitName();typing();reveal();counters()}

function splitName(){
  var h=$('#name');if(!h||reduce)return;var i=0,t=h.textContent.trim();h.textContent='';
  t.split(' ').forEach(function(word){
    var w=D.createElement('span');w.className='w';w.setAttribute('aria-hidden','true');
    word.split('').forEach(function(ch){var l=D.createElement('span');l.className='l';l.textContent=ch;l.style.animationDelay=(i++*.045)+'s';w.appendChild(l)});
    h.appendChild(w);
  });
}

function typing(){
  var roles=['IT Student','Full-stack Developer','SQL and Data Enthusiast','Community Growth Intern'],el=$('#typed'),r=0,c=0,del=false;
  if(reduce){el.textContent=roles[0];return}
  (function tick(){
    var cur=roles[r];el.textContent=cur.slice(0,c);
    if(!del&&c===cur.length){del=true;return setTimeout(tick,1600)}
    if(del&&c===0){del=false;r=(r+1)%roles.length}
    c+=del?-1:1;setTimeout(tick,del?35:75);
  })();
}

function reveal(){
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12,rootMargin:'0px 0px -40px 0px'});
  $$('.reveal').forEach(function(el){
    var sib=$$('.reveal',el.parentElement).indexOf(el);
    el.style.setProperty('--d',(Math.min(Math.max(sib,0),6)*.08)+'s');
    $$('.chips li',el).forEach(function(li,k){li.style.setProperty('--k',k)});
    io.observe(el);
  });
}

function counters(){
  if(reduce)return;
  var io=new IntersectionObserver(function(es){es.forEach(function(e){
    if(!e.isIntersecting)return;io.unobserve(e.target);
    var el=e.target,n=+el.dataset.n,t0=performance.now();
    (function f(t){var p=Math.min((t-t0)/1300,1);el.textContent=Math.round(n*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(f)})(t0);
  })},{threshold:.6});
  $$('[data-n]').forEach(function(el){el.textContent='0';io.observe(el)});
}

/* progress, active nav, back to top */
var bar=$('#progress'),links=$$('#menu a'),secs=links.map(function(a){return $(a.getAttribute('href'))}),tt=$('#totop');
function onScroll(){
  var h=root,max=h.scrollHeight-h.clientHeight;
  bar.style.width=(max>0?h.scrollTop/max*100:0)+'%';
  var y=h.scrollTop+160,cur=-1;secs.forEach(function(s,k){if(s&&s.offsetTop<=y)cur=k});
  links.forEach(function(a,k){a.classList.toggle('on',k===cur)});
  tt.classList.toggle('show',h.scrollTop>700);
}
addEventListener('scroll',onScroll,{passive:true});onScroll();
tt.onclick=function(){scrollTo({top:0,behavior:reduce?'auto':'smooth'})};

/* menu */
var burger=$('#burger'),menu=$('#menu');
burger.onclick=function(){var o=menu.classList.toggle('open');burger.setAttribute('aria-expanded',o)};
links.forEach(function(a){a.addEventListener('click',function(){menu.classList.remove('open');burger.setAttribute('aria-expanded',false)})});

/* theme */
$('#theme').onclick=function(){
  var n=root.dataset.theme==='light'?'dark':'light';root.dataset.theme=n;
  try{localStorage.setItem('t',n)}catch(e){}setPc();
  var m=$('meta[name=theme-color]');if(m)m.content=n==='light'?'#F5F5F9':'#0E0F11';
};

/* copy email */
var toast=$('#toast');
$('#copy').onclick=function(){
  var t='shivendraxshukla@gmail.com';
  function ok(){toast.classList.add('show');setTimeout(function(){toast.classList.remove('show')},1800)}
  if(navigator.clipboard)navigator.clipboard.writeText(t).then(ok,ok);
  else{var a=D.createElement('textarea');a.value=t;D.body.appendChild(a);a.select();try{D.execCommand('copy')}catch(e){}a.remove();ok()}
};

/* particle network */
if(!reduce){
  var cv=$('#fx'),cx=cv.getContext('2d'),W,H,P=[],m={x:-999,y:-999},run=true;
  function size(){
    W=cv.width=innerWidth;H=cv.height=innerHeight;P=[];
    for(var i=0,n=Math.min(80,Math.floor(W*H/20000));i<n;i++)P.push({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.45,vy:(Math.random()-.5)*.45});
  }
  size();addEventListener('resize',size);
  addEventListener('mousemove',function(e){m.x=e.clientX;m.y=e.clientY});
  D.addEventListener('visibilitychange',function(){run=!D.hidden;if(run)draw()});
  (function draw(){
    if(!run)return;cx.clearRect(0,0,W,H);
    for(var i=0;i<P.length;i++){
      var p=P[i];p.x+=p.vx;p.y+=p.vy;
      if(p.x<0||p.x>W)p.vx*=-1;if(p.y<0||p.y>H)p.vy*=-1;
      cx.fillStyle='rgba('+PC+',.7)';cx.beginPath();cx.arc(p.x,p.y,1.6,0,6.283);cx.fill();
      for(var j=i+1;j<P.length;j++){
        var q=P[j],d=Math.hypot(p.x-q.x,p.y-q.y);
        if(d<120){cx.strokeStyle='rgba('+PC+','+(.22*(1-d/120))+')';cx.beginPath();cx.moveTo(p.x,p.y);cx.lineTo(q.x,q.y);cx.stroke()}
      }
      var dm=Math.hypot(p.x-m.x,p.y-m.y);
      if(dm<150){cx.strokeStyle='rgba(34,211,238,'+(.5*(1-dm/150))+')';cx.beginPath();cx.moveTo(p.x,p.y);cx.lineTo(m.x,m.y);cx.stroke();p.x+=(p.x-m.x)*.002;p.y+=(p.y-m.y)*.002}
    }
    requestAnimationFrame(draw);
  })();
}

/* pointer effects */
if(!reduce&&hover){
  var glow=$('#glow'),cur=$('#cur'),cx2=0,cy2=0,tx=0,ty=0;
  addEventListener('mousemove',function(e){tx=e.clientX;ty=e.clientY;glow.style.left=tx+'px';glow.style.top=ty+'px';cur.classList.add('on')});
  (function lerp(){cx2+=(tx-cx2)*.18;cy2+=(ty-cy2)*.18;cur.style.transform='translate('+cx2+'px,'+cy2+'px)';requestAnimationFrame(lerp)})();
  $$('a,button,.tilt,.mock').forEach(function(el){
    el.addEventListener('mouseenter',function(){cur.classList.add('big')});
    el.addEventListener('mouseleave',function(){cur.classList.remove('big')});
  });
  $$('.tilt').forEach(function(el){
    el.addEventListener('mousemove',function(e){
      var b=el.getBoundingClientRect(),x=e.clientX-b.left,y=e.clientY-b.top;
      el.style.setProperty('--mx',x+'px');el.style.setProperty('--my',y+'px');
      el.style.transform='perspective(900px) rotateX('+((y/b.height-.5)*-6)+'deg) rotateY('+((x/b.width-.5)*6)+'deg) translateY(-3px)';
    });
    el.addEventListener('mouseleave',function(){el.style.transform=''});
  });
  $$('.tile').forEach(function(el){el.addEventListener('mousemove',function(e){var b=el.getBoundingClientRect();el.style.setProperty('--mx',(e.clientX-b.left)+'px');el.style.setProperty('--my',(e.clientY-b.top)+'px')})});
  $$('.magnetic').forEach(function(btn){
    btn.addEventListener('mousemove',function(e){var b=btn.getBoundingClientRect();btn.style.transform='translate('+((e.clientX-b.left-b.width/2)*.25)+'px,'+((e.clientY-b.top-b.height/2)*.35)+'px)'});
    btn.addEventListener('mouseleave',function(){btn.style.transform=''});
  });
}

$('#year').textContent=new Date().getFullYear();
})();

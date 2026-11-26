'use strict';
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches,desk=matchMedia('(min-width:900px)');

/* ---------- Toast & cart ---------- */
let tt,n=0;
const toast=m=>{const t=$('#toast');t.textContent=m;t.classList.add('show');clearTimeout(tt);tt=setTimeout(()=>t.classList.remove('show'),2600)};
const add=id=>{Cart.add(id);const p=PRODUCTS.find(x=>x.id===id);toast((p?p.n:'Item')+' added to cart')};

/* ---------- Render from data.js ---------- */
$('#navList').innerHTML=NAV.map(m=>`<li><button aria-expanded="false">${m.t}<svg class="chev" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg></button><div class="mega"><div class="wrap">${Object.entries(m.c).map(([h,l])=>`<div><h3>${h}</h3>${l.map(x=>`<a href="${({s:'support.html',e:'explore.html'})[x.split('|')[1]]||'shop.html?c='+x.split('|')[1]}">${x.split('|')[0]}</a>`).join('')}</div>`).join('')}</div></div></li>`).join('');
if($('.hero')){
$('#cats').innerHTML=CATS.map(([t,f])=>`<li><a class="cat" href="shop.html?c=${f}"><span class="ph"><img src="images/categories/${f}.png" alt="" loading="lazy"></span>${t}</a></li>`).join('');
$('#track').innerHTML=PRODUCTS.filter(p=>p.h).map(p=>`<article class="card" style="--tint:${p.c[0][1]}33"><span class="ph"><img src="images/products/${p.img}.png" alt="${p.n}" loading="lazy" draggable="false"></span>${p.tag?`<span class="tag">${p.tag}</span>`:''}<h3><a href="product.html?id=${p.id}">${p.n}</a></h3><p>${p.d}</p><div class="sw" role="group" aria-label="Colour">${p.c.map(([cn,hex],j)=>`<button style="--c:${hex}" data-t="${hex}" aria-label="${cn}" aria-pressed="${!j}"></button>`).join('')}</div><div class="buy"><b>$${p.p.toLocaleString('en-US')}</b><button class="btn" data-add="${p.id}">Add to cart</button></div></article>`).join('');
}
$('#foot').innerHTML=Object.entries(FOOT).map(([h,l])=>`<details class="fcol"><summary>${h}</summary><ul>${l.map(x=>`<li><a href="#">${x}</a></li>`).join('')}</ul></details>`).join('');

/* Hide broken images so the gradient fallbacks show */
$$('img').forEach(i=>{const bad=()=>i.classList.add('x');i.addEventListener('error',bad);if(i.complete&&!i.naturalWidth)bad()});

/* ---------- Header: scroll state, nav, drawer, search ---------- */
const hdr=$('#hdr'),up=$('#up'),nav=$('#nav'),burger=$('#burger'),items=$$('#navList>li');
addEventListener('scroll',()=>{hdr.classList.toggle('stuck',scrollY>8);up.classList.toggle('show',scrollY>700)},{passive:true});
up.onclick=()=>scrollTo({top:0,behavior:reduce?'auto':'smooth'});

const setOpen=(li,o)=>{li.classList.toggle('open',o);$('button',li).setAttribute('aria-expanded',o)};
const closeAll=except=>items.forEach(li=>li!==except&&setOpen(li,false));
items.forEach(li=>{
 $('button',li).onclick=e=>{const o=li.classList.contains('open');closeAll(li);setOpen(li,desk.matches&&e.pointerType==='mouse'?true:!o)};
 li.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse'&&desk.matches){closeAll(li);setOpen(li,true)}});
 li.addEventListener('pointerleave',e=>{if(e.pointerType==='mouse'&&desk.matches)setOpen(li,false)});
 li.addEventListener('focusout',e=>{if(desk.matches&&!li.contains(e.relatedTarget))setOpen(li,false)});
});
const menu=o=>{nav.classList.toggle('open',o);burger.setAttribute('aria-expanded',o);burger.setAttribute('aria-label',o?'Close menu':'Open menu');document.body.style.overflow=o?'hidden':''};
burger.onclick=()=>menu(!nav.classList.contains('open'));
desk.addEventListener('change',()=>{menu(false);closeAll();sync()});

const sf=$('#srch'),sb=$('#srchBtn');
const srch=o=>{sf.classList.toggle('open',o);sb.setAttribute('aria-expanded',o);if(o)$('input',sf).focus()};
sb.onclick=()=>srch(!sf.classList.contains('open'));
sf.onsubmit=e=>{e.preventDefault();location.href='shop.html?q='+encodeURIComponent($('input',sf).value.trim())};
const sg=document.createElement('ul');sg.className='sug';sg.hidden=true;hdr.append(sg);
$('input',sf).addEventListener('input',e=>{
 const q=e.target.value.trim().toLowerCase();
 const l=q?PRODUCTS.filter(p=>(p.n+' '+CATN[p.cat]).toLowerCase().includes(q)).slice(0,5):[];
 sg.innerHTML=l.map(p=>`<li><a href="product.html?id=${p.id}">${p.n}<span>$${p.p.toLocaleString('en-US')}</span></a></li>`).join('');
 sg.hidden=!l.length;
});
document.addEventListener('click',e=>{if(!e.target.closest('.tools,.sug'))sg.hidden=true});
addEventListener('keydown',e=>{if(e.key==='Escape'){closeAll();menu(false);srch(false);sg.hidden=true}});

if($('.hero')){
/* ---------- Hero slider: autoplay, swipe, keys, buttons ---------- */
const hero=$('.hero'),slides=$$('.slide'),dotsEl=$('#dots'),prog=$('#prog'),pp=$('#pp');
let cur=0,manual=false,x0=null;
dotsEl.innerHTML=slides.map((_,i)=>`<button aria-label="Go to slide ${i+1}"></button>`).join('');
const dots=$$('button',dotsEl);
const go=k=>{
 cur=(k+slides.length)%slides.length;
 slides.forEach((s,i)=>{s.classList.toggle('on',i===cur);s.setAttribute('aria-hidden',i!==cur)});
 dots.forEach((d,i)=>d.setAttribute('aria-current',i===cur));
 prog.classList.remove('run');void prog.offsetWidth;prog.classList.add('run');
};
dots.forEach((d,i)=>d.onclick=()=>go(i));
$('#pv').onclick=()=>go(cur-1);
$('#nx').onclick=()=>go(cur+1);
prog.addEventListener('animationend',()=>go(cur+1));
pp.onclick=()=>{manual=!manual;hero.classList.toggle('paused',manual);pp.setAttribute('aria-label',manual?'Play slideshow':'Pause slideshow');$('use',pp).setAttribute('href',manual?'#pl':'#pa')};
hero.addEventListener('pointerdown',e=>{if(!e.target.closest('a,button'))x0=e.clientX});
hero.addEventListener('pointerup',e=>{if(x0!==null&&Math.abs(e.clientX-x0)>50)go(cur+(e.clientX<x0?1:-1));x0=null});
hero.addEventListener('pointercancel',()=>x0=null);
hero.addEventListener('keydown',e=>{if(e.key==='ArrowRight')go(cur+1);if(e.key==='ArrowLeft')go(cur-1)});
go(0);

/* ---------- Product carousel: buttons, mouse drag, swatches, cart ---------- */
const tr=$('#track'),tp=$('#tp'),tn=$('#tn');
const step=()=>$('.card',tr).offsetWidth+20;
tp.onclick=()=>tr.scrollBy({left:-step(),behavior:'smooth'});
tn.onclick=()=>tr.scrollBy({left:step(),behavior:'smooth'});
const edge=()=>{tp.disabled=tr.scrollLeft<4;tn.disabled=tr.scrollLeft>tr.scrollWidth-tr.clientWidth-4};
tr.addEventListener('scroll',edge,{passive:true});addEventListener('resize',edge);edge();

let dn=false,sx=0,sl=0;
tr.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse'||e.target.closest('button'))return;dn=true;sx=e.clientX;sl=tr.scrollLeft});
addEventListener('pointermove',e=>{if(!dn)return;const d=e.clientX-sx;if(Math.abs(d)>4)tr.classList.add('drag');tr.scrollLeft=sl-d});
addEventListener('pointerup',()=>{dn=false;tr.classList.remove('drag')});

tr.addEventListener('click',e=>{
 const s=e.target.closest('.sw button'),a=e.target.closest('[data-add]');
 if(s){const c=s.closest('.card');$$('.sw button',c).forEach(b=>b.setAttribute('aria-pressed',b===s));c.style.setProperty('--tint',s.dataset.t+'33')}
 if(a)add(a.dataset.add);
});

}
/* ---------- Scroll reveal & counters ---------- */
const count=b=>{
 const to=+b.dataset.n,s=b.dataset.s||'';
 if(reduce){b.textContent=to+s;return}
 const t0=performance.now();
 (function f(t){const k=Math.min((t-t0)/1400,1);b.textContent=Math.round(to*(1-Math.pow(1-k,3)))+s;if(k<1)requestAnimationFrame(f)})(t0);
};
const io=new IntersectionObserver(es=>es.forEach(e=>{
 if(!e.isIntersecting)return;
 e.target.classList.add('in');$$('[data-n]',e.target).forEach(count);io.unobserve(e.target);
}),{threshold:.2});
$$('.rv').forEach(el=>io.observe(el));

/* ---------- Footer accordion (mobile) & newsletter ---------- */
function sync(){$$('.fcol').forEach(d=>{d.open=desk.matches;$('summary',d).tabIndex=desk.matches?-1:0})}
sync();
if($('#nl'))$('#nl').onsubmit=e=>{e.preventDefault();e.target.reset();toast('Thanks for subscribing!')};

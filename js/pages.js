'use strict';
/* Page templates for shop.html, product.html, cart.html and support.html. Content comes from data.js. */
const PG=document.body.dataset.page,Q=new URLSearchParams(location.search),M=$('#main');
const money=n=>'$'+n.toLocaleString('en-US'),gb=g=>g>=1024?g/1024+' TB':g+' GB';
const esc=s=>s.replace(/[&<>"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]));
const fix=r=>$$('img',r).forEach(i=>{const bad=()=>{if(i.dataset.fb&&!i.dataset.t){i.dataset.t=1;i.src=i.dataset.fb}else i.classList.add('x')};i.addEventListener('error',bad);if(i.complete&&!i.naturalWidth)bad()});
const pimg=p=>`<img src="images/products/${p.img}.png" data-fb="images/categories/${p.cat}.png" alt="${p.n}" loading="lazy">`;
const crumbs=(...a)=>`<nav class="crumbs" aria-label="Breadcrumb"><a href="index.html">Home</a>${a.map(([t,h])=>h?` / <a href="${h}">${t}</a>`:` / <span>${t}</span>`).join('')}</nav>`;
const tile=p=>`<article class="card"><a class="ph" href="product.html?id=${p.id}" style="--tint:${p.c[0][1]}33" aria-label="${p.n}">${pimg(p)}</a>${p.tag?`<span class="tag">${p.tag}</span>`:''}<h3><a href="product.html?id=${p.id}">${p.n}</a></h3><p>${p.d}</p><div class="buy"><b>${money(p.p)}</b><button class="btn" data-add="${p.id}">Add to cart</button></div><button class="cmpb" data-cmp="${p.id}" aria-pressed="${Cmp.get().includes(p.id)}">Compare</button></article>`;
const bar=()=>{
 let b=$('#cbar');if(!b){b=document.createElement('div');b.id='cbar';b.className='cbar';document.body.append(b)}
 const l=Cmp.get();b.hidden=!l.length;
 b.innerHTML=`<span>${l.length} of 3 selected</span><a class="btn light" href="compare.html">Compare now</a><button class="lnk" data-clr>Clear</button>`;
};
const sync2=()=>$$('[data-cmp]').forEach(x=>x.setAttribute('aria-pressed',Cmp.get().includes(x.dataset.cmp)));
document.addEventListener('click',e=>{
 const a=e.target.closest('[data-add]'),c=e.target.closest('[data-cmp]');
 if(a)add(a.dataset.add);
 if(c){if(!Cmp.toggle(c.dataset.cmp))toast('You can compare up to 3 products');sync2();bar()}
 if(e.target.closest('[data-clr]')){Cmp.set([]);sync2();bar()}
});
if(PG==='shop'||PG==='product')bar();

/* ---------- Shop: category, search, sort, price filter ---------- */
if(PG==='shop'){
 const c=Q.get('c'),q=(Q.get('q')||'').trim().toLowerCase(),st={o:'f',m:3000};
 const t=c&&CATN[c]?CATN[c]:q?`Results for “${esc(q)}”`:'All products';
 M.innerHTML=`${crumbs([t])}<h1 class="h2">${t}</h1><div class="filters"><div class="chips">${[['','All'],...Object.entries(CATN)].map(([k,v])=>`<a href="shop.html${k?'?c='+k:''}"${k===(c||'')?' aria-current="true"':''}>${v}</a>`).join('')}</div><label>Sort <select id="so"><option value="f">Featured</option><option value="a">Price: low to high</option><option value="d">Price: high to low</option><option value="n">Name</option></select></label><label>Max price <output id="mo">$3,000</output><input id="mx" type="range" min="100" max="3000" step="100" value="3000" aria-label="Maximum price"></label></div><p class="mut" id="ct" aria-live="polite"></p><div class="pgrid" id="pg"></div>`;
 const draw=()=>{
  const l=PRODUCTS.filter(p=>(!c||p.cat===c)&&(!q||(p.n+' '+p.d).toLowerCase().includes(q))&&p.p<=st.m);
  l.sort((a,b)=>st.o==='a'?a.p-b.p:st.o==='d'?b.p-a.p:st.o==='n'?a.n.localeCompare(b.n):0);
  $('#ct').textContent=l.length+(l.length===1?' product':' products');
  $('#pg').innerHTML=l.map(tile).join('')||'<p class="empty">Nothing matches. Try a higher price or another category.</p>';
  fix($('#pg'));
 };
 $('#so').onchange=e=>{st.o=e.target.value;draw()};
 $('#mx').oninput=e=>{st.m=+e.target.value;$('#mo').textContent=money(st.m);draw()};
 draw();
}

/* ---------- Product detail: colour, storage, specs, related ---------- */
if(PG==='product'){
 const p=PRODUCTS.find(x=>x.id===Q.get('id'))||PRODUCTS[0],rel=PRODUCTS.filter(x=>x.cat===p.cat&&x!==p).slice(0,4);
 let v=0,s=0;
 document.title=p.n+' | Galaxy Store';
 M.innerHTML=`${crumbs([CATN[p.cat],'shop.html?c='+p.cat],[p.n])}<div class="pd"><div class="ph pimg" id="pi">${pimg(p)}</div><div class="pinfo">${p.tag?`<span class="tag">${p.tag}</span>`:''}<h1>${p.n}</h1><p class="mut">★★★★★ 4.8 · 2,481 reviews</p><p>${p.d}</p><b class="price" id="pr"></b><h2 class="lbl">Colour: <span id="cn"></span></h2><div class="sw" id="sw">${p.c.map(([n,h],i)=>`<button style="--c:${h}" aria-label="${n}" aria-pressed="${!i}"></button>`).join('')}</div>${p.s?`<h2 class="lbl">Storage</h2><div class="opts" id="op">${p.s.map((g,i)=>`<button aria-pressed="${!i}">${gb(g)}</button>`).join('')}</div>`:''}<div class="row"><button class="btn" id="ab">Add to cart</button><button class="btn out" id="bn">Buy now</button></div><ul class="perks"><li>Free delivery on orders over $50</li><li>30-day free returns</li><li>1-year limited warranty</li></ul></div></div><h2 class="h2 sp">Key specs</h2><table class="specs">${p.k.map(([a,b])=>`<tr><th scope="row">${a}</th><td>${b}</td></tr>`).join('')}</table>${rel.length?`<h2 class="h2 sp">You may also like</h2><div class="pgrid">${rel.map(tile).join('')}</div>`:''}`;
 const upd=()=>{$('#pr').textContent=money(p.p+(p.s?100*s:0));$('#cn').textContent=p.c[v][0];$('#pi').style.setProperty('--tint',p.c[v][1]+'55')};
 const pick=(box,set)=>{if(!box)return;box.onclick=e=>{const b=e.target.closest('button');if(!b)return;set([...box.children].indexOf(b));$$('button',box).forEach(x=>x.setAttribute('aria-pressed',x===b));upd()}};
 pick($('#sw'),i=>v=i);pick($('#op'),i=>s=i);
 $('#ab').onclick=()=>{Cart.add(p.id,v,s);toast(p.n+' added to cart')};
 $('#bn').onclick=()=>{Cart.add(p.id,v,s);location.href='cart.html'};
 upd();fix(M);
}

/* ---------- Cart & demo checkout ---------- */
if(PG==='cart'){
 let promo=false;
 const draw=()=>{
  const l=Cart.get().filter(x=>PRODUCTS.some(p=>p.id===x.id));
  if(!l.length){M.innerHTML=`${crumbs(['Cart'])}<h1 class="h2">Your cart</h1><p class="empty">Your cart is empty.</p><a class="btn" href="shop.html">Start shopping</a>`;return}
  const sub=l.reduce((a,x)=>a+Cart.line(x)*x.q,0),disc=promo?Math.round(sub*.1):0,ship=sub-disc>=50?0:9.99,tax=Math.round((sub-disc)*.08);
  M.innerHTML=`${crumbs(['Cart'])}<h1 class="h2">Your cart</h1><div class="cartg"><ul class="lines">${l.map((x,i)=>{const p=PRODUCTS.find(y=>y.id===x.id);return`<li><a class="ph thumb" href="product.html?id=${p.id}">${pimg(p)}</a><div><h3>${p.n}</h3><p class="mut">${p.c[x.v][0]}${p.s?' · '+gb(p.s[x.s]):''}</p><div class="qty"><button data-q="${i}:-1" aria-label="Decrease quantity">−</button><span>${x.q}</span><button data-q="${i}:1" aria-label="Increase quantity">+</button><button class="lnk" data-r="${i}">Remove</button></div></div><b>${money(Cart.line(x)*x.q)}</b></li>`}).join('')}</ul><aside class="sum"><h2>Order summary</h2><dl><dt>Subtotal</dt><dd>${money(sub)}</dd>${disc?`<dt>Promo (10%)</dt><dd>−${money(disc)}</dd>`:''}<dt>Delivery</dt><dd>${ship?money(ship):'Free'}</dd><dt>Estimated tax</dt><dd>${money(tax)}</dd><dt class="tot">Total</dt><dd class="tot">${money(sub-disc+ship+tax)}</dd></dl><form id="pc" class="pc"><input id="pcode" placeholder="Promo code (try GALAXY10)" aria-label="Promo code"><button class="btn out">Apply</button></form><form id="co"><h3>Delivery details</h3><input required placeholder="Full name" aria-label="Full name"><input type="email" required placeholder="Email" aria-label="Email"><input required placeholder="Address" aria-label="Address"><button class="btn">Place order</button></form></aside></div>`;
  fix(M);
 };
 M.onclick=e=>{
  const b=e.target.closest('button'),l=Cart.get();if(!b)return;
  if(b.dataset.q){const[i,d]=b.dataset.q.split(':');l[i].q=Math.max(1,l[i].q+ +d)}
  else if(b.dataset.r)l.splice(+b.dataset.r,1);else return;
  Cart.set(l);draw();
 };
 M.onsubmit=e=>{
  e.preventDefault();
  if(e.target.id==='pc'){promo=$('#pcode').value.trim().toUpperCase()==='GALAXY10';toast(promo?'Code applied: 10% off':'That code isn’t valid');draw()}
  else{Cart.set([]);M.innerHTML=`<div class="done"><h1 class="h2">Thanks for your order</h1><p class="mut">This is a demo store, so nothing was charged and no order was placed.</p><p><a class="btn" href="index.html">Back to home</a></p></div>`}
 };
 draw();
}

/* ---------- Support: searchable FAQ ---------- */
if(PG==='support'){
 M.innerHTML=`${crumbs(['Support'])}<h1 class="h2">How can we help?</h1><input class="big" id="fq" type="search" placeholder="Search help topics" aria-label="Search help topics"><div class="topics">${[['Order status','Track a delivery'],['Repairs','Book a service'],['Warranty','Check your coverage'],['Downloads','Manuals and software']].map(([a,b])=>`<a href="#faq"><b>${a}</b><span>${b}</span></a>`).join('')}</div><h2 class="h2 sp" id="faq">Common questions</h2><div id="fl"></div>`;
 const draw=q=>$('#fl').innerHTML=FAQ.filter(([a,b])=>(a+b).toLowerCase().includes(q)).map(([a,b])=>`<details><summary>${a}</summary><p>${b}</p></details>`).join('')||'<p class="empty">No answers found. Try a different word.</p>';
 $('#fq').oninput=e=>draw(e.target.value.toLowerCase());
 draw('');
}

/* ---------- Compare: side-by-side specs ---------- */
if(PG==='compare'){
 const draw=()=>{
  const l=Cmp.get().map(id=>PRODUCTS.find(p=>p.id===id)).filter(Boolean);
  if(l.length<2){M.innerHTML=`${crumbs(['Compare'])}<h1 class="h2">Compare products</h1><p class="empty">Pick at least two products to compare. Use the Compare button on any product card.</p><a class="btn" href="shop.html">Browse products</a>`;return}
  const keys=[...new Set(l.flatMap(p=>p.k.map(x=>x[0])))];
  const row=(h,f)=>`<tr><th scope="row">${h}</th>${l.map(p=>`<td>${f(p)}</td>`).join('')}</tr>`;
  M.innerHTML=`${crumbs(['Compare'])}<h1 class="h2">Compare products</h1><div class="tw"><table class="cmpt"><thead><tr><td></td>${l.map(p=>`<th scope="col"><a class="ph thumb" href="product.html?id=${p.id}">${pimg(p)}</a><a href="product.html?id=${p.id}">${p.n}</a><button class="lnk" data-rm="${p.id}">Remove</button></th>`).join('')}</tr></thead><tbody>${row('Price',p=>money(p.p))}${row('Category',p=>CATN[p.cat])}${row('Colours',p=>p.c.map(x=>x[0]).join(', '))}${keys.map(k=>row(k,p=>(p.k.find(x=>x[0]===k)||[0,'–'])[1])).join('')}<tr><th scope="row"></th>${l.map(p=>`<td><button class="btn" data-add="${p.id}">Add to cart</button></td>`).join('')}</tr></tbody></table></div>`;
  fix(M);
 };
 M.onclick=e=>{const b=e.target.closest('[data-rm]');if(b){Cmp.set(Cmp.get().filter(x=>x!==b.dataset.rm));draw()}};
 draw();
}

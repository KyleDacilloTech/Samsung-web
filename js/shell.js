/* Shared shell and cart storage. Injects header/footer on every page except index.html (which has its own). */
const Cart={
 get(){try{return JSON.parse(localStorage.getItem('gs-cart'))||[]}catch(e){return[]}},
 set(l){try{localStorage.setItem('gs-cart',JSON.stringify(l))}catch(e){}this.badge()},
 add(id,v=0,s=0,q=1){const l=this.get(),i=l.find(x=>x.id===id&&x.v===v&&x.s===s);i?i.q+=q:l.push({id,v,s,q});this.set(l);this.badge(true)},
 line(x){const p=PRODUCTS.find(y=>y.id===x.id);return p.p+(p.s?100*x.s:0)},
 badge(bump){const b=document.getElementById('cartN');if(!b)return;b.textContent=this.get().reduce((a,x)=>a+x.q,0);if(bump){b.classList.remove('bump');void b.offsetWidth;b.classList.add('bump')}}
};
if(!document.getElementById('hdr')){
 document.body.insertAdjacentHTML('afterbegin',`<svg width="0" height="0" style="position:absolute" aria-hidden="true"><symbol id="l" viewBox="0 0 24 24"><path d="m15 6-6 6 6 6"/></symbol><symbol id="r" viewBox="0 0 24 24"><path d="m9 6 6 6-6 6"/></symbol><symbol id="s" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></symbol><symbol id="c" viewBox="0 0 24 24"><path d="M5 8h14l-1 12H6zM9 8a3 3 0 0 1 6 0"/></symbol><symbol id="u" viewBox="0 0 24 24"><path d="M12 19V5m-6 6 6-6 6 6"/></symbol></svg><a class="skip" href="#main">Skip to content</a><header class="hdr" id="hdr"><div class="wrap bar"><button class="ico burger" id="burger" aria-label="Open menu" aria-expanded="false" aria-controls="nav"><i></i><i></i><i></i></button><a class="logo" href="index.html" aria-label="Galaxy Store home">SAMSUNG</a><nav class="nav" id="nav" aria-label="Primary"><ul id="navList"></ul></nav><div class="tools"><form class="srch" id="srch" role="search"><input type="search" placeholder="Search products" aria-label="Search products"></form><button class="ico" id="srchBtn" aria-label="Search" aria-expanded="false"><svg><use href="#s"/></svg></button><a class="ico cart" href="cart.html" aria-label="Cart"><svg><use href="#c"/></svg><b id="cartN" aria-live="polite">0</b></a></div></div></header>`);
 document.body.insertAdjacentHTML('beforeend',`<footer class="ftr"><div class="wrap"><div class="cols" id="foot"></div><p class="legal">© 2026 Galaxy Store demo. A learning project inspired by Samsung’s design; not affiliated with or endorsed by Samsung Electronics. No payments are processed.</p></div></footer><button class="ico top" id="up" aria-label="Back to top"><svg><use href="#u"/></svg></button><div class="toast" id="toast" role="status" aria-live="polite"></div>`);
}
Cart.badge();

/* Compare list (max 3 products), saved in the browser */
const Cmp={
 get(){try{return JSON.parse(localStorage.getItem('gs-cmp'))||[]}catch(e){return[]}},
 set(l){try{localStorage.setItem('gs-cmp',JSON.stringify(l))}catch(e){}},
 toggle(id){let l=this.get();if(l.includes(id))l=l.filter(x=>x!==id);else{if(l.length>=3)return false;l.push(id)}this.set(l);return true}
};

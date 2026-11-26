'use strict';
/* Explore page: keyboard-friendly tabs and the before/after slider. */
const tabs=$$('[role=tab]'),panels=$$('[role=tabpanel]');
const pick=i=>tabs.forEach((t,k)=>{const on=k===i;t.setAttribute('aria-selected',on);t.tabIndex=on?0:-1;panels[k].hidden=!on});
tabs.forEach((t,i)=>{
 t.onclick=()=>pick(i);
 t.onkeydown=e=>{
  const n={ArrowRight:(i+1)%tabs.length,ArrowLeft:(i+tabs.length-1)%tabs.length,Home:0,End:tabs.length-1}[e.key];
  if(n!==undefined){e.preventDefault();pick(n);tabs[n].focus()}
 };
});
pick(0);
const cmp=$('#cmp');
$('input',cmp).oninput=e=>cmp.style.setProperty('--p',e.target.value+'%');
$$('img').forEach(i=>{const bad=()=>i.classList.add('x');i.addEventListener('error',bad);if(i.complete&&!i.naturalWidth)bad()});

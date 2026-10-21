(function(){
  'use strict';
  const yr=document.getElementById('year');if(yr)yr.textContent=String(new Date().getFullYear());
  const cursor=document.getElementById('capyCursor'),switcher=document.getElementById('cursorSwitch');
  const finePointer=window.matchMedia('(hover: hover) and (pointer: fine)');
  const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
  if(!cursor||!switcher)return;
  let stored;
  try{stored=window.localStorage.getItem('kapibara.cursor');}catch(_){stored=null;}
  let enabled=stored!=='off';
  switcher.checked=enabled;
  let imageLoaded=false;
  const img=cursor.querySelector('img');
  function refresh(){const active=enabled&&finePointer.matches&&!reducedMotion.matches&&imageLoaded;document.documentElement.classList.toggle('capy-enabled',active);cursor.style.display=active?'block':'none';}
  if(img){img.addEventListener('load',()=>{imageLoaded=true;refresh()});img.addEventListener('error',()=>{imageLoaded=false;refresh()});if(img.complete&&img.naturalWidth){imageLoaded=true;}}
  switcher.addEventListener('change',()=>{enabled=switcher.checked;try{localStorage.setItem('kapibara.cursor',enabled?'on':'off');}catch(_){}refresh()});
  finePointer.addEventListener('change',refresh);reducedMotion.addEventListener('change',refresh);
  document.addEventListener('pointermove',e=>{if(!document.documentElement.classList.contains('capy-enabled'))return;cursor.style.transform=`translate3d(${e.clientX+7}px,${e.clientY+7}px,0)`;cursor.classList.toggle('is-link',!!e.target.closest('a,button,input,label'));},{passive:true});
  document.addEventListener('pointerleave',()=>{cursor.style.opacity='0'});document.addEventListener('pointerenter',()=>{cursor.style.opacity='1'});
  refresh();
})();
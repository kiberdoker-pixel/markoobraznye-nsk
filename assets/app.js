(function(){
  'use strict';
  // Each decorative star has its own rhythm and phase; no simultaneous movement.
  const starDurations=[4.4,5.8,3.9,6.2,4.7,5.5,7.0,4.1,6.5,5.1];
  const starDelays=[-1.4,-3.8,-.7,-4.5,-2.8,-5.2,-1.9,-3.1,-6.1,-.4];
  document.querySelectorAll('.capy-star').forEach((star,i)=>{
    star.style.setProperty('--star-duration',starDurations[i%starDurations.length]+'s');
    star.style.setProperty('--star-delay',starDelays[i%starDelays.length]+'s');
  });
  const yr=document.getElementById('year');if(yr)yr.textContent=String(new Date().getFullYear());
  const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
  // The web tile's arrow follows the existing command-symbol-shaped route.
  // SVG motion is paused when the visitor has requested reduced motion.
  const webMotionSvg=document.querySelector('.tile-web-icon');
  function syncWebMotion(){
    if(!webMotionSvg || typeof webMotionSvg.pauseAnimations!=='function')return;
    if(reducedMotion.matches)webMotionSvg.pauseAnimations();
    else webMotionSvg.unpauseAnimations();
  }
  reducedMotion.addEventListener('change',syncWebMotion);
  syncWebMotion();
})();

/* Immersive interaction layer — progressive enhancement only */
(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const visual = document.querySelector('.hero-visual');
  const card = document.querySelector('.hero-img-wrap');
  if (!reduce && visual && card && matchMedia('(pointer:fine)').matches) {
    visual.addEventListener('pointermove', e => {
      const r=visual.getBoundingClientRect(), x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
      card.style.transform=`perspective(1000px) rotateX(${-y*8}deg) rotateY(${x*10}deg) translateZ(8px)`;
    });
    visual.addEventListener('pointerleave',()=>card.style.transform='');
  }
  const nav=document.getElementById('main-nav');
  let ticking=false;
  window.addEventListener('scroll',()=>{
    if(ticking)return;ticking=true;
    requestAnimationFrame(()=>{if(nav)nav.style.borderBottomColor=scrollY>40?'rgba(53,224,192,.18)':'rgba(255,255,255,.08)';ticking=false});
  },{passive:true});
  document.querySelectorAll('img').forEach(img=>{if(!img.hasAttribute('loading')&&!img.hasAttribute('fetchpriority'))img.loading='lazy';});
  if(!reduce){
    const canvas=document.createElement('canvas');canvas.setAttribute('aria-hidden','true');canvas.style.cssText='position:fixed;inset:0;z-index:-1;pointer-events:none;opacity:.35';
    document.body.appendChild(canvas);const ctx=canvas.getContext('2d');let pts=[];
    const resize=()=>{canvas.width=innerWidth;canvas.height=innerHeight;pts=Array.from({length:Math.min(70,Math.floor(innerWidth/20))},()=>({x:Math.random()*canvas.width,y:Math.random()*canvas.height,vx:(Math.random()-.5)*.18,vy:(Math.random()-.5)*.18}))};resize();addEventListener('resize',resize,{passive:true});
    const draw=()=>{ctx.clearRect(0,0,canvas.width,canvas.height);ctx.fillStyle='rgba(53,224,192,.45)';for(const p of pts){p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>canvas.width)p.vx*=-1;if(p.y<0||p.y>canvas.height)p.vy*=-1;ctx.beginPath();ctx.arc(p.x,p.y,1.2,0,Math.PI*2);ctx.fill()}requestAnimationFrame(draw)};draw();
  }
})();
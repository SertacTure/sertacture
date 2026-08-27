(()=>{
  const syncKickLabel=()=>{
    const cta=document.getElementById('navKickCta');
    if(!cta)return;
    const apply=()=>{
      if(cta.classList.contains('live')){
        cta.textContent='● Kick Yayında';
        cta.setAttribute('aria-label','Kick yayınını aç');
        cta.title='Kick — şu an yayında';
        document.title='● Lumos Yayında — Sertaç Türe';
      }else{
        if(cta.textContent.trim()==='● Kick Yayında'||cta.textContent.trim()==='● LIVE') cta.textContent="Kick'e git";
        cta.setAttribute('aria-label','Kick kanalını aç');
        cta.title='Kick · lumossnox';
      }
    };
    apply();
    new MutationObserver(apply).observe(cta,{attributes:true,attributeFilter:['class']});
  };

  const addStyles=()=>{
    const s=document.createElement('style');
    s.textContent=`
      .clips-v9{margin-top:42px;padding-top:6px;opacity:1!important;transform:none!important}
      .clips-v9-head{display:flex;align-items:end;justify-content:space-between;gap:28px;margin-bottom:20px}
      .clips-v9 .eyebrow{display:block;margin-bottom:8px}
      .clips-v9 h3{margin:0;font-size:clamp(30px,4vw,52px);line-height:1}
      .clips-v9-head p{max-width:470px;margin:0;color:var(--muted);line-height:1.75}
      .clip-v9-card{position:relative;overflow:hidden;border:1px solid var(--line);border-radius:28px;background:var(--panel);box-shadow:var(--shadow)}
      .clip-v9-frame{aspect-ratio:16/9;background:linear-gradient(135deg,#111a16,#171326);overflow:hidden}
      .clip-v9-frame video{width:100%;height:100%;object-fit:contain;background:#050706;display:block}
      .clip-v9-meta{display:flex;justify-content:space-between;gap:20px;align-items:center;padding:18px 22px}
      .clip-v9-meta strong{font-size:16px}.clip-v9-meta span{font:500 12px/1.3 'JetBrains Mono',monospace;color:var(--muted);letter-spacing:.04em}
      .nav-links a[href="#klip"]{display:inline-flex}
      @media(max-width:760px){.clips-v9{margin-top:28px}.clips-v9-head{display:block;margin-bottom:14px}.clips-v9-head p{margin-top:12px}.clip-v9-card{border-radius:20px}.clip-v9-meta{padding:14px 16px;align-items:flex-start;flex-direction:column;gap:5px}}
    `;
    document.head.appendChild(s);
  };

  const build=()=>{
    syncKickLabel();
    const grid=document.querySelector('.games-grid');
    if(!grid||document.getElementById('klip'))return;
    addStyles();
    const sec=document.createElement('section');
    sec.className='clips-v9';
    sec.id='klip';
    sec.innerHTML=`<div class="clips-v9-head"><div><span class="eyebrow">klip / 01</span><h3>Gece vardiyasından.</h3></div><p>Bir round, biraz kaos. Lumos tarafından kısa bir Valorant anı.</p></div><article class="clip-v9-card"><div class="clip-v9-frame"><video controls playsinline preload="metadata" poster="./assets/clip_01_poster.jpg" aria-label="Lumos Valorant klibi"><source src="./assets/clip_01.mp4" type="video/mp4">Tarayıcınız video oynatmayı desteklemiyor.</video></div><div class="clip-v9-meta"><strong>Lumos Clip #01</strong><span>VALORANT · OMEN</span></div></article>`;
    grid.insertAdjacentElement('afterend',sec);
    const nav=document.querySelector('.nav-links');
    if(nav&&!nav.querySelector('a[href="#klip"]')){
      const a=document.createElement('a');a.href='#klip';a.textContent='Klip';
      const y=nav.querySelector('a[href="#yayin"]');nav.insertBefore(a,y||null);
    }
  };

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',build,{once:true});else build();
})();

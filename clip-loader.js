(()=>{
  const CHUNKS=12;

  const addStyles=()=>{
    const s=document.createElement('style');
    s.textContent=`
      .clips-v9{margin-top:42px;padding-top:34px;border-top:1px solid rgba(255,255,255,.12);opacity:1!important;transform:none!important}
      .clips-v9-head{display:flex;align-items:end;justify-content:space-between;gap:28px;margin-bottom:20px}
      .clips-v9 .eyebrow{display:block;margin-bottom:8px}
      .clips-v9 h3{margin:0;font-family:'Playfair Display',serif;font-size:clamp(30px,4vw,52px);line-height:1.02}
      .clips-v9-head p{max-width:470px;margin:0;color:rgba(255,255,255,.62);line-height:1.7;font-size:14px}
      .clip-v9-card{position:relative;overflow:hidden;border:1px solid rgba(255,255,255,.10);border-radius:28px;background:#111814;box-shadow:0 28px 70px rgba(0,0,0,.28)}
      .clip-v9-frame{aspect-ratio:16/9;background:linear-gradient(135deg,#111a16,#171326);display:grid;place-items:center;overflow:hidden}
      .clip-v9-frame video{width:100%;height:100%;object-fit:contain;background:#050706;display:block}
      .clip-v9-meta{display:flex;justify-content:space-between;gap:20px;align-items:center;padding:18px 22px}
      .clip-v9-meta strong{font-size:16px;color:#fff}
      .clip-v9-meta span{font:500 12px/1.3 'JetBrains Mono',monospace;color:rgba(255,255,255,.55);letter-spacing:.04em}
      .clip-v9-loading{font:600 13px/1.4 'JetBrains Mono',monospace;color:#cbd8d0;opacity:.8}
      .clip-v9-error{display:flex;flex-direction:column;gap:10px;align-items:center;text-align:center;color:rgba(255,255,255,.72)}
      .clip-v9-error a{color:#f0b47e;font-weight:800;text-decoration:none}
      .nav-links a[href="#klip"]{display:inline-flex}
      .nav-cta.live{background:#f05a5a!important;color:#fff!important;box-shadow:0 0 0 1px rgba(240,90,90,.22),0 0 28px rgba(240,90,90,.28)!important}
      .mobile-dock{display:none}
      @media(max-width:760px){
        body{padding-bottom:72px}
        .clips-v9{margin-top:28px;padding-top:26px}
        .clips-v9-head{display:block;margin-bottom:14px}
        .clips-v9-head p{margin-top:12px}
        .clip-v9-card{border-radius:20px}
        .clip-v9-meta{padding:14px 16px;align-items:flex-start;flex-direction:column;gap:5px}
        .mobile-dock{position:fixed;display:grid;grid-template-columns:1fr 1fr 1fr;left:12px;right:12px;bottom:12px;z-index:160;background:rgba(14,20,17,.88);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);border:1px solid rgba(255,255,255,.10);border-radius:17px;padding:6px;box-shadow:0 18px 46px rgba(0,0,0,.35)}
        .mobile-dock a,.mobile-dock button{border:0;background:transparent;color:#dbe4dd;text-decoration:none;text-align:center;border-radius:12px;padding:10px 6px;font:700 11px/1.2 'Manrope',sans-serif;cursor:pointer}
        .mobile-dock a:active,.mobile-dock button:active{background:rgba(255,255,255,.08)}
        .mobile-dock .dock-kick.live{background:#f05a5a;color:#fff}
      }
      @media(prefers-reduced-motion:reduce){*{scroll-behavior:auto!important;animation-duration:.001ms!important;transition-duration:.001ms!important}}
      a:focus-visible,button:focus-visible{outline:2px solid #f0b47e;outline-offset:3px}
    `;
    document.head.appendChild(s);
  };

  const copyDiscord=async()=>{
    try{
      await navigator.clipboard.writeText('Sertacture');
      if(typeof showToast==='function') showToast('Discord adı kopyalandı.');
    }catch(e){}
  };

  const addMobileDock=()=>{
    if(document.querySelector('.mobile-dock')) return;
    const dock=document.createElement('div');
    dock.className='mobile-dock';
    dock.setAttribute('aria-label','Hızlı bağlantılar');
    dock.innerHTML=`<a href="#klip">Klip</a><a class="dock-kick" href="https://kick.com/lumossnox" rel="noopener" target="_blank">Kick</a><button type="button" class="dock-discord">Discord</button>`;
    dock.querySelector('.dock-discord').addEventListener('click',copyDiscord);
    document.body.appendChild(dock);
  };

  const syncKick=()=>{
    const cta=document.getElementById('navKickCta');
    const dock=document.querySelector('.dock-kick');
    if(!cta) return;
    const apply=()=>{
      const live=cta.classList.contains('live');
      cta.textContent=live?'● Kick Yayında':"Kick'e git";
      cta.title=live?'Kick — şu an yayında':'Kick · lumossnox';
      cta.setAttribute('aria-label',live?'Kick yayınını aç':'Kick kanalını aç');
      if(dock){
        dock.textContent=live?'● Yayında':'Kick';
        dock.classList.toggle('live',live);
      }
      document.title=live?'● Lumos Yayında — Sertaç Türe':'Sertaç Türe — Valorant, Doğa & Yayın';
    };
    apply();
    new MutationObserver(apply).observe(cta,{attributes:true,attributeFilter:['class']});
  };

  const buildClip=()=>{
    const grid=document.querySelector('.games-grid');
    if(!grid || document.getElementById('klip')) return;

    const sec=document.createElement('section');
    sec.className='clips-v9 visible';
    sec.id='klip';
    sec.innerHTML=`
      <div class="clips-v9-head">
        <div><span class="eyebrow">klip / 01</span><h3>Gece vardiyasından.</h3></div>
        <p>Valorant tarafında kısa bir an. İkinci klip geldiğinde burası iki parçalık kısa bir seçkiye dönüşecek.</p>
      </div>
      <article class="clip-v9-card">
        <div class="clip-v9-frame"><span class="clip-v9-loading">Klip hazırlanıyor…</span><video controls playsinline preload="metadata" aria-label="Valorant yayın klibi" style="display:none"></video></div>
        <div class="clip-v9-meta"><strong>Valorant · Lumos</strong><span>KLİP 01 · 00:12</span></div>
      </article>`;
    grid.insertAdjacentElement('afterend',sec);

    const nav=document.querySelector('.nav-links');
    if(nav&&!nav.querySelector('a[href="#klip"]')){
      const a=document.createElement('a');a.href='#klip';a.textContent='Klip';
      const y=nav.querySelector('a[href="#yayin"]');nav.insertBefore(a,y||null);
    }

    Promise.all(Array.from({length:CHUNKS},(_,i)=>
      fetch(`./assets/clip_${String(i).padStart(2,'0')}.txt?v=3`,{cache:'no-store'})
        .then(r=>{if(!r.ok)throw new Error('chunk');return r.text()})
    )).then(parts=>{
      const b64=parts.join('').replace(/\s+/g,'');
      const raw=atob(b64);
      const bytes=new Uint8Array(raw.length);
      for(let i=0;i<raw.length;i++) bytes[i]=raw.charCodeAt(i);
      const v=sec.querySelector('video');
      v.src=URL.createObjectURL(new Blob([bytes],{type:'video/mp4'}));
      v.style.display='block';
      sec.querySelector('.clip-v9-loading')?.remove();
      v.addEventListener('error',()=>{
        const frame=sec.querySelector('.clip-v9-frame');
        frame.innerHTML='<div class="clip-v9-error"><strong>Video açılamadı.</strong><a href="https://kick.com/lumossnox" target="_blank" rel="noopener">Kick kanalına git ↗</a></div>';
      },{once:true});
    }).catch(()=>{
      const frame=sec.querySelector('.clip-v9-frame');
      frame.innerHTML='<div class="clip-v9-error"><strong>Klip yüklenemedi.</strong><a href="https://kick.com/lumossnox" target="_blank" rel="noopener">Kick kanalına git ↗</a></div>';
    });
  };

  const build=()=>{
    addStyles();
    buildClip();
    addMobileDock();
    syncKick();
  };

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',build,{once:true});
  else build();
})();

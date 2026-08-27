(()=>{
  const CHUNKS=12;
  const addStyles=()=>{const s=document.createElement('style');s.textContent=`
  .clips-v9{margin-top:42px;padding-top:6px}.clips-v9-head{display:flex;align-items:end;justify-content:space-between;gap:28px;margin-bottom:20px}.clips-v9 .eyebrow{display:block;margin-bottom:8px}.clips-v9 h3{margin:0;font-size:clamp(30px,4vw,52px);line-height:1}.clips-v9-head p{max-width:470px;margin:0;color:var(--muted);line-height:1.75}.clip-v9-card{position:relative;overflow:hidden;border:1px solid var(--line);border-radius:28px;background:var(--panel);box-shadow:var(--shadow)}.clip-v9-frame{aspect-ratio:16/9;background:linear-gradient(135deg,#111a16,#171326);display:grid;place-items:center;overflow:hidden}.clip-v9-frame video{width:100%;height:100%;object-fit:contain;background:#050706;display:block}.clip-v9-meta{display:flex;justify-content:space-between;gap:20px;align-items:center;padding:18px 22px}.clip-v9-meta strong{font-size:16px}.clip-v9-meta span{font:500 12px/1.3 'JetBrains Mono',monospace;color:var(--muted);letter-spacing:.04em}.clip-v9-loading{font:600 13px/1.4 'JetBrains Mono',monospace;color:#cbd8d0;opacity:.8}.nav-links a[href="#klip"]{display:inline-flex}@media(max-width:760px){.clips-v9{margin-top:28px}.clips-v9-head{display:block;margin-bottom:14px}.clips-v9-head p{margin-top:12px}.clip-v9-card{border-radius:20px}.clip-v9-meta{padding:14px 16px;align-items:flex-start;flex-direction:column;gap:5px}}`;
    document.head.appendChild(s)};
  const build=()=>{
    const grid=document.querySelector('.games-grid'); if(!grid)return;
    addStyles();
    const sec=document.createElement('section');sec.className='clips-v9 reveal';sec.id='klip';
    sec.innerHTML=`<div class="clips-v9-head"><div><span class="eyebrow">klip / 01</span><h3>Gece vardiyasından.</h3></div><p>Valorant tarafında kısa bir an. İkinci klip geldiğinde burası iki parçalık kısa bir seçkiye dönüşecek.</p></div><article class="clip-v9-card"><div class="clip-v9-frame"><span class="clip-v9-loading">Klip hazırlanıyor…</span><video controls playsinline preload="metadata" aria-label="Valorant yayın klibi" style="display:none"></video></div><div class="clip-v9-meta"><strong>Valorant · Lumos</strong><span>OYNA · KLİP 01</span></div></article>`;
    grid.insertAdjacentElement('afterend',sec);
    const nav=document.querySelector('.nav-links');if(nav&&!nav.querySelector('a[href="#klip"]')){const a=document.createElement('a');a.href='#klip';a.textContent='Klip';const y=nav.querySelector('a[href="#yayin"]');nav.insertBefore(a,y||null)}
    Promise.all(Array.from({length:CHUNKS},(_,i)=>fetch(`./assets/clip_${String(i).padStart(2,'0')}.txt`).then(r=>{if(!r.ok)throw new Error('chunk');return r.text()}))).then(parts=>{
      const b64=parts.join('').replace(/\s+/g,'');const raw=atob(b64);const bytes=new Uint8Array(raw.length);for(let i=0;i<raw.length;i++)bytes[i]=raw.charCodeAt(i);const url=URL.createObjectURL(new Blob([bytes],{type:'video/mp4'}));const v=sec.querySelector('video');v.src=url;v.style.display='block';sec.querySelector('.clip-v9-loading')?.remove();
    }).catch(()=>{const l=sec.querySelector('.clip-v9-loading');if(l)l.textContent='Klip yüklenemedi.'});
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',build,{once:true});else build();
})();

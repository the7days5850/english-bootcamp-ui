(function(){
const EB=window.EB={screens:{}};
EB.screens.home=function(D){
const R=document.getElementById('root');
const esc=t=>String(t??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const C='①②③④⑤⑥';
const day=s=>{const m=/^\d{4}-(\d{2})-(\d{2})/.exec(s||'');return m?(+m[1])+'월 '+(+m[2])+'일':''};
const labs=c=>c.labs.length>4?c.labs.slice(0,3).join(', ')+' 외 '+(c.labs.length-3)+'개':c.labs.join(', ');
if(!D){R.innerHTML='<div style="padding:1rem;border:0.5px dashed var(--border-strong);border-radius:12px;color:var(--text-secondary);font-size:14px">이 파일은 부트캠프 첫 화면의 빈 틀이에요. 플러그인이 DB 정보를 채워 넣어서 대화 속에 띄워요. 이 파일만 따로 열면 아무것도 나오지 않는 게 정상이에요.</div>'}
else if(D.mode==='home'){
 let h=`<div class="hd"><i class="ti ti-school" style="font-size:22px;color:var(--ac)" aria-hidden="true"></i><b>영어 부트 캠프</b><span class="pill">${D.total?`지문 ${D.total}개 · ${D.sets}묶음`:(D.unk?'지문 DB는 과정을 누르면 불러와요':'아직 지문이 없어요')}</span></div>`;
 if(D.mychk){const m=D.mychk;h+=`<div class="my"><div class="t"><i class="ti ti-sparkles" aria-hidden="true"></i>쓸수록 우리 학원 자료가 됩니다<span class="cnt">${m.n?`내 점검 ${m.n}개`:'내 점검 0개'}</span></div><div class="d">더 점검했으면 하는 게 있으면 Claude에게 말씀만 하세요. 자료를 고쳐 달라고 할 때 <b>“앞으로도 계속”</b>을 고르면 그 고침이 규칙이 되어 모든 과정에 자동으로 적용돼요. 시간이 갈수록 선생님만의 맞춤 자료가 완성돼요.</div><div class="e">${m.last?`최근 추가: "${esc(m.last)}"`:m.base?`플러그인 기본 규칙 ${m.base}개가 들어 있어요 — 고칠 때 “앞으로도 계속”을 고르면 우리 학원 규칙이 더해져요`:'예) "숙어는 단어보다 먼저" · "빈칸은 문장마다 하나 이상" · "서술형은 지문마다 2문제까지만" — ① 어휘정리 · ② 지문분석 · ③ 워크북 · ④ 변형문제에 적용돼요'}</div><div class="bt"><button type="button" class="sub" data-msg="${esc(m.add)}">＋ 점검 항목 더하기</button>${m.n?`<button type="button" class="sub" data-msg="${esc(m.list)}">내 점검 항목 보기</button>`:''}</div></div>`}
 if(D.cont){const c=D.cont;h+=`<div class="cap">이어서 하기</div><div class="cont"><div><div class="t">${C[c.n-1]} ${esc(c.name)}</div><div class="d">${esc(c.from)}에서 쓴 ${esc(c.set)} ${c.count}지문 그대로 (${esc(labs(c))})</div></div><button type="button" class="go" data-msg="${esc(c.msg)}">이어서 만들기 ↗</button></div>`}
 h+=`<div class="prep"><div class="cap">준비</div><button type="button" class="row" data-guide="g-reg" aria-expanded="false"><i class="ti ti-file-upload ic" aria-hidden="true"></i><span><span class="t">지문 등록</span><span class="d">시험지·문제집 PDF, 한글 파일을 DB에 넣어요</span></span><span class="r"><i class="ti ti-chevron-down" aria-hidden="true"></i></span></button><div class="gd" id="g-reg" hidden><div class="gs"><b>1</b>아래 입력창 왼쪽 <span class="key">＋</span> 를 눌러요</div><div class="gs"><b>2</b>등록할 파일을 골라요 <span class="dim">(여러 개 한 번에 · 정답표도 같이 고르면 더 빨라요)</span></div><div class="gs"><b>3</b>아무 말 없이 <span class="key">보내기</span> 만 눌러도 등록이 시작돼요</div><div class="gn">학교 중간·기말 시험지는 원문으로 넣지 않고 기출분석 때 써요.</div></div><button type="button" class="row" style="margin-top:8px" data-msg="[부트캠프] DB 둘러보기"><i class="ti ti-layout-grid ic" aria-hidden="true"></i><span><span class="t">DB 둘러보기 · 작업실</span><span class="d">교과서·모의고사·부교재·학교 프린트를 골라 시험 범위(작업실)에 담아요</span></span><span class="r">${D.total?`<span class="mk">${D.total}지문</span>`:''}<i class="ti ti-chevron-right" aria-hidden="true"></i></span></button><button type="button" class="row" style="margin-top:8px" data-guide="g-logo" aria-expanded="false"><i class="ti ti-photo ic" aria-hidden="true"></i><span><span class="t">학원 로고</span><span class="d">그림 파일을 올리면 모든 자료 아래쪽에 들어가요</span></span><span class="r">${D.logo?'<span class="mk">넣어 둠</span>':'<span class="tag">아직 없음</span>'}<i class="ti ti-chevron-down" aria-hidden="true"></i></span></button><div class="gd" id="g-logo" hidden><div class="gs"><b>1</b>아래 입력창 왼쪽 <span class="key">＋</span> 를 눌러 로고 그림을 골라요</div><div class="gs"><b>2</b>입력창에 <span class="key">로고</span> 라고 쓰고 보내요</div><div class="gn">${D.logo?'새 그림을 올리면 바뀌어요.':'모든 자료 아래쪽에 들어가요. 흰 바탕 그림이면 가장 깔끔해요.'}</div></div></div>`;
 h+=`<div class="cap">과정</div><div class="flow">`+D.steps.map(s=>{const cls=s.soon?'soon':(s.ready?'':'off');
  const right=s.soon?'<span class="tag">준비 중</span>':(s.ready?(s.made?`<span class="mk">${day(s.made)} 만듦</span>`:'')+'<i class="ti ti-chevron-right" aria-hidden="true"></i>':'<span class="tag">지문 등록 먼저</span>');
  return `<div class="st ${cls}"><div class="n"><span>${s.n}</span><i></i></div><button type="button" class="row" ${s.ready?`data-msg="${esc(s.msg)}"`:'disabled aria-disabled="true"'}><i class="ti ${s.icon} ic" aria-hidden="true"></i><span><span class="t">${esc(s.name)}</span><span class="d">${esc(s.d)}</span></span><span class="r">${right}</span></button></div>`}).join('')+`</div>`;
 R.innerHTML=`<div>${h}</div>`;
}
else if(D.mode==='next'){const c=D.cont;
 let h=`<div class="nx"><span class="ok">✓ ${esc(D.done)} 완성</span>`;
 if(c.ready)h+=`<div class="t">다음 단계: ${C[c.n-1]} ${esc(c.name)}</div><div class="d">같은 지문(${esc(c.set)} ${esc(labs(c))})으로 이어서 만들어요. 주문서가 미리 채워져서 떠요.</div><div class="bt"><button type="button" class="go" data-msg="${esc(c.msg)}">${C[c.n-1]} ${esc(c.name)} 이어서 만들기 ↗</button><button type="button" class="sub" data-msg="${esc(D.home)}">처음 화면</button></div>`;
 else h+=`<div class="t" style="opacity:.6">다음 단계: ${C[c.n-1]} ${esc(c.name)} (준비 중)</div><div class="d">이 단계는 곧 추가돼요. 지금은 처음 화면에서 다른 과정을 고를 수 있어요.</div><div class="bt"><button type="button" class="sub" data-msg="${esc(D.home)}">처음 화면</button></div>`;
 if(D.qa){const q=D.qa;h+=`<div class="qa"><div class="qh">품질 점검 <span class="b">${q.count}가지 모두 통과</span>${q.minutes?`<span style="font-weight:400;font-size:13px;color:var(--text-secondary)">· 예상 풀이 약 ${q.minutes}분</span>`:''}</div><ul>${q.rows.map(r=>`<li><b>${esc(r[0])}</b></li>`).join('')}</ul><div class="qk"><div class="t">쓸수록 우리 학원 ${q.skill==='variant'?'시험지':'자료'}가 됩니다</div><div class="d">더 점검했으면 하는 게 있으면 Claude에게 말씀만 하세요. 고쳐 달라고 할 때 “앞으로도 계속”을 고르면 그 고침이 규칙이 되어 다음부터 ★ 선생님 점검으로 매번 자동 확인해요. 시간이 갈수록 선생님만의 맞춤 ${q.skill==='variant'?'문제':'자료'}가 완성돼요.</div><div class="e">${q.skill==='vocab'?'예) "숙어는 단어보다 먼저 싣기" · "한영 테스트 뜻은 하나만"':q.skill==='workbook'?'예) "빈칸은 문장마다 하나 이상" · "어법 자리에 관사는 넣지 마"':q.skill==='passage'?'예) "어휘 풀이는 지문마다 5개 이상" · "요약문은 20단어 이내"':'예) "빈칸 정답은 본문에 없는 낱말로" · "서술형은 지문마다 2문제까지만"'}</div><button type="button" class="sub" data-msg="${esc(q.add)}">＋ 점검 항목 더하기</button></div></div>`}
 if(D.notes&&D.notes.length)h+=`<details class="dt"><summary>자세히 보기 (${D.notes.length})</summary><ul>${D.notes.map(n=>`<li>${esc(n)}</li>`).join('')}</ul></details>`;
 R.innerHTML=h+'</div>';
}
if(D)R.querySelectorAll('[data-msg]').forEach(b=>b.onclick=()=>EB.send(b.dataset.msg));
if(D)R.querySelectorAll('[data-guide]').forEach(b=>b.onclick=()=>{const g=document.getElementById(b.dataset.guide),open=g.hidden;g.hidden=!open;b.setAttribute('aria-expanded',open);const i=b.querySelector('.r .ti:last-child');if(i)i.className='ti '+(open?'ti-chevron-up':'ti-chevron-down')});  // 지문 등록·로고: 대화로 보내지 않고 화면 안에서 안내를 펼친다(사용자 2026-11-12 "UI에 바로 나와야 한다")

};
EB.screens.form=function(D){
if(!D){document.getElementById('root').innerHTML='<div style="padding:1rem;border:0.5px dashed var(--border-strong);border-radius:12px;color:var(--text-secondary);font-size:14px">이 파일은 주문서의 빈 틀이에요. 플러그인이 DB의 지문 목록을 채워 넣어서 대화 속에 띄워요. 이 파일만 따로 열면 아무것도 나오지 않는 게 정상이에요.</div>'}
else{
const CF=D.config,SETS=D.sets,PRE=D.presets||[];
const $=s=>document.querySelector(s);
const esc=t=>String(t).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const S={pre:-1,v:{}};
const sec=k=>CF.sections.find(x=>x.key===k);
function blank(){const v={};for(const x of CF.sections){
 if(x.type==='sets')v[x.key]=SETS.length?SETS[0].k:'';
 else if(x.type==='nums')v[x.key]=new Set();
 else if(x.type==='choice')v[x.key]=x.multi?new Set(x.default||[]):(x.default||x.opts[0][0]);
 else if(x.type==='tree'){const all=x.groups.flatMap(g=>g.items.map(i=>i[0]));v[x.key]={items:new Set(x.default==='all'||!x.default?all:x.default),rounds:Object.fromEntries(x.groups.flatMap(g=>g.items.filter(i=>i[3]!==undefined).map(i=>[i[0],i[3]])))}}
 else if(x.type==='name')v[x.key]='';
 else if(x.type==='text')v[x.key]=x.default||'';}return v}
function load(st){const v=blank();for(const x of CF.sections){const s=st[x.key];if(s===undefined)continue;
 if(x.type==='nums')v[x.key]=new Set(s);else if(x.type==='choice')v[x.key]=x.multi?new Set(s):s;
 else if(x.type==='tree')v[x.key]={items:new Set(s.items),rounds:{...v[x.key].rounds,...(s.rounds||{})}};else if(x.type!=='name'&&x.type!=='text')v[x.key]=s;}
 if(!SETS.some(z=>z.k===v[secT('sets')]))v[secT('sets')]=SETS.length?SETS[0].k:'';S.v=v}
const secT=t=>(CF.sections.find(x=>x.type===t)||{}).key;
S.v=blank();if(PRE.length){S.pre=0;load(PRE[0].state)}
const CA=D.carry;if(CA&&SETS.some(z=>z.k===CA.set)){S.v[secT('sets')]=CA.set;S.v[secT('nums')]=new Set(CA.nums);S.pre=-1}
const T=()=>{S.pre=-1};
function curSet(){return SETS.find(z=>z.k===S.v[secT('sets')])||SETS[0]}
function hit(c){const v=S.v[c.key];const has=k=>v instanceof Set?v.has(k):(v&&v.items?v.items.has(k):v===k);return c.any.some(has)}
function visible(x){if(!x.showIf)return true;return [].concat(x.showIf).every(c=>{const v=S.v[c.key];const ks=v instanceof Set?[...v]:(v&&v.items?[...v.items]:[v]);if(c.any)return c.any.some(k=>ks.includes(k));if(c.prefix)return ks.some(k=>String(k).startsWith(c.prefix));if(c.notPrefix)return ks.some(k=>!String(k).startsWith(c.notPrefix));return true})}
const OPEN={};function isOpen(key,gk,n){const k=key+'|'+gk;return k in OPEN?OPEN[k]:n>0}
const BR=D.brand||{};
function HEAD(){const n=S.v[secT('nums')],tr=CF.sections.find(x=>x.type==='tree'&&visible(x));const big=tr?ttot(tr)+(tr.unit||'종'):(n?n.size+'개':'');return `<div class="hd"><div class="lg ${BR.logo?'im':''}">${BR.logo?`<img src="${BR.logo}" alt="${esc(BR.name||'학원 로고')}">`:'<i class="ti ti-school" aria-hidden="true"></i>'}</div><div><div class="ttl">${esc(CF.title)} 주문서</div><div class="sub">${BR.name?esc(BR.name)+' · ':''}눌러서 고르고, 맨 아래 만들기만 누르면 돼요</div></div>${n&&n.size?`<div class="live">지문 ${n.size}개${tr?'<b>'+esc(big)+'</b>':''}</div>`:''}</div>`}
const HX=(CF.sections.find(x=>x.type==='nums')||{}).hist,HD=D.hist||{},NT=t=>String(t||'').replace(/\s+/g,'').toLowerCase();
const MN={keep:'본문 그대로',word:'낱말만 바꾸기',light:'문장 조금 고치기',heavy:'문장 많이 고치기','new':'새로 쓰기'};
const CLS=()=>HX?NT(S.v[HX.by]):'';const HN=id=>{const c=CLS();return c?((HD[id]||{})[c]||{}).n||0:0};
const DOTS=id=>'<i></i>'.repeat(Math.min(HN(id),3));const MD=d=>d?(+d.slice(5,7))+'/'+(+d.slice(8,10)):'';
const ANY=Object.keys(HD).length>0;
function NEWN(k){const R=document.getElementById('root'),x=sec(k),e=R.querySelector('#nw-'+k);if(!e||!x||!(x.chipList||[]).length)return;const v=S.v[k]||'';
 e.textContent=v.trim()&&!x.chipList.some(n=>NT(n)===NT(v))?'처음 쓰는 반 이름이에요 — 새 반으로 따로 기록돼요. 이미 있는 반이면 아래 버튼을 눌러 주세요.':''}
function paintH(){if(!HX)return;const R=document.getElementById('root');R.querySelectorAll('.nb.hx').forEach(b=>{const d=b.querySelector('.dt');if(d)d.innerHTML=DOTS(b.dataset.num)});
 const el=R.querySelector('#hl');if(!el)return;const c=CLS(),sel=[...S.v[secT('nums')]];
 if(!ANY){el.innerHTML='';return}
 if(!c){el.innerHTML='<i class="ti ti-info-circle" aria-hidden="true"></i> 위에서 반을 고르면, 이 반에 낸 기록이 지문 번호 아래 점으로 나와요';return}
 const used=sel.filter(id=>HN(id)>0).length;
 el.innerHTML=`<span>점 = 이 반에 낸 시험지 수</span><span class="dt"><i></i></span><span>1번</span><span class="dt"><i></i><i></i><i></i></span><span>3번 이상 · 점 없음 = 아직 안 냄 · 올려 보면 자세히</span>`+(sel.length?`<div class="ok"><i class="ti ti-shield-check" style="font-size:16px" aria-hidden="true"></i>${used?`고른 지문 중 ${used}개는 이 반에 낸 적이 있어요. 전에 낸 문제와 겹치지 않게 만들어요.`:'고른 지문은 이 반에 처음 내요.'}</div>`:'')}
const WD={};function WFIND(){if(Object.keys(WD).length)return;(D.sets||[]).forEach(s=>(s.nums||[]).forEach(n=>{if(n.w)WD[n.id]=n.w}))}
function numTip(b){WFIND();const w=WD[b.dataset.num],h=HX?histTip(b):null;if(!w&&!h)return null;const lb=b.firstChild.textContent;
 return (w?`<div class="q">${esc(lb)} · <span style="font-weight:400;font-style:italic">${esc(w)}</span></div>`:'')+(h?h.replace(/^<div class="q">([^<]*?)\s·\s/,'<div class="q">').replace(/^<div class="q">[^<·]*<\/div>/,''):'')}
function histTip(b){const id=b.dataset.num,H=HD[id]||{},c=CLS(),me=c?H[c]:null,old=c?H['']:null,lb=b.firstChild.textContent;
 if(!ANY)return null;if(!c)return `<div class="q">${esc(lb)}</div><div class="r">위에서 반을 고르면 이 반 기록이 보여요</div>`;
 let h=me?`<div class="q">${esc(lb)} · 이 반에 시험지 ${me.n}번 (문제 ${me.q}개)</div><div class="r">마지막 ${MD(me.last)} · ${Object.entries(me.m).map(([k,v])=>(MN[k]||k)+' '+v+'번').join(' · ')}</div>`:`<div class="q">${esc(lb)} · 이 반에 아직 안 냈어요</div>`;
 if(old)h+=`<div class="s" style="font-family:inherit">반 이름 없이 만든 예전 기록 ${old.n}번 — 겹치지 않게 함께 확인해요</div>`;return h}
function render(){let h=HEAD();h+=CA?`<div style="display:flex;align-items:center;gap:8px;border-radius:12px;padding:10px 14px;margin:0 0 18px;background:var(--acl);color:var(--act);font-size:13px"><i class="ti ti-arrow-forward-up" style="font-size:16px" aria-hidden="true"></i>${CA.from==='지문 등록'?'방금 등록한':(CA.from?esc(CA.from)+'에서 쓴':'앞 단계에서 쓴')} 지문 ${CA.nums.length}개를 그대로 골라 두었어요. 바꿔도 돼요.</div>`:'';
 for(const x of CF.sections){if(!visible(x))continue;
  const lb=`<div class="lb"><b>${esc(x.label)}</b>${x.hint?`<s>${esc(x.hint)}</s>`:''}${x.type==='nums'?`<s id="ncount"></s><button type="button" data-all="1" style="margin-left:auto;font-size:12px;padding:4px 12px;border-radius:999px"></button>`:''}</div>`;
  if(x.type==='presets'){if(!PRE.length)continue;h+=`<div class="blk"><div class="lb"><b>저장된 구성</b><s>누르면 아래가 한 번에 채워져요</s></div>`+PRE.map((p,i)=>`<button type="button" class="pc ${S.pre===i?'on':''}" data-pre="${i}"><i class="ti ${i===0&&p.last?'ti-history':'ti-users'}" style="font-size:16px" aria-hidden="true"></i>${esc(p.name)}</button>`).join('')+`</div>`;continue}
  if(x.type==='sets'){h+=`<div class="blk">${lb}<div class="cg">`+SETS.map(z=>`<button type="button" class="sb ${S.v[x.key]===z.k?'on':''}" data-set="${z.k}"><i class="ti ${z.icon}" style="font-size:20px" aria-hidden="true"></i><span class="tx"><span class="t">${esc(z.t)}</span><span class="d">${esc(z.d)}</span></span></button>`).join('')+`</div></div>`;continue}
  if(x.type==='nums'){const z=curSet();h+=`<div class="blk">${lb}<div class="ng">`+z.nums.map(n=>`<button type="button" class="nb ${S.v[x.key].has(n.id)?'on':''} ${x.hist?'hx':''}" data-num="${n.id}">${esc(n.l)}${x.hist?`<span class="dt">${DOTS(n.id)}</span>`:''}</button>`).join('')+`</div>${x.hist?'<div class="hl" id="hl"></div>':''}<div class="err" id="err-${x.key}"></div></div>`;continue}
  if(x.type==='choice'){const v=S.v[x.key];const E=(!x.multi&&x.explain)?x.explain[v]:null;h+=`<div class="blk">${lb}<div class="cg ${x.opts.length>4?'many':''}">`+x.opts.map(o=>{const on=x.multi?v.has(o[0]):v===o[0];return `<button type="button" class="sb ${on?'on':''}" data-ch="${x.key}" data-v="${o[0]}">${o[3]?`<i class="ti ${o[3]}" style="font-size:20px" aria-hidden="true"></i>`:''}<span class="tx"><span class="t">${esc(o[1])}</span><span class="d">${esc(o[2]||'')}</span></span></button>`}).join('')+`</div>`+(E?`<div class="exp">${E.use?`<div><b>이럴 때 써요</b>${esc(E.use)}</div>`:''}${E.how?`<div><b>이렇게 바뀌어요</b>${esc(E.how)}</div>`:''}${E.ex?`<div class="exs"><span class="k">원문</span>${esc(E.ex[0])}<br><span class="k">바꾼 글</span>${esc(E.ex[1])}</div>`:''}${E.warn?`<div class="wn"><i class="ti ti-alert-circle" aria-hidden="true"></i> ${esc(E.warn)}</div>`:''}</div>`:'')+`<div class="err" id="err-${x.key}"></div></div>`;continue}
  if(x.type==='tree'){const v=S.v[x.key];h+=`<div class="blk">${lb}`+x.groups.map(g=>{const ks=g.items.map(i=>i[0]),n=ks.filter(k=>v.items.has(k)).length;
   const op=isOpen(x.key,g.k,n);return `<div class="pt ${n?'has':''} ${op?'':'cl'}"><div class="ph" data-fold="${x.key}|${g.k}" role="button" tabindex="0" aria-expanded="${op}"><span class="dot">${esc(g.n)}</span><span class="nm">${esc(g.t)}</span><i class="ti ti-chevron-down cv" aria-hidden="true"></i><button type="button" class="ct" data-grp="${x.key}|${g.k}" aria-label="${esc(g.t)} 통째로 켜고 끄기">${n===ks.length?'전부 · 끄기':n?n+' / '+ks.length+' · 전부 켜기':'끔 · 전부 켜기'}</button></div>`+(op?`<div class="ig">`:`<!--`)+g.items.map(i=>{const on=v.items.has(i[0]);const mx=x.max||9,cyc=mx<=5;const rd=(i[3]!==undefined&&on)?(cyc?`<button type="button" class="cnt" data-cy="${x.key}|${i[0]}" title="누를 때마다 1→${mx} 차례로 바뀌어요" aria-label="${esc(i[1])} 문제 수 ${v.rounds[i[0]]}, 누르면 바뀌어요">${v.rounds[i[0]]}${esc(x.unit||'회')}</button>`:`<span class="rd" data-rd="${x.key}|${i[0]}"><button type="button" aria-label="줄이기">−</button><span>${v.rounds[i[0]]}${esc(x.unit||'회')}</span><button type="button" aria-label="늘리기">+</button></span>`):'';
    return `<div class="ib ${on?'on':''}" data-it="${x.key}|${i[0]}" role="button" tabindex="0"><span class="t">${esc(i[1])}${x.ex&&x.ex[i[0]]?`<span class="ix" data-ix="${x.key}|${i[0]}" role="button" tabindex="0" aria-label="문제 모양 보기"><i class="ti ti-info-circle" aria-hidden="true"></i></span>`:''}</span><span class="d">${esc(i[2]||'')}</span>${rd}</div>`}).join('')+(op?`</div>`:`-->`)+`</div>`}).join('')+`<div class="err" id="err-${x.key}"></div></div>`;continue}
  if(x.type==='text'){const cl=(x.chipList||[]).map(n=>`<button type="button" class="chip${NT(S.v[x.key])===NT(n)&&S.v[x.key]?' on':''}" data-chip="${x.key}" data-val="${esc(n)}">${esc(n)}</button>`).join('');
   h+=`<div class="blk">${lb}<input type="text" data-tx="${x.key}" value="${esc(S.v[x.key])}" placeholder="${esc(x.placeholder||'')}" style="width:100%;max-width:360px;border-radius:10px">${cl?`<div class="chips">${cl}</div>`:''}<div id="nw-${x.key}" style="font-size:12.5px;color:var(--text-warning);margin-top:6px"></div><div class="err" id="err-${x.key}"></div></div>`;continue}
  if(x.type==='name'){h+=`<div class="blk">${lb}<input type="text" id="nm" value="${esc(S.v[x.key])}" placeholder="${esc(x.placeholder||'고1 A반')}" style="width:100%;max-width:260px;border-radius:10px"></div>`;continue}}
 h+=`<div class="sum">`+(CF.summary||[]).filter(([k,key])=>key!=='@vest'||D.est).map(([k,key])=>`<div data-sk="${key}"><div class="k">${esc(k)}</div><div class="v">${esc(sumv(key))}</div></div>`).join('')+`<button type="button" class="go" id="go">${esc(CF.go)} ↗</button></div>`+CF.sections.filter(x=>x.type==='tree'&&x.warnOver&&visible(x)&&ttot(x)>x.warnOver).map(x=>`<div style="font-size:13px;color:var(--text-secondary);margin:8px 2px 0"><i class="ti ti-hourglass" style="font-size:15px;vertical-align:-2px" aria-hidden="true"></i> ${esc(x.warnMsg||'한 번에 많아요. 나눠서 만들면 빨라요.')}</div>`).join('')+(CF.tips||[]).filter(t=>t.all.every(hit)).map(t=>`<div style="font-size:13px;color:var(--text-secondary);margin:8px 2px 0"><i class="ti ti-bulb" style="font-size:15px;vertical-align:-2px" aria-hidden="true"></i> ${esc(t.msg)}</div>`).join('');
 $('#root').innerHTML=h;wire()}
function vest(){const E=D.est;if(!E)return null;const ids=[...S.v[secT('nums')]];if(!ids.length)return'-';
 const LV=['A1','A2','B1','B2','C1','C2'],lo=LV.indexOf(S.v.level);let n=0,u=0,all=0,miss=0;
 for(const id of ids){const c=E[id];if(!c){miss++;continue}
  LV.forEach((k,i)=>{all+=c[k];if(i>=lo)n+=c[k]});n+=c.ls+(c.ph==null?5:c.ph);u+=c.u;all+=c.u+c.ls}
 if(miss===ids.length||u>0.3*all)return'만들 때 세어요';
 const pg=Math.max(1,Math.ceil((n+ids.length+1)/56));return '약 '+n+'단어'+(u?'+':'')+' · '+pg+'쪽'}
function ttot(x){const v=S.v[x.key];let t=0;x.groups.forEach(g=>g.items.forEach(i=>{if(v.items.has(i[0]))t+=i[3]!==undefined?v.rounds[i[0]]:1}));return x.perSet?t*S.v[secT('nums')].size:t}
function sumv(key){if(key==='@vest'){const r=vest();return r==null?'':r}const x=sec(key),v=S.v[key];if(!x)return'';if(!visible(x))return'-';
 if(x.type==='nums')return v.size+'개';if(x.type==='tree')return x.unit?ttot(x)+x.unit:v.items.size+'종';
 if(x.type==='choice'){const L=x.opts.filter(o=>x.multi?v.has(o[0]):v===o[0]).map(o=>o[4]||o[1]);return L.length>1?L[0]+' 외 '+(L.length-1):(L[0]||'-')}if(x.type==='text')return v.trim()||'-';return''}
function wire(){const R=document.getElementById('root');
 R.querySelectorAll('[data-pre]').forEach(b=>b.onclick=()=>{S.pre=+b.dataset.pre;load(PRE[S.pre].state);render()});
 R.querySelectorAll('[data-set]').forEach(b=>b.onclick=()=>{const k=secT('sets');if(S.v[k]!==b.dataset.set){S.v[k]=b.dataset.set;S.v[secT('nums')]=new Set()}T();render()});
 R.querySelectorAll('[data-num]').forEach(b=>{b.onpointerdown=e=>{b.dataset.pt=e.pointerType||''};b.onclick=()=>{const s=S.v[secT('nums')],n=b.dataset.num,touch=b.dataset.pt==='touch'||b.dataset.pt==='pen';s.has(n)?s.delete(n):s.add(n);T();render();
  if(touch){const nb=document.querySelector(`#root [data-num="${n}"]`),t=nb&&numTip(nb);if(t){tipAt(nb,t);clearTimeout(window.__wt);window.__wt=setTimeout(()=>{if(!PIN)tipHide()},2500)}}}});  // 태블릿: 누르면 첫 몇 낱말이 잠깐 보인다
 const all=R.querySelector('[data-all]');if(all){const z=curSet(),s=S.v[secT('nums')];all.textContent=s.size===z.nums.length?'모두 풀기':'모두 고르기';
  R.querySelector('#ncount').textContent=s.size?s.size+'개 골랐어요':'';all.onclick=()=>{S.v[secT('nums')]=s.size===z.nums.length?new Set():new Set(z.nums.map(n=>n.id));T();render()}}
 R.querySelectorAll('[data-ch]').forEach(b=>b.onclick=()=>{const x=sec(b.dataset.ch),v=b.dataset.v;
  if(x.multi){const s=S.v[x.key];s.has(v)?s.delete(v):s.add(v);if(x.contiguous&&s.size){const ix=x.opts.map(o=>o[0]),idx=[...s].map(k=>ix.indexOf(k));const lo=Math.min(...idx),hi=Math.max(...idx);S.v[x.key]=new Set(ix.slice(lo,hi+1))}}
  else S.v[x.key]=v;T();render()});
 R.querySelectorAll('[data-grp]').forEach(h=>h.onclick=e=>{e.stopPropagation();const [key,gk]=h.dataset.grp.split('|'),g=sec(key).groups.find(z=>z.k===gk),s=S.v[key].items,ks=g.items.map(i=>i[0]),a=ks.every(k=>s.has(k));ks.forEach(k=>a?s.delete(k):s.add(k));if(!a)OPEN[key+'|'+gk]=true;T();render()});
 R.querySelectorAll('[data-fold]').forEach(h=>{const f=()=>{const [key,gk]=h.dataset.fold.split('|'),g=sec(key).groups.find(z=>z.k===gk),n=g.items.filter(i=>S.v[key].items.has(i[0])).length;OPEN[key+'|'+gk]=!isOpen(key,gk,n);render()};h.onclick=f;h.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();f()}}});
 R.querySelectorAll('[data-it]').forEach(b=>b.onclick=e=>{if(e.target.closest('.rd')||e.target.closest('.ix')||e.target.closest('.cnt'))return;const [key,k]=b.dataset.it.split('|'),s=S.v[key].items;s.has(k)?s.delete(k):s.add(k);T();render()});
 R.querySelectorAll('[data-cy]').forEach(c=>c.onclick=e=>{e.stopPropagation();const [key,k]=c.dataset.cy.split('|'),o=S.v[key].rounds,mx=sec(key).max||9;o[k]=o[k]%mx+1;T();render()});
 R.querySelectorAll('[data-rd]').forEach(r=>{const [key,k]=r.dataset.rd.split('|'),[m,,p]=r.children,o=S.v[key].rounds,mx=sec(key).max||9;m.onclick=()=>{o[k]=Math.max(1,o[k]-1);T();render()};p.onclick=()=>{o[k]=Math.min(mx,o[k]+1);T();render()}});
 R.querySelectorAll('[data-tx]').forEach(t=>t.oninput=()=>{const k=t.dataset.tx;S.v[k]=t.value;const sv=R.querySelector(`[data-sk="${k}"] .v`);if(sv)sv.textContent=t.value.trim()||'-';const e=R.querySelector('#err-'+k);if(e&&t.value.trim())e.textContent='';R.querySelectorAll(`[data-chip="${k}"]`).forEach(c=>c.classList.toggle('on',NT(c.dataset.val)===NT(t.value)));NEWN(k)});
 R.querySelectorAll('[data-chip]').forEach(c=>c.onclick=()=>{const k=c.dataset.chip;S.v[k]=S.v[k]===c.dataset.val?'':c.dataset.val;render()});
 const nm=R.querySelector('#nm');if(nm)nm.oninput=()=>{S.v[secT('name')]=nm.value};
 R.querySelector('#go').onclick=go;tipWire(R);R.querySelectorAll('[data-tx]').forEach(t=>NEWN(t.dataset.tx));
 R.querySelectorAll('.nb[data-num]').forEach(b=>{b.addEventListener('mouseenter',e=>{if(PIN||b.dataset.pt==='touch')return;const t=numTip(b);if(!t)return;tipAt(b,t)});b.addEventListener('mouseleave',()=>{if(!PIN)tipHide()})});  // 번호에 올리면 첫 몇 낱말(+ 반 기록)
 if(HX){paintH();
  const ti=R.querySelector(`[data-tx="${HX.by}"]`);if(ti)ti.addEventListener('input',paintH)}}
function tipAt(el,html){const R=document.getElementById('root');let t=document.getElementById('tip');if(!t){t=document.createElement('div');t.id='tip';R.appendChild(t)}
 t.innerHTML=html;t.style.display='block';const rr=R.getBoundingClientRect(),b=el.getBoundingClientRect();let L=b.left-rr.left;L=Math.max(4,Math.min(L,rr.width-t.offsetWidth-4));
 let Tp=b.bottom-rr.top+6;if(Tp+t.offsetHeight>R.offsetHeight)Tp=b.top-rr.top-t.offsetHeight-6;t.style.left=L+'px';t.style.top=Tp+'px'}
let PIN=null;
function tipShow(el,key,k){const R=document.getElementById('root');let t=document.getElementById('tip');if(!t){t=document.createElement('div');t.id='tip';R.appendChild(t)}
 const e=sec(key).ex[k];t.innerHTML=`<div class="q">${esc(e[0])}</div>${e[1]?`<div class="s">${esc(e[1])}</div>`:''}`;t.style.display='block';
 const rr=R.getBoundingClientRect(),b=el.getBoundingClientRect();let L=b.left-rr.left;L=Math.max(4,Math.min(L,rr.width-t.offsetWidth-4));
 let Tp=b.bottom-rr.top+6;if(Tp+t.offsetHeight>R.offsetHeight)Tp=b.top-rr.top-t.offsetHeight-6;t.style.left=L+'px';t.style.top=Tp+'px'}
function tipHide(){const t=document.getElementById('tip');if(t)t.style.display='none'}
function tipWire(R){PIN=null;
 R.querySelectorAll('[data-ix]').forEach(x=>{const [key,k]=x.dataset.ix.split('|'),it=x.closest('.ib');
  it.addEventListener('mouseenter',()=>{if(!PIN)tipShow(it,key,k)});it.addEventListener('mouseleave',()=>{if(!PIN)tipHide()});
  x.onclick=e=>{e.stopPropagation();if(PIN===x.dataset.ix){PIN=null;tipHide()}else{PIN=x.dataset.ix;tipShow(it,key,k)}}});
 if(!R.dataset.tw){R.dataset.tw=1;R.addEventListener('click',e=>{if(PIN&&!e.target.closest('.ix')){PIN=null;tipHide()}})}}
function go(){let bad=false;const R=document.getElementById('root');
 for(const x of CF.sections){if(!visible(x)||!x.need)continue;const v=S.v[x.key];const empty=x.type==='tree'?!v.items.size:(v instanceof Set?!v.size:(typeof v==='string'?!v.trim():!v));
  if(empty){const e=R.querySelector('#err-'+x.key);if(e)e.textContent=x.needMsg||'하나 이상 골라 주세요';bad=true}}
 if(bad)return;const out=['[주문서] '+CF.title];const z=curSet();
 for(const x of CF.sections){if(!visible(x))continue;const v=S.v[x.key];
  if(x.type==='nums')out.push('지문: '+z.t+' '+z.nums.filter(n=>v.has(n.id)).map(n=>n.l).join(', '));
  else if(x.type==='choice'){const L=x.opts.filter(o=>x.multi?v.has(o[0]):v===o[0]).map(o=>o[1]);out.push(x.msg+': '+L.join(', '))}
  else if(x.type==='tree')x.groups.forEach(g=>{const L=g.items.filter(i=>v.items.has(i[0])).map(i=>i[1]+(i[3]!==undefined?' '+v.rounds[i[0]]+(x.unit||'회'):''));if(L.length)out.push(g.short+': '+L.join(', '))});
  else if(x.type==='text'&&v.trim())out.push(x.msg+': '+v.trim().replace(/[\/:]/g,' '));
  else if(x.type==='name'&&v.trim())out.push('구성 저장: '+v.trim().replace(/[\/:]/g,' '))}
 if(R.classList.contains('sent'))return;R.classList.add('sent');const g=R.querySelector('#go');g.innerHTML='주문 접수됨 ✓ 만드는 중…';g.setAttribute('aria-disabled','true');
 const m=document.createElement('div');m.className='sentmsg';m.textContent='고칠 게 있으면 대화창에 말로 알려 주세요.';R.querySelector('.sum').after(m);
 EB.send(out.join(' / '))}
render();
}

};
EB.screens.db=function(D){
const R=document.getElementById('root');
const esc=t=>String(t??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const TABS=[['tb','교과서','10종'],['mo','모의고사','평가원·교육청'],['sb','부교재','EBS·시중'],['sp','학교 프린트','학교별']];
const ROWS={tb:['학교급','과목','출판사','과'],mo:['학년','연도','월'],sb:['교재','단원'],sp:['학교','학년','학기·차수']};
const mon=new Date().getMonth()+1;
const S={tab:'mo',f:{tb:{학교급:'고등'},mo:{},sb:{},sp:{}},sel:new Set(),open:{},put:false,guide:false,ask:null,rv:new Set(),room:(D.preRoom||''),put:!!D.preRoom,nw:{학교:'',학년:'',학기:(mon>=3&&mon<=8)?'1학기':'2학기',차수:''}};
const firstTab=()=>{for(const t of ['mo','sb','tb','sp'])if(D.cards.some(c=>c.tab===t))return t;return 'mo'};
function opts(tab,k){const ch=D.chips[tab]||{},f=S.f[tab];let L=ch[k];if(L&&!Array.isArray(L))L=L[f['학교급']||'고등']||[];L=[...(L||[])];
 D.cards.filter(c=>c.tab===tab&&ok(c,tab,k)).forEach(c=>{const v=c.f[k];if(v&&!L.includes(v))L.push(v)});return L}
function ok(c,tab,upto){const f=S.f[tab];for(const k of ROWS[tab]){if(k===upto)break;if(f[k]&&f[k]!=='전체'&&c.f[k]!==f[k])return false}return true}
const vis=()=>D.cards.filter(c=>c.tab===S.tab&&ok(c,S.tab,null));
const has=(tab,k,v)=>D.cards.some(c=>c.tab===tab&&ok(c,tab,k)&&c.f[k]===v);
function cnt(t){return D.cards.filter(c=>c.tab===t).reduce((a,c)=>a+c.items.length,0)}
function guide(){return `<div class="gd" ${S.guide?'':'hidden'}><div class="gs"><b>1</b>아래 입력창 왼쪽 <span class="key">＋</span> 를 눌러요</div><div class="gs"><b>2</b>등록할 파일을 골라요 <span style="font-size:12px;color:var(--mu)">(정답표도 같이 고르면 더 빨라요)</span></div><div class="gs"><b>3</b>아무 말 없이 <span class="key">보내기</span> 만 눌러도 등록이 시작돼요</div></div>`}
function render(){let h=`<div class="top">`+TABS.map(([k,n,s])=>`<button type="button" class="tab ${S.tab===k?'on':''}" data-tab="${k}"><b>${n}</b><s>${cnt(k)?cnt(k)+'지문':s}</s></button>`).join('')+`<button type="button" class="reg" data-reg="1">＋ 등록하기</button></div>`+guide();
 const f=S.f[S.tab];
 if(S.tab==='mo'&&S.f.tb['학교급']==='중학')h+=`<div class="gd" style="padding:9px 14px">모의고사는 고등만 있어요.</div>`;
 for(const k of ROWS[S.tab]){if(S.tab==='tb'&&k==='과'&&!opts('tb','과').length)continue;if(S.tab==='sb'&&k==='단원'&&(!f['교재']||f['교재']==='전체'))continue;const L=opts(S.tab,k);if(!L.length&&S.tab==='sp')continue;
  const all=S.tab==='tb'&&k==='학교급'?'':`<button type="button" class="c ${!f[k]||f[k]==='전체'?'on':''}" data-f="${k}" data-v="전체">전체</button>`;
  h+=`<div class="fr"><span>${k}</span><div class="cs">${all}`+L.map(v=>`<button type="button" class="c ${f[k]===v?'on':''} ${has(S.tab,k,v)?'':'e'}" data-f="${esc(k)}" data-v="${esc(v)}">${esc(v)}</button>`).join('')+`</div></div>`}
 const V=vis(),ids=V.flatMap(c=>c.items.map(p=>p.id)),allOn=ids.length&&ids.every(i=>S.sel.has(i));
 const cond=ROWS[S.tab].map(k=>f[k]&&f[k]!=='전체'?f[k]:'').filter(Boolean).join(' · ')||TABS.find(t=>t[0]===S.tab)[1]+' 전체';
 h+=`<div class="pn"><div class="ph"><b>${esc(cond)}</b><span>${V.length}묶음 · ${ids.length}지문</span>${ids.length?`<button type="button" data-all="1">${allOn?'전체 풀기':'전체 선택'}</button>`:''}</div>`;
 if(!V.length)h+=`<div class="emp">아직 등록되지 않았어요.<br><button type="button" data-reg="1">지금 등록하기</button></div>`;
 else h+=`<div class="cg">`+V.map(c=>{const n=c.items.filter(p=>S.sel.has(p.id)).length,st=n===c.items.length?'on':n?'pt':'';
  return `<div class="cd ${st}" data-cd="${esc(c.k)}" role="button" tabindex="0"><div class="r1"><span class="bx">${st==='on'?'✓':st==='pt'?'–':''}</span><span class="tg">${esc(c.tag)}</span><button type="button" class="tr" data-tr="${esc(c.k)}" aria-label="이 묶음 지운 걸로 표시" title="지운 걸로 표시"><i class="ti ti-trash" aria-hidden="true"></i></button></div><div class="t">${esc(c.title)}</div><div class="i"><span>${n&&st!=='on'?n+'/':''}${c.items.length}지문</span><button type="button" class="pk" data-pk="${esc(c.k)}">${S.open[c.k]?'접기':'지문 고르기 →'}</button></div>${S.open[c.k]?`<div class="ns">`+c.items.map(p=>`<button type="button" class="n ${S.sel.has(p.id)?'on':''}" data-id="${esc(p.id)}" data-w="${esc(p.w)}">${esc(p.l)}</button>`).join('')+`</div>`:''}</div>`}).join('')+`</div>`;
 h+=`</div>`;
 const src=new Set(D.cards.filter(c=>c.items.some(p=>S.sel.has(p.id))).map(c=>c.k));
 h+=`<div class="bar"><div><div class="k">고른 지문 · 여러 탭에서 섞어 골라도 돼요</div><div class="v">${S.sel.size}지문${src.size?` · ${src.size}묶음`:''}</div></div><button type="button" class="put" data-put="1">작업실에 담기</button></div><div class="err" id="err"></div>`;
 h+=putPanel();
 if(S.ask)h+=`<div class="pp"><b>「${esc(S.ask.t)}」 ${S.ask.ids.length}지문을 지운 걸로 표시할까요?</b><div style="font-size:12.5px;color:var(--mu);margin:4px 0 10px">목록에서만 사라져요. 아래 '지운 지문'에서 언제든 되살릴 수 있어요.</div><button type="button" class="put" data-hide="1">지운 걸로 표시 ↗</button> <button type="button" data-hcancel="1">그만두기</button></div>`;
 if(D.hidden&&D.hidden.length)h+=`<details class="hd2"><summary>지운 지문 ${D.hidden.length}개 보기 → 되살리기</summary><div class="cs">`+D.hidden.map(x=>`<button type="button" class="c ${S.rv.has(x.id)?'on':''}" data-rv="${esc(x.id)}">${esc(x.t)}</button>`).join('')+`</div>${S.rv.size?`<button type="button" class="put" data-revive="1" style="margin-top:8px">${S.rv.size}지문 되살리기 ↗</button>`:''}</details>`;
 R.innerHTML=h;wire();if(S.rv.size){const d=R.querySelector('.hd2');if(d)d.open=true}}
function rname(){const n=S.nw;return [n.학교,n.학년,n.학기,n.차수].filter(Boolean).join(' ')}
function putPanel(){if(!S.put)return '';const n=S.nw,cs=(k,L)=>`<div class="fr"><span>${k}</span><div class="cs">`+L.map(v=>`<button type="button" class="c ${n[k]===v?'on':''}" data-nw="${k}" data-v="${esc(v)}">${esc(v)}</button>`).join('')+(k==='학교'?`<input type="text" data-nwt="학교" value="${D.schools.includes(n.학교)?'':esc(n.학교)}" placeholder="다른 학교 이름" style="width:130px;height:30px;border-radius:999px;font-size:13px">`:'')+`</div></div>`;
 let h=`<div class="pp">`;
 if(D.rooms.length)h+=`<h4>있는 작업실에 담기</h4><div class="cs" style="margin-bottom:12px">`+D.rooms.map(r=>`<button type="button" class="c ${S.room===r.name?'on':''}" data-room="${esc(r.name)}">${esc(r.name)} · ${r.n}지문</button>`).join('')+`</div><h4>새 작업실 만들기</h4>`;
 else h+=`<h4>새 작업실 — 학교 시험 하나에 작업실 하나</h4>`;
 h+=cs('학교',D.schools)+cs('학년',['고1','고2','고3','중1','중2','중3'])+cs('학기',['1학기','2학기'])+cs('차수',['중간','기말']);
 const nm=S.room||rname();
 h+=`<div class="nm"><span style="color:var(--mu);font-size:13px">담을 곳</span><b>${nm?esc(nm):'—'}</b><button type="button" class="put" data-go="1" style="margin-left:auto">${S.sel.size}지문 담기 ↗</button></div><div class="err" id="err2"></div></div>`;return h}
function wire(){
 R.querySelectorAll('[data-tab]').forEach(b=>b.onclick=()=>{S.tab=b.dataset.tab;render()});
 R.querySelectorAll('[data-reg]').forEach(b=>b.onclick=()=>{S.guide=!S.guide;render()});
 R.querySelectorAll('[data-f]').forEach(b=>b.onclick=()=>{const f=S.f[S.tab],k=b.dataset.f,i=ROWS[S.tab].indexOf(k);f[k]=b.dataset.v;ROWS[S.tab].slice(i+1).forEach(x=>{if(x!=='학교급')delete f[x]});render()});
 const al=R.querySelector('[data-all]');if(al)al.onclick=()=>{const ids=vis().flatMap(c=>c.items.map(p=>p.id)),on=ids.every(i=>S.sel.has(i));ids.forEach(i=>on?S.sel.delete(i):S.sel.add(i));render()};
 R.querySelectorAll('[data-cd]').forEach(d=>{const t=()=>{const c=D.cards.find(x=>x.k===d.dataset.cd),on=c.items.every(p=>S.sel.has(p.id));c.items.forEach(p=>on?S.sel.delete(p.id):S.sel.add(p.id));render()};d.onclick=e=>{if(e.target.closest('.pk')||e.target.closest('.n')||e.target.closest('.tr'))return;t()};d.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();t()}}});
 R.querySelectorAll('[data-tr]').forEach(b=>b.onclick=e=>{e.stopPropagation();const c=D.cards.find(x=>x.k===b.dataset.tr),pick=c.items.filter(p=>S.sel.has(p.id));S.ask={t:c.title,ids:(pick.length&&pick.length<c.items.length?pick:c.items).map(p=>p.id)};render()});
 const hy=R.querySelector('[data-hide]');if(hy)hy.onclick=()=>{if(R.classList.contains('sent'))return;R.classList.add('sent');EB.send('[DB] 지운 걸로 표시 / 지문: '+S.ask.ids.join(','))};
 const hc=R.querySelector('[data-hcancel]');if(hc)hc.onclick=()=>{S.ask=null;render()};
 R.querySelectorAll('[data-rv]').forEach(b=>b.onclick=()=>{const i=b.dataset.rv;S.rv.has(i)?S.rv.delete(i):S.rv.add(i);render()});
 const rv=R.querySelector('[data-revive]');if(rv)rv.onclick=()=>{if(R.classList.contains('sent'))return;R.classList.add('sent');EB.send('[DB] 되살리기 / 지문: '+[...S.rv].join(','))};
 R.querySelectorAll('[data-pk]').forEach(b=>b.onclick=e=>{e.stopPropagation();S.open[b.dataset.pk]=!S.open[b.dataset.pk];render()});
 R.querySelectorAll('.n[data-id]').forEach(b=>{b.onclick=e=>{e.stopPropagation();const i=b.dataset.id;S.sel.has(i)?S.sel.delete(i):S.sel.add(i);render()};b.onmouseenter=()=>tip(b);b.onmouseleave=()=>{const t=document.getElementById('tip');if(t)t.style.display='none'}});
 R.querySelector('[data-put]').onclick=()=>{if(!S.sel.size){R.querySelector('#err').textContent='먼저 담을 지문을 골라 주세요';return}S.put=!S.put;render()};
 R.querySelectorAll('[data-room]').forEach(b=>b.onclick=()=>{S.room=S.room===b.dataset.room?'':b.dataset.room;render()});
 R.querySelectorAll('[data-nw]').forEach(b=>b.onclick=()=>{const k=b.dataset.nw;S.nw[k]=S.nw[k]===b.dataset.v?'':b.dataset.v;S.room='';render()});
 R.querySelectorAll('[data-nwt]').forEach(t=>t.onchange=()=>{S.nw.학교=t.value.trim();S.room='';render()});
 const g=R.querySelector('[data-go]');if(g)g.onclick=()=>{const nm=S.room||rname(),e=R.querySelector('#err2');
  if(!nm){e.textContent='담을 작업실을 고르거나 새 작업실의 학교·학년을 골라 주세요';return}
  if(!S.room&&(!S.nw.학교||!S.nw.학년)){e.textContent='새 작업실은 학교와 학년을 꼭 골라 주세요';return}
  if(R.classList.contains('sent'))return;R.classList.add('sent');g.textContent='담는 중…';
  const order=D.cards.flatMap(c=>c.items.map(p=>p.id)).filter(i=>S.sel.has(i));
  EB.send('[작업실] 담기 / 이름: '+nm.replace(/[\/:]/g,' ')+' / 지문: '+order.join(','))}}
function tip(b){let t=document.getElementById('tip');if(!t){t=document.createElement('div');t.id='tip';R.appendChild(t)}t.textContent=b.dataset.w;t.style.display='block';const rr=R.getBoundingClientRect(),bb=b.getBoundingClientRect();t.style.left=Math.max(4,Math.min(bb.left-rr.left,rr.width-290))+'px';t.style.top=(bb.bottom-rr.top+6)+'px'}
if(!D){R.innerHTML='<div class="emp">이 파일은 DB 둘러보기 화면의 빈 틀이에요.</div>'}else{S.tab=firstTab();render()}

};
// ── 앱 껍데기: 탭 이동 · 데이터 조립 · 버튼 메시지 가로채기 ──
const A=window.EBD||{},C=window.EBC||{forms:{},catalog:{}};
const esc=t=>String(t??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const clone=o=>JSON.parse(JSON.stringify(o));
const SK={'①':'vocab','②':'passage-analysis','③':'workbook','④':'variant'};
const SKN={vocab:'① 어휘',['passage-analysis']:'② 지문분석',workbook:'③ 워크북',variant:'④ 변형문제'};
const NAV=[['home','홈'],['db','DB 둘러보기'],['room','작업실'],null,['form:vocab','① 어휘'],['form:passage-analysis','② 지문분석'],['form:workbook','③ 워크북'],['form:variant','④ 변형문제']];
let CUR='home',ARG={},TOAST='';
const IDX={};(A.sets||[]).forEach(s=>(s.nums||[]).forEach(n=>{IDX[n.id]={n,s}}));
const TABOF=k=>{const c=(A.cards||[]).find(c=>c.ids.includes(k));return c?c.tab:''};
function wrSets(){const out=[];(A.rooms||[]).forEach((r,i)=>{const items=(r.ids||[]).filter(id=>IDX[id]).map(id=>{const {n,s}=IDX[id];return Object.assign({},n,{l:s.t.replace(/\s+/g,'').slice(0,6)+' '+n.l})});
 if(items.length)out.push({k:'WR-'+i,t:'작업실 '+r.name.replace(/[,/:]/g,' '),d:'작업실 · '+items.length+'지문',icon:'ti-briefcase',nums:items})});return out}
function formD(sk,carry){const F=(A.forms||{})[sk]||{},cf=clone(C.forms[sk]||{sections:[]});
 (cf.sections||[]).forEach(x=>{const o=(F.ov||{})[x.key];if(o){if(o.default!==undefined)x.default=o.default;if(o.chipList)x.chipList=o.chipList}});
 const D={config:cf,sets:wrSets().concat((A.sets||[]).map(s=>({k:s.k,t:s.t,d:s.d,icon:s.icon,nums:s.nums}))),presets:F.presets||[],brand:F.brand||A.brand||{}};
 if(F.est){const K=F.est.K,E={};Object.entries(F.est.v).forEach(([i,a])=>{const o={};K.forEach((k,j)=>o[k]=a[j]);E[i]=o});D.est=E}if(F.hist)D.hist=F.hist;if(carry)D.carry=carry;return D}
function dbD(pre){const cat=C.catalog||{},tb=cat.textbook||{},mo=cat.mock||{},g=(cat.sidebook||{}).groups||{},now=new Date().getFullYear();
 const yrs=[];for(let y=now;y>=(mo.first_year||2020);y--)yrs.push(String(y));
 const chips={tb:{학교급:['고등','중학'],과목:{고등:(tb['고등']||{}).subjects||[],중학:(tb['중학']||{}).subjects||[]},출판사:{고등:(tb['고등']||{}).publishers||[],중학:(tb['중학']||{}).publishers||[]}},
  mo:{학년:mo.grades||['고1','고2','고3'],연도:yrs,월:(mo.months||[3,4,5,6,7,9,10,11,12]).map(m=>m+'월')},sb:{교재:[].concat(...Object.values(g))},sp:{}};
 const hid=new Set((A.hidden||[]).map(h=>h.id));
 const cards=(A.cards||[]).map(c=>Object.assign({},c,{items:c.ids.filter(i=>IDX[i]&&!hid.has(i)).map(i=>({id:i,l:c.lab&&c.lab[i]||IDX[i].n.l,w:IDX[i].n.w||''}))})).filter(c=>c.items.length);
 cards.forEach(c=>{if(c.tab==='sb'&&!chips.sb.교재.includes(c.f['교재']))chips.sb.교재.push(c.f['교재'])});
 return {cards,chips,rooms:(A.rooms||[]).map(r=>({name:r.name,n:r.ids.length})),schools:A.schools||[],hidden:A.hidden||[],total:cards.reduce((a,c)=>a+c.items.length,0),preRoom:pre||''}}
function shell(){const E=document.getElementById('eb');
 E.innerHTML=`<nav class="ebn">`+NAV.map(n=>n?`<button type="button" data-nav="${n[0]}" class="${(CUR===n[0]||CUR.startsWith(n[0]+':'))?'on':''}">${n[1]}</button>`:'<span class="grp"></span>').join('')+`</nav>`+(TOAST?`<div class="ebt"><i class="ti ti-circle-check" aria-hidden="true"></i>${esc(TOAST)}</div>`:'')+`<div id="root"></div>`;
 E.querySelectorAll('[data-nav]').forEach(b=>b.onclick=()=>nav(b.dataset.nav))}
function nav(to,arg){CUR=to;ARG=arg||{};shell();TOAST='';const R=document.getElementById('root');
 if(to==='home'){R.className='w s-home';const D=clone(A.home||{mode:'home',steps:[]});D.total=dbD().total;EB.screens.home(D)}
 else if(to==='db'){R.className='w s-db';EB.screens.db(dbD(ARG.preRoom))}
 else if(to==='room'){R.className='s-room';room(R)}
 else if(to.startsWith('form:')){R.className='w s-form';const sk=to.slice(5);if(!C.forms[sk]){R.innerHTML='<div class="emp">이 주문서를 불러오지 못했어요.</div>';return}EB.screens.form(formD(sk,ARG.carry))}
 try{document.getElementById('eb').scrollIntoView({block:'start'})}catch(e){}}
// ── 작업실 ──
function room(R){const RS=A.rooms||[];
 if(!ARG.open){if(!RS.length){R.innerHTML=`<div class="emp">아직 작업실이 없어요.<br>DB 둘러보기에서 지문을 골라 <b>작업실에 담기</b>를 누르면 생겨요.<br><br><button type="button" class="btn f" data-go="db">DB 둘러보기로</button></div>`;R.querySelector('[data-go]').onclick=()=>nav('db');return}
  R.innerHTML=`<div class="hd"><b>작업실</b><span style="color:var(--mu);font-size:13px">학교 시험 하나 = 작업실 하나</span></div><div class="rl">`+RS.map(r=>`<button type="button" class="rc" data-open="${esc(r.name)}"><b>${esc(r.name)}</b><span>${r.ids.length}지문</span></button>`).join('')+`</div>`;
  R.querySelectorAll('[data-open]').forEach(b=>b.onclick=()=>nav('room',{open:b.dataset.open}));return}
 const r=RS.find(x=>x.name===ARG.open);if(!r){nav('room');return}
 const ri=RS.indexOf(r),S=ARG.st||(ARG.st={src:'전체',sel:new Set(r.ids),ask:false});
 const TABN={tb:'교과서',mo:'모의고사',sb:'부교재',sp:'학교 프린트'};
 const ids=r.ids.filter(i=>IDX[i]),srcs=['전체'].concat(['tb','mo','sb','sp'].filter(t=>ids.some(i=>TABOF(i)===t)).map(t=>TABN[t]));
 const show=ids.filter(i=>S.src==='전체'||TABN[TABOF(i)]===S.src);
 const grp={};show.forEach(i=>{const s=IDX[i].s;(grp[s.k]=grp[s.k]||{t:s.t,ids:[]}).ids.push(i)});
 let h=`<div class="hd"><button type="button" class="bk" data-back="1">← 작업실 목록</button><b>${esc(r.name)}</b><span style="color:var(--mu);font-size:13px">${ids.length}지문</span><button type="button" class="btn" data-get="1">＋ DB에서 가져오기</button><button type="button" class="del" data-delr="1">작업실 지우기</button></div>`;
 if(S.ask)h+=`<div class="cf">「${esc(r.name)}」 작업실을 지울까요? 지문은 DB에 그대로 남아요. <button type="button" class="btn f" data-delok="1">지우기 ↗</button> <button type="button" class="btn" data-delno="1">그만두기</button></div>`;
 h+=`<div class="cs">`+srcs.map(s=>`<button type="button" class="c ${S.src===s?'on':''}" data-src="${s}">${s}</button>`).join('')+`</div>`;
 if(!show.length)h+=`<div class="emp">이 작업실에 지문이 없어요. <b>＋ DB에서 가져오기</b>로 담아 주세요.</div>`;
 Object.values(grp).forEach(g=>{const all=g.ids.every(i=>S.sel.has(i));h+=`<div class="gp"><h5>${esc(g.t)} <span style="color:var(--mu);font-weight:400">${g.ids.length}지문</span><button type="button" data-gall="${esc(g.ids.join(','))}">${all?'모두 풀기':'모두 고르기'}</button></h5>`+g.ids.map(i=>`<span class="it ${S.sel.has(i)?'on':''}"><button type="button" class="l" data-tg="${esc(i)}" title="${esc(IDX[i].n.w||'')}">${esc(IDX[i].n.l)}</button><button type="button" class="x" data-rm="${esc(i)}" aria-label="작업실에서 빼기">✕</button></span>`).join('')+`</div>`});
 const pick=ids.filter(i=>S.sel.has(i));
 h+=`<div class="bar"><span class="v">고른 지문 ${pick.length}개로 만들기</span>`+Object.entries(SKN).map(([k,n])=>`<button type="button" class="btn ${k==='workbook'?'f':''}" data-mk="${k}">${n} →</button>`).join('')+`</div><div style="color:var(--text-danger);font-size:13px;margin-top:6px" id="rerr"></div>`;
 R.innerHTML=h;
 R.querySelector('[data-back]').onclick=()=>nav('room');
 R.querySelector('[data-get]').onclick=()=>nav('db',{preRoom:r.name});
 R.querySelector('[data-delr]').onclick=()=>{S.ask=true;room(R)};
 const dok=R.querySelector('[data-delok]');if(dok)dok.onclick=()=>{EB.send('[작업실] 지우기 / 이름: '+r.name)};
 const dno=R.querySelector('[data-delno]');if(dno)dno.onclick=()=>{S.ask=false;room(R)};
 R.querySelectorAll('[data-src]').forEach(b=>b.onclick=()=>{S.src=b.dataset.src;room(R)});
 R.querySelectorAll('[data-tg]').forEach(b=>b.onclick=()=>{const i=b.dataset.tg;S.sel.has(i)?S.sel.delete(i):S.sel.add(i);room(R)});
 R.querySelectorAll('[data-gall]').forEach(b=>b.onclick=()=>{const g=b.dataset.gall.split(','),all=g.every(i=>S.sel.has(i));g.forEach(i=>all?S.sel.delete(i):S.sel.add(i));room(R)});
 R.querySelectorAll('[data-rm]').forEach(b=>b.onclick=()=>{EB.send('[작업실] 빼기 / 이름: '+r.name+' / 지문: '+b.dataset.rm)});
 R.querySelectorAll('[data-mk]').forEach(b=>b.onclick=()=>{if(!pick.length){R.querySelector('#rerr').textContent='만들 지문을 하나 이상 골라 주세요';return}nav('form:'+b.dataset.mk,{carry:{set:'WR-'+ri,nums:pick,from:'작업실 '+r.name}})})}
// ── 버튼 메시지: 화면 안에서 끝낼 수 있는 건 여기서, 저장이 필요한 것만 Claude로 ──
EB.send=function(msg){let m;
 if((m=/^\[부트캠프\]\s*([①②③④])/.exec(msg)))return nav('form:'+SK[m[1]]);
 if(/^\[부트캠프\]\s*DB 둘러보기/.test(msg))return nav('db');
 if(/^\[부트캠프\]\s*처음 화면/.test(msg))return nav('home');
 if((m=/^\[작업실\]\s*담기\s*\/\s*이름:\s*(.+?)\s*\/\s*지문:\s*(.+)$/.exec(msg))){const nm=m[1],ids=m[2].split(',');let r=(A.rooms=A.rooms||[]).find(x=>x.name===nm);if(!r){r={name:nm,ids:[]};A.rooms.push(r)}
  const add=ids.filter(i=>!r.ids.includes(i));r.ids=r.ids.concat(add);sendPrompt(msg);TOAST=`「${nm}」에 ${add.length}지문을 담았어요. 컴퓨터에 저장하는 중이에요.`;return nav('room',{open:nm})}
 if((m=/^\[작업실\]\s*빼기\s*\/\s*이름:\s*(.+?)\s*\/\s*지문:\s*(.+)$/.exec(msg))){const r=(A.rooms||[]).find(x=>x.name===m[1]);if(r){const d=m[2].split(',');r.ids=r.ids.filter(i=>!d.includes(i));if(ARG.st)d.forEach(i=>ARG.st.sel.delete(i))}sendPrompt(msg);return room(document.getElementById('root'))}
 if((m=/^\[작업실\]\s*지우기\s*\/\s*이름:\s*(.+)$/.exec(msg))){A.rooms=(A.rooms||[]).filter(x=>x.name!==m[1]);sendPrompt(msg);TOAST=`「${m[1]}」 작업실을 지웠어요.`;return nav('room')}
 if((m=/^\[DB\]\s*지운 걸로 표시\s*\/\s*지문:\s*(.+)$/.exec(msg))){const ids=m[1].split(',');A.hidden=(A.hidden||[]).concat(ids.filter(i=>IDX[i]).map(i=>({id:i,t:IDX[i].s.t+' '+IDX[i].n.l})));sendPrompt(msg);TOAST=`${ids.length}지문을 지운 걸로 표시했어요. 아래 '지운 지문'에서 되살릴 수 있어요.`;return nav('db')}
 if((m=/^\[DB\]\s*되살리기\s*\/\s*지문:\s*(.+)$/.exec(msg))){const ids=m[1].split(',');A.hidden=(A.hidden||[]).filter(h=>!ids.includes(h.id));sendPrompt(msg);TOAST=`${ids.length}지문을 되살렸어요.`;return nav('db')}
 sendPrompt(msg)};
EB.mount=function(){const s=A.start||'home';const m=/^form:(.+)$/.exec(s);nav(s,A.carry?{carry:A.carry}:{})};
EB.mount();

})();

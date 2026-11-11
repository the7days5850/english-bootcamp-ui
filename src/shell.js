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

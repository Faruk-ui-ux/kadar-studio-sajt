(function () {
const { createApp, reactive, watchEffect } = Vue;
class DCLogic {}
class Component extends DCLogic {
componentDidMount() {
this.prBind();
try {
const d = document;
if ((window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) || !('IntersectionObserver' in window)) return;
const groups = [['.arh-text > *', 'up'], ['.chips', 'up'], ['.mgrid', 'up'], ['.arh-more', 'up'], ['.pr-head > *', 'up'], ['.pr-seg', 'up'], ['.pr-card', 'up'], ['.pr-cta', 'up'], ['.usl-head-l > div > *', 'up'], ['.usl-text > *', 'up'], ['.usl-coll', 'img'], ['.c3-h', 'up'], ['.c3-pill', 'pill'], ['.c3-foot', 'up'], ['.ab-img', 'img'], ['.ab-text > *', 'up'], ['.foot-top > *', 'up'], ['.foot-mark', 'mark'], ['.foot-bot', 'up']];
const io = new IntersectionObserver((list) => {
list.forEach((en) => {
if (!en.isIntersecting) return;
const el = en.target; io.unobserve(el);
el.setAttribute('data-in', '');
const dl = parseInt(el.style.getPropertyValue('--rv-d'), 10) || 0;
setTimeout(() => { el.removeAttribute('data-rv'); el.removeAttribute('data-in'); el.style.removeProperty('--rv-d'); }, dl + 1700);
});
}, { rootMargin: '0px 0px -40px 0px', threshold: 0 });
groups.forEach((g) => {
d.querySelectorAll(g[0]).forEach((el) => {
if (el.closest('.fm-back')) return;
const sib = el.parentElement ? Array.prototype.filter.call(el.parentElement.children, (x) => x.matches(g[0])) : [];
const i = Math.max(0, sib.indexOf(el));
el.setAttribute('data-rv', g[1]);
el.style.setProperty('--rv-d', (Math.min(i, 7) * 80) + 'ms');
});
});
const root = d.documentElement;
root.classList.add('rv-on');
void root.offsetHeight;
requestAnimationFrame(() => requestAnimationFrame(() => {
root.classList.add('rv-go');
d.querySelectorAll('[data-rv]').forEach((el) => io.observe(el));
}));
this._io = io;
} catch (err) {}
}
prBind() {
try {
const r = document.getElementById('pr-sw');
if (!r || r.__b) return;
r.__b = true;
r.addEventListener('scroll', () => {
const c = r.querySelectorAll('.pr-card'); if (!c.length) return;
let best = 0, bd = 1e9; const mid = r.scrollLeft + r.clientWidth / 2;
c.forEach((e, i) => { const d = Math.abs(e.offsetLeft - r.offsetLeft + e.offsetWidth / 2 - mid); if (d < bd) { bd = d; best = i; } });
if (r.scrollLeft + r.clientWidth >= r.scrollWidth - 4) best = c.length - 1;
if (r.scrollLeft <= 4) best = 0;
if (best !== (this.state.prAct || 0)) this.setState({ prAct: best });
}, { passive: true });
} catch (err) {}
}
componentWillUnmount() {
try { if (this._io) this._io.disconnect(); document.documentElement.classList.remove('rv-on', 'rv-go'); } catch (err) {}
}
componentDidUpdate(pp, ps) {
try {
const a = ps || {}, b = this.state || {};
const pulse = (sel, cls) => {
const el = document.querySelector(sel); if (!el) return;
el.classList.remove('mg-swap', 'pc-swap', 'fm-fwd', 'fm-bwd'); void el.offsetWidth; el.classList.add(cls);
clearTimeout(el._pt); el._pt = setTimeout(() => el.classList.remove(cls), 1000);
};
if (a.filter !== b.filter || a.page !== b.page || a.all !== b.all || a.size !== b.size) pulse('.mgrid', 'mg-swap');
if (a.prSel !== b.prSel) pulse('.pr-cards', 'pc-swap');
if (a.prSel !== b.prSel) { const r = document.getElementById('pr-sw'); if (r) r.scrollLeft = 0; }
this.prBind();
if (a.fOpen && b.fOpen && !b.fDone && (a.fStep || 1) !== (b.fStep || 1)) pulse('.fm-bd', (b.fStep || 1) > (a.fStep || 1) ? 'fm-fwd' : 'fm-bwd');
} catch (err) {}
}
renderVals() {
const st = this.state || {};
const vrsta = st.vrsta || 'Vjenčanje';
const ime = st.ime || '';
const datum = st.datum || '';
const poruka = st.poruka || '';
const zakazi = (v) => () => this.setState({ vrsta: v });
const tekst = 'Zdravo' + (ime ? ', ja sam ' + ime : '') + '. Zanima me snimanje: ' + vrsta + '. Datum: ' + (datum || 'još nije određen') + '.' + (poruka ? ' ' + poruka : '');
const broj = '38761000000';
const rows = [
['v','ad6d631fd856d507fb526d9f95497334','Mladenci s buketom'],
['v','866c7026080574624632c00ee395758f','Mladenci pod velom'],
['v','b5d505f97ef42dbc4eb32d860bc81c6f','Mladenci ispred dvorca'],
['v','87cbb39fdb9af8765043744bd8af836c','Mladenci u zagrljaju'],
['v','114a3822151943b8c33cbf05d0bba433','Mladenci u šetnji'],
['v','0197a6de5764d227e3658f2aa558fda8','Mlada s buketom'],
['v','89cb01e3a5f49cf0dba22ab6750ee6b2','Mlada u tradicionalnoj haljini'],
['v','8d47c43d4fe9429e237b09ffd91a3a44','Vjenčanje u gradu'],
['v','0f8f7ae4326aa2620247a75961ff91b0','Mladenci u tradicionalnoj odjeći'],
['v','82a7910bda1e80c4088101ffbc6c9b8f','Mladenci u dugom hodniku'],
['v','1c2060e7593f0cef316543e3f3a20e63','Mladenci u šetnji kroz zelenilo'],
['v','88176e3891353dc3b13913a9b0121f78','Djeveruše u šumi'],
['v','c5b93d5b5d1852e77f5704e8c1060caf','Mlada pod planinom'],
['v','0d6f93b4aad22755c94bca8cd88069b8','Mladenci na gradskoj ulici'],
['v','b833b10c80e9059388df03cd3115ae0a','Mladenci u vinogradu'],
['v','41b4c71dafeb94a30215a4525370f094','Mladenci na zalasku sunca'],
['v','ba842fb4ca52cb9a2beef1edae383555','Mlada na plaži'],
['v','c779d2b81a3db6476ee11fbd15206172','Vjenčanje na obali, stijene i more'],
['v','09ad4347e0bf4ce3c4c868e451a2ae69','Mladenci u starom gradu'],
['v','d55aa78008f25004f240707fb963d63d','Mladenci ispred stare kuće'],
['p','a97200c9867a18728047c2a87c5167d3','Portret žene na plavoj pozadini'],
['p','f7b9fef688e3538b4cd28884ee8ff72e','Portret u toplom svjetlu'],
['p','25c62b5c9117d943cc1f8d3ec0f6f6f7','Portret muškarca u džemperu'],
['p','dab794c250e009680ecbaa529373f644','Portret žene u bijelom'],
['p','c7871c46c1d6b19cd294c516d022e520','Portret žene u svjetlu'],
['p','f06d0bc880dd2d5c32985d237c9d7778','Portret žene u sakou'],
['p','1f7f2babb3e6ce353027026abd78436f','Portret žene u žutom'],
['p','6830734fe7040d14881838a9f9a0ccee','Portret muškarca u plavoj košulji'],
['p','7bc4d84090e1278202665874080911a1','Portret žene u polju na zalasku sunca'],
['p','d5855a3c8967b9828ee81cf365932c77','Portret crvenokose žene u crvenom'],
['p','78ea45906784684d671a3a615ebe664d','Crno-bijeli portret žene uz prozor'],
['p','e45e05f4de930c9a2693576da8caf6c2','Crno-bijeli portret muškarca sa skrštenim rukama'],
['b','e89b5df5d74c7cdd583951f4bd145bc0','Brend — žuta tkanina'],
['b','8f0646e3a0090f835b6c6627816b7f45','Brend u crvenom'],
['b','db4a7daf37a5739dd7b4c2be5ed45704','Brend sa žutim detaljima'],
['b','b961bb837d1cbb357aadb64299f22077','Brend u crnom'],
['b','2ddbe4ce833b1f663d0b92e4aa08c853','Brend — IKEA zgrada s velikim logom'],
['b','18fa9974155a1d56e7a0fd59fbeb83e1','Brend — ZARA ulaz u trgovinu'],
['b','f20562f4a150371e119e0521b0ae2472','Brend — Apple staklena trgovina'],
['b','5082f76ec2de110db44ac982ee974a31','Brend — Starbucks logo na zgradi']
];
const by = { v: [], p: [], b: [] };
rows.forEach((r) => by[r[0]].push({ cat: r[0], id: r[1], src: 'img/' + r[1] + '.jpg', alt: r[2] }));
const pattern = ['v', 'p', 'v', 'b', 'v', 'p'];
const mixed = [];
let guard = 0;
while (mixed.length < rows.length && guard < 200) {
for (const c of pattern) { if (by[c].length) mixed.push(by[c].shift()); }
guard++;
}
const fkey = st.filter || 'svi';
const outdoor = ['1c2060e7593f0cef316543e3f3a20e63', '88176e3891353dc3b13913a9b0121f78', 'c5b93d5b5d1852e77f5704e8c1060caf', 'b833b10c80e9059388df03cd3115ae0a', '41b4c71dafeb94a30215a4525370f094', 'ba842fb4ca52cb9a2beef1edae383555', 'c779d2b81a3db6476ee11fbd15206172', '7bc4d84090e1278202665874080911a1', 'b5d505f97ef42dbc4eb32d860bc81c6f', '09ad4347e0bf4ce3c4c868e451a2ae69', 'd55aa78008f25004f240707fb963d63d', '114a3822151943b8c33cbf05d0bba433'];
const list = fkey === 'svi' ? mixed : fkey === 'o' ? mixed.filter((x) => outdoor.indexOf(x.id) >= 0) : mixed.filter((x) => x.cat === fkey);
const szKey = st.size === 's' || st.size === 'l' ? st.size : 'm';
const nCols = { s: 6, m: 4, l: 2 }[szKey];
const isMob = typeof window !== 'undefined' && window.innerWidth < 1024;
const perPage = isMob ? 8 : { s: 24, m: 16, l: 8 }[szKey];
const allOn = !!st.all;
const pages = Math.max(1, Math.ceil(list.length / perPage));
const page = Math.min(st.page || 1, pages);
const items = allOn ? list : list.slice((page - 1) * perPage, page * perPage);
const filters = [['svi', 'Sve'], ['v', 'Vjenčanja'], ['p', 'Portreti'], ['b', 'Brendovi'], ['o', 'Događaji']].map((f) => ({
label: f[1],
cls: f[0] === fkey ? 'chip chip-on' : 'chip',
pressed: f[0] === fkey,
pick: () => this.setState({ filter: f[0], page: 1 })
}));
const M = { 1: ['m'], 2: ['t', 's'], 3: ['t', 'm', 's'], 4: ['t', 's', 'm', 'm'] };
const sizes = [['s', 'S', 'Male fotografije'], ['m', 'M', 'Srednje fotografije'], ['l', 'L', 'Velike fotografije']].map((z) => ({
label: z[1], aria: z[2], pressed: z[0] === szKey, cls: z[0] === szKey ? 'sz sz-on' : 'sz',
pick: () => this.setState({ size: z[0], page: 1 })
}));
const cols = Array.from({ length: nCols }, (_, c) => {
const mine = items.filter((_, i) => i % nCols === c);
const pat = M[mine.length] || M[4];
return { items: mine.map((x, j) => ({ ...x, cls: 'a-' + pat[(j + c) % pat.length] })) };
});
const goTop = () => {
try {
const el = document.getElementById('arhiva');
if (el) el.scrollIntoView({ block: 'start' });
} catch (e) {}
};
const pager = Array.from({ length: pages }, (_, i) => i + 1).map((n) => ({
n,
cls: n === page ? 'pg pg-on' : 'pg',
current: n === page ? 'page' : undefined,
label: 'Stranica ' + n,
pick: () => { this.setState({ page: n }); goTop(); }
}));
const prSel = st.prSel || 'p';
const prIsP = prSel === 'p';
const prIsV = prSel === 'v';
const mail = 'hello@kadar.studio';
const fOpen = !!st.fOpen, fDone = !!st.fDone;
const fStep = Math.min(3, Math.max(1, st.fStep || 1));
const fV = st.fVrsta || '', fP = st.fPaket || '';
const fIme = st.fIme || '', fKontakt = st.fKontakt || '', fDatum = st.fDatum || '', fPoruka = st.fPoruka || '', fErr = st.fErr || '';
const paketi = {
'Vjenčanje': [['Vjenčanje', '10 sati · 800 KM'], ['Vjenčanje + album', '10 sati · 1.100 KM'], ['Dva fotografa', '10 sati · 1.300 KM'], ['Dva dana', '2 dana · 1.500 KM']],
'Portret': [['Mini portret', '30 min · 180 KM'], ['Portret', '1 sat · 300 KM'], ['Par ili porodica', '1,5 sat · 380 KM']],
'Brend': [['Brend', '4 sata · 500 KM'], ['Brend cijeli dan', '8 sati · 900 KM'], ['Kampanja', '2 dana · 1.700 KM']]
};
const $id = (i) => document.getElementById(i);
const val = (i, d) => { const x = $id(i); return x ? x.value : d; };
const snap = () => ({ fIme: val('fm-ime', fIme), fKontakt: val('fm-kontakt', fKontakt), fPoruka: val('fm-poruka', fPoruka) });
const lock = (on) => { try { document.body.style.overflow = on ? 'hidden' : ''; } catch (err) {} };
const openForm = (v, p) => (e) => {
if (e && e.preventDefault) e.preventDefault();
lock(true);
this.setState({ fOpen: true, fDone: false, fErr: '', fVrsta: v || '', fPaket: p || '', fMonth: 0, fStep: p ? 2 : 1 });

};
const fClose = (e) => { if (e && e.preventDefault) e.preventDefault(); lock(false); this.setState({ fOpen: false, fDone: false }); };
const PMD = [{"v": "Portret", "name": "Mini portret", "price": "180 KM", "time": "30 min", "img": "img/e45e05f4de930c9a2693576da8caf6c2.jpg", "za": "Za profilnu sliku, CV ili brzi portret kad nemate vremena za duže snimanje.", "inc": ["10 obrađenih fotografija u punoj rezoluciji", "Online galerija za preuzimanje", "1 lokacija u Sarajevu", "1 presvlačenje", "Galerija za 3 dana"], "ex": [["Dodatnih 30 min", "60 KM"], ["Brža isporuka (24 h)", "30 KM"]], "ic": ""}, {"v": "Portret", "name": "Portret", "price": "300 KM", "time": "1 sat", "img": "img/7bc4d84090e1278202665874080911a1.jpg", "za": "Za društvene mreže, poslovni profil ili poklon. Dovoljno vremena da se opustite pred kamerom.", "inc": ["20 obrađenih fotografija u punoj rezoluciji", "Online galerija za preuzimanje", "Do 2 lokacije u Sarajevu", "Do 2 presvlačenja", "Savjeti oko odjeće prije snimanja", "Galerija za 5 dana"], "ex": [["Dodatni sat", "200 KM"], ["Brža isporuka (48 h)", "50 KM"], ["Štampa 20×30 cm", "25 KM"]], "ic": ""}, {"v": "Portret", "name": "Par ili porodica", "price": "380 KM", "time": "1,5 sat", "img": "img/f7b9fef688e3538b4cd28884ee8ff72e.jpg", "za": "Za parove, porodice i male grupe do 5 osoba. Ostavljam prostor za spontane kadrove, naročito s djecom.", "inc": ["30 obrađenih fotografija u punoj rezoluciji", "Online galerija za preuzimanje", "Do 2 lokacije u Sarajevu", "Do 5 osoba u kadru", "Galerija za 7 dana"], "ex": [["Dodatnih 30 min", "80 KM"], ["Štampa 20×30 cm", "25 KM"], ["Osoba preko 5", "20 KM"]], "ic": ""}, {"v": "Brend", "name": "Brend", "price": "500 KM", "time": "4 sata", "img": "img/5082f76ec2de110db44ac982ee974a31.jpg", "za": "Za male firme, zanatlije i kafiće kojima trebaju fotografije za sajt, Instagram i štampane materijale.", "inc": ["40 obrađenih fotografija u punoj rezoluciji", "Moodboard dogovoren prije snimanja", "Licenca za sajt, mreže i štampu", "Online galerija za preuzimanje", "Galerija za 10 dana"], "ex": [["Dodatni sat", "150 KM"], ["Kratki video 15 s", "120 KM"]], "ic": "pm-i-sb"}, {"v": "Brend", "name": "Brend cijeli dan", "price": "900 KM", "time": "8 sati", "img": "img/2ddbe4ce833b1f663d0b92e4aa08c853.jpg", "za": "Za brendove kojima treba cijela biblioteka kadrova: proizvod, ljudi, prostor i detalji u jednom danu.", "inc": ["80 obrađenih fotografija u punoj rezoluciji", "Moodboard i plan snimanja unaprijed", "Licenca za sajt, mreže i štampu", "Online galerija za preuzimanje", "Galerija za 14 dana"], "ex": [["Kratki video 15 s", "120 KM"], ["Brža isporuka (5 dana)", "100 KM"]], "wide": true, "ic": "pm-i-ikea"}, {"v": "Brend", "name": "Kampanja", "price": "1.700 KM", "time": "2 dana", "img": "img/f20562f4a150371e119e0521b0ae2472.jpg", "za": "Za lansiranja i kampanje u kojima je potreban koncept, režija i više različitih scena.", "inc": ["150 obrađenih fotografija u punoj rezoluciji", "Koncept i moodboard zajedno s vama", "Licenca za sajt, mreže, štampu i oglase", "Online galerija za preuzimanje", "Galerija za 21 dan"], "ex": [["Dodatni dan", "700 KM"], ["Video 30 s", "250 KM"]], "ic": ""}, {"v": "Vjenčanje", "name": "Vjenčanje", "price": "800 KM", "time": "10 sati", "img": "img/32f95a922e29d08852a9e19745485f0a.jpg", "za": "Za vjenčanje u Sarajevu i okolini. Pratim cijeli dan, od priprema do prvog plesa.", "inc": ["400+ obrađenih fotografija", "Online galerija za preuzimanje", "10 sati snimanja", "Razgovor i dogovor prije vjenčanja", "Galerija za 21 dan"], "ex": [["Dodatni sat", "100 KM"], ["Put izvan Sarajeva", "50 KM"]], "ic": ""}, {"v": "Vjenčanje", "name": "Vjenčanje + album", "price": "1.100 KM", "time": "10 sati", "img": "img/41b4c71dafeb94a30215a4525370f094.jpg", "za": "Za parove koji žele nešto što mogu držati u rukama, pored online galerije.", "inc": ["400+ obrađenih fotografija", "Štampani album 30×30 cm", "Online galerija za preuzimanje", "10 sati snimanja", "Galerija za 21 dan"], "ex": [["Dodatni sat", "100 KM"], ["Dodatni album", "180 KM"]], "ic": ""}, {"v": "Vjenčanje", "name": "Dva fotografa", "price": "1.300 KM", "time": "10 sati", "img": "img/114a3822151943b8c33cbf05d0bba433.jpg", "za": "Za veća vjenčanja gdje se istovremeno dešava više stvari, npr. priprema mladenke i mladoženje.", "inc": ["600+ obrađenih fotografija", "Dva fotografa tokom cijelog dana", "Online galerija za preuzimanje", "10 sati snimanja", "Galerija za 28 dana"], "ex": [["Štampani album 30×30 cm", "180 KM"], ["Dodatni sat", "160 KM"]], "ic": ""}, {"v": "Vjenčanje", "name": "Dva dana", "price": "1.500 KM", "time": "2 dana", "img": "img/0197a6de5764d227e3658f2aa558fda8.jpg", "za": "Za parove koji žele pripreme i proslavu odvojeno, bez žurbe.", "inc": ["Pripreme prvog dana, vjenčanje drugog", "500+ obrađenih fotografija", "Online galerija za preuzimanje", "Razgovor i dogovor prije vjenčanja", "Galerija za 28 dana"], "ex": [["Štampani album 30×30 cm", "180 KM"], ["Dodatni sat", "100 KM"]], "ic": ""}];
const pmStepsL = ["Pošaljete upit i dogovorimo termin", "Snimanje na dogovorenoj lokaciji", "Biram i obrađujem najbolje kadrove", "Dobijete link na online galeriju"];
const pmCur = st.pmCur === undefined ? -1 : st.pmCur;
const pmSel = pmCur >= 0 ? PMD[pmCur] : null;
const pmNum = (t) => { const m = String(t).replace(/\./g, '').match(/\d+/); return m ? parseInt(m[0], 10) : 0; };
const pmFmt = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' KM';
const pmPicked = (st.pmPick && st.pmPick[pmCur]) || {};
const pmAddN = pmSel ? pmSel.ex.reduce((t, x, i) => t + (pmPicked[i] ? pmNum(x[1]) : 0), 0) : 0;
const pmOpenFn = (i) => () => { lock(true); this.setState({ pmCur: i }); };
const pmClose = () => { lock(false); this.setState({ pmCur: -1 }); };
const pmVals = {
pmOpen: !!pmSel, pmCls: 'pm' + (pmSel && pmSel.wide ? ' pm-w' : ''),
pm: pmSel ? { ...pmSel, incs: pmSel.inc.map((t) => ({ t })) } : { incs: [] },
pmSteps: pmStepsL.map((t, i) => ({ n: i + 1, t })),
pmAdds: pmSel ? pmSel.ex.map((x, i) => ({ a: x[0], b: '+ ' + x[1], on: !!pmPicked[i], cls: 'pm-a' + (pmPicked[i] ? ' on' : ''),
  tog: () => { const p = Object.assign({}, this.state.pmPick || {}); const q = Object.assign({}, p[pmCur] || {}); q[i] = !q[i]; p[pmCur] = q; this.setState({ pmPick: p }); } })) : [],
pmTotal: pmSel ? pmFmt(pmNum(pmSel.price) + pmAddN) : '',
pmHasAdds: pmAddN > 0, pmAddSum: pmFmt(pmAddN),
pmClose, pmBack: (e) => { if (e.target === e.currentTarget) pmClose(); }, pmKey: (e) => { if (e.key === 'Escape') pmClose(); },
pmPick: (e) => { if (!pmSel) return; const extra = pmSel.ex.filter((x, i) => pmPicked[i]).map((x) => x[0]); this.setState({ pmCur: -1 }); openForm(pmSel.v, pmSel.name)(e); if (extra.length) this.setState({ fPoruka: 'Želim i dodatke: ' + extra.join(', ') + '.' }); },
pd0: pmOpenFn(0), pd1: pmOpenFn(1), pd2: pmOpenFn(2), pd3: pmOpenFn(3), pd4: pmOpenFn(4), pd5: pmOpenFn(5), pd6: pmOpenFn(6), pd7: pmOpenFn(7), pd8: pmOpenFn(8), pd9: pmOpenFn(9)
};

const goStep = (n) => this.setState({ ...snap(), fStep: n, fErr: '' });
const fNext = () => {
if (fStep === 1) { if (!fV) { this.setState({ ...snap(), fErr: 'Izaberi vrstu snimanja.' }); return; } goStep(2); return; }
if (fStep === 2) { if (!fDatum) { this.setState({ ...snap(), fErr: 'Izaberi slobodan datum ili klikni „Nemam još tačan datum".' }); return; } goStep(3); }
};
const send = (kind) => () => {
const s2 = snap();
const ime2 = s2.fIme.trim(), kon2 = s2.fKontakt.trim();
let err = '';
if (!fV) err = 'Izaberi vrstu snimanja.';
else if (!ime2) err = 'Upiši ime i prezime.';
else if (!kon2) err = 'Upiši telefon ili email da ti se mogu javiti.';
if (err) { this.setState({ ...s2, fErr: err }); return; }
const dat = fDatum ? fDatum.split('-').reverse().join('.') : 'još nije određen';
const tx = 'Zdravo, ja sam ' + ime2 + '. Želim zakazati snimanje: ' + fV + (fP && fP !== 'Još ne znam' ? ' (' + fP + ')' : '') + '. Željeni datum: ' + dat + '. Kontakt: ' + kon2 + '.' + (s2.fPoruka.trim() ? ' ' + s2.fPoruka.trim() : '');
const wa = 'https://wa.me/' + broj + '?text=' + encodeURIComponent(tx);
const ml = 'mailto:' + mail + '?subject=' + encodeURIComponent('Upit: ' + fV + (fP ? ' - ' + fP : '')) + '&body=' + encodeURIComponent(tx);
this.setState({ ...s2, fErr: '', fDone: true, fWa: wa, fMl: ml });
if (kind === 'wa') { try { window.open(wa, '_blank', 'noopener'); } catch (err2) {} } else { try { window.location.href = ml; } catch (err3) {} }
};
// Zauzeti datumi — dopuni ili izbriši datume u formatu 'GGGG-MM-DD'
const zauzeto = ['2026-11-14', '2026-11-15', '2026-11-21', '2026-11-28', '2026-12-05', '2026-12-06', '2026-12-12', '2026-12-19', '2026-12-31', '2027-01-09', '2027-01-16'];
const mjeseci = ['Januar', 'Februar', 'Mart', 'April', 'Maj', 'Jun', 'Jul', 'August', 'Septembar', 'Oktobar', 'Novembar', 'Decembar'];
const pad2 = (n) => (n < 10 ? '0' + n : '' + n);
const danas = new Date(); danas.setHours(0, 0, 0, 0);
const mOff = st.fMonth || 0;
const prvi = new Date(danas.getFullYear(), danas.getMonth() + mOff, 1);
const god = prvi.getFullYear(), mj = prvi.getMonth();
const praznih = (prvi.getDay() + 6) % 7;
const uMjesecu = new Date(god, mj + 1, 0).getDate();
const calDani = [];
for (let i = 0; i < praznih; i++) calDani.push({ n: '', cls: 'cal-d cal-blank', tab: '-1', aria: '', sel: false, pick: () => {} });
for (let d = 1; d <= uMjesecu; d++) {
const iso = god + '-' + pad2(mj + 1) + '-' + pad2(d);
const proslo = new Date(god, mj, d) < danas;
const bk = zauzeto.indexOf(iso) >= 0;
const sel = fDatum === iso;
const slobodan = !proslo && !bk;
calDani.push({
n: String(d),
cls: 'cal-d' + (proslo ? ' cal-off' : bk ? ' cal-bk' : '') + (sel ? ' cal-sel' : ''),
tab: slobodan ? '0' : '-1',
sel: sel,
aria: d + '. ' + mjeseci[mj] + ' ' + god + (bk ? ' — rezervisano' : proslo ? ' — prošlo' : ' — slobodno'),
pick: slobodan ? () => this.setState({ ...snap(), fDatum: sel ? '' : iso, fErr: '' }) : () => {}
});
}
const calIzabrano = fDatum ? 'Izabrano: ' + fDatum.split('-').reverse().join('.') + '.' : 'Nijedan datum još nije izabran.';
const pMeta = (paketi[fV] || []).reduce((a, q) => (q[0] === fP ? q[1] : a), '');
const fPkt = fP && fP !== 'Još ne znam' ? fP + (pMeta ? ' · ' + pMeta : '') : '';
const fChip = !fPkt ? (fV || 'Snimanje') : (fPkt.indexOf(fV) === 0 ? fPkt : fV + ' · ' + fPkt);
const datTxt = fDatum ? fDatum.split('-').reverse().join('.') + '.' : 'datum otvoren';
const stCls = (n) => 'fm-st' + (fStep > n ? ' fm-st-do' : fStep === n ? ' fm-st-now' : '');
const fVrste = ['Vjenčanje', 'Portret', 'Brend'].map((v) => ({ label: v, cls: v === fV ? 'fm-pill fm-pill-on' : 'fm-pill', pressed: v === fV, pick: () => this.setState({ ...snap(), fVrsta: v, fPaket: '' }) }));
const fPaketi = (paketi[fV] || []).concat([['Još ne znam', 'dogovorimo zajedno']]).map((q) => ({ label: q[0], meta: q[1], cls: q[0] === fP ? 'fm-pill fm-pill-on' : 'fm-pill', pressed: q[0] === fP, pick: () => this.setState({ ...snap(), fPaket: q[0] }) }));
return {
prIsP, prIsV,
prClsP: prIsP ? 'pr-seg-btn pr-seg-on' : 'pr-seg-btn',
prClsV: prIsV ? 'pr-seg-btn pr-seg-on' : 'pr-seg-btn',
prPickP: () => this.setState({ prSel: 'p', prAct: 0 }),
prPickV: () => this.setState({ prSel: 'v', prAct: 0 }),
prDots: (prIsP ? ['Mini portret', 'Portret', 'Par ili porodica', 'Brend', 'Brend cijeli dan', 'Kampanja'] : ['Vjenčanje', 'Vjenčanje + album', 'Dva fotografa', 'Dva dana']).map((n, i) => ({ label: 'Paket ' + n, cls: 'pr-dot' + (i === (st.prAct || 0) ? ' on' : ''), go: () => { const r = document.getElementById('pr-sw'); const e = r && r.querySelectorAll('.pr-card')[i]; if (e) r.scrollTo({ left: e.offsetLeft - r.offsetLeft - 16, behavior: 'smooth' }); } })),
filters, sizes, cols, pager, showPager: pages > 1 && !allOn,
allOn, showAllBtn: pages > 1, allLabel: allOn ? 'Prikaži po stranicama' : 'Sve fotografije (' + list.length + ')',
toggleAll: () => { this.setState({ all: !allOn, page: 1 }); if (allOn) goTop(); },
vrsta, ime, datum, poruka,
onVrsta: (e) => this.setState({ vrsta: e.target.value }),
onIme: (e) => this.setState({ ime: e.target.value }),
onDatum: (e) => this.setState({ datum: e.target.value }),
onPoruka: (e) => this.setState({ poruka: e.target.value }),
whatsappHref: 'https://wa.me/' + broj + '?text=' + encodeURIComponent(tekst),
viberHref: 'viber://chat?number=%2B' + broj,
mailHref: 'mailto:hello@kadar.studio?subject=' + encodeURIComponent('Upit: ' + vrsta) + '&body=' + encodeURIComponent(tekst),
zakaziVjencanje: openForm('Vjenčanje', ''),
zakaziPortret: openForm('Portret', ''),
zakaziBrend: openForm('Brend', ''),
fOpen, fDone, fShowForm: !fDone, fErr, fIme, fKontakt, fDatum, fPoruka, fVrste, fPaketi, fHasPaketi: !!fV,
fStep1: fStep === 1, fStep2: fStep === 2, fStep3: fStep === 3,
fS1: stCls(1), fS2: stCls(2), fS3: stCls(3), fS1n: fStep > 1 ? '✓' : '1', fS2n: fStep > 2 ? '✓' : '2',
fChip, fChip2: fChip + ' · ' + datTxt,
fCnt: 'Korak ' + fStep + ' od 3' + (fStep === 2 && fDatum ? ' · izabrano: ' + datTxt : ''),
fCanBack: fStep > 1, fNotLast: fStep < 3, fLast: fStep === 3,
fOnIme: (e) => this.setState({ fIme: e.target.value, fErr: '' }),
fOnKontakt: (e) => this.setState({ fKontakt: e.target.value, fErr: '' }),
fOnPoruka: (e) => this.setState({ fPoruka: e.target.value }),
fNext, fPrev: () => goStep(fStep - 1), fGo1: () => goStep(1), fGo2: () => goStep(2),
fSkipDatum: () => this.setState({ ...snap(), fDatum: '', fStep: 3, fErr: '' }),
calDani, calIzabrano, calMjesec: mjeseci[mj] + ' ' + god,
calPrevCls: mOff > 0 ? 'cal-nav' : 'cal-nav cal-nav-off',
calPrev: () => { if (mOff > 0) this.setState({ ...snap(), fMonth: mOff - 1 }); },
calNext: () => { if (mOff < 11) this.setState({ ...snap(), fMonth: mOff + 1 }); },
fImeKratko: (fIme.trim().split(' ')[0] || ''), fWa: st.fWa || '#', fMl: st.fMl || '#',
mOpen: !!st.mOpen, mToggle: () => this.setState({ mOpen: !this.state.mOpen }), mClose: () => this.setState({ mOpen: false }),
mBook: (e) => { this.setState({ mOpen: false }); openForm('', '')(e); },
openForm: openForm('', ''), fClose, sendWa: send('wa'), sendMail: send('mail'),
fBack: (e) => { if (e.target === e.currentTarget) fClose(); },
fKey: (e) => { if (e.key === 'Escape') fClose(); },
fBackToForm: (e) => { if (e && e.preventDefault) e.preventDefault(); this.setState({ fDone: false }); },
pk0: openForm("Portret", "Mini portret"),
pk1: openForm("Portret", "Portret"),
pk2: openForm("Portret", "Par ili porodica"),
pk3: openForm("Brend", "Brend"),
pk4: openForm("Brend", "Brend cijeli dan"),
pk5: openForm("Brend", "Kampanja"),
pk6: openForm("Vjenčanje", "Vjenčanje"),
pk7: openForm("Vjenčanje", "Vjenčanje + album"),
pk8: openForm("Vjenčanje", "Dva fotografa"),
pk9: openForm("Vjenčanje", "Dva dana"),
...pmVals
};
}
}

const state = reactive({});
const comp = new Component();
comp.props = {};
Object.defineProperty(comp, 'state', { get: () => state });
comp.setState = (o) => { const v = typeof o === 'function' ? o(state, comp.props) : o; if (v) Object.assign(state, v); };
comp.forceUpdate = () => {};
const V = reactive({});
let prev = {};
createApp({
template: '#tpl',
setup() {
watchEffect(() => { const r = comp.renderVals(); for (const k in r) V[k] = r[k]; });
return V;
},
mounted() {
prev = Object.assign({}, state);
this.$nextTick(() => { if (comp.componentDidMount) comp.componentDidMount(); });
},
updated() {
const p = prev; prev = Object.assign({}, state);
if (comp.componentDidUpdate) comp.componentDidUpdate({}, p);
}
}).mount('#app');
})();

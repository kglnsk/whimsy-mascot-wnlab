'use strict';
/* ===== Site structure (mirrors wnlab.ru/research-directions) + router ===== */
const TOPICS = {
  noma: ['NOMA Wi-Fi Prototype and Optimization', 'Неортогональный множественный доступ: точка доступа передаёт двум станциям одновременно в одной полосе, разделяя их по мощности. Прототип на SDR и оптимизация параметров.'],
  mlo: ['Multilink in Wi-Fi 7: Multi-link Operation', 'Устройства Wi-Fi 7 работают сразу в нескольких диапазонах. Исследуем, как распределять кадры по соединениям, чтобы получить скорость и надёжность.'],
  industrial: ['Industrial Wi-Fi: Enabling Industrial Internet of Things with Wi-Fi', 'Детерминированная доставка команд для роботов и станков: расписания, дублирование кадров, работа при помехах.'],
  dense: ['Dense Wi-Fi Networks Optimization (SR, D-MIMO, PON)', 'Плотные сети: пространственное переиспользование канала (Spatial Reuse), распределённый MIMO и оптический транспорт PON.'],
  analytical: ['Analytical modeling of modern wireless networks', 'Математические модели — цепи Маркова, теория очередей — позволяют за секунды оценить производительность сети и найти оптимальные параметры.'],
  mimo: ['Wi-Fi MIMO', 'Многоантенные технологии: формирование лучей, многопользовательский MIMO, зондирование канала и его накладные расходы.'],
  v2x: ['V2X with Cellular and Wi-Fi Networks: Wireless Networks Optimization for Future Intelligent Transportation Systems', 'Связь «автомобиль — всё»: машины, пешеходы и инфраструктура обмениваются сообщениями безопасности по Wi-Fi и сотовым сетям.'],
  mesh: ['Wi-Fi Mesh', 'Многошаговые сети: узлы пересылают кадры друг другу, маршруты перестраиваются сами, покрытие растёт без кабелей.'],
  halow: ['Wi-Fi HaLow', 'IEEE 802.11ah: Wi-Fi ниже 1 ГГц. Километровая дальность, тысячи устройств на точку доступа, годы работы от батарейки.'],
  vr: ['Virtual reality application modeling', 'Модели трафика VR-приложений: какими пачками и как часто идут кадры — чтобы сеть успевала доставить каждый вовремя.'],
  lowpower: ['Low-Power Wi-Fi', 'Энергосбережение в Wi-Fi: режимы сна, расписания пробуждений и Wake-Up Radio (IEEE 802.11ba).'],
  standard: ['Standardizing Wi-Fi', 'Участие в комитете IEEE 802.11: наши предложения, подкреплённые моделями и экспериментами, попадают в будущие стандарты Wi-Fi.'],
  lowlat: ['Low-latency communications in Wi-Fi', 'Приложения реального времени в Wi-Fi: вытеснение, выделенные интервалы и новые методы доступа к каналу для задержек порядка миллисекунды.'],
  nbfi: ['NB-Fi Mathematical Modeling and Optimization', 'Отечественный узкополосный протокол для Интернета вещей: модели ёмкости сети и оптимизация параметров.'],
  urllc: ['5G URLLC: Ultra-Reliable Low-Latency Communications in 5G systems', 'Сверхнадёжная связь с малой задержкой: 1 мс и 99,999 %. Алгоритмы планирования, дублирование и прототип.'],
  lorawan: ['LoRaWAN Mathematical Modeling and Optimization', 'Дальнобойная сеть для датчиков: модели коллизий, выбор коэффициента расширения спектра и адаптация скорости.'],
  traffic: ['Privacy and Encrypted Traffic Classification: Traffic classification', 'Определяем тип приложения по «почерку» зашифрованного трафика — без доступа к содержимому — чтобы сеть обслуживала его правильно.'],
  risproto: ['RIS Prototype', 'Собственный прототип реконфигурируемой интеллектуальной поверхности и измерения в безэховой камере.'],
  nru: ['5G NR-U LAA: Coexistence of Wi-Fi and NR-U systems', 'Wi-Fi и 5G в общем нелицензируемом спектре: как сделать сосуществование честным и эффективным.'],
  ntn: ['5G NTN: Low-Earth-Orbit 5G Satellite Networks', 'Неназемные сети 5G: базовые станции на низкоорбитальных спутниках, хэндоверы, большие задержки и доплеровский сдвиг.'],
  slicing: ['Network Slicing: DeSlice and xStream', 'Нарезка сети на изолированные виртуальные сети с гарантиями качества и алгоритмы динамического распределения ресурсов между ними.'],
  sched: ['Schedulers and Link Adaptation Algorithms', 'Кому, когда и с какой модуляцией передавать: планировщики и адаптация к качеству канала в 5G.'],
  risalgo: ['RIS algorithms: Statistical- and Codebook-based algorithms for RIS adjustment', 'Как быстро настроить сотни элементов RIS: кодовые книги и алгоритмы на основе статистики канала.'],
  qris: ['A QuaDRiGa-Based Simulation Platform for Reconfigurable Intelligent Surfaces', 'QRIS — платформа моделирования сетей с RIS на основе реалистичной модели канала QuaDRiGa.'],
  mmimo: ['5G Massive MIMO', 'Антенные решётки из десятков и сотен элементов: узкие лучи, пространственное мультиплексирование, оценка канала.'],
  datacenter: ['Communications in Data Centers: Optimization of data transmission for distributed AI training', 'Сети дата-центров для распределённого обучения ИИ: как передавать градиенты так, чтобы GPU не простаивали.']
};
const DIRS = [
  { id: 'wi-fi', scene: 'wifi', title: 'Wi-Fi', subs: ['noma', 'mlo', 'industrial', 'dense', 'analytical', 'mimo', 'v2x', 'mesh', 'halow', 'vr', 'lowpower', 'standard', 'lowlat'] },
  { id: 'iot', scene: 'iot', title: 'Internet of Things', h1: 'Wireless Internet of Things', subs: ['nbfi', 'urllc', 'industrial', 'lorawan', 'traffic', 'analytical', 'v2x', 'halow', 'lowpower', 'standard', 'lowlat'] },
  { id: 'testbeds', scene: 'testbeds', title: 'Testbeds & Prototypes', h1: 'Testbeds and Prototypes', subs: ['noma', 'urllc', 'traffic', 'risproto'] },
  { id: 'cellular', scene: 'cellular', title: '5G/6G', h1: '5G/6G Cellular Systems', subs: ['nru', 'ntn', 'urllc', 'slicing', 'v2x', 'sched', 'risproto', 'risalgo', 'qris', 'mmimo'] },
  { id: 'ris', scene: 'ris', title: 'Reconfigurable Intelligent Surfaces', subs: ['risproto', 'risalgo', 'qris'] },
  { id: 'ai', scene: 'ai', title: 'Artificial Intelligence', h1: 'AI and Wireless', subs: ['urllc', 'datacenter', 'traffic', 'risalgo', 'standard'] }
];

const $ = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };

function player(id) {
  const sc = SCENES[id], box = $('div', 'player');
  if (!sc) { box.textContent = 'Сценка «' + id + '» в работе'; return box; }
  const cv = $('canvas'); cv.width = 960; cv.height = 420; box.append(cv);
  if (window.CLEAN) { box.classList.add('clean'); const m = mount(cv, id); cv.onclick = () => m.paused ? m.play() : m.pause(); return box; }
  const bar = $('div', 'pbar'), btn = $('button', 'pbtn', '❚❚'), track = $('div', 'track'), fill = $('div', 'fill'), capEl = $('div', 'cap');
  btn.title = 'Пауза / пуск'; track.append(fill);
  sc.cap.forEach((c, i) => { const d = $('i', 'tick'); d.style.left = (c[0] / sc.dur * 100) + '%'; d.title = c[1]; track.append(d); });
  bar.append(btn, track); box.append(bar, capEl);
  const m = mount(cv, id, {
    onTick: t => { fill.style.width = (t / sc.dur * 100) + '%'; },
    onCap: i => { capEl.innerHTML = `<b>${i + 1}/${sc.cap.length}</b> ${sc.cap[i][1]}`; capEl.classList.remove('pop'); void capEl.offsetWidth; capEl.classList.add('pop'); }
  });
  btn.onclick = () => { if (m.paused) { m.play(); btn.textContent = '❚❚'; } else { m.pause(); btn.textContent = '▶'; } };
  cv.onclick = btn.onclick;
  track.onclick = e => { const r = track.getBoundingClientRect(); m.seek((e.clientX - r.left) / r.width * sc.dur); };
  return box;
}
function thumb(id) {
  const cv = $('canvas', 'thumb'); cv.width = 480; cv.height = 210;
  const sc = SCENES[id]; if (!sc) return cv;
  const m = mount(cv, id, { paused: true, at: sc.thumb != null ? sc.thumb : sc.dur * .6 });
  const host = () => cv.closest('a') || cv;
  setTimeout(() => { const h = host(); h.addEventListener('mouseenter', () => m.play()); h.addEventListener('mouseleave', () => { m.pause(); m.seek(sc.thumb != null ? sc.thumb : sc.dur * .6); m.paused = true; }); });
  return cv;
}

function pageIndex(app) {
  app.append($('h1', '', 'Research Directions'));
  const grid = $('div', 'grid');
  DIRS.forEach(d => {
    const a = $('a', 'card'); a.href = '#/' + d.id;
    const cv = $('canvas'); cv.width = 720; cv.height = 315; a.append(cv, $('div', 'card-t', d.title), $('div', 'card-s', d.subs.length + ' тем →'));
    grid.append(a); mount(cv, d.scene, { at: rnd(d.id.length) * 3 });
  });
  app.append(grid);
}
function pageDir(app, d) {
  app.append($('div', 'crumbs', '<a href="#/">Research Directions</a> / ' + d.title), $('h1', '', d.h1 || d.title), player(d.scene));
  const list = $('div', 'subs');
  d.subs.forEach(s => {
    const a = $('a', 'sub'); a.href = '#/' + d.id + '/' + s;
    const tx = $('div', 'sub-tx'); tx.append($('div', 'sub-t', TOPICS[s][0]), $('div', 'sub-d', TOPICS[s][1]));
    a.append(thumb(s), tx); list.append(a);
  });
  app.append(list);
}
function pageTopic(app, d, s) {
  const tp = TOPICS[s];
  app.append($('div', 'crumbs', `<a href="#/">Research Directions</a> / <a href="#/${d.id}">${d.title}</a> / …`), $('h1', '', tp[0]), player(s), $('p', 'lead', tp[1]));
  const also = DIRS.filter(x => x.subs.includes(s));
  const nav = $('div', 'also', 'Тема входит в направления: ' + also.map(x => `<a href="#/${x.id}">${x.title}</a>`).join(' · '));
  const i = d.subs.indexOf(s), pn = $('div', 'pn');
  if (i > 0) { const pv = $('a', '', '← ' + TOPICS[d.subs[i - 1]][0].split(':')[0]); pv.href = '#/' + d.id + '/' + d.subs[i - 1]; pn.append(pv); }
  if (i < d.subs.length - 1) { const n = $('a', 'next', TOPICS[d.subs[i + 1]][0].split(':')[0] + ' →'); n.href = '#/' + d.id + '/' + d.subs[i + 1]; pn.append(n); }
  app.append(nav, pn, $('p', 'ph', 'Здесь остаётся текущее содержимое страницы: описание, публикации, участники.'));
}
function pageSheet(app, q) { // QA contact sheet: #/sheet/<from>/<count>/<phase 0..1>
  const ids = Object.keys(SCENES), from = +q[1] || 0, n = +q[2] || 8, phs = (q[3] || '.3,.75').split(',').map(Number);
  const g = $('div', 'sheet');
  ids.slice(from, from + n).forEach(id => phs.forEach(p => {
    const w = $('div'), cv = $('canvas'); cv.width = 640; cv.height = 280; cv.style.width = '100%';
    w.append(cv, $('small', '', id + ' @' + (SCENES[id].dur * p).toFixed(1))); g.append(w);
    mount(cv, id, { paused: true, at: SCENES[id].dur * p });
  }));
  app.append(g);
}
function route() {
  const app = document.getElementById('app'); app.innerHTML = ''; mounts.clear();
  const q = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
  document.body.classList.toggle('qa', q[0] === 'sheet');
  if (q[0] === 'sheet') return pageSheet(app, q);
  const d = DIRS.find(x => x.id === q[0]);
  if (!d) pageIndex(app); else if (q[1] && TOPICS[q[1]]) pageTopic(app, d, q[1]); else pageDir(app, d);
  window.scrollTo(0, 0);
}
window.addEventListener('hashchange', route);
window.addEventListener('DOMContentLoaded', route);
window.addEventListener('error', e => { document.title = 'ERR ' + e.message; });

'use strict';
/* ===== Top-level direction scenes ===== */

S('wifi', {
  dur: 16, thumb: 2.6,
  cap: [[0, 'Точка доступа раздаёт кадры всем устройствам в квартире'], [5, 'Включилась микроволновка — на канале 2,4 ГГц помехи, кадры теряются'], [9, 'Точка доступа перепрыгивает на свободный канал'], [12, 'Кино, звонки и игры снова идут без запинок']],
  draw(t) {
    const jam = win(t, 5, 9.4, .5), ch = seg(t, 9.2, 9.8), wc = ch > .5 ? P.sta : P.ap, hop = Math.sin(seg(t, 9, 9.8) * PI) * 26;
    room('#F8F3EB', '#E8DCCB');
    windowp(80, 60, 150, 110); cloud(95 + Math.sin(NOW * .2) * 8, 100, .55);
    R(395, 170, 180, 8, P.wood, 3); plant(425, 170, .9); R(535, 140, 26, 30, '#F28DB2', 3); R(541, 146, 14, 3, '#fff');
    R(70, 285, 220, 60, '#9CC5E8', 14); R(56, 255, 36, 90, '#86B5DD', 12); R(268, 255, 36, 90, '#86B5DD', 12);
    screen(590, 215, 150, 95, jam > .5 ? '#59607a' : '#7FD1C7'); R(655, 310, 20, 35, '#2b2d42'); R(630, 340, 70, 6, '#2b2d42', 3);
    A(1 - jam, () => { R(618 + Math.sin(NOW * 2) * 14, 262, 20, 20, P.yellow, 3); R(688, 250 + Math.sin(NOW * 3) * 5, 22, 30, P.pink, 3); });
    A(jam, () => at(665, 262, NOW * 4, 1, () => Arc(0, 0, 12, 0, 4.5, '#fff', 3)));
    R(800, 300, 150, 45, '#D8CFC2', 4); R(815, 245, 105, 55, '#fff', 6, '#9aa', 1.5); R(822, 252, 64, 41, '#3a3f55', 3);
    A(jam, () => R(822, 252, 64, 41, '#FFB347', 3)); C(903, 262, 4, '#9aa'); C(903, 278, 4, '#9aa');
    A(jam, () => { waves(854, 272, { c: P.red, max: 300, n: 4, sp: 80, a0: PI * .62, a1: PI * 1.38 }); label('2,4 ГГц: помехи!', 866, 222, '#fff', P.red); });
    waves(485, 118 - hop, { c: wc, max: 120, sp: 36 });
    cube({ x: 485, y: 170 - hop, s: 50, c: P.ap, label: 'AP', hat: 'ant', id: 2, mood: jam > .5 ? 'wow' : 'smile', hl: [452, 122 - hop + Math.sin(NOW * 5) * 9], hr: [518, 122 - hop + Math.cos(NOW * 5) * 9] });
    const sts = [[180, 215], [470, 275], [770, 240]];
    sts.forEach((s, j) => {
      const p = per(t, 2.4, j * .8), q = arcp(sm(p), 485, 100 - hop, s[0], s[1], 55), drop = jam * clamp((p - .35) * 2.2);
      A((1 - drop) * Math.min(1, p * 6, (1 - p) * 6), () => env(q[0], q[1] + drop * 100, 1, p * TAU + drop * 2, ch > .5 ? '#A5DDA5' : '#7CC0F0'));
    });
    const md = jam > .5 ? 'sad' : 'smile';
    cube({ x: 180, y: 292, s: 54, c: P.sta, label: 'STA', id: 3, mood: md, legs: false, lookAt: [485, 120], hl: [163, 280], hr: [197, 280] }); laptop(180, 290);
    const ph = cube({ x: 470, y: 345, s: 48, c: P.pink, id: 5, mood: md, lookAt: [500, 300], hr: [500, 300 + Math.sin(NOW * 2) * 2] }); R(ph.hr[0] - 6, ph.hr[1] - 20, 13, 22, '#2b2d42', 3);
    cube({ x: 770, y: 345, s: 50, c: P.yellow, id: 6, mood: md, lookAt: [665, 260], walk: 0 });
    bubble(485, 92 - hop, 'Канал 36!', win(t, 9.3, 11.6));
    bubble(180, 222, 'Завис…', win(t, 6, 8.6));
    A(seg(t, 12, 12.6), () => { bars(215, 250, 4); bars(505, 290, 4); bars(805, 285, 4); });
  }
});

S('iot', {
  dur: 16, thumb: 6.2,
  cap: [[0, 'Тысячи маленьких датчиков почти всё время спят'], [4.5, 'Проснулся — отправил пару байт — снова уснул'], [8, 'Базовая станция собирает показания за километры'], [11.5, 'Батарейки хватает на годы']],
  draw(t) {
    outdoor('#EAF6FF', '#CFE8C0'); sun(860, 70); cloud(120 + t * 4, 70); cloud(520 + t * 3, 45, .7);
    R(0, 330, W, 15, '#BFE0AE');
    // greenhouse
    ctx.beginPath(); ctx.arc(120, 345, 80, PI, 0); ctx.fillStyle = 'rgba(160,220,235,.45)'; ctx.fill(); ctx.strokeStyle = '#8fc1cf'; ctx.lineWidth = 2; ctx.stroke();
    plant(70, 345, .8); plant(170, 345, .7);
    house(250, 345, 110, 80); L([360, 320, 385, 320, 385, 345], P.steel, 5);
    bldg(760, 345, 70, 150, '#D6DCE8', '#fff', 3); R(865, 300, 44, 45, '#7d8597', 4); R(860, 294, 54, 8, '#5d6577', 3);
    tower(480, 345, 200); waves(480, 138, { c: P.violet, max: 60, sp: 20 });
    const N = [{ x: 120, c: P.sta, msg: '+23 °C', t0: 1.3 }, { x: 395, c: P.ap, msg: '12 м³ воды', t0: 4.6 }, { x: 650, c: '#fff', msg: 'Му! Я на лугу', t0: 8 }, { x: 887, c: P.yellow, msg: 'Бак полон', t0: 11.4 }];
    N.forEach((n, i) => {
      const a = win(t, n.t0, n.t0 + 2.6, .3), cow = i === 2, s = cow ? 58 : 36, y = i === 3 ? 294 : 345;
      const r = cube({ x: n.x, y, s, c: n.c, id: i + 4, legs: i !== 3, mood: cow ? 'talk' : a > .5 ? 'smile' : 'sleep', hr: a > .5 && !cow ? [n.x + s * .8, y - s * 1.5 + Math.sin(NOW * 9) * 4] : null });
      if (cow) { R(n.x - 27, r.top + 2, 16, 12, '#333', 4); R(n.x + 12, r.top + 34, 14, 16, '#333', 5); R(n.x - 8, y - 22, 16, 9, a > .5 ? P.red : P.pink, 2); L([n.x - 24, r.top, n.x - 30, r.top - 9], '#bbb', 4); L([n.x + 24, r.top, n.x + 30, r.top - 9], '#bbb', 4); }
      else if (a < .5) zzz(n.x + 14, y - s - 12);
      bubble(n.x, r.top - 6, n.msg, a, 14);
      const k = seg(t, n.t0 + .5, n.t0 + 2.1); if (k > 0 && k < 1) { const q = arcp(k, n.x, y - s, 480, 145, 90); pkt(q[0], q[1], cow ? P.pink : n.c, 11); }
    });
    const h = hero({ x: 560, y: 345, lookAt: [585, 300], hl: [565, 312], hr: [605, 312] });
    R(563, 262, 46, 56, '#2b2d42', 5); R(567, 266, 38, 48, '#fff', 2);
    N.forEach((n, i) => A(seg(t, n.t0 + 2, n.t0 + 2.4), () => { R(571, 271 + i * 11, 8, 7, i === 2 ? P.pink : n.c, 2); R(583, 272 + i * 11, 18, 4, '#cfd3da', 2); }));
    A(seg(t, 11.5, 12.2), () => { batt(40, 30, .92, 44); Tx('≈ 10 лет на одной батарейке', 96, 39, 15, P.ink, 'left'); });
  }
});

S('testbeds', {
  dur: 16, thumb: 11.5,
  cap: [[0, 'Идею из статьи нужно проверить «в железе»'], [4.5, 'Собираем прототип на программно-определяемых радио (SDR)'], [7.5, 'Сигнал летит по настоящему эфиру: шум, отражения, помехи'], [11.5, 'Созвездие собралось — алгоритм работает не только на бумаге']],
  draw(t) {
    room('#F3F5F9', '#DDE2EA');
    R(40, 50, 200, 120, '#fff', 6, '#cfd3da'); for (let i = 0; i < 4; i++) L([60, 78 + i * 22, 60 + 150 * rnd(i + 2) + 40, 78 + i * 22], '#cfd3da', 4);
    Tx('y = Hx + n', 140, 150, 15, P.steel);
    // scope
    screen(610, 40, 260, 190, '#12202e'); const on = seg(t, 5.8, 6.4), q = seg(t, 7, 11.5);
    L([630, 135, 850, 135], 'rgba(120,255,200,.2)', 1); L([740, 55, 740, 215], 'rgba(120,255,200,.2)', 1);
    A(on, () => { for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) for (let k = 0; k < 5; k++) { const sp = lerp(17, 1.6, q), a = rnd(i * 31 + j * 17 + k * 7 + Math.floor(NOW * 12)) * TAU, r = rnd(i + j * 5 + k * 3 + Math.floor(NOW * 12) * 3) * sp; C(674 + i * 44 + Math.cos(a) * r, 69 + j * 44 + Math.sin(a) * r, 2.2, '#7CFFC8'); } });
    A(seg(t, 11.3, 11.9), () => label('16-QAM · BER 0', 740, 248, '#12202e', '#7CFFC8', 13));
    // hero behind bench
    const sold = win(t, .6, 4.6, .5), jump = Math.abs(Math.sin(seg(t, 11.8, 14.6) * PI * 3)) * 22;
    const tip = [470 + Math.sin(NOW * 3) * 14, 284];
    const btn = seg(t, 5, 5.6) - seg(t, 6, 6.6);
    const h = hero({ x: 480, y: 345 - jump, s: 66, hat: 'goggles', mood: jump > 2 ? 'wow' : 'smile', lookAt: jump > 2 ? [740, 130] : [tip[0], 300], hr: jump > 2 ? [530, 235 - jump] : sold > .3 ? tip : [lerp(520, 585, btn), lerp(280, 281, btn)], hl: jump > 2 ? [430, 235 - jump] : [430, 290] });
    const as = cube({ x: 720, y: 345, s: 50, c: P.sta, id: 3, lookAt: [740, 130], hl: jump > 2 ? [700 + Math.sin(NOW * 14) * 6, 280] : null, hr: jump > 2 ? [735 - Math.sin(NOW * 14) * 6, 280] : null });
    // bench
    desk(110, 296, 600, 345, '#C9A27A');
    R(140, 256, 90, 40, '#e9ecf1', 5, P.steel, 1.5); C(160, 276, 5, on > .5 ? P.green : '#bbb'); L([215, 256, 215, 196], P.ink, 3); C(215, 194, 4, P.red); Tx('SDR', 190, 277, 12, P.steel);
    R(590, 256, 90, 40, '#e9ecf1', 5, P.steel, 1.5); C(610, 276, 5, on > .5 ? P.green : '#bbb'); L([605, 256, 605, 196], P.ink, 3); C(605, 194, 4, P.red); Tx('SDR', 650, 277, 12, P.steel);
    R(420, 284, 100, 12, '#3E8E5A', 3); for (let i = 0; i < 5; i++) R(430 + i * 17, 279, 10, 6, '#2b2d42', 1);
    R(575, 290, 22, 7, btn > .5 ? '#a11' : P.red, 3);
    A(sold, () => { L([tip[0], tip[1], tip[0] + 16, tip[1] - 26], P.steel, 4); spark(tip[0], tip[1] + 2, 12); for (let i = 0; i < 3; i++) { const p = per(NOW, 1.6, i * .5); A(.5 * (1 - p), () => C(tip[0] + Math.sin(p * 6 + i) * 6, tip[1] - p * 50, 4 + p * 6, '#c9ccd4')); } });
    A(on, () => { for (let i = 0; i < 4; i++) { const p = per(NOW, 1.6, i * .4); A(Math.sin(p * PI), () => Arc(215, 196, 20 + p * 380, -.5, .18, P.ap, 2.5)); } });
    bubble(480, h.top - 8, 'Работает!', win(t, 12, 15));
    bubble(480, h.top - 8, 'Пуск!', win(t, 5, 6.6));
  }
});

S('cellular', {
  dur: 18, thumb: 6,
  cap: [[0, 'Базовая станция ведёт абонента узким лучом'], [4.5, 'Трамвай едет — луч следует за ним'], [8, 'На границе сот — бесшовный хэндовер к соседней станции'], [12.5, '6G: дроны, спутники и роботы — в одной сети']],
  draw(t) {
    outdoor('#E6F1FB', '#C9CED8'); sun(90, 60, 22); cloud(300 - t * 3, 60, .8); cloud(700 - t * 2, 90, .6);
    bldg(40, 345, 120, 170, '#D6DCE8', '#fff', 1); bldg(170, 345, 90, 230, '#C7D0E0', '#fff', 2); bldg(300, 345, 130, 130, '#E3D9CF', '#fff', 5);
    bldg(520, 345, 110, 150, '#D6DCE8', '#fff', 7); bldg(700, 345, 100, 240, '#C7D0E0', '#fff', 4); bldg(820, 345, 110, 160, '#E3D9CF', '#fff', 9);
    tower(215, 115, 70); tower(750, 105, 70);
    R(0, 345, W, 75, '#AEB5C2'); L([0, 392, W, 392], '#fff', 3, [22, 18]); L([0, 362, W, 362], '#8c93a1', 2); L([0, 366, W, 366], '#8c93a1', 2);
    L([0, 262, W, 262], '#555', 1.5);
    const X = [[.5, -90], [16.5, 1040]], x = kf(t, X), ho = seg(x, 455, 505);
    const sx = kf(t, [[11, 1050], [17.8, 250]]); sat(sx, 40, .7, -.15);
    beam(215, 45, x, 310, P.ap, 56, .38 * (1 - ho)); beam(750, 35, x, 310, P.sta, 56, .38 * ho);
    // tram
    at(x, 0, 0, 1, () => {
      L([20, 290, 40, 262], '#555', 2.5); R(-90, 290, 180, 62, '#F6C95F', 12, 'rgba(0,0,0,.25)', 1.2); R(-90, 332, 180, 14, '#E06B4C');
      R(-78, 298, 44, 30, '#DDF1FA', 5); R(-26, 298, 44, 30, '#DDF1FA', 5); R(28, 298, 50, 30, '#DDF1FA', 5); C(-55, 354, 8, '#333'); C(55, 354, 8, '#333');
    });
    cube({ x: x - 4, y: 328, s: 26, c: P.sta, id: 2, legs: false, shadow: false, mood: 'smile', look: [1, 0] });
    cube({ x: x + 53, y: 328, s: 24, c: P.pink, id: 4, legs: false, shadow: false });
    bars(x - 30, 285, 4, P.green, .8);
    bubble(x, 282, 'Handover!', win(t, 7.6, 10.2));
    // drone
    const dx = kf(t, [[11.5, -60], [17.5, 620]]), dy = 185 + Math.sin(NOW * 2) * 6;
    A(seg(t, 12.6, 13.2), () => beam(750, 35, dx, dy, P.yellow, 30, .4));
    at(dx, dy, Math.sin(NOW * 2) * .05, 1, () => { L([-22, -8, 22, -8], P.ink, 2.5); for (const i of [-1, 1]) El(i * 22, -11, 12 * Math.abs(Math.cos(NOW * 30)) + 2, 2.5, 'rgba(0,0,0,.35)'); R(-12, -8, 24, 16, '#fff', 4, P.ink, 1.5); C(-4, -1, 1.8, P.ink); C(4, -1, 1.8, P.ink); L([0, 8, 0, 18], P.ink, 1.5); R(-9, 18, 18, 14, P.wood, 2); });
    hero({ x: 880, y: 345, s: 44, lookAt: [dx, dy], hr: t > 12.5 ? wave(905, 285) : null });
  }
});

S('ris', {
  dur: 16, thumb: 12.5,
  cap: [[0, 'Дом закрыл базовую станцию — за ним связи нет'], [3, 'Вешаем на стену умную поверхность из сотен элементов'], [7.5, 'Каждый элемент чуть сдвигает фазу отражённой волны'], [11, 'Отражения складываются в луч — точно на абонента']],
  draw(t) {
    outdoor('#EEF5FB', '#D8DDE5'); cloud(240 + t * 3, 50, .8);
    tower(90, 345, 210);
    bldg(380, 345, 150, 230, '#C9CFDB', '#fff', 3); bldg(850, 345, 110, 330, '#E3D9CF', '#fff', 8);
    tree(600, 345, .8); R(0, 345, W, 4, '#c3c9d3');
    const lift = kf(t, [[3, 0], [5.5, 170], [8.5, 170], [10.5, 0]]), built = seg(t, 5.6, 7.2), on = seg(t, 10.6, 11.6);
    // blocked direct beam
    beam(100, 135, 380, 250, P.ap, 50, .3); A(1 - on, () => cross(372, 250, 8));
    // reflected path
    A(seg(t, 7.4, 8) * .9, () => beam(100, 135, 852, 150, P.ap, 46, .3));
    A(on, () => { beam(852, 150, 690, 300, P.sta, 60, .45); for (let i = 0; i < 3; i++) { const p = per(NOW, 1.2, i * .4), q = p < .6 ? [lerp(100, 852, p / .6), lerp(135, 150, p / .6)] : [lerp(852, 690, (p - .6) / .4), lerp(150, 300, (p - .6) / .4)]; C(q[0], q[1], 4, '#fff', P.ap, 2); } });
    // RIS on wall
    A(built, () => tiles(828, 105, 3, 6, 15, (i, j) => on > .01 ? (Math.floor(j + i * .5 + 2) % 3 === 0 ? 1 : 0) : seg(t, 7.6 + j * .25, 8 + j * .25) > .5 ? (Math.sin(NOW * 5 - j * 1.2 + i) > 0 ? 1 : 0) : 0));
    // lift
    R(770, 335, 70, 10, '#F59E42', 3); for (let i = 0; i < 3; i++) { const y0 = 335 - lift * i / 3, y1 = 335 - lift * (i + 1) / 3; L([778, y0, 832, y1], P.steel, 3); L([832, y0, 778, y1], P.steel, 3); }
    R(766, 327 - lift, 78, 8, '#F59E42', 3); L([768, 327 - lift, 768, 300 - lift, 842, 300 - lift, 842, 327 - lift], '#F59E42', 3);
    const wk = win(t, 5.5, 7.4, .3);
    const h = hero({ x: 800, y: 327 - lift, s: 46, hat: 'hard', lookAt: wk > .3 ? [850, 150] : [690, 300], hr: wk > .3 ? [828, 150 + Math.sin(NOW * 6) * 26] : null });
    A(wk, () => spark(830, 150 + Math.sin(NOW * 6) * 26, 9));
    // user
    const ok = on > .5;
    const u = cube({ x: 690, y: 345, s: 52, c: P.sta, label: 'UE', id: 3, mood: ok ? 'smile' : 'sad', lookAt: ok ? [850, 150] : [710, 310], hr: [716, 300], hl: ok ? wave(655, 270) : null });
    R(708, 280, 16, 26, '#2b2d42', 3); R(710, 283, 12, 18, ok ? '#7FD1C7' : '#888', 1);
    bars(727, 268, ok ? 4 : Math.round(on * 3), P.green);
    bubble(690, u.top - 8, 'Нет сети…', win(t, .8, 3.4)); bubble(690, u.top - 8, 'Ловит!', win(t, 11.8, 15.2));
    label('RIS', 850, 86, '#fff', P.navy, 12);
  }
});

S('ai', {
  dur: 16, thumb: 9.5,
  cap: [[0, 'Современная сеть слишком сложна, чтобы настраивать её вручную'], [3.5, 'Обучаем нейросеть на данных реальной сети'], [8, 'Модель предсказывает канал и трафик'], [11.5, '…и сама подкручивает параметры: скорость растёт']],
  draw(t) {
    room('#F4F1FA', '#E2DDEE');
    const learn = seg(t, 3.5, 8), act = seg(t, 9, 10), gain = seg(t, 10, 14);
    // board with loss curve
    R(40, 40, 230, 140, '#fff', 8, '#cfd3da'); Tx('ошибка', 80, 58, 12, P.steel); axes(64, 160, 190, 86, P.steel);
    ctx.beginPath(); for (let i = 0; i <= 60 * learn; i++) { const k = i / 60, y = 82 + 72 * (1 - Math.exp(-k * 4)) + Math.sin(i * 1.7) * 3 * (1 - k); i ? ctx.lineTo(68 + k * 180, y) : ctx.moveTo(68, y); } ctx.strokeStyle = P.red; ctx.lineWidth = 3; ctx.stroke();
    // neural net of mini-cubes
    const Ls = [3, 4, 4, 2], pos = (l, i) => [400 + l * 80, 205 + (i - (Ls[l] - 1) / 2) * 58];
    for (let l = 0; l < 3; l++) for (let i = 0; i < Ls[l]; i++) for (let j = 0; j < Ls[l + 1]; j++) {
      const a = pos(l, i), b = pos(l + 1, j), wgt = .25 + .75 * rnd(l * 50 + i * 7 + j) * (learn * .7 + .3);
      L([a[0], a[1], b[0], b[1]], `rgba(142,107,209,${wgt * .7})`, 1 + wgt * 2.5);
      const p = per(t, 1.4, rnd(l + i * 3 + j * 5) * 1.4 + l * .3); if (rnd(i * 9 + j * 4 + l) > .55) C(lerp(a[0], b[0], p), lerp(a[1], b[1], p), 3, '#fff', P.violet, 1.5);
    }
    for (let l = 0; l < 4; l++) for (let i = 0; i < Ls[l]; i++) { const p = pos(l, i); cube({ x: p[0], y: p[1] + 15, s: 28, c: [P.ap, P.wur, P.wur, P.sta][l], id: l * 5 + i, legs: false, shadow: false, mood: learn > .9 ? 'smile' : 'flat', look: [1, 0], hr: l === 3 && act > .5 ? [735, p[1] + (i ? 22 : -22) + Math.sin(NOW * 4 + i) * 10] : null }); }
    // hero feeds examples
    const feed = win(t, 3.5, 8.4, .5);
    const hx = 330, th = per(t, 1.2);
    const h = hero({ x: hx, y: 345, hat: 'grad', lookAt: [400, 200], hr: feed > .3 ? [hx + 30 + th * 20, 300 - Math.sin(th * PI) * 60] : [hx + 36, 300], hl: [hx - 36, 318] });
    R(262, 318, 54, 27, P.wood, 4); for (let i = 0; i < 4; i++) pkt(272 + i * 12, 314, [P.ap, P.yellow, P.pink, P.sta][i], 11);
    A(feed, () => { const q = arcp(th, hx + 30, 300, 392, 205, 50); pkt(q[0], q[1], [P.ap, P.yellow, P.pink][Math.floor(t / 1.2) % 3], 13); });
    // control panel
    R(735, 110, 190, 200, '#fff', 10, '#cfd3da');
    ['Мощность', 'Канал', 'MCS'].forEach((s, i) => { const v = lerp(.3 + .2 * Math.sin(NOW * (1 + i) + i), [.75, .4, .9][i], act); Tx(s, 752, 134 + i * 44, 12, P.steel, 'left'); R(752, 148 + i * 44, 156, 6, '#e4e6ec', 3); R(752, 148 + i * 44, 156 * v, 6, P.violet, 3); C(752 + 156 * v, 151 + i * 44, 8, '#fff', P.violet, 3); });
    Tx('Скорость', 752, 268, 12, P.steel, 'left'); R(752, 280, 156, 14, '#e4e6ec', 7); R(752, 280, 156 * lerp(.25, .95, gain), 14, P.green, 7);
    Tx(Math.round(lerp(120, 480, gain)) + ' Мбит/с', 830, 330, 16, P.ink);
    bubble(hx, h.top - 6, 'Смотри и учись!', win(t, 3.8, 6.6)); bubble(720, 150, 'Дальше мы сами', win(t, 9.4, 12));
    const u = cube({ x: 880, y: 395, s: 38, c: P.sta, id: 9, mood: gain > .5 ? 'smile' : 'sad', lookAt: [830, 300] }); cube({ x: 830, y: 398, s: 34, c: P.pink, id: 12, mood: gain > .5 ? 'smile' : 'flat' });
  }
});

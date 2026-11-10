'use strict';
/* ===== Wi-Fi topic scenes ===== */

S('noma', {
  dur: 16, thumb: 7.6,
  cap: [[0, 'Обычно точка доступа обслуживает станции по очереди'], [2.5, 'NOMA: два сигнала складываются — громкий для дальней станции, тихий для ближней'], [7, 'Ближняя вычитает громкий сигнал и достаёт свой (SIC)'], [10.5, 'Дальняя слышит только громкий. Один эфир — обе довольны']],
  draw(t) {
    outdoor('#EEF6FB', '#D9E8CF'); cloud(600 + t * 3, 50, .8); sun(880, 60, 20);
    R(0, 0, 330, 345, '#F8F3EB'); R(322, 0, 10, 345, '#D8CFC2'); R(0, 345, 332, 75, '#E8DCCB'); windowp(190, 60, 90, 80);
    tree(640, 345, 1.1); house(770, 345, 150, 100, '#F3D9B1', '#C96A50');
    L([330, 392, 960, 392], 'rgba(0,0,0,.08)', 2, [8, 8]); Tx('5 м', 430, 404, 12, P.steel); Tx('40 м', 800, 404, 12, P.steel);
    const stack = (x, y, s, big, small) => at(x, y, 0, s, () => { A(big, () => { R(-24, -60, 48, 60, P.yellow, 4, 'rgba(0,0,0,.25)', 1); Tx('дальней', 0, -30, 10, '#7a5b00'); }); A(small, () => { R(-24, -80, 48, 18, P.ap, 3, 'rgba(0,0,0,.25)', 1); Tx('ближней', 0, -71, 9, '#fff'); }); });
    const b1 = seg(t, .8, 1.8), b2 = seg(t, 2.2, 3.2), fly = seg(t, 3.6, 6), fly2 = seg(t, 6, 9);
    waves(130, 215, { c: P.ap, max: 90, sp: 28, al: .6 });
    const ap = cube({ x: 130, y: 345, s: 76, c: P.ap, label: 'AP', hat: 'ant', id: 2, lookAt: [470, 240], hl: [96, 300], hr: fly > 0 ? wave(190, 250, 5, 5) : [186, 300 - b1 * 20] });
    A(1 - seg(t, 3.6, 3.9), () => stack(208, 320 - b1 * 10, 1, b1, b2));
    // travelling copy -> near
    if (fly > 0 && fly < 1) { const q = arcp(fly, 208, 310, 420, 320, 70); stack(q[0], q[1], 1, 1, 1); }
    // near station: SIC
    const sic = seg(t, 7.2, 8.6), open = seg(t, 9, 9.8);
    const n = cube({ x: 480, y: 345, s: 64, c: P.sta, label: 'STA 1', id: 3, mood: open > .5 ? 'smile' : 'flat', lookAt: [420, 280], hl: fly >= 1 ? [436 - sic * 30, 300 + sic * 20] : null, hr: open > .5 ? wave(530, 250) : null });
    if (fly >= 1) { A(1 - sic, () => at(420 - sic * 70, 320 + sic * 30, -sic * .8, 1, () => R(-24, -60, 48, 60, P.yellow, 4, 'rgba(0,0,0,.25)', 1))); at(420, 320 - sic * 4, 0, 1 + open * .3, () => { R(-24, -80 + sic * 62, 48, 18, P.ap, 3, 'rgba(0,0,0,.25)', 1); }); A(open, () => check(420, 272, 9)); }
    A(win(t, 7.2, 9.2), () => label('− громкий сигнал', 420, 240, '#fff', P.navy));
    // continue to far, attenuating
    if (fly2 > 0 && fly2 < 1) { const q = arcp(fly2, 440, 300, 715, 322, 90); stack(q[0], q[1], lerp(1, .55, fly2), 1, 1); }
    const far = seg(t, 9, 9.4), ok2 = seg(t, 10.8, 11.6);
    A(far, () => { stack(715, 322, .55, 1, 1 - ok2 * .8); for (let i = 0; i < 14; i++) C(700 + rnd(i + Math.floor(NOW * 10)) * 30, 276 + rnd(i * 3 + Math.floor(NOW * 10)) * 8, 1.4, P.steel); });
    A(ok2, () => { check(715, 262, 9); label('тихий утонул в шуме — не мешает', 760, 228, '#fff', P.navy); });
    const f = cube({ x: 790, y: 345, s: 64, c: P.pink, label: 'STA 2', id: 5, mood: ok2 > .5 ? 'smile' : 'flat', lookAt: [715, 300], hl: ok2 > .5 ? wave(745, 250) : null });
    bubble(130, ap.top - 26, 'Два в одном!', win(t, 2.6, 5));
    A(seg(t, 12, 12.8), () => { R(360, 30, 250, 62, '#fff', 10, '#cfd3da'); Tx('по очереди', 420, 46, 11, P.steel); R(375, 58, 44, 22, P.ap, 3); R(421, 58, 44, 22, P.yellow, 3); Tx('NOMA', 540, 46, 11, P.steel); R(500, 66, 80, 14, P.yellow, 3); R(500, 56, 80, 9, P.ap, 3); Tx('→', 482, 68, 16, P.ink); });
  }
});

S('mlo', {
  dur: 16, thumb: 10.5,
  cap: [[0, 'Раньше: одно соединение — один канал. Канал занят — все ждут'], [6, 'Wi-Fi 7 Multi-Link: устройство работает сразу в 2,4, 5 и 6 ГГц'], [9, 'Кадры едут по свободным полосам параллельно'], [12.5, 'Быстрее, надёжнее и без пробок']],
  draw(t) {
    R(0, 0, W, H, '#EAF4EA'); const ml = seg(t, 6, 7), ys = [130, 215, 300], nm = ['2,4 ГГц', '5 ГГц', '6 ГГц'], cs = [P.yellow, P.ap, P.violet];
    for (let i = 0; i < 6; i++) tree(60 + i * 170 + (i % 2) * 40, 68, .55); for (let i = 0; i < 5; i++) tree(140 + i * 180, 405, .5, '#9AD49A');
    ys.forEach((y, i) => { A(i === 1 ? 1 : .35 + .65 * ml, () => { R(170, y - 32, 620, 64, '#8f96a3', 10); L([185, y, 775, y], '#fff', 2.5, [18, 16]); label(nm[i], 480, y - 44, '#fff', cs[i]); }); });
    // foreign network truck on 5 GHz
    const bx = 520 + t * 6;
    at(bx, ys[1] + 18, 0, 1, () => { R(-46, -44, 70, 40, '#9aa0ad', 5, 'rgba(0,0,0,.3)', 1); R(24, -32, 26, 28, '#7d8597', 5); C(-28, -2, 8, '#333'); C(30, -2, 8, '#333'); Tx('чужая сеть', -11, -24, 10, '#fff'); });
    A(1 - ml, () => { for (let i = 0; i < 6; i++) { const x = Math.min(200 + (t + .4 - i * .7) * 150, bx - 70 - i * 32); if (x > 190) pkt(x, ys[1] + 4, cs[1], 24, '' + (i + 1), 5); } });
    A(ml, () => { for (let i = 0; i < 9; i++) { const ln = i % 3, p = per(t, ln === 1 ? 7 : 2.7, i * .3 + ln); const xe = ln === 1 ? bx - 70 - Math.floor(i / 3) * 32 : 770, x = Math.min(200 + p * (ln === 1 ? 7 : 2.7) * (ln === 1 ? 110 : 215), xe); A(Math.min(1, p * 8, ln === 1 ? 1 : (1 - p) * 8), () => pkt(x, ys[ln] + 4, cs[ln], 24, '' + (i + 1), 5)); } });
    const ap = cube({ x: 95, y: 290, s: 84, c: P.ap, label: 'AP', hat: 'ant', id: 2, mood: ml > .5 ? 'smile' : 'flat', lookAt: [500, 215], hr: ml > .5 ? [165, ys[Math.floor(t * 2.2) % 3] + 10] : [160, 222], hl: ml > .5 ? wave(40, 170, 4) : null });
    const st = cube({ x: 870, y: 290, s: 84, c: P.sta, label: 'STA', id: 3, mood: ml > .5 && t > 8 ? 'smile' : 'sad', lookAt: [600, 215], hl: [810, 225], hr: ml > .5 && t > 9 ? wave(925, 170) : null });
    bubble(870, st.top - 6, 'Буферизация…', win(t, 2.5, 5.8)); bubble(95, ap.top - 30, 'Три полосы сразу!', win(t, 6.4, 9));
    A(seg(t, 12.5, 13.2), () => { R(800, 330, 140, 60, '#fff', 10, '#cfd3da'); Tx('скорость ×3', 870, 350, 15); bars(848, 384, 4, P.green, 1.1); });
    A(1 - ml, () => at(870, 330, NOW * 4, 1, () => Arc(0, 0, 13, 0, 4.4, P.steel, 4)));
  }
});

S('industrial', {
  dur: 16, thumb: 9,
  cap: [[0, 'На заводе роботом управляют по воздуху — без проводов'], [4, 'Команды приходят строго по расписанию, как удары метронома'], [7.5, 'Помехи от сварки? Копия кадра летит по второму каналу'], [12, 'Ни одна коробка не упала: Wi-Fi стал детерминированным']],
  draw(t) {
    room('#EEF1F5', '#D5DAE2'); for (let i = 0; i < 5; i++) { R(60 + i * 190, 0, 14, 345, '#E2E6EC'); }
    R(0, 28, W, 12, '#C3C9D3'); for (let i = 0; i < 4; i++) { L([120 + i * 240, 40, 120 + i * 240, 62], P.steel, 2); Poly([100 + i * 240, 62, 140 + i * 240, 62, 150 + i * 240, 78, 90 + i * 240, 78], P.yellow); }
    const jam = win(t, 7.5, 11.5, .5), T2 = 2, cyc = per(t, T2);
    // metronome strip
    R(300, 96, 360, 30, '#fff', 8, '#cfd3da'); for (let i = 0; i < 9; i++) L([320 + i * 40, 104, 320 + i * 40, 118], P.steel, 2); C(320 + per(t, T2) * 320, 111, 6, P.hero); Tx('цикл 2 мс', 480, 86, 12, P.steel);
    // two APs on ceiling
    const tx = 780, ty = 262;
    [[380, P.ap], [700, P.violet]].forEach((a, i) => {
      cube({ x: a[0], y: 92, s: 40, c: a[1], label: 'AP', id: 2 + i, legs: false, shadow: false, hat: 'ant', lookAt: [tx, ty] }); L([a[0], 40, a[0], 52], P.steel, 3);
      const p = clamp((cyc - .1) / .4), lost = i === 0 && jam > .5, q = [lerp(a[0], tx, p), lerp(98, ty, p)];
      if (p > 0 && p < 1) { if (lost && p > .5) A(1 - (p - .5) * 2, () => { pkt(q[0], q[1], '#aaa', 14); cross(q[0], q[1], 9); }); else pkt(q[0], q[1], a[1], 14); }
    });
    // conveyor
    R(40, 300, 560, 16, '#5d6577', 8); for (let i = 0; i < 12; i++) at(64 + i * 47, 308, NOW * 3, 1, () => { C(0, 0, 7, '#8c93a1'); L([-5, 0, 5, 0], '#5d6577', 2); }); R(70, 316, 10, 29, P.steel); R(560, 316, 10, 29, P.steel);
    for (let i = 0; i < 5; i++) { const u = (((i - t / T2) % 5) + 5) % 5, x = 540 - u * 100; if (u > .02) { R(x - 20, 262, 40, 38, P.wood, 4, 'rgba(0,0,0,.25)', 1); L([x - 20, 276, x + 20, 276], P.wood2, 2); } }
    // robot arm (IK) picks box at (540,262) -> pallet
    const stackN = Math.floor(t / T2) % 4;
    const hx = kf(cyc, [[0, 540], [.12, 540], [.46, 655], [.62, 655], [.9, 540], [1, 540]]), hy = kf(cyc, [[0, 258], [.14, 150], [.44, 150], [.58, 295 - stackN * 38], [.72, 150], [.9, 170], [1, 258]]);
    const bx0 = 780, by0 = 300; R(750, 300, 60, 45, '#F59E42', 6); C(bx0, by0, 14, '#5d6577');
    const dx = hx - bx0, dy = hy - by0, d = Math.min(Math.hypot(dx, dy), 238), l = 120, a0 = Math.atan2(dy, dx), a1 = Math.acos(clamp(d / (2 * l), -1, 1)), ex = bx0 + Math.cos(a0 + a1) * l, ey = by0 + Math.sin(a0 + a1) * l;
    L([bx0, by0, ex, ey, hx, hy], '#F59E42', 14); L([bx0, by0, ex, ey, hx, hy], '#E08A2E', 4); C(ex, ey, 9, '#5d6577');
    L([hx - 22, hy + 12, hx - 22, hy, hx + 22, hy, hx + 22, hy + 12], '#5d6577', 5);
    if (cyc < .58) { R(hx - 20, hy + 4, 40, 38, P.wood, 4, 'rgba(0,0,0,.25)', 1); }
    R(610, 337, 90, 8, P.wood2, 2); for (let i = 0; i < stackN + (cyc >= .58 ? 1 : 0); i++) R(635, 299 - i * 38, 40, 38, P.wood, 4, 'rgba(0,0,0,.25)', 1);
    
    // welder
    const wl = cube({ x: 150, y: 345, s: 58, c: P.gray, id: 7, hat: 'mask', hr: [205, 240 + Math.sin(NOW * 5) * 3] }); R(196, 232, 70, 10, P.steel, 3);
    A(jam, () => { spark(232, 232, 30, P.yellow, 9); spark(232, 232, 16, '#fff', 5); waves(232, 232, { c: P.red, max: 190, sp: 70, n: 3, a0: -1.2, a1: .6 }); label('помехи', 250, 180, '#fff', P.red); });
    const h = hero({ x: 900, y: 345, s: 60, hat: 'hard', lookAt: [hx, hy], hl: [872, 300], hr: [906, 300] }); R(866, 270, 46, 34, '#2b2d42', 4); R(870, 274, 38, 26, '#7FD1C7', 2); Tx('0 потерь', 889, 287, 8, P.navy);
    bubble(900, h.top - 6, 'Копия дошла!', win(t, 8.6, 11.4)); bubble(900, h.top - 6, 'Как часы', win(t, 12.3, 15));
  }
});

S('dense', {
  dur: 18, thumb: 7.5,
  cap: [[0, 'Многоквартирный дом: десятки точек доступа перекрикивают друг друга'], [4.5, 'Spatial Reuse: каждая говорит тише — и соседи перестают мешать'], [9, 'Distributed MIMO: соседние точки вместе обслуживают одного клиента'], [13.5, 'PON: всех связывает оптика, по которой точки согласуют расписание']],
  draw(t) {
    outdoor('#EAF2FA', '#D5DAE2'); cloud(820, 50, .7);
    const sr = seg(t, 4.5, 6.5), dm = win(t, 9, 13.4, .6), pon = seg(t, 13.5, 14.5), x0 = 50, y0 = 30, rw = 230, rh = 140;
    R(x0 - 8, y0 - 8, rw * 3 + 16, rh * 2 + 48, '#C9CFDB', 8); R(x0, y0 + rh * 2, rw * 3, 32, '#9aa0ad');
    const col = [P.ap, P.pink, P.yellow, P.teal, P.violet, P.orange], aps = [];
    for (let j = 0; j < 2; j++) for (let i = 0; i < 3; i++) { const k = j * 3 + i, x = x0 + i * rw, y = y0 + j * rh; R(x + 3, y + 3, rw - 6, rh - 6, ['#FBF6EE', '#F3F7FB', '#F7F1F8'][(i + j) % 3], 4); R(x + 3, y + rh - 14, rw - 6, 11, '#E2D8C8'); aps.push([x + 60, y + rh - 14, x + 170, y + rh - 14, k]); }
    aps.forEach(a => { const r = lerp(190, 92, sr), k = a[4]; clipR(x0, y0, rw * 3, rh * 2, () => { C(a[0], a[1] - 40, r, null, sr > .5 ? col[k] : P.red, 2); A(.1, () => C(a[0], a[1] - 40, r, sr > .5 ? col[k] : P.red)); }); });
    // D-MIMO beams: AP0 & AP1 -> STA of room 0... use STA in room 1 (index1) from AP0 and AP2
    A(dm, () => { beam(aps[0][0], aps[0][1] - 50, aps[1][2], aps[1][3] - 30, P.ap, 44, .5); beam(aps[2][0], aps[2][1] - 50, aps[1][2], aps[1][3] - 30, P.yellow, 44, .5); spark(aps[1][2], aps[1][3] - 62, 16, P.hero, 8); });
    aps.forEach(a => { const k = a[4];
      cube({ x: a[0], y: a[1], s: 40, c: col[k], label: 'AP', hat: 'ant', id: k + 2, mood: sr > .5 ? 'smile' : 'talk', lookAt: [a[2], a[3] - 30], hr: dm > .5 && (k === 0 || k === 2) ? [aps[1][2] > a[0] ? a[0] + 36 : a[0] - 36, a[1] - 40] : null });
      cube({ x: a[2], y: a[3], s: 34, c: P.sta, id: k + 9, mood: sr > .5 ? 'smile' : 'sad', lookAt: [a[0], a[1] - 40] });
      A(1 - sr, () => Tx('!?', a[2] + 26, a[3] - 50 + Math.sin(NOW * 6 + k) * 3, 16, P.red));
    });
    // PON fibre
    R(x0 + 14, y0 + rh * 2 + 5, 60, 22, '#2b2d42', 4); Tx('OLT', x0 + 44, y0 + rh * 2 + 17, 11, '#7CFFC8');
    A(pon, () => { L([x0 + 74, y0 + rh * 2 + 16, x0 + rw * 3 - 10, y0 + rh * 2 + 16], '#7CFFC8', 3); aps.forEach(a => { const x = a[0] - 30; L([x, y0 + rh * 2 + 16, x, a[1] - 4], '#7CFFC8', 2.5); const p = per(t, 1.2, a[4] * .2); C(x, lerp(y0 + rh * 2 + 16, a[1] - 4, p), 4, '#fff', '#2bbf8a', 2); }); for (let i = 0; i < 4; i++) { const p = per(t, 2, i * .5); C(lerp(x0 + 74, x0 + rw * 3 - 10, p), y0 + rh * 2 + 16, 4, '#fff', '#2bbf8a', 2); } });
    const bt = [876 + Math.sin(NOW * 3) * 26, 250 + Math.cos(NOW * 6) * 16];
    const h = hero({ x: 850, y: 345, s: 70, lookAt: [500, 200], hr: bt, hl: [800 + Math.sin(NOW * 3 + 1) * 10, 285] }); L([bt[0], bt[1], bt[0] + 16, bt[1] - 22], P.ink, 2.5);
    bubble(850, h.top - 6, ['Тише, тише…', 'Вместе — раз!', 'Свет по оптике'][t < 9 ? 0 : t < 13.5 ? 1 : 2], Math.max(win(t, 4.8, 8.4), win(t, 9.4, 12.6), win(t, 13.8, 17)));
    A(win(t, .6, 4.2), () => label('все слышат всех: коллизии', 400, y0 + rh + 4, '#fff', P.red, 13));
  }
});

S('analytical', {
  dur: 16, thumb: 11.6,
  cap: [[0, 'Сеть можно описать формулами: цепи Маркова, очереди, вероятности'], [5, 'Модель за секунды предсказывает то, что симулятор считает часами'], [9.5, 'Проверка: точки имитационного моделирования ложатся на кривую'], [13, 'Теперь можно быстро найти оптимальные параметры сети']],
  draw(t) {
    room('#F6F2EA', '#E3D8C6'); R(50, 30, 690, 270, '#8B6B4A', 8); R(60, 40, 670, 250, '#2F5D50', 4); R(60, 290, 670, 8, '#6F5237');
    const ch = '#F4F1E8';
    // markov chain
    const sx = i => 120 + i * 85, sy = 100, dr = seg(t, .3, 3.5);
    for (let i = 0; i < 4; i++) A(seg(dr, i * .2, i * .2 + .25), () => { C(sx(i), sy, 20, null, ch, 2.5); Tx('' + i, sx(i), sy + 1, 15, ch); if (i < 3) { Arc(sx(i) + 42, sy + 6, 30, -2.3, -.84, ch, 2); Arc(sx(i) + 42, sy - 6, 30, .84, 2.3, ch, 2); } });
    const hopI = Math.floor(t * 1.1), cur = [0, 1, 2, 1, 2, 3, 2, 1][hopI % 8], nxt = [0, 1, 2, 1, 2, 3, 2, 1][(hopI + 1) % 8], hp = sm(clamp((t * 1.1 % 1) * 1.6));
    const tk = arcp(hp, sx(cur), sy - 26, sx(nxt), sy - 26, 26); A(seg(t, 2.5, 3.2), () => cube({ x: tk[0], y: tk[1], s: 22, c: P.yellow, id: 4, shadow: false, squash: Math.sin(hp * PI) * .15 }));
    Tx('p', 162, 62, 13, ch); Tx('1−p', 162, 140, 13, ch);
    // queue
    A(seg(t, 2, 3), () => { R(300, 190, 70, 56, null, 4, ch, 2.5); Tx('μ', 335, 218, 20, ch); L([110, 246, 300, 246], ch, 2); Tx('λ →', 92, 218, 14, ch); const sv = per(t, 1.5); for (let i = 0; i < 4; i++) pkt(276 - i * 34 + (i === 0 ? sv * 0 : 0) - (1 - sv) * 0 + sv * 34 - 34, 228, [P.ap, P.pink, P.sta, P.yellow][(i + Math.floor(t / 1.5)) % 4], 22); A(1 - sv, () => pkt(335 + sv * 70, 228 - sv * 20, '#fff', 16)); });
    // chart
    const cx = 450, cy = 250, cw = 240, chh = 170, cv = seg(t, 5, 9), f = k => cy - chh * (.15 + .78 * (1 - Math.exp(-k * 7)) * (1 - .45 * k));
    L([cx, cy - chh, cx, cy, cx + cw, cy], ch, 2.5); Tx('пропускная способность', cx + 80, cy - chh - 12, 12, ch); Tx('число станций', cx + cw - 50, cy + 16, 12, ch);
    ctx.beginPath(); for (let i = 0; i <= 80 * cv; i++) { const k = i / 80; i ? ctx.lineTo(cx + k * cw, f(k)) : ctx.moveTo(cx, f(0)); } ctx.strokeStyle = P.yellow; ctx.lineWidth = 3.5; ctx.stroke();
    for (let i = 0; i < 9; i++) { const k = .06 + i * .11, a = seg(t, 9.6 + i * .3, 9.9 + i * .3); A(a, () => { const dy = (1 - a) * -40 + (rnd(i) - .5) * 6; C(cx + k * cw, f(k) + dy, 5.5, null, '#fff', 2.5); }); }
    A(seg(t, 12.4, 13), () => { Tx('✓ сошлось', cx + 150, cy - 40, 17, '#9BE8B0'); });
    const opt = seg(t, 13.2, 14.2); A(opt, () => { L([cx + .22 * cw, cy, cx + .22 * cw, f(.22)], '#fff', 2, [5, 5]); Tx('оптимум', cx + .22 * cw, cy - chh * .5, 12, '#fff'); });
    // teacher & students
    const tip = cv > 0 && cv < 1 ? [cx + cv * cw, f(cv)] : t < 3.5 ? [sx(Math.min(3, Math.floor(dr * 5))) + 10, sy + 20] : null;
    const hxk = [[0, 780], [4.6, 780], [5.4, 800], [16, 800]], hx = kf(t, hxk);
    const h = hero({ x: hx, y: 345, s: 72, hat: 'grad', lookAt: tip || [300, 380], hl: tip ? [Math.max(tip[0], 716), clamp(tip[1], 180, 300)] : wave(742, 250, 3, 5), mood: t > 12.4 ? 'smile' : 'talk' });
    if (tip) R(h.hl[0] - 12, h.hl[1] - 3, 14, 6, '#fff', 2);
    cube({ x: 180, y: 392, s: 44, c: P.sta, id: 6, lookAt: tip || [hx, 280], hr: [200, 366] }); R(190, 360, 26, 18, '#fff', 2, '#bbb', 1);
    cube({ x: 330, y: 396, s: 40, c: P.pink, id: 8, lookAt: tip || [hx, 280], hl: t > 12.4 ? wave(300, 330) : null });
    cube({ x: 470, y: 394, s: 42, c: P.ap, id: 11, lookAt: tip || [hx, 280] });
    bubble(hx, h.top - 6, 'Считаем, а не гадаем', win(t, 5.4, 8.6)); bubble(330, 350, 'Ого, совпало!', win(t, 12.6, 15.2));
  }
});

S('mimo', {
  dur: 16, thumb: 10,
  cap: [[0, 'Одна антенна — один поток: станции ждут своей очереди'], [5, 'Несколько антенн складывают волны в направленные лучи (beamforming)'], [8.5, 'MU-MIMO: каждой станции — свой пространственный поток, одновременно'], [12.5, 'Больше антенн — больше скорость в том же канале']],
  draw(t) {
    room('#F6F3EE', '#E6DDCF'); windowp(430, 40, 120, 90); plant(900, 345, 1.4);
    R(40, 250, 150, 10, P.wood, 3); R(60, 260, 8, 85, P.wood2); R(162, 260, 8, 85, P.wood2);
    const mu = seg(t, 5, 6.5), tg = [[560, 150, P.pink, 'STA 1'], [700, 345, P.sta, 'STA 2'], [840, 230, P.yellow, 'STA 3']], ax = 115, ay = 170;
    R(500, 190, 130, 10, P.wood, 3); R(800, 270, 100, 10, P.wood, 3); L([520, 200, 520, 345], P.wood2, 5); L([880, 280, 880, 345], P.wood2, 5);
    const cur = Math.floor(t / 1.6) % 3;
    A(1 - mu, () => { waves(ax, ay, { c: P.ap, max: 520, n: 4, sp: 110, a0: -.7, a1: .9, al: .5 }); });
    tg.forEach((g, i) => { const gy = i === 1 ? g[1] - 50 : g[1] + 10;
      A(mu, () => { beam(ax + 20, ay - 30, g[0], gy - 20, g[2], 56, .5); for (let k = 0; k < 3; k++) { const p = per(t, 1.3, k * .43 + i * .2); env(lerp(ax + 20, g[0], p), lerp(ay - 30, gy - 20, p), .8, 0, g[2]); } });
      A((1 - mu) * (cur === i ? 1 : 0), () => { const p = per(t, 1.6); env(lerp(ax + 20, g[0], p), lerp(ay - 30, gy - 20, p), .8, 0, '#7CC0F0'); });
    });
    tg.forEach((g, i) => { const y = i === 0 ? 190 : i === 2 ? 270 : 345, served = mu > .5 || cur === i;
      const c = cube({ x: g[0], y, s: 60, c: g[2], label: g[3], id: i + 3, mood: served ? 'smile' : 'flat', lookAt: [ax, ay], hr: served && mu > .5 ? wave(g[0] + 44, y - 80) : null });
      A((1 - mu) * (served ? 0 : 1), () => { C(g[0] + 44, c.top, 12, '#fff', P.steel, 2); L([g[0] + 44, c.top, g[0] + 44, c.top - 7], P.ink, 2); L([g[0] + 44, c.top, g[0] + 44 + Math.cos(NOW * 3) * 6, c.top + Math.sin(NOW * 3) * 6], P.ink, 2); });
      A(seg(t, 12.5, 13.2), () => label('поток ' + (i + 1), g[0], c.top - 16, '#fff', P.navy));
    });
    // AP with antenna array
    const n = 4; for (let i = 0; i < n; i++) { const x = ax - 30 + i * 20, on = mu > .5 || i === 0; L([x, 190, x, 190 - 44 - (on ? Math.sin(NOW * 6 - i * 1.1 * mu) * 6 : 0)], P.ink, 3.5); C(x, 190 - 46 - (on ? Math.sin(NOW * 6 - i * 1.1 * mu) * 6 : 0), 5, on ? P.red : '#aaa'); }
    const ap = cube({ x: ax, y: 250, s: 72, c: P.ap, label: 'AP', id: 2, lookAt: mu > .5 ? [700, 240] : [tg[cur][0], tg[cur][1]], hr: mu > .5 ? [170, 200 + Math.sin(NOW * 4) * 14] : [168, 210], hl: mu > .5 ? [60, 200 - Math.sin(NOW * 4) * 14] : null });
    bubble(ax, 132, mu > .5 ? 'Всем сразу!' : 'По одному…', Math.max(win(t, 1, 4.4), win(t, 6.4, 9.4)));
    A(seg(t, 12.5, 13.2), () => { R(330, 330, 200, 60, '#fff', 12, '#cfd3da'); Tx('×3 в том же канале', 430, 360, 16); });
  }
});

S('v2x', {
  dur: 18, thumb: 6.6,
  cap: [[0, 'Перекрёсток с плохим обзором: водители не видят друг друга'], [3.5, 'Машины 10 раз в секунду сообщают: «я здесь, еду туда-то»'], [7, 'Предупреждение пришло раньше, чем машину стало видно'], [12, 'Wi-Fi и сотовые сети вместе делают дороги безопаснее']],
  draw(t) {
    R(0, 0, W, H, '#CFE8C0'); R(0, 160, W, 90, '#9aa0ad'); R(440, 0, 100, H, '#9aa0ad'); L([0, 205, 430, 205], '#fff', 3, [20, 16]); L([550, 205, W, 205], '#fff', 3, [20, 16]); L([490, 0, 490, 150], '#fff', 3, [20, 16]); L([490, 260, 490, H], '#fff', 3, [20, 16]);
    for (let i = 0; i < 5; i++) R(446 + i * 19, 258, 10, 30, '#fff', 2);
    // blocks
    R(60, 270, 360, 150, '#C9CFDB', 10); R(80, 290, 320, 130, '#DDE2EA', 6); Tx('ТЦ «Квадрат»', 240, 345, 20, P.steel);
    R(40, 20, 150, 120, '#E3D9CF', 10); R(240, 30, 170, 110, '#D6DCE8', 10); R(570, 20, 180, 120, '#E3D9CF', 10); R(800, 30, 140, 110, '#D6DCE8', 10); R(570, 270, 370, 150, '#BFE0AE', 14);
    for (let i = 0; i < 5; i++) { const x = 610 + i * 70, y = 310 + (i % 2) * 50; R(x - 16, y - 16, 32, 32, '#8CCB8A', 9); }
    const ax = 515, ay = kf(t, [[1, 470], [5.2, 340], [6.4, 300], [9.6, 300], [11.5, 120], [14, -60]]);
    const bx = kf(t, [[1.5, -80], [8.2, 480], [12, 1040]]), by = 228;
    const msg = seg(t, 3.5, 4.2) * (1 - seg(t, 10, 11));
    A(win(t, 1.2, 6.4), () => { L([ax, ay - 20, bx + 20, by], P.red, 2, [6, 8]); label('не видно', (ax + bx) / 2 + 10, (ay + by) / 2 + 26, '#fff', P.red); });
    A(msg, () => { waves(ax, ay, { c: P.ap, max: 150, sp: 70, n: 3 }); waves(bx, by, { c: P.hero, max: 150, sp: 70, n: 3 }); });
    // RSU
    L([552, 150, 552, 122], P.steel, 4); R(540, 100, 24, 24, P.violet, 4, 'rgba(0,0,0,.3)', 1); C(547, 110, 2, P.ink); C(557, 110, 2, P.ink); A(msg, () => waves(552, 100, { c: P.violet, max: 60, sp: 30, n: 2 }));
    const topcar = (x, y, c, rot, mood) => at(x, y, rot, 1, () => { El(4, 4, 44, 26, 'rgba(0,0,0,.12)'); R(-40, -23, 80, 46, c, 12, 'rgba(0,0,0,.3)', 1.2); R(-6, -18, 30, 36, '#DDF1FA', 7); for (const i of [-1, 1]) { El(10, i * 8, 3.4, 5, P.ink); C(11, i * 8 - 1.5, 1.3, '#fff'); R(34, i * 14 - 4, 6, 8, '#FFE082', 2); } if (mood) El(19, 0, 2.5, 4, P.ink); });
    topcar(bx, by, P.hero, 0, false);
    topcar(ax, ay, P.ap, -PI / 2, t > 5 && t < 9.6);
    const brake = win(t, 5, 9.6, .3); A(brake, () => { R(ax - 20, ay + 40, 8, 5, P.red, 2); R(ax + 12, ay + 40, 8, 5, P.red, 2); });
    A(win(t, 5, 8.4), () => { at(ax + 62, ay - 6, 0, 1 + Math.sin(NOW * 10) * .06, () => { Poly([0, -20, 20, 14, -20, 14], P.yellow, P.ink, 2); Tx('!', 0, 3, 18); }); });
    bubble(bx, by - 26, 'Я здесь, 40 км/ч →', win(t, 3.6, 6.6), 13); bubble(ax, ay - 44, 'Спасибо, жду!', win(t, 6.6, 9.4), 13);
    // pedestrian on zebra
    const px = kf(t, [[11.5, 400], [15.5, 590]]); cube({ x: px, y: 288, s: 30, c: P.sta, id: 5, walk: spd(t, [[11.5, 400], [15.5, 590]], 50), look: [1, 0] });
    A(seg(t, 12.4, 13) , () => label('0 аварий', 240, 300, '#fff', P.green, 14));
  }
});

S('mesh', {
  dur: 16, thumb: 4,
  cap: [[0, 'Интернет есть только в одном доме на краю деревни'], [2.5, 'Узлы mesh-сети передают кадры по цепочке, как эстафету'], [7, 'Узел отключился? Сеть сама находит обходной маршрут'], [12, 'Покрытие растёт без единого нового кабеля']],
  draw(t) {
    outdoor('#E8F3FB', '#CFE8C0', 360); sun(80, 60); cloud(300 + t * 3, 50); cloud(720 + t * 2, 90, .7);
    Poly([0, 360, 0, 250, 180, 200, 400, 270, 620, 180, 820, 240, 960, 210, 960, 360], '#BFE0AE'); Poly([300, 360, 480, 120, 660, 360], '#B5D8C4'); Poly([440, 170, 480, 120, 520, 170, 500, 160, 480, 175, 462, 160], '#fff');
    const nd = [[90, 250], [270, 228], [450, 337], [640, 200], [840, 250], [480, 130]], col = [P.ap, P.sta, P.yellow, P.pink, P.teal, P.violet];
    house(40, 250, 100, 60, '#F3D9B1', '#C96A50'); house(225, 290, 90, 62, '#EBD9C6', '#7d8597'); house(405, 345, 90, 64, '#F3E3B1', '#D97757'); house(595, 262, 90, 62, '#EBD9C6', '#C96A50'); house(795, 312, 90, 62, '#F3D9B1', '#7d8597');
    tree(170, 300, .7); tree(730, 300, .8); tree(560, 345, .6);
    L([0, 235, 40, 235], '#7CFFC8', 4); label('оптика', 30, 262, '#12202e', '#7CFFC8', 10);
    const dead = seg(t, 6.6, 7.4), re = seg(t, 8.2, 9.2);
    const link = (a, b, al, c = P.navy) => A(al, () => L([nd[a][0], nd[a][1] - 46, nd[b][0], nd[b][1] - 46], c, 2.5, [7, 7]));
    link(0, 1, 1); link(3, 4, 1); link(1, 2, 1 - dead); link(2, 3, 1 - dead); link(1, 5, re, P.violet); link(5, 3, re, P.violet);
    const r1 = [0, 1, 2, 3, 4], r2 = [0, 1, 5, 3, 4];
    const run = (rt, ts, te) => { const k = (t - ts) / (te - ts) * 4; if (k <= 0 || k >= 4) return -1; const i = Math.floor(k), p = sm(k - i), q = arcp(p, nd[rt[i]][0], nd[rt[i]][1] - 50, nd[rt[i + 1]][0], nd[rt[i + 1]][1] - 50, 36); env(q[0], q[1], 1.1, Math.sin(p * PI) * .5); return k; };
    const k1 = run(r1, 2, 6.2), k2 = Math.max(run(r2, 9.4, 13), run(r2, 12.2, 15.6));
    nd.forEach((n, i) => { const off = i === 2 && dead > .5, y = n[1] - (i === 5 ? 0 : [60, 62, 64, 62, 62][i]);
      const kk = k1 >= 0 ? r1.indexOf(i) - k1 : k2 >= 0 ? r2.indexOf(i) - k2 : 9, near = Math.abs(kk + .5) < .6 || Math.abs(kk - .4) < .5;
      if (i === 5) { L([n[0], n[1] + 10, n[0], n[1] + 40], P.steel, 4); }
      const c = cube({ x: n[0], y: i === 5 ? n[1] + 10 : y, s: 40, c: off ? '#bbb' : col[i], id: i + 2, hat: 'ant', shadow: false, mood: off ? 'sleep' : near ? 'wow' : 'smile', hr: near && !off ? [n[0] + 34, y - 44] : null, hl: near && !off ? [n[0] - 34, y - 44] : null });
      if (off) { zzz(n[0] + 16, c.top - 4); batt(n[0] - 17, c.top - 26, .08); } else waves(n[0], c.top - 12, { c: col[i], max: 30, sp: 14, n: 2, al: .7 });
    });
    A(win(t, 6.8, 9.2), () => bolt(450, 150, 1.2));
    const kid = cube({ x: 900, y: 345, s: 48, c: P.hero, id: 1, mood: (k1 > 3.6 || t > 6 && t < 7) || t > 12.6 ? 'smile' : 'flat', lookAt: [925, 320], hr: [925, 310], hl: [898, 314] }); R(896, 290, 34, 24, '#2b2d42', 3); R(899, 293, 28, 18, t > 6 && t < 7.2 || t > 12.8 ? '#7FD1C7' : '#667', 2);
    bubble(900, kid.top - 6, 'Мультики!', win(t, 12.8, 15.4)); bubble(480, 82, 'Я подхвачу!', win(t, 8.2, 10.6));
  }
});

S('halow', {
  dur: 16, thumb: 10.5,
  cap: [[0, 'Обычный Wi-Fi на 5 ГГц: быстро, но за забором сигнал заканчивается'], [5, 'Wi-Fi HaLow (802.11ah) работает ниже 1 ГГц — длинные волны огибают препятствия'], [9, 'Дальность — до километра, тысячи датчиков на одной точке доступа'], [12.5, 'Датчики спят и просыпаются по расписанию: батарейка живёт годами']],
  draw(t) {
    outdoor('#EAF5FD', '#D9EBB8', 330); sun(880, 55); cloud(200 + t * 4, 45, .9); cloud(600 + t * 2.5, 70, .6);
    for (let i = 0; i < 7; i++) L([250 + i * 100, 345, 330 + i * 100, 420], '#C5DD9F', 10);
    const hl = seg(t, 5, 6.2), bump = x => 150 - 55 * Math.exp(-Math.pow((x - 395) / 80, 2));
    // ruler
    L([110, 400, 900, 400], P.ink, 2); [['0', 110], ['250 м', 307], ['500 м', 505], ['750 м', 702], ['1 км', 900]].forEach(m => { L([m[1], 394, m[1], 406], P.ink, 2); Tx(m[0], m[1], 413, 11, P.ink); });
    house(50, 330, 120, 86, '#F3D9B1', '#C96A50'); for (let i = 0; i < 7; i++) { R(188 + i * 14, 300, 8, 32, P.wood, 2); } L([185, 312, 280, 312], P.wood2, 3);
    R(340, 230, 110, 100, '#C96A50', 4); Poly([332, 230, 395, 180, 458, 230], '#8B4A3A'); R(375, 270, 40, 60, '#F3E3D3', 3); L([375, 270, 415, 330], '#C96A50', 3); L([415, 270, 375, 330], '#C96A50', 3);
    tree(560, 330, 1); tree(600, 335, .8, '#7BBF7A');
    A(1 - hl, () => { sine(130, 320, 150, x => 16 * clamp(1 - (x - 130) / 170), .5, 14, P.orange, 3); label('5 ГГц', 200, 110, '#fff', P.orange); cross(322, 150, 7); });
    A(hl, () => { sine(130, 905, bump, x => 20 * (1 - (x - 130) / 2400), .075, 4, P.violet, 4); label('HaLow · < 1 ГГц', 240, 82, '#fff', P.violet); });
    waves(110, 222, { c: hl > .5 ? P.violet : P.orange, max: 40, sp: 18, n: 2 });
    cube({ x: 110, y: 262, s: 40, c: P.ap, label: 'AP', hat: 'ant', id: 2, shadow: false, lookAt: [600, 200] });
    const sens = [[300, P.yellow, '28 % влаги', 9], [690, '#fff', 'Пасусь тут', 10.6], [850, P.teal, 'Полив: вкл', 12.2]];
    sens.forEach((s, i) => { const a = win(t, s[3], s[3] + 2.4, .3) * hl, y = 330;
      if (i === 0) { L([s[0], y, s[0], y - 70], P.wood2, 5); L([s[0] - 30, y - 50, s[0] + 30, y - 50], P.wood2, 4); const c = cube({ x: s[0], y: y - 44, s: 38, c: s[1], hat: 'straw', id: 5, legs: false, shadow: false, mood: a > .5 ? 'smile' : 'sleep' }); bubble(s[0], c.top - 10, s[2], a, 13); }
      else if (i === 1) { const c = cube({ x: s[0], y, s: 60, c: '#fff', id: 6, mood: 'talk', look: [-1, .3] }); R(s[0] - 28, c.top + 4, 16, 12, '#333', 4); R(s[0] + 12, c.top + 36, 14, 14, '#333', 5); L([s[0] - 24, c.top, s[0] - 30, c.top - 9], '#bbb', 4); L([s[0] + 24, c.top, s[0] + 30, c.top - 9], '#bbb', 4); R(s[0] - 9, y - 24, 18, 10, a > .5 ? P.violet : P.pink, 3); bubble(s[0], c.top - 12, s[2], a, 13); }
      else { const c = cube({ x: s[0], y, s: 44, c: s[1], id: 7, mood: a > .5 || t > 12.6 ? 'smile' : 'sleep', hr: t > 12.6 ? [s[0] + 34, y - 30] : null }); if (t < s[3]) zzz(s[0] + 16, c.top - 6); bubble(s[0], c.top - 6, s[2], a, 13); L([s[0] + 34, y - 4, s[0] + 70, y - 4, s[0] + 70, y - 40], P.steel, 5);
        A(seg(t, 12.8, 13.4), () => { for (let k = 0; k < 10; k++) { const p = per(t, 1, k * .1), dir = k % 2 ? 1 : -1, q = arcp(p, s[0] + 70, y - 42, s[0] + 70 + dir * (30 + k * 3), y, 50); C(q[0], q[1], 2.5, P.ap); } }); }
      const k = seg(t, s[3] + .4, s[3] + 2); if (k > 0 && k < 1 && hl > .5) { const x = lerp(s[0], 130, k); pkt(x, bump(x) - 4, P.violet, 11); }
    });
    const h = hero({ x: 215, y: 392, s: 54, hat: 'straw', lookAt: [240, 350], hl: [200, 362], hr: [236, 362] }); R(196, 336, 44, 30, '#2b2d42', 4); R(200, 340, 36, 22, '#fff', 2);
    sens.forEach((s, i) => A(seg(t, s[3] + 2, s[3] + 2.3) * hl, () => { R(203, 343 + i * 6, 6, 4, i === 1 ? P.pink : s[1], 1); R(212, 344 + i * 6, 20, 2.5, '#cfd3da', 1); }));
    bubble(215, h.top - 6, 'Не добивает…', win(t, 1.6, 4.6)); bubble(215, h.top - 6, 'Всё поле на связи!', win(t, 13, 15.4));
    A(seg(t, 12.6, 13.2), () => { batt(760, 30, .9, 40); Tx('годы', 830, 39, 14, P.ink); });
  }
});

S('vr', {
  dur: 16, thumb: 3,
  cap: [[0, 'VR — это 90 кадров в секунду, и каждый должен успеть примерно за 10 мс'], [4.5, 'Опоздал кадр — картинка дёрнулась, и вас укачало'], [8.5, 'Мы строим модели VR-трафика: когда и какими пачками идут кадры'], [12, 'Зная модель, сеть заранее резервирует время — мир снова плавный']],
  draw(t) {
    room('#F3F0F8', '#DDD6EA'); R(30, 150, 110, 195, '#C9B8E0', 10); plant(60, 345, 1.2);
    const lag = win(t, 4.5, 8.2, .5), model = seg(t, 8.5, 9.3), fixed = seg(t, 12, 12.6);
    // virtual world cloud
    for (const c of [[270, 185, 8], [248, 160, 12]]) C(c[0], c[1], c[2], '#fff', '#b9b2cc', 2);
    R(60, 20, 330, 120, '#fff', 40, '#b9b2cc', 2.5);
    clipR(72, 28, 306, 104, () => { ctx.save(); if (lag > .5) ctx.filter = 'grayscale(1)'; const tt = lag > .5 ? 4.5 : NOW; R(72, 28, 306, 104, '#CDEBFF', 30); R(72, 108, 306, 30, '#BFE0AE'); const dx = 250 + Math.sin(tt * 1.3) * 60, dy = 70 + Math.cos(tt * 2) * 14;
      const fl = Math.sin(tt * 10) * 10; Poly([dx - 14, dy, dx - 44, dy - 18 - fl, dx - 30, dy + 6], '#6BBF6B'); Poly([dx + 14, dy, dx + 44, dy - 18 - fl, dx + 30, dy + 6], '#6BBF6B'); R(dx - 17, dy - 17, 34, 34, '#8CCB8A', 5, 'rgba(0,0,0,.3)', 1); C(dx - 6, dy - 4, 2.6, P.ink); C(dx + 6, dy - 4, 2.6, P.ink); Poly([dx - 6, dy - 17, dx, dy - 27, dx + 6, dy - 17], P.yellow);
      R(120, 88, 26, 26, P.sta, 4); L([146, 96, 172 + Math.sin(tt * 6) * 8, 74 - Math.cos(tt * 6) * 10], '#aaa', 4); R(300, 96, 40, 20, '#B08968', 3); ctx.restore(); });
    A(lag, () => label('лаг', 225, 80, '#fff', P.red, 16));
    const sw = lag > .5 ? .3 : 1, wob = lag * Math.sin(NOW * 3) * .18;
    const u = cube({ x: 240, y: 345, s: 80, c: P.sta, id: 3, hat: 'vr', tilt: wob, mood: lag > .5 ? 'wow' : 'smile', hr: [300 + Math.sin(NOW * 6 * sw) * 22, 250 - Math.cos(NOW * 6 * sw) * 26], hl: [182 + Math.sin(NOW * 4 * sw + 1) * 12, 270 + Math.cos(NOW * 4 * sw) * 14] });
    for (const hnd of [u.hl, u.hr]) R(hnd[0] - 5, hnd[1] - 14, 10, 20, '#2b2d42', 4);
    A(lag, () => { for (let i = 0; i < 3; i++) at(240 + Math.cos(NOW * 3 + i * 2.1) * 40, u.top - 14 + Math.sin(NOW * 3 + i * 2.1) * 8, 0, 1, () => Tx('✦', 0, 0, 16, P.yellow)); });
    // AP & frame bursts
    R(770, 170, 150, 9, P.wood, 3); const ap = cube({ x: 845, y: 170, s: 56, c: P.ap, label: 'AP', hat: 'ant', id: 2, lookAt: [300, 280], hl: [808, 150 + Math.sin(NOW * 6) * 4] });
    const laneY = 215; R(330, laneY - 20, 440, 40, 'rgba(90,169,230,.12)', 20);
    for (let b = 0; b < 3; b++) { const p = per(t, 2.4, b * .8), late = lag > .5; const x = lerp(770, 330, late ? Math.min(p, .42 + p * .1) : p);
      A(Math.min(1, p * 8, (1 - p) * 8), () => { for (let i = 0; i < 4; i++) pkt(x + i * 17, laneY, P.ap, 14); Arc(x + 25, laneY - 22, 8, -PI / 2, -PI / 2 + TAU * (1 - p), late ? P.red : P.green, 3); }); }
    A(lag, () => { R(455, laneY - 26, 110, 52, '#9aa0ad', 10, 'rgba(0,0,0,.25)', 1); Tx('обновление', 510, laneY - 6, 12, '#fff'); Tx('2 ГБ', 510, laneY + 10, 12, '#fff'); });
    A(fixed, () => { for (let i = 0; i < 4; i++) R(350 + i * 105, laneY - 30, 60, 6, P.green, 3); label('слоты зарезервированы', 550, laneY - 46, '#fff', P.green); });
    // hero models traffic
    const hx = kf(t, [[8, 1020], [9.4, 660]]), h = hero({ x: hx, y: 345, s: 62, walk: spd(t, [[8, 1020], [9.4, 660]]), lookAt: [560, 300], hl: [hx - 40, 290] }); C(hx - 40, 282, 13, '#fff', P.ink, 2.5); L([hx - 40, 282, hx - 40 + Math.cos(NOW * 5) * 8, 282 + Math.sin(NOW * 5) * 8], P.red, 2);
    A(model, () => { R(430, 270, 190, 110, '#fff', 10, '#cfd3da'); axes(448, 362, 156, 70, P.steel); for (let i = 0; i < 6; i++) { const a = seg(t, 9.4 + i * .3, 9.7 + i * .3); R(456 + i * 25, 362 - (50 + rnd(i) * 14) * a, 12, (50 + rnd(i) * 14) * a, P.ap, 2); } Tx('кадр каждые 11 мс', 525, 284, 11, P.steel); });
    bubble(240, u.top - 30, 'Ой, укачало…', win(t, 5, 8)); bubble(hx, h.top - 6, 'Засекаю!', win(t, 9.4, 11.6));
  }
});

S('lowpower', {
  dur: 16, thumb: 5.6,
  cap: [[0, 'Основное радио Wi-Fi прожорливо — пока данных нет, станция спит'], [2.5, 'На страже остаётся Wake-Up Radio: потребляет в сотни раз меньше'], [4.5, 'Точка доступа шлёт будильник — узкополосный сигнал WUR (802.11ba)'], [8.5, 'Станция просыпается, забирает кадры и снова засыпает']],
  draw(t) {
    const awake = seg(t, 6.6, 7.4) * (1 - seg(t, 12.6, 13.6));
    room('#2A3058', '#3A3F6B'); A(awake * .28, () => R(254, 0, W, 345, '#FFE9B8'));
    windowp(380, 50, 150, 120, true); moon(430, 95, 20); clipR(384, 54, 142, 112, () => stars(14, 3, 170, '#fff'));
    R(0, 0, 250, 345, 'rgba(0,0,0,.18)'); R(246, 0, 8, 345, '#1b2040'); Tx('гостиная', 120, 30, 13, '#9aa3d0'); Tx('спальня', 600, 30, 13, '#9aa3d0');
    R(60, 250, 130, 9, P.wood, 3);
    const call = win(t, 4.5, 7, .3), data = win(t, 8.2, 10.6, .3);
    A(call, () => { for (let i = 0; i < 4; i++) { const p = per(NOW, 1.5, i * .37); A(Math.sin(p * PI), () => Arc(140, 205, 30 + p * 560, -.12, .12, P.wur, 3)); } label('WUR · 4 МГц', 330, 205, '#fff', P.violet); });
    A(data, () => { waves(140, 205, { c: P.ap, max: 620, n: 5, sp: 150, a0: -.5, a1: .55, w: 4, al: .7 }); label('основной канал · 20 МГц', 400, 250, '#fff', P.ap); });
    const ap = cube({ x: 125, y: 250, s: 64, c: P.ap, label: 'AP', hat: 'ant', id: 2, lookAt: [700, 250], hr: call > .3 || data > .3 ? [176, 200] : null });
    const ek = seg(t, 8.6, 10.2); if (ek > 0 && ek < 1) { const q = arcp(ek, 180, 200, 730, 220, 70); env(q[0], q[1], 1.3, ek * TAU); }
    // bed
    R(590, 285, 330, 60, '#6E5A8A', 8); R(880, 215, 40, 130, '#5B4975', 8); R(835, 262, 60, 28, '#fff', 12);
    const sta = cube({ x: 770, y: 300, s: 84, c: P.sta, label: 'STA', id: 3, legs: false, shadow: false, hat: awake > .5 ? null : 'night', mood: awake > .5 ? 'smile' : 'sleep', lookAt: [600, 250], hl: awake > .5 && ek >= 1 ? [722, 228] : null, hr: awake > .5 && ek >= 1 && t < 12 ? wave(824, 190) : null });
    R(596, 275, 240, 70, '#9C86BD', 12); R(596, 275, 240, 16, '#B7A4D3', 8);
    if (awake < .5) zzz(820, sta.top - 6); if (awake > .5 && ek >= 1) env(722, 222, 1.2, -.2);
    // nightstand + WUR
    R(505, 270, 80, 75, '#8B6B4A', 5); R(513, 300, 64, 6, '#6F5237', 3); R(558, 240, 8, 30, '#ccc'); Poly([548, 240, 576, 240, 570, 218, 554, 218], awake > .5 ? '#FFE082' : '#77709a');
    const poke = win(t, 5.8, 7.2, .3);
    const w = cube({ x: 525 + poke * 14, y: 270, s: 46, c: P.wur, label: 'WUR', hat: 'ears', perk: call, id: 4, shadow: false, mood: poke > .4 ? 'talk' : 'smile', lookAt: poke > .3 ? [720, 250] : [140, 210], hr: poke > .3 ? [640 + Math.sin(NOW * 12) * 10, 268] : null });
    bubble(525, w.top - 6, 'Подъём! Тебе письмо', win(t, 5.8, 8), 14); bubble(770, sta.top - 30, 'Спасибо… хр-р', win(t, 11, 13.4), 14);
    // power meters
    R(620, 362, 300, 46, 'rgba(255,255,255,.92)', 10); Tx('радио STA', 634, 376, 11, P.steel, 'left'); R(700, 371, 200, 9, '#e4e6ec', 4); R(700, 371, 200 * lerp(.02, .9, awake), 9, P.red, 4);
    Tx('WUR', 634, 395, 11, P.steel, 'left'); R(700, 390, 200, 9, '#e4e6ec', 4); R(700, 390, 5, 9, P.violet, 4); Tx('< 1 мВт', 742, 395, 10, P.violet);
  }
});

S('standard', {
  dur: 16, thumb: 9.6,
  cap: [[0, 'Wi-Fi рождается в комитете IEEE 802.11, где встречаются инженеры со всего мира'], [3, 'Мы приносим туда идеи, подкреплённые моделями и экспериментами'], [7.5, 'Предложение обсуждают и голосуют: нужно 75 % «за»'], [11.5, 'Принятое решение попадает в стандарт — и в миллиарды устройств']],
  draw(t) {
    room('#F5F1EA', '#D9CDBB'); R(0, 0, W, 16, '#E6DDCF');
    screen(60, 40, 270, 170, '#fff'); Tx('IEEE 802.11bn', 195, 68, 15, P.navy); Tx('doc.: 11-26/0042r1', 195, 88, 10, P.steel);
    const sl = seg(t, 3, 4); A(sl, () => { axes(100, 185, 130, 70, P.steel); for (let i = 0; i < 4; i++) { R(112 + i * 30, 185 - 18 - i * 12, 9, 18 + i * 12, '#cfd3da', 2); R(123 + i * 30, 185 - 30 - i * 16, 9, 30 + i * 16, P.hero, 2); } Tx('+38 %', 280, 140, 16, P.hero); });
    const vote = seg(t, 8, 8.8) * (1 - seg(t, 11.2, 11.8)), pass = seg(t, 9.2, 11), ask = win(t, 4.6, 6.6, .3);
    const ptr = [250 + Math.sin(NOW * 2) * 20, 150 + Math.cos(NOW * 2.6) * 14];
    const h = hero({ x: 390, y: 300, s: 70, lookAt: ask > .3 ? [640, 250] : ptr, hl: t < 7.5 ? [345, 200] : null, mood: t < 7.5 ? 'talk' : 'smile', hr: t > 11.6 ? wave(440, 205) : null }); if (t < 7.5) L([345, 200, ptr[0], ptr[1]], P.wood2, 3);
    // table & delegates
    const dl = [[520, P.sta, 'A'], [610, P.ap, 'B'], [700, P.pink, 'C'], [790, P.yellow, 'D'], [880, P.teal, 'E']];
    dl.forEach((d, i) => { const yes = vote > .5 && i !== 3, q = ask > .3 && i === 2;
      const c = cube({ x: d[0], y: 318, s: 62, c: d[1], id: i + 3, legs: false, shadow: false, mood: q ? 'talk' : yes ? 'smile' : 'flat', lookAt: [390, 240], tilt: Math.sin(NOW * 2 + i) * .03, hr: yes ? [d[0] + 30, 205 - vote * 6 + Math.sin(NOW * 5 + i) * 3] : q ? [d[0] + 30, 215] : null });
      if (yes) R(c.hr[0] - 10, c.hr[1] - 26, 20, 26, P.green, 3, 'rgba(0,0,0,.25)', 1); if (vote > .5 && i === 3) { }
    });
    R(470, 300, 460, 22, P.wood, 8); R(480, 322, 440, 60, P.wood2, 4);
    dl.forEach((d, i) => { R(d[0] - 22, 286, 44, 16, '#fff', 3, '#bbb', 1); Tx('Co. ' + d[2], d[0], 295, 10, P.ink); });
    bubble(700, 228, 'А совместимость?', ask, 14); bubble(390, h.top - 6, 'Проверили на стенде!', win(t, 5.6, 7.6), 14);
    A(seg(t, 8.6, 9.2) * (1 - seg(t, 13.5, 14)), () => { R(560, 40, 280, 70, '#fff', 12, '#cfd3da'); Tx('Голосование', 700, 58, 13, P.steel); R(580, 74, 240, 16, '#e4e6ec', 8); R(580, 74, 240 * lerp(0, .8, pass), 16, P.green, 8); L([760, 68, 760, 96], P.ink, 2, [3, 3]); Tx('75 %', 760, 102, 10, P.ink); Tx(Math.round(pass * 80) + ' %', 596, 82, 11, '#fff', 'left'); });
    // stamp + book
    const st = seg(t, 11.5, 11.9), fly = seg(t, 12.6, 14);
    R(40, 280, 150, 65, P.wood2, 5); R(60, 240, 110, 42, '#2F5D50', 4); R(60, 274, 110, 8, '#F4F1E8'); Tx('IEEE 802.11', 115, 258, 13, '#F4F1E8');
    A(st * (1 - seg(t, 13.9, 14.2)), () => { const q = arcp(fly, 250, 250, 115, 236, 110); at(q[0], q[1], lerp(-.1, 0, fly), lerp(1, .5, fly), () => { R(-40, -52, 80, 104, '#fff', 4, '#bbb', 1.5); for (let i = 0; i < 5; i++) L([-28, -36 + i * 14, 28 - (i % 2) * 14, -36 + i * 14], '#cfd3da', 3); at(0, 10, -.25, 2.2 - st * 1.2, () => { R(-36, -13, 72, 26, null, 4, P.red, 3); Tx('APPROVED', 0, 1, 12, P.red); }); }); });
    A(seg(t, 14, 14.5), () => { spark(115, 232, 22, P.yellow, 8); label('теперь это Wi-Fi', 115, 208, '#fff', P.navy); });
  }
});

S('lowlat', {
  dur: 16, thumb: 10,
  cap: [[0, 'В игре, звонке или управлении роботом важна каждая миллисекунда'], [2.5, 'В обычном Wi-Fi срочный кадр ждёт, пока закончится длинная передача'], [7.5, 'Решения: вытеснение (preemption), выделенные окна, умный доступ к каналу'], [11, 'Срочные данные едут без очереди — задержка меньше миллисекунды']],
  draw(t) {
    room('#EEF3F8', '#D8DEE8'); const ph2 = t > 7.4, tt = ph2 ? t - 7.4 : t, laneY = 215, crash = !ph2 && t > 4.4, win2 = ph2 && t > 11;
    R(180, laneY - 44, 540, 88, '#fff', 16, '#cfd3da'); Tx('эфир', 204, laneY - 30, 11, P.steel, 'left');
    const up = ph2 ? seg(t, 8.8, 9.4) : 0;
    A(ph2 ? seg(t, 7.4, 7.8) : 1 - seg(t, 7, 7.4), () => {
      const bx = i => 250 + i * 150 + tt * 22;
      for (let i = 0; i < 3; i++) { const x = bx(i); clipR(182, 60, 536, 300, () => { R(x, laneY - 22 - up * 34, 130, 44, [P.gray, '#aab4c8', '#c4b8d6'][i], 8, 'rgba(0,0,0,.25)', 1); Tx(['4K-видео', 'обновление', 'бэкап'][i], x + 65, laneY - up * 34, 13, '#fff'); if (up > .5) Tx('⏸', x + 118, laneY - 12 - up * 34, 10, '#fff'); }); }
      const born = ph2 ? 8.6 : 1.5, a = seg(t, born, born + .3);
      const ux = ph2 ? lerp(200, 700, seg(t, 9.4, 10.3)) : Math.min(200 + Math.max(0, t - born) * 220, bx(0) - 26);
      A(a * (ph2 ? 1 - seg(t, 10.3, 10.6) : 1), () => { pkt(ux, laneY, P.red, 26, '!', 6); R(ux - 5, laneY - 21, 10, 8, Math.sin(NOW * 16) > 0 ? P.ap : '#fff', 3, P.ink, 1); if (ph2 && t > 9.4) for (let i = 1; i < 4; i++) L([ux - 20 - i * 12, laneY - 8 + i * 4, ux - 34 - i * 12, laneY - 8 + i * 4], P.red, 2); });
      const ms = ph2 ? (t > 10.3 ? '0,8 мс' : '…') : Math.round(clamp(t - born, 0, 9) * 9) + ' мс';
      A(a, () => { R(400, 98, 140, 46, '#2b2d42', 10); Tx(ms, 470, 122, 20, !ph2 && t > 3.4 ? '#FF8A8A' : '#7CFFC8'); Tx('задержка', 470, 86, 11, P.steel); });
    });
    A(up, () => label('пауза: пропускаем срочный', 450, laneY + 62, '#fff', P.navy));
    const ap = cube({ x: 95, y: 290, s: 76, c: P.ap, label: 'AP', hat: 'ant', id: 2, lookAt: [300, 215], hr: [150, 218 + Math.sin(NOW * 4) * 3], mood: ph2 ? 'smile' : 'flat' });
    // gamer
    screen(750, 110, 170, 110, crash ? '#5a3a44' : '#22324a'); R(828, 220, 14, 20, '#2b2d42'); R(800, 238, 70, 6, '#2b2d42', 3);
    clipR(756, 116, 158, 98, () => { for (let i = 0; i < 5; i++) { const p = per(crash ? 4.4 : NOW, 1, i * .2); L([835 - 6 - p * 50, 120 + p * 94, 835 - 8 - p * 56, 132 + p * 94], '#fff', 2); L([835 + 6 + p * 50, 120 + p * 94, 835 + 8 + p * 56, 132 + p * 94], '#fff', 2); } const cx = crash ? 800 : 835 + Math.sin(NOW * 2) * 22; at(cx, 190, crash ? .5 : 0, 1, () => { R(-14, -9, 28, 18, P.hero, 5); R(-8, -14, 16, 8, '#DDF1FA', 3); }); if (crash) { spark(790, 180, 20, P.yellow, 8); Tx('ЛАГ', 835, 140, 20, '#FF8A8A'); } if (win2) Tx('1 место!', 835, 136, 16, P.yellow); });
    R(770, 300, 130, 45, '#7FA8D8', 14);
    const g = cube({ x: 835, y: 318, s: 70, c: P.sta, id: 3, legs: false, mood: crash ? 'sad' : win2 ? 'smile' : 'flat', lookAt: [835, 160], hl: win2 ? wave(790, 215) : [812 + Math.sin(NOW * 9) * 3, 292], hr: win2 ? [880, 215] : [858 - Math.sin(NOW * 9) * 3, 292] });
    if (!win2) R(806, 284, 58, 18, '#2b2d42', 8); else { R(868, 180, 24, 26, P.yellow, 5, '#B8860B', 1.5); R(876, 206, 8, 8, P.yellow); R(870, 213, 20, 5, '#B8860B', 2); }
    bubble(835, g.top - 4, 'Опять лагает!', win(t, 4.6, 7)); bubble(95, ap.top - 30, 'Срочное — вперёд!', win(t, 8.6, 11));
  }
});

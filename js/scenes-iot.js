'use strict';
/* ===== IoT / Testbeds / AI topic scenes ===== */

S('nbfi', {
  dur: 16, thumb: 8,
  cap: [[0, 'Счётчики воды и света сидят в подвалах и передают по несколько байт в день'], [3.5, 'NB-Fi: вся энергия сигнала сжата в сверхузкую полосу — «иглу»'], [7.5, 'Игла пробивает стены и летит на километры; тысячи устройств не мешают друг другу'], [12, 'Моделируем и оптимизируем: сколько счётчиков выдержит одна станция?']],
  draw(t) {
    outdoor('#DCE6F5', '#B9C2D0'); A(.5, () => stars(18, 2, 120, '#fff')); moon(60, 60, 18);
    bldg(30, 345, 200, 210, '#C7D0E0', '#fff', 2); bldg(250, 345, 160, 150, '#E3D9CF', '#fff', 6); bldg(430, 345, 150, 250, '#D6DCE8', '#fff', 4);
    R(30, 345, 550, 75, '#8f96a3'); for (let i = 0; i < 3; i++) R([40, 258, 438][i], 352, [182, 146, 136][i], 60, '#E9E4DA', 5);
    const bx = 505, by = 62; tower(bx, 95, 34);
    const nb = seg(t, 3.5, 4.5), mt = [[80, P.ap, '💧'], [175, P.yellow, '⚡'], [300, P.sta, '🔥'], [370, P.ap, '💧'], [500, P.yellow, '⚡']];
    // wide signal dies in wall
    A(win(t, .8, 3.6), () => { waves(80, 380, { c: P.orange, max: 46, sp: 26, n: 3 }); cross(110, 340, 7); label('широкий сигнал вязнет в стене', 180, 330, '#fff', P.orange, 11); });
    mt.forEach((m, i) => { const act = nb > .5 && per(t, 4, i * .8) < .22, y = 408;
      if (act) { L([m[0], y - 46, bx, by], P.violet, 2); C(lerp(m[0], bx, per(t, .88, i * .8) % 1), lerp(y - 46, by, per(t, .88, i * .8) % 1), 4, '#fff', P.violet, 2); }
      const c = cube({ x: m[0], y, s: 38, c: m[1], id: i + 3, mood: act ? 'wow' : 'sleep', shadow: false }); C(m[0], y - 16, 8, '#fff', P.ink, 1.5); L([m[0], y - 16, m[0] + Math.cos(NOW + i) * 6, y - 16 + Math.sin(NOW + i) * 6], P.red, 1.5);
      if (!act) zzz(m[0] + 14, c.top - 2); });
    // spectrum screen
    screen(640, 30, 290, 170, '#12202e'); Tx('спектр', 668, 50, 11, '#7CFFC8', 'left'); L([660, 180, 912, 180], '#7CFFC8', 1.5);
    A(1 - nb, () => { R(690, 150, 190, 30, 'rgba(245,158,66,.75)', 4); Tx('Wi-Fi: широко и низко', 785, 135, 11, P.orange); });
    A(nb, () => { for (let i = 0; i < 26; i++) { const p = per(t, 2.4 + rnd(i) * 2, rnd(i * 3) * 4), a = p < .2 ? Math.sin(p / .2 * PI) : 0; if (a > 0) L([668 + rnd(i * 7 + 1) * 236, 180, 668 + rnd(i * 7 + 1) * 236, 180 - 110 * a], i < 5 ? '#fff' : '#C9A7DC', 2); } Tx('NB-Fi: узко и высоко', 785, 62, 11, '#C9A7DC'); });
    // squeeze demo
    const sqz = seg(t, 3.8, 6); A(win(t, 3.6, 7.6), () => { R(250, 40, 260, 120, '#fff', 12, '#cfd3da'); const w = lerp(180, 8, sqz), h = lerp(16, 86, sqz); R(380 - w / 2, 146 - h, w, h, sqz > .6 ? P.violet : P.orange, 3); Tx(sqz > .6 ? 'та же энергия — в иглу' : 'сжимаем полосу…', 380, 54, 12, P.ink); });
    const h = hero({ x: 720, y: 345, s: 66, lookAt: [785, 120], hr: [770 + Math.sin(NOW * 2) * 10, 220], mood: t > 7.5 ? 'smile' : 'talk' });
    cube({ x: 850, y: 345, s: 52, c: P.sta, id: 9, lookAt: [785, 120], hat: 'hard' });
    bubble(720, h.top - 6, 'Слышу всех!', win(t, 8, 11));
    A(seg(t, 12, 12.8), () => { R(620, 232, 320, 44, '#fff', 12, '#cfd3da'); Tx('1 станция ↔ ' + Math.round(lerp(1, 50, seg(t, 12.5, 15))) + ' 000 счётчиков', 780, 255, 15); });
    A(seg(t, 7.5, 8.2), () => label('до 10 км', 300, 200, '#fff', P.violet, 13));
  }
});

S('urllc', {
  dur: 16, thumb: 7.6,
  cap: [[0, 'URLLC — режим 5G для задач, где ошибка недопустима'], [3.5, 'Команда должна дойти за 1 мс с надёжностью 99,999 %'], [7, 'Страховка: копии по разным путям, надёжные коды, мгновенные повторы'], [11.5, 'Наши алгоритмы дают нужную надёжность и при этом берегут ресурсы сети']],
  draw(t) {
    room('#F2F5F9', '#DCE1E9'); R(470, 0, 12, 345, '#C9CFDB'); Tx('пульт', 60, 30, 13, P.steel, 'left'); Tx('цех за 100 км', 500, 30, 13, P.steel, 'left');
    const T2 = 2.5, cyc = per(t, T2), n = Math.floor(t / T2), storm = n === 3 || n === 4, dropX = 720;
    // two towers / paths
    tower(400, 345, 150); tower(560, 345, 190);
    const send = clamp((cyc - .15) / .4);
    [[400, 185, P.ap], [560, 148, P.violet]].forEach((tw, i) => { const hit = storm && i === 0;
      const pts = [[215, 250], [tw[0], tw[1]], [dropX, 150]]; L([pts[0][0], pts[0][1], pts[1][0], pts[1][1], pts[2][0], pts[2][1]], tw[2], 1.5, [5, 7]);
      if (send > 0 && send < 1) { const k = send * 2, a = pts[Math.floor(k)], b = pts[Math.min(2, Math.floor(k) + 1)], p = k % 1, x = lerp(a[0], b[0], p), y = lerp(a[1], b[1], p);
        if (hit && send > .5) A(1 - (send - .5) * 2.4, () => { pkt(x, y + (send - .5) * 80, '#aaa', 15); cross(x, y + (send - .5) * 80, 9); }); else pkt(x, y, tw[2], 15); } });
    A(storm ? 1 : 0, () => { cloud(370, 70, 1.3, '#8f96a3'); if (per(t, .6) < .5) bolt(408, 130, 1.3); });
    // operator
    desk(60, 262, 180, 345); const pr = cyc > .08 && cyc < .2;
    const h = hero({ x: 150, y: 345, s: 70, lookAt: [215, 250], hr: [205, 250 + (pr ? 6 : 0)], hl: [110, 256] }); R(196, 252, 20, 10, '#2b2d42', 3); L([206, 252, 206 + (pr ? 6 : 0), 232], P.ink, 4); C(206 + (pr ? 6 : 0), 230, 6, P.red);
    screen(70, 190, 70, 56, '#22324a'); R(80, 225, 20, 10, P.pink, 3); C(110, 212, 4, P.red);
    // conveyor with cakes
    R(520, 300, 420, 14, '#5d6577', 7); for (let i = 0; i < 9; i++) at(540 + i * 48, 307, NOW * 3, 1, () => { C(0, 0, 6, '#8c93a1'); L([-4, 0, 4, 0], '#5d6577', 2); });
    for (let i = -1; i < 3; i++) { const x = dropX + (cyc - .7 - i) * 160, done = x > dropX; if (x < 520 || x > 950) continue;
      R(x - 26, 276, 52, 24, '#F7D9C4', 5, 'rgba(0,0,0,.2)', 1); R(x - 26, 270, 52, 10, '#fff', 5); R(x - 30, 298, 60, 4, '#bbb', 2); if (done) C(x, 264, 7, P.red, '#a11', 1); }
    // robot dropper
    R(dropX - 40, 100, 80, 46, '#F59E42', 8); C(dropX - 18, 118, 4, P.ink); C(dropX + 18, 118, 4, P.ink); Arc(dropX, 122, 8, .15 * PI, .85 * PI, P.ink, 2.5); L([dropX, 40, dropX, 100], P.steel, 6);
    const arm = kf(cyc, [[0, 0], [.5, 0], [.62, 40], [.74, 0], [1, 0]]); L([dropX, 146, dropX, 176 + arm], '#E08A2E', 8); L([dropX - 10, 190 + arm, dropX - 10, 176 + arm, dropX + 10, 176 + arm, dropX + 10, 190 + arm], '#5d6577', 4);
    if (cyc < .62) C(dropX, 190 + arm, 7, P.red, '#a11', 1); else if (cyc < .7) C(dropX, lerp(230, 264, (cyc - .62) / .08), 7, P.red, '#a11', 1);
    A(win(cyc, .7, .95, .08), () => check(dropX + 40, 250, 9));
    // scoreboard
    A(seg(t, 3.5, 4.2), () => { R(770, 40, 170, 86, '#2b2d42', 12); Tx('надёжность', 855, 58, 11, '#9aa3d0'); Tx('99,999 %', 855, 78, 18, '#7CFFC8'); Tx('задержка 1 мс', 855, 106, 13, '#fff'); });
    const ch = cube({ x: 880, y: 345, s: 54, c: P.sta, hat: 'chef', id: 4, lookAt: [dropX, 270], hl: cyc > .7 ? wave(846, 280) : null });
    bubble(150, h.top - 6, storm ? 'Копия дошла!' : 'Вишенку — точно в центр', Math.max(win(t, .8, 3.4), win(t, 8.2, 11.2)));
    A(seg(t, 11.5, 12.2), () => label('та же надёжность — меньше ресурсов', 300, 392, '#fff', P.navy, 13));
  }
});

S('lorawan', {
  dur: 16, thumb: 6,
  cap: [[0, 'LoRa передаёт данные «свистом» — сигналом с плавно меняющейся частотой (chirp)'], [4, 'Долгий свист (SF12) слышно за 10+ км, быстрый (SF7) экономит время и батарею'], [8.5, 'Свисты с разной скоростью не мешают друг другу — шлюз слышит всех сразу'], [12.5, 'Моделируем сеть и подбираем настройки, чтобы пакеты не сталкивались']],
  draw(t) {
    outdoor('#E6F2FB', '#CFE8C0', 350); sun(70, 50, 20); cloud(420 + t * 3, 40, .8);
    Poly([0, 350, 0, 210, 90, 120, 200, 240, 300, 350], '#B5D8C4'); Poly([60, 150, 90, 120, 122, 156, 104, 148, 90, 160, 76, 148], '#fff');
    Poly([540, 350, 700, 190, 760, 190, 960, 350], '#BFE0AE'); R(300, 325, 160, 25, '#9CCBEA', 12); L([310, 336, 450, 336], '#fff', 2, [10, 14]);
    house(520, 350, 70, 50, '#F3D9B1', '#C96A50'); tree(470, 350, .7); tree(900, 350, .8); tree(240, 350, .6);
    const gx = 730, gy = 190;
    const chirp = (x, y, sf, c, a) => A(a, () => { R(x - 36, y - 24, 72, 44, '#12202e', 6); const pw = sf === 12 ? 44 : sf === 9 ? 24 : 12, off = (NOW * (sf === 12 ? 14 : sf === 9 ? 26 : 50)) % pw; clipR(x - 32, y - 20, 64, 36, () => { for (let k = -1; k < 8; k++) L([x - 32 + k * pw - off, y + 16, x - 32 + (k + 1) * pw - off, y - 20], c, 2.5); }); Tx('SF' + sf, x, y + 30, 11, P.ink); });
    const nd = [[110, 160, 12, P.violet, 'Лёд тает!', 4.2, 3.2], [380, 320, 9, P.ap, 'Уровень реки: 2 м', 2.2, 1.8], [600, 350, 7, P.sta, '+18 °C', 1, 0.9]];
    const all = t > 8.5;
    nd.forEach((n, i) => { const pp = all ? n[6] + 1.2 : 4.2, p = per(t, pp, all ? i * .5 : i * 1.4), on = p < n[6] / pp, k = clamp(p / (n[6] / pp));
      const c = cube({ x: n[0], y: n[1], s: i === 0 ? 40 : 48, c: n[3], id: i + 3, mood: on ? 'talk' : 'flat', lookAt: [gx, gy], hr: on ? [n[0] + 30, n[1] - 62] : null });
      if (on) { const x = lerp(n[0], gx, k), y = lerp(n[1] - 50, gy - 60, k) - Math.sin(k * PI) * 30; for (let j = 0; j < 3; j++) at(x - j * 13 * (gx > n[0] ? 1 : -1), y + j * 3, 0, 1, () => L([-5, 6, 5, -6], n[3], 3.5)); Tx('♪', n[0] + 34, c.top - 6 - k * 8, 16, n[3]); }
      chirp(n[0] + (i === 0 ? 86 : 0), n[1] - (i === 0 ? 60 : i === 1 ? 112 : 116), n[2], n[3], 1);
      bubble(n[0], c.top - (i === 0 ? 4 : 62), n[4], win(t, 1 + i * 1.6, 3.4 + i * 1.6) * (t < 8 ? 1 : 0), 13);
    });
    tower(gx, gy, 46);
    const g = cube({ x: gx + 52, y: gy, s: 54, c: P.yellow, label: 'GW', hat: 'ears', perk: .6 + .4 * Math.sin(NOW * 3), id: 8, lookAt: [300, 250], hl: [gx + 14, gy - 50] });
    cloud(840, 60, 1.1); Tx('сервер', 874, 66, 11, P.steel); L([gx + 70, gy - 70, 850, 84], P.steel, 2, [4, 6]); const up = per(t, 1.4); pkt(lerp(gx + 70, 850, up), lerp(gy - 70, 84, up), P.yellow, 9);
    bubble(gx + 52, g.top - 14, 'Слышу всех троих!', win(t, 8.8, 12), 14);
    A(seg(t, 4, 4.8) * (1 - seg(t, 8, 8.5)), () => { L([110, 392, 730, 392], P.ink, 2); Tx('12 км', 110, 405, 11); Tx('5 км', 380, 405, 11); Tx('1 км', 600, 405, 11); Tx('шлюз', 730, 405, 11); });
    const hx = 860, hd = seg(t, 12.5, 13.2); const h = hero({ x: hx, y: 350, s: 58, lookAt: [800, 300], hl: [hx - 34, 300], hr: hd > .5 ? [hx - 60 + Math.sin(NOW * 3) * 14, 262] : null });
    A(hd, () => { R(740, 232, 96, 80, '#fff', 8, '#cfd3da'); [7, 9, 12].forEach((s, i) => { Tx('SF' + s, 752, 250 + i * 22, 10, P.steel, 'left'); R(782, 246 + i * 22, 44, 6, '#e4e6ec', 3); C(782 + 44 * (.5 + .4 * Math.sin(NOW * 1.5 + i * 2)), 249 + i * 22, 5, [P.sta, P.ap, P.violet][i]); }); });
  }
});

S('traffic', {
  dur: 18, thumb: 7,
  cap: [[0, 'Почти весь трафик зашифрован — заглянуть внутрь пакета нельзя (и не нужно!)'], [4.5, 'Но у каждого приложения свой «почерк»: размеры пакетов и паузы между ними'], [9, 'Нейросеть узнаёт приложение по почерку, не вскрывая содержимое'], [13.5, 'Видео получает скорость, звонок — низкую задержку, а приватность не страдает']],
  draw(t) {
    room('#F4F2EC', '#DDD6C8'); R(0, 24, W, 10, '#E6DDCF');
    const ty = ['Видео', 'Звонок', 'Игра'], tc = [P.pink, P.sta, P.ap], sx = 400;
    // bins
    ty.forEach((s, i) => { const x = 690 + i * 95; R(x - 38, 290, 76, 55, tc[i], 8, 'rgba(0,0,0,.25)', 1.2); R(x - 42, 284, 84, 10, '#fff', 4, 'rgba(0,0,0,.25)', 1); Tx(s, x, 322, 13, '#fff'); });
    // belt
    R(30, 285, 600, 14, '#5d6577', 7); for (let i = 0; i < 13; i++) at(52 + i * 47, 292, NOW * 3, 1, () => { C(0, 0, 6, '#8c93a1'); L([-4, 0, 4, 0], '#5d6577', 2); }); R(60, 299, 8, 46, P.steel); R(590, 299, 8, 46, P.steel);
    // scanner arch
    R(sx - 70, 150, 16, 135, '#3a3f55', 4); R(sx + 54, 150, 16, 135, '#3a3f55', 4); R(sx - 80, 120, 160, 40, '#3a3f55', 8);
    let scanK = -1, scanI = 0;
    for (let i = 0; i < 3; i++) { const p = per(t, 9, i * 3), k = Math.floor(t / 9 + (i === 0 ? 0 : 0)) , type = i;
      const x = kf(p, [[0, 20], [.4, sx], [.52, sx], [.74, 630], [1, 630]]), fl = clamp((p - .74) / .2), q = arcp(fl, 630, 262, 690 + type * 95, 285, 90);
      if (p > .36 && p < .56) { scanK = (p - .36) / .2; scanI = type; }
      A(Math.min(1, p * 12, (1 - p) * 6 + (p > .93 ? 0 : 1)), () => { const X = fl > 0 ? q[0] : x, Y = fl > 0 ? q[1] : 262; env(X, Y, 1.7, fl * 3, p > .5 ? tc[type] : '#cfd3da'); lock(X, Y + 4, 1.2); if (p > .5 && fl <= 0) label(ty[type], X, Y - 30, '#fff', tc[type], 11); });
    }
    // scanner screen: traffic fingerprint (never the content)
    screen(sx - 110, 30, 220, 96, '#12202e');
    if (scanK >= 0) { A(win(scanK, 0, 1, .15), () => { const pat = scanI === 0 ? i => 40 + 6 * rnd(i) : scanI === 1 ? i => 12 : i => (rnd(i * 3) > .6 ? 22 : 0); const gap = scanI === 1 ? 10 : 12;
        for (let i = 0; i < 16; i++) { const hh = pat(i + Math.floor(NOW * 3)); R(sx - 96 + i * gap, 112 - hh, 7, hh, tc[scanI], 2); } Tx('размер × время', sx - 96, 44, 10, '#7CFFC8', 'left'); if (scanK > .5) Tx('→ ' + ty[scanI], sx + 96, 44, 12, '#fff', 'right'); L([sx - 60 + scanK * 120, 160, sx - 60 + scanK * 120, 284], 'rgba(124,255,200,.8)', 3); }); }
    else Tx('жду пакет…', sx, 78, 12, '#5d7a8a');
    lock(sx + 88, 44, 1.2);
    // detective & hero
    const dt = cube({ x: sx + 130, y: 345, s: 66, c: P.yellow, hat: 'det', id: 4, lookAt: [sx, 262], hl: [sx + 82, 250 + Math.sin(NOW * 2) * 4], mood: scanK > .5 ? 'smile' : 'flat' });
    C(dt.hl[0] - 10, dt.hl[1] - 14, 13, 'rgba(190,230,255,.5)', P.ink, 3); L([dt.hl[0] - 2, dt.hl[1] - 5, dt.hl[0], dt.hl[1]], P.ink, 4);
    const h = hero({ x: 110, y: 345, s: 62, lookAt: [200, 262], hr: [150, 268], hl: [72, 290] });
    R(40, 300, 60, 45, P.wood, 5); for (let i = 0; i < 3; i++) env(56 + i * 14, 296 - i * 3, 1.1, .2 * i - .2, '#cfd3da');
    bubble(sx + 130, dt.top - 6, ['Ровный толстый поток…', 'Мелко и часто…', 'Редкие всплески…'][scanI], scanK >= 0 && t > 4.5 ? win(scanK, 0, 1, .2) : 0, 13);
    bubble(110, h.top - 6, 'Замок не трогаем!', win(t, 1, 4.2), 14);
    A(seg(t, 13.5, 14.2), () => { label('→ высокая скорость', 690, 258, '#fff', tc[0], 10); label('→ малая задержка', 785, 236, '#fff', tc[1], 10); label('→ приоритет', 880, 258, '#fff', tc[2], 10); });
  }
});

S('risproto', {
  dur: 16, thumb: 12.5,
  cap: [[0, 'Собираем RIS своими руками: плата из сотен переключаемых элементов'], [5, 'Контроллер задаёт каждому элементу состояние — 0 или 1'], [7.5, 'Безэховая камера: измеряем, куда на самом деле уходит отражённый луч'], [11, 'Меняем узор — луч поворачивается к приёмнику: +20 дБ к сигналу']],
  draw(t) {
    R(0, 0, W, H, '#DCE6F2'); R(0, 345, W, 75, '#C3CFDF');
    for (let i = 0; i < 20; i++) Poly([i * 48, 0, i * 48 + 24, 34, i * 48 + 48, 0], '#5A7FB5'); for (let i = 0; i < 8; i++) { Poly([0, 40 + i * 40, 30, 60 + i * 40, 0, 80 + i * 40], '#5A7FB5'); Poly([W, 40 + i * 40, W - 30, 60 + i * 40, W, 80 + i * 40], '#5A7FB5'); }
    const built = t / 4.6, ctl = seg(t, 5, 6), on = seg(t, 7.5, 8.2), steer = seg(t, 11, 12.6), px = 400, py = 90, cs = 26;
    // Tx horn
    L([150, 345, 170, 250, 190, 345], P.steel, 4); R(140, 232, 60, 28, '#7d8597', 5); Poly([200, 236, 240, 216, 240, 276, 200, 256], '#9aa0ad', P.steel, 1.5); Tx('Tx', 170, 247, 12, '#fff');
    // Rx horn + absorber
    L([800, 345, 820, 290, 840, 345], P.steel, 4); R(790, 272, 60, 28, '#7d8597', 5); Poly([790, 276, 754, 258, 754, 314, 790, 296], '#9aa0ad', P.steel, 1.5); Tx('Rx', 820, 287, 12, '#fff');
    // beams
    const cxp = px + 2 * cs, cyp = py + 2 * cs + 20;
    A(on, () => { beam(240, 246, cxp, cyp, P.ap, 50, .4); const ex = lerp(700, 760, steer), ey = lerp(50, 286, steer); beam(cxp, cyp, ex, ey, steer > .5 ? P.sta : P.orange, 60, .45); for (let i = 0; i < 3; i++) { const p = per(NOW, 1.3, i * .43); p < .5 ? C(lerp(240, cxp, p * 2), lerp(246, cyp, p * 2), 4, '#fff', P.ap, 2) : C(lerp(cxp, ex, p * 2 - 1), lerp(cyp, ey, p * 2 - 1), 4, '#fff', P.sta, 2); } });
    A(on * (1 - steer), () => label('луч ушёл в потолок', 700, 70, '#fff', P.orange));
    // RIS stand + tiles popping in
    L([cxp, py + 4 * cs + 4, cxp, 345], P.steel, 6); L([cxp - 40, 345, cxp + 40, 345], P.steel, 6);
    tiles(px, py, 5, 5, cs, (i, j) => { const k = j * 5 + i; if (k / 25 > built) return null; return steer > .5 ? ((i + j * 2) % 4 < 2 ? 1 : 0) : ctl > .5 ? (i % 2) : 0; }, 3);
    // controller
    A(ctl, () => { R(300, 300, 70, 45, '#2b2d42', 6); C(315, 315, 4, P.green); C(330, 315, 4, Math.sin(NOW * 8) > 0 ? P.yellow : '#555'); Tx('FPGA', 335, 333, 10, '#7CFFC8'); L([370, 316, 400, 300, cxp - 20, py + 4 * cs + 6], P.pink, 4); });
    // hero
    const bi = Math.min(24, Math.floor(built * 25)), hand = t < 4.6 ? [px + (bi % 5) * cs + 12, py + Math.floor(bi / 5) * cs + 14] : null, jump = Math.abs(Math.sin(seg(t, 12.8, 15.2) * PI * 3)) * 20;
    const hxk = [[0, 560], [4.6, 560], [5.6, 300], [7, 300], [8, 590], [16, 590]], hx = kf(t, hxk);
    const h = hero({ x: hx, y: 345 - jump, s: 70, hat: 'goggles', walk: spd(t, hxk), lookAt: hand || (t > 8 ? [760, 280] : [335, 310]), hl: hand, hr: t > 10.4 && t < 11.4 ? [hx + 44, 286] : jump > 2 ? [hx + 46, 220] : null, mood: jump > 2 ? 'wow' : 'smile' });
    if (hand) { L([hand[0], hand[1], hand[0] + 14, hand[1] + 12], P.red, 4); spark(hand[0], hand[1], 8); }
    A(seg(t, 7.6, 8.4), () => { laptop(650, 345, 1.4, steer > .5 ? '#A5DDA5' : '#BFE3F5'); });
    // meter
    R(850, 190, 96, 70, '#fff', 10, '#cfd3da'); Arc(898, 246, 34, PI, TAU, P.steel, 3); const ang = PI + lerp(.25, 2.6, steer) * on + Math.sin(NOW * 9) * .04 * on; L([898, 246, 898 + Math.cos(ang) * 30, 246 + Math.sin(ang) * 30], P.red, 3); Tx(steer > .5 ? '+20 дБ' : 'дБ', 898, 204, 12, steer > .5 ? P.green : P.steel);
    bubble(hx, h.top - 6, t < 5 ? 'Ещё плиточку…' : t < 12 ? 'Меняю узор…' : 'Попали!', Math.max(win(t, 1, 4.2), win(t, 10.2, 11.8), win(t, 12.8, 15.4)));
  }
});

S('datacenter', {
  dur: 16, thumb: 5,
  cap: [[0, 'Большие нейросети учатся сразу на сотнях серверов'], [3, 'После каждого шага серверы обмениваются гигабайтами градиентов'], [6, 'Один опоздавший поток тормозит всех: GPU простаивают'], [10, 'Оптимизируем передачу данных — и обучение идёт быстрее на том же железе']],
  draw(t) {
    room('#1F2440', '#2B3158'); for (let i = 0; i < 10; i++) R(i * 100 + 20, 0, 3, 345, 'rgba(255,255,255,.04)');
    const fix = seg(t, 10, 11), slow = t > 5.5 && fix < .5, rx = [110, 300, 660, 850], col = [P.ap, P.sta, P.pink, P.yellow];
    // switches
    const sw = (x, y, lab) => { R(x - 70, y - 14, 140, 28, '#3a4170', 8, '#7d8ad0', 1.5); for (let i = 0; i < 8; i++) C(x - 52 + i * 15, y, 3, Math.sin(NOW * 6 + i * 2) > 0 ? '#7CFFC8' : '#55608f'); if (lab) Tx(lab, x, y - 24, 10, '#9aa3d0'); };
    const s1 = [480, 80], s2 = [480, 150];
    A(.35 + .65 * fix, () => sw(s2[0], s2[1])); sw(s1[0], s1[1], 'коммутатор');
    // racks & workers
    rx.forEach((x, i) => { R(x - 50, 190, 100, 155, '#12162c', 6, '#55608f', 1.5); for (let j = 0; j < 5; j++) { R(x - 42, 262 + j * 16, 84, 11, '#222a4f', 2); C(x - 34, 267 + j * 16, 2, Math.sin(NOW * 5 + i + j * 2) > 0 ? '#7CFFC8' : P.orange); }
      const via = fix > .5 && i % 2 ? s2 : s1; L([x, 150, via[0] + (i < 2 ? -60 : 60), via[1]], '#55608f', 2);
      const idle = slow && i !== 2, per1 = slow && i === 2 ? 4 : 1.6;
      for (let k = 0; k < (i === 2 && slow ? 1 : 3); k++) { const p = per(t, per1, k * per1 / 3 + i * .2); if (t > 3 && !(idle && p > .2)) pkt(lerp(x, via[0] + (i < 2 ? -60 : 60), p), lerp(150, via[1], p), col[i], 11); }
      const c = cube({ x, y: 190, s: 54, c: col[i], label: 'GPU', id: i + 2, legs: false, shadow: false, mood: idle ? 'sleep' : slow ? 'sad' : 'smile', lookAt: [480, 80], hr: idle ? null : [x + 38, 150 + Math.sin(NOW * 7 + i) * 4] });
      if (idle) zzz(x + 22, c.top - 4); else gear(x - 38, c.top - 4, 8, '#9aa3d0', 2);
      if (slow && i === 2) { label('очередь…', x, 118, '#fff', P.red, 11); } });
    A(slow ? 1 : 0, () => { for (let i = 0; i < 5; i++) pkt(556 + i * 13, 96 + (i % 2) * 6, [P.ap, P.sta, P.yellow][i % 3], 10); });
    // model progress
    const prog = kf(t, [[0, .1], [5.5, .3], [10, .36], [15.5, .98]]);
    R(340, 220, 280, 120, '#12162c', 12, '#55608f', 1.5); Tx('обучение модели', 480, 240, 12, '#9aa3d0'); R(362, 300, 236, 14, '#222a4f', 7); R(362, 300, 236 * prog, 14, slow ? P.orange : '#7CFFC8', 7); Tx(Math.round(prog * 100) + ' %', 480, 326, 12, '#fff');
    for (let i = 0; i < 7; i++) for (let j = 0; j < 2; j++) { const a = clamp(prog * 9 - i - j * .5); A(.25 + .75 * a, () => C(410 + i * 24, 262 + j * 20, 6, j ? P.violet : P.ap)); if (i < 6) A(.2 + .5 * a, () => L([410 + i * 24, 262, 434 + i * 24, 282], '#7d8ad0', 1.2)); }
    // hero traffic controller
    const hxk = [[9, -60], [10.4, 480]], hx = kf(t, hxk), bt = [hx + 44 + Math.sin(NOW * 4) * 16, 150 + Math.cos(NOW * 4) * 12];
    const h = hero({ x: hx, y: 205, s: 50, walk: spd(t, hxk, 200), shadow: false, lookAt: [660, 150], hr: fix > .5 ? bt : null, hl: fix > .5 ? [hx - 44 - Math.sin(NOW * 4) * 16, 160] : null }); if (fix > .5) L([bt[0], bt[1], bt[0] + 12, bt[1] - 18], '#fff', 3);
    bubble(hx, h.top - 4, 'Вам — сюда, а вам — туда!', win(t, 10.4, 13.6), 13); bubble(110, 118, 'Ждём отстающего…', win(t, 6.2, 9.4), 13);
    A(seg(t, 13.6, 14.2), () => label('обучение быстрее на том же железе', 480, 380, '#12162c', '#7CFFC8', 14));
  }
});

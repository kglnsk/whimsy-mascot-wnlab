'use strict';
/* ===== 5G/6G & RIS topic scenes ===== */

S('nru', {
  dur: 16, thumb: 9.6,
  cap: [[0, 'Нелицензируемый спектр 5 ГГц — общий мост: им пользуются и Wi-Fi, и 5G NR-U'], [3, 'Если ехать одновременно — столкновение, данные теряют оба'], [6, 'Правило «слушай, прежде чем говорить» (LBT): занято — подожди случайное время'], [11.5, 'Мы ищем настройки, при которых обе технологии делят эфир честно']],
  draw(t) {
    outdoor('#E8F3FB', '#CFE8C0', 300); sun(860, 60); cloud(160 + t * 3, 60); cloud(600 + t * 2, 40, .7);
    R(230, 300, 500, 120, '#9CCBEA'); for (let i = 0; i < 6; i++) L([260 + i * 80 + Math.sin(NOW + i) * 8, 350 + (i % 2) * 30, 290 + i * 80 + Math.sin(NOW + i) * 8, 350 + (i % 2) * 30], '#fff', 2.5);
    tree(40, 300, .9); tree(930, 300, .8); house(820, 300, 90, 60, '#EBD9C6', '#7d8597'); house(80, 300, 80, 56);
    ctx.beginPath(); ctx.moveTo(240, 420); ctx.quadraticCurveTo(480, 250, 720, 420); ctx.lineTo(735, 420); ctx.lineTo(735, 300); ctx.lineTo(225, 300); ctx.lineTo(225, 420); ctx.closePath(); ctx.fillStyle = '#B8A690'; ctx.fill();
    R(210, 292, 540, 14, P.wood2, 4); for (let i = 0; i < 10; i++) L([236 + i * 54, 292, 236 + i * 54, 266], P.wood, 3); L([222, 266, 738, 266], P.wood, 4);
    const WX = [[0, 60], [1, 150], [3.4, 440], [3.9, 400], [5.6, 130], [6.6, 185], [8, 185], [11, 870], [16, 870]], NX = [[0, 900], [1, 810], [3.4, 520], [3.9, 560], [5.6, 830], [6.6, 785], [11.2, 785], [14.6, 110], [16, 110]];
    const wx = kf(t, WX), nx = kf(t, NX), busy = (wx > 230 && wx < 730) || (nx > 230 && nx < 730), bang = win(t, 3.3, 5, .2), lis = win(t, 6.6, 8, .3);
    L([480, 266, 480, 190], P.steel, 5); R(390, 140, 180, 54, '#2b2d42', 10); Tx('канал 5 ГГц', 480, 157, 12, '#fff'); C(420, 178, 7, busy ? P.red : '#555'); C(540, 178, 7, busy ? '#555' : P.green); Tx(busy ? 'занят' : 'свободен', 480, 179, 12, busy ? '#FF8A8A' : '#7CFFC8');
    const w = cube({ x: wx, y: 292, s: 68, c: P.sta, label: 'Wi-Fi', id: 3, walk: spd(t, WX), tilt: bang * -.25, mood: bang > .3 ? 'wow' : lis > .3 ? 'flat' : 'smile', look: [1, 0], hl: lis > .5 ? [wx - 40, 228] : null, hr: bang > .3 ? null : [wx + 46, 250] });
    if (bang < .3) env(w.hr[0] + 4, w.hr[1] - 12, 1.3, .1);
    const n = cube({ x: nx, y: 292 + (t > 6 && t < 11.3 ? 18 * seg(t, 6, 6.6) * (1 - seg(t, 11, 11.3)) : 0), s: 68, c: P.violet, label: '5G', id: 5, walk: spd(t, NX), tilt: bang * .25, mood: bang > .3 ? 'wow' : lis > .3 || (t > 8 && t < 11) ? 'flat' : 'smile', look: [-1, 0], hr: lis > .5 ? [nx + 40, 232] : null, hl: bang > .3 ? null : [nx - 46, 250] });
    if (bang < .3) pkt(n.hl[0] - 4, n.hl[1] - 12, P.pink, 20, '5G', 4);
    A(bang, () => { spark(480, 240, 46, P.yellow, 10); spark(480, 240, 26, P.red, 7); const k = seg(t, 3.4, 5); for (let i = 0; i < 4; i++) { const q = arcp(k, 480, 240, 380 + i * 70, 330, 110); i % 2 ? env(q[0], q[1], 1, k * 9 + i) : pkt(q[0], q[1], P.pink, 16); } });
    bubble(wx, w.top - 6, 'Свободно? Иду!', win(t, 6.8, 9), 14);
    const cnt = Math.max(0, 3 - Math.floor(t - 8)); A(win(t, 8, 11.2), () => { C(nx + 50, n.top - 4, 20, '#fff', P.ink, 2.5); Tx('' + cnt, nx + 50, n.top - 3, 18); Tx('жду', nx + 50, n.top - 34, 11, P.steel); });
    bubble(nx, n.top - 6, 'Теперь моя очередь', win(t, 11.3, 13.6), 14);
    A(seg(t, 12, 12.8), () => { R(60, 30, 200, 80, '#fff', 12, '#cfd3da'); ctx.beginPath(); ctx.moveTo(110, 70); ctx.arc(110, 70, 28, -PI / 2, PI / 2); ctx.fillStyle = P.sta; ctx.fill(); ctx.beginPath(); ctx.moveTo(110, 70); ctx.arc(110, 70, 28, PI / 2, PI * 1.5); ctx.fillStyle = P.violet; ctx.fill(); Tx('эфир: 50 / 50', 196, 62, 13); Tx('честно!', 196, 82, 13, P.green); });
  }
});

S('ntn', {
  dur: 20, thumb: 13.5,
  cap: [[0, 'Там, где нет вышек — в тайге, в океане, в горах — связь придёт с орбиты'], [3.3, 'Поехали! Низкоорбитальные спутники летят на высоте около 600 км'], [10.5, 'Спутник — это базовая станция 5G, которая несётся со скоростью 7,6 км/с'], [15.5, 'Наши алгоритмы: хэндоверы между спутниками, планирование, поправки на задержку и доплер']],
  draw(t) {
    const cam = kf(t, [[4.6, 0], [9, 620]]), space = seg(t, 5.4, 8.6);
    R(0, 0, W, H, '#CDE8FA'); A(space, () => { R(0, 0, W, H, '#151936'); stars(60, 4, 420); });
    // ---- ground (scrolls away) ----
    if (cam < 600) at(0, cam, 0, 1, () => {
      cloud(520, -260, 1.4); cloud(180, -120, 1.1); cloud(700, 40, 1); cloud(60, 90, .8); sun(860, 70);
      R(0, 345, W, 400, '#CFE8C0'); tree(60, 345, .9); tree(880, 345, 1); tree(820, 345, .7, '#7BBF7A');
      bldg(560, 345, 150, 90, '#D6DCE8', '#DDF1FA', 3); R(590, 232, 90, 24, '#C7D0E0', 4); Tx('ЦУП', 635, 245, 13, P.steel);
      cube({ x: 740, y: 345, s: 40, c: P.sta, id: 5, lookAt: [230, 200 - cam], hr: t > 3 ? wave(772, 290) : null }); cube({ x: 790, y: 345, s: 34, c: P.pink, id: 7, lookAt: [230, 200 - cam], hl: t > 3.6 ? wave(766, 300, 10) : null });
      R(150, 345, 160, 12, '#9aa0ad', 3); L([300, 345, 300, 180], P.steel, 5); for (let i = 0; i < 4; i++) L([300, 330 - i * 40, 268, 330 - i * 40], P.steel, 3);
      const sm1 = win(t, 3.7, 7, .4); A(sm1, () => { for (let i = 0; i < 9; i++) { const p = per(t, 1.2, i * .13), d = i % 2 ? 1 : -1; A(1 - p, () => C(230 + d * p * (60 + i * 12), 340 - p * 16, 12 + p * 22, '#fff')); } });
      const HX = [[.3, -40], [2.5, 185]], hx = kf(t, HX);
      A(1 - seg(t, 2.9, 3.3), () => hero({ x: hx, y: 345, s: 52, hat: 'helmet', walk: spd(t, HX), look: [1, -.3], hl: t > 2.3 ? wave(hx - 40, 280) : null }));
    });
    // ---- Earth limb ----
    const ey = kf(t, [[7.4, 420], [10.6, 0]]), er = 1300, ecx = 480, ecy = 318 + er + ey, rot = (t - 10) * .011;
    if (ey < 400) { C(ecx, ecy, er + 10, 'rgba(140,200,255,.25)'); C(ecx, ecy, er, '#6FB7E3');
      at(ecx, ecy, -rot, 1, () => { Arc(0, 0, er - 16, -PI / 2 - .33, -PI / 2 - .1, '#BFE0AE', 32); Arc(0, 0, er - 16, -PI / 2 + .13, -PI / 2 + .36, '#A9D6A0', 32); Arc(0, 0, er - 16, -PI / 2 + .5, -PI / 2 + .62, '#fff', 32);
        const put = (a, fn) => at(er * Math.sin(a), -er * Math.cos(a), a, 1, fn);
        put(-.2, () => { ctx.beginPath(); ctx.arc(0, 0, 16, PI, 0); ctx.fillStyle = '#F3E3C8'; ctx.fill(); R(-4, -10, 8, 10, P.wood2, 2); cube({ x: 26, y: 0, s: 16, c: P.yellow, id: 11, shadow: false }); });
        put(.03, () => { Poly([-20, -10, 20, -10, 13, 2, -13, 2], '#E06B4C'); L([0, -10, 0, -34], P.ink, 2); Poly([2, -32, 18, -14, 2, -14], '#fff'); cube({ x: -8, y: -10, s: 12, c: P.sta, id: 12, legs: false, shadow: false }); });
        put(.24, () => { house(-16, 0, 32, 20, '#B08968', '#7d8597'); tree(26, 0, .4, '#5FA777'); tree(-30, 0, .5, '#5FA777'); cube({ x: 44, y: 0, s: 14, c: P.pink, id: 13, shadow: false }); });
      });
    }
    // ---- satellites & beam ----
    const sax = kf(t, [[9.4, 1080], [19.6, 300]]), sbx = sax + 440, say = 96 + Math.sin(NOW * 1.2) * 4, act = sax > 455 ? sax : sbx, bm = seg(t, 12, 13);
    A(bm, () => { beam(act, say + 30, act - 30, 322, '#FFF6D0', 230, .2); beam(act, say + 30, act - 30, 322, '#FFF6D0', 100, .22); waves(act, say + 32, { c: P.yellow, max: 60, sp: 30, a0: .25 * PI, a1: .75 * PI }); });
    if (t > 9) { sat(sax, say, 1.15, -.08); sat(sbx, say + 6, 1.15, .06, '#EADFF0'); }
    A(bm, () => { [-.2, .03, .24].forEach(a => { const x = ecx + er * Math.sin(a - rot), y = ecy - er * Math.cos(a - rot), inb = Math.abs(x - (act - 30)) < 120; bars(x - 12, y - 34, inb ? 4 : 1, inb ? P.green : '#9aa0ad', .9); }); });
    A(win(t, 13, 15.4), () => { L([sax - 70, say + 20, sax - 70, 300], '#fff', 1.5, [4, 6]); label('≈ 600 км', sax - 70, 200, '#151936', '#fff', 12); });
    A(win(t, 16, 18.6), () => label('хэндовер → следующий спутник', (sax + sbx) / 2, 56, '#151936', P.yellow, 13));
    // ---- rocket ----
    const shake = win(t, 3.7, 6.5, .4), rx = kf(t, [[0, 230], [9, 230], [11, 150]]) + Math.sin(NOW * 45) * 1.6 * shake, ry = kf(t, [[4.2, 345], [6.4, 250], [9, 250], [11, 275]]), rr = kf(t, [[8.6, 0], [10.8, 1.1]]), thr = win(t, 3.7, 9.6, .5), inside = t > 3.1 && t < 11;
    at(rx, ry, rr, 1, () => {
      A(thr, () => { const f = 40 + Math.sin(NOW * 30) * 10; Poly([-16, 0, 0, f + 30, 16, 0], P.orange); Poly([-9, 0, 0, f, 9, 0], P.yellow); });
      Poly([-26, -40, -48, 6, -26, -6], P.red); Poly([26, -40, 48, 6, 26, -6], P.red);
      R(-26, -150, 52, 150, '#fff', 14, '#9aa0ad', 1.5); ctx.beginPath(); ctx.moveTo(-26, -138); ctx.quadraticCurveTo(0, -215, 26, -138); ctx.closePath(); ctx.fillStyle = P.red; ctx.fill();
      R(-26, -52, 52, 10, P.red); C(0, -100, 18, inside ? P.hero : '#CDE8FA', '#7d8597', 3);
      if (inside) { for (const i of [-1, 1]) { El(i * 6, -103, 2.6, 4.2, P.ink); C(i * 6 + .8, -104.5, 1, '#fff'); } Arc(0, -98, 5, .15 * PI, .85 * PI, P.ink, 1.8); }
      Tx('5G', 0, -30, 13, P.steel);
    });
    bubble(rx + 34, ry - 118, 'Поехали!', win(t, 3.3, 6), 18);
    // ---- EVA ----
    const ev = seg(t, 10.9, 12.2); if (ev > 0) { const wx0 = rx + Math.sin(rr) * 100, wy0 = ry - Math.cos(rr) * 100, hx = lerp(wx0, 420, ev) + Math.sin(NOW * .9) * 6, hy = lerp(wy0, 262, ev) + Math.cos(NOW * 1.1) * 6;
      ctx.beginPath(); ctx.moveTo(wx0, wy0); ctx.quadraticCurveTo((wx0 + hx) / 2, hy + 50, hx - 10, hy - 24); ctx.strokeStyle = '#fff'; ctx.lineWidth = 2.5; ctx.stroke();
      const dx = act - hx, dy = say - hy, d = Math.hypot(dx, dy) || 1; const pt = t > 12.4;
      const h = hero({ x: hx, y: hy, s: 50, hat: 'helmet', shadow: false, tilt: Math.sin(NOW * .8) * .15 - .1, lookAt: [act, say], mood: pt ? 'wow' : 'smile', hr: pt ? [hx + dx / d * 52, hy - 30 + dy / d * 52] : null, hl: [hx - 40, hy - 20 + Math.sin(NOW * 2) * 6] });
      bubble(hx, h.top - 22, 'Вон он — наш gNB!', win(t, 12.5, 15.4), 15); }
  }
});

S('slicing', {
  dur: 16, thumb: 8.6,
  cap: [[0, 'Одна сеть 5G обслуживает очень разных клиентов: видео, игры, датчики'], [4.5, 'Network Slicing: ресурсы режут на «слайсы» — виртуальные сети с гарантиями'], [8.5, 'Слайсы изолированы: всплеск видео не отнимет миллисекунды у игр'], [11.8, 'Наши алгоритмы (DeSlice, xStream) двигают границы слайсов вслед за нагрузкой']],
  draw(t) {
    room('#FBF1E8', '#EAD9C4'); for (let i = 0; i < 12; i++) Poly([i * 80, 0, i * 80 + 40, 26, i * 80 + 80, 0], i % 2 ? '#F28DB2' : '#fff');
    Tx('КОНДИТЕРСКАЯ «5G»', 480, 50, 15, P.steel);
    const cut = seg(t, 4.5, 7.5), cx0 = 250, cw = 500, cy = 120, chh = 70, grow = seg(t, 12, 14.5);
    const b1 = cx0 + cw * lerp(.5, .42, grow), b2 = cx0 + cw * lerp(.8, .64, grow), eat = cx0 + cw * seg(t, 1, 4) * .82 * (1 - cut);
    // table & cake
    R(cx0 - 30, cy + chh, cw + 60, 12, '#fff', 6, '#cfd3da', 1.5); R(470, cy + chh + 12, 20, 60, '#cfd3da');
    R(cx0, cy, cw, chh, '#FFF3DC', 10, 'rgba(0,0,0,.25)', 1.2); R(cx0, cy, cw, 16, '#F7C9D9', 8); for (let i = 0; i < 12; i++) C(cx0 + 22 + i * 41.5, cy - 3, 6, P.red);
    A(1 - cut, () => { R(cx0, cy, Math.max(0, eat - cx0), chh, 'rgba(242,141,178,.55)', 10); Tx('радиоресурсы', 600, cy + 40, 14, P.steel); });
    A(cut, () => { [[cx0, b1, P.pink, 'Видео · 50 Мбит/с'], [b1, b2, P.sta, 'Игры · 5 мс'], [b2, cx0 + cw, P.teal, 'IoT']].forEach((s, i) => { A(seg(cut, i * .3, i * .3 + .3), () => { R(s[0] + 3, cy + 18, s[1] - s[0] - 6, chh - 21, s[2], 6); Tx(s[3], (s[0] + s[1]) / 2, cy + 44, 12, '#fff'); R(s[0] + 1, cy - 14, s[1] - s[0] - 2, chh + 16, null, 14, 'rgba(120,160,200,.8)', 2); }); }); });
    // chef on stool with knife
    const kx = t < 4.5 ? 215 : t < 12 ? lerp(215, lerp(b1, b2, seg(t, 5.8, 6.4)), seg(t, 4.6, 5.2)) : b2, kd = Math.abs(Math.sin(clamp((t - 5) / 2.4) * PI * 2)) * 40 * (t < 7.6 ? 1 : 0);
    const chx = t < 4.5 ? 160 : clamp(kx - 66, 160, 640); R(chx - 40, 300, 80, 45, P.wood, 6); C(chx - 26, 345, 6, '#555'); C(chx + 26, 345, 6, '#555'); const h = hero({ x: chx, y: 300, s: 70, hat: 'chef', lookAt: [kx, cy + 30], hr: [kx + 4, cy - 42 + kd + (t > 12 ? 60 : 0)], hl: [chx - 42, 262] });
    at(kx, cy - 34 + kd + (t > 12 ? 60 : 0), 0, 1, () => { Poly([0, 0, 8, 0, 8, 44, 0, 56], '#DADFE8', P.steel, 1.2); R(-1, -16, 10, 18, P.wood2, 3); });
    // customers
    const grab = t > 8.8 && t < 11, gk = win(t, 9, 10.8, .25), bounce = Math.abs(Math.sin(NOW * 9)) * 10 * gk;
    const v = cube({ x: 370, y: 396, s: 86, c: P.pink, id: 3, mood: cut < .5 && t > 1 ? 'talk' : grab ? 'wow' : 'smile', lookAt: [450, 150], hl: cut < .5 ? [330, cy + chh + 4] : null, hr: cut < .5 ? [Math.max(400, Math.min(eat, 620)), cy + chh + 4] : grab ? [lerp(430, b1 + 24 - bounce, gk), cy + chh - 8] : null });
    R(296, 352, 34, 40, '#fff', 4, P.red, 2); for (let i = 0; i < 4; i++) C(302 + i * 8, 350 - (i % 2) * 5, 6, '#FFF3C4', '#E8C872', 1);
    const g = cube({ x: 590, y: 396, s: 62, c: P.sta, id: 4, mood: cut > .5 ? 'smile' : t > 1.6 ? 'sad' : 'flat', lookAt: [590, 150], hl: [570 + Math.sin(NOW * 9) * 2, 369], hr: [610 - Math.sin(NOW * 9) * 2, 369] }); R(564, 361, 52, 18, '#2b2d42', 8);
    const ni = 3 + Math.round(grow * 5); for (let i = 0; i < ni; i++) cube({ x: 690 + (i % 4) * 46 + (i > 3 ? 22 : 0), y: i > 3 ? 408 : 370, s: 30, c: [P.teal, P.yellow, P.ap][i % 3], id: i + 6, mood: cut > .5 ? 'smile' : 'flat', lookAt: [700, 150] });
    A(gk, () => { spark(b1 + 6, cy + chh - 10, 14, P.ap, 6); label('дзынь!', b1 + 30, cy + chh + 30, '#fff', P.ap); });
    bubble(370, v.top - 6, 'Всё моё!', win(t, 1.4, 4)); bubble(590, g.top - 6, 'А мне?..', win(t, 2.2, 4.4)); bubble(chx, h.top - 22, t < 11 ? 'Каждому — свой кусок' : 'Датчиков больше — подвинем', Math.max(win(t, 5, 8), win(t, 12.2, 15.2)), 14);
  }
});

S('sched', {
  dur: 16, thumb: 6,
  cap: [[0, 'Каждую миллисекунду базовая станция решает: кому и сколько ресурсов дать'], [4, 'Планировщик ловит момент, когда у абонента канал хорош'], [8, 'Адаптация: хороший канал — плотная модуляция, плохой — надёжная'], [12, 'Наши планировщики дают больше скорости и меньше задержек при тех же ресурсах']],
  draw(t) {
    outdoor('#EAF3FB', '#D5DAE2'); cloud(700 + t * 2, 40, .8); bldg(880, 345, 70, 120, '#D6DCE8', '#fff', 4); tree(250, 345, .7);
    tower(80, 345, 250);
    const U = [{ x: 390, c: P.sta, base: .78, amp: .2, w: 1.7, n: 'UE 1' }, { x: 610, c: P.pink, base: .55, amp: .32, w: 1.1, n: 'UE 2' }, { x: 820, c: P.yellow, base: .32, amp: .28, w: .8, n: 'UE 3' }];
    const q = (u, tau) => clamp(U[u].base + U[u].amp * Math.sin(tau * U[u].w + u * 2.1)), pf = (u, tau) => Math.sin(tau * U[u].w + u * 2.1);
    const best = tau => { let b = 0; for (let u = 1; u < 3; u++) if (pf(u, tau) > pf(b, tau)) b = u; return b; };
    // resource grid board
    const gx = 200, gy = 36, cw = 30, chh = 26, NC = 12, ci = Math.floor(t / .5), f = (t / .5) % 1;
    R(gx - 44, gy - 12, NC * cw + 60, 5 * chh + 44, '#fff', 12, '#cfd3da'); Tx('частота', gx - 26, gy + 65, 10, P.steel); Tx('время →', gx + NC * cw - 30, gy + 5 * chh + 20, 10, P.steel);
    clipR(gx, gy, NC * cw, 5 * chh, () => { for (let k = 0; k <= NC; k++) { const c = ci - NC + k, tau = c * .5, b = best(tau), x = gx + (k - f) * cw; if (c < 0) continue;
      for (let r = 0; r < 5; r++) { const u = r < 3 ? b : (b + r - 2) % 3, qq = q(u, tau), y = gy + r * chh; R(x + 1, y + 1, cw - 2, chh - 2, U[u].c, 4); const nd = qq > .66 ? 3 : qq > .4 ? 2 : 1; for (let a = 0; a < nd; a++) for (let d = 0; d < nd; d++) C(x + cw * (a + 1) / (nd + 1), y + chh * (d + 1) / (nd + 1), 1.6, 'rgba(0,0,0,.45)'); } } });
    R(gx + NC * cw - cw - 1, gy - 3, cw + 2, 5 * chh + 6, null, 5, P.ink, 2.5);
    const now = best(ci * .5);
    U.forEach((u, i) => { const qq = q(i, t), on = now === i; if (on) { beam(84, 100, u.x, 290, u.c, 60, .4); for (let k = 0; k < 2; k++) { const p = per(t, .7, k * .35); pkt(lerp(84, u.x, p), lerp(100, 290, p), u.c, 12); } }
      const c = cube({ x: u.x, y: 345, s: 60, c: u.c, label: u.n, id: i + 3, mood: on ? 'smile' : 'flat', lookAt: [84, 100], hr: [u.x + 40, 296] }); R(u.x + 32, 276, 16, 26, '#2b2d42', 3);
      bars(u.x - 14, c.top - 8, Math.round(qq * 4), on ? P.green : P.steel, 1); Tx('CQI ' + Math.round(1 + qq * 14), u.x + 34, c.top - 16, 11, P.steel);
      A(on && t > 4 && t < 8 ? 1 : 0, () => label('канал на пике — даём ресурсы', u.x, c.top - 40, '#fff', P.navy, 11));
      A(seg(t, 8, 8.6) * (1 - seg(t, 11.6, 12)), () => label(qq > .66 ? '64-QAM' : qq > .4 ? '16-QAM' : 'QPSK', u.x, 372, '#fff', qq > .66 ? P.green : qq > .4 ? P.orange : P.red, 11)); });
    R(120, 300, 100, 45, '#3a3f55', 6); for (let i = 0; i < 5; i++) C(136 + i * 17, 314, 4, Math.sin(NOW * 6 + i) > 0 ? '#7CFFC8' : P.orange);
    const h = hero({ x: 170, y: 300, s: 56, lookAt: [gx + NC * cw, gy + 60], hr: [205 + Math.sin(NOW * 5) * 8, 222 - now * 12], hl: [140 + Math.sin(NOW * 7) * 6, 296] });
    bubble(170, h.top - 6, 'Сейчас — ' + U[now].n + '!', win(t, 1, 3.8), 14);
    A(seg(t, 12, 12.8), () => { R(640, 40, 250, 76, '#fff', 12, '#cfd3da'); Tx('скорость соты', 765, 58, 12, P.steel); R(660, 72, 210, 12, '#e4e6ec', 6); R(660, 72, 210 * lerp(.55, .92, seg(t, 12.4, 15)), 12, P.green, 6); Tx('+' + Math.round(lerp(0, 30, seg(t, 12.4, 15))) + ' %', 765, 100, 14, P.green); });
  }
});

S('risalgo', {
  dur: 16, thumb: 5.2,
  cap: [[0, 'У RIS сотни элементов — перебрать все комбинации невозможно'], [2.5, 'Кодовая книга: заранее готовим набор узоров-лучей и быстро находим лучший'], [8, 'Статистические алгоритмы: настраиваем RIS по усреднённым свойствам канала, без частых измерений'], [12.5, 'Меньше служебных сигналов — больше полезных данных']],
  draw(t) {
    outdoor('#EEF4FA', '#D8DDE5'); bldg(330, 345, 320, 345, '#D6DCE8', '#fff', 5); R(410, 30, 170, 100, '#D6DCE8'); tree(900, 345, .9); tower(70, 345, 200);
    const UX = [[0, 770], [8.4, 770], [10.6, 600], [13, 860], [15, 720]], ux = kf(t, UX), stat = seg(t, 8, 8.8);
    const sweep = 560 + 330 * (.5 + .5 * Math.sin((t - 1.2) * 1.7)), bx = t < 8 ? lerp(sweep, ux, seg(t, 5.6, 6.6)) : kf(t - .25, UX), rx = 495, ry = 82;
    const err = Math.abs(bx - ux), hit = clamp(1 - err / 90), page = 1 + Math.floor(clamp((bx - 560) / 330) * 15);
    A(stat, () => { for (let i = 0; i < 12; i++) { const hh = 6 + 30 * Math.exp(-Math.pow((i - 6.5) / 3.2, 2)) + 6 * rnd(i); R(560 + i * 28, 396 - hh, 22, hh, 'rgba(142,107,209,.55)', 3); } Tx('где обычно бывают абоненты', 728, 410, 11, P.violet); });
    beam(78, 150, rx, ry, P.ap, 40, .35); beam(rx, ry, bx, 330, hit > .5 ? P.sta : P.orange, lerp(70, 110, stat), .25 + .25 * hit);
    for (let i = 0; i < 3; i++) { const p = per(NOW, 1.3, i * .43); p < .5 ? C(lerp(78, rx, p * 2), lerp(150, ry, p * 2), 4, '#fff', P.ap, 2) : C(lerp(rx, bx, p * 2 - 1), lerp(ry, 330, p * 2 - 1), 4, '#fff', P.sta, 2); }
    tiles(425, 50, 7, 3, 20, (i, j) => ((i * (1 + page % 4) + j * (page % 3) + page) % 4 < 2 ? 1 : 0));
    label('RIS', 495, 126, '#fff', P.navy, 11);
    const u = cube({ x: ux, y: 345, s: 58, c: P.sta, label: 'UE', id: 3, walk: spd(t, UX), mood: hit > .5 ? 'smile' : 'flat', lookAt: [rx, ry], hr: [ux + 38, 298] }); R(ux + 30, 278, 16, 26, '#2b2d42', 3);
    bars(ux - 14, u.top - 8, Math.round(1 + hit * 3), hit > .5 ? P.green : P.orange);
    A(t < 7.6 ? 1 : 0, () => label(hit > .7 ? 'горячо!' : hit > .25 ? 'теплее…' : 'холодно', ux, u.top - 40, '#fff', hit > .7 ? P.red : hit > .25 ? P.orange : P.ap, 12));
    // hero with codebook & remote
    const h = hero({ x: 220, y: 345, s: 68, lookAt: t < 8 ? [250, 300] : [ux, 300], hl: [196, 292], hr: [262, 280 + (t < 8 ? Math.abs(Math.sin(NOW * 7)) * 5 : 0)] });
    at(196, 280, -.15, 1, () => { R(-30, -22, 60, 40, P.violet, 4); R(-26, -24, 52, 38, '#fff', 3, '#bbb', 1); L([0, -24, 0, 14], '#bbb', 1.5); const fl = t < 8 ? per(NOW, .5) : 0; if (fl > 0) Poly([0, -24, 26 * Math.cos(fl * PI), -24 - 8 * Math.sin(fl * PI), 26 * Math.cos(fl * PI), 14 - 8 * Math.sin(fl * PI), 0, 14], '#F4F1E8', '#bbb', 1); });
    R(254, 262, 16, 26, '#2b2d42', 4); C(262, 270, 3, P.red);
    A(win(t, 2.5, 7.8), () => { R(140, 190, 150, 30, '#fff', 10, '#cfd3da'); Tx('кодовая книга · № ' + page + ' / 16', 215, 206, 12, P.ink); });
    bubble(220, h.top - 6, t < 8 ? 'Листаю узоры…' : 'Теперь — по статистике', Math.max(win(t, 2.8, 5.6), win(t, 8.6, 11.6)), 14);
    A(seg(t, 12.5, 13.2), () => { R(40, 30, 250, 70, '#fff', 12, '#cfd3da'); Tx('кадр', 60, 48, 11, P.steel, 'left'); R(60, 62, 30, 20, P.orange, 4); R(92, 62, 178, 20, P.sta, 4); Tx('пилоты', 75, 92, 9, P.orange); Tx('данные', 180, 72, 12, '#fff'); });
  }
});

S('qris', {
  dur: 16, thumb: 12.6,
  cap: [[0, 'Прежде чем строить — моделируем: QRIS, наша платформа для сетей с RIS'], [3.5, 'В основе — реалистичная модель канала QuaDRiGa: лучи, отражения, движение'], [8, 'Ставим RIS на виртуальную стену и смотрим, как меняется карта покрытия'], [12.5, 'Тысячи сценариев за ночь — без единой поездки на полигон']],
  draw(t) {
    room('#F1F0F6', '#DDD9E8'); windowp(40, 50, 120, 100, true); moon(80, 90, 14);
    const mx = 300, my = 44, mw = 600, mh = 250, cs = 20; screen(mx - 14, my - 14, mw + 28, mh + 28, '#12202e'); R(mx + mw / 2 - 30, my + mh + 14, 60, 30, '#2b2d42'); R(mx + mw / 2 - 70, my + mh + 40, 140, 8, '#2b2d42', 4);
    const bs = [mx + 40, my + 130], A1 = [mx + 180, my + 70, 80, 120], B1 = [mx + 400, my + 16, 130, 46], ris = [mx + 465, my + 64];
    const placed = seg(t, 9.6, 10), s1 = clamp((t - 1.5) / 4), s2 = clamp((t - 10.2) / 3);
    const val = (x, y, withRis) => { const d = Math.hypot(x - bs[0], y - bs[1]); let v = clamp(1.05 - d / 560); const ax = A1[0] + A1[2];
      if (x > ax) { const k1 = (A1[1] - bs[1]) / (A1[0] - bs[0]), k2 = (A1[1] + A1[3] - bs[1]) / (A1[0] - bs[0]), yy1 = bs[1] + k1 * (x - bs[0]), yy2 = bs[1] + k2 * (x - bs[0]); if (y > yy1 && y < yy2) { v *= .22; if (withRis) { const dr = Math.hypot(x - ris[0], y - ris[1]), an = Math.atan2(y - ris[1], x - ris[0]); v += .75 * Math.exp(-Math.pow((an - 1.75) / .5, 2)) * clamp(1.2 - dr / 300); } } } return clamp(v); };
    clipR(mx, my, mw, mh, () => { for (let i = 0; i < mw / cs; i++) for (let j = 0; j < Math.ceil(mh / cs); j++) { const x = mx + i * cs + cs / 2, y = my + j * cs + cs / 2, k = i / (mw / cs); if (k > s1) continue; A(.85, () => R(x - cs / 2, y - cs / 2, cs - 1, cs - 1, heat(val(x, y, k < s2)), 3)); }
      if (s1 < 1) L([mx + s1 * mw, my, mx + s1 * mw, my + mh], '#7CFFC8', 3); if (s2 > 0 && s2 < 1) L([mx + s2 * mw, my, mx + s2 * mw, my + mh], '#fff', 3);
      R(A1[0], A1[1], A1[2], A1[3], '#3a4170', 5, '#9aa3d0', 1.5); R(B1[0], B1[1], B1[2], B1[3], '#3a4170', 5, '#9aa3d0', 1.5); R(mx + 300, my + 200, 90, 40, '#3a4170', 5, '#9aa3d0', 1.5);
      // rays
      const rays = [[bs[0], bs[1], A1[0], my + 100], [bs[0], bs[1], mx + 220, my + 16, mx + 380, my + 150], [bs[0], bs[1], mx + 240, my + 232, mx + 320, my + 200], [bs[0], bs[1], ris[0], ris[1]]];
      ctx.lineDashOffset = -NOW * 40; rays.forEach((r, i) => A(seg(t, 3.5 + i * .4, 4 + i * .4), () => L(r, i === 3 ? P.yellow : 'rgba(255,255,255,.75)', i === 3 ? 2.5 : 1.5, [8, 8]))); A(placed, () => L([ris[0], ris[1], mx + 420, my + 210], P.yellow, 2.5, [8, 8])); ctx.lineDashOffset = 0;
      C(bs[0], bs[1], 9, '#fff', P.ink, 2); Tx('BS', bs[0], bs[1] - 18, 11, '#fff');
      for (let i = 0; i < 3; i++) { const ux = mx + 400 + i * 50 + Math.sin(NOW * .8 + i * 2) * 14, uy = my + 170 + i * 22 + Math.cos(NOW * .6 + i) * 8; R(ux - 6, uy - 6, 12, 12, P.sta, 3, '#fff', 1.5); }
    });
    // dragging RIS with cursor
    const drag = seg(t, 8.2, 9.6), cxr = lerp(mx + 30, ris[0], drag), cyr = lerp(my + mh - 20, ris[1], drag);
    R(mx + 8, my + mh - 34, 44, 28, 'rgba(255,255,255,.9)', 6); Tx('RIS', mx + 30, my + mh - 46, 10, '#fff');
    at(t > 8 ? cxr : mx + 30, t > 8 ? cyr : my + mh - 20, 0, 1, () => { R(-16, -5, 32, 10, P.yellow, 2, P.ink, 1.2); for (let i = 0; i < 4; i++) L([-12 + i * 8, -5, -12 + i * 8, 5], P.ink, 1); });
    const cur = t < 8 ? [mx + 200 + Math.sin(NOW) * 40, my + 200 + Math.cos(NOW * 1.3) * 20] : t < 10 ? [cxr + 8, cyr + 8] : [mx + 520 + Math.sin(NOW) * 30, my + 180 + Math.cos(NOW) * 20];
    Poly([cur[0], cur[1], cur[0], cur[1] + 16, cur[0] + 4, cur[1] + 12, cur[0] + 11, cur[1] + 12], '#fff', P.ink, 1.5);
    A(seg(t, 3.5, 4.2) * (1 - seg(t, 7.6, 8)), () => label('QuaDRiGa: лучи и отражения', mx + 300, my + 16, '#12202e', '#7CFFC8', 12));
    A(win(t, 5.4, 8), () => label('тень за домом', mx + 440, my + 120, '#fff', P.ap, 11)); A(seg(t, 12, 12.6), () => label('с RIS: покрытие есть', mx + 440, my + 236, '#12202e', P.yellow, 12));
    // hero at desk
    desk(40, 300, 230, 345); const mouse = [200 + (cur[0] - mx) / mw * 40, 292 + (cur[1] - my) / mh * 6];
    const h = hero({ x: 140, y: 345, s: 76, lookAt: cur, hr: mouse, hl: [96 + Math.sin(NOW * 9) * 4, 294], mood: t > 12 ? 'wow' : 'smile' }); R(mouse[0] - 8, mouse[1] - 2, 16, 10, '#2b2d42', 5); R(60, 292, 70, 8, '#2b2d42', 3);
    R(232, 278, 16, 22, '#fff', 3, '#bbb', 1.5); for (let i = 0; i < 2; i++) { const p = per(NOW, 2, i); A(.5 * (1 - p), () => C(240 + Math.sin(p * 5 + i) * 4, 272 - p * 24, 3 + p * 4, '#c9ccd4')); }
    bubble(140, h.top - 6, t < 10 ? 'А если RIS — сюда?' : 'Тень исчезла!', Math.max(win(t, 8.2, 10.2), win(t, 12.4, 15)), 14);
    A(seg(t, 12.5, 13) , () => { R(60, 180, 190, 40, '#fff', 10, '#cfd3da'); Tx('сценарий ' + Math.round(lerp(1, 1000, seg(t, 12.6, 15.4))) + ' / 1000', 155, 201, 13); });
  }
});

S('mmimo', {
  dur: 16, thumb: 9,
  cap: [[0, 'Обычная антенна светит широким сектором: энергия размазана, все делят одну полосу'], [4.5, 'Massive MIMO: десятки и сотни антенных элементов работают как хор'], [8, 'Сдвигая фазы, они формируют узкие лучи — каждому абоненту свой'], [12, 'Десятки абонентов одновременно на одной частоте: ёмкость сети растёт в разы']],
  draw(t) {
    outdoor('#221F45', '#3B3766'); stars(40, 7, 200); moon(880, 50, 16);
    bldg(300, 250, 110, 120, '#2E2B57', '#3B3766', 2, '#FFE9A8'); bldg(430, 250, 90, 170, '#33306A', '#3B3766', 5, '#FFE9A8'); bldg(760, 250, 140, 140, '#2E2B57', '#3B3766', 9, '#FFE9A8'); R(280, 250, 680, 95, '#343060');
    for (let i = 0; i < 16; i++) { C(300 + i * 42, 236 + Math.sin(i * 1.3) * 6, 4, [P.yellow, P.pink, P.ap, P.sta][i % 4]); } L([290, 232, 950, 232], 'rgba(255,255,255,.3)', 1);
    const mm = seg(t, 4.5, 6), px = 60, py = 50, cs = 21, N = 6, src = [px + N * cs + 6, py + N * cs / 2];
    const us = []; for (let i = 0; i < 5; i++) us.push([400 + i * 122, 318, i]); for (let i = 0; i < 5; i++) us.push([340 + i * 122, 396, i + 5]);
    const cols = [P.sta, P.pink, P.yellow, P.ap, P.teal, P.orange, P.violet, '#fff', P.red, '#9AD49A'];
    A(1 - mm, () => beam(src[0], src[1], 700, 330, P.orange, 620, .22));
    A(mm, () => us.forEach(u => { beam(src[0], src[1], u[0], u[1] - 40, cols[u[2]], 26, .34 + .12 * Math.sin(NOW * 4 + u[2])); const p = per(t, 1, u[2] * .1); C(lerp(src[0], u[0], p), lerp(src[1], u[1] - 40, p), 3, '#fff'); }));
    // mast & antenna choir
    L([px + N * cs / 2, py + N * cs, px + N * cs / 2, 345], P.steel, 8); L([px + 20, 345, px + N * cs - 20, 345], P.steel, 8);
    R(px - 8, py - 8, N * cs + 14, N * cs + 14, '#12162c', 8, '#7d8ad0', 1.5);
    for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) { const ph = NOW * 6 - (i * .9 + j * .5) * mm, v = .5 + .5 * Math.sin(ph), x = px + i * cs, y = py + j * cs - v * 3 * (mm > .1 ? 1 : .3);
      R(x, y, cs - 3, cs - 3, `hsl(${205 + 60 * v * mm},75%,${50 + 22 * v}%)`, 3); C(x + 6, y + 7, 1.5, P.ink); C(x + 12, y + 7, 1.5, P.ink); if (v > .7) El(x + 9, y + 13, 2, 2.5, P.ink); else L([x + 6.5, y + 13, x + 11.5, y + 13], P.ink, 1.2); }
    A(mm, () => { for (let i = 0; i < 3; i++) Tx('♪', px + 20 + i * 44, py - 20 - Math.abs(Math.sin(NOW * 3 + i)) * 8, 16, '#fff'); });
    us.forEach(u => { const c = cube({ x: u[0], y: u[1], s: u[2] > 4 ? 50 : 42, c: cols[u[2]] === '#fff' ? '#E9E4DA' : cols[u[2]], id: u[2] + 3, mood: mm > .6 ? 'smile' : 'flat', lookAt: [u[0] + 20, u[1] - 60], hr: [u[0] + 24, u[1] - 44 + Math.sin(NOW * 2 + u[2]) * 2] });
      R(u[0] + 17, u[1] - 62, 14, 22, '#12162c', 3); R(u[0] + 19, u[1] - 59, 10, 15, mm > .6 ? '#7FD1C7' : '#667', 1);
      A(1 - mm, () => at(u[0] + 24, u[1] - 76, NOW * 5 + u[2], 1, () => Arc(0, 0, 6, 0, 4.4, '#fff', 2))); });
    const bt = [240 + Math.sin(NOW * 3) * 22, 250 + Math.cos(NOW * 6) * 14], hx = 222;
    const h = hero({ x: hx, y: 345, s: 62, lookAt: [px + 60, py + 60], hl: mm > .5 ? [bt[0] - 50, bt[1] - 20] : null, hr: mm > .5 ? [hx + 44, 280 - Math.sin(NOW * 3) * 14] : null, mood: mm > .5 ? 'talk' : 'flat' }); if (mm > .5) L([bt[0] - 50, bt[1] - 20, bt[0] - 64, bt[1] - 44], '#fff', 3);
    bubble(hx, h.top - 6, mm > .5 ? 'Хор, на счёт три!' : 'Маловато одной…', Math.max(win(t, 1, 4), win(t, 5, 8)), 14);
    A(seg(t, 12, 12.8), () => { R(560, 30, 280, 60, '#12162c', 12, '#7d8ad0', 1.5); Tx('одновременно на одной частоте', 700, 48, 12, '#9aa3d0'); Tx(Math.round(lerp(1, 10, seg(t, 12.2, 14))) + ' абонентов · ёмкость ×' + Math.round(lerp(1, 8, seg(t, 12.2, 14))), 700, 70, 15, '#7CFFC8'); });
    A(win(t, .8, 4.2), () => label('один широкий сектор', 620, 190, '#fff', P.orange, 12));
  }
});

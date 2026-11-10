'use strict';
/* ===== Cube engine: tiny canvas toolkit + procedurally rigged cube characters ===== */
const W = 960, H = 420, TAU = Math.PI * 2, PI = Math.PI;
let ctx = null, NOW = 0;
const FONT = 'ui-rounded, "Nunito", "Segoe UI", system-ui, -apple-system, sans-serif';
const P = {
  ink: '#22232b', hero: '#D97757', sta: '#6BBF6B', ap: '#5AA9E6', wur: '#C9A7DC', yellow: '#F4C95D',
  pink: '#F28DB2', teal: '#4DB6AC', gray: '#B8BCC4', red: '#E5484D', green: '#4CAF50', navy: '#1F2440',
  wood: '#C9A27A', wood2: '#B08968', steel: '#7d8597', violet: '#8E6BD1', orange: '#F59E42'
};

/* ---------- math ---------- */
const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const lerp = (a, b, k) => a + (b - a) * k;
const sm = k => { k = clamp(k); return k * k * (3 - 2 * k); };
const seg = (t, a, b) => sm((t - a) / (b - a));
const win = (t, a, b, f = .4) => Math.min(seg(t, a, a + f), 1 - seg(t, b - f, b));
function kf(t, keys) {
  if (t <= keys[0][0]) return keys[0][1];
  for (let i = 1; i < keys.length; i++) if (t <= keys[i][0]) {
    const a = keys[i - 1], b = keys[i];
    return lerp(a[1], b[1], sm((t - a[0]) / (b[0] - a[0])));
  }
  return keys[keys.length - 1][1];
}
const spd = (t, keys, ref = 120) => clamp(Math.abs(kf(t + .04, keys) - kf(t - .04, keys)) / .08 / ref);
const per = (t, p, off = 0) => ((((t - off) % p) + p) % p) / p;
const rnd = i => { const v = Math.sin(i * 127.1 + 11.7) * 43758.5453; return v - Math.floor(v); };
const arcp = (k, x0, y0, x1, y1, hh = 40) => [lerp(x0, x1, k), lerp(y0, y1, k) - Math.sin(PI * k) * hh];

/* ---------- primitives ---------- */
function R(x, y, w, h, f, r = 0, st, lw = 2) {
  ctx.beginPath();
  if (r) ctx.roundRect(x, y, w, h, r); else ctx.rect(x, y, w, h);
  if (f) { ctx.fillStyle = f; ctx.fill(); }
  if (st) { ctx.strokeStyle = st; ctx.lineWidth = lw; ctx.stroke(); }
}
function L(p, c = P.ink, w = 2.5, dash) {
  ctx.beginPath(); ctx.moveTo(p[0], p[1]);
  for (let i = 2; i < p.length; i += 2) ctx.lineTo(p[i], p[i + 1]);
  ctx.strokeStyle = c; ctx.lineWidth = w; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  ctx.setLineDash(dash || []); ctx.stroke(); ctx.setLineDash([]);
}
function Poly(p, f, st, lw = 2) {
  ctx.beginPath(); ctx.moveTo(p[0], p[1]);
  for (let i = 2; i < p.length; i += 2) ctx.lineTo(p[i], p[i + 1]);
  ctx.closePath();
  if (f) { ctx.fillStyle = f; ctx.fill(); }
  if (st) { ctx.strokeStyle = st; ctx.lineWidth = lw; ctx.lineJoin = 'round'; ctx.stroke(); }
}
function C(x, y, r, f, st, lw = 2) {
  ctx.beginPath(); ctx.arc(x, y, Math.max(0, r), 0, TAU);
  if (f) { ctx.fillStyle = f; ctx.fill(); }
  if (st) { ctx.strokeStyle = st; ctx.lineWidth = lw; ctx.stroke(); }
}
function El(x, y, rx, ry, f, st, lw = 2) {
  ctx.beginPath(); ctx.ellipse(x, y, Math.max(0, rx), Math.max(0, ry), 0, 0, TAU);
  if (f) { ctx.fillStyle = f; ctx.fill(); }
  if (st) { ctx.strokeStyle = st; ctx.lineWidth = lw; ctx.stroke(); }
}
function Arc(x, y, r, a0, a1, c = P.ink, w = 2.5) {
  ctx.beginPath(); ctx.arc(x, y, Math.max(0, r), a0, a1);
  ctx.strokeStyle = c; ctx.lineWidth = w; ctx.lineCap = 'round'; ctx.stroke();
}
function Tx(s, x, y, size = 14, c = P.ink, al = 'center', wt = 700) {
  ctx.font = `${wt} ${size}px ${FONT}`; ctx.textAlign = al; ctx.textBaseline = 'middle';
  ctx.fillStyle = c; ctx.fillText(s, x, y);
}
function A(a, fn) { if (a <= .01) return; ctx.save(); ctx.globalAlpha *= clamp(a); fn(); ctx.restore(); }
function at(x, y, rot, sc, fn) { ctx.save(); ctx.translate(x, y); if (rot) ctx.rotate(rot); if (sc != null && sc !== 1) ctx.scale(sc, sc); fn(); ctx.restore(); }
function clipR(x, y, w, h, fn) { ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip(); fn(); ctx.restore(); }

/* ---------- the cube character ----------
   o: x,y (feet), s size, c color, label, id (phase), walk 0..1, tilt, squash,
      mood smile|sad|wow|talk|sleep|flat, look [dx,dy] | lookAt [x,y],
      hl / hr world-space hand targets (2-bone IK), legs:false, hat, shadow:false */
function cube(o) {
  const s = o.s || 56, id = o.id || 0, T = NOW, wk = clamp(o.walk || 0), ph = T * 10 + id * 1.7;
  const sq = (o.squash || 0) + Math.sin(T * 2.1 + id) * .015;
  const w = s * (1 - sq * .6), h = s * (1 + sq), lg = o.legs === false ? 0 : s * .2;
  const hop = -Math.abs(Math.sin(ph)) * s * .06 * wk, top = -lg - h + hop;
  const tilt = (o.tilt || 0) + Math.sin(ph) * .05 * wk, co = Math.cos(tilt), si = Math.sin(tilt);
  const toL = p => { const dx = p[0] - o.x, dy = p[1] - o.y; return [dx * co + dy * si, -dx * si + dy * co]; };
  const toW = p => [o.x + p[0] * co - p[1] * si, o.y + p[0] * si + p[1] * co];
  if (o.shadow !== false) El(o.x, o.y + 2, w * .58, s * .07, 'rgba(30,30,50,.10)');
  ctx.save(); ctx.translate(o.x, o.y); ctx.rotate(tilt);
  const hat = o.hat;
  if (hat === 'ears') for (const i of [-1, 1]) {
    const fl = Math.sin(T * 3 + id + i) * .08 + (o.perk || 0) * .25;
    at(i * w * .6, top + h * .3, i * fl, 1, () => { El(0, 0, s * .3, s * .36, '#E9D2EC', 'rgba(20,20,30,.25)', 1.2); El(i * s * .04, 0, s * .17, s * .22, '#F6E3F2'); });
  }
  if (lg) for (const i of [-1, 1]) {
    const p2 = ph + (i > 0 ? PI : 0), lift = Math.max(0, Math.sin(p2)) * s * .1 * wk, fx = i * w * .24 + Math.cos(p2) * s * .11 * wk;
    L([i * w * .24, -lg + hop - 1, fx, -lift, fx + s * .1, -lift], P.ink, s * .05);
  }
  R(-w / 2, top, w, h, o.c || P.sta, s * .07, 'rgba(20,20,30,.28)', 1.2);
  // face
  let lk = o.look || [0, 0];
  const lab = o.label, ey = top + h * (lab ? .29 : .34), my = top + h * (lab ? .5 : .6);
  if (o.lookAt) { const p = toL(o.lookAt), dx = p[0], dy = p[1] - ey, d = Math.hypot(dx, dy) || 1; lk = [dx / d, dy / d]; }
  const ex = w * .2, erx = s * .075, ery = s * .125, mood = o.mood || 'smile';
  const blink = ((T * .27 + id * .37) % 1) < .03;
  for (const i of [-1, 1]) {
    const cx = i * ex + lk[0] * s * .04, cy = ey + lk[1] * s * .03;
    if (mood === 'sleep') Arc(cx, cy - erx * .4, erx, .15 * PI, .85 * PI, P.ink, s * .04);
    else if (blink) L([cx - erx, cy, cx + erx, cy], P.ink, s * .04);
    else { El(cx, cy, erx, ery * (mood === 'wow' ? 1.15 : 1), P.ink); C(cx + erx * .3 + lk[0] * erx * .3, cy - ery * .35 + lk[1] * ery * .25, erx * .38, '#fff'); }
  }
  if (mood === 'smile') Arc(0, my - s * .07, s * .13, .15 * PI, .85 * PI, P.ink, s * .04);
  else if (mood === 'sad') Arc(0, my + s * .12, s * .12, 1.2 * PI, 1.8 * PI, P.ink, s * .04);
  else if (mood === 'wow') El(0, my + s * .02, s * .055, s * .075, P.ink);
  else if (mood === 'talk') El(0, my + s * .02, s * .08, s * .025 + Math.abs(Math.sin(T * 11 + id)) * s * .06, P.ink);
  else if (mood === 'sleep') C(0, my + s * .03, s * .035, null, P.ink, s * .035);
  else L([-s * .09, my + s * .03, s * .09, my + s * .03], P.ink, s * .04);
  if (lab) Tx(lab, 0, top + h * .82, s * .25, P.ink, 'center', 500);
  // hats & gear
  if (hat === 'hard') { ctx.beginPath(); ctx.arc(0, top + s * .04, w * .44, PI, 0); ctx.fillStyle = P.yellow; ctx.fill(); R(-w * .56, top, w * 1.12, s * .08, '#E0B040', s * .04); }
  else if (hat === 'helmet') { C(0, top + h * .45, s * .86, 'rgba(200,230,255,.22)', '#9fb6c9', 2.5); Arc(0, top + h * .45, s * .7, 1.15 * PI, 1.4 * PI, 'rgba(255,255,255,.9)', 3); }
  else if (hat === 'vr') { R(-w * .56, ey - s * .05, w * 1.12, s * .08, '#555'); R(-w * .44, ey - s * .19, w * .88, s * .36, '#2b2d42', s * .08); R(-w * .3, ey - s * .1, w * .25, s * .06, '#7FD1C7', 2); }
  else if (hat === 'goggles') { L([-w / 2, ey, w / 2, ey], '#555', s * .05); for (const i of [-1, 1]) C(i * ex, ey, s * .15, 'rgba(160,220,255,.35)', '#555', 2.5); }
  else if (hat === 'chef') { R(-w * .36, top - s * .2, w * .72, s * .24, '#fff', 3, '#ccc', 1.2); for (const i of [-1, 0, 1]) C(i * w * .24, top - s * .26, s * .17, '#fff', '#ccc', 1.2); R(-w * .34, top - s * .2, w * .68, s * .12, '#fff'); }
  else if (hat === 'ant') { L([w * .25, top, w * .25, top - s * .32], P.ink, s * .045); C(w * .25, top - s * .34, s * .06, P.red); L([-w * .25, top, -w * .25, top - s * .22], P.ink, s * .045); C(-w * .25, top - s * .24, s * .05, P.ink); }
  else if (hat === 'det') { ctx.beginPath(); ctx.arc(0, top + s * .03, w * .4, PI, 0); ctx.fillStyle = '#8B6B4A'; ctx.fill(); R(-w * .62, top - s * .01, w * 1.24, s * .08, '#6F5237', s * .04); }
  else if (hat === 'grad') { Poly([-w * .55, top - s * .1, 0, top - s * .26, w * .55, top - s * .1, 0, top + s * .04], '#2b2d42'); L([w * .4, top - s * .1, w * .4, top + s * .12], P.yellow, 2); }
  else if (hat === 'straw') { El(0, top + s * .02, w * .75, s * .09, '#E8C872', '#C9A545', 1.2); ctx.beginPath(); ctx.arc(0, top, w * .36, PI, 0); ctx.fillStyle = '#E8C872'; ctx.fill(); }
  else if (hat === 'mask') { R(-w * .46, top + h * .08, w * .92, h * .58, '#3a3f55', s * .08); R(-w * .3, ey - s * .08, w * .6, s * .16, '#89CFF0', 3); }
  else if (hat === 'night') { Poly([-w * .4, top + 1, w * .4, top + 1, w * .5, top - s * .4], '#8E6BD1'); C(w * .5, top - s * .4, s * .07, '#fff'); }
  // arms
  const shY = top + h * .52, res = {};
  for (const i of [-1, 1]) {
    const key = i < 0 ? 'hl' : 'hr', sh = [i * w / 2, shY];
    const tg = o[key] ? toL(o[key]) : [i * (w / 2 + s * .2) + Math.sin(ph + (i > 0 ? 0 : PI)) * s * .14 * wk, shY + s * .32 + Math.sin(T * 2.1 + id + i) * 1.5];
    const dx = tg[0] - sh[0], dy = tg[1] - sh[1], d = Math.hypot(dx, dy) || .01, l = Math.max(s * .27, d * .52);
    const hg = Math.sqrt(Math.max(0, l * l - d * d / 4));
    let nx = -dy / d, ny = dx / d; if (ny < 0) { nx = -nx; ny = -ny; }
    L([sh[0], sh[1], (sh[0] + tg[0]) / 2 + nx * hg, (sh[1] + tg[1]) / 2 + ny * hg, tg[0], tg[1]], P.ink, s * .045);
    C(tg[0], tg[1], s * .058, P.ink);
    res[key] = toW(tg);
  }
  ctx.restore();
  res.top = o.y + top; res.cy = o.y + top + h / 2; res.x = o.x;
  return res;
}
const hero = o => cube(Object.assign({ c: P.hero, id: 1, s: 58 }, o));
const wave = (x, y, sp = 8, amp = 9) => [x + Math.sin(NOW * sp) * amp, y + Math.cos(NOW * sp * 2) * 2];

/* ---------- props ---------- */
function bubble(x, y, str, a = 1, sz = 15, fill = '#fff') {
  if (a <= .01) return;
  ctx.save(); ctx.font = `700 ${sz}px ${FONT}`;
  const bw = ctx.measureText(str).width + 22, bh = sz + 15, k = .6 + .4 * sm(a);
  const bx = clamp(-bw / 2, (8 - x) / k, (W - 8 - x) / k - bw);
  ctx.translate(x, y); ctx.scale(k, k); ctx.globalAlpha *= clamp(a);
  R(bx, -bh - 10, bw, bh, fill, 10, P.ink, 2);
  Poly([-6, -11, 6, -11, 0, 0], fill); L([-6, -10, 0, 0, 6, -10], P.ink, 2);
  Tx(str, bx + bw / 2, -10 - bh / 2 + 1, sz);
  ctx.restore();
}
function label(str, x, y, c = '#fff', bg = 'rgba(31,36,64,.88)', sz = 12) {
  ctx.font = `700 ${sz}px ${FONT}`; const w = ctx.measureText(str).width;
  R(x - w / 2 - 8, y - sz * .85, w + 16, sz * 1.7, bg, sz * .85); Tx(str, x, y + 1, sz, c);
}
function env(x, y, s = 1, rot = 0, c = '#7CC0F0') {
  at(x, y, rot, s, () => { R(-13, -9, 26, 18, c, 2, 'rgba(0,0,0,.3)', 1); L([-13, -9, 0, 2, 13, -9], '#fff', 1.6); });
}
function pkt(x, y, c, s = 14, lab, r = 3) { R(x - s / 2, y - s / 2, s, s, c, r, 'rgba(0,0,0,.25)', 1); if (lab) Tx(lab, x, y + .5, s * .62, '#fff'); }
function lock(x, y, s = 1, c = P.yellow) { at(x, y, 0, s, () => { Arc(0, -3, 4, PI, 0, P.ink, 2); R(-6, -3, 12, 9, c, 2, P.ink, 1.2); }); }
function waves(x, y, o = {}) {
  const { c = P.ap, max = 70, n = 3, a0 = 0, a1 = TAU, sp = 30, w = 2.5, al = 1 } = o;
  for (let i = 0; i < n; i++) {
    const r = (NOW * sp + i * max / n) % max;
    A((1 - r / max) * al, () => Arc(x, y, r + 4, a0, a1, c, w));
  }
}
function beam(x1, y1, x2, y2, c, w = 40, a = .35) {
  A(a, () => { const dx = x2 - x1, dy = y2 - y1, d = Math.hypot(dx, dy) || 1, nx = -dy / d * w / 2, ny = dx / d * w / 2; Poly([x1, y1, x2 + nx, y2 + ny, x2 - nx, y2 - ny], c); });
}
function bars(x, y, n, c = P.green, s = 1) { for (let i = 0; i < 4; i++) R(x + i * 7 * s, y - (i + 1) * 5 * s, 5 * s, (i + 1) * 5 * s, i < n ? c : '#d5d8dd', 1); }
function batt(x, y, l, w = 34) { R(x, y, w, 16, '#fff', 3, '#333', 1.5); R(x + w, y + 4, 3, 8, '#333', 1); R(x + 2.5, y + 2.5, (w - 5) * clamp(l), 11, l > .3 ? P.sta : P.red, 2); }
function zzz(x, y) { for (let i = 0; i < 3; i++) { const p = (NOW * .45 + i / 3) % 1; A(Math.sin(p * PI), () => Tx('z', x + p * 16 + i * 3, y - p * 30, 10 + p * 10, '#7d8597')); } }
function check(x, y, s = 8, c = P.green) { L([x - s, y, x - s * .3, y + s * .7, x + s, y - s * .7], c, s * .4); }
function cross(x, y, s = 8, c = P.red) { L([x - s, y - s, x + s, y + s], c, s * .4); L([x - s, y + s, x + s, y - s], c, s * .4); }
function spark(x, y, r, c = P.yellow, n = 6) { for (let i = 0; i < n; i++) { const a = i * TAU / n + NOW * 3, k = .5 + .5 * Math.sin(NOW * 17 + i * 2); L([x + Math.cos(a) * r * .3, y + Math.sin(a) * r * .3, x + Math.cos(a) * r * k, y + Math.sin(a) * r * k], c, 2); } }
function bolt(x, y, s = 1, c = P.yellow) { at(x, y, 0, s, () => Poly([4, -20, -8, 2, 0, 2, -4, 20, 9, -4, 1, -4], c, '#B8860B', 1.2)); }
function gear(x, y, r, c = P.steel, sp = 1) { at(x, y, NOW * sp, 1, () => { for (let i = 0; i < 8; i++) at(0, 0, i * TAU / 8, 1, () => R(-r * .16, -r * 1.25, r * .32, r * .5, c, 1)); C(0, 0, r, c); C(0, 0, r * .4, '#fff'); }); }

/* ---------- scenery ---------- */
function room(wall, floor, fy = 345) { R(0, 0, W, H, wall); R(0, fy, W, H - fy, floor); L([0, fy, W, fy], 'rgba(0,0,0,.12)', 2); }
function outdoor(sky, gr, gy = 345) { R(0, 0, W, H, sky); R(0, gy, W, H - gy, gr); }
function cloud(x, y, s = 1, c = '#fff') { R(x, y, 60 * s, 22 * s, c, 11 * s); R(x + 14 * s, y - 12 * s, 34 * s, 24 * s, c, 10 * s); }
function sun(x, y, r = 26, c = '#FFD86B') { C(x, y, r * 1.5, 'rgba(255,216,107,.25)'); C(x, y, r, c); }
function moon(x, y, r = 22) { C(x, y, r, '#FFF3C4'); C(x + r * .4, y - r * .2, r * .85, P.navy); }
function stars(n = 40, seed = 0, ymax = 260, c = '#fff') { for (let i = 0; i < n; i++) A(.4 + .6 * Math.abs(Math.sin(NOW * 1.3 + i)), () => C(rnd(i + seed) * W, rnd(i * 3 + seed + 5) * ymax, .8 + rnd(i * 7) * 1.3, c)); }
function tree(x, y, s = 1, c = '#8CCB8A') { R(x - 4 * s, y - 30 * s, 8 * s, 30 * s, P.wood2, 2); R(x - 22 * s, y - 70 * s, 44 * s, 44 * s, c, 9 * s); R(x - 12 * s, y - 86 * s, 26 * s, 26 * s, c, 7 * s); }
function bldg(x, y, w, h, c = '#D6DCE8', wc = '#fff', seed = 0, lit = '#FFE9A8') {
  R(x, y - h, w, h, c, 4);
  const nx = Math.max(1, Math.floor((w - 12) / 24)), ny = Math.max(1, Math.floor((h - 14) / 28)), ox = (w - nx * 24 + 10) / 2;
  for (let i = 0; i < nx; i++) for (let j = 0; j < ny; j++) R(x + ox + i * 24, y - h + 12 + j * 28, 14, 16, rnd(i * 7 + j * 13 + seed) > .6 ? lit : wc, 2);
}
function house(x, y, w, h, c = '#F3D9B1', rc = '#D97757') {
  R(x, y - h, w, h, c, 3); Poly([x - 8, y - h, x + w / 2, y - h - w * .38, x + w + 8, y - h], rc);
  R(x + w * .4, y - h * .55, w * .2, h * .55, P.wood2, 2); R(x + w * .12, y - h * .75, w * .18, h * .25, '#DDF1FA', 2);
}
function tower(x, y, h = 150, c = P.steel) {
  L([x - 16, y, x - 4, y - h, x + 4, y - h, x + 16, y], c, 3);
  for (let i = 0; i < 5; i++) { const k0 = i / 5, k1 = (i + 1) / 5, w0 = lerp(16, 4, k0), w1 = lerp(16, 4, k1); L([x - w0, y - h * k0, x + w1, y - h * k1, x - w1, y - h * k1], c, 1.5); }
  R(x - 15, y - h - 6, 8, 28, '#fff', 2, c, 1.5); R(x + 7, y - h - 6, 8, 28, '#fff', 2, c, 1.5); C(x, y - h - 8, 3.5, P.red);
}
function sat(x, y, s = 1, rot = 0, c = '#DADFE8') {
  at(x, y, rot, s, () => {
    for (const i of [-1, 1]) { R(i > 0 ? 18 : -50, -10, 32, 20, '#5AA9E6', 2, '#3d6f9e', 1.2); L([i * 34, -10, i * 34, 10], '#3d6f9e', 1); L([i * 18, 0, i * 16, 0], P.steel, 3); }
    R(-17, -17, 34, 34, c, 5, P.steel, 1.5);
    for (const i of [-1, 1]) { El(i * 6.5, -4, 2.6, 4.2, P.ink); C(i * 6.5 + .8, -5.5, 1, '#fff'); }
    Arc(0, 2, 5, .15 * PI, .85 * PI, P.ink, 1.6);
    L([0, 17, 0, 24], P.steel, 2); Arc(0, 31, 8, 1.1 * PI, 1.9 * PI, P.steel, 2.5);
  });
}
function car(x, y, c, dir = 1, s = 1) {
  at(x, y, 0, s, () => {
    ctx.scale(dir, 1); R(-34, -26, 68, 20, c, 7, 'rgba(0,0,0,.25)', 1); R(-22, -42, 38, 20, c, 7); R(-16, -38, 26, 13, '#DDF1FA', 3);
    for (const i of [-1, 1]) { C(i * 20, -5, 8, '#333'); at(i * 20, -5, NOW * 6, 1, () => L([-4, 0, 4, 0], '#bbb', 2)); }
    C(32, -17, 3, '#FFE082');
  });
}
function screen(x, y, w, h, c = P.navy) { R(x, y, w, h, '#2b2d42', 7); R(x + 5, y + 5, w - 10, h - 10, c, 3); }
function desk(x, y, w, fy = 345, c = P.wood) { R(x + 10, y + 6, 7, fy - y - 6, P.wood2); R(x + w - 17, y + 6, 7, fy - y - 6, P.wood2); R(x, y, w, 9, c, 3); }
function laptop(x, y, s = 1, sc = '#BFE3F5') { at(x, y, 0, s, () => { R(-18, -25, 36, 25, '#555', 3); R(-15, -22, 30, 19, sc, 2); R(-23, 0, 46, 4, '#888', 2); }); }
function plant(x, y, s = 1) { R(x - 9 * s, y - 16 * s, 18 * s, 16 * s, P.hero, 3); R(x - 6 * s, y - 34 * s, 12 * s, 20 * s, '#8CCB8A', 5 * s); R(x - 15 * s, y - 28 * s, 10 * s, 14 * s, '#7BBF7A', 4 * s); R(x + 5 * s, y - 30 * s, 10 * s, 15 * s, '#9AD49A', 4 * s); }
function windowp(x, y, w, h, night) { R(x, y, w, h, night ? '#2A3058' : '#CFE9F7', 6, P.wood, 4); L([x + w / 2, y, x + w / 2, y + h], P.wood, 3); L([x, y + h / 2, x + w, y + h / 2], P.wood, 3); }
function axes(x, y, w, h, c = P.ink) { L([x, y - h, x, y, x + w, y], c, 2); }
function heat(v) { v = clamp(v); return `hsl(${Math.round(235 - 235 * v)},75%,${Math.round(48 + 14 * v)}%)`; }
function tiles(x, y, nx, ny, cs, fn, gap = 2) { // RIS-like panel; fn(i,j) -> 0..1 state
  R(x - 5, y - 5, nx * cs + 8, ny * cs + 8, '#3a3f55', 5);
  for (let i = 0; i < nx; i++) for (let j = 0; j < ny; j++) { const v = fn(i, j); if (v == null) continue; R(x + i * cs, y + j * cs, cs - gap, cs - gap, v > .5 ? '#F4C95D' : '#7FD1C7', 2); }
}
function sine(x0, x1, yf, amp, kx, sp, c, w = 2.5) { // travelling wave; yf, amp may be functions of x
  ctx.beginPath();
  for (let x = x0; x <= x1; x += 3) { const a = typeof amp === 'function' ? amp(x) : amp, y = (typeof yf === 'function' ? yf(x) : yf) + a * Math.sin(x * kx - NOW * sp); x === x0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); }
  ctx.strokeStyle = c; ctx.lineWidth = w; ctx.lineCap = 'round'; ctx.stroke();
}

/* ---------- scene registry & player loop ---------- */
const SCENES = {};
function S(id, def) { SCENES[id] = def; }
const mounts = new Set();
function mount(cv, id, o = {}) {
  const sc = SCENES[id]; if (!sc) { console.warn('no scene', id); return null; }
  const m = { cv, sc, id, t0: performance.now() / 1000, paused: !!o.paused, off: o.at != null ? o.at : 0, onCap: o.onCap, onTick: o.onTick, cap: -1, dirty: true, t: 0 };
  m.pause = () => { if (!m.paused) { m.off = m.t; m.paused = true; m.dirty = true; } };
  m.play = () => { if (m.paused) { m.t0 = performance.now() / 1000; m.paused = false; } };
  m.seek = tt => { m.off = clamp(tt, 0, sc.dur - .01); m.t0 = performance.now() / 1000; m.dirty = true; };
  mounts.add(m); return m;
}
function fit(m) {
  const r = m.cv.getBoundingClientRect(), d = Math.min(window.devicePixelRatio || 1, 2), w = Math.round((r.width || 480) * d);
  if (m.cv.width !== w) { m.cv.width = w; m.cv.height = Math.round(w * H / W); m.dirty = true; }
}
function renderScene(cv, sc, t, now) {
  ctx = cv.getContext('2d'); NOW = now;
  const k = cv.width / W; ctx.setTransform(k, 0, 0, k, 0, 0); ctx.clearRect(0, 0, W, H);
  ctx.save(); ctx.lineCap = 'round';
  sc.draw(t);
  A(Math.max(1 - seg(t, 0, .45), seg(t, sc.dur - .45, sc.dur)), () => R(0, 0, W, H, '#fff'));
  ctx.restore();
}
function frame(ms) {
  const now = ms / 1000;
  for (const m of mounts) {
    if (!m.cv.isConnected) { mounts.delete(m); continue; }
    fit(m);
    if (m.paused) { if (!m.dirty) continue; m.t = m.off; } else m.t = (m.off + now - m.t0) % m.sc.dur;
    m.dirty = false;
    try { renderScene(m.cv, m.sc, m.t, m.paused ? m.t : now); } catch (e) { if (!m.err) { m.err = 1; console.error('scene ' + m.id, e); } }
    if (m.onTick) m.onTick(m.t);
    if (m.onCap) { let ci = 0; m.sc.cap.forEach((c, i) => { if (m.t >= c[0]) ci = i; }); if (ci !== m.cap) { m.cap = ci; m.onCap(ci); } }
  }
  requestAnimationFrame(frame);
}
if (typeof requestAnimationFrame !== 'undefined') requestAnimationFrame(frame);

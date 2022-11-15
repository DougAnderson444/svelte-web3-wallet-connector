function ne() {
}
const qt = (e) => e;
function Nt(e) {
  return e();
}
function ft() {
  return /* @__PURE__ */ Object.create(null);
}
function oe(e) {
  e.forEach(Nt);
}
function Re(e) {
  return typeof e == "function";
}
function Pe(e, t) {
  return e != e ? t == t : e !== t || e && typeof e == "object" || typeof e == "function";
}
let He;
function ht(e, t) {
  return He || (He = document.createElement("a")), He.href = t, e === He.href;
}
function Dt(e, t, n, o) {
  if (e) {
    const r = At(e, t, n, o);
    return e[0](r);
  }
}
function At(e, t, n, o) {
  return e[1] && o ? function(r, i) {
    for (const s in i)
      r[s] = i[s];
    return r;
  }(n.ctx.slice(), e[1](o(t))) : n.ctx;
}
function Ut(e, t, n, o) {
  if (e[2] && o) {
    const r = e[2](o(n));
    if (t.dirty === void 0)
      return r;
    if (typeof r == "object") {
      const i = [], s = Math.max(t.dirty.length, r.length);
      for (let d = 0; d < s; d += 1)
        i[d] = t.dirty[d] | r[d];
      return i;
    }
    return t.dirty | r;
  }
  return t.dirty;
}
function It(e, t, n, o, r, i) {
  if (r) {
    const s = At(t, n, o, i);
    e.p(s, r);
  }
}
function Ht(e) {
  if (e.ctx.length > 32) {
    const t = [], n = e.ctx.length / 32;
    for (let o = 0; o < n; o++)
      t[o] = -1;
    return t;
  }
  return -1;
}
function mt(e) {
  return e == null ? "" : e;
}
const Ot = typeof window < "u";
let rn = Ot ? () => window.performance.now() : () => Date.now(), rt = Ot ? (e) => requestAnimationFrame(e) : ne;
const Se = /* @__PURE__ */ new Set();
function Bt(e) {
  Se.forEach((t) => {
    t.c(e) || (Se.delete(t), t.f());
  }), Se.size !== 0 && rt(Bt);
}
function R(e, t) {
  e.appendChild(t);
}
function qe(e, t, n) {
  const o = at(e);
  if (!o.getElementById(t)) {
    const r = C("style");
    r.id = t, r.textContent = n, Tt(o, r);
  }
}
function at(e) {
  if (!e)
    return document;
  const t = e.getRootNode ? e.getRootNode() : e.ownerDocument;
  return t && t.host ? t : e.ownerDocument;
}
function sn(e) {
  const t = C("style");
  return Tt(at(e), t), t.sheet;
}
function Tt(e, t) {
  return R(e.head || e, t), t.sheet;
}
function A(e, t, n) {
  e.insertBefore(t, n || null);
}
function D(e) {
  e.parentNode && e.parentNode.removeChild(e);
}
function C(e) {
  return document.createElement(e);
}
function ct(e) {
  return document.createTextNode(e);
}
function W() {
  return ct(" ");
}
function B(e, t, n, o) {
  return e.addEventListener(t, n, o), () => e.removeEventListener(t, n, o);
}
function S(e, t, n) {
  n == null ? e.removeAttribute(t) : e.getAttribute(t) !== n && e.setAttribute(t, n);
}
function gt(e, t) {
  e.value = t == null ? "" : t;
}
function Oe(e, t, n, o) {
  n === null ? e.style.removeProperty(t) : e.style.setProperty(t, n, o ? "important" : "");
}
let Be;
function vt(e, t) {
  getComputedStyle(e).position === "static" && (e.style.position = "relative");
  const n = C("iframe");
  n.setAttribute("style", "display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: -1;"), n.setAttribute("aria-hidden", "true"), n.tabIndex = -1;
  const o = function() {
    if (Be === void 0) {
      Be = !1;
      try {
        typeof window < "u" && window.parent && window.parent.document;
      } catch {
        Be = !0;
      }
    }
    return Be;
  }();
  let r;
  return o ? (n.src = "data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}<\/script>", r = B(window, "message", (i) => {
    i.source === n.contentWindow && t();
  })) : (n.src = "about:blank", n.onload = () => {
    r = B(n.contentWindow, "resize", t);
  }), R(e, n), () => {
    (o || r && n.contentWindow) && r(), D(n);
  };
}
function we(e, t, n) {
  e.classList[n ? "add" : "remove"](t);
}
function zt(e, t, { bubbles: n = !1, cancelable: o = !1 } = {}) {
  const r = document.createEvent("CustomEvent");
  return r.initCustomEvent(e, n, o, t), r;
}
const Ye = /* @__PURE__ */ new Map();
let Ce, ze = 0;
function wt(e, t, n, o, r, i, s, d = 0) {
  const u = 16.666 / o;
  let c = `{
`;
  for (let p = 0; p <= 1; p += u) {
    const w = t + (n - t) * i(p);
    c += 100 * p + `%{${s(w, 1 - w)}}
`;
  }
  const g = c + `100% {${s(n, 1 - n)}}
}`, h = `__svelte_${function(p) {
    let w = 5381, $ = p.length;
    for (; $--; )
      w = (w << 5) - w ^ p.charCodeAt($);
    return w >>> 0;
  }(g)}_${d}`, l = at(e), { stylesheet: a, rules: m } = Ye.get(l) || function(p, w) {
    const $ = { stylesheet: sn(w), rules: {} };
    return Ye.set(p, $), $;
  }(l, e);
  m[h] || (m[h] = !0, a.insertRule(`@keyframes ${h} ${g}`, a.cssRules.length));
  const f = e.style.animation || "";
  return e.style.animation = `${f ? `${f}, ` : ""}${h} ${o}ms linear ${r}ms 1 both`, ze += 1, h;
}
function Le(e) {
  Ce = e;
}
function Wt() {
  if (!Ce)
    throw new Error("Function called outside component initialization");
  return Ce;
}
function dt(e) {
  Wt().$$.on_mount.push(e);
}
function Ft() {
  const e = Wt();
  return (t, n, { cancelable: o = !1 } = {}) => {
    const r = e.$$.callbacks[t];
    if (r) {
      const i = zt(t, n, { cancelable: o });
      return r.slice().forEach((s) => {
        s.call(e, i);
      }), !i.defaultPrevented;
    }
    return !0;
  };
}
function ln(e, t) {
  const n = e.$$.callbacks[t.type];
  n && n.slice().forEach((o) => o.call(this, t));
}
const Ee = [], Je = [], We = [], it = [], an = Promise.resolve();
let st = !1;
function X(e) {
  We.push(e);
}
const Xe = /* @__PURE__ */ new Set();
let ke, Te = 0;
function yt() {
  const e = Ce;
  do {
    for (; Te < Ee.length; ) {
      const t = Ee[Te];
      Te++, Le(t), cn(t.$$);
    }
    for (Le(null), Ee.length = 0, Te = 0; Je.length; )
      Je.pop()();
    for (let t = 0; t < We.length; t += 1) {
      const n = We[t];
      Xe.has(n) || (Xe.add(n), n());
    }
    We.length = 0;
  } while (Ee.length);
  for (; it.length; )
    it.pop()();
  st = !1, Xe.clear(), Le(e);
}
function cn(e) {
  if (e.fragment !== null) {
    e.update(), oe(e.before_update);
    const t = e.dirty;
    e.dirty = [-1], e.fragment && e.fragment.p(e.ctx, t), e.after_update.forEach(X);
  }
}
function Ge(e, t, n) {
  e.dispatchEvent(zt(`${t ? "intro" : "outro"}${n}`));
}
const Fe = /* @__PURE__ */ new Set();
let te;
function ye() {
  te = { r: 0, c: [], p: te };
}
function $e() {
  te.r || oe(te.c), te = te.p;
}
function _(e, t) {
  e && e.i && (Fe.delete(e), e.i(t));
}
function q(e, t, n, o) {
  if (e && e.o) {
    if (Fe.has(e))
      return;
    Fe.add(e), te.c.push(() => {
      Fe.delete(e), o && (n && e.d(1), o());
    }), e.o(t);
  } else
    o && o();
}
const dn = { duration: 0 };
function ae(e, t, n, o) {
  let r = t(e, n), i = o ? 0 : 1, s = null, d = null, u = null;
  function c() {
    u && function(l, a) {
      const m = (l.style.animation || "").split(", "), f = m.filter(a ? (w) => w.indexOf(a) < 0 : (w) => w.indexOf("__svelte") === -1), p = m.length - f.length;
      p && (l.style.animation = f.join(", "), ze -= p, ze || rt(() => {
        ze || (Ye.forEach((w) => {
          const { ownerNode: $ } = w.stylesheet;
          $ && D($);
        }), Ye.clear());
      }));
    }(e, u);
  }
  function g(l, a) {
    const m = l.b - i;
    return a *= Math.abs(m), { a: i, b: l.b, d: m, duration: a, start: l.start, end: l.start + a, group: l.group };
  }
  function h(l) {
    const { delay: a = 0, duration: m = 300, easing: f = qt, tick: p = ne, css: w } = r || dn, $ = { start: rn() + a, b: l };
    l || ($.group = te, te.r += 1), s || d ? d = $ : (w && (c(), u = wt(e, i, l, m, a, f, w)), l && p(0, 1), s = g($, m), X(() => Ge(e, l, "start")), function(v) {
      let b;
      Se.size === 0 && rt(Bt), new Promise((y) => {
        Se.add(b = { c: v, f: y });
      });
    }((v) => {
      if (d && v > d.start && (s = g(d, m), d = null, Ge(e, s.b, "start"), w && (c(), u = wt(e, i, s.b, s.duration, 0, f, r.css))), s) {
        if (v >= s.end)
          p(i = s.b, 1 - i), Ge(e, s.b, "end"), d || (s.b ? c() : --s.group.r || oe(s.group.c)), s = null;
        else if (v >= s.start) {
          const b = v - s.start;
          i = s.a + s.d * f(b / s.duration), p(i, 1 - i);
        }
      }
      return !(!s && !d);
    }));
  }
  return { run(l) {
    Re(r) ? (ke || (ke = Promise.resolve(), ke.then(() => {
      ke = null;
    })), ke).then(() => {
      r = r(), h(l);
    }) : h(l);
  }, end() {
    c(), s = d = null;
  } };
}
const un = typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : global;
function _e(e) {
  e && e.c();
}
function xe(e, t, n, o) {
  const { fragment: r, after_update: i } = e.$$;
  r && r.m(t, n), o || X(() => {
    const s = e.$$.on_mount.map(Nt).filter(Re);
    e.$$.on_destroy ? e.$$.on_destroy.push(...s) : oe(s), e.$$.on_mount = [];
  }), i.forEach(X);
}
function be(e, t) {
  const n = e.$$;
  n.fragment !== null && (oe(n.on_destroy), n.fragment && n.fragment.d(t), n.on_destroy = n.fragment = null, n.ctx = []);
}
function Ne(e, t, n, o, r, i, s, d = [-1]) {
  const u = Ce;
  Le(e);
  const c = e.$$ = { fragment: null, ctx: [], props: i, update: ne, not_equal: r, bound: ft(), on_mount: [], on_destroy: [], on_disconnect: [], before_update: [], after_update: [], context: new Map(t.context || (u ? u.$$.context : [])), callbacks: ft(), dirty: d, skip_bound: !1, root: t.target || u.$$.root };
  s && s(c.root);
  let g = !1;
  if (c.ctx = n ? n(e, t.props || {}, (h, l, ...a) => {
    const m = a.length ? a[0] : l;
    return c.ctx && r(c.ctx[h], c.ctx[h] = m) && (!c.skip_bound && c.bound[h] && c.bound[h](m), g && function(f, p) {
      f.$$.dirty[0] === -1 && (Ee.push(f), st || (st = !0, an.then(yt)), f.$$.dirty.fill(0)), f.$$.dirty[p / 31 | 0] |= 1 << p % 31;
    }(e, h)), l;
  }) : [], c.update(), g = !0, oe(c.before_update), c.fragment = !!o && o(c.ctx), t.target) {
    if (t.hydrate) {
      const h = function(l) {
        return Array.from(l.childNodes);
      }(t.target);
      c.fragment && c.fragment.l(h), h.forEach(D);
    } else
      c.fragment && c.fragment.c();
    t.intro && _(e.$$.fragment), xe(e, t.target, t.anchor, t.customElement), yt();
  }
  Le(u);
}
class De {
  $destroy() {
    be(this, 1), this.$destroy = ne;
  }
  $on(t, n) {
    if (!Re(n))
      return ne;
    const o = this.$$.callbacks[t] || (this.$$.callbacks[t] = []);
    return o.push(n), () => {
      const r = o.indexOf(n);
      r !== -1 && o.splice(r, 1);
    };
  }
  $set(t) {
    var n;
    this.$$set && (n = t, Object.keys(n).length !== 0) && (this.$$.skip_bound = !0, this.$$set(t), this.$$.skip_bound = !1);
  }
}
function pn(e, t, n, o) {
  var r, i = (r = o) == null || typeof r == "number" || typeof r == "boolean" ? o : n(o), s = t.get(i);
  return s === void 0 && (s = e.call(this, o), t.set(i, s)), s;
}
function fn(e, t, n) {
  var o = Array.prototype.slice.call(arguments, 3), r = n(o), i = t.get(r);
  return i === void 0 && (i = e.apply(this, o), t.set(r, i)), i;
}
const hn = JSON.stringify;
function Ve() {
  this.cache = /* @__PURE__ */ Object.create(null);
}
Ve.prototype.has = function(e) {
  return e in this.cache;
}, Ve.prototype.get = function(e) {
  return this.cache[e];
}, Ve.prototype.set = function(e, t) {
  this.cache[e] = t;
};
const mn = (e, t = {}) => {
  var ge, ve;
  let { bounds: n, axis: o = "both", gpuAcceleration: r = !0, applyUserSelectHack: i = !0, disabled: s = !1, ignoreMultitouch: d = !1, grid: u, position: c, cancel: g, handle: h, defaultClass: l = "neodrag", defaultClassDragging: a = "neodrag-dragging", defaultClassDragged: m = "neodrag-dragged", defaultPosition: f = { x: 0, y: 0 }, onDragStart: p, onDrag: w, onDragEnd: $ } = t;
  const v = new Promise(requestAnimationFrame);
  let b, y, k = !1, L = 0, N = 0, j = 0, M = 0, G = 0, F = 0, { x: V, y: Z } = c ? { x: (ge = c == null ? void 0 : c.x) != null ? ge : 0, y: (ve = c == null ? void 0 : c.y) != null ? ve : 0 } : f;
  Qe(V, Z, e, r);
  let H, Y, Q, fe, he = "", Ae = !!c;
  const me = document.body.style, U = e.classList, je = (x, O) => {
    const J = { offsetX: L, offsetY: N, domRect: e.getBoundingClientRect() };
    e.dispatchEvent(new CustomEvent(x, { detail: J })), O == null || O(J);
  }, T = addEventListener;
  T("touchstart", de, !1), T("touchend", ue, !1), T("touchmove", ee, !1), T("mousedown", de, !1), T("mouseup", ue, !1), T("mousemove", ee, !1), e.style.touchAction = "none";
  const Ue = () => {
    let x = e.offsetWidth / Y.width;
    return isNaN(x) && (x = 1), x;
  };
  function de(x) {
    if (s || d && x.type === "touchstart" && x.touches.length > 1)
      return;
    if (U.add(l), Q = function(E, I) {
      if (!E)
        return I;
      if (E instanceof HTMLElement || Array.isArray(E))
        return E;
      const P = I.querySelectorAll(E);
      if (P === null)
        throw new Error("Selector passed for `handle` option should be child of the element on which the action is applied");
      return Array.from(P.values());
    }(h, e), fe = function(E, I) {
      if (!E)
        return;
      if (E instanceof HTMLElement || Array.isArray(E))
        return E;
      const P = I.querySelectorAll(E);
      if (P === null)
        throw new Error("Selector passed for `cancel` option should be child of the element on which the action is applied");
      return Array.from(P.values());
    }(g, e), b = /(both|x)/.test(o), y = /(both|y)/.test(o), n !== void 0 && (H = function(E, I) {
      if (E instanceof HTMLElement)
        return E.getBoundingClientRect();
      if (typeof E == "object") {
        const { top: re = 0, left: ie = 0, right: se = 0, bottom: Ie = 0 } = E;
        return { top: re, right: window.innerWidth - se, bottom: window.innerHeight - Ie, left: ie };
      }
      if (E === "parent")
        return I.parentNode.getBoundingClientRect();
      const P = document.querySelector(E);
      if (P === null)
        throw new Error("The selector provided for bound doesn't exists in the document.");
      return P.getBoundingClientRect();
    }(n, e)), Y = e.getBoundingClientRect(), bt(h) && bt(g) && h === g)
      throw new Error("`handle` selector can't be same as `cancel` selector");
    if (jt(fe, Q))
      throw new Error("Element being dragged can't be a child of the element on which `cancel` is applied");
    if ((Q instanceof HTMLElement ? Q.contains(x.target) : Q.some((E) => E.contains(x.target))) && !jt(fe, x.target) && (k = !0), !k)
      return;
    i && (he = me.userSelect, me.userSelect = "none"), je("neodrag:start", p);
    const { clientX: O, clientY: J } = $t(x) ? x.touches[0] : x, z = Ue();
    b && (j = O - V / z), y && (M = J - Z / z), H && (G = O - Y.left, F = J - Y.top);
  }
  function ue() {
    k && (U.remove(a), U.add(m), i && (me.userSelect = he), je("neodrag:end", $), b && (j = L), b && (M = N), k = !1);
  }
  function ee(x) {
    if (!k)
      return;
    U.add(a), x.preventDefault(), Y = e.getBoundingClientRect();
    const { clientX: O, clientY: J } = $t(x) ? x.touches[0] : x;
    let z = O, E = J;
    const I = Ue();
    if (H) {
      const P = { left: H.left + G, top: H.top + F, right: H.right + G - Y.width, bottom: H.bottom + F - Y.height };
      z = xt(z, P.left, P.right), E = xt(E, P.top, P.bottom);
    }
    if (Array.isArray(u)) {
      let [P, re] = u;
      if (isNaN(+P) || P < 0)
        throw new Error("1st argument of `grid` must be a valid positive number");
      if (isNaN(+re) || re < 0)
        throw new Error("2nd argument of `grid` must be a valid positive number");
      let ie = z - j, se = E - M;
      [ie, se] = gn([P / I, re / I], ie, se), z = j + ie, E = M + se;
    }
    b && (L = Math.round((z - j) * I)), y && (N = Math.round((E - M) * I)), V = L, Z = N, je("neodrag", w), v.then(() => Qe(L, N, e, r));
  }
  return { destroy: () => {
    const x = removeEventListener;
    x("touchstart", de, !1), x("touchend", ue, !1), x("touchmove", ee, !1), x("mousedown", de, !1), x("mouseup", ue, !1), x("mousemove", ee, !1);
  }, update: (x) => {
    var J, z, E, I, P, re, ie, se, Ie, ut, pt;
    o = x.axis || "both", s = (J = x.disabled) != null ? J : !1, d = (z = x.ignoreMultitouch) != null ? z : !1, h = x.handle, n = x.bounds, g = x.cancel, i = (E = x.applyUserSelectHack) != null ? E : !0, u = x.grid, r = (I = x.gpuAcceleration) != null ? I : !0;
    const O = U.contains(m);
    U.remove(l, m), l = (P = x.defaultClass) != null ? P : "neodrag", a = (re = x.defaultClassDragging) != null ? re : "neodrag-dragging", m = (ie = x.defaultClassDragged) != null ? ie : "neodrag-dragged", U.add(l), O && U.add(m), Ae && (V = L = (Ie = (se = x.position) == null ? void 0 : se.x) != null ? Ie : L, Z = N = (pt = (ut = x.position) == null ? void 0 : ut.y) != null ? pt : N, v.then(() => Qe(L, N, e, r)));
  } };
}, $t = (e) => {
  var t;
  return !!((t = e.touches) != null && t.length);
}, xt = (e, t, n) => Math.min(Math.max(e, t), n), bt = (e) => typeof e == "string", gn = (Ze = ([e, t], n, o) => {
  const r = (i, s) => Math.ceil(i / s) * s;
  return [r(n, e), r(o, t)];
}, function(e, t) {
  return function(n, o, r, i, s) {
    return r.bind(o, n, i, s);
  }(Ze, this, Ze.length === 1 ? pn : fn, t.cache.create(), t.serializer);
}(0, { cache: { create: function() {
  return new Ve();
} }, serializer: hn }));
var Ze;
function jt(e, t) {
  const n = t instanceof HTMLElement ? [t] : t;
  return e instanceof HTMLElement ? n.some((o) => e.contains(o)) : !!Array.isArray(e) && e.some((o) => n.some((r) => o.contains(r)));
}
function Qe(e, t, n, o) {
  n.style.transform = o ? `translate3d(${+e}px, ${+t}px, 0)` : `translate(${+e}px, ${+t}px)`;
}
function vn(e) {
  qe(e, "svelte-189qcdl", "svg.svelte-189qcdl{width:auto;height:2em;display:block}");
}
function wn(e) {
  let t;
  return { c() {
    t = C("div"), t.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1440 1440" width="100" height="100" class="svelte-189qcdl"><defs></defs><defs><path id="a" d="M258 1321c9-304 6-917 0-1191 52-161 1082-280 1083 330 1 609-618 545-701 538-2 67-2 208 0 422-222 56-349 23-382-99z"></path><path id="c" d="M1122 560c-107 223-284 293-529 209l-38 79c-1 2-4 2-5-1l-99-287c-1-5 1-11 6-13l273-106c3-1 6 2 5 5l-36 75c70 126 211 139 423 39z"></path><path id="d" d="M451 447c107-223 284-292 529-209l38-78c1-3 5-2 5 0l99 288c1 5-1 10-6 12L843 567c-3 1-6-3-5-6l37-75c-71-126-212-139-424-39z"></path><radialGradient id="b" cx="992.3" cy="174.2" r="1312.8" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="#69ed66"></stop><stop offset="100%" stop-color="#279c19"></stop></radialGradient></defs><use fill="url(#b)" xlink:href="#a"></use><use fill="#fff" xlink:href="#c"></use><use fill="#fff" xlink:href="#d"></use></svg>';
  }, m(n, o) {
    A(n, t, o);
  }, p: ne, i: ne, o: ne, d(n) {
    n && D(t);
  } };
}
class Vt extends De {
  constructor(t) {
    super(), Ne(this, t, null, wn, Pe, {}, vn);
  }
}
function yn(e) {
  qe(e, "svelte-dp77pq", ".w-screen.svelte-dp77pq.svelte-dp77pq{width:100vw}.container.svelte-dp77pq.svelte-dp77pq{display:flex;align-items:center;position:absolute;top:0px;right:0px;z-index:50;cursor:pointer;margin:1em;opacity:0.95;width:auto}.menu-icon.svelte-dp77pq.svelte-dp77pq{display:inline-block}.bar1.svelte-dp77pq.svelte-dp77pq,.bar2.svelte-dp77pq.svelte-dp77pq,.bar3.svelte-dp77pq.svelte-dp77pq{width:35px;height:5px;background-color:#0bb113;margin:6px 0;transition:0.4s}.change.svelte-dp77pq .bar1.svelte-dp77pq{transform:rotate(-45deg) translate(-9px, 6px)}.change.svelte-dp77pq .bar2.svelte-dp77pq{opacity:0}.change.svelte-dp77pq .bar3.svelte-dp77pq{transform:rotate(45deg) translate(-8px, -8px)}.sidenav.svelte-dp77pq.svelte-dp77pq{position:fixed;top:0;right:0;height:15%;width:0;z-index:40;background-color:#111;overflow-x:inherit;padding-top:30px;transition:0.25s}.open.svelte-dp77pq.svelte-dp77pq{width:80%;height:100%;overflow-x:scroll}.mask.svelte-dp77pq.svelte-dp77pq{height:100%;position:fixed;top:0;left:0;opacity:0.5;background-color:#444;transition:0.4s}@media screen and (max-height: 450px){.sidenav.svelte-dp77pq.svelte-dp77pq{padding-top:15px}}@media(min-width: 640px){}");
}
const $n = (e) => ({ saveInputURL: 8 & e, url: 1 & e }), kt = (e) => ({ openNav: e[7], hideNav: e[6], saveInputURL: e[3], url: e[0] });
function Et(e) {
  let t, n;
  const o = e[9].default, r = Dt(o, e, e[8], kt);
  return { c() {
    t = C("div"), r && r.c(), S(t, "class", "sidenav svelte-dp77pq"), we(t, "open", e[2]);
  }, m(i, s) {
    A(i, t, s), r && r.m(t, null), n = !0;
  }, p(i, s) {
    r && r.p && (!n || 265 & s) && It(r, o, i, i[8], n ? Ut(o, i[8], s, $n) : Ht(i[8]), kt), (!n || 4 & s) && we(t, "open", i[2]);
  }, i(i) {
    n || (_(r, i), n = !0);
  }, o(i) {
    q(r, i), n = !1;
  }, d(i) {
    i && D(t), r && r.d(i);
  } };
}
function xn(e) {
  let t, n, o, r, i, s, d, u, c, g, h;
  n = new Vt({});
  let l = e[1] && Et(e);
  return { c() {
    t = C("div"), _e(n.$$.fragment), o = W(), r = C("div"), r.innerHTML = `<div class="bar1 svelte-dp77pq"></div> 
		<div class="bar2 svelte-dp77pq"></div> 
		<div class="bar3 svelte-dp77pq"></div>`, i = W(), s = C("div"), d = W(), l && l.c(), u = ct(""), S(r, "class", "menu-icon svelte-dp77pq"), S(t, "class", "container svelte-dp77pq"), we(t, "change", e[2]), S(s, "class", "w-screen svelte-dp77pq"), we(s, "mask", e[2]);
  }, m(a, m) {
    var f;
    A(a, t, m), xe(n, t, null), R(t, o), R(t, r), A(a, i, m), A(a, s, m), A(a, d, m), l && l.m(a, m), A(a, u, m), c = !0, g || (h = [B(t, "keypress", e[4]), B(t, "click", e[4]), (f = mn.call(null, t), f && Re(f.destroy) ? f.destroy : ne), B(s, "keypress", e[5]), B(s, "click", e[5])], g = !0);
  }, p(a, [m]) {
    (!c || 4 & m) && we(t, "change", a[2]), (!c || 4 & m) && we(s, "mask", a[2]), a[1] ? l ? (l.p(a, m), 2 & m && _(l, 1)) : (l = Et(a), l.c(), _(l, 1), l.m(u.parentNode, u)) : l && (ye(), q(l, 1, 1, () => {
      l = null;
    }), $e());
  }, i(a) {
    c || (_(n.$$.fragment, a), _(l), c = !0);
  }, o(a) {
    q(n.$$.fragment, a), q(l), c = !1;
  }, d(a) {
    a && D(t), be(n), a && D(i), a && D(s), a && D(d), l && l.d(a), a && D(u), g = !1, oe(h);
  } };
}
function bn(e, t, n) {
  let o, r, i, { $$slots: s = {}, $$scope: d } = t, { inputUrl: u } = t;
  return dt(async () => {
    if (window.indexedDB === void 0)
      return void console.log("IndexedDB not available");
    const { ImmortalDB: c } = await Promise.resolve().then(() => Kn);
    n(3, i = async (g) => {
      const h = g.detail;
      try {
        await c.set("INPUT_URL", h);
      } catch (l) {
        console.warn("Did not save", h, l);
      }
    });
    try {
      const g = await c.get("INPUT_URL", null);
      g && !u && n(0, u = g);
    } catch (g) {
      console.warn("Did not get", g);
    }
    n(1, o = !0);
  }), e.$$set = (c) => {
    "inputUrl" in c && n(0, u = c.inputUrl), "$$scope" in c && n(8, d = c.$$scope);
  }, [u, o, r, i, function() {
    n(2, r = !r);
  }, function(c) {
    n(2, r = !1);
  }, function() {
    n(2, r = !1);
  }, () => n(2, r = !0), d, s];
}
class jn extends De {
  constructor(t) {
    super(), Ne(this, t, bn, xn, Pe, { inputUrl: 0 }, yn);
  }
}
function ce(e, { delay: t = 0, duration: n = 400, easing: o = qt } = {}) {
  const r = +getComputedStyle(e).opacity;
  return { delay: t, duration: n, easing: o, css: (i) => "opacity: " + i * r };
}
var K, pe, Me, lt, le;
(function(e) {
  e.Call = "call", e.Reply = "reply", e.Syn = "syn", e.SynAck = "synAck", e.Ack = "ack";
})(K || (K = {})), function(e) {
  e.Fulfilled = "fulfilled", e.Rejected = "rejected";
}(pe || (pe = {})), function(e) {
  e.ConnectionDestroyed = "ConnectionDestroyed", e.ConnectionTimeout = "ConnectionTimeout", e.NoIframeSrc = "NoIframeSrc";
}(Me || (Me = {})), (lt || (lt = {})).DataCloneError = "DataCloneError", (le || (le = {})).Message = "message";
const kn = { "http:": "80", "https:": "443" }, En = /^(https?:)?\/\/([^/:]+)?(:(\d+))?/, Sn = ["file:", "data:"], St = ({ name: e, message: t, stack: n }) => ({ name: e, message: t, stack: n });
let Ln = 0;
const Yt = (e) => e ? e.split(".") : [], Cn = (e, t, n) => {
  const o = Yt(t);
  return o.reduce((r, i, s) => (r[i] === void 0 && (r[i] = {}), s === o.length - 1 && (r[i] = n), r[i]), e), e;
}, Jt = (e, t) => {
  const n = {};
  return Object.keys(e).forEach((o) => {
    const r = e[o], i = ((s, d) => {
      const u = Yt(d || "");
      return u.push(s), ((c) => c.join("."))(u);
    })(o, t);
    typeof r == "object" && Object.assign(n, Jt(r, i)), typeof r == "function" && (n[i] = r);
  }), n;
}, _n = (e, t, n, o, r) => {
  const { localName: i, local: s, remote: d, originForSending: u, originForReceiving: c } = t;
  let g = !1;
  r(`${i}: Connecting call sender`);
  const h = (a) => (...m) => {
    let f;
    r(`${i}: Sending ${a}() call`);
    try {
      d.closed && (f = !0);
    } catch {
      f = !0;
    }
    if (f && o(), g) {
      const p = new Error(`Unable to send ${a}() call due to destroyed connection`);
      throw p.code = Me.ConnectionDestroyed, p;
    }
    return new Promise((p, w) => {
      const $ = ++Ln, v = (y) => {
        if (y.source !== d || y.data.penpal !== K.Reply || y.data.id !== $)
          return;
        if (c !== "*" && y.origin !== c)
          return void r(`${i} received message from origin ${y.origin} which did not match expected origin ${c}`);
        const k = y.data;
        r(`${i}: Received ${a}() reply`), s.removeEventListener(le.Message, v);
        let L = k.returnValue;
        k.returnValueIsError && (L = ((N) => {
          const j = new Error();
          return Object.keys(N).forEach((M) => j[M] = N[M]), j;
        })(L)), (k.resolution === pe.Fulfilled ? p : w)(L);
      };
      s.addEventListener(le.Message, v);
      const b = { penpal: K.Call, id: $, methodName: a, args: m };
      d.postMessage(b, u);
    });
  }, l = n.reduce((a, m) => (a[m] = h(m), a), {});
  return Object.assign(e, ((a) => {
    const m = {};
    for (const f in a)
      Cn(m, f, a[f]);
    return m;
  })(l)), () => {
    g = !0;
  };
}, Mn = (e) => {
  let { iframe: t, methods: n = {}, childOrigin: o, timeout: r, debug: i = !1 } = e;
  const s = ((f) => (...p) => {
    f && console.log("[Penpal]", ...p);
  })(i), d = ((f, p) => {
    const w = [];
    let $ = !1;
    return { destroy(v) {
      $ || ($ = !0, p("Parent: Destroying connection"), w.forEach((b) => {
        b(v);
      }));
    }, onDestroy(v) {
      $ ? v() : w.push(v);
    } };
  })(0, s), { onDestroy: u, destroy: c } = d;
  o || (((f) => {
    if (!f.src && !f.srcdoc) {
      const p = new Error("Iframe must have src or srcdoc property defined.");
      throw p.code = Me.NoIframeSrc, p;
    }
  })(t), o = ((f) => {
    if (f && Sn.find((y) => f.startsWith(y)))
      return "null";
    const p = document.location, w = En.exec(f);
    let $, v, b;
    return w ? ($ = w[1] ? w[1] : p.protocol, v = w[2], b = w[4]) : ($ = p.protocol, v = p.hostname, b = p.port), `${$}//${v}${b && b !== kn[$] ? `:${b}` : ""}`;
  })(t.src));
  const g = o === "null" ? "*" : o, h = Jt(n), l = ((f, p, w, $) => (v) => {
    if (!v.source)
      return;
    if (w !== "*" && v.origin !== w)
      return void f(`Parent: Handshake - Received SYN message from origin ${v.origin} which did not match expected origin ${w}`);
    f("Parent: Handshake - Received SYN, responding with SYN-ACK");
    const b = { penpal: K.SynAck, methodNames: Object.keys(p) };
    v.source.postMessage(b, $);
  })(s, h, o, g), a = ((f, p, w, $, v) => {
    const { destroy: b, onDestroy: y } = $;
    let k, L;
    const N = {};
    return (j) => {
      if (p !== "*" && j.origin !== p)
        return void v(`Parent: Handshake - Received ACK message from origin ${j.origin} which did not match expected origin ${p}`);
      v("Parent: Handshake - Received ACK");
      const M = { localName: "Parent", local: window, remote: j.source, originForSending: w, originForReceiving: p };
      k && k(), k = ((F, V, Z) => {
        const { localName: H, local: Y, remote: Q, originForSending: fe, originForReceiving: he } = F;
        let Ae = !1;
        const me = (U) => {
          if (U.source !== Q || U.data.penpal !== K.Call)
            return;
          if (he !== "*" && U.origin !== he)
            return void Z(`${H} received message from origin ${U.origin} which did not match expected origin ${he}`);
          const je = U.data, { methodName: T, args: Ue, id: de } = je;
          Z(`${H}: Received ${T}() call`);
          const ue = (ee) => (ge) => {
            if (Z(`${H}: Sending ${T}() reply`), Ae)
              return void Z(`${H}: Unable to send ${T}() reply due to destroyed connection`);
            const ve = { penpal: K.Reply, id: de, resolution: ee, returnValue: ge };
            ee === pe.Rejected && ge instanceof Error && (ve.returnValue = St(ge), ve.returnValueIsError = !0);
            try {
              Q.postMessage(ve, fe);
            } catch (x) {
              if (x.name === lt.DataCloneError) {
                const O = { penpal: K.Reply, id: de, resolution: pe.Rejected, returnValue: St(x), returnValueIsError: !0 };
                Q.postMessage(O, fe);
              }
              throw x;
            }
          };
          new Promise((ee) => ee(V[T].apply(V, Ue))).then(ue(pe.Fulfilled), ue(pe.Rejected));
        };
        return Y.addEventListener(le.Message, me), () => {
          Ae = !0, Y.removeEventListener(le.Message, me);
        };
      })(M, f, v), y(k), L && L.forEach((F) => {
        delete N[F];
      }), L = j.data.methodNames;
      const G = _n(N, M, L, b, v);
      return y(G), N;
    };
  })(h, o, g, d, s);
  return { promise: new Promise((f, p) => {
    const w = ((v, b) => {
      let y;
      return v !== void 0 && (y = window.setTimeout(() => {
        const k = new Error(`Connection timed out after ${v}ms`);
        k.code = Me.ConnectionTimeout, b(k);
      }, v)), () => {
        clearTimeout(y);
      };
    })(r, c), $ = (v) => {
      if (v.source === t.contentWindow && v.data)
        if (v.data.penpal !== K.Syn) {
          if (v.data.penpal === K.Ack) {
            const b = a(v);
            b && (w(), f(b));
          }
        } else
          l(v);
    };
    window.addEventListener(le.Message, $), s("Parent: Awaiting handshake"), ((v, b) => {
      const { destroy: y, onDestroy: k } = b, L = setInterval(() => {
        v.isConnected || (clearInterval(L), y());
      }, 6e4);
      k(() => {
        clearInterval(L);
      });
    })(t, d), u((v) => {
      window.removeEventListener(le.Message, $), v && p(v);
    });
  }), destroy() {
    c();
  } };
};
function Rn(e) {
  qe(e, "svelte-1c05l0n", "button.svelte-1c05l0n{flex:0 0 auto;position:relative;opacity:0.8;height:100%;display:flex;align-items:center;justify-content:center;color:inherit;background:none;border:none;margin:0;padding:0;font-size:1em;cursor:pointer}.img-container.svelte-1c05l0n{margin:calc(var(--spacing) / 2);width:1.6em;height:1.6em;position:relative}svg.svelte-1c05l0n{width:100%;height:100%;top:0;bottom:0;left:0;right:0;position:absolute}");
}
function Lt(e) {
  let t, n, o;
  return { c() {
    t = C("div"), t.innerHTML = '<svg v-if="icon === &#39;close&#39;" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24" fill="currentColor" class="svelte-1c05l0n"><rect fill="none" height="24" width="24"></rect><path d="M3,3v18h18V3H3z M17,15.59L15.59,17L12,13.41L8.41,17L7,15.59L10.59,12L7,8.41L8.41,7L12,10.59L15.59,7L17,8.41L13.41,12 L17,15.59z"></path></svg>';
  }, m(r, i) {
    A(r, t, i), o = !0;
  }, i(r) {
    o || (X(() => {
      n || (n = ae(t, ce, { delay: 100, duration: 100 }, !0)), n.run(1);
    }), o = !0);
  }, o(r) {
    n || (n = ae(t, ce, { delay: 100, duration: 100 }, !1)), n.run(0), o = !1;
  }, d(r) {
    r && D(t), r && n && n.end();
  } };
}
function Ct(e) {
  let t, n, o;
  return { c() {
    t = C("div"), t.innerHTML = '<svg v-else-if="icon === &#39;launch&#39;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="svelte-1c05l0n"><path d="M0 0h24v24H0z" fill="none"></path><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"></path></svg>';
  }, m(r, i) {
    A(r, t, i), o = !0;
  }, i(r) {
    o || (X(() => {
      n || (n = ae(t, ce, { delay: 100, duration: 100 }, !0)), n.run(1);
    }), o = !0);
  }, o(r) {
    n || (n = ae(t, ce, { delay: 100, duration: 100 }, !1)), n.run(0), o = !1;
  }, d(r) {
    r && D(t), r && n && n.end();
  } };
}
function _t(e) {
  let t, n, o;
  return { c() {
    t = C("div"), t.innerHTML = '<svg v-else-if="icon === &#39;plug&#39;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="svelte-1c05l0n"><path d="M0 0h24v24H0z" fill="none"></path><path d="M16.01 7L16 3h-2v4h-4V3H8v4h-.01C7 6.99 6 7.99 6 8.99v5.49L9.5 18v3h5v-3l3.5-3.51v-5.5c0-1-1-2-1.99-1.99z"></path></svg>';
  }, m(r, i) {
    A(r, t, i), o = !0;
  }, i(r) {
    o || (X(() => {
      n || (n = ae(t, ce, { delay: 100, duration: 100 }, !0)), n.run(1);
    }), o = !0);
  }, o(r) {
    n || (n = ae(t, ce, { delay: 100, duration: 100 }, !1)), n.run(0), o = !1;
  }, d(r) {
    r && D(t), r && n && n.end();
  } };
}
function Mt(e) {
  let t, n, o;
  return { c() {
    t = C("div"), t.innerHTML = '<svg v-else-if="icon === &#39;unplug&#39;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="svelte-1c05l0n"><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M18 14.49V9c0-1-1.01-2.01-2-2V3h-2v4h-4V3H8v2.48l9.51 9.5.49-.49zm-1.76 1.77L7.2 7.2l-.01.01L3.98 4 2.71 5.25l3.36 3.36C6.04 8.74 6 8.87 6 9v5.48L9.5 18v3h5v-3l.48-.48L19.45 22l1.26-1.28-4.47-4.46z"></path></svg>';
  }, m(r, i) {
    A(r, t, i), o = !0;
  }, i(r) {
    o || (X(() => {
      n || (n = ae(t, ce, { delay: 100, duration: 100 }, !0)), n.run(1);
    }), o = !0);
  }, o(r) {
    n || (n = ae(t, ce, { delay: 100, duration: 100 }, !1)), n.run(0), o = !1;
  }, d(r) {
    r && D(t), r && n && n.end();
  } };
}
function Pn(e) {
  let t, n, o, r, i, s, d, u, c, g = e[0] === "close" && Lt(), h = e[0] === "launch" && Ct(), l = e[0] === "plug" && _t(), a = e[0] === "unplug" && Mt();
  const m = e[3].default, f = Dt(m, e, e[2], null);
  return { c() {
    t = C("button"), n = C("div"), g && g.c(), o = W(), h && h.c(), r = W(), l && l.c(), i = W(), a && a.c(), s = W(), f && f.c(), S(n, "class", "img-container svelte-1c05l0n"), S(t, "class", "svelte-1c05l0n");
  }, m(p, w) {
    A(p, t, w), R(t, n), g && g.m(n, null), R(n, o), h && h.m(n, null), R(n, r), l && l.m(n, null), R(n, i), a && a.m(n, null), R(t, s), f && f.m(t, null), d = !0, u || (c = [B(t, "keypress", e[4]), B(t, "click", e[5])], u = !0);
  }, p(p, [w]) {
    p[0] === "close" ? g ? 1 & w && _(g, 1) : (g = Lt(), g.c(), _(g, 1), g.m(n, o)) : g && (ye(), q(g, 1, 1, () => {
      g = null;
    }), $e()), p[0] === "launch" ? h ? 1 & w && _(h, 1) : (h = Ct(), h.c(), _(h, 1), h.m(n, r)) : h && (ye(), q(h, 1, 1, () => {
      h = null;
    }), $e()), p[0] === "plug" ? l ? 1 & w && _(l, 1) : (l = _t(), l.c(), _(l, 1), l.m(n, i)) : l && (ye(), q(l, 1, 1, () => {
      l = null;
    }), $e()), p[0] === "unplug" ? a ? 1 & w && _(a, 1) : (a = Mt(), a.c(), _(a, 1), a.m(n, null)) : a && (ye(), q(a, 1, 1, () => {
      a = null;
    }), $e()), f && f.p && (!d || 4 & w) && It(f, m, p, p[2], d ? Ut(m, p[2], w, null) : Ht(p[2]), null);
  }, i(p) {
    d || (_(g), _(h), _(l), _(a), _(f, p), d = !0);
  }, o(p) {
    q(g), q(h), q(l), q(a), q(f, p), d = !1;
  }, d(p) {
    p && D(t), g && g.d(), h && h.d(), l && l.d(), a && a.d(), f && f.d(p), u = !1, oe(c);
  } };
}
function qn(e, t, n) {
  let { $$slots: o = {}, $$scope: r } = t, { icon: i } = t;
  const s = Ft();
  return e.$$set = (d) => {
    "icon" in d && n(0, i = d.icon), "$$scope" in d && n(2, r = d.$$scope);
  }, [i, s, r, o, () => s("click", "detail value"), () => s("click", "detail value")];
}
class Nn extends De {
  constructor(t) {
    super(), Ne(this, t, qn, Pn, Pe, { icon: 0 }, Rn);
  }
}
const { window: Dn } = un;
function An(e) {
  qe(e, "svelte-1075m2j", ".relative.svelte-1075m2j{position:relative}.-top-2.svelte-1075m2j{top:-0.5rem}.m-2.svelte-1075m2j{margin:0.5rem}.m-0.svelte-1075m2j{margin:0px}.flex.svelte-1075m2j{display:flex}.hidden.svelte-1075m2j{display:none}.h-screen.svelte-1075m2j{height:100vh}.w-full.svelte-1075m2j{width:100%}.max-w-full.svelte-1075m2j{max-width:100%}.flex-1.svelte-1075m2j{flex:1 1 0%}.flex-shrink.svelte-1075m2j{flex-shrink:1}.flex-row.svelte-1075m2j{flex-direction:row}.flex-col.svelte-1075m2j{flex-direction:column}.items-center.svelte-1075m2j{align-items:center}.border-b-4.svelte-1075m2j{border-bottom-width:4px}.border-none.svelte-1075m2j{border-style:none}.border-\\[\\#0eff02\\].svelte-1075m2j{--tw-border-opacity:1;border-color:rgb(14 255 2 / var(--tw-border-opacity))}.bg-none.svelte-1075m2j{background-image:none}.p-\\[1em\\].svelte-1075m2j{padding:1em}.pl-2.svelte-1075m2j{padding-left:0.5rem}.pl-0.svelte-1075m2j{padding-left:0px}.pr-0.svelte-1075m2j{padding-right:0px}.text-sm.svelte-1075m2j{font-size:0.875rem;line-height:1.25rem}.text-white.svelte-1075m2j{--tw-text-opacity:1;color:rgb(255 255 255 / var(--tw-text-opacity))}.outline-none.svelte-1075m2j{outline:2px solid transparent;outline-offset:2px}div.svelte-1075m2j{--spacing:1em;--background:#161616}iframe.svelte-1075m2j{border:none;width:100%;height:100%}.iframe.svelte-1075m2j{display:flex;height:100%;min-height:500px}.logo.svelte-1075m2j{flex:0 0 auto;position:relative;opacity:1;height:100%;display:flex;align-items:center;justify-content:center;padding:calc(var(--spacing) / 2)}.url.svelte-1075m2j{flex:1 1 0;background-color:var(--background)}.actions.svelte-1075m2j{display:flex}.actions.svelte-1075m2j:last-child{padding-right:calc(var(--spacing) / 2)}.action.dim.svelte-1075m2j{opacity:0.9;color:#e0f7fa}.connected.svelte-1075m2j{color:greenyellow;text-shadow:1px 1px 3px black}.disconnected.svelte-1075m2j{color:#e0f7fa;text-shadow:1px 1px 3px black}@media(min-width: 640px){.sm\\:flex.svelte-1075m2j{display:flex}.sm\\:text-base.svelte-1075m2j{font-size:1rem;line-height:1.5rem}}");
}
function Un(e) {
  let t, n, o, r = e[9].loading || !e[7] ? "Loading..." : "Load";
  return { c() {
    var i;
    t = C("span"), n = ct(r), S(t, "class", o = ((i = e[0]) != null && i.address ? " connected " : " disconnected ") + " hidden sm:flex svelte-1075m2j");
  }, m(i, s) {
    A(i, t, s), R(t, n);
  }, p(i, s) {
    var d;
    640 & s && r !== (r = i[9].loading || !i[7] ? "Loading..." : "Load") && function(u, c) {
      c = "" + c, u.wholeText !== c && (u.data = c);
    }(n, r), 1 & s && o !== (o = ((d = i[0]) != null && d.address ? " connected " : " disconnected ") + " hidden sm:flex svelte-1075m2j") && S(t, "class", o);
  }, d(i) {
    i && D(t);
  } };
}
function In(e) {
  let t, n, o, r, i, s, d, u, c, g, h, l, a, m, f, p, w, $, v, b, y, k, L, N;
  return i = new Vt({}), m = new Nn({ props: { icon: e[10], $$slots: { default: [Un] }, $$scope: { ctx: e } } }), m.$on("keypress", e[20]), m.$on("click", e[21]), { c() {
    var j, M;
    t = C("div"), n = C("div"), o = C("a"), r = C("div"), _e(i.$$.fragment), s = W(), d = C("div"), u = C("input"), c = W(), g = C("span"), h = W(), l = C("div"), a = C("div"), _e(m.$$.fragment), w = W(), $ = C("div"), v = C("iframe"), S(r, "class", "actions logo svelte-1075m2j"), S(o, "class", "flex-0 hidden sm:flex svelte-1075m2j"), S(o, "href", "https://PeerPiper.io"), S(o, "target", "_blank"), S(o, "rel", "noreferrer"), S(u, "class", "url pl-0 p-[1em] pr-0 text-white bg-none border-none m-0 text-sm sm:text-base outline-none svelte-1075m2j"), S(u, "placeholder", Hn), S(g, "class", "border-b-4 border-[#0eff02] flex-1 relative -top-2 svelte-1075m2j"), S(d, "class", "flex-shrink flex flex-col w-full pl-2 svelte-1075m2j"), S(a, "class", f = mt((j = e[9]) != null && j.loading ? "action dim" : (M = e[0]) != null && M.address ? " connected " : " disconnected ") + " svelte-1075m2j"), S(l, "class", "flex svelte-1075m2j"), S(n, "class", "flex flex-row space-between items-center svelte-1075m2j"), Oe(n, "--topOffsetHeight", e[2]), X(() => e[22].call(n)), S(v, "title", "Web Wallet"), ht(v.src, b = e[7]) || S(v, "src", b), S(v, "allow", "clipboard-read 'self' 'src'; clipboard-write 'self' 'src';"), S(v, "class", "svelte-1075m2j"), S($, "class", "iframe svelte-1075m2j"), Oe($, "height", "calc(" + e[4] + "px + 18px)"), X(() => e[24].call($)), S(t, "class", "flex flex-col m-2 max-w-full h-screen svelte-1075m2j");
  }, m(j, M) {
    A(j, t, M), R(t, n), R(n, o), R(o, r), xe(i, r, null), R(n, s), R(n, d), R(d, u), gt(u, e[1]), R(d, c), R(d, g), R(n, h), R(n, l), R(l, a), xe(m, a, null), p = vt(n, e[22].bind(n)), R(t, w), R(t, $), R($, v), e[23](v), y = vt($, e[24].bind($)), k = !0, L || (N = [B(Dn, "keydown", e[13]), B(u, "focus", e[17]), B(u, "blur", e[18]), B(u, "input", e[19])], L = !0);
  }, p(j, [M]) {
    var F, V;
    2 & M && u.value !== j[1] && gt(u, j[1]);
    const G = {};
    1024 & M && (G.icon = j[10]), 536871553 & M && (G.$$scope = { dirty: M, ctx: j }), m.$set(G), (!k || 513 & M && f !== (f = mt((F = j[9]) != null && F.loading ? "action dim" : (V = j[0]) != null && V.address ? " connected " : " disconnected ") + " svelte-1075m2j")) && S(a, "class", f), (!k || 4 & M) && Oe(n, "--topOffsetHeight", j[2]), (!k || 128 & M && !ht(v.src, b = j[7])) && S(v, "src", b), (!k || 16 & M) && Oe($, "height", "calc(" + j[4] + "px + 18px)");
  }, i(j) {
    k || (_(i.$$.fragment, j), _(m.$$.fragment, j), k = !0);
  }, o(j) {
    q(i.$$.fragment, j), q(m.$$.fragment, j), k = !1;
  }, d(j) {
    j && D(t), be(i), be(m), p(), e[23](null), y(), L = !1, oe(N);
  } };
}
let Hn = "Enter Wallet Url";
function On(e, t, n) {
  let o, r, { wallet: i = null } = t, { inputUrl: s = "https://peerpiper.github.io/iframe-wallet-sdk/" } = t, { topOffsetHeight: d = 0 } = t, { topOffsetWidth: u = 0 } = t, { iframeParentHeight: c = 0 } = t, { iframeParentWidth: g = 0 } = t, { show: h } = t, { hide: l } = t;
  const a = Ft();
  let m, f, p;
  const w = { loading: !0 };
  async function $() {
    let y;
    n(9, w.loading = !1, w), y = await Mn({ iframe: f, methods: { setIframeParentHeight(L) {
      n(4, c = L);
    }, setIframeParentWidth(L) {
      n(14, g = L);
    }, show() {
      h();
    }, hide() {
      console.log("hiding", { hide: l }), l();
    }, walletReady: () => (n(0, i = y), a("walletReady", { wallet: i }), window.arweaveWallet = i.arweaveWalletAPI, i && setTimeout(() => {
      l();
    }, 250), !0) } }).promise, h();
  }
  dt(async () => {
    v();
  });
  const v = () => {
    m !== s && (n(7, m = ""), n(7, m = s), n(9, w.loading = !0, w), a("inputUrl", s));
  }, b = () => i.disconnect();
  return e.$$set = (y) => {
    "wallet" in y && n(0, i = y.wallet), "inputUrl" in y && n(1, s = y.inputUrl), "topOffsetHeight" in y && n(2, d = y.topOffsetHeight), "topOffsetWidth" in y && n(3, u = y.topOffsetWidth), "iframeParentHeight" in y && n(4, c = y.iframeParentHeight), "iframeParentWidth" in y && n(14, g = y.iframeParentWidth), "show" in y && n(15, h = y.show), "hide" in y && n(16, l = y.hide);
  }, e.$$.update = () => {
    64 & e.$$.dirty && f && f.addEventListener("load", $), 1 & e.$$.dirty && (i == null || i.keepPopup), 1 & e.$$.dirty && n(10, o = i != null && i.address ? "unplug" : "plug"), 33 & e.$$.dirty && r && i && (i == null || i.setWidth(r));
  }, [i, s, d, u, c, r, f, m, p, w, o, v, b, function(y) {
    y.key === "Enter" && p && v();
  }, g, h, l, () => n(8, p = !0), () => n(8, p = !1), function() {
    s = this.value, n(1, s);
  }, () => {
    i != null && i.address ? b() : v();
  }, () => {
    i != null && i.address ? b() : v();
  }, function() {
    d = this.offsetHeight, u = this.offsetWidth, n(2, d), n(3, u);
  }, function(y) {
    Je[y ? "unshift" : "push"](() => {
      f = y, n(6, f);
    });
  }, function() {
    r = this.offsetWidth, n(5, r);
  }];
}
class Bn extends De {
  constructor(t) {
    super(), Ne(this, t, On, In, Pe, { wallet: 0, inputUrl: 1, topOffsetHeight: 2, topOffsetWidth: 3, iframeParentHeight: 4, iframeParentWidth: 14, show: 15, hide: 16 }, An);
  }
}
function Tn(e) {
  qe(e, "svelte-sfvraj", `.m-0.svelte-sfvraj{margin:0px
}@media(min-width: 640px){}`);
}
function Rt(e) {
  let t, n;
  return t = new jn({ props: { inputUrl: e[1], $$slots: { default: [zn, ({ openNav: o, hideNav: r, saveInputURL: i, url: s }) => ({ 5: o, 6: r, 7: i, 8: s }), ({ openNav: o, hideNav: r, saveInputURL: i, url: s }) => (o ? 32 : 0) | (r ? 64 : 0) | (i ? 128 : 0) | (s ? 256 : 0)] }, $$scope: { ctx: e } } }), { c() {
    _e(t.$$.fragment);
  }, m(o, r) {
    xe(t, o, r), n = !0;
  }, p(o, r) {
    const i = {};
    2 & r && (i.inputUrl = o[1]), 993 & r && (i.$$scope = { dirty: r, ctx: o }), t.$set(i);
  }, i(o) {
    n || (_(t.$$.fragment, o), n = !0);
  }, o(o) {
    q(t.$$.fragment, o), n = !1;
  }, d(o) {
    be(t, o);
  } };
}
function zn(e) {
  let t, n, o;
  function r(s) {
    e[3](s);
  }
  let i = { show: e[5], hide: e[6], inputUrl: e[8] };
  return e[0] !== void 0 && (i.wallet = e[0]), t = new Bn({ props: i }), Je.push(() => function(s, d, u) {
    const c = s.$$.props.wallet;
    c !== void 0 && (s.$$.bound[c] = u, u(s.$$.ctx[c]));
  }(t, 0, r)), t.$on("walletReady", e[4]), t.$on("inputUrl", function() {
    Re(e[7]) && e[7].apply(this, arguments);
  }), { c() {
    _e(t.$$.fragment);
  }, m(s, d) {
    xe(t, s, d), o = !0;
  }, p(s, d) {
    e = s;
    const u = {};
    var c;
    32 & d && (u.show = e[5]), 64 & d && (u.hide = e[6]), 256 & d && (u.inputUrl = e[8]), !n && 1 & d && (n = !0, u.wallet = e[0], c = () => n = !1, it.push(c)), t.$set(u);
  }, i(s) {
    o || (_(t.$$.fragment, s), o = !0);
  }, o(s) {
    q(t.$$.fragment, s), o = !1;
  }, d(s) {
    be(t, s);
  } };
}
function Wn(e) {
  let t, n, o = e[2] && Rt(e);
  return { c() {
    t = C("section"), o && o.c(), S(t, "class", "m-0 svelte-sfvraj");
  }, m(r, i) {
    A(r, t, i), o && o.m(t, null), n = !0;
  }, p(r, [i]) {
    r[2] ? o ? (o.p(r, i), 4 & i && _(o, 1)) : (o = Rt(r), o.c(), _(o, 1), o.m(t, null)) : o && (ye(), q(o, 1, 1, () => {
      o = null;
    }), $e());
  }, i(r) {
    n || (_(o), n = !0);
  }, o(r) {
    q(o), n = !1;
  }, d(r) {
    r && D(t), o && o.d();
  } };
}
function Fn(e, t, n) {
  let o, { inputUrl: r = null } = t, { wallet: i = null } = t;
  return dt(() => {
    n(2, o = !0);
  }), e.$$set = (s) => {
    "inputUrl" in s && n(1, r = s.inputUrl), "wallet" in s && n(0, i = s.wallet);
  }, [i, r, o, function(s) {
    i = s, n(0, i);
  }, function(s) {
    ln.call(this, e, s);
  }];
}
class Xn extends De {
  constructor(t) {
    super(), Ne(this, t, Fn, Wn, Pe, { inputUrl: 1, wallet: 0 }, Tn);
  }
}
var Kt;
/*!
 * JavaScript Cookie v2.2.1
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
Kt = function() {
  function e() {
    for (var n = 0, o = {}; n < arguments.length; n++) {
      var r = arguments[n];
      for (var i in r)
        o[i] = r[i];
    }
    return o;
  }
  function t(n) {
    return n.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
  }
  return function n(o) {
    function r() {
    }
    function i(d, u, c) {
      if (typeof document < "u") {
        typeof (c = e({ path: "/" }, r.defaults, c)).expires == "number" && (c.expires = new Date(1 * new Date() + 864e5 * c.expires)), c.expires = c.expires ? c.expires.toUTCString() : "";
        try {
          var g = JSON.stringify(u);
          /^[\{\[]/.test(g) && (u = g);
        } catch {
        }
        u = o.write ? o.write(u, d) : encodeURIComponent(String(u)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent), d = encodeURIComponent(String(d)).replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent).replace(/[\(\)]/g, escape);
        var h = "";
        for (var l in c)
          c[l] && (h += "; " + l, c[l] !== !0 && (h += "=" + c[l].split(";")[0]));
        return document.cookie = d + "=" + u + h;
      }
    }
    function s(d, u) {
      if (typeof document < "u") {
        for (var c = {}, g = document.cookie ? document.cookie.split("; ") : [], h = 0; h < g.length; h++) {
          var l = g[h].split("="), a = l.slice(1).join("=");
          u || a.charAt(0) !== '"' || (a = a.slice(1, -1));
          try {
            var m = t(l[0]);
            if (a = (o.read || o)(a, m) || t(a), u)
              try {
                a = JSON.parse(a);
              } catch {
              }
            if (c[m] = a, d === m)
              break;
          } catch {
          }
        }
        return d ? c[d] : c;
      }
    }
    return r.set = i, r.get = function(d) {
      return s(d, !1);
    }, r.getJSON = function(d) {
      return s(d, !0);
    }, r.remove = function(d, u) {
      i(d, "", e(u, { expires: -1 }));
    }, r.defaults = {}, r.withConverter = n, r;
  }(function() {
  });
};
const et = { exports: {} }.exports = Kt(), Xt = function() {
  try {
    return !Boolean(window.top.location.href);
  } catch {
    return !0;
  }
}(), Vn = !!Xt, Yn = Xt ? "None" : "Lax";
class Gt {
  constructor({ ttl: t = 365, secure: n = Vn, sameSite: o = Yn } = {}) {
    return this.ttl = t, this.secure = n, this.sameSite = o, (async () => this)();
  }
  async get(t) {
    const n = et.get(t);
    return typeof n == "string" ? n : void 0;
  }
  async set(t, n) {
    et.set(t, n, this._constructCookieParams());
  }
  async remove(t) {
    et.remove(t, this._constructCookieParams());
  }
  _constructCookieParams() {
    return { expires: this.ttl, secure: this.secure, sameSite: this.sameSite };
  }
}
class Zt {
  constructor(t = "keyval-store", n = "keyval") {
    this.storeName = n, this._dbp = new Promise((o, r) => {
      const i = indexedDB.open(t, 1);
      i.onerror = () => r(i.error), i.onsuccess = () => o(i.result), i.onupgradeneeded = () => {
        i.result.createObjectStore(n);
      };
    });
  }
  _withIDBStore(t, n) {
    return this._dbp.then((o) => new Promise((r, i) => {
      const s = o.transaction(this.storeName, t);
      s.oncomplete = () => r(), s.onabort = s.onerror = () => i(s.error), n(s.objectStore(this.storeName));
    }));
  }
}
let tt;
function nt() {
  return tt || (tt = new Zt()), tt;
}
class Qt {
  constructor(t = "ImmortalDB", n = "key-value-pairs") {
    return this.store = new Zt(t, n), (async () => {
      try {
        await this.store._dbp;
      } catch (o) {
        if (o.name === "SecurityError")
          return null;
        throw o;
      }
      return this;
    })();
  }
  async get(t) {
    const n = await function(o, r = nt()) {
      let i;
      return r._withIDBStore("readonly", (s) => {
        i = s.get(o);
      }).then(() => i.result);
    }(t, this.store);
    return typeof n == "string" ? n : void 0;
  }
  async set(t, n) {
    await function(o, r, i = nt()) {
      return i._withIDBStore("readwrite", (s) => {
        s.put(r, o);
      });
    }(t, n, this.store);
  }
  async remove(t) {
    await function(n, o = nt()) {
      return o._withIDBStore("readwrite", (r) => {
        r.delete(n);
      });
    }(t, this.store);
  }
}
class en {
  constructor(t) {
    return this.store = t, (async () => this)();
  }
  async get(t) {
    const n = this.store.getItem(t);
    return typeof n == "string" ? n : void 0;
  }
  async set(t, n) {
    this.store.setItem(t, n);
  }
  async remove(t) {
    this.store.removeItem(t);
  }
}
class tn extends en {
  constructor() {
    super(window.localStorage);
  }
}
const ot = console.log, nn = typeof window < "u", Ke = [Gt];
try {
  nn && window.indexedDB && Ke.push(Qt);
} catch {
}
try {
  nn && window.localStorage && Ke.push(tn);
} catch {
}
function Pt(e, t, n = null) {
  return t in e ? e[t] : n;
}
class on {
  constructor(t = Ke) {
    this.stores = [], this.onReady = (async () => {
      this.stores = (await Promise.all(t.map(async (n) => {
        if (typeof n == "object")
          return n;
        try {
          return await new n();
        } catch {
          return null;
        }
      }))).filter(Boolean);
    })();
  }
  async get(t, n = null) {
    await this.onReady;
    const o = `_immortal|${t}`, r = await Promise.all(this.stores.map(async (h) => {
      try {
        return await h.get(o);
      } catch (l) {
        ot(l);
      }
    })), i = Array.from(function(h) {
      const l = /* @__PURE__ */ new Map();
      let a = h.slice();
      for (const m of a) {
        let f = 0;
        for (const p of a)
          m === p && (f += 1);
        f > 0 && (l.set(m, f), a = a.filter((p) => p !== m));
      }
      return l;
    }(r).entries());
    let s;
    i.sort((h, l) => h[1] <= l[1]);
    const [d, u] = Pt(i, 0, [void 0, 0]), [c, g] = Pt(i, 1, [void 0, 0]);
    return s = u > g || u === g && d !== void 0 ? d : c, s !== void 0 ? (await this.set(t, s), s) : (await this.remove(t), n);
  }
  async set(t, n) {
    return await this.onReady, t = `_immortal|${t}`, await Promise.all(this.stores.map(async (o) => {
      try {
        await o.set(t, n);
      } catch (r) {
        ot(r);
      }
    })), n;
  }
  async remove(t) {
    await this.onReady, t = `_immortal|${t}`, await Promise.all(this.stores.map(async (n) => {
      try {
        await n.remove(t);
      } catch (o) {
        ot(o);
      }
    }));
  }
}
const Jn = new on(), Kn = Object.freeze(Object.defineProperty({ __proto__: null, ImmortalDB: Jn, ImmortalStorage: on, CookieStore: Gt, IndexedDbStore: Qt, LocalStorageStore: tn, SessionStorageStore: class extends en {
  constructor() {
    super(window.sessionStorage);
  }
}, DEFAULT_STORES: Ke, DEFAULT_KEY_PREFIX: "_immortal|" }, Symbol.toStringTag, { value: "Module" }));
export {
  Xn as default
};

function t(){}function e(t){return t()}function n(){return Object.create(null)}function r(t){t.forEach(e)}function o(t){return"function"==typeof t}function s(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function i(t,e,n,r){return t[1]&&r?function(t,e){for(const n in e)t[n]=e[n];return t}(n.ctx.slice(),t[1](r(e))):n.ctx}function a(t,e){t.appendChild(e)}function c(t,e,n){const r=function(t){if(!t)return document;const e=t.getRootNode?t.getRootNode():t.ownerDocument;if(e&&e.host)return e;return t.ownerDocument}(t);if(!r.getElementById(e)){const t=d("style");t.id=e,t.textContent=n,function(t,e){a(t.head||t,e),e.sheet}(r,t)}}function l(t,e,n){t.insertBefore(e,n||null)}function u(t){t.parentNode&&t.parentNode.removeChild(t)}function d(t){return document.createElement(t)}function h(t){return document.createTextNode(t)}function f(){return h(" ")}function p(t,e,n,r){return t.addEventListener(e,n,r),()=>t.removeEventListener(e,n,r)}function w(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function g(t,e,n){t.classList[n?"add":"remove"](e)}let m;function v(t){m=t}function y(t){(function(){if(!m)throw new Error("Function called outside component initialization");return m})().$$.on_mount.push(t)}const b=[],x=[],q=[],$=[],k=Promise.resolve();let S=!1;function _(t){q.push(t)}const E=new Set;let D=0;function C(){const t=m;do{for(;D<b.length;){const t=b[D];D++,v(t),A(t.$$)}for(v(null),b.length=0,D=0;x.length;)x.pop()();for(let t=0;t<q.length;t+=1){const e=q[t];E.has(e)||(E.add(e),e())}q.length=0}while(b.length);for(;$.length;)$.pop()();S=!1,E.clear(),v(t)}function A(t){if(null!==t.fragment){t.update(),r(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(_)}}const B=new Set;let N;function I(t,e){t&&t.i&&(B.delete(t),t.i(e))}function R(t,e,n,r){if(t&&t.o){if(B.has(t))return;B.add(t),N.c.push((()=>{B.delete(t),r&&(n&&t.d(1),r())})),t.o(e)}else r&&r()}function L(t,n,s,i){const{fragment:a,after_update:c}=t.$$;a&&a.m(n,s),i||_((()=>{const n=t.$$.on_mount.map(e).filter(o);t.$$.on_destroy?t.$$.on_destroy.push(...n):r(n),t.$$.on_mount=[]})),c.forEach(_)}function U(t,e){const n=t.$$;null!==n.fragment&&(r(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function M(t,e){-1===t.$$.dirty[0]&&(b.push(t),S||(S=!0,k.then(C)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function z(e,o,s,i,a,c,l,d=[-1]){const h=m;v(e);const f=e.$$={fragment:null,ctx:[],props:c,update:t,not_equal:a,bound:n(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(o.context||(h?h.$$.context:[])),callbacks:n(),dirty:d,skip_bound:!1,root:o.target||h.$$.root};l&&l(f.root);let p=!1;if(f.ctx=s?s(e,o.props||{},((t,n,...r)=>{const o=r.length?r[0]:n;return f.ctx&&a(f.ctx[t],f.ctx[t]=o)&&(!f.skip_bound&&f.bound[t]&&f.bound[t](o),p&&M(e,t)),n})):[],f.update(),p=!0,r(f.before_update),f.fragment=!!i&&i(f.ctx),o.target){if(o.hydrate){const t=function(t){return Array.from(t.childNodes)}(o.target);f.fragment&&f.fragment.l(t),t.forEach(u)}else f.fragment&&f.fragment.c();o.intro&&I(e.$$.fragment),L(e,o.target,o.anchor,o.customElement),C()}v(h)}class P{$destroy(){U(this,1),this.$destroy=t}$on(e,n){if(!o(n))return t;const r=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return r.push(n),()=>{const t=r.indexOf(n);-1!==t&&r.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}function T(t,e,n,r){var o,s=null==(o=r)||"number"==typeof o||"boolean"==typeof o?r:n(r),i=e.get(s);return void 0===i&&(i=t.call(this,r),e.set(s,i)),i}function O(t,e,n){var r=Array.prototype.slice.call(arguments,3),o=n(r),s=e.get(o);return void 0===s&&(s=t.apply(this,r),e.set(o,s)),s}const j=JSON.stringify;function H(){this.cache=Object.create(null)}H.prototype.has=function(t){return t in this.cache},H.prototype.get=function(t){return this.cache[t]},H.prototype.set=function(t,e){this.cache[t]=e};const F=(t,e={})=>{let{bounds:n,axis:r="both",gpuAcceleration:o=!0,applyUserSelectHack:s=!0,disabled:i=!1,ignoreMultitouch:a=!1,grid:c,position:l,cancel:u,handle:d,defaultClass:h="neodrag",defaultClassDragging:f="neodrag-dragging",defaultClassDragged:p="neodrag-dragged",defaultPosition:w={x:0,y:0},onDragStart:g,onDrag:m,onDragEnd:v}=e;const y=new Promise(requestAnimationFrame);let b,x,q=!1,$=0,k=0,S=0,_=0,E=0,D=0,{x:C,y:A}=l?{x:l?.x??0,y:l?.y??0}:w;Z(C,A,t,o);let B,N,I,R,L="",U=!!l;const M=document.body.style,z=t.classList,P=(e,n)=>{const r={offsetX:$,offsetY:k,domRect:t.getBoundingClientRect()};t.dispatchEvent(new CustomEvent(e,{detail:r})),n?.(r)},T=addEventListener;T("touchstart",j,!1),T("touchend",H,!1),T("touchmove",F,!1),T("mousedown",j,!1),T("mouseup",H,!1),T("mousemove",F,!1),t.style.touchAction="none";const O=()=>{let e=t.offsetWidth/N.width;return isNaN(e)&&(e=1),e};function j(e){if(i)return;if(a&&"touchstart"===e.type&&e.touches.length>1)return;if(z.add(h),I=function(t,e){if(!t)return e;if(t instanceof HTMLElement||Array.isArray(t))return t;const n=e.querySelectorAll(t);if(null===n)throw new Error("Selector passed for `handle` option should be child of the element on which the action is applied");return Array.from(n.values())}(d,t),R=function(t,e){if(!t)return;if(t instanceof HTMLElement||Array.isArray(t))return t;const n=e.querySelectorAll(t);if(null===n)throw new Error("Selector passed for `cancel` option should be child of the element on which the action is applied");return Array.from(n.values())}(u,t),b=/(both|x)/.test(r),x=/(both|y)/.test(r),void 0!==n&&(B=function(t,e){if(t instanceof HTMLElement)return t.getBoundingClientRect();if("object"==typeof t){const{top:e=0,left:n=0,right:r=0,bottom:o=0}=t;return{top:e,right:window.innerWidth-r,bottom:window.innerHeight-o,left:n}}if("parent"===t)return e.parentNode.getBoundingClientRect();const n=document.querySelector(t);if(null===n)throw new Error("The selector provided for bound doesn't exists in the document.");return n.getBoundingClientRect()}(n,t)),N=t.getBoundingClientRect(),Y(d)&&Y(u)&&d===u)throw new Error("`handle` selector can't be same as `cancel` selector");if(K(R,I))throw new Error("Element being dragged can't be a child of the element on which `cancel` is applied");if((I instanceof HTMLElement?I.contains(e.target):I.some((t=>t.contains(e.target))))&&!K(R,e.target)&&(q=!0),!q)return;s&&(L=M.userSelect,M.userSelect="none"),P("neodrag:start",g);const{clientX:o,clientY:c}=J(e)?e.touches[0]:e,l=O();b&&(S=o-C/l),x&&(_=c-A/l),B&&(E=o-N.left,D=c-N.top)}function H(){q&&(z.remove(f),z.add(p),s&&(M.userSelect=L),P("neodrag:end",v),b&&(S=$),b&&(_=k),q=!1)}function F(e){if(!q)return;z.add(f),e.preventDefault(),N=t.getBoundingClientRect();const{clientX:n,clientY:r}=J(e)?e.touches[0]:e;let s=n,i=r;const a=O();if(B){const t={left:B.left+E,top:B.top+D,right:B.right+E-N.width,bottom:B.bottom+D-N.height};s=X(s,t.left,t.right),i=X(i,t.top,t.bottom)}if(Array.isArray(c)){let[t,e]=c;if(isNaN(+t)||t<0)throw new Error("1st argument of `grid` must be a valid positive number");if(isNaN(+e)||e<0)throw new Error("2nd argument of `grid` must be a valid positive number");let n=s-S,r=i-_;[n,r]=G([t/a,e/a],n,r),s=S+n,i=_+r}b&&($=Math.round((s-S)*a)),x&&(k=Math.round((i-_)*a)),C=$,A=k,P("neodrag",m),y.then((()=>Z($,k,t,o)))}return{destroy:()=>{const t=removeEventListener;t("touchstart",j,!1),t("touchend",H,!1),t("touchmove",F,!1),t("mousedown",j,!1),t("mouseup",H,!1),t("mousemove",F,!1)},update:e=>{r=e.axis||"both",i=e.disabled??!1,a=e.ignoreMultitouch??!1,d=e.handle,n=e.bounds,u=e.cancel,s=e.applyUserSelectHack??!0,c=e.grid,o=e.gpuAcceleration??!0;const l=z.contains(p);z.remove(h,p),h=e.defaultClass??"neodrag",f=e.defaultClassDragging??"neodrag-dragging",p=e.defaultClassDragged??"neodrag-dragged",z.add(h),l&&z.add(p),U&&(C=$=e.position?.x??$,A=k=e.position?.y??k,y.then((()=>Z($,k,t,o))))}}},J=t=>!!t.touches?.length,X=(t,e,n)=>Math.min(Math.max(t,e),n),Y=t=>"string"==typeof t,G=(W=([t,e],n,r)=>{const o=(t,e)=>Math.ceil(t/e)*e;return[o(n,t),o(r,e)]},function(t,e){return function(t,e,n,r,o){return n.bind(e,t,r,o)}(t,this,1===t.length?T:O,e.cache.create(),e.serializer)}(W,{cache:{create:function(){return new H}},serializer:j}));var W;function K(t,e){const n=e instanceof HTMLElement?[e]:e;return t instanceof HTMLElement?n.some((e=>t.contains(e))):!!Array.isArray(t)&&t.some((t=>n.some((e=>t.contains(e)))))}function Z(t,e,n,r){n.style.transform=r?`translate3d(${+t}px, ${+e}px, 0)`:`translate(${+t}px, ${+e}px)`}function Q(t){c(t,"svelte-189qcdl","svg.svelte-189qcdl{width:auto;height:2em;display:block}")}function V(e){let n;return{c(){n=d("div"),n.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1440 1440" width="100" height="100" class="svelte-189qcdl"><defs></defs><defs><path id="a" d="M258 1321c9-304 6-917 0-1191 52-161 1082-280 1083 330 1 609-618 545-701 538-2 67-2 208 0 422-222 56-349 23-382-99z"></path><path id="c" d="M1122 560c-107 223-284 293-529 209l-38 79c-1 2-4 2-5-1l-99-287c-1-5 1-11 6-13l273-106c3-1 6 2 5 5l-36 75c70 126 211 139 423 39z"></path><path id="d" d="M451 447c107-223 284-292 529-209l38-78c1-3 5-2 5 0l99 288c1 5-1 10-6 12L843 567c-3 1-6-3-5-6l37-75c-71-126-212-139-424-39z"></path><radialGradient id="b" cx="992.3" cy="174.2" r="1312.8" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="#69ed66"></stop><stop offset="100%" stop-color="#279c19"></stop></radialGradient></defs><use fill="url(#b)" xlink:href="#a"></use><use fill="#fff" xlink:href="#c"></use><use fill="#fff" xlink:href="#d"></use></svg>'},m(t,e){l(t,n,e)},p:t,i:t,o:t,d(t){t&&u(n)}}}class tt extends P{constructor(t){super(),z(this,t,null,V,s,{},Q)}}function et(t){c(t,"svelte-1q1h4lu",".svelte-1q1h4lu.svelte-1q1h4lu,.svelte-1q1h4lu.svelte-1q1h4lu::before,.svelte-1q1h4lu.svelte-1q1h4lu::after{box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}.svelte-1q1h4lu.svelte-1q1h4lu::before,.svelte-1q1h4lu.svelte-1q1h4lu::after{--tw-content:''}.svelte-1q1h4lu.svelte-1q1h4lu:-moz-focusring{outline:auto}.svelte-1q1h4lu.svelte-1q1h4lu:-moz-ui-invalid{box-shadow:none}.svelte-1q1h4lu.svelte-1q1h4lu::-webkit-inner-spin-button,.svelte-1q1h4lu.svelte-1q1h4lu::-webkit-outer-spin-button{height:auto}.svelte-1q1h4lu.svelte-1q1h4lu::-webkit-search-decoration{-webkit-appearance:none}.svelte-1q1h4lu.svelte-1q1h4lu::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}.svelte-1q1h4lu.svelte-1q1h4lu:disabled{cursor:default}.svelte-1q1h4lu.svelte-1q1h4lu,.svelte-1q1h4lu.svelte-1q1h4lu::before,.svelte-1q1h4lu.svelte-1q1h4lu::after{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x:  ;--tw-pan-y:  ;--tw-pinch-zoom:  ;--tw-scroll-snap-strictness:proximity;--tw-ordinal:  ;--tw-slashed-zero:  ;--tw-numeric-figure:  ;--tw-numeric-spacing:  ;--tw-numeric-fraction:  ;--tw-ring-inset:  ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgb(59 130 246 / 0.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur:  ;--tw-brightness:  ;--tw-contrast:  ;--tw-grayscale:  ;--tw-hue-rotate:  ;--tw-invert:  ;--tw-saturate:  ;--tw-sepia:  ;--tw-drop-shadow:  ;--tw-backdrop-blur:  ;--tw-backdrop-brightness:  ;--tw-backdrop-contrast:  ;--tw-backdrop-grayscale:  ;--tw-backdrop-hue-rotate:  ;--tw-backdrop-invert:  ;--tw-backdrop-opacity:  ;--tw-backdrop-saturate:  ;--tw-backdrop-sepia:  }.svelte-1q1h4lu.svelte-1q1h4lu::backdrop{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x:  ;--tw-pan-y:  ;--tw-pinch-zoom:  ;--tw-scroll-snap-strictness:proximity;--tw-ordinal:  ;--tw-slashed-zero:  ;--tw-numeric-figure:  ;--tw-numeric-spacing:  ;--tw-numeric-fraction:  ;--tw-ring-inset:  ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgb(59 130 246 / 0.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur:  ;--tw-brightness:  ;--tw-contrast:  ;--tw-grayscale:  ;--tw-hue-rotate:  ;--tw-invert:  ;--tw-saturate:  ;--tw-sepia:  ;--tw-drop-shadow:  ;--tw-backdrop-blur:  ;--tw-backdrop-brightness:  ;--tw-backdrop-contrast:  ;--tw-backdrop-grayscale:  ;--tw-backdrop-hue-rotate:  ;--tw-backdrop-invert:  ;--tw-backdrop-opacity:  ;--tw-backdrop-saturate:  ;--tw-backdrop-sepia:  }.container.svelte-1q1h4lu.svelte-1q1h4lu{width:100%}@media(min-width: 640px){.container.svelte-1q1h4lu.svelte-1q1h4lu{max-width:640px}}@media(min-width: 768px){.container.svelte-1q1h4lu.svelte-1q1h4lu{max-width:768px}}@media(min-width: 1024px){.container.svelte-1q1h4lu.svelte-1q1h4lu{max-width:1024px}}@media(min-width: 1280px){.container.svelte-1q1h4lu.svelte-1q1h4lu{max-width:1280px}}@media(min-width: 1536px){.container.svelte-1q1h4lu.svelte-1q1h4lu{max-width:1536px}}.w-screen.svelte-1q1h4lu.svelte-1q1h4lu{width:100vw}.container.svelte-1q1h4lu.svelte-1q1h4lu{display:flex;align-items:center;position:absolute;top:0px;right:0px;z-index:50;cursor:pointer;margin:1em;opacity:0.95;width:auto}.menu-icon.svelte-1q1h4lu.svelte-1q1h4lu{display:inline-block}.bar1.svelte-1q1h4lu.svelte-1q1h4lu,.bar2.svelte-1q1h4lu.svelte-1q1h4lu,.bar3.svelte-1q1h4lu.svelte-1q1h4lu{width:35px;height:5px;background-color:#0bb113;margin:6px 0;transition:0.4s}.change.svelte-1q1h4lu .bar1.svelte-1q1h4lu{transform:rotate(-45deg) translate(-9px, 6px)}.change.svelte-1q1h4lu .bar2.svelte-1q1h4lu{opacity:0}.change.svelte-1q1h4lu .bar3.svelte-1q1h4lu{transform:rotate(45deg) translate(-8px, -8px)}.sidenav.svelte-1q1h4lu.svelte-1q1h4lu{position:fixed;top:0;right:0;height:15%;width:0;z-index:40;background-color:#111;overflow-x:inherit;padding-top:30px;transition:0.25s}.open.svelte-1q1h4lu.svelte-1q1h4lu{width:80%;height:100%;overflow-x:scroll}.mask.svelte-1q1h4lu.svelte-1q1h4lu{height:100%;position:fixed;top:0;left:0;opacity:0.5;background-color:#444;transition:0.4s}@media screen and (max-height: 450px){.sidenav.svelte-1q1h4lu.svelte-1q1h4lu{padding-top:15px}}@media(min-width: 640px){}")}const nt=t=>({saveInputURL:8&t,url:1&t}),rt=t=>({openNav:t[7],hideNav:t[6],saveInputURL:t[3],url:t[0]});function ot(t){let e,n;const r=t[9].default,o=function(t,e,n,r){if(t){const o=i(t,e,n,r);return t[0](o)}}(r,t,t[8],rt);return{c(){e=d("div"),o&&o.c(),w(e,"class","sidenav svelte-1q1h4lu"),g(e,"open",t[2])},m(t,r){l(t,e,r),o&&o.m(e,null),n=!0},p(t,s){o&&o.p&&(!n||265&s)&&function(t,e,n,r,o,s){if(o){const a=i(e,n,r,s);t.p(a,o)}}(o,r,t,t[8],n?function(t,e,n,r){if(t[2]&&r){const o=t[2](r(n));if(void 0===e.dirty)return o;if("object"==typeof o){const t=[],n=Math.max(e.dirty.length,o.length);for(let r=0;r<n;r+=1)t[r]=e.dirty[r]|o[r];return t}return e.dirty|o}return e.dirty}(r,t[8],s,nt):function(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let t=0;t<n;t++)e[t]=-1;return e}return-1}(t[8]),rt),(!n||4&s)&&g(e,"open",t[2])},i(t){n||(I(o,t),n=!0)},o(t){R(o,t),n=!1},d(t){t&&u(e),o&&o.d(t)}}}function st(e){let n,s,i,c,m,v,y,b,x,q,$;s=new tt({});let k=e[1]&&ot(e);return{c(){var t;n=d("div"),(t=s.$$.fragment)&&t.c(),i=f(),c=d("div"),c.innerHTML='<div class="bar1 svelte-1q1h4lu"></div> \n\t\t<div class="bar2 svelte-1q1h4lu"></div> \n\t\t<div class="bar3 svelte-1q1h4lu"></div>',m=f(),v=d("div"),y=f(),k&&k.c(),b=h(""),w(c,"class","menu-icon svelte-1q1h4lu"),w(n,"class","container svelte-1q1h4lu"),g(n,"change",e[2]),w(v,"class","w-screen svelte-1q1h4lu"),g(v,"mask",e[2])},m(r,u){var d;l(r,n,u),L(s,n,null),a(n,i),a(n,c),l(r,m,u),l(r,v,u),l(r,y,u),k&&k.m(r,u),l(r,b,u),x=!0,q||($=[p(n,"keypress",e[4]),p(n,"click",e[4]),(d=F.call(null,n),d&&o(d.destroy)?d.destroy:t),p(v,"keypress",e[5]),p(v,"click",e[5])],q=!0)},p(t,[e]){(!x||4&e)&&g(n,"change",t[2]),(!x||4&e)&&g(v,"mask",t[2]),t[1]?k?(k.p(t,e),2&e&&I(k,1)):(k=ot(t),k.c(),I(k,1),k.m(b.parentNode,b)):k&&(N={r:0,c:[],p:N},R(k,1,1,(()=>{k=null})),N.r||r(N.c),N=N.p)},i(t){x||(I(s.$$.fragment,t),I(k),x=!0)},o(t){R(s.$$.fragment,t),R(k),x=!1},d(t){t&&u(n),U(s),t&&u(m),t&&u(v),t&&u(y),k&&k.d(t),t&&u(b),q=!1,r($)}}}function it(t,e,n){let r,o,s,{$$slots:i={},$$scope:a}=e,{inputUrl:c}=e;y((async()=>{if(void 0===window.indexedDB)return void console.log("IndexedDB not available");const{ImmortalDB:t}=await Promise.resolve().then((function(){return Et}));n(3,s=async e=>{const n=e.detail;try{await t.set("INPUT_URL",n)}catch(t){console.warn("Did not save",n,t)}});try{const e=await t.get("INPUT_URL",null);e&&!c&&n(0,c=e)}catch(t){console.warn("Did not get",t)}n(1,r=!0)}));return t.$$set=t=>{"inputUrl"in t&&n(0,c=t.inputUrl),"$$scope"in t&&n(8,a=t.$$scope)},[c,r,o,s,function(){n(2,o=!o)},function(t){n(2,o=!1)},function(){n(2,o=!1)},()=>n(2,o=!0),a,i]}class at extends P{constructor(t){super(),z(this,t,it,st,s,{inputUrl:0},et)}}var ct,lt={exports:{}};
/*!
 * JavaScript Cookie v2.2.1
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */ct=function(){function t(){for(var t=0,e={};t<arguments.length;t++){var n=arguments[t];for(var r in n)e[r]=n[r]}return e}function e(t){return t.replace(/(%[0-9A-Z]{2})+/g,decodeURIComponent)}return function n(r){function o(){}function s(e,n,s){if("undefined"!=typeof document){"number"==typeof(s=t({path:"/"},o.defaults,s)).expires&&(s.expires=new Date(1*new Date+864e5*s.expires)),s.expires=s.expires?s.expires.toUTCString():"";try{var i=JSON.stringify(n);/^[\{\[]/.test(i)&&(n=i)}catch(t){}n=r.write?r.write(n,e):encodeURIComponent(String(n)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent),e=encodeURIComponent(String(e)).replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent).replace(/[\(\)]/g,escape);var a="";for(var c in s)s[c]&&(a+="; "+c,!0!==s[c]&&(a+="="+s[c].split(";")[0]));return document.cookie=e+"="+n+a}}function i(t,n){if("undefined"!=typeof document){for(var o={},s=document.cookie?document.cookie.split("; "):[],i=0;i<s.length;i++){var a=s[i].split("="),c=a.slice(1).join("=");n||'"'!==c.charAt(0)||(c=c.slice(1,-1));try{var l=e(a[0]);if(c=(r.read||r)(c,l)||e(c),n)try{c=JSON.parse(c)}catch(t){}if(o[l]=c,t===l)break}catch(t){}}return t?o[t]:o}}return o.set=s,o.get=function(t){return i(t,!1)},o.getJSON=function(t){return i(t,!0)},o.remove=function(e,n){s(e,"",t(n,{expires:-1}))},o.defaults={},o.withConverter=n,o}((function(){}))};var ut=lt.exports=ct();const dt=function(){try{return!Boolean(window.top.location.href)}catch(t){return!0}}(),ht=!!dt,ft=dt?"None":"Lax";class pt{constructor({ttl:t=365,secure:e=ht,sameSite:n=ft}={}){return this.ttl=t,this.secure=e,this.sameSite=n,(async()=>this)()}async get(t){const e=ut.get(t);return"string"==typeof e?e:void 0}async set(t,e){ut.set(t,e,this._constructCookieParams())}async remove(t){ut.remove(t,this._constructCookieParams())}_constructCookieParams(){return{expires:this.ttl,secure:this.secure,sameSite:this.sameSite}}}class wt{constructor(t="keyval-store",e="keyval"){this.storeName=e,this._dbp=new Promise(((n,r)=>{const o=indexedDB.open(t,1);o.onerror=()=>r(o.error),o.onsuccess=()=>n(o.result),o.onupgradeneeded=()=>{o.result.createObjectStore(e)}}))}_withIDBStore(t,e){return this._dbp.then((n=>new Promise(((r,o)=>{const s=n.transaction(this.storeName,t);s.oncomplete=()=>r(),s.onabort=s.onerror=()=>o(s.error),e(s.objectStore(this.storeName))}))))}}let gt;function mt(){return gt||(gt=new wt),gt}class vt{constructor(t="ImmortalDB",e="key-value-pairs"){return this.store=new wt(t,e),(async()=>{try{await this.store._dbp}catch(t){if("SecurityError"===t.name)return null;throw t}return this})()}async get(t){const e=await function(t,e=mt()){let n;return e._withIDBStore("readonly",(e=>{n=e.get(t)})).then((()=>n.result))}(t,this.store);return"string"==typeof e?e:void 0}async set(t,e){await function(t,e,n=mt()){return n._withIDBStore("readwrite",(n=>{n.put(e,t)}))}(t,e,this.store)}async remove(t){await function(t,e=mt()){return e._withIDBStore("readwrite",(e=>{e.delete(t)}))}(t,this.store)}}class yt{constructor(t){return this.store=t,(async()=>this)()}async get(t){const e=this.store.getItem(t);return"string"==typeof e?e:void 0}async set(t,e){this.store.setItem(t,e)}async remove(t){this.store.removeItem(t)}}class bt extends yt{constructor(){super(window.localStorage)}}const xt=console.log,qt="undefined"!=typeof window,$t=[pt];try{qt&&window.indexedDB&&$t.push(vt)}catch(t){}try{qt&&window.localStorage&&$t.push(bt)}catch(t){}function kt(t,e,n=null){return e in t?t[e]:n}class St{constructor(t=$t){this.stores=[],this.onReady=(async()=>{this.stores=(await Promise.all(t.map((async t=>{if("object"==typeof t)return t;try{return await new t}catch(t){return null}})))).filter(Boolean)})()}async get(t,e=null){await this.onReady;const n=`_immortal|${t}`,r=await Promise.all(this.stores.map((async t=>{try{return await t.get(n)}catch(t){xt(t)}}))),o=Array.from(function(t){const e=new Map;let n=t.slice();for(const t of n){let r=0;for(const e of n)t===e&&(r+=1);r>0&&(e.set(t,r),n=n.filter((e=>e!==t)))}return e}(r).entries());let s;o.sort(((t,e)=>t[1]<=e[1]));const[i,a]=kt(o,0,[void 0,0]),[c,l]=kt(o,1,[void 0,0]);return s=a>l||a===l&&void 0!==i?i:c,void 0!==s?(await this.set(t,s),s):(await this.remove(t),e)}async set(t,e){return await this.onReady,t=`_immortal|${t}`,await Promise.all(this.stores.map((async n=>{try{await n.set(t,e)}catch(t){xt(t)}}))),e}async remove(t){await this.onReady,t=`_immortal|${t}`,await Promise.all(this.stores.map((async e=>{try{await e.remove(t)}catch(t){xt(t)}})))}}const _t=new St;var Et=Object.freeze({__proto__:null,ImmortalDB:_t,ImmortalStorage:St,CookieStore:pt,IndexedDbStore:vt,LocalStorageStore:bt,SessionStorageStore:class extends yt{constructor(){super(window.sessionStorage)}},DEFAULT_STORES:$t,DEFAULT_KEY_PREFIX:"_immortal|"});export{at as default};

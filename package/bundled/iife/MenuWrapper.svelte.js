this.MenuWrapper = this.MenuWrapper || {};
this.MenuWrapper.svelte = (function () {
    'use strict';

    function noop() { }
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
        if (slot_changes) {
            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
            slot.p(slot_context, slot_changes);
        }
    }
    function get_all_dirty_from_scope($$scope) {
        if ($$scope.ctx.length > 32) {
            const dirty = [];
            const length = $$scope.ctx.length / 32;
            for (let i = 0; i < length; i++) {
                dirty[i] = -1;
            }
            return dirty;
        }
        return -1;
    }
    function action_destroyer(action_result) {
        return action_result && is_function(action_result.destroy) ? action_result.destroy : noop;
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function append_styles(target, style_sheet_id, styles) {
        const append_styles_to = get_root_for_style(target);
        if (!append_styles_to.getElementById(style_sheet_id)) {
            const style = element('style');
            style.id = style_sheet_id;
            style.textContent = styles;
            append_stylesheet(append_styles_to, style);
        }
    }
    function get_root_for_style(node) {
        if (!node)
            return document;
        const root = node.getRootNode ? node.getRootNode() : node.ownerDocument;
        if (root && root.host) {
            return root;
        }
        return node.ownerDocument;
    }
    function append_stylesheet(node, style) {
        append(node.head || node, style);
        return style.sheet;
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function toggle_class(element, name, toggle) {
        element.classList[toggle ? 'add' : 'remove'](name);
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            while (flushidx < dirty_components.length) {
                const component = dirty_components[flushidx];
                flushidx++;
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
        else if (callback) {
            callback();
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function e(e,t,n,o){var r,i=null==(r=o)||"number"==typeof r||"boolean"==typeof r?o:n(o),a=t.get(i);return void 0===a&&(a=e.call(this,o),t.set(i,a)),a}function t(e,t,n){var o=Array.prototype.slice.call(arguments,3),r=n(o),i=t.get(r);return void 0===i&&(i=e.apply(this,o),t.set(r,i)),i}function n(n,o){return function(e,t,n,o,r){return n.bind(t,e,o,r)}(n,this,1===n.length?e:t,o.cache.create(),o.serializer)}const o=JSON.stringify;function r(){this.cache=Object.create(null);}r.prototype.has=function(e){return e in this.cache},r.prototype.get=function(e){return this.cache[e]},r.prototype.set=function(e,t){this.cache[e]=t;};var i={create:function(){return new r}};const a=(e,t={})=>{let{bounds:n,axis:o="both",gpuAcceleration:r=!0,applyUserSelectHack:i=!0,disabled:a=!1,ignoreMultitouch:d=!1,grid:h,position:f,cancel:g,handle:y,defaultClass:b="neodrag",defaultClassDragging:w="neodrag-dragging",defaultClassDragged:v="neodrag-dragged",defaultPosition:E={x:0,y:0},onDragStart:A,onDrag:x,onDragEnd:C}=t;const M=new Promise(requestAnimationFrame);let S,H,L=!1,D=0,N=0,R=0,T=0,B=0,q=0,{x:$,y:z}=f?{x:f?.x??0,y:f?.y??0}:E;m($,z,e,r);let X,Y,j,k,O="",P=!!f;const U=document.body.style,W=e.classList,F=(t,n)=>{const o={offsetX:D,offsetY:N,domRect:e.getBoundingClientRect()};e.dispatchEvent(new CustomEvent(t,{detail:o})),n?.(o);};const J=addEventListener;J("touchstart",I,!1),J("touchend",K,!1),J("touchmove",Q,!1),J("mousedown",I,!1),J("mouseup",K,!1),J("mousemove",Q,!1),e.style.touchAction="none";const G=()=>{let t=e.offsetWidth/Y.width;return isNaN(t)&&(t=1),t};function I(t){if(a)return;if(d&&"touchstart"===t.type&&t.touches.length>1)return;if(W.add(b),j=function(e,t){if(!e)return t;if(e instanceof HTMLElement||Array.isArray(e))return e;const n=t.querySelectorAll(e);if(null===n)throw new Error("Selector passed for `handle` option should be child of the element on which the action is applied");return Array.from(n.values())}(y,e),k=function(e,t){if(!e)return;if(e instanceof HTMLElement||Array.isArray(e))return e;const n=t.querySelectorAll(e);if(null===n)throw new Error("Selector passed for `cancel` option should be child of the element on which the action is applied");return Array.from(n.values())}(g,e),S=/(both|x)/.test(o),H=/(both|y)/.test(o),void 0!==n&&(X=function(e,t){if(e instanceof HTMLElement)return e.getBoundingClientRect();if("object"==typeof e){const{top:t=0,left:n=0,right:o=0,bottom:r=0}=e;return {top:t,right:window.innerWidth-o,bottom:window.innerHeight-r,left:n}}if("parent"===e)return t.parentNode.getBoundingClientRect();const n=document.querySelector(e);if(null===n)throw new Error("The selector provided for bound doesn't exists in the document.");return n.getBoundingClientRect()}(n,e)),Y=e.getBoundingClientRect(),l(y)&&l(g)&&y===g)throw new Error("`handle` selector can't be same as `cancel` selector");if(p(k,j))throw new Error("Element being dragged can't be a child of the element on which `cancel` is applied");if((j instanceof HTMLElement?j.contains(t.target):j.some((e=>e.contains(t.target))))&&!p(k,t.target)&&(L=!0),!L)return;i&&(O=U.userSelect,U.userSelect="none"),F("neodrag:start",A);const{clientX:r,clientY:c}=s(t)?t.touches[0]:t,u=G();S&&(R=r-$/u),H&&(T=c-z/u),X&&(B=r-Y.left,q=c-Y.top);}function K(){L&&(W.remove(w),W.add(v),i&&(U.userSelect=O),F("neodrag:end",C),S&&(R=D),S&&(T=N),L=!1);}function Q(t){if(!L)return;W.add(w),t.preventDefault(),Y=e.getBoundingClientRect();const{clientX:n,clientY:o}=s(t)?t.touches[0]:t;let i=n,a=o;const l=G();if(X){const e={left:X.left+B,top:X.top+q,right:X.right+B-Y.width,bottom:X.bottom+q-Y.height};i=c(i,e.left,e.right),a=c(a,e.top,e.bottom);}if(Array.isArray(h)){let[e,t]=h;if(isNaN(+e)||e<0)throw new Error("1st argument of `grid` must be a valid positive number");if(isNaN(+t)||t<0)throw new Error("2nd argument of `grid` must be a valid positive number");let n=i-R,o=a-T;[n,o]=u([Math.floor(e/l),Math.floor(t/l)],n,o),i=R+n,a=T+o;}S&&(D=(i-R)*l),H&&(N=(a-T)*l),$=D,z=N,F("neodrag",x),M.then((()=>m(D,N,e,r)));}return {destroy:()=>{const e=removeEventListener;e("touchstart",I,!1),e("touchend",K,!1),e("touchmove",Q,!1),e("mousedown",I,!1),e("mouseup",K,!1),e("mousemove",Q,!1);},update:t=>{o=t.axis||"both",a=t.disabled??!1,d=t.ignoreMultitouch??!1,y=t.handle,n=t.bounds,g=t.cancel,i=t.applyUserSelectHack??!0,h=t.grid,r=t.gpuAcceleration??!0;const s=W.contains(v);W.remove(b,v),b=t.defaultClass??"neodrag",w=t.defaultClassDragging??"neodrag-dragging",v=t.defaultClassDragged??"neodrag-dragged",W.add(b),s&&W.add(v),P&&($=D=t.position?.x??D,z=N=t.position?.y??N,M.then((()=>m(D,N,e,r))));}}},s=e=>!!e.touches?.length,c=(e,t,n)=>Math.min(Math.max(e,t),n),l=e=>"string"==typeof e,u=(d=([e,t],n,o)=>{const r=(e,t)=>Math.round(e/t)*t;return [r(n,e),r(o,t)]},f=h?.cache??i,g=h?.serializer??o,(h?.strategy??n)(d,{cache:f,serializer:g}));var d,h,f,g;function p(e,t){const n=t instanceof HTMLElement?[t]:t;return e instanceof HTMLElement?n.some((t=>e.contains(t))):!!Array.isArray(e)&&e.some((e=>n.some((t=>e.contains(t)))))}function m(e,t,n,o){n.style.transform=o?`translate3d(${+e}px, ${+t}px, 0)`:`translate(${+e}px, ${+t}px)`;}

    /* src\lib\assets\Logo.svelte generated by Svelte v3.50.1 */

    function add_css$1(target) {
    	append_styles(target, "svelte-1es2uhx", "svg.svelte-1es2uhx{width:auto;height:2em;display:block}");
    }

    function create_fragment$1(ctx) {
    	let div;

    	return {
    		c() {
    			div = element("div");
    			div.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1440 1440" width="100" height="100" class="svelte-1es2uhx"><defs></defs><defs><path id="a" d="M258 1321c9-304 6-917 0-1191 52-161 1082-280 1083 330 1 609-618 545-701 538-2 67-2 208 0 422-222 56-349 23-382-99z"></path><path id="c" d="M1122 560c-107 223-284 293-529 209l-38 79c-1 2-4 2-5-1l-99-287c-1-5 1-11 6-13l273-106c3-1 6 2 5 5l-36 75c70 126 211 139 423 39z"></path><path id="d" d="M451 447c107-223 284-292 529-209l38-78c1-3 5-2 5 0l99 288c1 5-1 10-6 12L843 567c-3 1-6-3-5-6l37-75c-71-126-212-139-424-39z"></path><radialGradient id="b" cx="992.3" cy="174.2" r="1312.8" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="#69ed66"></stop><stop offset="100%" stop-color="#279c19"></stop></radialGradient></defs><use fill="url(#b)" xlink:href="#a"></use><use fill="#fff" xlink:href="#c"></use><use fill="#fff" xlink:href="#d"></use></svg>`;
    		},
    		m(target, anchor) {
    			insert(target, div, anchor);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d(detaching) {
    			if (detaching) detach(div);
    		}
    	};
    }

    class Logo extends SvelteComponent {
    	constructor(options) {
    		super();
    		init(this, options, null, create_fragment$1, safe_not_equal, {}, add_css$1);
    	}
    }

    /* src\lib\MenuWrapper.svelte generated by Svelte v3.50.1 */

    function add_css(target) {
    	append_styles(target, "svelte-epqmvq", ".container.svelte-epqmvq.svelte-epqmvq{display:flex;align-items:center;position:absolute;top:15px;right:6px;z-index:100;cursor:pointer;margin:1.618em;opacity:0.95;width:auto}.menu-icon.svelte-epqmvq.svelte-epqmvq{display:inline-block}.bar1.svelte-epqmvq.svelte-epqmvq,.bar2.svelte-epqmvq.svelte-epqmvq,.bar3.svelte-epqmvq.svelte-epqmvq{width:35px;height:5px;background-color:#0bb113;margin:6px 0;transition:0.4s}.change.svelte-epqmvq .bar1.svelte-epqmvq{-webkit-transform:rotate(-45deg) translate(-9px, 6px);transform:rotate(-45deg) translate(-9px, 6px)}.change.svelte-epqmvq .bar2.svelte-epqmvq{opacity:0}.change.svelte-epqmvq .bar3.svelte-epqmvq{-webkit-transform:rotate(45deg) translate(-8px, -8px);transform:rotate(45deg) translate(-8px, -8px)}.sidenav.svelte-epqmvq.svelte-epqmvq{position:fixed;top:0;right:0;height:15%;width:0;z-index:50;background-color:#111;overflow-x:inherit;padding-top:30px;transition:0.25s}.open.svelte-epqmvq.svelte-epqmvq{width:80%;height:100%;overflow-x:scroll}.mask.svelte-epqmvq.svelte-epqmvq{width:100%;height:100%;position:fixed;top:0;left:0;opacity:0.5;background-color:#444;transition:0.4s}@media screen and (max-height: 450px){.sidenav.svelte-epqmvq.svelte-epqmvq{padding-top:15px}}");
    }

    const get_default_slot_changes = dirty => ({
    	saveInputURL: dirty & /*saveInputURL*/ 8,
    	inputUrl: dirty & /*inputUrl*/ 1
    });

    const get_default_slot_context = ctx => ({
    	openNav: /*openNav*/ ctx[7],
    	hideNav: /*hideNav*/ ctx[6],
    	saveInputURL: /*saveInputURL*/ ctx[3],
    	inputUrl: /*inputUrl*/ ctx[0]
    });

    // (68:0) {#if ready}
    function create_if_block(ctx) {
    	let div;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[9].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[8], get_default_slot_context);

    	return {
    		c() {
    			div = element("div");
    			if (default_slot) default_slot.c();
    			attr(div, "class", "sidenav svelte-epqmvq");
    			toggle_class(div, "open", /*navOpen*/ ctx[2]);
    		},
    		m(target, anchor) {
    			insert(target, div, anchor);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			current = true;
    		},
    		p(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope, saveInputURL, inputUrl*/ 265)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[8],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[8])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[8], dirty, get_default_slot_changes),
    						get_default_slot_context
    					);
    				}
    			}

    			if (!current || dirty & /*navOpen*/ 4) {
    				toggle_class(div, "open", /*navOpen*/ ctx[2]);
    			}
    		},
    		i(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(div);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};
    }

    function create_fragment(ctx) {
    	let div4;
    	let logo;
    	let t0;
    	let div3;
    	let t3;
    	let div5;
    	let t4;
    	let if_block_anchor;
    	let current;
    	let mounted;
    	let dispose;
    	logo = new Logo({});
    	let if_block = /*ready*/ ctx[1] && create_if_block(ctx);

    	return {
    		c() {
    			div4 = element("div");
    			create_component(logo.$$.fragment);
    			t0 = space();
    			div3 = element("div");

    			div3.innerHTML = `<div class="bar1 svelte-epqmvq"></div> 
		<div class="bar2 svelte-epqmvq"></div> 
		<div class="bar3 svelte-epqmvq"></div>`;

    			t3 = space();
    			div5 = element("div");
    			t4 = space();
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    			attr(div3, "class", "menu-icon svelte-epqmvq");
    			attr(div4, "class", "container svelte-epqmvq");
    			toggle_class(div4, "change", /*navOpen*/ ctx[2]);
    			attr(div5, "class", "svelte-epqmvq");
    			toggle_class(div5, "mask", /*navOpen*/ ctx[2]);
    		},
    		m(target, anchor) {
    			insert(target, div4, anchor);
    			mount_component(logo, div4, null);
    			append(div4, t0);
    			append(div4, div3);
    			insert(target, t3, anchor);
    			insert(target, div5, anchor);
    			insert(target, t4, anchor);
    			if (if_block) if_block.m(target, anchor);
    			insert(target, if_block_anchor, anchor);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen(div4, "click", /*handleNav*/ ctx[4]),
    					action_destroyer(a.call(null, div4)),
    					listen(div5, "click", /*onClickOutside*/ ctx[5])
    				];

    				mounted = true;
    			}
    		},
    		p(ctx, [dirty]) {
    			if (!current || dirty & /*navOpen*/ 4) {
    				toggle_class(div4, "change", /*navOpen*/ ctx[2]);
    			}

    			if (!current || dirty & /*navOpen*/ 4) {
    				toggle_class(div5, "mask", /*navOpen*/ ctx[2]);
    			}

    			if (/*ready*/ ctx[1]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*ready*/ 2) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i(local) {
    			if (current) return;
    			transition_in(logo.$$.fragment, local);
    			transition_in(if_block);
    			current = true;
    		},
    		o(local) {
    			transition_out(logo.$$.fragment, local);
    			transition_out(if_block);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(div4);
    			destroy_component(logo);
    			if (detaching) detach(t3);
    			if (detaching) detach(div5);
    			if (detaching) detach(t4);
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach(if_block_anchor);
    			mounted = false;
    			run_all(dispose);
    		}
    	};
    }

    const INPUT_URL = 'INPUT_URL';

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	let { inputUrl } = $$props;
    	let ready;
    	let navOpen;
    	let saveInputURL;

    	// cache user's preferred wallet URL to their browser
    	onMount(async () => {
    		// check if indexeddb is available in this context
    		if (typeof window.indexedDB === 'undefined') {
    			console.log('IndexedDB not available');
    			return;
    		}

    		const { ImmortalDB } = await Promise.resolve().then(function () { return index; });

    		$$invalidate(3, saveInputURL = async e => {
    			const src = e.detail;

    			try {
    				await ImmortalDB.set(INPUT_URL, src);
    			} catch(error) {
    				console.warn('Did not save', src, error);
    			}
    		});

    		// check for URL
    		try {
    			const storedValue = await ImmortalDB.get(INPUT_URL, null);

    			if (storedValue && !inputUrl) {
    				$$invalidate(0, inputUrl = storedValue);
    			}
    		} catch(error) {
    			console.warn('Did not get', error);
    		}

    		$$invalidate(1, ready = true);
    	});

    	function handleNav() {
    		$$invalidate(2, navOpen = !navOpen);
    	}

    	function onClickOutside(event) {
    		$$invalidate(2, navOpen = false);
    	}

    	function hideNav() {
    		$$invalidate(2, navOpen = false);
    	}

    	const openNav = () => $$invalidate(2, navOpen = true);

    	$$self.$$set = $$props => {
    		if ('inputUrl' in $$props) $$invalidate(0, inputUrl = $$props.inputUrl);
    		if ('$$scope' in $$props) $$invalidate(8, $$scope = $$props.$$scope);
    	};

    	return [
    		inputUrl,
    		ready,
    		navOpen,
    		saveInputURL,
    		handleNav,
    		onClickOutside,
    		hideNav,
    		openNav,
    		$$scope,
    		slots
    	];
    }

    class MenuWrapper extends SvelteComponent {
    	constructor(options) {
    		super();
    		init(this, options, instance, create_fragment, safe_not_equal, { inputUrl: 0 }, add_css);
    	}
    }

    var js_cookie = {exports: {}};

    /*!
     * JavaScript Cookie v2.2.1
     * https://github.com/js-cookie/js-cookie
     *
     * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
     * Released under the MIT license
     */

    (function (module, exports) {
    (function (factory) {
    	var registeredInModuleLoader;
    	{
    		module.exports = factory();
    		registeredInModuleLoader = true;
    	}
    	if (!registeredInModuleLoader) {
    		var OldCookies = window.Cookies;
    		var api = window.Cookies = factory();
    		api.noConflict = function () {
    			window.Cookies = OldCookies;
    			return api;
    		};
    	}
    }(function () {
    	function extend () {
    		var i = 0;
    		var result = {};
    		for (; i < arguments.length; i++) {
    			var attributes = arguments[ i ];
    			for (var key in attributes) {
    				result[key] = attributes[key];
    			}
    		}
    		return result;
    	}

    	function decode (s) {
    		return s.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
    	}

    	function init (converter) {
    		function api() {}

    		function set (key, value, attributes) {
    			if (typeof document === 'undefined') {
    				return;
    			}

    			attributes = extend({
    				path: '/'
    			}, api.defaults, attributes);

    			if (typeof attributes.expires === 'number') {
    				attributes.expires = new Date(new Date() * 1 + attributes.expires * 864e+5);
    			}

    			// We're using "expires" because "max-age" is not supported by IE
    			attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';

    			try {
    				var result = JSON.stringify(value);
    				if (/^[\{\[]/.test(result)) {
    					value = result;
    				}
    			} catch (e) {}

    			value = converter.write ?
    				converter.write(value, key) :
    				encodeURIComponent(String(value))
    					.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);

    			key = encodeURIComponent(String(key))
    				.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)
    				.replace(/[\(\)]/g, escape);

    			var stringifiedAttributes = '';
    			for (var attributeName in attributes) {
    				if (!attributes[attributeName]) {
    					continue;
    				}
    				stringifiedAttributes += '; ' + attributeName;
    				if (attributes[attributeName] === true) {
    					continue;
    				}

    				// Considers RFC 6265 section 5.2:
    				// ...
    				// 3.  If the remaining unparsed-attributes contains a %x3B (";")
    				//     character:
    				// Consume the characters of the unparsed-attributes up to,
    				// not including, the first %x3B (";") character.
    				// ...
    				stringifiedAttributes += '=' + attributes[attributeName].split(';')[0];
    			}

    			return (document.cookie = key + '=' + value + stringifiedAttributes);
    		}

    		function get (key, json) {
    			if (typeof document === 'undefined') {
    				return;
    			}

    			var jar = {};
    			// To prevent the for loop in the first place assign an empty array
    			// in case there are no cookies at all.
    			var cookies = document.cookie ? document.cookie.split('; ') : [];
    			var i = 0;

    			for (; i < cookies.length; i++) {
    				var parts = cookies[i].split('=');
    				var cookie = parts.slice(1).join('=');

    				if (!json && cookie.charAt(0) === '"') {
    					cookie = cookie.slice(1, -1);
    				}

    				try {
    					var name = decode(parts[0]);
    					cookie = (converter.read || converter)(cookie, name) ||
    						decode(cookie);

    					if (json) {
    						try {
    							cookie = JSON.parse(cookie);
    						} catch (e) {}
    					}

    					jar[name] = cookie;

    					if (key === name) {
    						break;
    					}
    				} catch (e) {}
    			}

    			return key ? jar[key] : jar;
    		}

    		api.set = set;
    		api.get = function (key) {
    			return get(key, false /* read as raw */);
    		};
    		api.getJSON = function (key) {
    			return get(key, true /* read as json */);
    		};
    		api.remove = function (key, attributes) {
    			set(key, '', extend(attributes, {
    				expires: -1
    			}));
    		};

    		api.defaults = {};

    		api.withConverter = init;

    		return api;
    	}

    	return init(function () {});
    }));
    }(js_cookie));

    var Cookies = js_cookie.exports;

    //

    const DEFAULT_COOKIE_TTL = 365; // Days.
    // If this script is executing in a cross-origin iframe, the cookie must
    // be set with SameSite=None and Secure=true. See
    // https://web.dev/samesite-cookies-explained/ and
    // https://tools.ietf.org/html/draft-west-cookie-incrementalism-00 for
    // details on SameSite and cross-origin behavior.
    const CROSS_ORIGIN_IFRAME = amIInsideACrossOriginIframe();
    const DEFAULT_SECURE = (CROSS_ORIGIN_IFRAME ? true : false);
    const DEFAULT_SAMESITE = (CROSS_ORIGIN_IFRAME ? 'None' : 'Lax');

    function amIInsideACrossOriginIframe () {
      try {
        // Raises ReferenceError if window isn't defined, eg if executed
        // outside a browser.
        //
        // If inside a cross-origin iframe, raises: Uncaught
        // DOMException: Blocked a frame with origin "..." from
        // accessing a cross-origin frame.
        return !Boolean(window.top.location.href)
      } catch (err) {
        return true
      }
    }

    class CookieStore {
      constructor ({
          ttl = DEFAULT_COOKIE_TTL,
          secure = DEFAULT_SECURE,
          sameSite = DEFAULT_SAMESITE} = {}) {
        this.ttl = ttl;
        this.secure = secure;
        this.sameSite = sameSite;

        return (async () => this)()
      }

      async get (key) {
        const value = Cookies.get(key);
        return typeof value === 'string' ? value : undefined
      }

      async set (key, value) {
        Cookies.set(key, value, this._constructCookieParams());
      }

      async remove (key) {
        Cookies.remove(key, this._constructCookieParams());
      }

      _constructCookieParams () {
        return {
          expires: this.ttl,
          secure: this.secure,
          sameSite: this.sameSite,
        }
      }
    }

    class Store {
        constructor(dbName = 'keyval-store', storeName = 'keyval') {
            this.storeName = storeName;
            this._dbp = new Promise((resolve, reject) => {
                const openreq = indexedDB.open(dbName, 1);
                openreq.onerror = () => reject(openreq.error);
                openreq.onsuccess = () => resolve(openreq.result);
                // First time setup: create an empty object store
                openreq.onupgradeneeded = () => {
                    openreq.result.createObjectStore(storeName);
                };
            });
        }
        _withIDBStore(type, callback) {
            return this._dbp.then(db => new Promise((resolve, reject) => {
                const transaction = db.transaction(this.storeName, type);
                transaction.oncomplete = () => resolve();
                transaction.onabort = transaction.onerror = () => reject(transaction.error);
                callback(transaction.objectStore(this.storeName));
            }));
        }
    }
    let store;
    function getDefaultStore() {
        if (!store)
            store = new Store();
        return store;
    }
    function get(key, store = getDefaultStore()) {
        let req;
        return store._withIDBStore('readonly', store => {
            req = store.get(key);
        }).then(() => req.result);
    }
    function set(key, value, store = getDefaultStore()) {
        return store._withIDBStore('readwrite', store => {
            store.put(value, key);
        });
    }
    function del(key, store = getDefaultStore()) {
        return store._withIDBStore('readwrite', store => {
            store.delete(key);
        });
    }

    //

    const DEFAULT_DATABASE_NAME = 'ImmortalDB';
    const DEFAULT_STORE_NAME = 'key-value-pairs';

    class IndexedDbStore {
      constructor (dbName = DEFAULT_DATABASE_NAME, storeName = DEFAULT_STORE_NAME) {
        this.store = new Store(dbName, storeName);

        return (async () => {
          // Safari throws a SecurityError if IndexedDB.open() is called in a
          // cross-origin iframe.
          //
          //   SecurityError: IDBFactory.open() called in an invalid security context
          //
          // Catch such and fail gracefully.
          //
          // TODO(grun): Update idb-keyval's Store class to fail gracefully in
          // Safari. Push the fix(es) upstream.
          try {
            await this.store._dbp;
          } catch (err) {
            if (err.name === 'SecurityError') {
              return null // Failed to open an IndexedDB database.
            } else {
              throw err
            }
          }

          return this
        })()
      }

      async get (key) {
        const value = await get(key, this.store);
        return typeof value === 'string' ? value : undefined
      }

      async set (key, value) {
        await set(key, value, this.store);
      }

      async remove (key) {
        await del(key, this.store);
      }
    }

    //
    // ImmortalDB - A resilient key-value store for browsers.
    //
    // Ansgar Grunseid
    // grunseid.com
    // grunseid@gmail.com
    //
    // License: MIT
    //

    class StorageApiWrapper {
      constructor (store) {
        this.store = store;

        return (async () => this)()
      }

      async get (key) {
        const value = this.store.getItem(key);
        return typeof value === 'string' ? value : undefined
      }

      async set (key, value) {
        this.store.setItem(key, value);
      }

      async remove (key) {
        this.store.removeItem(key);
      }
    }

    class LocalStorageStore extends StorageApiWrapper {
      constructor () {
        super(window.localStorage);
      }
    }

    class SessionStorageStore extends StorageApiWrapper {
      constructor () {
        super(window.sessionStorage);
      }
    }

    //

    const cl = console.log;
    const DEFAULT_KEY_PREFIX = '_immortal|';
    const WINDOW_IS_DEFINED = (typeof window !== 'undefined');

    // Stores must implement asynchronous constructor, get(), set(), and
    // remove() methods.
    const DEFAULT_STORES = [CookieStore];
    try {
      if (WINDOW_IS_DEFINED && window.indexedDB) {
        DEFAULT_STORES.push(IndexedDbStore);
      }
    } catch (err) {}

    try {
      if (WINDOW_IS_DEFINED && window.localStorage) {
        DEFAULT_STORES.push(LocalStorageStore);
      }
    } catch (err) {}

    function arrayGet (arr, index, _default = null) {
      if (index in arr) {
        return arr[index]
      }
      return _default
    }

    function countUniques (iterable) {
      // A Map must be used instead of an Object because JavaScript is a
      // buttshit language and all Object keys are serialized to strings.
      // Thus undefined becomes 'undefined', null becomes 'null', etc. Then,
      // in turn, 'undefined' can't be differentiated from undefined, null
      // from 'null', etc, and countUniques([null, 'null']) would
      // incorrectly return {'null': 2} instead of {null: 1, 'null': 1}.
      //
      // Unfortunately this Object behavior precludes the use of
      // lodash.countBy() and similar methods which count with Objects
      // instead of Maps.
      const m = new Map();
      let eles = iterable.slice();

      for (const ele of eles) {
        let count = 0;
        for (const obj of eles) {
          if (ele === obj) {
            count += 1;
          }
        }

        if (count > 0) {
          m.set(ele, count);
          eles = eles.filter(obj => obj !== ele);
        }
      }

      return m
    }

    class ImmortalStorage {
      constructor (stores = DEFAULT_STORES) {
        this.stores = [];

        // Initialize stores asynchronously. Accept both instantiated store
        // objects and uninstantiated store classes. If the latter,
        // implicitly instantiate instances thereof in this constructor.
        //
        // This constructor must accept both instantiated store objects and
        // uninstantiated store classes because it's impossible to export
        // ImmortalStore if it only took store objects initialized
        // asynchronously. Like:
        //
        //   ;(async () => {
        //       const cookieStore = await CookieStore()
        //       const ImmortalDB = new ImmortalStorage([cookieStore])
        //       export { ImmortalDB }  // <----- Doesn't work.
        //   })
        //
        // So to export a synchronous ImmortalStorage class, datastore
        // classes (whose definitions are synchronous) must be accepted in
        // addition to instantiated store objects.
        this.onReady = (async () => {
          this.stores = (await Promise.all(
            stores.map(async StoreClassOrInstance => {
              if (typeof StoreClassOrInstance === 'object') { // Store instance.
                return StoreClassOrInstance
              } else { // Store class.
                try {
                  return await new StoreClassOrInstance() // Instantiate instance.
                } catch (err) {
                  // TODO(grun): Log (where?) that the <Store> constructor Promise
                  // failed.
                  return null
                }
              }
            }),
          )).filter(Boolean);
        })();
      }

      async get (key, _default = null) {
        await this.onReady;

        const prefixedKey = `${DEFAULT_KEY_PREFIX}${key}`;

        const values = await Promise.all(
          this.stores.map(async store => {
            try {
              return await store.get(prefixedKey)
            } catch (err) {
              cl(err);
            }
          }),
        );

        const counted = Array.from(countUniques(values).entries());
        counted.sort((a, b) => a[1] <= b[1]);

        let value;
        const [firstValue, firstCount] = arrayGet(counted, 0, [undefined, 0]);
        const [secondValue, secondCount] = arrayGet(counted, 1, [undefined, 0]);
        if (
          firstCount > secondCount ||
          (firstCount === secondCount && firstValue !== undefined)
        ) {
          value = firstValue;
        } else {
          value = secondValue;
        }

        if (value !== undefined) {
          await this.set(key, value);
          return value
        } else {
          await this.remove(key);
          return _default
        }
      }

      async set (key, value) {
        await this.onReady;

        key = `${DEFAULT_KEY_PREFIX}${key}`;

        await Promise.all(
          this.stores.map(async store => {
            try {
              await store.set(key, value);
            } catch (err) {
              cl(err);
            }
          }),
        );

        return value
      }

      async remove (key) {
        await this.onReady;

        key = `${DEFAULT_KEY_PREFIX}${key}`;

        await Promise.all(
          this.stores.map(async store => {
            try {
              await store.remove(key);
            } catch (err) {
              cl(err);
            }
          }),
        );
      }
    }

    const ImmortalDB = new ImmortalStorage();

    var index = /*#__PURE__*/Object.freeze({
        __proto__: null,
        ImmortalDB: ImmortalDB,
        ImmortalStorage: ImmortalStorage,
        CookieStore: CookieStore,
        IndexedDbStore: IndexedDbStore,
        LocalStorageStore: LocalStorageStore,
        SessionStorageStore: SessionStorageStore,
        DEFAULT_STORES: DEFAULT_STORES,
        DEFAULT_KEY_PREFIX: DEFAULT_KEY_PREFIX
    });

    return MenuWrapper;

})();

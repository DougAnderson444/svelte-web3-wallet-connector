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

    // src/memoize.js
    function memoize(fn, options) {
      var cache = options && options.cache ? options.cache : cacheDefault;
      var serializer = options && options.serializer ? options.serializer : serializerDefault;
      var strategy = options && options.strategy ? options.strategy : strategyDefault;
      return strategy(fn, {
        cache,
        serializer
      });
    }
    function isPrimitive(value) {
      return value == null || typeof value === "number" || typeof value === "boolean";
    }
    function monadic(fn, cache, serializer, arg) {
      var cacheKey = isPrimitive(arg) ? arg : serializer(arg);
      var computedValue = cache.get(cacheKey);
      if (typeof computedValue === "undefined") {
        computedValue = fn.call(this, arg);
        cache.set(cacheKey, computedValue);
      }
      return computedValue;
    }
    function variadic(fn, cache, serializer) {
      var args = Array.prototype.slice.call(arguments, 3);
      var cacheKey = serializer(args);
      var computedValue = cache.get(cacheKey);
      if (typeof computedValue === "undefined") {
        computedValue = fn.apply(this, args);
        cache.set(cacheKey, computedValue);
      }
      return computedValue;
    }
    function assemble(fn, context, strategy, cache, serialize) {
      return strategy.bind(context, fn, cache, serialize);
    }
    function strategyDefault(fn, options) {
      var strategy = fn.length === 1 ? monadic : variadic;
      return assemble(fn, this, strategy, options.cache.create(), options.serializer);
    }
    function serializerDefault() {
      return JSON.stringify(arguments);
    }
    function ObjectWithoutPrototypeCache() {
      this.cache = /* @__PURE__ */ Object.create(null);
    }
    ObjectWithoutPrototypeCache.prototype.has = function(key) {
      return key in this.cache;
    };
    ObjectWithoutPrototypeCache.prototype.get = function(key) {
      return this.cache[key];
    };
    ObjectWithoutPrototypeCache.prototype.set = function(key, value) {
      this.cache[key] = value;
    };
    var cacheDefault = {
      create: function create() {
        return new ObjectWithoutPrototypeCache();
      }
    };
    var memoize_default = memoize;

    // src/index.ts
    var DEFAULT_CLASS = {
      MAIN: "svelte-draggable",
      DRAGGING: "svelte-draggable-dragging",
      DRAGGED: "svelte-draggable-dragged"
    };
    var draggable = (node, options = {}) => {
      var _a, _b;
      let {
        bounds,
        axis = "both",
        gpuAcceleration = true,
        applyUserSelectHack = true,
        disabled = false,
        ignoreMultitouch = false,
        grid,
        position,
        cancel,
        handle,
        defaultClass = DEFAULT_CLASS.MAIN,
        defaultClassDragging = DEFAULT_CLASS.DRAGGING,
        defaultClassDragged = DEFAULT_CLASS.DRAGGED,
        defaultPosition = { x: 0, y: 0 },
        onDragStart,
        onDrag,
        onDragEnd
      } = options;
      const tick = new Promise(requestAnimationFrame);
      let active = false;
      let [translateX, translateY] = [0, 0];
      let [initialX, initialY] = [0, 0];
      let [clientToNodeOffsetX, clientToNodeOffsetY] = [0, 0];
      let { x: xOffset, y: yOffset } = { x: (_a = position == null ? void 0 : position.x) != null ? _a : 0, y: (_b = position == null ? void 0 : position.y) != null ? _b : 0 };
      setTranslate(xOffset, yOffset, node, gpuAcceleration);
      let canMoveInX;
      let canMoveInY;
      let bodyOriginalUserSelectVal = "";
      let computedBounds;
      let nodeRect;
      let dragEl;
      let cancelEl;
      let isControlled = !!position;
      const getEventData = () => ({
        offsetX: translateX,
        offsetY: translateY,
        domRect: node.getBoundingClientRect()
      });
      function fireSvelteDragStartEvent(node2) {
        const data = getEventData();
        node2.dispatchEvent(new CustomEvent("svelte-drag:start", { detail: data }));
        onDragStart == null ? void 0 : onDragStart(data);
      }
      function fireSvelteDragStopEvent(node2) {
        const data = getEventData();
        node2.dispatchEvent(new CustomEvent("svelte-drag:end", { detail: data }));
        onDragEnd == null ? void 0 : onDragEnd(data);
      }
      function fireSvelteDragEvent(node2, translateX2, translateY2) {
        const data = getEventData();
        node2.dispatchEvent(new CustomEvent("svelte-drag", { detail: data }));
        onDrag == null ? void 0 : onDrag(data);
      }
      const listen = addEventListener;
      listen("touchstart", dragStart, false);
      listen("touchend", dragEnd, false);
      listen("touchmove", drag, false);
      listen("mousedown", dragStart, false);
      listen("mouseup", dragEnd, false);
      listen("mousemove", drag, false);
      node.style.touchAction = "none";
      const calculateInverseScale = () => {
        let inverseScale = node.offsetWidth / nodeRect.width;
        if (isNaN(inverseScale))
          inverseScale = 1;
        return inverseScale;
      };
      function dragStart(e) {
        if (disabled)
          return;
        if (ignoreMultitouch && e.type === "touchstart" && e.touches.length > 1)
          return;
        node.classList.add(defaultClass);
        dragEl = getDragEl(handle, node);
        cancelEl = getCancelElement(cancel, node);
        canMoveInX = ["both", "x"].includes(axis);
        canMoveInY = ["both", "y"].includes(axis);
        if (typeof bounds !== "undefined") {
          computedBounds = computeBoundRect(bounds, node);
        }
        nodeRect = node.getBoundingClientRect();
        if (isString(handle) && isString(cancel) && handle === cancel)
          throw new Error("`handle` selector can't be same as `cancel` selector");
        if (cancelEl == null ? void 0 : cancelEl.contains(dragEl))
          throw new Error("Element being dragged can't be a child of the element on which `cancel` is applied");
        if (dragEl.contains(e.target) && !(cancelEl == null ? void 0 : cancelEl.contains(e.target)))
          active = true;
        if (!active)
          return;
        if (applyUserSelectHack) {
          bodyOriginalUserSelectVal = document.body.style.userSelect;
          document.body.style.userSelect = "none";
        }
        fireSvelteDragStartEvent(node);
        const { clientX, clientY } = isTouchEvent(e) ? e.touches[0] : e;
        const inverseScale = calculateInverseScale();
        if (canMoveInX)
          initialX = clientX - xOffset / inverseScale;
        if (canMoveInY)
          initialY = clientY - yOffset / inverseScale;
        if (computedBounds) {
          clientToNodeOffsetX = clientX - nodeRect.left;
          clientToNodeOffsetY = clientY - nodeRect.top;
        }
      }
      function dragEnd() {
        if (!active)
          return;
        node.classList.remove(defaultClassDragging);
        node.classList.add(defaultClassDragged);
        if (applyUserSelectHack)
          document.body.style.userSelect = bodyOriginalUserSelectVal;
        fireSvelteDragStopEvent(node);
        if (canMoveInX)
          initialX = translateX;
        if (canMoveInX)
          initialY = translateY;
        active = false;
      }
      function drag(e) {
        if (!active)
          return;
        node.classList.add(defaultClassDragging);
        e.preventDefault();
        nodeRect = node.getBoundingClientRect();
        const { clientX, clientY } = isTouchEvent(e) ? e.touches[0] : e;
        let [finalX, finalY] = [clientX, clientY];
        const inverseScale = calculateInverseScale();
        if (computedBounds) {
          const virtualClientBounds = {
            left: computedBounds.left + clientToNodeOffsetX,
            top: computedBounds.top + clientToNodeOffsetY,
            right: computedBounds.right + clientToNodeOffsetX - nodeRect.width,
            bottom: computedBounds.bottom + clientToNodeOffsetY - nodeRect.height
          };
          finalX = clamp(finalX, virtualClientBounds.left, virtualClientBounds.right);
          finalY = clamp(finalY, virtualClientBounds.top, virtualClientBounds.bottom);
        }
        if (Array.isArray(grid)) {
          let [xSnap, ySnap] = grid;
          if (isNaN(+xSnap) || xSnap < 0)
            throw new Error("1st argument of `grid` must be a valid positive number");
          if (isNaN(+ySnap) || ySnap < 0)
            throw new Error("2nd argument of `grid` must be a valid positive number");
          let [deltaX, deltaY] = [finalX - initialX, finalY - initialY];
          [deltaX, deltaY] = snapToGrid([Math.floor(xSnap / inverseScale), Math.floor(ySnap / inverseScale)], deltaX, deltaY);
          [finalX, finalY] = [initialX + deltaX, initialY + deltaY];
        }
        if (canMoveInX)
          translateX = (finalX - initialX) * inverseScale;
        if (canMoveInY)
          translateY = (finalY - initialY) * inverseScale;
        [xOffset, yOffset] = [translateX, translateY];
        fireSvelteDragEvent(node);
        tick.then(() => setTranslate(translateX, translateY, node, gpuAcceleration));
      }
      return {
        destroy: () => {
          const unlisten = removeEventListener;
          unlisten("touchstart", dragStart, false);
          unlisten("touchend", dragEnd, false);
          unlisten("touchmove", drag, false);
          unlisten("mousedown", dragStart, false);
          unlisten("mouseup", dragEnd, false);
          unlisten("mousemove", drag, false);
        },
        update: (options2) => {
          var _a2, _b2, _c, _d, _e, _f, _g, _h, _i, _j, _k;
          axis = options2.axis || "both";
          disabled = (_a2 = options2.disabled) != null ? _a2 : false;
          ignoreMultitouch = (_b2 = options2.ignoreMultitouch) != null ? _b2 : false;
          handle = options2.handle;
          bounds = options2.bounds;
          cancel = options2.cancel;
          applyUserSelectHack = (_c = options2.applyUserSelectHack) != null ? _c : true;
          grid = options2.grid;
          gpuAcceleration = (_d = options2.gpuAcceleration) != null ? _d : true;
          const dragged = node.classList.contains(defaultClassDragged);
          node.classList.remove(defaultClass, defaultClassDragged);
          defaultClass = (_e = options2.defaultClass) != null ? _e : DEFAULT_CLASS.MAIN;
          defaultClassDragging = (_f = options2.defaultClassDragging) != null ? _f : DEFAULT_CLASS.DRAGGING;
          defaultClassDragged = (_g = options2.defaultClassDragged) != null ? _g : DEFAULT_CLASS.DRAGGED;
          node.classList.add(defaultClass);
          if (dragged)
            node.classList.add(defaultClassDragged);
          if (isControlled) {
            xOffset = translateX = (_i = (_h = options2.position) == null ? void 0 : _h.x) != null ? _i : translateX;
            yOffset = translateY = (_k = (_j = options2.position) == null ? void 0 : _j.y) != null ? _k : translateY;
            tick.then(() => setTranslate(translateX, translateY, node, gpuAcceleration));
          }
        }
      };
    };
    function isTouchEvent(event) {
      return Boolean(event.touches && event.touches.length);
    }
    function clamp(val, min, max) {
      return Math.min(Math.max(val, min), max);
    }
    function isString(val) {
      return typeof val === "string";
    }
    var snapToGrid = memoize_default(([xSnap, ySnap], pendingX, pendingY) => {
      const x = Math.round(pendingX / xSnap) * xSnap;
      const y = Math.round(pendingY / ySnap) * ySnap;
      return [x, y];
    });
    function getDragEl(handle, node) {
      if (!handle)
        return node;
      const handleEl = node.querySelector(handle);
      if (handleEl === null)
        throw new Error("Selector passed for `handle` option should be child of the element on which the action is applied");
      return handleEl;
    }
    function getCancelElement(cancel, node) {
      if (!cancel)
        return;
      const cancelEl = node.querySelector(cancel);
      if (cancelEl === null)
        throw new Error("Selector passed for `cancel` option should be child of the element on which the action is applied");
      return cancelEl;
    }
    function computeBoundRect(bounds, rootNode) {
      if (typeof bounds === "object") {
        const [windowWidth, windowHeight] = [window.innerWidth, window.innerHeight];
        const { top = 0, left = 0, right = 0, bottom = 0 } = bounds;
        const computedRight = windowWidth - right;
        const computedBottom = windowHeight - bottom;
        return { top, right: computedRight, bottom: computedBottom, left };
      }
      if (bounds === "parent") {
        const boundRect = rootNode.parentNode.getBoundingClientRect();
        return boundRect;
      }
      const node = document.querySelector(bounds);
      if (node === null)
        throw new Error("The selector provided for bound doesn't exists in the document.");
      const computedBounds = node.getBoundingClientRect();
      return computedBounds;
    }
    function setTranslate(xPos, yPos, el, gpuAcceleration) {
      el.style.transform = gpuAcceleration ? `translate3d(${+xPos}px, ${+yPos}px, 0)` : `translate(${+xPos}px, ${+yPos}px)`;
    }

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
    	openNav: dirty & /*navOpen*/ 1,
    	hideNav: dirty & /*navOpen*/ 1
    });

    const get_default_slot_context = ctx => ({
    	openNav: /*func*/ ctx[5],
    	hideNav: /*func_1*/ ctx[6]
    });

    function create_fragment(ctx) {
    	let div4;
    	let logo;
    	let t0;
    	let div3;
    	let t3;
    	let div5;
    	let t4;
    	let div6;
    	let current;
    	let mounted;
    	let dispose;
    	logo = new Logo({});
    	const default_slot_template = /*#slots*/ ctx[4].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[3], get_default_slot_context);

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
    			div6 = element("div");
    			if (default_slot) default_slot.c();
    			attr(div3, "class", "menu-icon svelte-epqmvq");
    			attr(div4, "class", "container svelte-epqmvq");
    			toggle_class(div4, "change", /*navOpen*/ ctx[0]);
    			attr(div5, "class", "svelte-epqmvq");
    			toggle_class(div5, "mask", /*navOpen*/ ctx[0]);
    			attr(div6, "class", "sidenav svelte-epqmvq");
    			toggle_class(div6, "open", /*navOpen*/ ctx[0]);
    		},
    		m(target, anchor) {
    			insert(target, div4, anchor);
    			mount_component(logo, div4, null);
    			append(div4, t0);
    			append(div4, div3);
    			insert(target, t3, anchor);
    			insert(target, div5, anchor);
    			insert(target, t4, anchor);
    			insert(target, div6, anchor);

    			if (default_slot) {
    				default_slot.m(div6, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen(div4, "click", /*handleNav*/ ctx[1]),
    					action_destroyer(draggable.call(null, div4)),
    					listen(div5, "click", /*onClickOutside*/ ctx[2])
    				];

    				mounted = true;
    			}
    		},
    		p(ctx, [dirty]) {
    			if (!current || dirty & /*navOpen*/ 1) {
    				toggle_class(div4, "change", /*navOpen*/ ctx[0]);
    			}

    			if (!current || dirty & /*navOpen*/ 1) {
    				toggle_class(div5, "mask", /*navOpen*/ ctx[0]);
    			}

    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope, navOpen*/ 9)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[3],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[3])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[3], dirty, get_default_slot_changes),
    						get_default_slot_context
    					);
    				}
    			}

    			if (!current || dirty & /*navOpen*/ 1) {
    				toggle_class(div6, "open", /*navOpen*/ ctx[0]);
    			}
    		},
    		i(local) {
    			if (current) return;
    			transition_in(logo.$$.fragment, local);
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o(local) {
    			transition_out(logo.$$.fragment, local);
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d(detaching) {
    			if (detaching) detach(div4);
    			destroy_component(logo);
    			if (detaching) detach(t3);
    			if (detaching) detach(div5);
    			if (detaching) detach(t4);
    			if (detaching) detach(div6);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	let navOpen = false;

    	function handleNav() {
    		$$invalidate(0, navOpen = !navOpen);
    	}

    	function onClickOutside(event) {
    		$$invalidate(0, navOpen = false);
    	}

    	const func = () => $$invalidate(0, navOpen = true);
    	const func_1 = () => $$invalidate(0, navOpen = false);

    	$$self.$$set = $$props => {
    		if ('$$scope' in $$props) $$invalidate(3, $$scope = $$props.$$scope);
    	};

    	return [navOpen, handleNav, onClickOutside, $$scope, slots, func, func_1];
    }

    class MenuWrapper extends SvelteComponent {
    	constructor(options) {
    		super();
    		init(this, options, instance, create_fragment, safe_not_equal, {}, add_css);
    	}
    }

    return MenuWrapper;

})();

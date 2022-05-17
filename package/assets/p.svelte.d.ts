/** @typedef {typeof __propDef.props}  PProps */
/** @typedef {typeof __propDef.events}  PEvents */
/** @typedef {typeof __propDef.slots}  PSlots */
export default class P extends SvelteComponentTyped<{}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type PProps = typeof __propDef.props;
export type PEvents = typeof __propDef.events;
export type PSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {};
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};

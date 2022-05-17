/** @typedef {typeof __propDef.props}  MenuWrapperProps */
/** @typedef {typeof __propDef.events}  MenuWrapperEvents */
/** @typedef {typeof __propDef.slots}  MenuWrapperSlots */
export default class MenuWrapper extends SvelteComponentTyped<{}, {
    [evt: string]: CustomEvent<any>;
}, {
    default: {
        openNav: () => boolean;
        hideNav: () => boolean;
    };
}> {
}
export type MenuWrapperProps = typeof __propDef.props;
export type MenuWrapperEvents = typeof __propDef.events;
export type MenuWrapperSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {};
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {
            openNav: () => boolean;
            hideNav: () => boolean;
        };
    };
};
export {};

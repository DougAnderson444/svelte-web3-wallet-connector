/** @typedef {typeof __propDef.props}  MenuWrapperProps */
/** @typedef {typeof __propDef.events}  MenuWrapperEvents */
/** @typedef {typeof __propDef.slots}  MenuWrapperSlots */
export default class MenuWrapper extends SvelteComponentTyped<{
    inputUrl: any;
}, {
    [evt: string]: CustomEvent<any>;
}, {
    default: {
        openNav: () => boolean;
        hideNav: () => void;
        saveInputURL: any;
        inputUrl: any;
    };
}> {
}
export type MenuWrapperProps = typeof __propDef.props;
export type MenuWrapperEvents = typeof __propDef.events;
export type MenuWrapperSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        inputUrl: any;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {
            openNav: () => boolean;
            hideNav: () => void;
            saveInputURL: any;
            inputUrl: any;
        };
    };
};
export {};

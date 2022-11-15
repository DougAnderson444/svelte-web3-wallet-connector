/** @typedef {typeof __propDef.props}  Web3WalletMenuProps */
/** @typedef {typeof __propDef.events}  Web3WalletMenuEvents */
/** @typedef {typeof __propDef.slots}  Web3WalletMenuSlots */
export default class Web3WalletMenu extends SvelteComponentTyped<{
    inputUrl?: any;
    wallet?: any;
}, {
    walletReady: CustomEvent<any>;
} & {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type Web3WalletMenuProps = typeof __propDef.props;
export type Web3WalletMenuEvents = typeof __propDef.events;
export type Web3WalletMenuSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        inputUrl?: any;
        wallet?: any;
    };
    events: {
        walletReady: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};

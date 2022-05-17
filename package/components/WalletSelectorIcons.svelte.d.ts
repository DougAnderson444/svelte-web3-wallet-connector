import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        icon: any;
    };
    events: {
        click: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export declare type WalletSelectorIconsProps = typeof __propDef.props;
export declare type WalletSelectorIconsEvents = typeof __propDef.events;
export declare type WalletSelectorIconsSlots = typeof __propDef.slots;
export default class WalletSelectorIcons extends SvelteComponentTyped<WalletSelectorIconsProps, WalletSelectorIconsEvents, WalletSelectorIconsSlots> {
}
export {};

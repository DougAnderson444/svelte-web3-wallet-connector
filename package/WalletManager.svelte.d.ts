import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {};
    events: {
        RSAPublicKey: CustomEvent<any>;
        Ed25519PublicKey: CustomEvent<any>;
        ownerAddress: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {
            wallet: any;
            ownerAddress: string;
            RSAPublicKey: {
                kty: string;
                n: string;
                e: string;
                kid?: string;
            };
            Ed25519PublicKey: Uint8Array;
        };
    };
};
export declare type WalletManagerProps = typeof __propDef.props;
export declare type WalletManagerEvents = typeof __propDef.events;
export declare type WalletManagerSlots = typeof __propDef.slots;
export default class WalletManager extends SvelteComponentTyped<WalletManagerProps, WalletManagerEvents, WalletManagerSlots> {
}
export {};

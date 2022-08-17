import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        wallet: any;
        inputUrl?: string;
        topOffsetHeight?: number;
        topOffsetWidth?: number;
        iframeParentHeight?: number;
        iframeParentWidth?: number;
        show: any;
        hide: any;
    };
    events: {
        walletReady: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export declare type ConnectorInsideProps = typeof __propDef.props;
export declare type ConnectorInsideEvents = typeof __propDef.events;
export declare type ConnectorInsideSlots = typeof __propDef.slots;
export default class ConnectorInside extends SvelteComponentTyped<ConnectorInsideProps, ConnectorInsideEvents, ConnectorInsideSlots> {
}
export {};

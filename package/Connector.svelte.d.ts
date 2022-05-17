import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        wallet: any;
        inputUrl?: string;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export declare type ConnectorProps = typeof __propDef.props;
export declare type ConnectorEvents = typeof __propDef.events;
export declare type ConnectorSlots = typeof __propDef.slots;
export default class Connector extends SvelteComponentTyped<ConnectorProps, ConnectorEvents, ConnectorSlots> {
}
export {};

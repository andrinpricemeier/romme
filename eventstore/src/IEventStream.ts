import { IEvent } from "./IEvent";

export interface IEventStream {
    add(payload: any): Promise<void>;

    getAll(): Promise<IEvent[]>;

    getFrom(startId: string): Promise<IEvent[]>;
}

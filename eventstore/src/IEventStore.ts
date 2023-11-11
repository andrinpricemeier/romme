import { IEventStream } from "./IEventStream";

export interface IEventStore {
    getStream(name: string): IEventStream;
}

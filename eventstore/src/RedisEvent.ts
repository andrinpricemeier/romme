import { IEvent } from "./IEvent";

export class RedisEvent implements IEvent {
    constructor(
        readonly stream: string,
        readonly id: string,
        readonly payload: any
    ) {}
}

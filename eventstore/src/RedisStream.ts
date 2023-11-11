import Redis from "ioredis";
import { IEvent } from "./IEvent";
import { IEventStream } from "./IEventStream";
import { RedisEvent } from "./RedisEvent";

export class RedisStream implements IEventStream {
    constructor(
        private readonly name: string,
        private readonly client: Redis.Redis
    ) {}

    async add(payload: any): Promise<void> {
        await this.client.xadd(
            "XADD",
            this.name,
            "*",
            "message",
            JSON.stringify(payload)
        );
    }

    async getAll(): Promise<IEvent[]> {
        return this.getFrom("0");
    }

    async getFrom(startId: string): Promise<IEvent[]> {
        const results = await this.client.xread("STREAMS", this.name, startId);
        const [_, messages] = results[0];
        return this.toEvents(messages);
    }

    private toEvents(messages: any[]): IEvent[] {
        return messages.map((msg) => this.toEvent(msg));
    }

    private toEvent(message: any): IEvent {
        return new RedisEvent(this.name, message[0], JSON.parse(message[1]));
    }
}

import Redis from "ioredis";
import { IEventStore } from "./IEventStore";
import { IEventStream } from "./IEventStream";
import { RedisStream } from "./RedisStream";

export class RedisEventStore implements IEventStore {
    private readonly client: Redis.Redis;

    constructor(host: string, port: number, password: string) {
        this.client = new Redis({
            port: port,
            host: host,
            password: password
        });
    }

    getStream(name: string): IEventStream {
        return new RedisStream(name, this.client);
    }
}

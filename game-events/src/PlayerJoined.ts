import { GameEventType } from "./GameEventType";
import { IGameEvent } from "./IGameEvent";

export class PlayerJoined implements IGameEvent {
    id: string;
    internalId: string;
    eventType: GameEventType = GameEventType.PLAYER_JOINED;
    constructor(readonly playerId: string, readonly playerName: string) { }
}
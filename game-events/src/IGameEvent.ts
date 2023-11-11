import { GameEventType } from "./GameEventType";

export interface IGameEvent {
    id: string;
    internalId: string;
    eventType: GameEventType;
}
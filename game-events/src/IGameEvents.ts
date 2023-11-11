import { PlayerJoined } from "./PlayerJoined";

export interface IGameEvents {
    playerJoined: (event: PlayerJoined) => void;
}
import { Player } from "./Player";
import { Round } from "./Round";
import { IGameEvent } from 'game-events';
import { PlayerJoined } from "game-events";
import { GameEventType } from "game-events";

export class Game {
    private readonly players: Player[] = [];
    private readonly rounds: Round[] = [];
    private activeRound: Round;

    startNewRound() {
        const round = new Round(this.rounds.length + 1, 12);
        for (const player of this.players) {
            round.addPlayer(player);
        }
        round.choosePlayerToStartRound(this.players[0]);
        round.handOutCards();
        this.rounds.push(round);
        this.activeRound = round;
    }

    playMove(event: IGameEvent): void {
        if (event.eventType === GameEventType.PLAYER_JOINED) {
            if (this.activeRound) {
                throw new Error("No player can join when a round has already started.");
            }
            const playerJoined = event as PlayerJoined;
            this.players.push(new Player(playerJoined.playerId, playerJoined.playerName));
        }
    }

    replay(events: IGameEvent[]): void {
        
    }
}
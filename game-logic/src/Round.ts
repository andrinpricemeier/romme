import { CardDeck } from "./CardDeck";
import { GameBoard } from "./GameBoard";
import { PlayedCardsDeck } from "./PlayedCardsDeck";
import { Player } from "./Player";

export class Round {
    private readonly board: GameBoard = new GameBoard();
    private readonly deck: CardDeck =  new CardDeck(8);
    private readonly playedCardsDeck: PlayedCardsDeck = new PlayedCardsDeck();
    private readonly players: Player[] = [];
    private whoseTurnIsIt: Player;

    constructor(private readonly roundNumber: number, private readonly cardsPerPlayer: number) { }

    choosePlayerToStartRound(player: Player): void {
        this.whoseTurnIsIt = player;
    }

    addPlayer(player: Player): void {
        this.players.push(player);
    }

    handOutCards() {
        if (!this.whoseTurnIsIt) {
            throw new Error("Choose a player to start a round first please.");
        }
        for (const player of this.players) {
            for (let i = 0; i < this.cardsPerPlayer; i++) {
                player.give(this.deck.pickUpCard());
            }
            // The one starting has an additional card.
            if (this.whoseTurnIsIt === player) {
                player.give(this.deck.pickUpCard());
            }
        }
    }
}
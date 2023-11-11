import { Card } from "./Card";

export class PlayedCardsDeck {
    private readonly cards: Card[];

    placeCard(card: Card): void {
        this.cards.push(card);
    }

    hasCards(): boolean {
        return this.cards.length > 0;
    }

    pickUpLastPlayedCard(): Card {
        if (!this.hasCards()) {
            throw new Error("No cards were placed on this deck.");
        }
        const lastPlayedCard = this.cards.pop();
        return lastPlayedCard;
    }
}
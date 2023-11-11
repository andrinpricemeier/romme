import { Card } from "./Card";
import { CardColor } from "./CardColor";
import { CardType } from "./CardType";

export class CardDeck {
    private readonly cards: Card[] = [];

    constructor(private readonly jokersCount: number) {
        this.initAllCards();
    }

    hasCards(): boolean {
        return this.cards.length > 0;
    }

    pickUpCard(): Card {
        if (!this.hasCards()) {
            throw new Error("The card deck is empty.");
        }
        // Note that we do not precalculate some sort of card queue and
        // pick the next card. Instead we calculate the next card on demand.
        // This is an additional security measure against cheating: not even we know
        // what the next card will be in advance!
        const randomCard = this.chooseRandomCard();
        this.removeFromDeck(randomCard);
        return randomCard;
    }

    private removeFromDeck(card: Card): void {
        const cardIndex = this.cards.indexOf(card);
        this.cards.splice(cardIndex, 1);
    }

    private chooseRandomCard(): Card {
        const min = 0;
        const max = this.cards.length - 1;
        const randomCardIndex = Math.floor(Math.random() * (max - min + 1)) + min;
        return this.cards[randomCardIndex];
    }

    private initAllCards() {
        // Add joker cards
        for (let i = 0; i < this.jokersCount; i++) {
            this.cards.push(new Card(-1, 25, CardType.JOKER, CardColor.ANY));
        }
        const types = [CardType.JACK, CardType.QUEEN, CardType.KING, CardType.ACE];
        const colors = [CardColor.CROSS, CardColor.DIAMONDS, CardColor.HEART, CardColor.PEAK];
        for (const color of colors) {
            // Numerical cards first
            for (let cardValue = 2; cardValue <= 10; cardValue++) {
                this.cards.push(new Card(cardValue, cardValue, CardType.NUMERICAL, color));
            }
            // "Special" cards next
            for (const type of types) {
                this.cards.push(new Card(10, 10, type, color));
            }
        }
    }
}
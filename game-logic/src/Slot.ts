import { Card } from "./Card";

export class Slot {
    private readonly cards: Card[] = [];
    constructor(readonly slotNumber: number) { }

    appendStart(card: Card): void {
        this.cards.unshift(card);
    }

    appendEnd(card: Card): void {
        this.cards.push(card);
    }

    replace(newCard: Card, oldCard: Card): void {
        const oldCardIndex = this.cards.indexOf(oldCard);
        if (oldCardIndex !== -1) {
            this.cards[oldCardIndex] = newCard;
        }
    }
}
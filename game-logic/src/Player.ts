import { Card } from "./Card";

export class Player {
    private readonly cards: Card[] = [];
    private passedQualification: boolean = false;
    private startedRound: boolean = false;
    private playingNow: boolean = false;
    private isReady: boolean = false;

    constructor(readonly id: string, readonly name: string) {}

    give(card: Card): void {
        this.cards.push(card);
    }
}
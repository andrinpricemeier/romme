import { CardColor } from "./CardColor";
import { CardType } from "./CardType";

export class Card {
    constructor(readonly value: number, readonly points: number, readonly type: CardType, readonly color: CardColor) { }
}
import { Slot } from "./Slot";

export class GameBoard {
    private slots: Slot[] = [];

    addSlot(slot: Slot): void {
        this.slots.push(slot);
    }

    clear() {
        this.slots = [];
    }
}
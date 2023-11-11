import { Alignment, Cube, Size, Location, Color } from "./Cube";
import { ISceneObject } from "./ISceneObject";

export class Player implements ISceneObject {
    constructor(private readonly cube: Cube) {}
    update(): void {
        // Nothing to do here.
    }

    draw(lagFix: number): void {}
}

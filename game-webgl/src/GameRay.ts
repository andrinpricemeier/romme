import { GamePoint3D } from "./GamePoint3D";
import { Vector3D } from "./Vector3D";

export class GameRay {
    constructor(readonly origin: GamePoint3D, readonly direction: Vector3D) {}

    getPointOnRay(t: number): GamePoint3D {
        return new GamePoint3D(
            this.origin.x + t * this.direction.x,
            this.origin.y + t * this.direction.y,
            this.origin.z + t * this.direction.z
        );
    }
}

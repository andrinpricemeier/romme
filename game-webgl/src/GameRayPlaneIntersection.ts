import { GamePoint3D } from "./GamePoint3D";

export class GameRayPlaneIntersection {
    constructor(
        readonly intersectionPoint: GamePoint3D,
        readonly rayT: number
    ) {}
}

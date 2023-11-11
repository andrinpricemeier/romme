import { mat3, vec3 } from "gl-matrix";
import { GamePoint3D } from "./GamePoint3D";
import { GameRay } from "./GameRay";
import { GameRayPlaneIntersection } from "./GameRayPlaneIntersection";
import { Vector3D } from "./Vector3D";

export class Plane {
    private readonly o: Vector3D;
    private readonly u: Vector3D;
    private readonly v: Vector3D;
    constructor(
        origin: GamePoint3D,
        leftTop: GamePoint3D,
        rightBottom: GamePoint3D
    ) {
        this.o = new Vector3D(origin.x, origin.y, origin.z);
        this.u = new Vector3D(
            leftTop.x - origin.x,
            leftTop.y - origin.y,
            leftTop.z - origin.z
        );
        this.v = new Vector3D(
            rightBottom.x - origin.x,
            rightBottom.y - origin.y,
            rightBottom.z - origin.z
        );
    }

    calculateIntersection(ray: GameRay): GameRayPlaneIntersection | undefined {
        const b = vec3.fromValues(
            this.o.x - ray.origin.x,
            this.o.y - ray.origin.y,
            this.o.z - ray.origin.z
        );
        const A = vec3.fromValues(
            ray.direction.x,
            ray.direction.y,
            ray.direction.z
        );
        const B = vec3.fromValues(-1 * this.u.x, -1 * this.u.y, -1 * this.u.z);
        const C = vec3.fromValues(-1 * this.v.x, -1 * this.v.y, -1 * this.v.z);
        const ABC = mat3.fromValues(
            A[0],
            A[1],
            A[2],
            B[0],
            B[1],
            B[2],
            C[0],
            C[1],
            C[2]
        );
        const detAll = mat3.determinant(ABC);
        if (Math.abs(detAll - 0) < Number.EPSILON) {
            return undefined;
        }
        const bBC = mat3.fromValues(
            b[0],
            b[1],
            b[2],
            B[0],
            B[1],
            B[2],
            C[0],
            C[1],
            C[2]
        );
        const AbC = mat3.fromValues(
            A[0],
            A[1],
            A[2],
            b[0],
            b[1],
            b[2],
            C[0],
            C[1],
            C[2]
        );
        const ABb = mat3.fromValues(
            A[0],
            A[1],
            A[2],
            B[0],
            B[1],
            B[2],
            b[0],
            b[1],
            b[2]
        );
        const detT = mat3.determinant(bBC);
        const detLambda = mat3.determinant(AbC);
        const detMu = mat3.determinant(ABb);
        const t = detT / detAll;
        const inFrontOfCamera = t > 0;
        const lambda = detLambda / detAll;
        const mu = detMu / detAll;
        const epsilon = 0.01;
        const insideLambda = lambda > -epsilon && lambda < 1 + epsilon;
        const insideMu = mu > -epsilon && mu < 1 + epsilon;
        const isInside = insideLambda && insideMu;
        // No valid intersection.
        if (!inFrontOfCamera || !isInside) {
            return undefined;
        }
        const intersectionPoint = ray.getPointOnRay(t);
        return new GameRayPlaneIntersection(intersectionPoint, t);
    }
}

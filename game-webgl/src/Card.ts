import { Alignment, Cube, Size, Location, Color } from "./Cube";
import { ISceneObject } from "./ISceneObject";
import { Plane } from "./Plane";
import { Texture } from "./Texture";

export class Card implements ISceneObject {
    private size: Size = [5, 10, 1];
    private location: Location = [128, 128, 0];
    private frontColor: Color;
    private isSelected = false;
    constructor(
        private readonly cube: Cube,
        size: Size,
        location: Location,
        private readonly alignment: Alignment,
        private readonly texture: Texture
    ) {
        this.size = size;
        this.location = location;
        this.frontColor = [0.8, 0.8, 0.8];
    }

    select() {
        this.isSelected = true;
    }

    deselect() {
        this.isSelected = false;
    }

    update(): void {
        // Nothing to do here.
    }

    resize(newSize: Size) {
        this.size = newSize;
    }

    getFrontPlane(): Plane {
        return this.cube.getFrontPlane();
    }

    move(newLocation: Location) {
        this.location = newLocation;
    }

    draw(lagFix: number): void {
        this.cube.move(this.location);
        this.cube.resize(this.size);
        this.cube.align(this.alignment);
        //  const entireTexture = [0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0];
        this.cube.defineTextureCoord(
            [0.5, 0.0, 1.0, 0.0, 1.0, 1.0, 0.5, 1.0],
            [0.0, 0.0, 0.5, 0.0, 0.5, 1.0, 0.0, 1.0],
            [0.0, 0.0, 0.01, 0.0, 0.01, 0.01, 0.0, 0.01],
            [0.0, 0.0, 0.01, 0.0, 0.01, 0.01, 0.0, 0.01],
            [0.0, 0.0, 0.01, 0.0, 0.01, 0.01, 0.0, 0.01],
            [0.0, 0.0, 0.01, 0.0, 0.01, 0.01, 0.0, 0.01]
        );
        this.texture.activate();
        this.cube.draw();
        this.texture.deactivate();
    }
}

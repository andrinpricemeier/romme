export class ImageLoader {
    async load(filepath: string): Promise<HTMLImageElement> {
        return new Promise((resolve, reject) => {
            // Handle image load failure?
            const image = new Image();
            image.onload = function () {
                resolve(image);
            };
            image.src = filepath;
        });
    }
}

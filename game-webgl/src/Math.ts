export const median = (values: number[]): number => {
    if (values.length === 0) {
        return 0;
    }
    if (values.length === 1) {
        return values[0];
    }
    const sorted = values.slice().sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);
    if (sorted.length % 2 === 0) {
        return (sorted[middle - 1] + sorted[middle]) / 2;
    }
    return sorted[middle];
};

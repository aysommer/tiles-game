/**
 * Main game logic.
 */
export default class Game {
    private static getRandomInt(min: number, max: number): number {
        const _min = Math.ceil(min);
        const _max = Math.floor(max);
        return Math.floor(Math.random() * (_max - _min)) + _min;
    }

    private static getSequence(length: number): number[] {
        return Array.apply(0, Array(length)).map((val, i) => i + 1);
    }

    private static shake(arr: number[]): number[] {
        const shakedArr = [...arr];
        let currentIndex = arr.length;
        let temp = null;
        let randIndex = null;

        while (0 !== currentIndex) {
          randIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          temp = shakedArr[currentIndex];
          shakedArr[currentIndex] = shakedArr[randIndex];
          shakedArr[randIndex] = temp;
        }
      
        return shakedArr;
    }

    public static getRandomPairedArray(length: number): number[] {
        const sequenceLength = length / 2;
        const arr = [
            ...this.getSequence(sequenceLength),
            ...this.getSequence(sequenceLength)
        ];

        return this.shake(arr);
    }
}
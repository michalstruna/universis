/**
 * Utils for array.
 */
class Arrays {

    /**
     * Find last index of item in array.
     * @param array Array of items.
     * @param condition Condition for searched item.
     * @returns Index of found item.
     */
    public static findLastIndex<T>(array: T[], condition: Universis.Function<T, boolean>): number {
        for (let i = array.length - 1; i >= 0; i--) {
            if (condition(array[i])) {
                return i
            }
        }

        return -1
    }

    /**
     * Get sum of all values in array.
     * @param array Source array.
     * @returns Sum.
     */
    public static sum = (array: number[]): number => {
        return array.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    }

}

export default Arrays
/**
 * Utils for numbers.
 */
class Numbers {

    /**
     * Convert number to readable string.
     * @param number Number without formatting.
     * @returns Readable string.
     */
    public static toReadable(number: number): string {
        return Numbers.addSpaces(number)
    }

    /**
     * Add spaces to number (1000000 to 1 000 000).
     * @param number Number without spaces.
     * @returns Number with spaces.
     */
    public static addSpaces(number: number): string {
        let oldValue = Math.floor(number).toString()
        let newValue = ''

        for (let i = oldValue.length - 1; i >= 0; i--) {
            newValue = oldValue[i] + newValue

            if ((oldValue.length - i) % 3 === 0) {
                newValue = ' ' + newValue
            }
        }

        return newValue
    }

}

export default Numbers
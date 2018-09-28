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
        const decimal = number.toString().split('.')[1]
        let newValue = ''

        for (let i = oldValue.length - 1; i >= 0; i--) {
            newValue = oldValue[i] + newValue

            if ((oldValue.length - i) % 3 === 0) {
                newValue = ' ' + newValue
            }
        }

        return newValue + (decimal ? ('.' + decimal[0]) : '')
    }

    /**
     * Convert number to short string (1000 to 1k).
     * @param number Number.
     * @returns Short number.
     */
    public static toShort(number: number): string {
        if (number < 1e3) { // TODO: Universal numbers in for loop.
            return number.toString()
        } else if (number < 1e6) {
            return Math.floor(number / 1e3) + 'k'
        } else {
            return Math.floor(number / 1e6) + 'M'
        }
    }

}

export default Numbers
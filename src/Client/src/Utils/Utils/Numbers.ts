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
    public static addSpaces(number: number): string { // TODO: Decimal.
        let oldValue = Math.round(number).toString()
        let newValue = ''

        for (let i = oldValue.length - 1; i >= 0; i--) {
            newValue = oldValue[i] + newValue

            if ((oldValue.length - i) % 3 === 0) {
                newValue = ' ' + newValue
            }
        }

        const decimal = number % 1

        return newValue + (decimal ? ('.' + Math.round(decimal * 1e3)) : '')
    }

    /**
     * Convert number to short string (1000 to 1k).
     * @param number Number.
     * @param integer Result will be integer.
     * @returns Short number.
     */
    public static toShort(number: number, integer = false): string {
        let suffix = '' // TODO: For loop.

        if (number > 1e8) {
            number = Math.round(number / 1e6)
            suffix = 'M'
        } else if (number > 1e7) {
            number = Math.round(number / 1e5) / 10
            suffix = 'M'
        } else if (number > 1e6) {
            number = Math.round(number / 1e4) / 100
            suffix = 'M'
        } else if (number > 1e5) {
            number = Math.round(number / 1e3)
            suffix = 'k'
        } else if (number > 1e4) {
            number = Math.round(number / 1e2) / 10
            suffix = 'k'
        } else if (number > 1e3) {
            number = Math.round(number / 1e1) / 100
            suffix = 'k'
        } else if (number > 1e2) {
            number = Math.round(number)
        } else if (number > 1e1) {
            number = Math.round(number * 10) / 10
        } else {
            number = Math.round(number * 100) / 100
        }

        return number + suffix
    }

}

export default Numbers
import SizeUnit from '../Constants/SizeUnit'

/**
 * Utils for universe.
 */
class Units {

    /**
     * List of all size units.
     */
    static SIZE = SizeUnit

    private constructor() {

    }

    /**
     * Convert unit to another unit.
     * @param from Initial unit.
     * @param to Target unit.
     * @param count Count of units. (optional, default 1)
     * @returns New unit.
     */
    public static convert(from: SizeUnit, to: SizeUnit, count = 1): number {
        return count * (from / to)
    }

    /**
     * Check is values are different.
     * @param value1 First value.
     * @param value2 Second value.
     * @returns Values are different.
     */
    public static isDifferent(value1, value2): boolean {
        return Math.max(value1, value2) / Math.min(value1, value2) > 1.01
    }

    /**
     * Add spaces to number (1000000 to 1 000 000).
     * @param value Number without spaces.
     * @returns Number with spaces.
     */
    public static addSpaces(value: number): string {
        let oldValue = Math.floor(value).toString()
        let newValue = ''

        for (let i = oldValue.length - 1; i >= 0; i--) {
            newValue = oldValue[i] + newValue

            if ((oldValue.length - i) % 3 === 0) {
                newValue = ' ' + newValue
            }
        }

        return newValue
    }

    /**
     * Format number to unit (1 000 000 to 1 km).
     * @param  value Value.
     * @returns Value with unit.
     */
    public static format(value: number): string {
        let newValue = Math.floor(value * SizeUnit.KM)
        let unit

        if (newValue < 2 * SizeUnit.KM) {
            unit = 'm'
        } else if (newValue < 2 * SizeUnit.AU) {
            unit = 'km'
            newValue /= SizeUnit.KM
        } else if (newValue < 2 * SizeUnit.LY) {
            unit = 'AU'
            newValue /= SizeUnit.AU
        } else if (newValue < 2 * SizeUnit.KLY) {
            unit = 'ly'
            newValue /= SizeUnit.LY
        } else if (newValue < 2 * SizeUnit.MLY) {
            unit = 'Kly'
            newValue /= SizeUnit.KLY
        } else if (newValue < 2 * SizeUnit.GLY) {
            unit = 'Mly'
            newValue /= SizeUnit.MLY
        } else if (newValue < 2 * SizeUnit.TLY) {
            unit = 'Gly'
            newValue /= SizeUnit.GLY
        } else {
            unit = 'Tly'
            newValue /= SizeUnit.TLY
        }

        return Units.addSpaces(newValue) + ' ' + unit
    }

}

export default Units
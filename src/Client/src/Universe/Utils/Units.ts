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
    static convert(from: SizeUnit, to: SizeUnit, count = 1): number {
        return count * (from / to)
    }

    /**
     * Check is values are different.
     * @param value1
     * @param value2
     * @returns Values are different.
     */
    static isDifferent(value1, value2): boolean {
        return Math.max(value1, value2) / Math.min(value1, value2) > 1.01
    }

}

export default Units
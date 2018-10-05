import SizeUnit from '../Constants/SizeUnit'
import TimeUnit from '../Constants/TimeUnit'
import { Numbers } from '../../Utils'

/**
 * Utils for universe.
 */
class Units {

    /**
     * List of all size units.
     */
    static SIZE = SizeUnit

    /**
     * List of all time units.
     * @type {TimeUnit}
     */
    static TIME = TimeUnit

    public static SIZE_UNITS = SizeUnit

    /**
     * List of size names.
     */
    private static SIZE_NAMES = {
        M: 'm',
        KM: 'km',
        AU: 'AU',
        LY: 'ly',
        KLY: 'kly',
        MLY: 'Mly',
        GLY: 'Gly',
        TLY: 'Tly'
    }

    private constructor() {

    }

    /**
     * Convert unit to another unit.
     * @param from Initial unit.
     * @param to Target unit.
     * @param count Count of units. (optional, default 1)
     * @returns New unit.
     */
    public static convert(from: number, to: number, count = 1): number {
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
     * Format size unit.
     * @param count Count of unit.
     * @param input Unit type.
     * @param short Short form with suffixes k, M, G, etc.
     * @returns Formatted unit.
     */
    public static formatSize(count: number, input: number = SizeUnit.KM, short: boolean = true): string {
        let value = Units.convert(input, SizeUnit.M, count)

        let unit

        for (const i in SizeUnit) {
            const unitNamesKeys = Object.keys(Units.SIZE_NAMES)
            const nextUnitKey = unitNamesKeys[unitNamesKeys.indexOf(i) + 1]
            const nextUnitName = Units.SIZE_NAMES[(nextUnitKey || '')]

            if (!nextUnitName || value < SizeUnit[nextUnitKey]) {
                unit = Units.SIZE_NAMES[i]
                value /= SizeUnit[i]
                break
            }
        }

        const format = short ? Numbers.toShort : Numbers.toReadable
        return format(value) + ' ' + unit
    }

}

export default Units
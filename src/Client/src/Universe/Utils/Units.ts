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

    private static MASS_NAMES = {
        KG: 'kg'
    }

    private static TEMPERATURE_NAMES = {
        K: 'K'
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

    public static formatTemperature(count: number): string {
        if (typeof count !== 'number') {
            return null
        }

        return Numbers.toShort(count) + ' K'
    }

    public static formatDensity(count: number): string {
        return Numbers.toShort(count) + ' kg/m3'
    }

    /**
     * Format mass unit.
     * @param count Count of units.
     * @returns Formatted units.
     */
    public static formatMass(count: number): string {
        return Units.formatToExponential(count, 'kg')
    }

    /**
     * Format luminosity.
     * @param count
     * @returns Formatted luminosity.
     */
    public static formatLuminosity(count: number): string {
        return Units.formatToExponential(count, 'W')
    }

    /**
     * Format unit to form like 2.5e15 kg.
     * @param count Count of units.
     * @param unit Name of unit.
     * @returns Formatted unit.
     */
    private static formatToExponential(count, unit): string {
        if (typeof count !== 'number') {
            return null
        }

        if (count < 1e3) {
            return count + ' ' + unit
        }

        return count.toExponential(1).replace('+', '').replace('.0', '') + ' ' + unit
    }

}

export default Units
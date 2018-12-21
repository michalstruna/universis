/**
 * Utils for units.
 * This utils can convert one unit to another unit.
 * This utils can also format units to some forms:
 * - toFull: 149 597 870 km,
 * - toExponential: 1.5e8 km,
 * - toShort: 149M km.
 */
class Units {

    /**
     * List of all size units.
     */
    public static SIZE = {
        M: { value: 1, shortName: 'm' },
        KM: { value: 1000, shortName: 'km' },
        AU: { value: 149597870700, shortName: 'AU' },
        LY: { value: 9461e12, shortName: 'ly' },
        KLY: { value: 9461e15, shortName: 'kly' },
        MLY: { value: 9461e18, shortName: 'Mly' },
        GLY: { value: 9461e21, shortName: 'Gly' },
        TLY: { value: 9461e24, shortName: 'Tly' }
    }

    /**
     * List of all surface units.
     */
    public static SURFACE = {
        M2: { value: 1, shortName: 'm2' },
        KM2: { value: 1e6, shortName: 'km2' },
        AU2: { value: 2.2e22, shortName: 'AU2' },
        LY2: { value: 8.9e31, shortName: 'ly2' }
    }

    /**
     * List of all volume units.
     */
    public static VOLUME = {
        M3: { value: 1, shortName: 'm3' },
        KM3: { value: 1e9, shortName: 'km3' },
        AU3: { value: 1e33, shortName: 'AU3' },
        LY3: { value: 1e47, shortName: 'ly3' }
    }

    /**
     * List of all time units.
     */
    public static TIME = {
        S: { value: 1, shortName: 's' },
        M: { value: 60, shortName: 'm' },
        H: { value: 3600, shortName: 'h' },
        D: { value: 86400, shortName: 'd' },
        Y: { value: 31557600, shortName: 'r' }
    }

    /**
     * List of mass units.
     */
    public static MASS = {
        KG: { value: 1, shortName: 'kg' }
    }

    /**
     * List of luminosity units.
     */
    public static LUMINOSITY = {
        W: { value: 1, shortName: 'W' }
    }

    /**
     * List of density units.
     */
    public static DENSITY = {
        KG_M3: { value: 1, shortName: 'kg/m3' }
    }

    /**
     * List of temperature units.
     */
    public static TEMPERATURE = {
        K: { value: 1, shortName: 'K' }
    }

    private constructor() {

    }

    /**
     * Format size unit.
     * @param value Amount of units.
     * @param format Formatter function.
     * @param unit Input unit. (optional, default Units.SIZE.KM)
     * @returns Formatted size unit.
     */
    public static formatSize(value: number, format: IUnitFormatter, unit: IUnit = Units.SIZE.KM): string {
        const corresponding = Units.getCorrespondingUnit(value, unit, Units.SIZE)
        return format(corresponding.value, corresponding.unit)
    }

    /**
     * Format surface unit.
     * @param value Amount of units.
     * @param format Formatter function.
     * @param unit Input unit. (optional, default Units.SIZE.KM2)
     * @returns Formatted surface unit.
     */
    public static formatSurface(value: number, format: IUnitFormatter, unit: IUnit = Units.SURFACE.KM2): string {
        const corresponding = Units.getCorrespondingUnit(value, unit, Units.SURFACE)
        return format(corresponding.value, corresponding.unit)
    }

    /**
     * Format volume unit.
     * @param value Amount of units.
     * @param format Formatter function.
     * @param unit Input unit. (optional, default Units.SIZE.KM3)
     * @returns Formatted volume unit.
     */
    public static formatVolume(value: number, format: IUnitFormatter, unit: IUnit = Units.VOLUME.KM3): string {
        const corresponding = Units.getCorrespondingUnit(value, unit, Units.VOLUME)
        return format(corresponding.value, corresponding.unit)
    }

    /**
     * Format mass unit.
     * @param value Amount of units.
     * @param format Formatter function.
     * @param unit Input unit. (optional, default Units.MASS.KG)
     * @returns Formatted size unit.
     */
    public static formatMass(value: number, format: IUnitFormatter, unit: IUnit = Units.MASS.KG): string {
        return format(value, unit)
    }

    /**
     * Format time unit.
     * @param value Amount of units.
     * @param format Formatter function.
     * @param unit Input unit. (optional, default Units.TIME.S)
     * @returns Formatted time unit.
     */
    public static formatTime(value: number, format: IUnitFormatter, unit: IUnit = Units.TIME.S): string {
        const corresponding = Units.getCorrespondingUnit(value, unit, Units.TIME)
        return format(corresponding.value, corresponding.unit)
    }

    /**
     * Format luminosity.
     * @param value Amount of units.
     * @param format Formatter function.
     * @param unit Input unit. (optional, default Units.LUMINOSITY.W).
     * @returns Formatted luminosity.
     */
    public static formatLuminosity(value: number, format: IUnitFormatter, unit: IUnit = Units.LUMINOSITY.W): string {
        return format(value, unit)
    }

    /**
     * Format density.
     * @param value Amount of units.
     * @param format Formatter function.
     * @param unit Input unit. (optional, default Units.DENSITY.KG_M3).
     * @returns Formatted density.
     */
    public static formatDensity(value: number, format: IUnitFormatter, unit: IUnit = Units.DENSITY.KG_M3): string {
        return format(value, unit)
    }

    /**
     * Format temperature.
     * @param value Amount of units.
     * @param format Formatter function.
     * @param unit Input unit. (optional, default Units.TEMPERATURE.K).
     * @returns Formatted temperature.
     */
    public static formatTemperature(value: number, format: IUnitFormatter, unit: IUnit = Units.TEMPERATURE.K): string {
        return format(value, unit)
    }


    /**
     * Format unit to full form (like 149 597 870 km).
     * @param value Amount of units.
     * @param unit Type of unit.
     */
    public static toFull = (value: number, unit?: IUnit): string => {
        const temp = Math.pow(10, Units.getPrecision(value))
        return Units.concatValueWithUnit(value ? parseFloat((Math.round(value * temp) / temp).toString()).toLocaleString() : '0', unit)
    }

    /**
     * Format unit to exponential form (like 1.5e8 km).
     * @param value Amount of units.
     * @param unit Type of unit. (optional)
     */
    public static toExponential = (value: number, unit?: IUnit): string => {
        if (value < 1e3) {
            return Units.toShort(value, unit).replace(/[a-zA-Z]$/, '')
        }

        return Units.concatValueWithUnit(value
            .toExponential(1)
            .replace('+', '')
            .replace('.0', ''), unit)
    }

    /**
     * Format unit fo short form (like 150M km).
     * @param value Amount of units.
     * @param unit Type of unit.
     */
    public static toShort = (value: number, unit?: IUnit): string => {
        const suffixes = ['', 'k', 'M', 'G', 'T', 'P', 'E', 'Y', 'Z']

        for (let i = 0; i <= suffixes.length * 3; i++) {
            if (value < Math.pow(10, i)) {
                const result = Math.round(value / Math.pow(10, i - 3)) / Math.pow(10, 2 - ((i + 2) % 3))
                const suffix = suffixes[Math.floor((i - 1) / 3)]
                return Units.concatValueWithUnit(result + suffix, unit)
            }
        }

        return Units.toExponential(value, unit)

    }

    /**
     * Convert unit to another unit.
     * @param from Initial unit.
     * @param to Target unit.
     * @param value Count of units. (optional, default 1)
     * @returns New unit.
     */
    public static convert(from: IUnit, to: IUnit, value = 1): number {
        return value * (from.value / to.value)
    }

    /**
     * Set corresponding unit. For example 10 AU instead of 149 597 870 000 km.
     * @param value Amount of units.
     * @param unit Current unit.
     * @param  units List of all units of this physics property.
     * @returns Object with value and unit.
     */
    private static getCorrespondingUnit(value: number, unit: IUnit, units: IObject<IUnit>): { value: number, unit: IUnit } {
        let newValue = Units.convert(unit, units[Object.keys(units)[0]], value)
        let newUnit: IUnit

        for (const i in units) {
            const unitNamesKeys = Object.keys(units)
            const nextUnitKey = unitNamesKeys[unitNamesKeys.indexOf(i) + 1]
            const nextUnit = units[(nextUnitKey || '')]

            if (!nextUnit || newValue < (units[nextUnitKey].value * 2)) {
                newUnit = units[i]
                newValue /= units[i].value
                break
            }
        }

        return { value: newValue, unit: newUnit }
    }

    /**
     * Concat value and unit. If there is no unit, returns only value.
     * @param value Value-
     * @param unit Unit. (optional)
     * Value with unit.
     */
    private static concatValueWithUnit(value: number | string, unit?: IUnit): string {
        if (!unit) {
            return value.toString()
        }

        return value + ' ' + unit.shortName
    }

    /**
     * Get precision.
     * Example: 0.123, 1,23, 12,3, 123.
     * @param number Precision.
     */
    private static getPrecision(number: number): number {
        for (let i = -3; i < 3; i++) {
            if (number < Math.pow(10, i)) {
                return -i + 3
            }
        }

        return 0
    }

}

export default Units
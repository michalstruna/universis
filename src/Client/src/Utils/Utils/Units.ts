/**
 * Utils for units (or values without unit).
 * This utils can convert one unit to another unit.
 * Example bellow convert 100 km to 100 000 m:
 * - convert(100, Units.SIZE.KM, Units.SIZE.M)
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
        LY: { value: 9.461e15, shortName: 'ly' },
        KLY: { value: 9.461e18, shortName: 'kly' },
        MLY: { value: 9.461e21, shortName: 'Mly' },
        GLY: { value: 9.461e24, shortName: 'Gly' },
        TLY: { value: 9.461e27, shortName: 'Tly' }
    }

    /**
     * List of all surface units.
     */
    public static SURFACE = {
        M2: { value: 1, shortName: 'm2' },
        KM2: { value: 1e6, shortName: 'km2' },
        AU2: { value: 2.2e22, shortName: 'AU2' },
        LY2: { value: 8.9e37, shortName: 'ly2' }
    }

    /**
     * List of all volume units.
     */
    public static VOLUME = {
        M3: { value: 1, shortName: 'm3' },
        KM3: { value: 1e9, shortName: 'km3' },
        AU3: { value: 3.3e33, shortName: 'AU3' },
        LY3: { value: 8.47e56, shortName: 'ly3' }
    }

    /**
     * List of all time units.
     */
    public static TIME = {
        MS: { value: 1, shortName: 'ms' },
        S: { value: 1e3, shortName: 's' },
        M: { value: 6e4, shortName: 'm' },
        H: { value: 36e5, shortName: 'h' },
        D: { value: 864e5, shortName: 'd' },
        Y: { value: 315576e5, shortName: 'r' }
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
        W: { value: 1, shortName: 'W' },
        KW: { value: 1e3, shortName: 'kW' },
        MW: { value: 1e6, shortName: 'MW' },
        GW: { value: 1e9, shortName: 'GW' },
        TW: { value: 1e12, shortName: 'TW' },
        PW: { value: 1e15, shortName: 'PW' },
        EW: { value: 1e18, shortName: 'EW' },
        ZW: { value: 1e21, shortName: 'ZW' },
        YW: { value: 1e24, shortName: 'YW' }
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

    /**
     * List of angle units.
     */
    public static ANGLE = {
        DEGREE: { value: 3600, shortName: '°', withSpace: false }
    }

    /**
     * List of velocity units.
     */
    public static VELOCITY = {
        M_S: { value: 1, shortName: 'm/s' },
        KM_S: { value: 1000, shortName: 'km/s' }
    }

    /**
     * List of pressure units.
     */
    public static PRESSURE = {
        PA: { value: 1, shortName: 'Pa' },
        KPA: { value: 1000, shortName: 'kPa' },
        MPA: { value: 1e6, shortName: 'MPa' },
        GPA: { value: 1e9, shortName: 'GPa' }
    }

    /**
     * List of acceleration units.
     */
    public static ACCELERATION = {
        M_S2: { value: 1, shortName: 'm/s2' },
        KM_S2: { value: 1000, shortName: 'km/s2' }
    }

    /**
     * List of gravitational parameter units.
     */
    public static GRAVITATIONAL_PARAMETER = {
        KM3_S2: { value: 1, shortName: 'km3/s2' }
    }

    private constructor() {

    }

    /**
     * Format unit to full form (like 149 597 870 km).
     * @param value Amount of units.
     * @param unit Type of unit. (optional, default without unit)
     * @param correspondentUnits Find optional unit. For example 100 AU is better than 14 959 787 000 000 m. (optional)
     * @param threshold Threshold of use bigger unit. If threshold is 2, km unit will be used only for values 2000 or bigger. (optional)
     * @returns Formatted value like 149 597 870 km.
     */
    public static toFull = (value: number, unit?: Universis.Unit, correspondentUnits?: Universis.Map<Universis.Unit>, threshold?: number): string => {
        const minus = value < 0
        value = Math.abs(value)

        if (value === null || value === undefined) {
            return null
        }

        if (correspondentUnits) {
            const temp = Units.getCorrespondingUnit(value, unit, correspondentUnits, threshold)
            value = temp.value
            unit = temp.unit
        }


        if (!value) {
            return '0'
        } else if (value < 1e-3) {
            return Units.toExponential(value, unit)
        }

        const temp = Math.pow(10, Units.getPrecision(value))
        return (minus ? '-' : '') + Units.concatValueWithUnit(value ? parseFloat((Math.round(value * temp) / temp).toString()).toLocaleString() : '0', unit)
    }

    /**
     * Format unit to exponential form (like 1.5e8 km).
     * @param value Amount of units.
     * @param unit Type of unit. (optional)
     * @param correspondentUnits Find optional unit. For example 100 AU is better than 14 959 787 000 000 m. (optional)
     * @param threshold Threshold of use bigger unit. If threshold is 2, km unit will be used only for values 2000 or bigger. (optional)
     * @returns Formatted value like 1.49e8 km.
     */
    public static toExponential = (value: number, unit?: Universis.Unit, correspondentUnits?: Universis.Map<Universis.Unit>, threshold?: number): string => {
        if (value === null || value === undefined) {
            return null
        }

        const minus = value < 0
        value = Math.abs(value)

        if (correspondentUnits) {
            const temp = Units.getCorrespondingUnit(value, unit, correspondentUnits, threshold)
            value = temp.value
            unit = temp.unit
        }

        if (value > 1 && value < 1e3) {
            return Units.toShort(value, unit).replace(/[a-zA-Z]$/, '')
        }

        return (minus ? '-' : '') + Units.concatValueWithUnit(value
            .toExponential(1)
            .replace('+', '')
            .replace('.0', ''), unit)
    }

    /**
     * Format unit fo short form (like 150M km).
     * @param value Amount of units.
     * @param unit Type of unit.
     * @param correspondentUnits Find optional unit. For example 100 AU is better than 14 959 787 000 000 m. (optional)
     * @param threshold Threshold of use bigger unit. If threshold is 2, km unit will be used only for values 2000 or bigger. (optional)
     * @returns Formatted value like 149M km.
     */
    public static toShort = (value: number, unit?: Universis.Unit, correspondentUnits?: Universis.Map<Universis.Unit>, threshold?: number): string => {
        if (value === null || value === undefined) {
            return null
        }

        const minus = value < 0
        value = Math.abs(value)

        if (correspondentUnits) {
            const temp = Units.getCorrespondingUnit(value, unit, correspondentUnits, threshold)
            value = temp.value
            unit = temp.unit
        }

        if (!value) {
            return '0'
        } else if (value < 1e-3) {
            return Units.toExponential(value, unit)
        } else if (value < 1) {
            return Units.toFull(value, unit)
        }

        const suffixes = ['', 'k', 'M', 'G', 'T', 'P', 'E', 'Y', 'Z']

        for (let i = 0; i <= suffixes.length * 3; i++) {
            if (value < Math.pow(10, i)) {
                const result = Math.round(value / Math.pow(10, i - 3)) / Math.pow(10, 2 - ((i + 2) % 3))
                const suffix = suffixes[Math.floor((i - 1) / 3)]
                return (minus ? '-' : '') + Units.concatValueWithUnit(result + (suffix || ''), unit)
            }
        }

        return Units.toExponential(value, unit)

    }

    /**
     * Check if values are different (ignores too small changes).
     * @param value1
     * @param value2
     * @param coefficient
     * @returns Values are different.
     */
    public static isDifferent(value1: number, value2: number, coefficient = 1): boolean {
        return Math.max(value1, value2) / Math.min(value1, value2) > coefficient
    }

    /**
     * Convert unit to another unit.
     * @param from Initial unit.
     * @param to Target unit.
     * @param value Count of units. (optional, default 1)
     * @returns New unit.
     */
    public static convert(from: Universis.Unit, to: Universis.Unit, value = 1): number {
        return value * (from.value / to.value)
    }

    /**
     * Set corresponding unit. For example 10 AU instead of 149 597 870 000 km.
     * @param value Amount of units.
     * @param unit Current unit.
     * @param units List of all units of this physics property.
     * @param threshold Threshold of use bigger unit. If threshold is 2, km unit will be used only for values 2000 or bigger. (optional, default 2)
     * @returns Object with value and unit.
     */
    private static getCorrespondingUnit(value: number, unit: Universis.Unit, units: Universis.Map<Universis.Unit>, threshold: number = 2): { value: number, unit: Universis.Unit } {
        let newValue = Units.convert(unit, units[Object.keys(units)[0]], value)
        let newUnit = units[Object.keys(unit)[0]]

        for (const i in units) {
            const unitNamesKeys = Object.keys(units)
            const nextUnitKey = unitNamesKeys[unitNamesKeys.indexOf(i) + 1]
            const nextUnit = units[(nextUnitKey || '')]

            if (!nextUnit || newValue < (units[nextUnitKey].value * threshold)) {
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
    private static concatValueWithUnit(value: number | string, unit?: Universis.Unit): string {
        if (!unit) {
            return value.toString().replace('.', ',')
        }

        return (value + (unit.withSpace === false ? '' : ' ') + unit.shortName).replace('.', ',')
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
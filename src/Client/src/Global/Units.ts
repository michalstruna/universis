/**
 * Interface for unit of some physics property.
 */
declare interface IUnit {

    /**
     * Short name of unit like kg, m or kg/m3.
     */
    shortName: string

    /**
     * Relative value against base unit of this property.
     * kg is 1, because kg is main unit of mass.
     * cm is 0.1, because m is main unit of mass.
     */
    value: number

}

/**
 * Interface for function, that format unit.
 */
declare type IUnitFormatter = IFunction2<number, IUnit, string>
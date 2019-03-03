declare namespace Universis {

    /**
     * Interface for unit of some physics property.
     */
    export interface Unit {

        /**
         * Short name of unit like kg, m or kg/m3.
         */
        shortName: string

        /**
         * Relative value against base unit of this property.
         * kg is 1, because kg is main unit of mass.
         * cm is 0.1, because m is main unit of size.
         */
        value: number

        /**
         * Between unit and value is space. (optional, default true)
         */
        withSpace?: boolean

    }

}
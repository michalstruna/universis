/**
 * Interface for new body.
 * There is no ID, because of ID was not generated yet.
 */
declare interface INewSimpleBody {

    /**
     * Name of body.
     */
    name: string

    /**
     * Size of body.
     */
    diameter: {

        /**
         * Equatorial diameter of body [km].
         */
        equatorial: number

        /**
         * Polar diameter of body [km].
         */
        polar: number

    }

    /**
     * Mass of body [kg].
     */
    mass: number

    /**
     * Data about body orbit.
     */
    orbit: {

        /**
         * Largest distance from parent body [km].
         */
        apocenter: number

        /**
         * Smallest distance from parent body [km].
         */
        pericenter: number

        /**
         * Eccentricity of orbit.
         */
        eccentricity: number

        /**
         * Inclination of orbit [deg].
         */
        inclination: number

        /**
         * Position of body on orbit at 1. 1. 2000 00.00:00,00 [deg].
         */
        startAngle: number

        /**
         * One year [Earth years].
         */
        period: number

        /**
         * Rotation of orbit.
         */
        rotation: number

    }

    /**
     * Period of move around itself. [Earth days].
     */
    period: number

    /**
     * List of all rings of body.
     */
    rings: IBodyRing[]

    /**
     * Name of body texture.
     */
    texture: string

    /**
     * Axial tilt [°]
     */
    tilt: number

    /**
     * Type of body.
     */
    type: IBodyType

    /**
     * ID of parent body. If null, body is child of universe.
     */
    parentId?: string

}

declare interface IBodyRing {

    /**
     * Diameter of ring.
     */
    diameter: {

        /**
         * Min diameter of ring.
         */
        min: number

        /**
         * Max diameter of ring.
         */
        max: number

    }

    /**
     * Name of ring texture.
     */
    texture: string

}

declare interface INewBody extends INewSimpleBody {

}

/**
 * Interface for base body.
 * This is parent of all another interfaces for bodies.
 */
declare interface ISimpleBody extends INewSimpleBody {

    /**
     * Unique ID of body.
     */
    _id: string

}

/**
 * Interface for body.
 * It contains all data about body.
 */
declare interface IBody extends INewBody, ISimpleBody {

}
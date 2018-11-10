/**
 * Interface for new body.
 * There is no ID, because of ID was not generated yet.
 */
declare interface INewBody {

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
        x: number

        /**
         * Polar diameter of body [km].
         */
        y: number

        /**
         * Secondary equatorial diameter of body [km].
         */
        z: number

    }

    /**
     * Mass of body [kg].
     */
    mass: number

    /**
     * Speed.
     */
    moveSpeed: {

        /**
         * Maximum speed.
         */
        max: number

        /**
         * Minimum speed.
         */
        min: number

    }

    /**
     * Magnitude.
     */
    magnitude: {

        /**
         * Relative magnitude.
         */
        relative: number

        /**
         * Absolute magnitude.
         */
        absolute: number

    }

    /**
     * Tempperature [K].
     */
    temperature: {

        /**
         * Temperature in the center.
         */
        inner: number

        /**
         * Temperature on surface.
         */
        outer: number

    }

    axis: {

        /**
         * Period of rotation around axis [days].
         */
        period: number

        /**
         * Tilt of axis [°].
         */
        tilt: number

    }

    /**
     * Albedo.
     */
    albedo: number

    /**
     * Chemical composition of body.
     */
    composition: [{

        /**
         * Short name of element.
         */
        element: string

        /**
         * Percentage part of body.
         */
        percentage: number

    }]

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
     * Static position of body.
     */
    position?: {

        /**
         * Horizontal angle [°].
         */
        alpha: number

        /**
         * vertical angle [°].
         */
        beta: number

        /**
         * Distance from center.
         */
        distance: number

    }

    /**
     * List of all rings of body.
     */
    rings: IBodyRing[]

    /**
     * Name of body texture.
     */
    texture: string

    /**
     * Discover info.
     */
    discover: {

        /**
         * Name of discoverer.
         */
        author: string

        /**
         * ISO date of discover.
         */
        date: string

    }

    /**
     * Type of body.
     */
    typeId: string

    /**
     * ID of parent body. If null, body is child of universe.
     */
    parentId?: string

}

/**
 * Interface for simple body.
 */
declare interface ISimpleBody {

    /**
     * Unique ID of body.
     */
    _id: string

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
        x: number

        /**
         * Polar diameter of body [km].
         */
        y: number

        /**
         * Secondary equatorial diameter of body [km].
         */
        z: number

    }

    /**
     * Flattening of body.
     */
    flattening: number

    /**
     * Surface area of body.
     */
    surface: number

    /**
     * Volume of body.
     */
    volume: number

    /**
     * Mass of body [kg].
     */
    mass: number

    /**
     * Density of body [kg/m^3].
     */
    density: number

    /**
     * Escape velocity [kg]
     */
    escapeVelocity: number

    /**
     * Count of satellites.
     */
    satellitesCount: number

    /**
     * Speed.
     */
    moveSpeed: {

        /**
         * Maximum speed.
         */
        max: number

        /**
         * Minimum speed.
         */
        min: number

    }

    /**
     * Magnitude.
     */
    magnitude: {

        /**
         * Relative magnitude.
         */
        relative: number

        /**
         * Absolute magnitude.
         */
        absolute: number

    }

    /**
     * Tempperature [K].
     */
    temperature: {

        /**
         * Temperature in the center.
         */
        inner: number

        /**
         * Temperature on surface.
         */
        outer: number

    }

    axis: {

        /**
         * Period of rotation around axis [days].
         */
        period: number

        /**
         * Tilt of axis [°].
         */
        tilt: number

        /**
         * Rotation speed [m/s].
         */
        rotationSpeed: number

    }

    /**
     * Albedo.
     */
    albedo: number

    /**
     * Chemical composition of body.
     */
    composition: [{

        /**
         * Short name of element.
         */
        element: string

        /**
         * Percentage part of body.
         */
        percentage: number

    }]

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

        /**
         * Circuit of orbit.
         */
        circuit: number

        /**
         * Velocity of body around orbit.
         */
        velocity: number

    }

    /**
     * Static position of body.
     */
    position?: {

        /**
         * Horizontal angle [°].
         */
        alpha: number

        /**
         * vertical angle [°].
         */
        beta: number

        /**
         * Distance from center.
         */
        distance: number

    }

    /**
     * List of all rings of body.
     */
    rings: IBodyRing[]

    /**
     * Name of body texture.
     */
    texture: string

    /**
     * Discover info.
     */
    discover: {

        /**
         * Name of discoverer.
         */
        author: string

        /**
         * ISO date of discover.
         */
        date: string

    }

    /**
     * Type of body.
     */
    type: IBodyType

    /**
     * ID of parent body. If null, body is child of universe.
     */
    parentId?: string

}

/**
 * Interface for body.
 * It contains all data about body.
 */
declare interface IBody extends ISimpleBody {

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
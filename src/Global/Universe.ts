declare namespace Universis {

    export namespace Universe {

        /**
         * Interface for body.
         * It contains all data about body.
         */
        export interface Body extends Body.Simple {

            /**
             * Discussions about body.
             */
            discussions: Universis.Discussion[]

            /**
             * Timeline of body.
             */
            events: Universis.Event[]

        }

        export namespace Body {

            /**
             * Interface for simple body.
             */
            export interface Simple {

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
                 * Circuit of body.
                 */
                circuit: number

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
                 * Standard gravitational parameter [km^3/s^2].
                 */
                gravitationalParameter: number

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
                    velocity: number

                }

                /**
                 * Albedo.
                 */
                albedo: number

                /**
                 * Luminosity [W].
                 */
                luminosity: number

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
                    apsis: number

                    /**
                     * Smallest distance from parent body [km].
                     */
                    periapsis: number

                    /**
                     * Semi-major axis of orbit [km].
                     */
                    semiMajorAxis: number

                    /**
                     * Semi-minor axis of orbit [km].
                     */
                    semiMinorAxis: number

                    /**
                     * Eccentricity of orbit.
                     */
                    eccentricity: number

                    /**
                     * Inclination of orbit [deg].
                     */
                    inclination: number

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
                    velocity: { max: number, avg: number, min: number }

                    /**
                     * Average angle velocity.
                     */
                    angleVelocity: number

                    /**
                     * Timestamp of periapsis.
                     */
                    periapsisTime: number

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

                },

                /**
                 * Data for virtual bodies.
                 */
                particles?: {

                    /**
                     * Thickness of belt.
                     */
                    thickness?: number

                    /**
                     * Particles size.
                     */
                    size: number

                    /**
                     * Count of particles.
                     */
                    count: number

                }

                /**
                 * List of all rings of body.
                 */
                rings: Ring[]

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

                atmosphere?: {

                    /**
                     * Chemical composition of atmosphere.
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

                    }],

                    /**
                     * Atmosphere pressure.
                     */
                    pressure?: number

                }
                /**
                 * Gravitational acceleration.
                 */
                gravitationalAcceleration: number

                /**
                 * Description of body.
                 */
                description: string

                /**
                 * Type of body.
                 */
                type: Type

                /**
                 * ID of parent body. If null, body is child of universe.
                 */
                parentId?: string

                /**
                 * Parent of body.
                 */
                parent?: Simple

            }

            /**
             * Interface for new body.
             * There is no ID, because of ID was not generated yet.
             */

            export interface New extends Simple {

                _id: never

                parentId: string

            }

            /**
             * Interface for body type.
             */
            export interface Type extends Type.New {

                /**
                 * Unique identifier of body type.
                 */
                _id: string

            }

            export namespace Type {

                /**
                 * Interface for new body type.
                 */
                export interface New {

                    /**
                     * Name of body type.
                     */
                    name: string

                    /**
                     * Color of body light.
                     */
                    emissiveColor?: string

                    /**
                     * Body
                     */
                    particlesGenerator?: string

                    /**
                     * Default texture of type.
                     */
                    texture: string

                    /**
                     * Body is invisible.
                     */
                    visible?: boolean

                }

            }

        }

        /**
         * Interface for body ring.
         */
        export interface Ring {

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

        export interface Comment {


        }

        export namespace Comment {

            export interface Simple {

            }

            export interface New {

            }

        }

    }

}
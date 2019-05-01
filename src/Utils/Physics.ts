// TODO: Move to constants or use Units utils?
const YEAR_TO_SECONDS = 31556926

/**
 * Utils for physics.
 */
class Physics {

    /**
     * Gravitational constants.
     */
    private static G = 6.6742e-11

    /**
     * Speed of light.
     */
    private static C = 299792.458

    /**
     * Stefan-boltzmann constant.
     */
    private static STEFAN_BOLTZMANN = 5.670367e-8

    /**
     * Calculate semi-major axis.
     * @param body
     * @returns Semi-major axis.
     */
    public static getSemiMajorAxis(body: Universis.Universe.Body.Simple): number {
        if (!body.orbit) {
            return null
        }

        return Math.floor((body.orbit.apsis + body.orbit.periapsis) / 2)
    }

    /**
     * Calculate semi-major axis.
     * @param body
     * @returns Semi-major axis.
     */
    public static getSemiMinorAxis(body: Universis.Universe.Body.Simple): number {
        if (!body.orbit) {
            return null
        }

        if (body.orbit.semiMinorAxis) {
            body.orbit.semiMajorAxis = this.getSemiMajorAxis(body)
        }

        return Math.floor(body.orbit.semiMajorAxis - Math.sqrt(1 - Math.pow(body.orbit.eccentricity, 2)))
    }

    /**
     * Calculate gravitational parameter mi.
     * @param body
     * @returns Standard gravitational parameter.
     */
    public static getGravitationalParameter(body: Universis.Universe.Body.Simple): number {
        return this.G * (body.mass || 10e24) / 10e8 // TODO
    }

    /**
     * Get orbit period of body.
     * @param body Body.
     * @param parent Parent body.
     * @returns Orbit period [years].
     */
    public static getOrbitPeriod(body: Universis.Universe.Body.Simple, parent: Universis.Universe.Body.Simple): number {
        if (!body.orbit || !parent) {
            return null
        }


        if (!parent.gravitationalParameter) {
            parent.gravitationalParameter = this.getGravitationalParameter(parent)
        }

        return (2 * Math.PI * Math.sqrt(Math.pow(body.orbit.semiMajorAxis, 3) / parent.gravitationalParameter) / YEAR_TO_SECONDS) || 1e9
    }

    /**
     * Get circuit of body orbit.
     * @param body
     * @returns Circuit of body orbit or null.
     */
    public static getOrbitCircuit(body: Universis.Universe.Body.Simple): number | null {
        if (!body.orbit) {
            return null
        }

        if (!body.orbit.semiMajorAxis) {
            body.orbit.semiMajorAxis = this.getSemiMajorAxis(body)
        }

        if (!body.orbit.semiMinorAxis) {
            body.orbit.semiMinorAxis = this.getSemiMinorAxis(body)
        }

        return Math.PI * Math.sqrt(2 * (Math.pow(body.orbit.semiMajorAxis, 2) + Math.pow(body.orbit.semiMinorAxis, 2)))
    }

    /**
     * Get polar diameter of body.
     * @param body
     * @returns Polar diameter of body.
     */
    public static getDiameterY(body: Universis.Universe.Body.Simple): number {
        return body.diameter.y || body.diameter.x
    }

    /**
     * Get second horizontal diameter of body.
     * @param body
     * @returns Second horizontal diameter of body.
     */
    public static getDiameterZ(body: Universis.Universe.Body.Simple): number {
        return body.diameter.z || body.diameter.x
    }

    /**
     * Get body circuit.
     * @param body
     * @returns Body circuit.
     */
    public static getBodyCircuit(body: Universis.Universe.Body.Simple): number {
        return Math.PI * Math.sqrt(2 * (Math.pow(body.diameter.x / 2, 2) + Math.pow(body.diameter.z / 2, 2)))
    }

    /**
     * Get surface of body.
     * @param body
     * @returns Surface of body.
     */
    public static getSurface(body: Universis.Universe.Body.Simple): number {
        return 4 * Math.PI * (body.diameter.x / 2) * (body.diameter.z / 2)
    }

    /**
     * Get volume of body.
     * @param body
     * @returns Volume of body.
     */
    public static getVolume(body: Universis.Universe.Body.Simple): number {
        return (4 / 3) * Math.PI * (body.diameter.x / 2) * (body.diameter.y / 2) * (body.diameter.z / 2)
    }

    /**
     * Get density of body.
     * @param body
     * @returns Density of body or null.
     */
    public static getDensity(body: Universis.Universe.Body.Simple): number | null {
        if (!body.mass || !body.volume) {
            return null
        }

        return body.mass / (body.volume * 1e9)
    }

    /**
     * Get escape velocity of body.
     * @param body
     * @returns Escape velocity of body of null.
     */
    public static getEscapeVelocity(body: Universis.Universe.Body.Simple): number | null {
        if (!body.mass) {
            return null
        }

        return Math.sqrt(2 * Physics.G * body.mass / (Physics.getAverageRadius(body) * 10e8))
    }

    /**
     * Get velocity in point.
     * @param areaPerSecond
     * @param distance
     * @returns Velocity.
     */
    public static getVelocity(areaPerSecond: number, distance: number): number {
        return 2 * areaPerSecond / distance
    }

    /**
     * Get angle velocity in point.
     * @param body
     * @param velocity
     * @returns Angle velocity.
     */
    public static getOrbitAngleVelocity(body: Universis.Universe.Body.Simple, velocity: number): number {
        return velocity / body.orbit.circuit
    }

    /**
     * Get angle velocity.
     * @param body
     * @return Angle velocity.
     */
    public static getAngleVelocity(body: Universis.Universe.Body.Simple): number {
        if (!body.orbit) {
            return null
        }

        return 2 * Math.PI / (body.orbit.period * YEAR_TO_SECONDS)
    }

    /**
     * Get true anomaly.
     * @param body
     * @param time
     * @param precision
     * @param maxIterations
     * @returns Body true anomaly in time.
     */
    public static getPosition(body: Universis.Universe.Body.Simple, time: number, precision: number = 0.001, maxIterations: number = 5): any {
        const M = 2.0 * Math.PI * (new Date(body.orbit.periapsisTime || new Date().getTime()).getTime() - time) / (body.orbit.period * YEAR_TO_SECONDS * 1000)
        let E = M
        let eNext = 0

        while (maxIterations--) {
            eNext = E + (M - (E - body.orbit.eccentricity * Math.sin(E))) / (1 - body.orbit.eccentricity * Math.cos(E))

            if (Math.abs(eNext - E) < precision) {
                break
            }

            E = eNext
        }

        //const v = 2 * Math.atan(Math.sqrt((1 + body.orbit.eccentricity) / (1 - body.orbit.eccentricity)) * Math.tan(E / 2))

        return E - Math.PI
    }

    /**
     * Get velocity of body around orbit.
     * @param body
     * @param parent
     * @param distance
     * @returns Velocity of body or null.
     */
    public static getOrbitVelocity(body: Universis.Universe.Body.Simple, parent: Universis.Universe.Body.Simple, distance: number): number {
        if (!body.orbit) {
            return null
        }

        return Math.sqrt(parent.gravitationalParameter * ((2 / distance) - (1 / body.orbit.semiMajorAxis)))
    }

    /**
     * Get flattening of body.
     * @param body
     * @returns Flattening of body.
     */
    public static getFlattening(body: Universis.Universe.Body.Simple): number {
        return 1 - (Physics.getDiameterY(body) / body.diameter.x)
    }

    /**
     * Get luminosity of body.
     * @param body
     * @returns Luminosity of body.
     */
    public static getLuminosity(body: Universis.Universe.Body.Simple): number {
        if (!body.temperature.outer && (!body.type || !body.type.emissiveColor)) {
            return null
        }

        return 4 * Math.PI * Math.pow(Physics.getAverageRadius(body) * 1e3, 2) * Physics.STEFAN_BOLTZMANN * Math.pow(body.temperature.outer, 4)
    }

    public static getAxisVelocity(body: Universis.Universe.Body.Simple): number {
        if (!body.axis.period) {
            return null
        }

        if (!body.circuit) {
            body.circuit = Physics.getBodyCircuit(body)
        }

        return (body.circuit * 1e3) / (body.axis.period * 1440 * 60)
    }

    /**
     * Get average radius of body.
     * @param body
     * @returns Average radius of body.
     */
    private static getAverageRadius(body: Universis.Universe.Body.Simple): number {
        return (body.diameter.x + Physics.getDiameterY(body) + Physics.getDiameterZ(body)) / 6
    }

    /**
     * Get a.
     * @param body
     * @returns Gravitational acceleration.
     */
    public static getGravitationalAcceleration(body: Universis.Universe.Body.Simple): number {
        return Physics.G * body.mass / Math.pow(Physics.getAverageRadius(body) * 1e3, 2)
    }

}

export default Physics
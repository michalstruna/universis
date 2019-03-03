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
        return Physics.getCircuit(body.diameter.x, body.diameter.z)
    }

    /**
     * Get surface of body.
     * @param body
     * @returns Surface of body.
     */
    public static getSurface(body: Universis.Universe.Body.Simple): number {
        return 4 * Math.PI * Math.pow(Physics.getAverageRadius(body), 2) // TODO: Get surface of ellipsoloid instead of sphere.
    }

    /**
     * Get volume of body.
     * @param body
     * @returns Volume of body.
     */
    public static getVolume(body: Universis.Universe.Body.Simple): number {
        return (4 / 3) * Math.PI * Math.pow(Physics.getAverageRadius(body), 3) // TODO: Get volume of ellipsoloid instead of sphere.
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

        const velocity = Math.sqrt(2 * Physics.G * body.mass / (Physics.getAverageRadius(body) * 10e8))

        if (velocity > Physics.C) {
            return null
        }

        return velocity
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

        return Math.PI * Math.sqrt(2 * (Math.pow(body.orbit.apocenter, 2) + Math.pow(body.orbit.pericenter, 2)))
    }

    /**
     * Get area of orbit.
     * @param body
     * @returns Area of orbit.
     */
    public static getOrbitArea(body: Universis.Universe.Body.Simple): number {
        const a = (body.orbit.apocenter + body.orbit.pericenter) / 2
        const b = a * Math.sqrt(1 - Math.pow(body.orbit.eccentricity, 2))
        return Math.PI * a * b
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
     * @param areaPerSecond
     * @param circuit
     * @param distance
     * @returns Angle velocity [rad].
     */
    public static getAngleVelocity(areaPerSecond: number, circuit: number, distance: number): number {
        return (2 * areaPerSecond / distance) / circuit
    }

    /**
     * Get velocity of body around orbit.
     * @param body
     * @returns Velocity of body or null.
     */
    public static getOrbitVelocity(body: Universis.Universe.Body.Simple): { min: number, avg: number, max: number } | null {
        if (!body.orbit) {
            return null
        }

        return {
            min: 2 * body.temp.orbitAreaPerSecond / body.orbit.apocenter,
            avg: 2 * body.temp.orbitAreaPerSecond / ((body.orbit.apocenter + body.orbit.pericenter) / 2),
            max: 2 * body.temp.orbitAreaPerSecond / body.orbit.pericenter
        }
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
        if (!body.temperature.outer) { // TODO: If emissive body.
            return null
        }

        return 4 * Math.PI * Math.pow(Physics.getAverageRadius(body) * 1e3, 2) * Physics.STEFAN_BOLTZMANN * Math.pow(body.temperature.outer, 4)
    }

    /**
     * Get semi-major axis.
     * @param body
     * @returns Semi-major axis.
     */
    public static getSemiMajorAxis(body: Universis.Universe.Body.Simple): number {
        if (!body.orbit) {
            return null
        }

        return Math.floor(Physics.getAverage(body.orbit.pericenter, body.orbit.apocenter))
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

    /**
     * Get circuit of ellipse.
     * @param diameters All diameters dimensions.
     * @returns circuit.
     */
    private static getCircuit(...diameters: number[]): number {
        return Math.PI * Physics.getAverage(...diameters)
    }

    /**
     * Get average value of array of numbers.
     * @param values
     * @returns Average value.
     */
    private static getAverage(...values: number[]): number {
        let sum = 0

        for (const dimension of values) {
            sum += dimension
        }

        return sum / values.length
    }

}

export default Physics
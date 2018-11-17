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
    public static getDiameterY(body: ISimpleBody): number {
        return body.diameter.y || body.diameter.x
    }

    /**
     * Get second horizontal diameter of body.
     * @param body
     * @returns Second horizontal diameter of body.
     */
    public static getDiameterZ(body: ISimpleBody): number {
        return body.diameter.z || body.diameter.x
    }

    /**
     * Get surface of body.
     * @param body
     * @returns Surface of body.
     */
    public static getSurface(body: ISimpleBody): number {
        return 4 * Math.PI * Math.pow(Physics.getAverageRadius(body), 2) // TODO: Get surface of ellipsoloid instead of sphere.
    }

    /**
     * Get volume of body.
     * @param body
     * @returns Volume of body.
     */
    public static getVolume(body: ISimpleBody): number {
        return (4 / 3) * Math.PI * Math.pow(Physics.getAverageRadius(body), 3) // TODO: Get volume of ellipsoloid instead of sphere.
    }

    /**
     * Get density of body.
     * @param body
     * @returns Density of body or null.
     */
    public static getDensity(body: ISimpleBody): number | null {
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
    public static getEscapeVelocity(body: ISimpleBody): number | null {
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
    public static getOrbitCircuit(body: ISimpleBody): number | null {
        if (!body.orbit) {
            return null
        }

        return Math.PI * Math.sqrt(2 * (Math.pow(body.orbit.apocenter, 2) + Math.pow(body.orbit.pericenter, 2)))
    }

    /**
     * Get velocity of body around orbit.
     * @param body
     * @returns Velocity of body or null.
     */
    public static getOrbitVelocity(body: ISimpleBody): number | null {
        if (!body.orbit) {
            return null
        }

        return body.orbit.circuit / (body.orbit.period * 365.25 * 23.93 * 3600)
    }

    /**
     * Get flattening of body.
     * @param body
     * @returns Flattening of body.
     */
    public static getFlattening(body: ISimpleBody): number {
        return 1 - (Physics.getDiameterY(body) / body.diameter.x)
    }

    /**
     * Get luminosity of body.
     * @param body
     * @returns Luminosity of body.
     */
    public static getLuminosity(body: ISimpleBody): number {
        if (!body.temperature.outer) { // TODO: If emissive body.
            return null
        }

        return 4 * Math.PI * Math.pow(Physics.getAverageRadius(body) * 1e3, 2) * Physics.STEFAN_BOLTZMANN * Math.pow(body.temperature.outer, 4)
    }

    /**
     * Get average radius of body.
     * @param body
     * @returns Average radius of body.
     */
    private static getAverageRadius(body: ISimpleBody): number {
        return (body.diameter.x + Physics.getDiameterY(body) + Physics.getDiameterZ(body)) / 6
    }

}

export default Physics
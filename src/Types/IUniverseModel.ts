/**
 * Interface for universe model.
 */
declare interface IUniverseModel {

    /**
     * Get all bodies.
     * @returns List of all bodies.
     */
    getBodies(): IShortBody[]

    /**
     * Get body by name.
     * @param name Name of body.
     * @returns Data about body.
     */
    getBodyByName(name: string): IBody

}
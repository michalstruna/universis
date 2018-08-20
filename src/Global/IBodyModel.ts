/**
 * Interface for body model.
 */
declare interface IBodyModel {

    /**
     * Create new body.
     * @param data Body data.
     * @returns Promise with ID of created body.
     * @returns Promise with error 400, if values are invalid.
     * @returns Promise with error 409, if there is already body with this name.
     */
    addBody(data: INewBody): Promise<string>

    /**
     * Get all bodies.
     * @param order Order of bodies.
     * @param criterion Order criterion.
     * @param limit Max count of bodies.
     * @param offset Index of first body.
     * @returns Promise with list of all bodies.
     */
    getBodies(order: string, criterion: string, limit: number, offset: number): Promise<ISimpleBody[]>

    /**
     * Get body by its ID.
     * @param id ID of body.
     * @returns Promise with body.
     * @returns Promise with error 404, if body with this ID was not found.
     */
    getBody(id: string): Promise<IBody>

    /**
     * Remove all bodies.
     * @returns Promise with count of removed bodies.
     * @returns Promise with error 404, if there is no body to remove.
     */
    removeBodies(): Promise<number>

    /**
     * Remove body by its ID.
     * @param id ID of body.
     * @param force Remove also children of body.
     * @returns Empty promise.
     * @returns Promise with error 400. if force is false and body has some children.
     * @returns Promise with error 404, if body with this ID was not found.
     */
    removeBody(id: string, force: boolean): Promise<void>

    /**
     * Update body by its ID.
     * @param id ID of body.
     * @param updatedBody New data.
     * @returns Empty promise.
     * @returns Promise with error 400, if values are invalid.
     * @returns Promise with error 404, if body with this ID was not found.
     * @returns Promise with error 409, if there is already body with this name.
     */
    updateBody(id: string, updatedBody: IBody | ISimpleBody): Promise<void>

    /**
     * Get count of all bodies.
     * @returns Promise with count of all bodies.
     */
    getBodiesCount(): Promise<any>

}
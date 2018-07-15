/**
 * Interface for universe model.
 */
declare interface IUniverseModel {

    /**
     * Get all bodies.
     * @param token Authentication token.
     * @returns Promise with list of all bodies.
     */
    getBodies(token: string): Promise<IBaseBody[]>

    /**
     * Get body by ID.
     * @param bodyId ID of body.
     * @param token Authentication token.
     * @returns Promise with data about body.
     */
    getBodyById(bodyId: string, token: string): Promise<IBody>

    /**
     * Add body to DB.
     * @param body New body.
     * @param token Authentication token.
     * @returns Promise with new body.
     */
    addBody(body: INewBody, token: string): Promise<IBaseBody>

    /**
     * Update body in DB.
     * @param body New body.
     * @param token Authentication token.
     * @returns Empty promise.
     */
    updateBody(body: IBody, token: string): Promise<void>

    /**
     * Delete body by id.
     * @param bodyId ID of body.
     * @param token Authentication token.
     * @returns Promise with count of removed bodies.
     */
    removeBodyById(bodyId: string, token: string): Promise<number>

}
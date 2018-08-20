/**
 * Interface for body model.
 */
declare interface IBodyTypeModel {

    /**
     * Create new body type.
     * @param  name Name of body type.
     * @returns Promise with ID of created body type.
     * @returns Promise with error 400, if name is invalid.
     * @returns Promise with error 409, if there is already body type with this name.
     */
    addBodyType(name: string): Promise<string>

    /**
     * Get all bodies.
     * @returns Promise with list of all bodies.
     */
    getBodyTypes(): Promise<IBodyType[]>

    /**
     * Get body type by its ID.
     * @param id ID of body type.
     * @returns Promise with body type.
     * @returns Promise with error 404, if body type with this ID was not found.
     */
    getBodyType(id: string): Promise<IBodyType>

    /**
     * Remove all body types.
     * @returns Promise with count of removed body types.
     * @returns Promise with error 404, if there is no body type to remove.
     * @returns Promise with error 409, if there is body with any body type.
     */
    removeBodyTypes(): Promise<number>

    /**
     * Remove body type by its ID.
     * @param id ID of body type.
     * @returns Empty promise.
     * @returns Promise with error 404, if body type with this ID was not found.
     * @returns Promise with error 409, if there is body with this body type.
     */
    removeBodyType(id: string): Promise<void>

    /**
     * Update body type by its ID.
     * @param id ID of body type.
     * @param name New name of body type.
     * @returns Empty promise.
     * @returns Promise with error 400, if name is invalid.
     * @returns Promise with error 404, if body type with this ID was not found.
     * @returns Promise with error 409, if there is already body type with this name.
     */
    updateBodyType(id: string, name: string): Promise<void>

    /**
     * Get count of all body types.
     * @returns Promise with count of all body types.
     */
    getBodyTypesCount(): Promise<number>

}
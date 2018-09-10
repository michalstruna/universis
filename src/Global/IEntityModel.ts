/**
 * Interface for entity model.
 */
declare interface IEntityModel<IGetOne, IGetAll, INew> {

    /**
     * Create new entity.
     * @param data Entity data.
     * @returns Promise with ID of created entity.
     * @returns Promise with error 400, if values are invalid.
     * @returns Promise with error 409, if there is duplicate unique value.
     */
    add(data: INew): Promise<string>

    /**
     * Get entity by its ID.
     * @param id ID of entity.
     * @returns Promise with entity.
     * @returns Promise with error 404, if entity with this ID was not found.
     */
    get(id: string): Promise<IGetOne>

    /**
     * Get all entities.
     * @param order Order of entities.
     * @param criterion Order criterion.
     * @param limit Max count of entities.
     * @param offset Index of first entity.
     * @param filter Mongoose filter.
     * @returns Promise with list of entities. If there is limit 1, return entity without array.
     */
    getAll(order: string, criterion: string, limit: number, offset: number, filter: any): Promise<IGetAll[] | IGetAll>

    /**
     * Remove entity by its ID.
     * @param id ID of entity.
     * @param force Remove all dependents of entity.
     * @returns Empty promise.
     * @returns Promise with error 400. if force is false and there is some dependents.
     * @returns Promise with error 404, if entity with this ID was not found.
     */
    remove(id: string, force: boolean): Promise<void>

    /**
     * Remove all entities.
     * @returns Promise with count of removed entities.
     * @returns Promise with error 404, if there is no entity to remove.
     */
    removeAll(): Promise<number>

    /**
     * Update entity by its ID.
     * @param id ID of entity.
     * @param updatedEntity New data.
     * @returns Empty promise.
     * @returns Promise with error 400, if values are invalid.
     * @returns Promise with error 404, if entity with this ID was not found.
     * @returns Promise with error 409, if there is duplicate unique value.
     */
    update(id: string, updatedEntity: INew): Promise<void>

    /**
     * Update all entities.
     * @param updatedEntity New data.
     * @returns Promise with count of updated bodies.
     * @returns Promise with error 400, if values are invalid.
     * @returns Promise with error 409, if there is duplicate unique value.
     */
    updateAll(updatedEntity: INew): Promise<number>

    /**
     * Get count of all entities.
     * @returns Promise with count of all entities.
     */
    getCount(): Promise<any>

}

/**
 * Options for entity model.
 */
declare interface IEntityModelOptions<IGetOne, IGetAll, INew> {

    /**
     * List of fields, that will be selected after get().
     */
    selectOne?: string[]

    /**
     * List of fields, that will be selected after getAll().
     */
    selectAll?: string[]

    /**
     * List of fields, that will be populated after get().
     */
    joinOne?: string[]

    /**
     * List of fields, that fill be populated after getAll().
     */
    joinAll?: string[]

    /**
     * Function, that converts old entity to new entity before add().
     */
    mapNew?: IFunction<INew, INew>

    /**
     * Function, that converts old entity to new entity after get().
     */
    mapOne?: IFunction<IGetOne, IGetOne>

    /**
     * Function, that converts old entity to new entity after getAll().
     */
    mapAll?: IFunction<IGetAll, IGetAll>

}
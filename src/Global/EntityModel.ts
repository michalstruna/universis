type Filter = Universis.Database.Query.Filter
type Options = Universis.Database.Query.Options

/**
 * Namespace for entity model.
 */
declare namespace Universis {

    /**
     * Interface for entity model.
     */
    export interface EntityModel<Full, Simple, New> {

        /**
         * Create new entity.
         * @param item Entity data.
         * @returns Promise with ID of created entity.
         * @returns Promise with error 400, if values are invalid.
         * @returns Promise with error 409, if there is duplicate unique value.
         */
        add(item: New): Promise<string>

        /**
         * Get one entity.
         * @param filter Object, keys are properties, values are required values.
         * @returns Promise with entity.
         * @returns Promise with error NOT_FOUND, if there is no item.
         */
        getOne(filter: Filter): Promise<Full>

        /**
         * Get all entities.
         * @param filter Object, keys are properties, values are required values.
         * @param options Query options. (optional)
         * @returns Promise with list of entities.
         */
        getAll(filter: Filter, options?: Options): Promise<Simple[]>

        /**
         * Remove one entity.
         * @param filter Object, keys are properties, values are required values.
         * @returns Empty promise.
         * @returns Promise with error NOT_FOUND, if entity with this ID was not found.
         */
        removeOne(filter: Filter): Promise<void>

        /**
         * Remove all entities.
         * @param filter Object, keys are properties, values are required values.
         * @param options Query options. (optional)
         * @returns Promise with count of removed entities.
         * @returns Promise with error NOT_FOUND, if there is no entity to remove.
         */
        removeAll(filter: Filter, options?: Options): Promise<number>

        /**
         * Update one entity.
         * @param filter Object, keys are properties, values are required values.
         * @param updatedItem New data.
         * @returns Empty promise.
         * @returns Promise with error INVALID, if values are invalid.
         * @returns Promise with error NOT_FOUND, if entity with this ID was not found.
         * @returns Promise with error DUPLICATE, if there is duplicate unique value.
         */
        updateOne(filter: Filter, updatedItem: New): Promise<void>

        /**
         * Update all entities.
         * @param filter Object, keys are properties, values are required values.
         * @param updatedItem New data.
         * @param options Query options. (optional)
         * @returns Promise with count of updated entities.
         * @returns Promise with error INVALID, if values are invalid.
         * @returns Promise with error DUPLICATE, if there is duplicate unique value.
         */
        updateAll(filter: Filter, updatedItem: New, options?: Options): Promise<number>

        /**
         * Get count of all entities.
         * @returns Promise with count of all entities.
         */
        count(filter: Filter): Promise<number>

    }

}

/**
 * Related types with entity model.
 */
declare namespace Universis.EntityModel {

    /**
     * Options for entity model.
     */
    export interface Options<Full, Simple, New> {

        /**
         * Name of database model.
         */
        dbModel: string

        /**
         * Name of database model for unapproved items (on save or edit).
         */
        unapprovedDbModel?: string

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
        mapNew?: Universis.Function<New, New>

        /**
         * Function, that converts old entity to new entity after get().
         */
        mapOne?: Universis.Function<Full, Full>

        /**
         * Function, that converts old entity to new entity after getAll().
         */
        mapAll?: Universis.Function<Simple, Simple>

        /**
         * Callback before add entity.
         * If false is returned, add function will not be executed.
         */
        beforeAdd?: Universis.Function<New, boolean>

        /**
         * Callback after add entity.
         * There is added entity in parameter.
         */
        afterAdd?: Universis.Consumer<Full>

        /**
         * Callback before update entity.
         * If false is returned, update function will not be executed.
         */
        beforeUpdate?: Universis.Function<New, boolean>

        /**
         * Callback after update entity.
         * There is updated entity in parameter.
         */
        afterUpdate?: Universis.Consumer<Full>

        /**
         * Callback before delete entity.
         * If false is returned, delete function will not be executed.
         */
        beforeDelete?: Universis.Function<New, boolean>

        /**
         * Callback after delete entity.
         * There is deleted entity in parameter.
         */
        afterDelete?: Universis.Consumer<Full>

    }

    /**
     * Interface for unspecified entity model.
     */
    export type Unspecified = EntityModel<any, any, any>

}
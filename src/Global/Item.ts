declare namespace Universis {

    /**
     * Base item.
     */
    export interface Item {

        _id?: string

    }

}

/**
 * Namespace for item model.
 */
declare namespace Universis.Item {

    /**
     * Interface for item model.
     */
    export interface Model<Full extends Universis.Item, Simple extends Universis.Item, New extends Universis.Item> {

        /**
         * Create new items.
         * @param items Items data.
         * @returns Promise with IDs of created item.
         * @returns Promise with error INVALID, if values are invalid.
         * @returns Promise with error DUPLICATE, if there is duplicate unique value.
         */
        add(items: New[]): Promise<string[]>

        /**
         * Create new item.
         * @param item Item data.
         * @returns Promise with ID of created item.
         * @returns Promise with error INVALID, if values are invalid.
         * @returns Promise with error DUPLICATE, if there is duplicate unique value.
         */
        addOne(item: New): Promise<string>

        /**
         * Approve all items with filter.
         * @param filter Object, keys are properties, values are required values.
         * @param options Query options. (optional)
         * @returns Promise with count of approved items.
         */
        approve(filter: Universis.Database.Query.Filter, options?: Universis.Database.Query.Options): Promise<number>

        /**
         * Approve one item with filter.
         * @param filter Object, keys are properties, values are required values.
         * @param options Query options. (optional)
         * @returns Empty promise.
         * @returns Promise with error NOT_FOUND, if there is no item.
         */
        approveOne(filter: Universis.Database.Query.Filter, options?: Universis.Database.Query.OptionsForOne): Promise<void>

        /**
         * Get count of all items.
         * @param filter Object, keys are properties, values are required values.
         * @returns Promise with count of all items.
         */
        count(filter: Universis.Database.Query.Filter): Promise<number>

        /**
         * Get all items.
         * @param filter Object, keys are properties, values are required values.
         * @param options Query options. (optional)
         * @returns Promise with list of items.
         */
        get(filter: Universis.Database.Query.Filter, options?: Universis.Database.Query.Options): Promise<Simple[]>

        /**
         * Get one item.
         * @param filter Object, keys are properties, values are required values.
         * @param options Query options. (optional)
         * @returns Promise with item.
         * @returns Promise with error NOT_FOUND, if there is no item.
         */
        getOne(filter: Universis.Database.Query.Filter, options?: Universis.Database.Query.OptionsForOne): Promise<Full>

        /**
         * Remove all items.
         * @param filter Object, keys are properties, values are required values.
         * @param options Query options. (optional)
         * @returns Promise with count of removed items.
         * @returns Promise with error NOT_FOUND, if there is no item to remove.
         */
        remove(filter: Universis.Database.Query.Filter, options?: Universis.Database.Query.Options): Promise<number>

        /**
         * Remove one item.
         * @param filter Object, keys are properties, values are required values.
         * @param options Query options. (optional)
         * @returns Empty promise.
         * @returns Promise with error NOT_FOUND, if item with this ID was not found.
         */
        removeOne(filter: Universis.Database.Query.Filter, options?: Universis.Database.Query.OptionsForOne): Promise<void>

        /**
         * Update one item.
         * @param filter Object, keys are properties, values are required values.
         * @param changes New data.
         * @param options Query options. (optional)
         * @returns Empty promise.
         * @returns Promise with error INVALID, if values are invalid.
         * @returns Promise with error NOT_FOUND, if item with this ID was not found.
         * @returns Promise with error DUPLICATE, if there is duplicate unique value.
         */
        updateOne(filter: Universis.Database.Query.Filter, changes: New, options?: Universis.Database.Query.OptionsForOne): Promise<void>

        /**
         * Update all items.
         * @param filter Object, keys are properties, values are required values.
         * @param changes New data.
         * @param options Query options. (optional)
         * @returns Promise with count of updated items.
         * @returns Promise with error INVALID, if values are invalid.
         * @returns Promise with error DUPLICATE, if there is duplicate unique value.
         */
        update(filter: Universis.Database.Query.Filter, changes: New, options?: Universis.Database.Query.Options): Promise<number>

    }

}

/**
 * Related types with item model.
 */
declare namespace Universis.Model {

    /**
     * Callback of before get one item.
     * THere is query filter and query options in parameters.
     */
    export type onBeforeGetOne = Universis.Consumer2<Universis.Database.Query.Filter, Universis.Database.Query.OptionsForOne>

    /**
     * Callback of after get one item.
     * There is item, query filter and query options in parameters.
     * @type Full Type of item.
     */
    export type onAfterGetOne<Full> = Universis.Consumer3<Full, Universis.Database.Query.Filter, Universis.Database.Query.OptionsForOne>

    /**
     * Callback of before get one item.
     * There is query filter and query options in parameters.
     */
    export type onBeforeGet = Universis.Consumer2<Universis.Database.Query.Filter, Universis.Database.Query.Options>

    /**
     * Callback of after get one item.
     * There is items, query filter and query options in parameters.
     * @type Simple Type of item.
     */
    export type onAfterGet<Simple> = Universis.Consumer3<Simple[], Universis.Database.Query.Filter, Universis.Database.Query.Options>


    /**
     * Callback of before add one item.
     * There is new item in parameter.
     * @type New Type of new item.
     */
    export type onBeforeAddOne<New> = Universis.Consumer<New>

    /**
     * Callback of after add one item.
     * There are added item and new item in parameters.
     * @type New Type of new item.
     */
    export type onAfterAddOne<Full, New> = Universis.Consumer2<Full, New>

    /**
     * Callback of before add one item.
     * There is added items in parameter.
     * @type New Type of new item.
     */
    export type onBeforeAdd<New> = Universis.Consumer<New[]>

    /**
     * Callback of after get one item.
     * There are added items and new items in parameters.
     * @type New Type of new items.
     */
    export type onAfterAdd<Full, New> = Universis.Consumer2<Full[], New[]>

    /**
     * Callback of before update one item.
     * THere is changes, query filter and query options in parameters
     * @type New Type of changes.
     */
    export type onBeforeUpdateOne<New> = Universis.Consumer3<New, Universis.Database.Query.Filter, Universis.Database.Query.OptionsForOne>

    /**
     * Callback of after update one item.
     * There are updated item, changes, query filter and query options in parameters.
     * @type Full Type of updated item.
     * @type New Type of changes.
     */
    export type onAfterUpdateOne<Full, New> = Universis.Consumer4<Full, New, Universis.Database.Query.Filter, Universis.Database.Query.OptionsForOne>

    /**
     * Callback of before update one item.
     * There are changes, query filter and query options in parameters.
     * @type New Type of changes.
     */
    export type onBeforeUpdate<New> = Universis.Consumer3<New[], Universis.Database.Query.Filter, Universis.Database.Query.Options>

    /**
     * Callback of after update one item.
     * There are updated items, changes, query filter and query options in parameters.
     * @type Simple Type of item.
     */
    export type onAfterUpdate<Full, New> = Universis.Consumer4<Full[], New[], Universis.Database.Query.Filter, Universis.Database.Query.Options>

    /**
     * Callback of before remove one item.
     * THere are query filter and query options in parameters
     */
    export type onBeforeRemoveOne = Universis.Consumer2<Universis.Database.Query.Filter, Universis.Database.Query.OptionsForOne>

    /**
     * Callback of after remove one item.
     * There are removed item, query filter and query options in parameters.
     * @type Full Type of removed item.
     */
    export type onAfterRemoveOne<Full> = Universis.Consumer3<Full, Universis.Database.Query.Filter, Universis.Database.Query.OptionsForOne>

    /**
     * Callback of before remove one item.
     * There are query filter and query options in parameters.
     * @type New Type of changes.
     */
    export type onBeforeRemove = Universis.Consumer2<Universis.Database.Query.Filter, Universis.Database.Query.Options>

    /**
     * Callback of after remove one item.
     * There are removed items, changes, query filter and query options in parameters.
     * @type Simple Type of removed items.
     */
    export type onAfterRemove<Full> = Universis.Consumer3<Full[], Universis.Database.Query.Filter, Universis.Database.Query.Options>


    export interface Options<Full, Simple, New> {

        /**
         * Name of DB model.
         */
        dbModel: string

        /**
         * Name of DB model for unapproved changes.
         * If specified, all changes (add, update, remove) will be placed in this model.
         * TO move to original model must be approved.
         */
        unapprovedDbModel?: string

        /**
         * Info about notifications. (optional)
         */
        notifications?: {

            /**
             * Type of subject.
             */
            subjectType: number

            /**
             * Get notification text from object.
             */
            textAccessor: Universis.Function<Full, string>

            /**
             * Get notification target. (optional)
             */
            targetAccessor?: Universis.Function<Full, string>

        }

        /**
         * Get one item operation.
         */
        getOne?: Operation<onBeforeGetOne, onAfterGetOne<Full>>

        /**
         * Get all items operation.
         */
        get?: Operation<onBeforeGet, onAfterGet<Simple>>

        /**
         * Add one item operation.
         */
        addOne?: Operation<onBeforeAddOne<New>, onAfterAddOne<Full, New>>

        /**
         * Add all items operation.
         */
        add?: Operation<onBeforeAdd<New>, onAfterAdd<Full, New>>

        /**
         * Get one item operation.
         */
        updateOne?: Operation<onBeforeUpdateOne<New>, onAfterUpdateOne<Full, New>>

        /**
         * Update all items operation.
         */
        update?: Operation<onBeforeUpdate<New>, onAfterUpdate<Full, New>>

        /**
         * Remove one item operation.
         */
        removeOne?: Operation<onBeforeRemoveOne, onAfterRemoveOne<Full>>

        /**
         * Remove all items operation.
         */
        remove?: Operation<onBeforeRemove, onAfterRemove<Full>>

    }

    export interface Operation<onBefore, onAfter> {

        /**
         * Operation will generate notification. (optional)
         * If this is operation for all items, notification will be generated for each item.
         */
        notification?: boolean

        /**
         * Callback before operation. (optional)
         * If onBefore for all is not specified, onBefore for one will be called for each item.
         */
        onBefore?: onBefore

        /**
         * Callback after operation. (optional)
         * If onAfter for all is not specified, onAfter for one will be called for each item.
         */
        onAfter?: onAfter

        /**
         * List of selected fields. (optional, default all fields)
         */
        select?: string[]

        /**
         * List of joined fields. (optional)
         */
        join?: string[]

    }

    /**
     * Interface for unspecified item model.
     */
    export type Unspecified = Item.Model<any, any, any>

}
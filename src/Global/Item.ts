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
    export interface Model<Full extends Universis.Item, Simple extends Universis.Item, New> {

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
        approveOne(filter: Universis.Database.Query.Filter, options?: Universis.Database.Query.Options): Promise<void>

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
        getOne(filter: Universis.Database.Query.Filter, options?: Universis.Database.Query.Options): Promise<Full>

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
        removeOne(filter: Universis.Database.Query.Filter, options?: Universis.Database.Query.Options): Promise<void>

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
        updateOne(filter: Universis.Database.Query.Filter, changes: New, options?: Universis.Database.Query.Options): Promise<void>

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

    export interface Options<Full, Simple, New> {

        /**
         * Name of DB model.
         */
        dbModel: string

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
            textAccessor: Universis.Function<Full | Simple, string>

            /**
             * Get notification target. (optional)
             */
            targetAccessor?: Universis.Function<Full | Simple, string> // TODO: Refactor, remove Simple (because of get())

        }

        /**
         * Get all items operation.
         */
        get?: {

            /**
             * Each getted item will generate notification. (optional, default false)
             */
            notification?: boolean

            /**
             * Callback of before get item. (optional)
             * THere are query filter and query options in parameters.
             */
            onBefore?: Universis.Consumer2<Universis.Database.Query.Filter, Universis.Database.Query.Options>

            /**
             * Callback of after get item. (optional)
             * There are item, query filter and query options in parameters.
             */
            onAfter?: Universis.Consumer3<Full | Simple, Universis.Database.Query.Filter, Universis.Database.Query.Options>

            /**
             * List of selected fields in getOne. (optional, default all fields)
             */
            select?: string[]

            /**
             * List of populated fields in getOne. (optional, default no fields)
             */
            join?: string[]

            /**
             * List of selected fields in get. (optional, default all fields)
             */
            selectAll?: string[]

            /**
             * List of populated fields in get. (optional, default no fields)
             */
            joinAll?: string[]

        }

        /**
         * Add all items operation.
         */
        add?: {

            /**
             * Add of item must be approved. (optional, default false)
             */
            approval?: boolean

            /**
             * Each added item will generate notification. (optional, default false)
             */
            notification?: boolean

            /**
             * Callback of before add item.
             * THere are new item,in parameter.
             */
            onBefore?: Universis.Consumer<New>

            /**
             * Callback of add update item.
             * There are added item and new item in parameter.
             */
            onAfter?: Universis.Consumer2<Full, New>

        }

        /**
         * Update item operation.
         */
        update?: {

            /**
             * Update of item must be approved. (optional, default false)
             */
            approval?: boolean

            /**
             * Each updated item will generate notification. (optional, default false)
             */
            notification?: boolean

            /**
             * Callback of before update item.
             * THere are changes, query filter and query options in parameters.
             */
            onBefore?: Universis.Consumer3<New, Universis.Database.Query.Filter, Universis.Database.Query.Options>

            /**
             * Callback of after update item.
             * There are updated item, changes, query filter and query options in parameters.
             */
            onAfter?: Universis.Consumer4<Full, New, Universis.Database.Query.Filter, Universis.Database.Query.Options>

        }

        /**
         * Remove item operation.
         */
        remove?: {

            /**
             * Remove of item must be approved. (optional, default false)
             */
            approval?: boolean

            /**
             * Each removed item will generate notification. (optional, default false)
             */
            notification?: boolean

            /**
             * Callback of before remove item.
             * THere are query filter and query options in parameters.
             */
            onBefore?: Universis.Consumer2<Universis.Database.Query.Filter, Universis.Database.Query.Options>

            /**
             * Callback of after remove item.
             * There are removed item, query filter and query options in parameters.
             */
            onAfter?: Universis.Consumer3<Full, Universis.Database.Query.Filter, Universis.Database.Query.Options>

        }

    }

    /**
     * Interface for unspecified item model.
     */
    export type Unspecified = Item.Model<any, any, any>

}
/**
 * Namespace for item model.
 */
declare namespace Universis.Item {

    /**
     * Interface for item model.
     */
    export interface Model<Full, Simple, New> {

        /**
         * Create new item.
         * @param item Item data.
         * @returns Promise with ID of created item.
         * @returns Promise with error INVALID, if values are invalid.
         * @returns Promise with error DUPLICATE, if there is duplicate unique value.
         */
        add(item: New): Promise<Full>

        /**
         * Get count of all items.
         * @param filter Object, keys are properties, values are required values.
         * @returns Promise with count of all items.
         */
        count(filter: Universis.Database.Query.Filter): Promise<number>

        /**
         * Delete one item.
         * @param filter Object, keys are properties, values are required values.
         * @param options Query options. (optional)
         * @returns Empty promise.
         * @returns Promise with error NOT_FOUND, if item with this ID was not found.
         */
        delete(filter: Universis.Database.Query.Filter, options?: Universis.Database.Query.Options): Promise<void>

        /**
         * Get one item.
         * @param filter Object, keys are properties, values are required values.
         * @param options Query options. (optional)
         * @returns Promise with item.
         * @returns Promise with error NOT_FOUND, if there is no item.
         */
        get(filter: Universis.Database.Query.Filter, options?: Universis.Database.Query.Options): Promise<Full>

        /**
         * Get all items.
         * @param filter Object, keys are properties, values are required values.
         * @param options Query options. (optional)
         * @returns Promise with list of items.
         */
        getAll(filter: Universis.Database.Query.Filter, options?: Universis.Database.Query.Options): Promise<Simple[]>

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
        update(filter: Universis.Database.Query.Filter, changes: New, options?: Universis.Database.Query.Options): Promise<void>

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
             * Get type of subject.
             */
            subjectTypeAccessor: Universis.Function2<any, Item.Model<Full, Simple, New>, number | Promise<number>>

            /**
             * Get subject name.
             */
            subjectNameAccessor?: Universis.Function2<any, Item.Model<Full, Simple, New>, string | Promise<string>>

            /**
             * Get author of notification.
             */
            userIdAccessor?: Universis.Function2<any, Item.Model<Full, Simple, New>, string | Promise<string>>

            /**
             * Get target user of notification.
             */
            targetUserIdAccessor?: Universis.Function2<any, Item.Model<Full, Simple, New>, string | Promise<string>>

            /**
             * Get link of notification.
             */
            linkAccessor?: Universis.Function2<any, Item.Model<Full, Simple, New>, string | Promise<string>>

            /**
             * Get text of notification.
             */
            textAccessor?: Universis.Function2<any, Item.Model<Full, Simple, New>, string | Promise<string>>

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
             * Callback of before getAll item. (optional)
             * THere are query filter and query options in parameters.
             */
            onBefore?: Universis.Consumer3<Universis.Database.Query.Filter, Universis.Database.Query.Options, Item.Model<Full, Simple, New>>

            /**
             * Callback of after getAll item. (optional)
             * There are item, query filter and query options in parameters.
             */
            onAfter?: Universis.Consumer4<any, Universis.Database.Query.Filter, Universis.Database.Query.Options, Item.Model<Full, Simple, New>>

            /**
             * List of selected fields in get. (optional, default all fields)
             */
            select?: string[]

            /**
             * List of populated fields in get. (optional, default no fields)
             */
            join?: string[]

            /**
             * List of selected fields in getAll. (optional, default all fields)
             */
            selectAll?: string[]

            /**
             * List of populated fields in getAll. (optional, default no fields)
             */
            joinAll?: string[]

            /**
             * Custom pipeline for getAll one item.
             */
            custom?: Universis.Function2<Universis.Database.Query.Filter, Universis.Database.Query.Options, Universis.Map<any>[]>

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
            onBefore?: Universis.Consumer2<New, Item.Model<Full, Simple, New>>

            /**
             * Callback of add update item.
             * There are added item and new item in parameter.
             */
            onAfter?: Universis.Consumer3<Full, New, Item.Model<Full, Simple, New>>

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
            onBefore?: Universis.Consumer4<New, Universis.Database.Query.Filter, Universis.Database.Query.Options, Item.Model<Full, Simple, New>>

            /**
             * Callback of after update item.
             * There are updated item, changes, query filter and query options in parameters.
             */
            onAfter?: Universis.Consumer5<Full, New, Universis.Database.Query.Filter, Universis.Database.Query.Options, Item.Model<Full, Simple, New>>

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
             * Callback of before delete item.
             * THere are query filter and query options in parameters.
             */
            onBefore?: Universis.Consumer3<Universis.Database.Query.Filter, Universis.Database.Query.Options, Item.Model<Full, Simple, New>>

            /**
             * Callback of after delete item.
             * There are removed item, query filter and query options in parameters.
             */
            onAfter?: Universis.Consumer4<Full, Universis.Database.Query.Filter, Universis.Database.Query.Options, Item.Model<Full, Simple, New>>

        }

    }

    /**
     * Interface for unspecified item model.
     */
    export type Unspecified = Item.Model<any, any, any>

}
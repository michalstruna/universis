declare namespace Universis.Database {

    /**
     * Interface for database adapter.
     */
    export interface Model {

        /**
         * Add new document to collection.
         * @type T Type of new item.
         * @param item Data of new item. There must be all required properties.
         * @returns Promise added item.
         * @returns Promise with error INVALID, if there is invalid value.
         * @returns Promise with error DUPLICATE, if there is duplicate unique value.
         */
        add<T>(item: Query.Item): Promise<T>

        /**
         * Get count of documents.
         * @param filter Object, keys are properties, values are required values.
         * @returns Promise with count of documents.
         */
        count(filter: Query.Filter): Promise<number>

        /**
         * Find all documents with condition.
         * @type T Type of returned items.
         * @param filter Object, keys are properties, values are required values.
         * @param options Query options. (optional)
         * @returns Promise with list of items or one item, if limit is 1.
         */
        get<T>(filter: Query.Filter, options?: Query.Options): Promise<T>

        /**
         * Remove all documents with condition.
         * @type T Type of removed items.
         * @param filter Object, keys are properties, values are required values.
         * @param options Query options. (optional)
         * @returns Promise with removed items or with one item, if limit is 1.
         */
        remove<T>(filter: Query.Filter, options?: Query.Options): Promise<T>

        /**
         * Update all documents with condition.
         * @type T Type of new items.
         * @param filter Object, keys are properties, values are required values.
         * @param newItem Updated values of document. Keys are properties, values are updated values.
         * @param options Query options. (optional)
         * @returns Promise with list of updated items or one item, if limit is 1.
         * @returns Promise with error INVALID, if there is invalid value.
         * @returns Promise with error DUPLICATE, if there is duplicate unique value.
         */
        update<T>(filter: Query.Filter, newItem: Query.Item, options?: Query.Options): Promise<T>

    }

    export namespace Query {

        /**
         * Items filter.
         */
        export type Filter = Universis.Map<string>

        /**
         * Added or updated item.
         */
        export type Item = Universis.Map<any>

        /**
         * Query options.
         */
        export interface Options {

            /**
             * Max count of items. (optional, default Infinity)
             */
            limit?: number

            /**
             * Return first item instead of list of items. (optional, default false)
             */
            extract?: boolean

            /**
             * Index of first item. (optional, default 0)
             */
            offset?: number

            /**
             * Name of sorted column. (optional, default _id)
             */
            sort?: string

            /**
             * Sort will be reverse (DESC). (optional, default ASC)
             */
            reverse?: boolean

            /**
             * List of field, that will be selected.
             */
            select?: string[]

            /**
             * List of fields, that will be populated.
             */
            join?: string[]

        }

    }

}
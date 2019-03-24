declare namespace Universis {

    export interface Database {

        /**
         * Get model by name.
         * @param name Name of model.
         * @returns Model.
         */
        getModel(name: string): Universis.Database.Model

        /**
         * Get names of all models in DB.
         * @returns Model names.
         */
        getModelNames(): string[]

    }

    export namespace Database {

        /**
         * Interface for schema set.
         */
        export type SchemaSet = Universis.Map<any> // TODO: <Mongoose.Schema>?

        /**
         * Interface for database.
         */
        export interface Options {

            /**
             * Connection username.
             */
            username?: string

            /**
             * Connection password.
             */
            password?: string

            /**
             * Connection cluster.
             */
            prefix: string

            /**
             * Connection database.
             */
            database: string

            /**
             * Server.
             */
            host: string

            /**
             * Connection options.
             */
            options: Universis.Map<any>

            /**
             * Connection schemas.
             */
            schemas: SchemaSet

            /**
             * Callback after successful connect. (optional)
             */
            onConnect?: Universis.Runnable

            /**
             * Callback after unsuccessful connect. (optional)
             */
            onError?: Universis.Consumer<Error>

        }

        /**
         * Interface for database model adapter.
         */
        export interface Model {

            /**
             * Add new documents to collection.
             * @type T Type of new items.
             * @param items Data of new items. There must be all required properties.
             * @returns Promise added items.
             * @returns Promise with error INVALID, if there is invalid value.
             * @returns Promise with error DUPLICATE, if there is duplicate unique value.
             */
            add<T>(items: Universis.Database.Query.Item[]): Promise<T[]>

            /**
             * Add new document to collection.
             * @type T Type of new item.
             * @param item Data of new item. There must be all required properties.
             * @returns Promise added item.
             * @returns Promise with error INVALID, if there is invalid value.
             * @returns Promise with error DUPLICATE, if there is duplicate unique value.
             */
            addOne<T>(item: Universis.Database.Query.Item): Promise<T>

            /**
             * Get count of documents.
             * @param filter Object, keys are properties, values are required values.
             * @returns Promise with count of documents.
             */
            count(filter: Universis.Database.Query.Filter): Promise<number>

            /**
             * Find all documents with condition.
             * @type T Type of returned items.
             * @param filter Object, keys are properties, values are required values.
             * @param options Query options. (optional)
             * @returns Promise with list of items.
             */
            get<T>(filter: Universis.Database.Query.Filter, options?: Universis.Database.Query.Options): Promise<T[]>

            /**
             * Find one document with condition.
             * @type T Type of returned item.
             * @param filter Object, keys are properties, values are required values.
             * @param options Query options. (optional)
             * @returns Promise with item.
             */
            getOne<T>(filter: Universis.Database.Query.Filter, options?: Universis.Database.Query.Options): Promise<T>

            /**
             * Get one field of one document with condition.
             * @param filter Object, keys are properties, values are required values.
             * @param fieldName Searched field.
             * @param options Query options. (optional)
             * @returns Promise with value of field.
             * @returns Promise with error NOT_FOUND, if there is no document with this filter.
             */
            getField<T>(filter: Universis.Database.Query.Filter, fieldName: string, options?: Universis.Database.Query.Options): Promise<T>

            /**
             * Remove all documents with condition.
             * @type T Type of removed items.
             * @param filter Object, keys are properties, values are required values.
             * @param options Query options. (optional)
             * @returns Promise with removed items.
             * @returns Promise with error NOT_FOUND, if there is no items with filter.
             */
            remove<T>(filter: Universis.Database.Query.Filter, options?: Universis.Database.Query.Options): Promise<T[]>

            /**
             * Remove one document with condition.
             * @type T Type of removed item.
             * @param filter Object, keys are properties, values are required values.
             * @param options Query options. (optional)
             * @returns Promise with removed item.
             */
            removeOne<T>(filter: Universis.Database.Query.Filter, options?: Universis.Database.Query.Options): Promise<T>

            /**
             * Update all documents with condition.
             * @type T Type of new items.
             * @param filter Object, keys are properties, values are required values.
             * @param newItem Updated values of documents. Keys are properties, values are updated values.
             * @param options Query options. (optional)
             * @returns Promise with list of updated items
             * @returns Promise with error INVALID, if there is invalid value.
             * @returns Promise with error NOT_FOUND, if there is no items with filter.
             * @returns Promise with error DUPLICATE, if there is duplicate unique value.
             */
            update<T>(filter: Universis.Database.Query.Filter, newItem: Universis.Database.Query.Item, options?: Universis.Database.Query.Options): Promise<T[]>

            /**
             * Update one document with condition.
             * @type T Type of new item.
             * @param filter Object, keys are properties, values are required values.
             * @param newItem Updated values of document. Keys are properties, values are updated values.
             * @param options Query options. (optional)
             * @returns Promise with list of updated items
             * @returns Promise with error INVALID, if there is invalid value.
             * @returns Promise with error DUPLICATE, if there is duplicate unique value.
             */
            updateOne<T>(filter: Universis.Database.Query.Filter, newItem: Universis.Database.Query.Item, options?: Universis.Database.Query.Options): Promise<T>

            /**
             * Apply aggregation to DB model.
             * @param pipeline
             * @returns Promise with Result of aggregation.
             */
            aggregate<T>(pipeline: Universis.Map<any>[]): Promise<T[]>

        }

        export namespace Query {

            /**
             * Items filter.
             */
            export type Filter = Universis.Map<string | any> // TODO: String or ObjectID.

            /**
             * Added or updated item.
             */
            export type Item = Universis.Map<any>

            /**
             * Query options.
             */
            export interface Options {

                /**
                 * List of fields, that will be populated.
                 */
                join?: string[]

                /**
                 * Index of first item. (optional, default 0)
                 */
                offset?: number

                /**
                 * Max count of items. (optional, default Infinity)
                 */
                limit?: number

                /**
                 * Sort will be reverse (DESC). (optional, default ASC)
                 */
                reverse?: boolean

                /**
                 * List of field, that will be selected.
                 */
                select?: string[]

                /**
                 * Name of sorted column. (optional, default _id)
                 */
                sort?: string


            }

        }

    }

}
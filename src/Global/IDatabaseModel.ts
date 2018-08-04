/**
 * Interface for database model adapter.
 */
declare interface IDatabaseModel {

    /**
     * Find all documents with condition.
     * @param condition Object, keys are properties, values are required values.
     * @returns Current instance of database model.
     */
    get(condition: Object): IDatabaseModel

    /**
     * Find one document by its ID.
     * @param id ID of document.
     * @returns Current instance of database model.
     */
    getById(id: string): IDatabaseModel

    /**
     * Find one document with condition.
     * @param condition Object, keys are properties, values are required values.
     * @returns Current instance of database model.
     */
    getOne(condition: Object): IDatabaseModel

    /**
     * Set max count of result documents.
     * @param limit Max count of result documents.
     * @returns Current instance of database model.
     */
    limit(limit: number): IDatabaseModel

    /**
     * Set index of first result document.
     * @param offset Index of first result document.
     * @returns Current instance of database model.
     */
    offset(offset: number): IDatabaseModel

    /**
     * Select only some fields from documents.
     * @param fields List of arguments.
     * @returns Current instance of database model.
     */
    select(...fields: string[]): IDatabaseModel

    /**
     * Sort documents by field.
     * @param field Name of field to sort.
     * @param order Direction of sort.
     * @returns Current instance of database model.
     */
    sort(field: string, order: string): IDatabaseModel

    /**
     * Replace foreign key to targeted document.
     * @param field Name of foreign key.
     * @param targetField Name of field with joined document. (optional, default field)
     * @returns Current instance of database model.
     */
    join(field: string, targetField?: string): IDatabaseModel

    /**
     * Run current query.
     * @returns Promise with all changed documents.
     */
    run<T>(): Promise<T>

    /**
     * Remove all documents with condition.
     * @param condition Object, keys are properties, values are required values.
     * @returns Promise with count of removed documents.
     */
    remove(condition: Object): Promise<number>

    /**
     * Remove one document with ID.
     * @param id ID of document.
     * @returns Empty promise.
     * @returns Promise with error 404, if there is no document with ID.
     */
    removeById(id: string): Promise<void>

    /**
     * Remove one document with condition.
     * @param condition Object, keys are properties, values are required values.
     * @returns Empty promise.
     * @returns Promise with error 404, if there is no document to remove.
     */
    removeOne(condition: Object): Promise<void>

    /**
     * Update all documents with condition.
     * @param condition Object, keys are properties, values are required values.
     * @param newValues Updated values of document. Keys are properties, values are updated values.
     * @returns Promise with count of updated documents.
     * @returns Promise with error 400, if there is invalid value.
     * @returns Promise with error 409, if there is duplicate unique value.
     */
    update(condition: Object, newValues: Object): Promise<number>

    /**
     * Update one document with ID.
     * @param id ID of document.
     * @param newValues Updated values of document. Keys are properties, values are updated values.
     * @returns Empty promise.
     * @returns Promise with error 400, if there is invalid value.
     * @returns Promise with error 404, if there is no document with ID.
     * @returns Promise with error 409, if there is duplicate unique value.
     */
    updateById(id: string, newValues: Object): Promise<void>

    /**
     * Update one document with condition.
     * @param condition Object, keys are properties, values are required values.
     * @param newValues Updated values of document. Keys are properties, values are updated values.
     * @returns Empty promise.
     * @returns Promise with error 400, if there is invalid value.
     * @returns Promise with error 404, if there is no document to update.
     * @returns Promise with error 409, if there is duplicate unique value.
     */
    updateOne(condition: Object, newValues: Object): Promise<void>

    /**
     * Add new document to collection.
     * @param data Data of new document. There must be all required properties.
     * @returns Promise with ID of created document.
     * @returns Promise with error 400, if there is invalid value.
     * @returns Promise with error 409, if there is duplicate unique value.
     */
    add(data: Object): Promise<string>

    /**
     * Get count of documents.
     * @param condition Object, keys are properties, values are required values.
     * @returns Promise with count of documents.
     */
    count(condition: Object): Promise<number>

}
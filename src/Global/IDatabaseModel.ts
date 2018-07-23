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
     * Remove all documents with condition.
     * @param condition Object, keys are properties, values are required values.
     * @returns Promise with removed documents.
     */
    remove<T>(condition: Object): Promise<T>

    /**
     * Remove one document with ID.
     * @param id ID of document.
     * @returns Promise with removed document.
     */
    removeById<T>(id: string): Promise<T>

    /**
     * Remove one document with condition.
     * @param condition Object, keys are properties, values are required values.
     * @returns Promise with removed document.
     */
    removeOne<T>(condition: Object): Promise<T>

    /**
     * Update all documents with condition.
     * @param condition Object, keys are properties, values are required values.
     * @param newValues Updated values of document. Keys are properties, values are updated values.
     * @returns Updated documents.
     */
    update<T>(condition: Object, newValues: Object): Promise<T>

    /**
     * Update one document with ID.
     * @param id ID of document.
     * @param newValues Updated values of document. Keys are properties, values are updated values.
     * @returns Updated document.
     */
    updateById<T>(id: string, newValues: Object): Promise<T>

    /**
     * Update one document with condition.
     * @param condition Object, keys are properties, values are required values.
     * @param newValues Updated values of document. Keys are properties, values are updated values.
     * @returns Updated document.
     */
    updateOne<T>(condition: Object, newValues: Object): Promise<T>

    /**
     * Add new document to collection.
     * @param data Data of new document. There must be all required properties.
     * @returns Created document.
     */
    add<T>(data: Object): Promise<T>

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
     * Get count of documents.
     * @param condition Object, keys are properties, values are required values.
     * @returns Promise with count of documents.
     */
    count(condition: Object): Promise<number>

}
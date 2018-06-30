declare type IMongooseDocument = any // TODO: Mongoose types.

/**
 * Interface for database model adapter.
 */
declare interface IDatabaseModel {

    /**
     * Find all documents with condition.
     * @param condition Object, keys are properties, values are required values.
     * @returns Promise with array of found documents or empty array.
     */
    find(condition: Object): Promise<IMongooseDocument[]>

    /**
     * Find one document by its ID.
     * @param id ID of document.
     * @returns Promise with document with ID or null.
     */
    findById(id: string): Promise<IMongooseDocument | null>

    /**
     * Find one document with condition.
     * @param condition Object, keys are properties, values are required values.
     * @returns Promise with found documents or null.
     */
    findOne(condition: Object): Promise<IMongooseDocument | null>

    /**
     * Remove all documents with condition.
     * @param condition Object, keys are properties, values are required values.
     * @returns Promise with array of removed documents or empty array.
     */
    remove(condition: Object): Promise<IMongooseDocument[]>

    /**
     * Remove one document with ID.
     * @param id ID of document.
     * @returns Promise with removed document or null.
     */
    removeById(id: string): Promise<IMongooseDocument | null>

    /**
     * Remove one document with condition.
     * @param condition Object, keys are properties, values are required values.
     * @returns Promise with removed document or null.
     */
    removeOne(condition: Object): Promise<IMongooseDocument | null>

    /**
     * Update all documents with condition.
     * @param condition Object, keys are properties, values are required values.
     * @param newValues Updated values of document. Keys are properties, values are updated values.
     * @returns Promise with array of updated documents or empty array.
     */
    update(condition: Object, newValues: Object): Promise<IMongooseDocument[]>

    /**
     * Update one document with ID.
     * @param id ID of document.
     * @param newValues Updated values of document. Keys are properties, values are updated values.
     * @returns Promise with updated document or null.
     */
    updateById(id: string, newValues: Object): Promise<IMongooseDocument | null>

    /**
     * Update one document with condition.
     * @param condition Object, keys are properties, values are required values.
     * @param newValues Updated values of document. Keys are properties, values are updated values.
     * @returns Promise with updated document or null.
     */
    updateOne(condition: Object, newValues: Object): Promise<IMongooseDocument | null>

    /**
     * Add new document to collection.
     * @param data Data of new document. There must be all required properties.
     * @returns Promise with new document.
     */
    add(data: Object): Promise<IMongooseDocument>

}
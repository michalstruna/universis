// TODO: Import Mongoose types.

/**
 * Interface for database adapter.
 */
declare interface IDatabase {

    /**
     * Create model.
     * @param name Name of model.
     * @param schema Schema.
     * @returns Model.
     */
    createModel(name: string, schema: any): any

    /**
     * Get model by name.
     * @param name Name of model.
     * @returns Model.
     */
    getModel(name: string): any

}
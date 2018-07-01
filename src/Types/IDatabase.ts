// TODO: Mongoose type Schema.

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
    createModel(name: string, schema: any): IDatabaseModel

    /**
     * Get model by name.
     * @param name Name of model.
     * @returns Model.
     */
    getModel(name: string): IDatabaseModel

    /**
     * Get names of all models in DB.
     * @returns Model names.
     */
    getModelNames(): string[]

}
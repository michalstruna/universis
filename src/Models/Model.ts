import Database from '../Database/Database'
import Config from '../Config'

import {
    DatabaseConnections,
    DatabaseModels
} from '../Constants'

import BodySchema from '../Database/Schemas/BodySchema'

/**
 * Base model. This is parent of each another model.
 */
abstract class Model implements IModel {

    /**
     * Instance of database
     */
    protected db: IDatabase

    /**
     * List of all database models.
     */
    protected dbModels = DatabaseModels

    public constructor() {
        this.db = Database.getConnection(DatabaseConnections.BASE)

        if(!this.db) {
            this.createConnection()
        }
    }

    /**
     * Create connection to DB.
     * Only if connection is not already exists.
     */
    private createConnection(): void {
        this.db = new Database(
            DatabaseConnections.BASE,
            Config.database.username,
            Config.database.password,
            Config.database.cluster
        )

        this.db.createModel(this.dbModels.BODY, BodySchema)
    }

}

export default Model
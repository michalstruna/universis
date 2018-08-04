import Database from '../Database/Database'
import Config from '../Constants/Config'

import { DatabaseConnections, DatabaseModels } from '../Constants'

import BodySchema from '../Database/Schemas/BodySchema'
import BodyTypeSchema from '../Database/Schemas/BodyTypeSchema'
import UserSchema from '../Database/Schemas/UserSchema'

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

        if (!this.db) {
            this.createBaseConnection()
        }

    }

    /**
     * Create connection to DB.
     * Only if connection is not already exists.
     */
    private createBaseConnection(): void {
        this.db = new Database(
            DatabaseConnections.BASE,
            Config.database.username,
            Config.database.password,
            Config.database.cluster,
            Config.database.name
        )

        this.db.createModel(this.dbModels.BODY, BodySchema)
        this.db.createModel(this.dbModels.BODY_TYPE, BodyTypeSchema)
        this.db.createModel(this.dbModels.USER, UserSchema)
    }

}

export default Model
import * as Mongoose from 'mongoose'

import DatabaseModel from './DatabaseModel'

class Database implements Universis.Database {

    /**
     * Instance of connection to database.
     */
    private connection: Mongoose.Connection

    /**
     * List of all existing models.
     */
    private models: Universis.Map<Universis.Database.Model>

    public constructor(options: Universis.Database.Options) {
        this.connection = Mongoose.createConnection(Database.getConnectionString(
            options.userName,
            options.password,
            options.cluster,
            options.database
        ))

        if (options.onConnect) {
            this.connection.on('open', options.onConnect)
        }

        if (options.onError) {
            this.connection.on('error', options.onError)
        }

        this.models = {}

        for (const i in options.schemas) {
            this.models[i] = new DatabaseModel(this.connection.model(i, options.schemas[i]))
        }
    }

    public getModel(name: string): Universis.Database.Model {
        return this.models[name]
    }

    public getModelNames(): string[] {
        return Object.keys(this.models)
    }

    /**
     * Build connection string do DB.
     * @param username Name of user.
     * @param password Password of user.
     * @param cluster Name of cluster.
     * @param database Name of database.
     * @returns Connection string.
     */
    private static getConnectionString(username: string, password: string, cluster: string, database: string): string {
        return `mongodb+srv://${username}:${password}@${cluster}-yasip.mongodb.net/${database}?retryWrites=false`
    }

}

export default Database
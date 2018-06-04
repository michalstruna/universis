import * as Mongoose from 'mongoose'

import { DatabaseModels } from '../Constants'

/**
 * Adapter for Mongoose.
 */
class Database implements IDatabase {

    /**
     * List of all existing connections.
     */
    private static connections: { [name: number]: IDatabase } = {}

    /**
     * Instance of connection to database.
     */
    private connection: Mongoose.Connection

    public constructor(name: number, username: string, password: string, cluster: string, onConnect?: () => void, onError?: () => void) {
        Database.connections[name] = this
        this.connection = Mongoose.createConnection(Database.getConnectionString(username, password, cluster))

        if (onConnect) {
            this.connection.on('open', onConnect)
        }

        if (onError) {
            this.connection.on('error', onError)
        }
    }

    /**
     * Return database instance by name.
     * @param name Name of connection.
     * @returns Database instance.
     */
    public static getConnection(name: number): IDatabase {
        if (Database.connections[name]) {
            return Database.connections[name]
        }

        return null
    }

    public createModel(name: string, schema: Mongoose.Schema): Mongoose.Model<Mongoose.Document> {
        return this.connection.model(name, schema)
    }

    public getModel(name: DatabaseModels) {
        return this.connection.models[name]
    }

    /**
     * Build connection string do DB.
     * @param username Name of user.
     * @param password Password of user.
     * @param cluster Name of cluster.
     * @returns Connection string.
     */
    private static getConnectionString(username: string, password: string, cluster: string): string {
        return `mongodb+srv://${username}:${password}@${cluster}-yasip.mongodb.net/test?retryWrites=false`
    }

}

export default Database
import * as Mongoose from 'mongoose'

import DatabaseModel from './DatabaseModel'
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

    public constructor(name: number, username: string, password: string, cluster: string, database, onConnect?: IRunnable, onError?: IRunnable) {
        Database.connections[name] = this
        this.connection = Mongoose.createConnection(Database.getConnectionString(username, password, cluster, database))

        this.connection.catch(e => console.log(e))

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

    public createModel(name: string, schema: Mongoose.Schema): IDatabaseModel {
        return new DatabaseModel(this.connection.model(name, schema))
    }

    public getModel(name: DatabaseModels) {
        return new DatabaseModel(this.connection.models[name])
    }

    public getModelNames(): string[] {
        return this.connection.modelNames()
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
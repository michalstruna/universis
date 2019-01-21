import { Model, Document, Query } from 'mongoose'

import { Errors } from '../Constants'

// TODO: Remove func does not return list of items.
// TODO: Join, select, limit, offset, ... options in update and remove.

/**
 * Adapter for database model.
 */
class DatabaseModel implements Universis.Database.Model {

    /**
     * Original mongoose model.
     */
    private model: Model<Document>


    public constructor(model: Model<Document>) {
        this.model = model
    }

    public remove<T>(filter: Universis.Database.Query.Filter, options?: Universis.Database.Query.Options): Promise<T> {
        return new Promise((resolve, reject) => (
            this.processQuery(
                this.model.remove(filter),
                options
            )
                .then(removed => this.processResult(removed, options))
                .catch(error => reject(this.getError(error)))
        ))
    }

    public add<T>(data: Universis.Database.Query.Item): Promise<T> {
        return new Promise((resolve, reject) => (
            this.model
                .create(data)
                .then(body => resolve(body._id))
                .catch(error => reject(this.getError(error)))
        ))
    }

    public count(filter: Universis.Database.Query.Filter): Promise<number> {
        return this.model.count(filter).exec()
    }

    public get<T>(filter: Universis.Database.Query.Filter, options?: Universis.Database.Query.Options): Promise<T> {
        return this.processQuery(
            this.model.find(filter),
            options
        )
            .then(items => this.processResult<T>(items, options))
    }

    public update<T>(filter: Universis.Database.Query.Filter, newItem: Universis.Database.Query.Item, options?: Universis.Database.Query.Options): Promise<T> {
        return new Promise((resolve, reject) => (
            this.processQuery(
                this.model.updateMany(filter, newItem, { new: true }),
                options
            )
                .then(updated => resolve(this.processResult<T>(updated, options)))
                .catch(error => reject(this.getError(error)))
        ))
    }


    private processQuery(query: Query<Universis.Database.Query.Item[]>, options?: Universis.Database.Query.Options): Query<Universis.Database.Query.Item[]> {
        if (options) {
            if (options.sort) {
                query = query.sort([[options.sort, options.reverse ? -1 : 1]])
            }

            if (options.offset) {
                query = query.skip(options.offset)
            }

            if (options.limit) {
                query = query.limit(options.limit)
            }

            if (options.join) {
                query = query.populate(options.join.join(' '))
            }

            if (options.select) {
                query = query.select([...options.join, options.select].join(' '))
            }
        }

        return query
    }

    /**
     * Apply query options to result items.
     * @type T Type of result items.
     * @param items Result of query.
     * @param options Options of query.
     * @returns Items or item.
     */
    private processResult<T>(items: Universis.Database.Query.Item[], options?: Universis.Database.Query.Options): T {
        let result: T

        if (options) {
            if (options.join) {
                for (const join of options.join) {
                    for (const i in result) {
                        result[i][join.replace(/Id$/, '')] = result[i][join]
                        delete result[i][join]
                    }
                }
            }

            if (options.extract) {
                result = result[0]
            }
        }

        return result
    }

    /**
     * Map mongoose error to http status.
     * @param error Mongoose error.
     * @returns Http status code.
     */
    private getError(error: { code: number }): Universis.Error {
        return Object.values(Errors).filter(error => error.mongo === error.code)[0] || Errors.INVALID
    }

}

export default DatabaseModel
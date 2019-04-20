import { Model, Document, Query } from 'mongoose'

import { Errors } from '../Constants'

// TODO: Remove func does not return list of items.
// TODO: Join, select, limit, offset, ... options in update and delete.

type Item = Universis.Database.Query.Item
type Filter = Universis.Database.Query.Filter
type Options = Universis.Database.Query.Options

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

    public add<T>(items: Item[]): Promise<T[]> {
        return new Promise((resolve, reject) => (
            this.model
                .insertMany(items)
                .then(items => resolve(items.map(item => item.toObject())))
                .catch(error => reject(this.getError(error)))
        ))
    }

    public addOne<T>(item: Item): Promise<T> {
        return new Promise((resolve, reject) => (
            this.model
                .create(item)
                .then(item => resolve(item.toObject()))
                .catch(error => reject(this.getError(error)))
        ))
    }

    public count(filter: Filter): Promise<number> {
        return this.model.count(filter).exec()
    }

    public get<T>(filter: Filter, options?: Options): Promise<T[]> {
        return this.processQuery(
            this.model.find(filter),
            options
        )
            .then(items => this.processResultForAll<T>(items, options))
    }

    public getOne<T>(filter: Filter, options?: Options): Promise<T> {
        return this.processQuery(
            this.model.findOne(filter),
            options
        )
            .then(items => {
                return this.processResultForOne<T>(items, options)
            })
    }

    public getField<T>(filter: Filter, fieldName: string): Promise<T> {
        return this.getOne<{ [fieldName: string]: T }>(filter, { select: ['-_id', fieldName] })
            .then(item => item[fieldName])
    }

    public remove<T>(filter: Filter, options?: Options): Promise<T[]> {
        return new Promise((resolve, reject) => (
            this.processQuery(
                this.model.deleteMany(filter),
                options
            )
                .then(removed => this.processResultForAll(removed, options))
                .catch(error => reject(this.getError(error)))
        ))
    }

    public removeOne<T>(filter: Filter, options?: Options): Promise<T> {
        return new Promise((resolve, reject) => (
            this.processQuery(
                this.model.findOneAndRemove(filter),
                options
            )
                .then(removed => resolve(removed))
                .catch(error => reject(this.getError(error)))
        ))
    }

    public update<T>(filter: Filter, newItem: Item, options?: Options): Promise<T[]> {
        return new Promise((resolve, reject) => (
            this.processQuery(
                this.model.updateMany(filter, newItem, { new: true }),
                options
            )
                .then(updated => resolve(this.processResultForAll<T>(updated, options)))
                .catch(error => reject(this.getError(error)))
        ))
    }

    public updateOne<T>(filter: Filter, newItem: Item, options?: Options): Promise<T> {
        return new Promise((resolve, reject) => (
            this.processQuery(
                this.model.findOneAndUpdate(filter, newItem, { new: true }),
                options
            )
                .then(updated => resolve(this.processResultForOne<T>(updated, options)))
                .catch(error => reject(this.getError(error)))
        ))
    }

    public aggregate<T>(pipeline: Universis.Map<any>[]): Promise<T[]> {
        return this.model.aggregate(pipeline).exec()
    }

    /**
     * Apply query options to query.
     * @param query Query.
     * @param options Options of query.
     * @returns Query with options.
     */
    private processQuery(query: Query<any>, options?: Options): Query<any> {
        if (query.lean) {
            query = query.lean()
        }

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
                query = query.select([...(options.join || []), ...options.select].join(' '))
            }

            query = query.lean()
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
    private processResultForAll<T>(items: Item[], options?: Options): T[] {
        if (options && options.join) {
            for (const i in items) {
                items[i] = this.processResultForOne<T>(items[i], options)
            }
        }

        return items as T[]
    }

    /**
     * Apply query options to result item.
     * @type T Type of result item.
     * @param item Result of query.
     * @param options Options of query.
     * @returns Item.
     */
    private processResultForOne<T>(item: Item, options?: Options): T {
        if (options && options.join) {
            for (const join of options.join) {
                item[join.replace(/Id$/, '')] = item[join]
                delete item[join]
            }
        }

        return item as T
    }

    /**
     * Map mongoose error to http status.
     * @param error Mongoose error.
     * @returns Http status code.
     */
    private getError(error: { code: number }): Universis.Error {
        console.log(error)
        return Object.values(Errors).filter(error => error.mongo === error.code)[0] || Errors.INVALID
    }

}

export default DatabaseModel
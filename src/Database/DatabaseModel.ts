import { Model, Document, DocumentQuery } from 'mongoose'

import { Errors, SortOrder } from '../Constants'

/**
 * Map mongoose error to http status.
 */
const mapMongooseErrorToStatus = {
    11000: Errors.DUPLICATE
}

/**
 * Adapter for database model.
 */
class DatabaseModel implements IDatabaseModel {

    /**
     * Original mongoose model.
     */
    private model: Model<Document>

    /**
     * Current query.
     * When get, add, update or delete is used, query is cleaned.
     */
    private query: DocumentQuery<Document | Document[], Document>

    public constructor(model: Model<Document>) {
        this.model = model
    }

    /**
     * Map mongoose error to http status.
     * @param error Mongoose error.
     * @returns Http status code.
     */
    private getErrorStatusCode(error: { code: number }): number {
        return mapMongooseErrorToStatus[error.code] || Errors.INVALID
    }

    public add<T>(data: Object): Promise<T> {
        return new Promise((resolve, reject) => (
            this.model
                .create(data)
                .then(body => resolve(body.toObject()))
                .catch(error => reject(this.getErrorStatusCode(error)))
        ))
    }

    public count(condition: Object): Promise<number> {
        return this.model.count(condition).exec()
    }

    public get(condition: Object): IDatabaseModel {
        this.query = this.model.find(condition)
        return this
    }

    public getById(id: string): IDatabaseModel {
        this.query = this.model.findById(id)
        return this
    }

    public getOne(condition: Object): IDatabaseModel {
        this.query = this.model.find(condition)
        return this
    }

    public join(field: string, targetField?: string): IDatabaseModel {
        // TODO: Nested populate.
        // TODO: Rename target.
        this.query = this.query.populate(field)
        return this
    }

    public limit(limit: number): IDatabaseModel {
        this.query = this.query.limit(limit)
        return this
    }

    public offset(offset: number): IDatabaseModel {
        this.query = this.query.skip(offset)
        return this
    }

    public remove<T>(condition: Object): Promise<T> {
        return this.model
            .remove(condition)
            .lean()
            .exec()
    }

    public removeById<T>(id: string): Promise<T> {
        return this.model
            .findByIdAndRemove(id)
            .lean()
            .exec()
    }

    public removeOne<T>(condition: Object): Promise<T> {
        return this.model
            .findOneAndRemove(condition)
            .lean()
            .exec()
    }

    public run<T>(): Promise<T> {
        return this.query.lean().exec()
    }

    public select(...fields: string[]): IDatabaseModel {
        this.query = this.query.select(fields.join(' '))
        return this
    }

    public sort(field: string, order: SortOrder): IDatabaseModel {
        this.query = this.query.sort([[field, order === SortOrder.ASC ? 1 : -1]])
        return this
    }

    public update<T>(condition: Object, newValues: Object): Promise<T> {
        return this.model
            .updateMany(condition, newValues, { new: true })
            .lean()
            .exec()
    }

    public updateById<T>(id: string, newValues: Object): Promise<T> {
        return this.model
            .findByIdAndUpdate(id, newValues, { new: true })
            .lean()
            .exec()
    }

    public updateOne<T>(condition: Object, newValues: Object): Promise<T> {
        return this.model
            .updateOne(condition, newValues, { new: true })
            .lean()
            .exec()
    }
}

export default DatabaseModel
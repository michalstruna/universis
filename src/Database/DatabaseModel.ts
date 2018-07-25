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

    /**
     * List of joined fields in current query.
     */
    private joinList: string[]

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

    private createQuery(query: DocumentQuery<Document | Document[], Document>): void {
        this.query = query
        this.joinList = []
    }

    public add(data: Object): Promise<string> {
        return new Promise((resolve, reject) => (
            this.model
                .create(data)
                .then(body => resolve(body.toObject()._id))
                .catch(error => reject(this.getErrorStatusCode(error)))
        ))
    }

    public count(condition: Object): Promise<number> {
        return this.model.count(condition).exec()
    }

    public get(condition: Object): IDatabaseModel {
        this.createQuery(this.model.find(condition))
        return this
    }

    public getById(id: string): IDatabaseModel {
        this.createQuery(this.model.findById(id))
        return this
    }

    public getOne(condition: Object): IDatabaseModel {
        this.createQuery(this.model.find(condition))
        return this
    }

    public join(field: string, targetField?: string): IDatabaseModel {
        // TODO: Nested populate.
        // TODO: Rename target.
        this.query = this.query.populate(field)
        this.joinList.push(field)
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

    public remove(condition: Object): Promise<number> {
        return new Promise((resolve, reject) => (
            this.model
                .remove(condition)
                .then(removed => removed.n > 0 ? resolve(removed.n) : reject(Errors.NOT_FOUND))
                .catch(error => reject(this.getErrorStatusCode(error)))
        ))
    }

    public removeById(id: string): Promise<void> {
        return new Promise((resolve, reject) => (
            this.model
                .findByIdAndRemove(id)
                .then(removed => removed ? resolve() : reject(Errors.NOT_FOUND))
                .catch(error => reject(this.getErrorStatusCode(error)))
        ))
    }

    public removeOne(condition: Object): Promise<void> {
        return new Promise((resolve, reject) => (
            this.model
                .findOneAndRemove(condition)
                .then(removed => removed ? resolve() : reject(Errors.NOT_FOUND))
                .catch(error => reject(this.getErrorStatusCode(error)))
        ))
    }

    public select(...fields: string[]): IDatabaseModel {
        this.query = this.query.select(fields.join(' '))
        return this
    }

    public sort(field: string, order: SortOrder): IDatabaseModel {
        this.query = this.query.sort([[field, order === SortOrder.ASC ? 1 : -1]])
        return this
    }

    public run<T>(): Promise<T> {
        return this.query
            .lean()
            .exec()
            .then(result => {
                if (result) {
                    if (result.length) {
                        for (const join of this.joinList) {
                            for (const i in result) {
                                result[i][join.replace(/Id$/, '')] = result[i][join]
                                delete result[i][join]
                            }
                        }
                    } else {
                        for (const join of this.joinList) {
                            result[join.replace(/Id$/, '')] = result[join]
                            delete result[join]
                        }
                    }
                }

                return result
            })
    }

    public update(condition: Object, newValues: Object): Promise<number> {
        return new Promise((resolve, reject) => (
            this.model
                .updateMany(condition, newValues, { new: true })
                .then(updated => updated.length > 0 ? resolve(updated.length) : reject(Errors.NOT_FOUND))
                .catch(error => reject(this.getErrorStatusCode(error)))
        ))
    }

    public updateById(id: string, newValues: Object): Promise<void> {
        return new Promise((resolve, reject) => (
            this.model
                .findByIdAndUpdate(id, newValues)
                .then(updated => updated ? resolve() : reject(Errors.NOT_FOUND))
                .catch(error => reject(this.getErrorStatusCode(error)))
        ))
    }

    public updateOne(condition: Object, newValues: Object): Promise<void> {
        return new Promise((resolve, reject) => (
            this.model
                .updateOne(condition, newValues, { new: true })
                .then(updated => updated ? resolve() : reject(Errors.NOT_FOUND))
                .catch(error => reject(this.getErrorStatusCode(error)))
        ))
    }
}

export default DatabaseModel
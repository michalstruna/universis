import { Errors } from '../Constants'
import Model from './Model'

type Filter = Universis.Database.Query.Filter
type Options = Universis.Database.Query.Options

class EntityModel<Full, Short, New> extends Model implements Universis.EntityModel<Full, Short, New> {

    private options: Universis.EntityModel.Options<Full, Short, New>

    public constructor(options: Universis.EntityModel.Options<Full, Short, New>) {
        super()
        this.options = options
        this.dbModel = this.db.getModel(options.dbModel)
    }

    public add(item: New): Promise<string> {
        return this.dbModel
            .add<any>(item)
            .then(item => item._id)
    }

    public count(filter: Filter): Promise<number> {
        return this.dbModel.count(filter)
    }

    public getAll(filter: Filter, options?: Options): Promise<Short[]> {
        return this.dbModel.get<Short[]>(filter, options)
    }

    public getOne(filter: Filter): Promise<Full> {
        return new Promise((resolve, reject) => (
            this.dbModel
                .get<Full>(filter, { limit: 1, extract: true })
                .then(item => item ? resolve(item) : reject(Errors.NOT_FOUND))
                .catch(reject)
        ))
    }

    public removeAll(filter: Filter, options?: Options): Promise<number> {
        return this.dbModel
            .remove<Full[]>(filter, options)
            .then(items => items.length)
    }

    public removeOne(filter: Filter): Promise<void> {
        return new Promise((resolve, reject) => (
            this.dbModel
                .remove<Full>(filter, { limit: 1, extract: true })
                .then(item => item ? resolve() : reject(Errors.NOT_FOUND))
                .catch(reject)
        ))
    }

    public updateAll(filter: Filter, updatedItem: New, options?: Options): Promise<number> {
        return this.dbModel
            .update<Full[]>(filter, updatedItem, options)
            .then(items => items.length)
    }

    public updateOne(filter: Filter, updatedItem: New): Promise<void> {
        return new Promise((resolve, reject) => (
            this.dbModel
                .update<Full>(filter, updatedItem, { limit: 1, extract: true })
                .then(item => item ? resolve() : reject(Errors.NOT_FOUND))
                .catch(reject)
        ))
    }

}

export default EntityModel
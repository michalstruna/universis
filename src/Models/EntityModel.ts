import { SortOrder, Errors } from '../Constants'
import Model from './Model'

// TODO: Add integrity check - if false, entity can be deleted.

class EntityModel<IGetOne, IGetAll, INew> extends Model implements IEntityModel<IGetOne, IGetAll, INew> {

    private unapprovedDbModel: IDatabaseModel

    private selectOne: string[]
    private selectAll: string[]

    private joinOne: string[]
    private joinAll: string[]

    public constructor(options: IEntityModelOptions<IGetOne, IGetAll, INew>) {
        super()

        this.dbModel = this.db.getModel(options.dbModel)
        this.unapprovedDbModel = options.unapprovedDbModel ? this.db.getModel(options.unapprovedDbModel) : null

        this.selectOne = options.selectOne || null
        this.selectAll = options.selectAll || null

        this.joinOne = options.joinOne || []
        this.joinAll = options.joinAll || []
    }

    public add(data: INew): Promise<string> {
        return new Promise((resolve, reject) => (
            this.dbModel
                .add(data)
                .then(id => resolve(id))
                .catch(error => reject(error === Errors.DUPLICATE ? Errors.DUPLICATE : Errors.INVALID))
        ))
    }

    public getAll(filter: any, sort?: string, order?: SortOrder, limit?: number, offset?: number): Promise<IGetAll[]> {
        let query = this.dbModel.get(filter)

        if (sort) {
            query = query.sort(sort, order || SortOrder.ASC)
        }

        if (limit) {
            query = query.limit(limit)
        }

        if (offset) {
            query = query.offset(offset)
        }

        for (const join of this.joinAll) {
            query = query.join(join)
        }

        if (this.selectAll) {
            query = query.select(...this.selectAll)
        }

        return query.run<IGetAll[]>()
    }

    public getOne(filter: any, sort?: string, order?: SortOrder, offset?: number): Promise<IGetAll> {
        return this.getAll(filter, sort, order, 1, offset).then(items => items[0])
    }

    public get(id: string): Promise<IGetOne> {
        return new Promise((resolve, reject) => {
            let query = this.dbModel.getById(id)

            for (const join of this.joinOne) {
                query = query.join(join)
            }

            if (this.selectOne) {
                query = query.select(...this.selectOne)
            }

            return query.run<IGetOne>()
                .then(entity => entity ? resolve(entity) : reject(Errors.NOT_FOUND))
        })
    }

    public removeAll(): Promise<number> {
        return this.dbModel.remove({})
    }

    public remove(id: string, force: boolean = false): Promise<void> {
        return new Promise((resolve, reject) => {
            if (force) {
                // TODO: Remove sub-tree.
                return reject(null)
            } else {
                return this.dbModel
                    .count({ parentId: id })
                    .then(count => {
                        if (count > 0) {
                            reject(Errors.INVALID)
                        } else {
                            return this.dbModel
                                .removeById(id)
                                .then(() => resolve())
                                .catch(error => reject(error))
                        }
                    })
            }
        })
    }

    public update(id: string, updatedEntity: INew): Promise<void> {
        return new Promise((resolve, reject) => (
            this.dbModel
                .updateById(id, updatedEntity)
                .then(() => resolve())
                .catch(error => reject(error))
        ))
    }

    public updateAll(updatedEntity: INew): Promise<number> {
        return new Promise((resolve, reject) => (
            this.dbModel
                .update({}, updatedEntity)
                .then(count => resolve(count))
                .catch(error => reject(error))
        ))
    }

    public getCount(): Promise<any> {
        return this.dbModel.count({})
    }


}

export default EntityModel
import { BAD_REQUEST, NOT_FOUND, CONFLICT, NOT_IMPLEMENTED } from 'http-status-codes'

import { SortOrder } from '../Constants'

import Model from './Model'
import DatabaseModels from '../Constants/DatabaseModels'


class EntityModel<INewEntity, ISimpleEntity, IEntity> extends Model implements IEntityModel<INewEntity, ISimpleEntity, IEntity> {

    public constructor(dbModel: DatabaseModels) {
        super()
        this.dbModel = this.db.getModel(dbModel)
    }

    public add(data: INewEntity): Promise<string> {
        return new Promise((resolve, reject) => (
            this.dbModel
                .add(data)
                .then(id => resolve(id))
                .catch(error => reject(error === CONFLICT ? CONFLICT : BAD_REQUEST))
        ))
    }

    public getAll(order: SortOrder, criterion: string, limit: number, offset: number): Promise<ISimpleEntity[]> {
        return this.dbModel
            .get({})
            .limit(limit)
            .offset(offset)
            .sort(criterion, order)
            .join('typeId')
            .select('_id', 'name', 'diameter', 'orbit', 'period', 'rings', 'texture', 'tilt', 'type', 'parentId')
            .run<ISimpleEntity[]>()
    }

    public get(id: string): Promise<IBody> {
        return new Promise((resolve, reject) => (
            this.dbModel
                .getById(id)
                .join('typeId')
                .run<IBody>()
                .then(body => body ? resolve(body) : reject(NOT_FOUND))
        ))
    }

    public removeAll(): Promise<number> {
        return this.dbModel.remove({})
    }

    public remove(id: string, force: boolean = false): Promise<void> {
        return new Promise((resolve, reject) => {
            if (force) {
                // TODO: Remove sub-tree.
                return reject(NOT_IMPLEMENTED)
            } else {
                return this.dbModel
                    .count({ parentId: id })
                    .then(count => {
                        if (count > 0) {
                            reject(BAD_REQUEST)
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

    public update(id: string, updatedBody: IBody | ISimpleBody): Promise<void> {
        return new Promise((resolve, reject) => (
            this.dbModel
                .updateById(id, updatedBody)
                .then(() => resolve())
                .catch(error => reject(error))
        ))
    }

    public updateAll(id: string, updatedBody: IBody | ISimpleBody): Promise<void> {
        return new Promise((resolve, reject) => (
            this.dbModel
                .updateById(id, updatedBody)
                .then(() => resolve())
                .catch(error => reject(error))
        ))
    }

    public getCount(): Promise<any> {
        return this.dbModel.count({})
    }

}

export default EntityModel
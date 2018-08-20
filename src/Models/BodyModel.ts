import { BAD_REQUEST, NOT_FOUND, CONFLICT, NOT_IMPLEMENTED } from 'http-status-codes'

import { SortOrder } from '../Constants'

import Model from './Model'

class BodyModel extends Model implements IBodyModel {

    public constructor() {
        super()
        this.dbModel = this.db.getModel(this.dbModels.BODY)
    }

    public addBody(data: INewBody): Promise<string> {
        return new Promise((resolve, reject) => (
            this.dbModel
                .add(data)
                .then(id => resolve(id))
                .catch(error => reject(error === CONFLICT ? CONFLICT : BAD_REQUEST))
        ))
    }

    public getBodies(order: SortOrder, criterion: string, limit: number, offset: number): Promise<ISimpleBody[]> {
        return this.dbModel
            .get({})
            .limit(limit)
            .offset(offset)
            .sort(criterion, order)
            .join('typeId')
            .select('_id', 'name', 'diameter', 'orbit', 'period', 'rings', 'texture', 'tilt', 'type', 'parentId')
            .run<ISimpleBody[]>()
    }

    public getBody(id: string): Promise<IBody> {
        return new Promise((resolve, reject) => (
            this.dbModel
                .getById(id)
                .join('typeId')
                .run<IBody>()
                .then(body => body ? resolve(body) : reject(NOT_FOUND))
        ))
    }

    public removeBodies(): Promise<number> {
        return this.dbModel.remove({})
    }

    public removeBody(id: string, force: boolean = false): Promise<void> {
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

    public updateBody(id: string, updatedBody: IBody | ISimpleBody): Promise<void> {
        return new Promise((resolve, reject) => (
            this.dbModel
                .updateById(id, updatedBody)
                .then(() => resolve())
                .catch(error => reject(error))
        ))
    }

    public getBodiesCount(): Promise<any> {
        return this.dbModel.count({})
    }

}

export default new BodyModel()
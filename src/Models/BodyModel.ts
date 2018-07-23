import { BAD_REQUEST, NOT_FOUND, CONFLICT, NOT_IMPLEMENTED } from 'http-status-codes'

import { SortOrder } from '../Constants'

import Model from './Model'

class BodyModel extends Model implements IBodyModel {

    /**
     * Database model for bodies.
     */
    private bodyModel: IDatabaseModel

    public constructor() {
        super()
        this.bodyModel = this.db.getModel(this.dbModels.BODY)
    }

    public addBody(data: INewBody): Promise<ISimpleBody> {
        return new Promise((resolve, reject) => (
            this.bodyModel
                .add<ISimpleBody>(data)
                .then(body => resolve(body))
                .catch(error => reject(error === CONFLICT ? CONFLICT : BAD_REQUEST))
        ))
    }

    public getBodies(order: SortOrder, criterion: BodiesOrderCriterion, limit: number, offset: number): Promise<ISimpleBody[]> {
        return this.bodyModel
            .get({})
            .limit(limit)
            .offset(offset)
            .sort(criterion, order)
            .select('_id', 'name', 'diameter', 'orbit', 'period', 'rings', 'texture', 'tilt', 'type')
            .run<ISimpleBody[]>()
    }

    public getBody(id: string): Promise<IBody> {
        return new Promise((resolve, reject) => (
            this.bodyModel
                .getById(id)
                .run<IBody>()
                .then(body => body ? resolve(body) : reject(NOT_FOUND))
        ))
    }

    public removeBody(id: string, force: boolean = false): Promise<IBody> {
        return new Promise((resolve, reject) => {
            if (force) {
                // TODO: Remove sub-tree.
                return reject(NOT_IMPLEMENTED)
            } else {
                return this.bodyModel
                    .count({ parentId: id })
                    .then(count => {
                        if (count > 0) {
                            reject(BAD_REQUEST)
                        } else {
                            return this.bodyModel
                                .removeById<IBody>(id)
                                .then(body => body ? resolve(body) : reject(NOT_FOUND))
                        }
                    })
            }
        })
    }

    public updateBody(id: string, updatedBody: IBody | ISimpleBody): Promise<IBody> {
        return new Promise((resolve, reject) => (
            this.bodyModel
                .updateById<IBody | ISimpleBody>(id, updatedBody)
                .then(body => body ? resolve(body) : reject(NOT_FOUND))
        ))
    }

}

export default new BodyModel()
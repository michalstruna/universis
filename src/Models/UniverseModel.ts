import { INTERNAL_SERVER_ERROR } from 'http-status-codes'

import Model from './Model'

class UniverseModel extends Model implements IUniverseModel {

    public addBody(body: IBody, token: string): Promise<void> {
        return new Promise((resolve, reject) => {
            new (this.db.getModel(this.dbModels.BODY))(body).save((error, body) => {
                error ? reject(INTERNAL_SERVER_ERROR) : resolve()
            })
        })
    }

    public getBodies(token: string): Promise<IBaseBody[]> {
        return new Promise((resolve, reject) => {
            this.db.getModel(this.dbModels.BODY).find({}, (error, bodies) => {
                error ? reject(INTERNAL_SERVER_ERROR) : resolve(bodies)
            })
        })
    }

    public getBodyById(bodyId: string, token: string): Promise<IBody> {
        return new Promise((resolve, reject) => {
            this.db.getModel(this.dbModels.BODY).find({
                _id: bodyId
            }, (error, body) => {
                error ? reject(INTERNAL_SERVER_ERROR) : resolve(body)
            })
        })
    }

    public removeBodyById(bodyId: string, token: string): Promise<number> {
        return new Promise((resolve, reject) => {
            this.db.getModel(this.dbModels.BODY).remove({
                _id: bodyId
            }, (error, count) => {
                error || !count ? reject(INTERNAL_SERVER_ERROR) : resolve(count)
            })
        })
    }

    public updateBody(body: IBody, token: string): Promise<void> {
        throw new Error()
    }

}

export default UniverseModel
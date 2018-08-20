import Model from './Model'
import { Errors } from '../Constants'

class BodyTypeModel extends Model implements IBodyTypeModel {

    public constructor() {
        super()
        this.dbModel = this.db.getModel(this.dbModels.BODY_TYPE)
    }

    public addBodyType(name: string): Promise<string> {
        return this.dbModel.add({ name })
    }

    public getBodyTypes(): Promise<IBodyType[]> {
        return this.dbModel
            .get({})
            .run<IBodyType[]>()
    }

    public getBodyType(id: string): Promise<IBodyType> {
        return new Promise((resolve, reject) => (
            this.dbModel
                .getById(id)
                .run<IBodyType>()
                .then(bodyType => bodyType ? resolve(bodyType) : reject(Errors.NOT_FOUND))
                .catch(error => reject(error))
        ))
    }

    public removeBodyTypes(): Promise<number> {
        // TODO: Check if body exists.
        return this.dbModel.remove({})
    }

    public removeBodyType(id: string): Promise<void> {
        // TODO: Check if body exists.
        return this.dbModel.removeById(id)
    }

    public updateBodyType(id: string, name: string): Promise<void> {
        return new Promise((resolve, reject) => (
            this.dbModel
                .updateById(id, { name })
                .then(() => resolve())
                .catch(error => reject(error))
        ))
    }

    public getBodyTypesCount(): Promise<number> {
        return this.dbModel.count({})
    }

}

export default new BodyTypeModel()
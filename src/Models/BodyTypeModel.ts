import Model from './Model'
import { Errors } from '../Constants'

class BodyTypeModel extends Model implements IBodyTypeModel {

    /**
     * Database model for body types.
     */
    private bodyTypeModel: IDatabaseModel

    public constructor() {
        super()
        this.bodyTypeModel = this.db.getModel(this.dbModels.BODY_TYPE)
    }

    public addBodyType(name: string): Promise<string> {
        return this.bodyTypeModel.add({ name })
    }

    public getBodyTypes(): Promise<IBodyType[]> {
        return this.bodyTypeModel
            .get({})
            .run<IBodyType[]>()
    }

    public getBodyType(id: string): Promise<IBodyType> {
        return new Promise((resolve, reject) => (
            this.bodyTypeModel
                .getById(id)
                .run<IBodyType>()
                .then(bodyType => bodyType ? resolve(bodyType) : reject(Errors.NOT_FOUND))
                .catch(error => reject(error))
        ))
    }

    public removeBodyTypes(): Promise<number> {
        // TODO: Check if body exists.
        return this.bodyTypeModel.remove({})
    }

    public removeBodyType(id: string): Promise<void> {
        // TODO: Check if body exists.
        return this.bodyTypeModel.removeById(id)
    }

    public updateBodyType(id: string, name: string): Promise<void> {
        return new Promise((resolve, reject) => (
            this.bodyTypeModel
                .updateById(id, { name })
                .then(() => resolve())
                .catch(error => reject(error))
        ))
    }

}

export default new BodyTypeModel()
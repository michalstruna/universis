import Model from './Model'

class UniverseModel extends Model implements IUniverseModel {

    addBody(body: IBody, token: string): Promise<void> {
        return undefined
    }

    getBodies(token: string): Promise<IShortBody[]> {
        return undefined
    }

    getBodyById(bodyId: string, token: string): Promise<IBody> {
        return undefined
    }

    removeBodyById(bodyId: string, token: string): Promise<number> {
        return undefined
    }

    updateBody(body: IBody, token: string): Promise<void> {
        throw new Error()
    }

}

export default UniverseModel
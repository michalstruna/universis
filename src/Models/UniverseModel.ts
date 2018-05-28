import Model from './Model'

class UniverseModel extends Model implements IUniverseModel {

    public getBodies(): IShortBody[] {
        return null
    }

    public getBodyByName(name: string): IBody {
        return null
    }

}

export default UniverseModel
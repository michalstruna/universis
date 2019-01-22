import { DatabaseModels } from '../Constants'
import EntityModel from './ItemModel'

export default new EntityModel<IBodyType, IBodyType, INewBodyType>({
    dbModel: DatabaseModels.BODY_TYPE
})
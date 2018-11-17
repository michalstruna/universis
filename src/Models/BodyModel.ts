import { DatabaseModels } from '../Constants'
import EntityModel from './EntityModel'

export default new EntityModel<IBody, ISimpleBody, INewBody>({
    dbModel: DatabaseModels.BODY,
    joinAll: ['typeId'],
    joinOne: ['typeId']
})
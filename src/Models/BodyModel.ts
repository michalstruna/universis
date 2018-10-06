import { DatabaseModels } from '../Constants'
import EntityModel from './EntityModel'

export default new EntityModel<IBody, ISimpleBody, INewBody>({
    dbModel: DatabaseModels.BODY,
    selectAll: ['_id', 'name', 'diameter', 'mass', 'orbit', 'period', 'rings', 'texture', 'tilt', 'type', 'parentId'],
    joinAll: ['typeId'],
    joinOne: ['typeId']
})
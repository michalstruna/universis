import { DatabaseModels } from '../Constants'
import EntityModel from './EntityModel'

export default new EntityModel<IBody, ISimpleBody, INewBody>(
    DatabaseModels.BODY,
    ['_id', 'name', 'diameter', 'orbit', 'period', 'rings', 'texture', 'tilt', 'type', 'parentId'],
    ['typeId']
)
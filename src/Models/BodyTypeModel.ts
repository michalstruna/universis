import { DatabaseModels } from '../Constants'
import EntityModel from './ItemModel'

export default new EntityModel<Universis.Universe.Body.Type, Universis.Universe.Body.Type, Universis.Universe.Body.Type.New>({
    dbModel: DatabaseModels.BODY_TYPE
})
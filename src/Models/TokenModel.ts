import { DatabaseModels } from '../Constants'
import ItemModel from './ItemModel'

export default new ItemModel<Universis.User, Universis.User.Simple, Universis.User.New>({
    dbModel: DatabaseModels.TOKEN
})
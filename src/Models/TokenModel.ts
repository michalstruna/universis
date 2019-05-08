import { DatabaseModel } from '../Constants'
import ItemModel from './ItemModel'

export default new ItemModel<Universis.Token, Universis.Token, Universis.Token.New>({
    dbModel: DatabaseModel.TOKEN
})
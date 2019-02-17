import { DatabaseModels } from '../Constants'
import ItemModel from './ItemModel'

export default new ItemModel<Universis.Discussion | Universis.Answer, Universis.Discussion | Universis.Answer, Universis.Discussion.New | Universis.Answer.New>({
    dbModel: DatabaseModels.POST_VOTE
})
import { DatabaseModels } from '../Constants'
import ItemModel from './ItemModel'

export default new ItemModel<Universis.Vote, Universis.Vote, Universis.Vote.New>({
    dbModel: DatabaseModels.POST_VOTE,
    add: {
        onBefore: (item, model) => {
            model.remove({ postId:item.postId, userId: item.userId })
        }
    }
})
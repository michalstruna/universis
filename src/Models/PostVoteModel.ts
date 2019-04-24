import { DatabaseModel } from '../Constants'
import ItemModel from './ItemModel'

export default new ItemModel<Universis.Vote, Universis.Vote, Universis.Vote.New>({
    dbModel: DatabaseModel.POST_VOTE,
    add: {
        onBefore: (item, model) => {
            model.delete({ postId:item.postId, userId: item.userId })
        }
    }
})
import { DatabaseModel, UserScore, SubjectType } from '../Constants'
import ItemModel from './ItemModel'
import UserModel from './UserModel'
import PostModel from './BodyPostModel'

const changeScore = async (item, isPositive) => {
    const post = await PostModel.get({ _id: item.postId })

    if ((post as any).userId) {
        const score = UserScore[SubjectType.POST_VOTE]
        UserModel.update({ _id: (post as any).userId }, { $inc: { [`score.${score.type}`]: isPositive ? score.count : -score.count } })
    }
}

export default new ItemModel<Universis.Vote, Universis.Vote, Universis.Vote.New>({
    dbModel: DatabaseModel.POST_VOTE,
    add: {
        onBefore: (item, model) => {
            model.delete({ postId: item.postId, userId: item.userId })
        },
        onAfter: item => changeScore(item, item.isPositive)
    },
    remove: {
        onAfter: item => changeScore(item, !item.isPositive)
    }
})
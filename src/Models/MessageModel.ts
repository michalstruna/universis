import { DatabaseModel, SubjectType, UserScore } from '../Constants'
import ItemModel from './ItemModel'
import UserModel from './UserModel'

export default new ItemModel<Universis.Message, Universis.Message, Universis.Message.New>({
    dbModel: DatabaseModel.MESSAGE,
    notifications: {
        subjectTypeAccessor: () => SubjectType.MESSAGE,
        textAccessor: message => message.content,
        userIdAccessor: message => message.userId
    },
    get: {
        joinAll: ['userId', 'targetUserId']
    },
    add: {
        notification: true,
        onAfter: item => {
            const score = UserScore[SubjectType.MESSAGE]
            UserModel.update({ _id: (item as any).userId }, { $inc: { [`score.${score.type}`]: score.count } })
        }
    }
})
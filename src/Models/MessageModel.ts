import { DatabaseModels, SubjectType } from '../Constants'
import ItemModel from './ItemModel'

export default new ItemModel<Universis.Message, Universis.Message, Universis.Message.New>({
    dbModel: DatabaseModels.MESSAGE,
    notifications: {
        subjectTypeAccessor: () => SubjectType.MESSAGE,
        textAccessor: message => message.content,
        userIdAccessor: message => message.userId
    },
    get: {
        joinAll: ['userId', 'targetUserId']
    },
    add: {
        notification: true
    }
})
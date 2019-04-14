import { DatabaseModels, NotificationSubject } from '../Constants'
import ItemModel from './ItemModel'

export default new ItemModel<Universis.Message, Universis.Message, Universis.Message.New>({
    dbModel: DatabaseModels.MESSAGE,
    notifications: {
        subjectAccessor: () => NotificationSubject.MESSAGE,
        textAccessor: messages => messages.content
    },
    get: {
        joinAll: ['userId', 'targetUserId']
    },
    add: {
        notification: true
    }
})
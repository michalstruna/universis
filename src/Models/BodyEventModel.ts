import { DatabaseModels, NotificationSubjects } from '../Constants'
import ItemModel from './ItemModel'

export default new ItemModel<Universis.Event, Universis.Event, Universis.Event.New>({
    dbModel: DatabaseModels.BODY_EVENT,
    notifications: {
        textAccessor: notification => notification.title,
        subjectAccessor: () => NotificationSubjects.BODY_EVENT
    },
    add: {
        approval: true,
        notification: true,
    },
    get: {
        select: ['-bodyId'],
        selectAll: ['-bodyId']
    },
    remove: {
        approval: true,
        notification: true
    },
    update: {
        approval: true,
        notification: true
    }
})
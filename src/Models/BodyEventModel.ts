import { DatabaseModels, NotificationSubjects } from '../Constants'
import ItemModel from './ItemModel'

export default new ItemModel<Universis.Universe.Event, Universis.Universe.Event, Universis.Universe.Event.New>({
    dbModel: DatabaseModels.BODY_EVENT,
    notifications: {
        textAccessor: notification => notification.title,
        subjectType: NotificationSubjects.BODY_EVENT
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
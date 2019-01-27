import { DatabaseModels, NotificationSubjects } from '../Constants'
import ItemModel from './ItemModel'

export default new ItemModel<IBody, ISimpleBody, INewBody>({
    dbModel: DatabaseModels.BODY_EVENT,
    notifications: {
        textAccessor: body => body.name,
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
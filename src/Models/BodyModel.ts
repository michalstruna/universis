import { DatabaseModels, NotificationSubjects } from '../Constants'
import ItemModel from './ItemModel'

export default new ItemModel<IBody, ISimpleBody, INewBody>({
    dbModel: DatabaseModels.BODY,
    notifications: {
        textAccessor: body => body.name,
        subjectAccessor: () => NotificationSubjects.BODY
    },
    add: {
        approval: true,
        notification: true,
    },
    get: {
        join: ['typeId'],
        joinAll: ['typeId']
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
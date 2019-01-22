import { DatabaseModels, NotificationSubjects } from '../Constants'
import ItemModel from './ItemModel'

export default new ItemModel<IBody, ISimpleBody, INewBody>({
    dbModel: DatabaseModels.BODY,
    add: {
        notification: true
    },
    addOne: {
        notification: true
    },
    get: {
        notification: true,
        join: ['typeId']
    },
    getOne: {
        notification: true,
        join: ['typeId']
    },
    remove: {
        notification: true
    },
    removeOne: {
        notification: true
    },
    update: {
        notification: true
    },
    updateOne: {
        notification: true
    },
    notifications: {
        subjectType: NotificationSubjects.BODY,
        textAccessor: body => body.name
        // TODO: Target
    }
})
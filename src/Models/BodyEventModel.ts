import { DatabaseModel, SubjectType } from '../Constants'
import ItemModel from './ItemModel'
import BodyModel from './BodyModel'

export default new ItemModel<Universis.Event, Universis.Event, Universis.Event.New>({
    dbModel: DatabaseModel.BODY_EVENT,
    notifications: {
        subjectTypeAccessor: () => SubjectType.EVENT,
        userIdAccessor: event => event.userId,
        textAccessor: event => event.title,
        linkAccessor: async event => {
            return `?panel=body&body-tab=timeline&body=${(await BodyModel.get({ _id: event.bodyId }, { select: ['name'] })).name}`
        },
        subjectNameAccessor: async event => {
            return (await BodyModel.get({ _id: event.bodyId }, { select: ['name'] })).name
        }
    },
    add: {
        approval: true,
        notification: true
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
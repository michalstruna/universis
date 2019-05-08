import { DatabaseModel, Errors, Operation, SubjectType } from '../Constants'
import ItemModel from './ItemModel'
import BodyAggregation from '../Database/Aggregations/Body'

export default new ItemModel<Universis.Universe.Body, Universis.Universe.Body.Simple, Universis.Universe.Body.New>({
    dbModel: DatabaseModel.BODY,
    notifications: {
        subjectTypeAccessor: () => SubjectType.BODY,
        userIdAccessor: body => body.userId,
        textAccessor: body => body.name,
        linkAccessor: (body, model, operation) => operation === Operation.DELETE ? null : `?panel=body&body-tab=data&body=${body.name}`,
        subjectNameAccessor: body => body.name
    },
    add: {
        approval: true,
        notification: true
    },
    get: {
        joinAll: ['typeId'],
        custom: BodyAggregation
    },
    remove: {
        approval: true,
        notification: true,
        onBefore: async (filter, options, model) => {
            const childrenCount = await model.count({ parentId: filter._id })

            if (childrenCount > 0) {
                return Promise.reject(Errors.INTEGRITY_BREAK)
            }
        }
    },
    update: {
        approval: true,
        notification: true
    }
})
import { DatabaseModel, Errors, SubjectType } from '../Constants'
import EntityModel from './ItemModel'
import BodyModel from './BodyModel'

export default new EntityModel<Universis.Universe.Body.Type, Universis.Universe.Body.Type, Universis.Universe.Body.Type.New>({
    dbModel: DatabaseModel.BODY_TYPE,
    notifications: {
        subjectNameAccessor: bodyType => bodyType.name,
        subjectTypeAccessor: () => SubjectType.BODY_TYPE,
        userIdAccessor: bodyType => bodyType.userId,
        textAccessor: bodyType => bodyType.name,
        linkAccessor: () => `?panel=db&db-tab=types`,
    },
    add: {
        notification: true,
        approval: true
    },
    remove: {
        notification: true,
        approval: true,
        onBefore: async (filter) => {
            const bodiesCount = await BodyModel.count({ typeId: filter._id })

            if (bodiesCount > 0) {
                return Promise.reject(Errors.INTEGRITY_BREAK)
            }
        }
    },
    update: {
        notification: true,
        approval: true
    }
})
import { DatabaseModel, SubjectType } from '../Constants'
import EntityModel from './ItemModel'

export default new EntityModel<Universis.Universe.Body.Type, Universis.Universe.Body.Type, Universis.Universe.Body.Type.New>({
    dbModel: DatabaseModel.BODY_TYPE,
    notifications: {
        subjectNameAccessor: bodyType => bodyType.name,
        subjectTypeAccessor: () => SubjectType.BODY_TYPE,
        //userIdAccessor: bodyType => bodyType.userId,
        textAccessor: bodyType => bodyType.name
    },
    add: {
        notification: true,
        approval: true
    },
    remove: {
        notification: true,
        approval: true
    },
    update: {
        notification: true,
        approval: true
    }
})
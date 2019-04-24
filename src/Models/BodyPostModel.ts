import { DatabaseModel } from '../Constants'
import ItemModel from './ItemModel'
import SubjectType from '../Constants/SubjectType'
import BodyModel from './BodyModel'

export default new ItemModel<Universis.Discussion | Universis.Answer, Universis.Discussion | Universis.Answer, Universis.Discussion.New | Universis.Answer.New>({
    dbModel: DatabaseModel.BODY_POST,
    notifications: {
        subjectTypeAccessor: () => SubjectType.POST,
        userIdAccessor: post => post.userId,
        subjectNameAccessor: async (post, model) => {
            let bodyId = post.bodyId

            if (!bodyId) {
                bodyId = (await model.get({ _id: post.discussionId }, { select: ['bodyId'] }) as Universis.Discussion).bodyId
            }

            return (await BodyModel.get({ _id: bodyId }, { select: ['name'] })).name
        },
        textAccessor: post => post.title || post.content
    },
    add: {
        notification: true,
        onAfter: post => {
            post.votes = []
        }
    },
    get: {
        select: ['-bodyId -discussionId'],
        selectAll: ['-bodyId -discussionId']
    },
    remove: {
        notification: true
    },
    update: {
        notification: true
    }
})
import { DatabaseModels } from '../Constants'
import ItemModel from './ItemModel'
import NotificationSubject from '../Constants/NotificationSubject'
import BodyModel from './BodyModel'

export default new ItemModel<Universis.Discussion | Universis.Answer, Universis.Discussion | Universis.Answer, Universis.Discussion.New | Universis.Answer.New>({
    dbModel: DatabaseModels.BODY_POST,
    notifications: {
        subjectTypeAccessor: () => NotificationSubject.POST,
        userIdAccessor: post => post.userId,
        subjectNameAccessor: async (post, model) => {
            let bodyId = post.bodyId

            if (!bodyId) {
                bodyId = (await model.getOne({ _id: post.discussionId }, { select: ['bodyId'] }) as Universis.Discussion).bodyId
            }

            return (await BodyModel.getOne({ _id: bodyId }, { select: ['name'] })).name
        },
        textAccessor: post => post.title || post.content
    },
    add: {
        approval: true,
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
        approval: true,
        notification: true
    },
    update: {
        approval: true,
        notification: true
    }
})
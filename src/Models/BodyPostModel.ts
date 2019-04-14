import { DatabaseModels } from '../Constants'
import ItemModel from './ItemModel'
import NotificationSubject from '../Constants/NotificationSubject'

export default new ItemModel<Universis.Discussion | Universis.Answer, Universis.Discussion | Universis.Answer, Universis.Discussion.New | Universis.Answer.New>({
    dbModel: DatabaseModels.BODY_POST,
    notifications: {
        subjectAccessor: post => post.bodyId ? NotificationSubject.DISCUSSION : NotificationSubject.COMMENT,
        userIdAccessor: post => post.userId,
        bodyIdAccessor: post => post.bodyId,
        discussionIdAccessor: post => post.discussionId,
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
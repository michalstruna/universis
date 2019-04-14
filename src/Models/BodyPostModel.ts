import { DatabaseModels } from '../Constants'
import ItemModel from './ItemModel'
import NotificationSubject from '../Constants/NotificationSubject'

export default new ItemModel<Universis.Discussion | Universis.Answer, Universis.Discussion | Universis.Answer, Universis.Discussion.New | Universis.Answer.New>({
    dbModel: DatabaseModels.BODY_POST,
    notifications: {
        textAccessor: (notification, model) => 'title' in notification ? notification.title : notification.content,
        subjectAccessor: notification => 'title' in notification ? NotificationSubject.BODY_DISCUSSION : NotificationSubject.BODY_COMMENT
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
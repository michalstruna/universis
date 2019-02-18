import { DatabaseModels } from '../Constants'
import ItemModel from './ItemModel'
import NotificationSubjects from '../Constants/NotificationSubjects'

export default new ItemModel<Universis.Discussion | Universis.Answer, Universis.Discussion | Universis.Answer, Universis.Discussion.New | Universis.Answer.New>({
    dbModel: DatabaseModels.BODY_POST,
    notifications: {
        textAccessor: (notification, model) => 'title' in notification ? notification.title : notification.content,
        subjectAccessor: notification => 'title' in notification ? NotificationSubjects.BODY_DISCUSSION : NotificationSubjects.BODY_COMMENT
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
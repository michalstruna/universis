import { DatabaseModel, Operation, UserScore } from '../Constants'
import ItemModel from './ItemModel'
import SubjectType from '../Constants/SubjectType'
import BodyModel from './BodyModel'
import UserModel from './UserModel'

const getBodyName = async (post, model) => {
    let bodyId = post.bodyId

    if (!bodyId) {
        bodyId = (await model.get({ _id: post.discussionId }, { select: ['bodyId'] }) as Universis.Discussion).bodyId
    }

    return (await BodyModel.get({ _id: bodyId }, { select: ['name'] })).name
}

export default new ItemModel<Universis.Discussion | Universis.Answer, Universis.Discussion | Universis.Answer, Universis.Discussion.New | Universis.Answer.New>({
    dbModel: DatabaseModel.BODY_POST,
    notifications: {
        subjectTypeAccessor: () => SubjectType.POST,
        userIdAccessor: post => post.userId,
        subjectNameAccessor: getBodyName,
        linkAccessor: async (post, model, operation) => operation === Operation.DELETE ? null : `?panel=body&body-tab=discussion&body=${await getBodyName(post, model)}`,
        textAccessor: post => post.title || post.content
    },
    add: {
        notification: true,
        onAfter: post => {
            post.votes = []
            const score = UserScore[SubjectType.POST]
            UserModel.update({ _id: (post as any).userId }, { $inc: { [`score.${score.type}`]: score.count } })
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
import { DatabaseModel, SubjectType } from '../Constants'
import ItemModel from './ItemModel'

export default new ItemModel<Universis.Universe.Body, Universis.Universe.Body.Simple, Universis.Universe.Body.New>({
    dbModel: DatabaseModel.BODY,
    notifications: {
        subjectTypeAccessor: () => SubjectType.BODY,
        userIdAccessor: body => body.userId,
        textAccessor: body => body.name,
        linkAccessor: body => body.bodyId,
        subjectNameAccessor: body => body.name
    },
    add: {
        approval: true,
        notification: true
    },
    get: {
        joinAll: ['typeId'],
        custom: filter => ([
            { $match: filter },
            { $lookup: { from: 'bodytypes', localField: 'typeId', foreignField: '_id', as: 'type' } },
            { $unwind: '$type' },
            { $lookup: { from: 'bodyevents', localField: '_id', foreignField: 'bodyId', as: 'events' } },
            { $lookup: { from: 'bodies', localField: 'parentId', foreignField: '_id', as: 'parent' } },
            { $unwind: '$parent' },
            {
                $lookup: {
                    from: 'bodyposts',
                    let: { 'bodyId': '$_id' },
                    pipeline: [
                        { $match: { $expr: { $eq: ['$bodyId', '$$bodyId'] } } },
                        {
                            $lookup: {
                                from: 'bodyposts',
                                let: { 'discussionId': '$_id' },
                                pipeline: [
                                    { $match: { $expr: { $eq: ['$discussionId', '$$discussionId'] } } },
                                    {
                                        $lookup: {
                                            from: 'postvotes',
                                            let: { 'postId': '$_id' },
                                            pipeline: [{ $match: { $expr: { $eq: ['$postId', '$$postId'] } } }],
                                            as: 'votes'
                                        }
                                    },
                                    {
                                        $lookup: {
                                            from: 'users',
                                            localField: 'userId',
                                            foreignField: '_id',
                                            as: 'user'
                                        }
                                    },
                                    { $unwind: { path: '$user', preserveNullAndEmptyArrays: true } }
                                ],
                                as: 'answers'
                            }
                        },
                        { $lookup: { from: 'users', localField: 'userId', foreignField: '_id', as: 'user' } },
                        { $unwind: { path: '$user', preserveNullAndEmptyArrays: true } },
                        {
                            $lookup: {
                                from: 'postvotes',
                                let: { 'postId': '$_id' },
                                pipeline: [{ $match: { $expr: { $eq: ['$postId', '$$postId'] } } }],
                                as: 'votes'
                            }
                        }
                    ],
                    as: 'discussions'
                }
            },
            { $project: { typeId: 0 } }
        ])
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
import { DatabaseModels, NotificationSubjects } from '../Constants'
import ItemModel from './ItemModel'

export default new ItemModel<IBody, ISimpleBody, INewBody>({
    dbModel: DatabaseModels.BODY,
    notifications: {
        textAccessor: body => body.name,
        subjectAccessor: () => NotificationSubjects.BODY
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
            { $lookup: { from: 'bodyevents', localField: '_id', foreignField: 'bodyId', as: 'events' } },
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
                                    }
                                ],
                                as: 'answers'
                            }
                        },
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
import { DatabaseModel } from '../Constants'
import ItemModel from './ItemModel'

export default new ItemModel<Universis.User, Universis.User.Simple, Universis.User.New>({
    dbModel: DatabaseModel.USER,
    get: {
        custom: filter => ([
            { $match: filter },
            {
                $lookup: {
                    from: 'postvotes',
                    let: { userId: '$_id' },
                    pipeline: [
                        { $match: { $expr: { $eq: ['$userId', '$$userId'] } } },
                        { $group: { _id: '$isPositive', count: { $sum: 1 } } },
                        {
                            $project: {
                                _id: 0,
                                k: { $cond: [{ $eq: ['$_id', true] }, 'positive', 'negative'] },
                                v: '$count'
                            }
                        }
                    ],
                    as: 'votes.out'
                }
            },
            {
                $lookup: {
                    from: 'postvotes',
                    pipeline: [
                        {
                            $lookup: {
                                from: 'bodyposts',
                                localField: 'postId',
                                foreignField: '_id',
                                as: 'posts'
                            }
                        },
                        { $match: { 'posts.userId': filter._id } },
                        { $group: { _id: '$isPositive', count: { $sum: 1 } } },
                        {
                            $project: {
                                _id: 0,
                                k: { $cond: [{ $eq: ['$_id', true] }, 'positive', 'negative'] },
                                v: '$count'
                            }
                        }
                    ],
                    as: 'votes.in'
                }
            },
            {
                $project: {
                    votes: {
                        in: { $mergeObjects: [{ positive: 0, negative: 0 }, { $arrayToObject: '$votes.in' }] },
                        out: { $mergeObjects: [{ positive: 0, negative: 0 }, { $arrayToObject: '$votes.out' }] }
                    },
                    fields: '$$ROOT'
                }
            },
            {
                $replaceRoot: {
                    newRoot: {
                        $mergeObjects: [
                            '$fields',
                            { votes: '$votes' }
                        ]
                    }
                }
            },
            {
                $lookup: {
                    from: 'bodyposts',
                    let: { userId: '$_id' },
                    pipeline: [
                        { $match: { $and: [{ bodyId: { $ne: null } }, { $expr: { $eq: ['$userId', '$$userId'] } }] } },
                        {
                            $lookup: {
                                from: 'bodyposts',
                                localField: '_id',
                                foreignField: 'discussionId',
                                as: 'comments'
                            }
                        },
                        {
                            $lookup: {
                                from: 'bodies',
                                localField: 'bodyId',
                                foreignField: '_id',
                                as: 'body'
                            }
                        },
                        { $group: { _id: '$body.name', count: { $sum: { $add: [1, { $size: '$comments' }] } } } },
                        { $project: { _id: 0, body: '$_id', count: '$count' } },
                        { $unwind: '$body' },
                        { $sort: { count: -1 } }
                    ],
                    as: 'posts'
                }
            }
        ])
    }
})
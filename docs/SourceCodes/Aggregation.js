this.db.getModel(DatabaseModels.BODY).aggregate([
  { $match: { _id: ObjectId('507f1f77bcf86cd799439011') } },
  { $lookup: {
    from: 'bodytypes',
    localField: 'typeId',
    foreignField: '_id',
    as: 'type'
  } },
  { $lookup: {
    from: 'bodyevents',
    localField: '_id',
    foreignField: 'bodyId',
    as: 'events'
  } },
  { $lookup: {
    from: 'bodies',
    localField: 'parentId',
    foreignField: '_id',
    as: 'parent'
  } },
  { $lookup: {
    from: 'bodyposts',
    let: { 'bodyId': '$_id' },
    pipeline: [
      { $match: { $expr: { $eq: ['$bodyId', '$$bodyId'] } } },
      { $lookup: {
        from: 'bodyposts',
        let: { 'discussionId': '$_id' },
        pipeline: [
          { $match: {
            $expr: { $eq: ['$discussionId', '$$discussionId'] } }
          },
          { $lookup: {
            from: 'postvotes',
            let: { 'postId': '$_id' },
            pipeline: [
              { $match: {
                $expr: { $eq: ['$postId', '$$postId'] } }
              }
            ],
            as: 'votes'
          } }
        ],
        as: 'answers'
      } },
      { $lookup: {
        from: 'postvotes',
        let: { 'postId': '$_id' },
        pipeline: [
          { $match: { $expr: { $eq: ['$postId', '$$postId'] } } }
        ],
        as: 'votes'
      } }
    ],
    as: 'discussions'
  } },
  { $project: { typeId: 0 } }
])

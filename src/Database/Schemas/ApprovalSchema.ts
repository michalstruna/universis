import { Schema } from 'mongoose'

import { DatabaseModel } from '../../Constants'

/**
 * DB schema for unapproved items.
 */
const ApprovalSchema = new Schema({

    notificationId: {
        type: Schema.Types.ObjectId,
        ref: DatabaseModel.NOTIFICATION
    },

    before: {
        type: Schema.Types.Mixed
    },

    after: {
        type: Schema.Types.Mixed
    },

    __v: {
        type: Number,
        select: false
    }

})

export default ApprovalSchema
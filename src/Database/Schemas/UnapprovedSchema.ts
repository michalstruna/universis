import { Schema } from 'mongoose'

import { DatabaseModels } from '../../Constants'

/**
 * DB schema for unapproved items.
 */
const UnapprovedSchema = new Schema({

    subject: {
        type: Number,
        required: true
    },

    operation: {
        type: Number,
        required: true
    },

    notificationId: {
        type: Schema.Types.ObjectId,
        ref: DatabaseModels.NOTIFICATION
    },

    __v: {
        type: Number,
        select: false
    }

}, { timestamps: true })

export default UnapprovedSchema
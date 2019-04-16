import { Schema } from 'mongoose'
import { DatabaseModels } from '../../Constants'

const NotificationSchema = new Schema({

    subjectType: {
        type: Number,
        required: true
    },

    subjectName: {
        type: String
    },

    operation: {
        type: Number,
        required: true
    },

    userId: {
        type: Schema.Types.ObjectId,
        ref: DatabaseModels.USER
    },

    targetUserId: {
        type: Schema.Types.ObjectId,
        ref: DatabaseModels.USER
    },

    text: {
        type: String
    },

    createdAt: {
        type: Number
    },

    updatedAt: {
        type: Number
    },

    __v: {
        type: Number,
        select: false
    }

}, { timestamps: true })

export default NotificationSchema
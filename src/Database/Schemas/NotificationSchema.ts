import { Schema } from 'mongoose'
import { DatabaseModels } from '../../Constants'

const NotificationSchema = new Schema({

    subject: {
        type: Number,
        required: true
    },

    operation: {
        type: Number,
        required: true
    },

    name: {
        type: String
    },

    userId: {
        type: Schema.Types.ObjectId,
        ref: DatabaseModels.USER
    },

    targetUserId: {
        type: Schema.Types.ObjectId,
        ref: DatabaseModels.USER
    },

    link: {
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
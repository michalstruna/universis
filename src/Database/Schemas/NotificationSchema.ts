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

    userId: {
        type: Schema.Types.ObjectId,
        ref: DatabaseModels.USER
    },

    targetUserId: {
        type: Schema.Types.ObjectId,
        ref: DatabaseModels.USER
    },

    bodyId: {
        type: Schema.Types.ObjectId,
        ref: DatabaseModels.BODY
    },

    discussionId: {
        type: Schema.Types.ObjectId,
        ref: DatabaseModels.BODY_POST
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
import { Schema } from 'mongoose'

import { DatabaseModels } from '../../Constants'

const MessageSchema = new Schema({

    content: {
        type: String,
        required: true
    },

    ip: {
        type: String,
        required: true,
        select: false
    },

    userId: {
        type: Schema.Types.ObjectId,
        ref: DatabaseModels.USER
    },

    targetUserId: {
        type: Schema.Types.ObjectId,
        ref: DatabaseModels.USER
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

export default MessageSchema
import { Schema } from 'mongoose'

import { DatabaseModel } from '../../Constants'

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
        ref: DatabaseModel.USER
    },

    targetUserId: {
        type: Schema.Types.ObjectId,
        ref: DatabaseModel.USER
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
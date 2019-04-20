import { Schema } from 'mongoose'
import { ApprovalState, DatabaseModel } from '../../Constants'

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
        ref: DatabaseModel.USER
    },

    targetUserId: {
        type: Schema.Types.ObjectId,
        ref: DatabaseModel.USER
    },

    text: {
        type: String
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

    approvalState: {
        type: Number,
        required: true,
        default: ApprovalState.APPROVED
    },

    __v: {
        type: Number,
        select: false
    }

}, { timestamps: true })

export default NotificationSchema
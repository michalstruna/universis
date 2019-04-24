import { Schema } from 'mongoose'

import { DatabaseModel } from '../../Constants'

const PostVoteSchema = new Schema({

    isPositive: {
        type: Boolean,
        required: true
    },

    date: {
        type: String,
        default: () => new Date().toISOString(),
        required: true
    },

    userId: {
        type: Schema.Types.ObjectId,
        ref: DatabaseModel.USER,
        required: true
    },

    postId: {
        type: Schema.Types.ObjectId,
        ref: DatabaseModel.BODY_POST,
        required: true
    },

    __v: {
        type: Number,
        select: false
    }

})

PostVoteSchema.index({ userId: 1, postId: 1 }, { unique: true })

export default PostVoteSchema
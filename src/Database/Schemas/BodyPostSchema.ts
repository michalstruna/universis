import { Schema } from 'mongoose'

import { DatabaseModels } from '../../Constants'

const BodyPostSchema = new Schema({

    content: {
        type: String,
        required: true,
        minlength: 1
    },

    agreements: {
        type: [
            {
                type: Schema.Types.ObjectId,
                ref: DatabaseModels.USER
            }
        ],
        default: [],
        required: true
    },

    disagreements: {
        type: [
            {
                type: Schema.Types.ObjectId,
                ref: DatabaseModels.USER
            }
        ],
        default: [],
        required: true
    },

    date: {
        type: String,
        default: () => new Date().toISOString(),
        required: true
    },

    userId: {
        type: Schema.Types.ObjectId,
        ref: DatabaseModels.USER,
        required: false
    },

    answers: {
        type: [
            {
                type: Schema.Types.ObjectId,
                ref: DatabaseModels.BODY_POST
            }
        ],
        default: [],
        required: true
    },

    title: {
        type: String,
        required: false,
        minlength: 1
    },

    ip: {
        type: String,
        required: true
    },

    bodyId: {
        type: Schema.Types.ObjectId,
        ref: DatabaseModels.BODY,
        required: false
    },

    discussionId: {
        type: Schema.Types.ObjectId,
        ref: DatabaseModels.BODY_POST,
        required: false
    },

    __v: {
        type: Number,
        select: false
    }

})

export default BodyPostSchema
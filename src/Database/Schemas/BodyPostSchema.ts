import { Schema } from 'mongoose'

import { DatabaseModels } from '../../Constants'

const BodyPostSchema = new Schema({

    content: {
        type: String,
        required: true,
        minlength: 1
    },

    userId: {
        type: Schema.Types.ObjectId,
        ref: DatabaseModels.USER,
        required: true
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

    bodyId: {
        type: Schema.Types.ObjectId,
        ref: DatabaseModels.BODY,
        required: false
    },

    discussionId: {
        type: Schema.Types.ObjectId,
        ref: DatabaseModels.BODY_POST,
        required: false
    }

})

export default BodyPostSchema
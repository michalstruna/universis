import { Schema } from 'mongoose'
import { DatabaseModel } from '../../Constants'

/**
 * DB schema for body event.
 */
const BodyEventSchema = new Schema({

    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    from: {
        type: Number,
        required: true
    },

    to: {
        type: Number,
        required: false
    },

    bodyId: {
        type: Schema.Types.ObjectId,
        ref: DatabaseModel.BODY,
        required: true
    },

    __v: {
        type: Number,
        select: false
    }

})

export default BodyEventSchema
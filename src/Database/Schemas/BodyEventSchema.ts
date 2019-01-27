import { Schema } from 'mongoose'
import { DatabaseModels } from '../../Constants'

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

    year: {
        type: Number,
        required: true
    },

    bodyId: {
        type: Schema.Types.ObjectId,
        ref: DatabaseModels.BODY,
        required: true
    },

    __v: {
        type: Number,
        select: false
    }

})

export default BodyEventSchema
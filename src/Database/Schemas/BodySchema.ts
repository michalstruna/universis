import { Schema } from 'mongoose'

/**
 * DB schema for short body.
 */
const BodySchema = new Schema({

    _id: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    },

    diameter: {
        equatorial: {
            type: Number,
            required: true
        }
    }
})

export default BodySchema
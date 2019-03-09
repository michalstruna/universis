import { Schema } from 'mongoose'

/**
 * DB schema for body type.
 */
const BodyTypeSchema = new Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },

    emissiveColor: {
        type: Number
    },

    virtualFlag: {
        type: Number
    },

    __v: {
        type: Number,
        select: false
    }

})

export default BodyTypeSchema
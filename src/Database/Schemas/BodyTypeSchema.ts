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
        type: String
    },

    isVirtual: {
        type: Number
    },

    texture: {
        type: String
    },

    particlesGenerator: {
        type: String
    },

    __v: {
        type: Number,
        select: false
    }

})

export default BodyTypeSchema
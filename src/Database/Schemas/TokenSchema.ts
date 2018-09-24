import { Schema } from 'mongoose'

/**
 * DB schema for user's tokens.
 */
const TokenSchema = new Schema({

    token: {
        type: String,
        required: [true, 'Token is required.'],
        unique: [true, 'Token must be unique.']
    },

    __v: {
        type: Number,
        select: false
    }

})

export default TokenSchema
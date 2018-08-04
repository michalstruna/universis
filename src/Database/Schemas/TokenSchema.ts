import { Schema } from 'mongoose'

import { DatabaseModels } from '../../Constants'

/**
 * DB schema for user's tokens.
 */
const TokenSchema = new Schema({

    token: {
        type: String,
        required: [true, 'Token is required.'],
        unique: [true, 'Token must be unique.']
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: DatabaseModels.USER,
        required: [true, 'User is required.'],
        unique: [true, 'User must have only one token.']
    },

    date: {
        type: Date,
        required: [true, 'Date is required.']
    },

    __v: {
        type: Number,
        select: false
    }

})

export default TokenSchema